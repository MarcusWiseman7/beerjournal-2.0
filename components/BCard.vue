<template>
    <nuxt-link v-if="item && item.hasOwnProperty('brewery')" :to="`/SingleBeer/${item._id}`" class="item">
        <img v-if="item.logo || item.brewery.logo" :src="item.logo || item.brewery.logo" alt="logo" />
        <b-pic v-else></b-pic>

        <div class="item__desc">
            <h3>{{ item.beerName }}</h3>
            <h5>{{ item.brewery.name }}</h5>
            <p>{{ item.style }}</p>
            <b-rating :rating="item.averageRating" :id="item._id" :size="16"></b-rating>
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
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
    padding: 8px;
    display: flex;
    flex-direction: column;
    margin: 6px;
    border-radius: 8px;
    width: calc(50% - 12px);

    img {
        height: 50px;
        width: 50px;
    }

    @include breakpoint(m) {
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
        padding: 10px;
        margin: 10px;
        flex-direction: row;
        width: auto;

        img {
            height: 100px;
            width: 100px;
        }
    }

    &__desc {
        margin-left: 6px;
        padding: 8px 0 0 0;
        display: flex;
        flex-direction: column;
        color: $textcolor;
        overflow: hidden;
        word-wrap: break-word;

        h3 {
            color: $maincolor;
        }

        @include breakpoint(m) {
            width: 160px;
        }
    }

    &:hover {
        box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
    }
}
</style>
