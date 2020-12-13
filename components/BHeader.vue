<template>
    <div class="b-header" :style="'height:' + maxHeight">
        <nuxt-link to="/" class="b-header__title">
            <span>BeerJournal</span>
            <img src="@/assets/icons/beer.svg" alt="beer" />
        </nuxt-link>
        <div class="b-header__actions">
            <b-button v-if="!myId" group="main" modifier="outline" @clicked="$store.commit('toggle', 'loginPopup')"
                >Login</b-button
            >
            <b-button v-if="!myId" group="main" modifier="outline" @clicked="$router.push({ name: 'SignUp' })"
                >Create account</b-button
            >
            <b-button v-else group="main" modifier="outline" @clicked="$store.dispatch('logout')">Logout</b-button>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'BHeader',
    computed: {
        ...mapState(['isSmallScreen']),
        ...mapGetters(['myId']),
        maxHeight() {
            return this.isSmallScreen || this.$route.name !== 'index' ? '160px' : '400px';
        },
    },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixins';
@import '@/assets/scss/colors';

.b-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)),
        url('https://res.cloudinary.com/dukumou2e/image/upload/v1557745360/breweries/lazy-src_zpkrwj.jpg');
    background-position: center top;
    background-size: contain;

    @include breakpoint(m) {
        padding: 40px;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
    }

    &__title {
        display: flex;
        align-items: center;

        span {
            color: $maincolor;
            font-size: 60px;
            font-weight: 300;
            margin-right: 16px;
        }

        img {
            height: 60px;
        }
    }

    &__actions {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;

        @include breakpoint(m) {
            width: 30%;
        }
    }
}
</style>
