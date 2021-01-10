<template>
    <div v-if="beer" class="beer">
        <div class="back" @click="goBack">
            <img src="@/assets/icons/arrow_back.svg" alt="Back" />
        </div>
        <div class="beer__title-row">
            <div class="beer__title-row--half">
                <nuxt-link :to="`/SingleBrewery/${beer.brewery._id}`">
                    <img :src="beer.logo || beer.brewery.logo" alt="Logo" />
                </nuxt-link>
            </div>
            <div class="beer__info beer__title-row--half">
                <nuxt-link :to="`/SingleBrewery/${beer.brewery._id}`">
                    <h1>{{ beer.brewery.name }}</h1>
                </nuxt-link>
                <h2>{{ beer.beerName }}</h2>
                <p>{{ beer.style }}</p>
            </div>
        </div>

        <div v-if="!reviewing" class="beer__content">
            <b-rating :id="'single-beer-' + id" :rating="beer.averageRating"></b-rating>

            <div class="beer__stats">
                <div class="beer__stats--half">
                    <div class="beer__stat">{{ beer.degrees }}</div>
                    <div class="beer__stat">{{ beer.totalNumberOfRatings }} reviews</div>
                </div>
                <div class="beer__stats--half">
                    <div class="beer__stat">{{ beer.abv || '-' }} abv</div>
                    <div class="beer__stat">{{ beer.bi || '-' }} bi</div>
                </div>
            </div>

            <b-button class="button" group="main" modifier="outline" @clicked="reviewing = true">Add review</b-button>

            <beer-reviews :reviews="reviews"></beer-reviews>
        </div>
        <beer-review-form v-else :beer="beer" @close="reviewing = false"></beer-review-form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BeerReviews from '@/components/BeerReviews';
import helpers from '@/helpers';

export default {
    name: 'SingleBeer',
    mixins: [helpers],
    components: { BeerReviews },
    async asyncData({ params, store, redirect }) {
        if (!params.id) return redirect('/');
        if (!store.getters.allBeers || !store.getters.allBeers.length > 0) {
            await store.dispatch('getAllBeers');
        }
        if (!store.getters.allBeers.hasOwnProperty(params.id)) {
            await store.dispatch('getBeer', params.id);
        }
        const beer = store.getters.allBeers[params.id];
        const reviews = store.state.reviews.filter(x => x.beer == beer._id);
        return { beer, reviews };
    },
    data() {
        return {
            reviewing: false,
        };
    },
    computed: {
        ...mapGetters(['allBeers']),
        id() {
            return this.$route.params.id;
        },
    },
    methods: {
        goBack() {
            if (this.reviewing) this.reviewing = false;
            else this.goBackOrIndex();
        },
    },
    created() {
        if (!this.$route.params || !this.$route.params.hasOwnProperty('id') || !this.$route.params.id) {
            this.$router.replace('/');
        }
    },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors';

.button {
    margin-bottom: 20px;
}

.beer {
    padding: 40px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    &__title-row {
        display: flex;
        margin-bottom: 40px;

        &--half {
            width: 50%;

            img {
                width: 100px;
            }

            &:first-child {
                padding-right: 10px;
            }

            &:last-child {
                padding-left: 10px;
            }
        }
    }

    &__content {
        width: 100%;
        max-width: 600px;
    }

    &__info {
        h1 {
            color: $maincolor;
            font-weight: 500;
            cursor: pointer;
        }
    }

    &__stats {
        display: flex;
        width: 100%;
        max-width: 800px;
        margin: 40px 0;
        height: 140px;

        &--half {
            width: 50%;

            &:first-child {
                border-right: 1px solid $lighttextcolor;
            }
        }
    }

    &__stat {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        height: 50%;
    }
}

.back {
    position: absolute;
    left: 0;
    top: 0;
    padding: 20px;
    cursor: pointer;
}
</style>
