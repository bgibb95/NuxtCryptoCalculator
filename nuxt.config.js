module.exports = {
  mode: 'universal',

  head: {
    title: 'Bitcoin Price Calculator',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'A Bitcoin price calculator which can convert between BTC and another fiat currency or Ethereum'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  loading: '@/components/LoadingBar.vue',

  modules: ['@nuxtjs/axios', '@nuxtjs/pwa'],

  css: ['@/assets/sass/fonts.sass'],

  build: {
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    }
  }
}
