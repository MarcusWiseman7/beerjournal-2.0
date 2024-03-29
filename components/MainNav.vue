<template>
    <div :class="{ mobile: mobile, desktop: !mobile }" @touchend="$emit('close')">
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

        <footer>
            <h1>Follow us</h1>
            <div class="social">
                <a v-for="(soc, i) in socialItems" :key="'soc-' + i" :href="soc.route" class="social__item">
                    <img :src="soc.icon" :alt="soc.name" />
                </a>
            </div>
            <ul class="info">
                <nuxt-link
                    v-for="(f, i) in footerItems.slice(0, 3)"
                    :key="'info-' + i"
                    :to="f.route"
                    tag="li"
                    class="info__item"
                    >{{ f.name }}</nuxt-link
                >
            </ul>
            <ul class="info">
                <nuxt-link
                    v-for="(f, i) in footerItems.slice(3)"
                    :key="'info2-' + i"
                    :to="f.route"
                    tag="li"
                    class="info__item"
                    >{{ f.name }}</nuxt-link
                >
            </ul>
        </footer>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import HomeIcon from '@/assets/icons/nav/home.svg?inline';
import DiscoverIcon from '@/assets/icons/nav/search.svg?inline';
import ProfileIcon from '@/assets/icons/nav/person.svg?inline';

export default {
    name: 'MainNav',
    props: {
        mobile: { type: Boolean, default: false },
    },
    components: { HomeIcon, DiscoverIcon, ProfileIcon },
    computed: {
        ...mapState(['navigationItems', 'socialItems', 'footerItems']),
    },
};
</script>

<style lang="scss" scoped>
.nav {
    &__item {
        height: 68px;
        display: flex;
        align-items: center;
        cursor: pointer;
        color: var(--color-text);
        font-weight: 500;
        font-size: 20px;
        line-height: 26px;
        position: relative;

        svg {
            height: 22px;
            margin: 0 20px 0 30px;
            stroke: var(--color-text);

            path {
                fill: var(--color-text);
            }
        }

        &--active {
            background: var(--bg-secondary);
            color: var(--color-main);

            svg {
                stroke: var(--color-main);

                path {
                    fill: var(--color-main);
                }
            }
        }
    }
}

.beer-icon {
    height: 36px;
}

footer {
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

.desktop {
    .nav {
        position: absolute;
        right: 0;
        top: 100px;
        width: 285px;

        &__item {
            &--active {
                border-radius: 30px 0px 0px 30px;

                &::before {
                    content: '';
                    position: absolute;
                    right: 0;
                    top: -60px;
                    height: 60px;
                    width: 30px;
                    border-radius: 0 0 30px 0;
                    box-shadow: 0 30px 0 0 var(--bg-secondary);
                    background-color: var(--bg);
                }

                &::after {
                    content: '';
                    position: absolute;
                    right: 0;
                    bottom: -60px;
                    height: 60px;
                    width: 30px;
                    border-radius: 0 30px 0 0;
                    box-shadow: 0 -30px 0 0 var(--bg-secondary);
                    background-color: var(--bg);
                }
            }
        }
    }

    .button-holder {
        margin: 40px 40px 0 0;
    }
}

.mobile {
    height: 100vh;
    width: calc(100vw - 28px);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: var(--bg-secondary);
    z-index: 3;

    .nav {
        padding: 54px 16px;

        &__item {
            height: 54px;
            border-bottom: 1px solid var(--border-color);

            &:last-child {
                border: none;
            }

            svg {
                height: 22px;
                margin: 0 20px 0 30px;
                stroke: var(--color-text);

                path {
                    fill: var(--color-text);
                }
            }

            &--active {
                background: var(--bg-secondary);
                color: var(--color-main);

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
        margin: 40px;
    }
}
</style>
