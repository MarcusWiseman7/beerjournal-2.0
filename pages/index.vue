<template>
    <div class="home">
        <b-search class="search"></b-search>
        <b-wrapper v-if="searchResults" which="searchResults" :items="searchResults"></b-wrapper>
        <b-wrapper which="topBeers" :items="topBeers"></b-wrapper>
        <b-button v-if="marcus" group="main" modifier="outline" @clicked="$store.dispatch('normalizeNamesInDB')"
            >Normalize names</b-button
        >
    </div>
</template>

<script>
import BSearch from '@/components/BSearch';
import BWrapper from '@/components/BWrapper';
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'Home',
    components: { BSearch, BWrapper },
    computed: {
        ...mapState(['searchResults', 'beers', 'topBeers']),
        ...mapGetters(['marcus']),
    },
};
</script>

<style lang="scss" scoped>
.search {
    margin: 20px 8px;

    @include breakpoint(m) {
        margin: 40px 0;
    }
}
</style>
