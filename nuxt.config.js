const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/todo/'
  }
} : {}

export default {
  ...routerBase,
  mode: 'universal',
  target: 'server',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: 'https://kit.fontawesome.com/644c1e2c5a.js',
        crossorigin: 'anonymous'
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/styles.scss'
  ],
  webfontloader: {
    google: {
      families: ['Roboto:100,200,300,400,500,600,700,800,900'] //Loads Lato font with weights 400 and 700
    }
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  components: false,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/style-resources',
    'nuxt-webfontloader',
    'vue-sweetalert2/nuxt'
  ],
  styleResources: {
    scss: [
      '@/assets/styles/variables/_colors.scss',
      '@/assets/styles/mixins/_global.scss',
      '@/assets/styles/layout/_typography.scss',
      '@/assets/styles/layout/_zindex.scss'
    ]
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
