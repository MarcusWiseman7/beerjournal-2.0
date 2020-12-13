<template>
    <div class="wrapper">
        <div class="wrapper__container">
            <h2>
                <span>{{ title }}</span>
                <span v-if="which == 'searchResults'"> for "{{ $store.state.searchQuery }}" </span>
            </h2>
            <div v-if="items && items.length > 0" class="wrapper__beers">
                <b-card v-for="(item, i) in items.slice(0, maxResults)" :key="i" :item="item"></b-card>
            </div>
            <div v-else-if="which == 'searchResults'" class="wrapper__no-results">
                <h3>Sorry, no results for {{ $store.state.searchQuery }}...</h3>
            </div>
            <div v-if="items.length > maxResults" class="wrapper__actions">
                <b-button group="quick" modifier="outline" @clicked="maxResults += 6">Show more</b-button>
            </div>
        </div>
    </div>
</template>

<script>
import BCard from '@/components/BCard';

export default {
    name: 'BWrapper',
    components: { BCard },
    props: {
        which: { type: String, default: '' },
        items: { type: Array, default: () => null },
    },
    data() {
        return {
            maxResults: 6,
        };
    },
    watch: {
        items: function() {
            this.maxResults = 6;
        },
    },
    computed: {
        title() {
            return this.which == 'topBeers'
                ? 'Staff beer picks'
                : this.which == 'searchResults'
                ? 'Search results'
                : '';
        },
    },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixins';

.wrapper {
    display: flex;
    justify-content: center;
    padding: 0 20px;

    &__container {
        @include breakpoint(d) {
            width: 80%;
        }

        @include breakpoint(full) {
            width: 60%;
        }
    }

    &__beers {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin: 10px 0;
    }

    &__no-results {
        display: flex;
        justify-content: center;
        margin: 60px 0;
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
