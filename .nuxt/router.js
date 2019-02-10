import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _4ad4109d = () => import('../pages/login/index.vue' /* webpackChunkName: "pages/login/index" */).then(m => m.default || m)
const _6504c1cd = () => import('../pages/users/new/index.vue' /* webpackChunkName: "pages/users/new/index" */).then(m => m.default || m)
const _01e2ca33 = () => import('../pages/users/_user_id/profile/index.vue' /* webpackChunkName: "pages/users/_user_id/profile/index" */).then(m => m.default || m)
const _d4398170 = () => import('../pages/campaigns/_campaign_id/journals/index.vue' /* webpackChunkName: "pages/campaigns/_campaign_id/journals/index" */).then(m => m.default || m)
const _1cabec14 = () => import('../pages/users/_user_id/characters/index.vue' /* webpackChunkName: "pages/users/_user_id/characters/index" */).then(m => m.default || m)
const _7840558a = () => import('../pages/campaigns/_campaign_id/journals/_journal_id/index.vue' /* webpackChunkName: "pages/campaigns/_campaign_id/journals/_journal_id/index" */).then(m => m.default || m)
const _154a975e = () => import('../pages/campaigns/_campaign_id/shiny_pile/index.vue' /* webpackChunkName: "pages/campaigns/_campaign_id/shiny_pile/index" */).then(m => m.default || m)
const _01d2a157 = () => import('../pages/users/_user_id/reset_password/index.vue' /* webpackChunkName: "pages/users/_user_id/reset_password/index" */).then(m => m.default || m)
const _14d486aa = () => import('../pages/forgot_password/index.vue' /* webpackChunkName: "pages/forgot_password/index" */).then(m => m.default || m)
const _03f00283 = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/login",
			component: _4ad4109d,
			name: "login"
		},
		{
			path: "/users/new",
			component: _6504c1cd,
			name: "users-new"
		},
		{
			path: "/users/:user_id?/profile",
			component: _01e2ca33,
			name: "users-user_id-profile"
		},
		{
			path: "/campaigns/:campaign_id?/journals",
			component: _d4398170,
			name: "campaigns-campaign_id-journals"
		},
		{
			path: "/users/:user_id?/characters",
			component: _1cabec14,
			name: "users-user_id-characters"
		},
		{
			path: "/campaigns/:campaign_id?/journals/:journal_id",
			component: _7840558a,
			name: "campaigns-campaign_id-journals-journal_id"
		},
		{
			path: "/campaigns/:campaign_id?/shiny:pile?",
			component: _154a975e,
			name: "campaigns-campaign_id-shinypile"
		},
		{
			path: "/users/:user_id?/reset:password?",
			component: _01d2a157,
			name: "users-user_id-resetpassword"
		},
		{
			path: "/forgot:password",
			component: _14d486aa,
			name: "forgotpassword"
		},
		{
			path: "/",
			component: _03f00283,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
