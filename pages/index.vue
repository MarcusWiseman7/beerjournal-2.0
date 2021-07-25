<template>
    <div class="home">
        <h1>New and popular</h1>
        <!-- <b-search class="search"></b-search> -->
        <!-- <b-wrapper v-if="searchResults" which="searchResults" :items="searchResults"></b-wrapper> -->
        <h1>Top rated beers</h1>
        <b-wrapper which="topBeers" :items="topBeers" :hasTitle="false"></b-wrapper>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Home',
    layout: ctx => (ctx.$device.isMobile ? 'default' : 'desktop'),
    computed: {
        ...mapState(['searchResults', 'beers', 'topBeers']),
    },
};
</script>

<style lang="scss" scoped>
.home {
    background-color: var(--bg-plain);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 30px 30px 0px 0px;
    padding: 28px;

    h1 {
        font-weight: 600;
        font-size: 26px;
        line-height: 26px;
        letter-spacing: -0.015em;
        color: var(--color-text);
    }
}
</style>
