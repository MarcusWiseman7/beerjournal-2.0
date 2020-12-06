export const state = () => ({
    beers: [],
    breweries: [],
    loading: false,
    breweryInfo: {},
    bMessage: null,
    loginPopup: false,
    topBeers: [
        {
            averagePrice: 85,
            averageRating: 4,
            beerName: 'Apollo Galaxy',
            brewery: {
                averageBeerRating: 0,
                dateCreated: '2019-05-13T13:22:29.206Z',
                description:
                    'Pivovar Matuška byl založen 13.4.2009 na Velikonoční pondělí . V tento den zde byla uvařena první várka, speciálního tmavého piva. Realizace pivovaru trvala dva roky. Svou velikostí se pivovar řadí do kategorie minipivovarů. Pivovar založil sládek Martin Matuška, který v pivovarnickém oboru pracuje od roku 1981. Pivovar Matuška najdete v obci Broumy, která leží v Chráněné krajinné oblasti Křivoklátsko. Zrealizovat vlastní minipivovar se podařilo jen díky morální podpoře a finanční pomoci celé rodiny. Také pomohlo vědomí, že mladší syn Adam chce v pivovarnickém řemesle pokračovat.↵Pivo vaříme řemeslným způsobem bez filtrace či pasterizace.',
                location: 'Broumy, Czech Republic',
                logo: 'https://res.cloudinary.com/dukumou2e/image/upload/v1557818967/breweries/matuska_zv2sfm.jpg',
                name: 'Matuška',
                sumOfAllBeerRatings: 0,
                totalNumberOfBeerRatings: 0,
                type: 'Micro-brewery',
                __v: 0,
                _id: '5cd96f95ca27252c69a813c6',
            },
            degrees: 13,
            logo: '',
            style: 'APA/Pale Ale',
            totalNumberOfRatings: 2,
            _id: '5cb745c36ab6360801bebdad',
        },
        {
            averagePrice: 79,
            averageRating: 5,
            beerName: 'California',
            brewery: {
                averageBeerRating: 0,
                dateCreated: '2019-05-13T13:22:29.206Z',
                description:
                    'Pivovar Matuška byl založen 13.4.2009 na Velikonoční pondělí . V tento den zde byla uvařena první várka, speciálního tmavého piva. Realizace pivovaru trvala dva roky. Svou velikostí se pivovar řadí do kategorie minipivovarů. Pivovar založil sládek Martin Matuška, který v pivovarnickém oboru pracuje od roku 1981. Pivovar Matuška najdete v obci Broumy, která leží v Chráněné krajinné oblasti Křivoklátsko. Zrealizovat vlastní minipivovar se podařilo jen díky morální podpoře a finanční pomoci celé rodiny. Také pomohlo vědomí, že mladší syn Adam chce v pivovarnickém řemesle pokračovat.↵Pivo vaříme řemeslným způsobem bez filtrace či pasterizace.',
                location: 'Broumy, Czech Republic',
                logo: 'https://res.cloudinary.com/dukumou2e/image/upload/v1557818967/breweries/matuska_zv2sfm.jpg',
                name: 'Matuška',
                sumOfAllBeerRatings: 0,
                totalNumberOfBeerRatings: 0,
                type: 'Micro-brewery',
                __v: 0,
                _id: '5cd96f95ca27252c69a813c6',
            },
            degrees: 12,
            style: 'APA/Pale Ale',
            totalNumberOfRatings: 1,
            _id: '5cb745f56ab6360801bebdae',
        },
        {
            averagePrice: 83,
            averageRating: 5,
            beerName: 'Eldorado',
            brewery: {
                averageBeerRating: 0,
                dateCreated: '2019-05-13T13:22:29.206Z',
                description:
                    'Pivovar Matuška byl založen 13.4.2009 na Velikonoční pondělí . V tento den zde byla uvařena první várka, speciálního tmavého piva. Realizace pivovaru trvala dva roky. Svou velikostí se pivovar řadí do kategorie minipivovarů. Pivovar založil sládek Martin Matuška, který v pivovarnickém oboru pracuje od roku 1981. Pivovar Matuška najdete v obci Broumy, která leží v Chráněné krajinné oblasti Křivoklátsko. Zrealizovat vlastní minipivovar se podařilo jen díky morální podpoře a finanční pomoci celé rodiny. Také pomohlo vědomí, že mladší syn Adam chce v pivovarnickém řemesle pokračovat.↵Pivo vaříme řemeslným způsobem bez filtrace či pasterizace.',
                location: 'Broumy, Czech Republic',
                logo: 'https://res.cloudinary.com/dukumou2e/image/upload/v1557818967/breweries/matuska_zv2sfm.jpg',
                name: 'Matuška',
                sumOfAllBeerRatings: 0,
                totalNumberOfBeerRatings: 0,
                type: 'Micro-brewery',
                __v: 0,
                _id: '5cd96f95ca27252c69a813c6',
            },
            degrees: 13,
            style: 'APA/Pale Ale',
            totalNumberOfRatings: 1,
            _id: '5cb7461b6ab6360801bebdaf',
        },
        {
            averagePrice: 77,
            averageRating: 0,
            beerName: 'Blizzard Winter Ale',
            brewery: {
                averageBeerRating: 0,
                dateCreated: '2019-05-13T20:18:50.826Z',
                description:
                    'Pivečko jsme měli odjakživa rádi. S postupným znechucením z univerzální chuti mnohých dnešních piv jsme pozvolna přešli k domácímu vaření a nakonec uzrála myšlenka podělit se o chutné pivo i s veřejností.↵↵V březnu 2013 jsme založili pivovar a o tři měsíce později zahájili provoz .Pivovar byl vybudován svépomocně, s nadšením a odhodláním a na jeho pořízení nebyla čerpána žádná dotace ani jiná podobná sprosťárna. Vaříme tradičním řemeslným způsobem z českých surovin, ale svátečně lze ochutnat i pivo např. ze zahraničních chmelů. Ohlasy na tuto pestrost jsou velmi pozitivní a tak k nám cestu nachází i lidé, kteří standardní pivo nepijí. Rozhodně v ní budeme pokračovat.',
                location: 'Dolní Ředice, Czech Republic',
                logo: 'https://res.cloudinary.com/dukumou2e/image/upload/v1557778589/breweries/mordyr_ateixz.jpg',
                name: 'Mordýř',
                sumOfAllBeerRatings: 0,
                totalNumberOfBeerRatings: 0,
                type: 'Micro-brewery',
                __v: 0,
                _id: '5cd9d12a6e997705063ae5fc',
            },
            degrees: 12,
            style: 'APA/Pale Ale',
            totalNumberOfRatings: 2,
            _id: '5cb747256ab6360801bebdb3',
        },
        {
            averagePrice: 79,
            averageRating: 4,
            beerName: 'Heart Attack',
            brewery: {
                averageBeerRating: 0,
                dateCreated: '2019-05-13T20:18:50.826Z',
                description:
                    'Pivečko jsme měli odjakživa rádi. S postupným znechucením z univerzální chuti mnohých dnešních piv jsme pozvolna přešli k domácímu vaření a nakonec uzrála myšlenka podělit se o chutné pivo i s veřejností.↵↵V březnu 2013 jsme založili pivovar a o tři měsíce později zahájili provoz .Pivovar byl vybudován svépomocně, s nadšením a odhodláním a na jeho pořízení nebyla čerpána žádná dotace ani jiná podobná sprosťárna. Vaříme tradičním řemeslným způsobem z českých surovin, ale svátečně lze ochutnat i pivo např. ze zahraničních chmelů. Ohlasy na tuto pestrost jsou velmi pozitivní a tak k nám cestu nachází i lidé, kteří standardní pivo nepijí. Rozhodně v ní budeme pokračovat.',
                location: 'Dolní Ředice, Czech Republic',
                logo: 'https://res.cloudinary.com/dukumou2e/image/upload/v1557778589/breweries/mordyr_ateixz.jpg',
                name: 'Mordýř',
                sumOfAllBeerRatings: 0,
                totalNumberOfBeerRatings: 0,
                type: 'Micro-brewery',
                __v: 0,
                _id: '5cd9d12a6e997705063ae5fc',
            },
            degrees: 16,
            style: 'IPA',
            totalNumberOfRatings: 1,
            _id: '5cb7477d6ab6360801bebdb5',
        },
    ],
});

