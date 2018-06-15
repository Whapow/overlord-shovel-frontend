module.exports = {
  modules: [
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt'
  ],
  axios: {
    proxy: true
  },
  proxy: {
    '/api/': {target: 'http://localhost:3001', pathRewrite: {'^/api/':''} }
  }
}