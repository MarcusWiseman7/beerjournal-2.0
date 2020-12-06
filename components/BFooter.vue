<template>
    <footer>
        <span>&copy; {{ date }} by Marcus Wiseman</span>
    </footer>
</template>

<script>
export default {
    name: 'BFooter',
    computed: {
        date() {
            return new Date().getFullYear();
        },
    },
};
</script>

<style lang="scss" scoped>
footer {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 100vw;
    background-color: #fff;
    z-index: 1;

    span {
        margin: 24px 0;
        font-size: 14px;
    }
}
</style>
