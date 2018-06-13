module.exports = {
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    proxy: true
  },
  proxy: {
    '/api/': {target: 'http://localhost:3001', pathRewrite: {'^/api/':''} }
  }
}