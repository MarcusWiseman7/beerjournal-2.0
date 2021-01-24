<template>
    <div class="b-header">
        <nuxt-link to="/" class="b-header__title">
            <span>BrewFoam</span>
            <img src="@/assets/icons/beer.svg" alt="beer" />
        </nuxt-link>
        <div class="b-header__actions">
            <b-button v-if="!myId" group="main" modifier="outline" @clicked="$store.commit('toggle', 'loginPopup')"
                >Login</b-button
            >
            <b-button
                v-if="!myId"
                group="main"
                modifier="outline"
                class="b-header__actions--last"
                @clicked="$router.push({ name: 'SignUp' })"
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
    },
};
</script>

<style lang="scss" scoped>
.b-header {
    height: 160px;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8));
    background-color: #fff;

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
            margin-right: 6px;
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
        padding: 0 20px;

        &--last {
            margin-left: 10px !important;
        }

        @include breakpoint(m) {
            width: 30%;
        }
    }
}
</style>
