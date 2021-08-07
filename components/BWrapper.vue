<template>
    <div class="wrapper">
        <div class="wrapper__container">
            <div v-if="items && items.length > 0" class="wrapper__beers">
                <b-card
                    v-for="(item, i) in items.slice(0, maxResults)"
                    :modifiers="which == 'news' ? ['news'] : []"
                    :key="i"
                    :item="item"
                ></b-card>
            </div>
            <div v-else-if="which == 'searchResults'" class="wrapper__no-results">
                <h3>Sorry, no results for "{{ $store.state.searchQuery }}"...</h3>
                <b-button group="main" modifier="outline" @clicked="checkIfLogged">Add new beer</b-button>
            </div>
            <div v-if="which != 'topBeers' && items && items.length > maxResults" class="wrapper__actions">
                <b-button group="quick" modifier="outline" @clicked="maxResults += 6">Show more</b-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BCard from '@/components/BCard';

export default {
    name: 'BWrapper',
    components: { BCard },
    props: {
        which: { type: String, default: '' },
        items: { type: Array, default: () => null },
        hasTitle: { type: Boolean, default: true },
    },
    data() {
        return {
            maxResults: 6,
        };
    },
    computed: {
        ...mapGetters(['myId']),
        title() {
            return this.which == 'topBeers' ? 'Top picks' : this.which == 'searchResults' ? 'Search results' : '';
        },
    },
    methods: {
        checkIfLogged() {
            if (this.myId) this.$router.push({ name: 'AddBeer' });
            else this.$store.commit('toggle', 'loginPopup');
        },
    },
};
</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    justify-content: center;

    &__container {
        overflow: hidden;
        word-wrap: break-word;

        // @include breakpoint(d) {
        //     width: 80%;
        // }

        // @include breakpoint(full) {
        //     width: 1000px;
        // }
    }

    &__beers {
        display: flex;
        flex-wrap: wrap;
    }

    &__no-results {
        display: flex;
        flex-direction: column;
        align-content: center;
        margin: 60px 0;
        overflow: hidden;
        word-wrap: break-word;

        h3 {
            margin-bottom: 8px;
        }
    }

    &__actions {
        margin: 20px 0;
        display: flex;
        justify-content: center;

        button {
            max-width: 120px;
        }
    }
}
</style>
