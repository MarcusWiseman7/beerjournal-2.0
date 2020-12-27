export default {
    methods: {
        canShow(o, q) {
            return !!(o && q && o.hasOwnProperty(q) && o[q]);
        },
        goBackOrIndex() {
            if (this.$router.$from) this.$router.go(-1);
            else this.$router.push('/');
        },
        prettyDate(d) {
            const date = new Date(d);
            return date.toLocaleDateString();
        },
    },
};
