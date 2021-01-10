import Vue from 'vue';

export const state = () => ({
    beers: [],
    breweries: [],
    reviews: [],
    topBeers: null,
    loading: false,
    breweryInfo: {},
    bMessage: null,
    loginPopup: false,
    isSmallScreen: true,
    isTouchScreen: true,
    isPhoneSize: true,
    searchResults: null,
    searchQuery: '',
});

export const getters = {
    darkMode: state => (state.auth.loggedIn ? state.auth.user.darkMode : false),
    myProfile: state => (state.auth.loggedIn ? state.auth.user : null),
    myId: state => (state.auth.loggedIn ? state.auth.user._id : null),
    allBeers: state => {
        return state.beers.reduce((acc, cur) => {
            acc[cur._id] = cur;
            return acc;
        }, {});
    },
    allBreweries: state => {
        return state.breweries.reduce((acc, cur) => {
            acc[cur._id] = cur;
            return acc;
        }, {});
    },
    topBeers: state => state.beers.filter(x => x.averageRating > 4),
};

export const mutations = {
    setObj(state, params) {
        Vue.set(state, params.name, params.obj);
    },
    toggle(state, item) {
        state[item] = !state[item];
    },
    updateBeerList(state, beer) {
        const indx = state.beers.findIndex(x => x._id == beer._id);
        if (indx >= 0) state.beers.slice(indx, 1, beer);
        else state.beers.push(beer);
    },
    updateBreweryList(state, brewery) {
        const indx = state.breweries.findIndex(x => x._id == brewery.id);
        if (indx >= 0) state.breweries.slice(indx, 1, brewery);
        else state.breweries.push(brewery);
    },
};

