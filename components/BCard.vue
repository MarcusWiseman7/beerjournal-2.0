<template>
    <nuxt-link
        v-if="item && item.hasOwnProperty('brewery')"
        :to="{ name: 'SingleBeer', params: { id: item._id } }"
        class="item"
    >
        <img :src="item.logo ? item.logo : item.brewery.logo" alt="logo" />
        <div class="item__desc">
            <h3>{{ item.beerName }}</h3>
            <h5>{{ item.brewery.name }}</h5>
            <p>{{ item.style }}</p>
            <b-rating :rating="item.averageRating" :id="item._id" :size="16"></b-rating>
        </div>
    </nuxt-link>
    <nuxt-link v-else-if="item" :to="{ name: 'SingleBrewery', params: { id: item._id } }" class="item">
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
@import '@/assets/scss/mixins';
@import '@/assets/scss/colors';

.item {
    display: flex;
    margin: 10px 10px;
    padding: 10px;
    border-radius: 8px;

    @include breakpoint(m) {
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
    }

    img {
        height: 100px;
        width: 100px;
    }

    &__desc {
        margin-left: 6px;
        padding: 8px 0 0 0;
        display: flex;
        flex-direction: column;
        color: $textcolor;
        width: 160px;
        overflow: hidden;
        word-wrap: break-word;

        h3 {
            color: $maincolor;
        }
    }

    &:hover {
        box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
    }
}
</style>
