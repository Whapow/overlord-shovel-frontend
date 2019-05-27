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
        path: '/',
        expires: 15
      }
    },
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/',
      user: '/profile'
    },
    strategies: {
      local: {
        endpoints: {
          login: {url: '/login', method: 'post', propertyName: 'data.attributes.token'},
          logout: {url: '/logout', method: 'delete'},
          user: {url: '/profile', method: 'get', propertyName: 'data.attributes'}
        }
      }
    }
  },
  router: {
    middleware: ['auth']
  },
  css: [
    '~/css/main.css'
  ]
}