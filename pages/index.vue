<template>
    <div class="home">
        <b-search class="search"></b-search>
        <b-wrapper which="searchResults" :items="topBeers"></b-wrapper>
        <b-wrapper which="topBeers" :items="topBeers"></b-wrapper>
    </div>
</template>

<script>
import BSearch from '@/components/BSearch';
import BWrapper from '@/components/BWrapper';
import { mapState } from 'vuex';

export default {
    name: 'Home',
    components: { BSearch, BWrapper },
    computed: {
        ...mapState(['searchResults', 'topBeers']),
    },
};
</script>

<style lang="scss" scoped>
.search {
    margin: 40px 0;
}
</style>
