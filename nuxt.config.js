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
    cookie: {
      prefix: 'auth.',
      options: {
        path: '/'
      }
    },
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/'
    },
    strategies: {
      local: {
        endpoints: {
          login: {url: '/login', method: 'post', propertyName: 'data.attributes.token'},
          logout: {url: '/logout', method: 'delete'},
          user: false
        }
      }
    }
  },
  router: {
    middleware: ['auth']
  }
}