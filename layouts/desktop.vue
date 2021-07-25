<template>
    <div id="app" :class="{ 'expand-header': expandHeader, 'dark-mode': darkMode }">
        <div class="content">
            <div class="left-aside">
                <ul class="nav">
                    <nuxt-link
                        v-for="(nav, i) in navigationItems"
                        :key="'nav_item-' + i"
                        :to="nav.route"
                        tag="li"
                        class="nav__item"
                        :class="{ 'nav__item--active': $route.name == nav.route.name }"
                    >
                        <component :is="nav.name + 'Icon'"></component>
                        <span>{{ nav.name }}</span>
                    </nuxt-link>
                    <li class="nav__item button-holder">
                        <b-button group="main" modifier="icon">
                            <img class="beer-icon" src="@/assets/icons/white-beer.svg" alt="Beer" />
                            <span>Add beer</span>
                        </b-button>
                    </li>
                </ul>

                <footer class="aside-footer">
                    <h1>Follow us</h1>
                    <div class="social">
                        <a v-for="(soc, i) in socialItems" :key="'soc-' + i" :href="soc.route" class="social__item">
                            <img :src="soc.icon" :alt="soc.name" />
                        </a>
                    </div>
                    <ul class="info">
                        <nuxt-link
                            v-for="(f, i) in footerItems"
                            :key="'info-' + i"
                            :to="f.route"
                            tag="li"
                            class="info__item"
                            >{{ f.name }}</nuxt-link
                        >
                    </ul>
                </footer>
            </div>

            <Nuxt class="main" />

            <div class="right-aside"></div>
        </div>

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
import HomeIcon from '@/assets/icons/nav/home.svg?inline';
import DiscoverIcon from '@/assets/icons/nav/search.svg?inline';
import ProfileIcon from '@/assets/icons/nav/person.svg?inline';

export default {
    name: 'Desktop',
    components: { HomeIcon, DiscoverIcon, ProfileIcon },
    data() {
        return {
            expandHeader: false,
        };
    },
    computed: {
        ...mapState([
            'loading',
            'bMessage',
            'loginPopup',
            'loginPopupObj',
            'darkMode',
            'navigationItems',
            'socialItems',
            'footerItems',
        ]),
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

<style lang="scss" scoped>
.content {
    display: flex;
}

.main {
    width: 55%;
}

.left-aside {
    width: 25%;
    position: relative;
    padding: 0 0 0 35px;
}

.nav {
    position: absolute;
    right: 0;
    top: 100px;
    width: 285px;

    &__item {
        height: 68px;
        display: flex;
        align-items: center;
        cursor: pointer;
        color: var(--color-text);
        font-weight: 500;
        font-size: 20px;
        line-height: 26px;

        svg {
            height: 22px;
            margin: 0 20px 0 30px;
            stroke: var(--color-text);

            path {
                fill: var(--color-text);
            }
        }

        &--active {
            background: var(--bg-plain);
            color: var(--color-main);
            border-radius: 30px 0px 0px 30px;

            svg {
                stroke: var(--color-main);

                path {
                    fill: var(--color-main);
                }
            }
        }
    }
}

.button-holder {
    margin-top: 40px;
}

.beer-icon {
    height: 36px;
}

.aside-footer {
    position: absolute;
    left: 36px;
    right: 30px;
    bottom: 20px;

    h1 {
        font-weight: 500;
        font-size: 18px;
        line-height: 32px;
    }

    .social {
        display: flex;
        margin: 12px 0 28px 0;

        &__item {
            height: 36px;
            width: 36px;
            border-radius: 50%;
            background-color: #3c3737;
            margin-right: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            img {
                height: 22px;
                width: 22px;
            }
        }
    }

    .info {
        display: flex;

        &__item {
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            color: var(--color-text);
            cursor: pointer;
            margin: 0 0 0 6px;

            &::after {
                content: '·';
                margin-left: 6px;
            }

            &:first-child {
                margin-left: 0;
            }

            &:last-child {
                margin-right: 0;

                &::after {
                    content: '';
                }
            }
        }
    }
}

.right-aside {
    width: 20%;
}
</style>
