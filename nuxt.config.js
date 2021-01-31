const pkg = require('./package');

export default {
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'brewfoam',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'theme-color', content: 'rgba(0, 0, 0, 0.6)' },
            { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
            { hid: 'description', name: 'description', content: pkg.description },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/beer.svg' }],
    },

    loading: { color: '#ffa000', height: '4px' },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: ['@/assets/scss/main.scss'],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: ['@/plugins/my-global-components', '@/plugins/v-scroll-lock'],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    // buildModules: [['@nuxtjs/google-analytics', { id: 'UA-140466990-1' }]],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        'nuxt-compress',
        'nuxt-helmet',
        '@nuxtjs/component-cache',
        '@nuxtjs/auth',
        '@nuxtjs/proxy',
        '@nuxtjs/style-resources',
    ],

    styleResources: {
        scss: ['./assets/scss/_colors.scss', './assets/scss/_mixins.scss'],
    },

    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: {
        proxy: true,
    },
    proxy: {
        '/api/': {
            target: 'https://mdw-be.com',
            pathRewrite: {
                '^/api/': '/',
            },
        },
        '/api2/': {
            target: 'https://mdw-be.com',
            pathRewrite: {
                '^/api2/': '/beerjournal/',
            },
        },
    },
    'nuxt-compress': {
        gzip: {
            cache: true,
        },
        brotli: {
            threshold: 10240,
        },
    },
    auth: {
        redirect: {
            login: '/',
            logout: '/',
            callback: '/',
            home: '/',
        },
        strategies: {
            local: {
                endpoints: {
                    login: { url: '/api/auth/login', method: 'post', propertyName: 'token' },
                    logout: { url: '/api/auth/logout', method: 'post' },
                    user: { url: '/api/auth/user', method: 'get', propertyName: 'user' },
                },
            },
        },
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        transpile: ['v-body-scroll-lock'],
    },
};
