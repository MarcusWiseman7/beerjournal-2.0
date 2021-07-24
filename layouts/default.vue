<template>
    <div id="app" :class="{ 'expand-header': expandHeader, 'dark-mode': darkMode }">
        <b-header @expand-header="expandHeader = $event"></b-header>
        <div class="content">
            <Nuxt />
        </div>
        <b-footer></b-footer>

        <b-popup
            v-if="loginPopup"
            :title="loginPopupObj.title"
            :text="loginPopupObj.text"
            :modifiers="['autoWidth']"
            @close="closeLoginPopup"
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

export default {
    data() {
        return {
            expandHeader: false,
        };
    },
    computed: {
        ...mapState(['loading', 'bMessage', 'loginPopup', 'loginPopupObj', 'darkMode']),
    },
    methods: {
        closeLoginPopup() {
            this.$store.commit('toggle', 'loginPopup');
            this.$store.commit('setObj', {
                name: 'loginPopupObj',
                obj: { title: 'Login', text: 'Enter your email and password to login' },
            });
        },
    },
    mounted() {
        this.$store.dispatch('initApp');
    },
};
</script>

<style></style>
