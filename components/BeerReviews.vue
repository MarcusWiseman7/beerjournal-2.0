<template>
    <ul v-if="reviews">
        <li v-for="r in reviews" :key="r._id" class="review"></li>
    </ul>
</template>

<script>
export default {
    name: 'BeerReviews',
    props: {
        reviews: { type: Array, default: () => null },
    },
};
</script>

<style lang="scss" scoped></style>
