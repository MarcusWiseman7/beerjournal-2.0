<template>
    <nuxt-link
        v-if="item && item.hasOwnProperty('brewery')"
        :to="`/SingleBeer/${item._id}`"
        class="item"
        :class="modifiers.map(x => 'item--' + x)"
    >
        <img v-if="item.logo || item.brewery.logo" :src="item.logo || item.brewery.logo" alt="logo" />
        <b-pic v-else></b-pic>

        <div class="item__desc">
            <div>
                <h3>{{ item.beerName }}</h3>
                <div class="item__desc__info">
                    <span class="bolder">{{ item.brewery.name }}</span>
                    <span>{{ item.style }}</span>
                </div>
                <div v-if="modifiers.includes('news')" class="item__news">
                    <v-clamp :max-lines="2" tag="p" ellipsis="">
                        <template>{{ item.brewery.description }}</template>
                        <template v-slot:after="{ clamped }">
                            <span v-if="clamped">... <span class="underline">more</span></span>
                        </template>
                    </v-clamp>
                </div>
            </div>

            <b-rating
                :rating="item.averageRating"
                :count="item.totalNumberOfRatings"
                :id="item._id"
                :size="16"
            ></b-rating>
        </div>
    </nuxt-link>
    <nuxt-link
        v-else-if="item"
        :to="`/SingleBrewery/${item._id}`"
        class="item"
        :class="modifiers.map(x => 'item--' + x)"
    >
        <img :src="item.logo ? item.logo : ''" alt="logo" />
        <div class="item__desc">
            <h3>{{ item.name }}</h3>
            <h5>{{ item.type }}</h5>
        </div>
    </nuxt-link>
</template>

<script>
import VClamp from 'vue-clamp';

export default {
    name: 'BCard',
    props: {
        item: { type: Object, default: () => null },
        modifiers: { type: Array, default: () => [] },
    },
    components: { VClamp },
};
</script>

<style lang="scss" scoped>
.item {
    border: 1px solid var(--border-color);
    box-sizing: border-box;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(25% - 9px);
    margin: 0 12px 12px 0;
    background-color: var(--bg);
    overflow: hidden;

    &:nth-child(4n) {
        margin-right: 0;
    }

    &--news {
        width: calc(50% - 6px);

        &:nth-child(2n) {
            margin-right: 0;
        }
    }

    img {
        height: 90px;
        width: 160px;
        object-fit: contain;
        border-radius: 12px 12px 0 0;
    }

    // @include breakpoint(m) {
    //     img {
    //         height: 100px;
    //         width: 100px;
    //     }
    // }

    &__desc {
        padding: 12px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        color: var(--color-text);
        width: 100%;
        height: 100%;

        &__info {
            display: flex;
            flex-direction: column;
            color: var(--color-text-secondary);
            font-size: 14px;
            line-height: 20px;
            margin: 6px 0 14px 0;
            font-weight: 400;

            .bolder {
                font-weight: 600;
            }
        }
    }

    &__news {
        font-size: 14px;
        line-height: 20px;
        margin-bottom: 14px;
    }

    &:hover {
        // box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
        background-color: var(--bg-card-hover);
    }
}

.underline {
    text-decoration: underline;
    font-size: 12px;
}
</style>
