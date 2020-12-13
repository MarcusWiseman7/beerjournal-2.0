<template>
    <ul v-if="reviews">
        <li v-for="r in reviews" :key="r._id" class="review">
            <div class="review__top-row">
                <div class="review__left-side">
                    <img v-if="r.pic" :src="r.pic" alt="Review pic" />
                    <BeerSVG v-else />
                    <div class="review__info">
                        <h4>{{ r.reviewer.name }}</h4>
                        <p>{{ r.date || r.dateCreated }}</p>
                    </div>
                </div>
                <b-rating :rating="r.rating" :size="16" :id="r._id"></b-rating>
            </div>
            <div v-if="r.notes && r.notes.length > 0" class="review__notes">
                <p>"{{ r.notes }}"</p>
            </div>
        </li>
    </ul>
</template>

<script>
import BeerSVG from '@/components/BeerSVG';

export default {
    name: 'BeerReviews',
    props: {
        reviews: { type: Array, default: () => null },
    },
    components: { BeerSVG },
};
</script>

<style lang="scss" scoped>
.review {
    padding: 20px 0;

    &__top-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__left-side {
        display: flex;

        img {
            height: 100px;
            width: 100px;
        }
    }

    &__info {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    &__notes {
        font-style: italic;
        margin: 10px 0 10px 20px;
    }
}
</style>
