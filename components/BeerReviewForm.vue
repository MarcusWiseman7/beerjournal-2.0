<template>
    <div class="review">
        <div class="rating-row">
            <b-rating :reviewing="true" :key="'my-rating'" @my-rating="myRating = $event"></b-rating>
            <p>({{ myRating }})</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BeerReviewForm',
    props: {
        beer: { type: Object, default: () => null },
    },
    data() {
        return {
            myRating: 0,
        };
    },
};
</script>

<style lang="scss" scoped>
.review {
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
}

.rating-row {
    display: flex;
    align-items: center;
    justify-items: center;
    flex-flow: wrap;

    p {
        margin-left: 20px;
        font-size: 22px;
    }
}
</style>
