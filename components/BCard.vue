<template>
    <nuxt-link v-if="item && item.hasOwnProperty('brewery')" :to="`/SingleBeer/${item._id}`" class="item">
        <img v-if="item.logo || item.brewery.logo" :src="item.logo || item.brewery.logo" alt="logo" />
        <b-pic v-else></b-pic>

        <div class="item__desc">
            <h3>{{ item.beerName }}</h3>
            <div class="item__desc__info">
                <span class="bolder">{{ item.brewery.name }}</span> - <span class="lighter">{{ item.style }}</span>
            </div>
            <b-rating
                :rating="item.averageRating"
                :count="item.totalNumberOfRatings"
                :id="item._id"
                :size="16"
            ></b-rating>
        </div>
    </nuxt-link>
    <nuxt-link v-else-if="item" :to="`/SingleBrewery/${item._id}`" class="item">
        <img :src="item.logo ? item.logo : ''" alt="logo" />
        <div class="item__desc">
            <h3>{{ item.name }}</h3>
            <h5>{{ item.type }}</h5>
        </div>
    </nuxt-link>
</template>

<script>
export default {
    name: 'BCard',
    props: {
        item: { type: Object, default: () => null },
    },
};
</script>

<style lang="scss" scoped>
.item {
    border: 1px solid #f7f7fa;
    box-sizing: border-box;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 160px;
    margin: 0 12px 12px 0;

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
        color: var(--color-text);
        overflow: hidden;
        word-wrap: break-word;

        h3 {
            color: var(--color-text);
        }

        &__info {
            display: flex;
            color: var(--color-text-secondary);
            font-size: 14px;
            line-height: 20px;
            margin: 6px 0 14px 0;

            .bolder {
                font-weight: 500;
                margin-right: 2px;
            }

            .lighter {
                font-weight: 400;
                margin-left: 2px;
            }
        }
    }

    &:hover {
        box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
    }
}
</style>
