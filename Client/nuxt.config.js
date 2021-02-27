
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
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
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    {
      src: 'ant-design-vue/dist/antd.less',
      lang: 'less'
    }
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/antd-ui'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      pathRewrite: {
        '^/api': '/'
      }
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    loaders: {
      less: {
        javascriptEnabled: true,  // 这里非常重要 否则编译的时候会报错
        modifyVars: {
          'primary-color':  'rgb(90, 20, 140)',
          'component-background': '#ffffff',
           'link-color': '#fff',
           'link-hover-color': '#f181fc',
           'link-active-color': '#f181fc',
        }
      }
    }
  },
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0' // default: localhost
  }
}
