export default {
    methods: {
        canShow(o, q) {
            return !!(o && q && o.hasOwnProperty(q) && o[q]);
        },
    },
};
