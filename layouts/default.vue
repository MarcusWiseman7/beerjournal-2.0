<template>
    <div id="app">
        <b-header></b-header>
        <Nuxt />
        <b-footer></b-footer>

        <b-popup
            v-if="loginPopup"
            title="Login"
            text="Enter your email and password to login"
            :modifiers="['autoWidth']"
            @close="$store.commit('toggle', 'loginPopup')"
        >
            <template v-slot:body>
                <login-signup></login-signup>
            </template>
        </b-popup>

        <b-spinner v-if="loading"></b-spinner>

        <transition name="slideandfade">
            <b-message v-if="bMessage"></b-message>
        </transition>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import BSpinner from '@/components/BSpinner';
import BHeader from '@/components/BHeader';
import BFooter from '@/components/BFooter';
import LoginSignup from '@/components/LoginSignup';

export default {
    components: { BSpinner, BHeader, BFooter, LoginSignup },
    computed: {
        ...mapState(['loading', 'bMessage', 'loginPopup']),
    },
    mounted() {
        this.$store.dispatch('initApp');
    },
};
</script>

<style></style>
