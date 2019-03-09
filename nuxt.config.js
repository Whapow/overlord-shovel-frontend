module.exports = {
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'bootstrap-vue/nuxt'
  ],
  axios: {
    host: 'localhost',
    port: 3001
  },
  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/'
    },
    strategies: {
      local: {
        endpoints: {
          login: {url: '/login', method: 'post', propertyName: 'token'},
          logout: {url: '/logout', method: 'delete'},
        }
      }
    },
    token: {
      prefix: '_token.'
    }
  },
  router: {
    middleware: ['auth']
  }
}