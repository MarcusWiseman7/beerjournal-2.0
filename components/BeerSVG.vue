<template>
    <svg class="icon" xmlns="http://www.w3.org/2000/svg">
        <linearGradient :id="`b${ids}`" x1="0.5" y1="1" x2="0.5" y2="0">
            <stop offset="0%" stop-color="#ffa000" stop-opacity="1" />
            <stop :offset="`${percent}%`" stop-color="#ffe3b3" stop-opacity="1" />
            <stop :offset="`${percent}%`" stop-color="#ffe3b3" stop-opacity="1" />
            <stop :offset="`${percent + 10}%`" stop-color="#f5f5f5" stop-opacity="0" />
            <stop :offset="`${percent + 10}%`" stop-color="#f5f5f5" stop-opacity="0" />
            <stop offset="100%" stop-color="#f5f5f5" stop-opacity="0" />
        </linearGradient>

        <rect
            x="10"
            y="10"
            rx="4"
            ry="4"
            stroke="rgba(0, 0, 0, 0.1)"
            stroke-width="4"
            height="55"
            width="40"
            :fill="`url(#b${ids})`"
        />
        <line x1="23" x2="23" y1="20" y2="55" stroke="rgba(0, 0, 0, 0.05)" stroke-width="6" />
        <line x1="37" x2="37" y1="20" y2="55" stroke="rgba(0, 0, 0, 0.05)" stroke-width="6" />
        <path
            d="M 51.75 20 l 12 1 v 30 l -12 1"
            stroke="rgba(0, 0, 0, 0.1)"
            stroke-width="5"
            stroke-linejoin="round"
            fill="none"
        />
    </svg>
</template>

<script>
export default {
    name: 'BeerSVG',
    props: {
        percent: { type: Number, default: 0 },
        ids: { type: String, default: '' },
    },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixins';

.icon {
    width: 65px;
    height: 65px;

    @include breakpoint(xs) {
        width: 70px;
        height: 75px;
    }
}
</style>
