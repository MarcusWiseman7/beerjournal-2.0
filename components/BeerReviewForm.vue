<template>
    <div class="review">
        <div class="rating-row">
            <label for="overall">Overall rating</label>
            <b-rating id="overall" :reviewing="true" :key="'my-rating'" @my-rating="myRating = $event"></b-rating>
            <p>({{ myRating }})</p>
        </div>

        <div class="rating-row">
            <label for="bitter">How bitter is it?</label>
            <b-rating id="bitter" :reviewing="true" :key="'bitter-rating'" @my-rating="bitter = $event"></b-rating>
            <p>({{ bitter }})</p>
        </div>

        <div class="rating-row">
            <label for="finish">Finish / aftertaste?</label>
            <b-rating id="finish" :reviewing="true" :key="'finish-rating'" @my-rating="finish = $event"></b-rating>
            <p>({{ finish }})</p>
        </div>

        <div class="rating-row">
            <b-input type="textarea" label="Tasting notes">
                <textarea
                    v-model="notes"
                    name="tasting_notes"
                    id="tasting_notes"
                    cols="70"
                    rows="4"
                    placeholder="My review..."
                    maxlength="400"
                ></textarea>
            </b-input>
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
            bitter: 0,
            finish: 0,
            notes: '',
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
