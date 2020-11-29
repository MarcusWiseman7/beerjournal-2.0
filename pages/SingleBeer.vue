<template>
    <div v-if="beer" class="beer">
        <div class="beer__title-row">
            <div class="beer__title-row--half">
                <img :src="beer.logo || beer.brewery.logo" alt="Logo" />
            </div>
            <div class="beer__info beer__title-row--half">
                <h1>{{ beer.brewery.name }}</h1>
                <h2>{{ beer.beerName }}</h2>
                <p>{{ beer.style }}</p>
            </div>
        </div>

        <div v-if="!reviewing">
            <b-rating :rating="beer.averageRating"></b-rating>

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

            <b-button group="main" modifier="outline" @clicked="reviewing = true">Add review</b-button>

            <beer-reviews :reviews="beer.reviews"></beer-reviews>
        </div>
        <beer-review-form v-else :beer="beer"></beer-review-form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BeerReviews from '@/components/BeerReviews';

export default {
    name: 'SingleBeer',
    components: { BeerReviews },
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
        beer() {
            return this.allBeers[this.id];
        },
    },
    created() {
        if (!this.$route.params || !this.$route.params.hasOwnProperty('id') || !this.$route.params.id)
            this.$router.replace('/');
    },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors';

.beer {
    padding: 40px 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__title-row {
        display: flex;
        margin-bottom: 40px;

        &--half {
            width: 50%;

            &:first-child {
                padding-right: 10px;
            }

            &:last-child {
                padding-left: 10px;
            }
        }
    }

    &__info {
        h1 {
            color: $maincolor;
            font-weight: 500;
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
</style>
