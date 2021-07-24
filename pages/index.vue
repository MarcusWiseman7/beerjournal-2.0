<template>
    <div class="home">
        <b-search class="search"></b-search>
        <b-wrapper v-if="searchResults" which="searchResults" :items="searchResults"></b-wrapper>
        <b-wrapper which="topBeers" :items="topBeers"></b-wrapper>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Home',
    computed: {
        ...mapState(['searchResults', 'beers', 'topBeers']),
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
