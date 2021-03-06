<template>
    <div class="rating">
        <BeerSVG
            v-for="b in 5"
            :key="id + '-' + b"
            :percent="percents[b - 1]"
            :ids="id + '-' + b.toString()"
            :size="size"
            @mouseenter.native="mEnter(b)"
            @mouseleave.native="mLeave(b)"
            @click.native="onClick(b)"
            :class="{ pointer: reviewing }"
        ></BeerSVG>
        <div v-if="!reviewing && cRating" class="number" :class="{ small: size < 70 }">({{ cRating }})</div>
    </div>
</template>

<script>
import BeerSVG from '@/components/BeerSVG';

export default {
    name: 'BRating',
    components: { BeerSVG },
    props: {
        rating: { type: Number, default: 0 },
        reviewing: { type: Boolean, default: false },
        id: { type: String, required: true },
        size: { type: Number, default: 70 },
    },
    data() {
        return {
            cRating: 0,
            pRating: 0,
            hovering: [],
        };
    },
    computed: {
        percents() {
            let whole = Math.floor(this.cRating);
            let left = 4 - whole;
            let arr = [];
            for (let i = 0; i < whole; i++) {
                arr.push(90);
            }
            arr.push((this.cRating - whole) * 100);
            for (let i = 0; i < left; i++) {
                arr.push(0);
            }
            return arr;
        },
    },
    methods: {
        mEnter(b) {
            if (!this.reviewing || this.pRating > 0) return;
            this.hovering.push(b);
            this.calcRating();
        },
        mLeave(b) {
            if (!this.reviewing || this.pRating > 0) return;
            this.hovering.splice(this.hovering.indexOf(b), 1);
            this.calcRating();
        },
        onClick(b) {
            this.pRating = b;
            this.cRating = this.pRating;
            this.$emit('my-rating', this.pRating);
            this.$emit('clicked');
        },
        calcRating() {
            const current = Math.max(this.hovering);
            this.cRating = current;
            this.$emit('my-rating', this.cRating);
        },
    },
    created() {
        if (this.reviewing) return;
        this.cRating = this.rating;
    },
};
</script>

<style lang="scss" scoped>
.rating {
    display: flex;
    align-items: center;
    justify-content: center;
    height: max-content;
}

.pointer {
    cursor: pointer;
}

.number {
    margin-left: 8px;
}

.small {
    font-size: 12px;
    margin-left: 2px;
}
</style>