export const actions = {
    async nuxtServerInit({ commit }, { app }) {
        await app.$axios
            .$get('/api2/beers/allBeers')
            .then(res => {
                if (res && res.beers && res.breweries) {
                    commit('setObj', { name: 'beers', obj: res.beers });
                    commit('setObj', { name: 'breweries', obj: res.breweries });
                    commit('setObj', { name: 'reviews', obj: res.reviews });
                    commit('setObj', { name: 'topBeers', obj: res.topBeers });
                }
            })
            .catch(err => {
                console.warn('Server init error :>> ', err);
            })
            .finally(() => {
                return;
            });
    },
    initApp({ commit }) {
        [
            ['isTouchScreen', !!('ontouchstart' in window || navigator.maxTouchPoints)],
            ['isSmallScreen', !!(window.innerWidth < 400)],
            ['isPhoneSize', !!(window.innerWidth < 600)],
        ].forEach(x => commit('setObj', { name: x[0], obj: x[1] }));
    },
    login({ state, commit, getters }, params) {
        if (getters.myId) return;
        commit('toggle', 'loading');

        return this.$auth
            .loginWith('local', {
                data: { email: params.email.toLowerCase(), password: params.password },
            })
            .then(() => {
                setTimeout(() => {
                    if (getters.myProfile) {
                        if (state.loginPopup) commit('toggle', 'loginPopup');
                        commit('setObj', {
                            name: 'bMessage',
                            obj: { message: `Welcome back, ${getters.myProfile.displayName}!` },
                        });
                    }
                }, 0);
            })
            .catch(err => {
                console.warn('Login error :>> ', err);
                commit('setObj', {
                    name: 'bMessage',
                    obj: { message: 'Login error, please try again', name: 'error' },
                });
                return { statusCode: -1 };
            })
            .finally(() => {
                commit('toggle', 'loading');
            });
    },
    logout({ commit, getters }) {
        if (!getters.myId) return;
        commit('toggle', 'loading');

        this.$auth
            .logout({ data: { id: getters.myId } })
            .then(() => {
                commit('setObj', {
                    name: 'bMessage',
                    obj: { message: 'Logged out, see you soon..' },
                });
            })
            .catch(err => {
                console.warn('Logout error :>> ', err);
                commit('setObj', {
                    name: 'bMessage',
                    obj: { message: 'Logout error, please try again', name: 'error' },
                });
            })
            .finally(() => {
                commit('toggle', 'loading');
            });
    },
    forgotPassword({ commit, getters }, email) {
        if (getters.myId) return;
        commit('toggle', 'loading');

        this.$axios
            .$post('/api/users/forgotPassword', { email })
            .then(() => {
                commit('setObj', {
                    name: 'bMessage',
                    obj: {
                        message: 'An email has been sent to you with instructions to reset your password',
                        countdown: 6000,
                    },
                });
            })
            .catch(err => {
                console.warn('Forgot password error :>> ', err);
                commit('setObj', {
                    name: 'bMessage',
                    obj: { message: 'Forgot password error, please try again', name: 'error' },
                });
            })
            .finally(() => {
                commit('toggle', 'loading');
            });
    },
    async checkDB({ commit }, params) {
        commit('toggle', 'loading');

        return await this.$axios
            .$post('/api/users/checkDB', params)
            .then(res => {
                return res;
            })
            .catch(err => {
                console.warn('Check DB error :>> ', err);
                commit('setObj', {
                    name: 'bMessage',
                    obj: { message: 'Check DB error, please try again', name: 'error' },
                });
            })
            .finally(() => {
                commit('toggle', 'loading');
                return;
            });
    },
    addUser({ commit, dispatch }, params) {
        commit('toggle', 'loading');

        this.$axios
            .$post('/api/users/addNewUser', params)
            .then(res => {
                if (res.statusCode > 0) {
                    dispatch('login', params);
                } else {
                    console.warn('addUser error :>> ', err);
                    commit('setObj', {
                        name: 'bMessage',
                        obj: { message: 'Add user error, please try again', name: 'error' },
                    });
                }
            })
            .catch(err => {
                console.warn('addUser error :>> ', err);
                commit('setObj', {
                    name: 'bMessage',
                    obj: { message: 'Add user error, please try again', name: 'error' },
                });
            })
            .finally(() => {
                commit('toggle', 'loading');
                return;
            });
    },
    async deleteUser({ commit, dispatch }, id) {
        commit('toggle', 'loading');

        return await this.$axios
            .$delete(`/api/users/deleteUser/${id}`)
            .then(() => {
                commit('setObj', {
                    name: 'bMessage',
                    obj: { message: 'Deleted user', countdown: 6000 },
                });
                dispatch('getAllUsers');
            })
            .catch(err => {
                console.warn('deleteUser error :>> ', err);
                commit('setObj', {
                    name: 'bMessage',
                    obj: { message: 'Delete user error', name: 'error' },
                });
            })
            .finally(() => {
                commit('toggle', 'loading');
                return;
            });
    },
    filterBeers({ state, commit }, q) {
        if (!q || !q.length) return commit('setObj', { name: 'searchResults', obj: null });
        const arr = state.beers.filter(x => x.beerName.includes(q) || x.brewery.name.includes(q));
        commit('setObj', { name: 'searchQuery', obj: q });
        commit('setObj', { name: 'searchResults', obj: arr });
    },
    async getAllBeers({ commit }) {
        await this.$axios
            .$get('/api2/beers/allBeers')
            .then(res => {
                if (res && res.beers && res.breweries) {
                    commit('setObj', { name: 'beers', obj: res.beers });
                    commit('setObj', { name: 'breweries', obj: res.breweries });
                    commit('setObj', { name: 'reviews', obj: res.reviews });
                    commit('setObj', { name: 'topBeers', obj: res.topBeers });
                }
            })
            .catch(err => {
                console.warn('Get all error :>> ', err);
            })
            .finally(() => {
                return;
            });
    },
    async getBeer({ commit }, id) {
        return await this.$axios
            .$get(`/api2/beers/getBeer/${id}`)
            .then(res => {
                commit('updateBeerList', res.data.beer);
            })
            .catch(err => {
                console.warn('Get beer error :>> ', err);
            })
            .finally(() => {
                return;
            });
    },
    async getBrewery({ commit }, id) {
        return await this.$axios
            .$get(`/api2/breweries/getBrewery/${id}`)
            .then(res => {
                commit('updateBreweryList', res.data.brewery);
            })
            .catch(err => {
                console.warn('Get brewery error :>> ', err);
            })
            .finally(() => {
                return;
            });
    },
    async getReviewsForBeer({ commit }, id) {
        commit('toggle', 'loading');

        return await this.$axios
            .$get('/api2/reviews/' + id)
            .then(res => {
                return res.data.reviews;
            })
            .catch(err => {
                console.warn('Get reviews error :>> ', err);
            })
            .finally(() => {
                commit('toggle', 'loading');
            });
    },
    async addReview({ commit }, params) {
        commit('toggle', 'loading');

        return await this.$axios
            .$post('/api2/reviews/addReview', params)
            .then(res => {
                console.log('res :>> ', res);
                commit('updateBeerList', res.data.beer);
                commit('setObj', {
                    name: 'bMessage',
                    obj: { message: 'Review added', countdown: 4000 },
                });
            })
            .catch(err => {
                console.warn('Add review error :>> ', err);
                commit('setObj', {
                    name: 'bMessage',
                    obj: { message: 'Add review error, please try again', name: 'error' },
                });
            })
            .finally(() => {
                commit('toggle', 'loading');
                return;
            });
    },
};
