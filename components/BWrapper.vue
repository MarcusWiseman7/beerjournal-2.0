<template>
    <div class="wrapper">
        <div class="wrapper__container">
            <h2>{{ title }}</h2>
            <div class="wrapper__beers">
                <b-card v-for="(item, i) in items" :key="i" :item="item"></b-card>
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
        flex-wrap: wrap;
        margin: 10px 0;
    }
}
</style>
