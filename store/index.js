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
    loginPopupObj: { title: 'Login', text: 'Enter your email and password to login' },
    isSmallScreen: true,
    isVerySmallScreen: false,
    isTouchScreen: true,
    isPhoneSize: true,
    searchResults: null,
    searchQuery: '',
    authContact: null,
    darkMode: false,

    navigationItems: [
        { name: 'Home', route: { name: 'index' } },
        { name: 'Discover', route: { name: 'Discover' } },
        { name: 'Profile', route: { name: 'Profile' } },
    ],
    socialItems: [
        { name: 'Instagram', icon: require('@/assets/icons/nav/instagram.svg'), route: 'https://google.com' },
        { name: 'Facebook', icon: require('@/assets/icons/nav/facebook.svg'), route: 'https://google.com' },
        { name: 'Google', icon: require('@/assets/icons/nav/google.svg'), route: 'https://google.com' },
    ],
    footerItems: [
        { name: 'Privacy', route: { name: 'index' } },
        { name: 'Terms', route: { name: 'index' } },
        { name: 'Advertising', route: { name: 'index' } },
        { name: 'Ad choices', route: { name: 'index' } },
        { name: 'Cookies', route: { name: 'index' } },
    ],
});

export const getters = {
    darkMode: state => (state.auth.loggedIn ? state.auth.user.darkMode : false),
    myProfile: state => (state.auth.loggedIn ? state.auth.user : null),
    myId: state => (state.auth.loggedIn ? state.auth.user._id : null),
    marcus: state => state.auth.loggedIn && state.auth.user.email == 'md.wiseman@hotmail.com',
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
    setDarkMode(state, dm) {
        state.darkMode = dm;
    },
    updateBeerList(state, beers) {
        beers.forEach(b => {
            const indx = state.beers.findIndex(x => x._id == b._id);
            if (indx >= 0) state.beers.slice(indx, 1, b);
            else state.beers.push(b);
        });
    },
    updateBreweryList(state, brewery) {
        const indx = state.breweries.findIndex(x => x._id == brewery._id);
        if (indx >= 0) state.breweries.slice(indx, 1, brewery);
        else state.breweries.push(brewery);
    },
    updateReviewsList(state, reviews) {
        reviews.forEach(r => {
            const indx = state.reviews.findIndex(x => x._id == r._id);
            if (indx == -1) state.reviews.push(r);
        });
    },
};

export const actions = {
    async nuxtServerInit({ commit }, { app, $cookies }) {
        // if ($cookies.get('darkMode')) {
        //     commit('setDarkMode', $cookies.get('darkMode'));
        // }

        await app.$axios
            .$get('/api2/beers/topBeers')
            .then(res => {
                if (res && res.topBeers) {
                    commit('updateReviewsList', res.reviews);
                    commit('setObj', { name: 'beers', obj: res.topBeers });
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
    initApp({ commit, dispatch }) {
        // if (!this.$cookies.get('darkMode')) {
        //     let darkMode;
        //     if (window.matchMedia) darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        //     else darkMode = false;

        //     dispatch('setCookie', `darkMode=${darkMode}`);
        // }

        [
            ['isTouchScreen', !!('ontouchstart' in window || navigator.maxTouchPoints)],
            ['isVerySmallScreen', !!(window.innerWidth < 390)],
            ['isSmallScreen', !!(window.innerWidth < 420)],
            ['isPhoneSize', !!(window.innerWidth < 600)],
        ].forEach(x => commit('setObj', { name: x[0], obj: x[1] }));
    },
    setCookie({ commit }, blah) {
        const c = blah.split('=');
        switch (c[0]) {
            case 'darkMode':
                this.$axios.$post('/api/users/setCookie', {
                    name: 'darkMode',
                    value: c[1],
                    expires: Math.round((Date.now() + 3600000 * 24 * 365 * 2) / 1000),
                });
                break;
        }
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
                            obj: {
                                message: `Welcome back, ${getters.myProfile.displayName || getters.myProfile.name}!`,
                            },
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
        const baseURL = process.env.NODE_ENV == 'production' ? 'https://brewfoam.com' : 'http://localhost:3000';

        this.$axios
            .$post('/api/users/forgotPassword', { email, baseURL })
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
                commit('toggle', 'loginPopup');
                commit('toggle', 'loading');
                commit('setObj', {
                    name: 'loginPopupObj',
                    obj: { title: 'Login', text: 'Enter your email and password to login' },
                });
            });
    },
    async checkDB({ commit }, params) {
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
    async searchDB({ commit }, q) {
        try {
            if (!q || !q.length) {
                commit('setObj', { name: 'searchQuery', obj: '' });
                return commit('setObj', { name: 'searchResults', obj: null });
            }
            return await this.$axios
                .$get('/api2/beers/search/' + q)
                .then(res => {
                    commit('setObj', { name: 'searchQuery', obj: q });
                    commit('setObj', { name: 'searchResults', obj: res.results });
                })
                .catch(err => {
                    console.log('Search err :>> ', err);
                })
                .finally(() => {
                    return;
                });
        } catch (err) {
            console.warn('Search DB err :>> ', err);
        }
    },
    async getAllBeers({ commit }) {
        await this.$axios
            .$get('/api2/beers/allBeers')
            .then(res => {
                if (res && res.beers && res.breweries) {
                    commit('setObj', { name: 'beers', obj: res.beers });
                    // commit('setObj', { name: 'breweries', obj: res.breweries });
                    // commit('setObj', { name: 'reviews', obj: res.reviews });
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
            .$get(`/api2/beers/singleBeer/${id}`)
            .then(res => {
                commit('updateReviewsList', res.reviews);
                commit('updateBeerList', [res.beer]);
            })
            .catch(err => {
                console.warn('Get beer error :>> ', err);
            })
            .finally(() => {
                return;
            });
    },
    async addNewBeer({ commit }, params) {
        commit('toggle', 'loading');

        return await this.$axios
            .$post('/api2/beers/addNewBeer', params)
            .then(res => {
                commit('setObj', {
                    name: 'bMessage',
                    obj: {
                        message: 'Added your beer! After review it will be searchable on BrewFoam!',
                        countdown: 6000,
                    },
                });
            })
            .catch(err => {
                console.warn('Add new beer error :>> ', err);
            })
            .finally(() => {
                commit('toggle', 'loading');
                return;
            });
    },
    async getBrewery({ commit }, id) {
        return await this.$axios
            .$get(`/api2/breweries/getBrewery/${id}`)
            .then(res => {
                commit('updateBeerList', res.beers);
                commit('updateReviewsList', res.reviews);
                commit('updateBreweryList', res.brewery);
            })
            .catch(err => {
                console.warn('Update brewery rating err :>> ', err);
            })
            .finally(() => {
                return;
            });
    },
    async addReview({ commit }, params) {
        commit('toggle', 'loading');

        return await this.$axios
            .$post('/api2/reviews/addReview', params)
            .then(res => {
                console.log('res :>> ', res);
                commit('updateReviewsList', [res.review]);
                commit('updateBeerList', [res.beer]);
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
    normalizeNamesInDB({}) {
        this.$axios
            .$patch('/api2/beers/normalizeNames')
            .then(res => {
                console.log('res :>> ', res);
            })
            .catch(err => {
                console.warn('Axios catch err :>> ', err);
            });
    },
    generalDBUpdate({}) {
        this.$axios
            .$patch('/api2/beers/updateDB')
            .then(res => {
                console.log('res :>> ', res);
            })
            .catch(err => {
                console.warn('Axios catch err :>> ', err);
            });
    },
};
