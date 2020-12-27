<template>
    <ul v-if="reviews">
        <li v-for="r in reviews" :key="r._id" class="review">
            <img v-if="r.pic" :src="r.pic" alt="Review pic" />
            <img
                v-else
                src="https://res.cloudinary.com/dukumou2e/image/upload/v1557745360/breweries/lazy-src_zpkrwj.jpg"
                alt="Beer"
            />
            <div class="review__info">
                <div class="review__top-row">
                    <div>
                        <h3>{{ r.reviewer.name }}</h3>
                        <p>{{ prettyDate(r.date || r.dateCreated) }}</p>
                    </div>
                    <b-rating :rating="r.rating" :size="16" :id="r._id"></b-rating>
                </div>
                <p v-if="r.notes && r.notes.length > 0" class="review__notes">"{{ r.notes }}"</p>
            </div>
        </li>
    </ul>
</template>

<script>
import helpers from '@/helpers';

export default {
    name: 'BeerReviews',
    mixins: [helpers],
    props: {
        reviews: { type: Array, default: () => null },
    },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixins';

.review {
    padding: 20px;
    display: flex;

    @include breakpoint(m) {
        padding: 20px 0;
    }

    img {
        height: 100px;
        width: 100px;
    }

    &__info {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    &__top-row {
        width: 100%;
        display: flex;
        justify-content: space-between;

        p {
            font-size: 12px;
        }
    }

    &__notes {
        margin-top: 10px;
        text-align: right;
        font-style: italic;
    }
}
</style>
