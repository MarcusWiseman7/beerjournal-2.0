<template>
    <div class="page-inner">
        <h1 class="headline first">New and popular</h1>
        <b-wrapper which="news" :items="topBeers.slice(0, 2)" :hasTitle="false"></b-wrapper>
        <h1 class="headline">Top rated beers</h1>
        <b-wrapper which="topBeers" :items="topBeers" :hasTitle="false"></b-wrapper>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Home',
    layout: ctx => (ctx.$device.isMobile ? 'mobile' : 'desktop'),
    computed: {
        ...mapState(['searchResults', 'beers', 'topBeers']),
    },
};
</script>

<style lang="scss" scoped>
.headline {
    margin: 20px 0;
}

.first {
    margin-top: 0;
}
</style>