export const getters = {
    darkMode: state => (state.auth.loggedIn ? state.auth.user.darkMode : false),
    myProfile: state => (state.auth.loggedIn ? state.auth.user : null),
    myId: state => (state.auth.loggedIn ? state.auth.user._id : null),
    allBeers: state => {
        return state.topBeers.reduce((acc, cur) => {
            acc[cur._id] = cur;
            return acc;
        }, {});
    },
    isTouchScreen() {
        return !!('ontouchstart' in window || navigator.maxTouchPoints);
    },
};

export const mutations = {
    setItem(state, item) {
        state[item] = item;
    },
    setObj(state, params) {
        state[params.name] = params.obj;
    },
    toggle(state, item) {
        state[item] = !state[item];
    },
    updateBeerList(state, beer) {
        const indx = state.beers.findIndex(x => x._id == beer._id);
        state.beers.slice(indx, 1, beer);
    },
};

export const actions = {
    // async nuxtServerInit({ commit }, { app }) {
    //     await app.$axios
    //         .$get('/beers/allBeers')
    //         .then(res => {
    //             if (res && res.beers && res.breweries) {
    //                 commit('setBeers', res.beers);
    //                 commit('setBreweries', res.breweries);
    //             }
    //         })
    //         .catch(err => {
    //             console.warn('Get beers and breweries error :>> ', err);
    //         })
    //         .finally(() => {
    //             return;
    //         });
    // },
    login({ commit, getters }, params) {
        if (getters.myId) return;
        commit('toggle', 'loading');

        return this.$auth
            .loginWith('local', {
                data: { email: params.email.toLowerCase(), password: params.password },
            })
            .then(() => {
                setTimeout(() => {
                    if (getters.myProfile) {
                        commit('toggle', 'loginPopup');
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
            .$get('/api/users/checkDB', params)
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
    async addReview({ commit, dispatch }, params) {
        commit('toggle', 'loading');

        return await this.$axios
            .$post('/api2/reviews/addReview', params)
            .then(async () => {
                commit('setObj', {
                    name: 'bMessage',
                    obj: { message: 'Review added', countdown: 4000 },
                });
                await dispatch('getBeer', params.beerId);
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
