import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _7e24bb82 = () => import('../pages/login/index.vue' /* webpackChunkName: "pages/login/index" */).then(m => m.default || m)
const _5fd765ed = () => import('../pages/campaigns/_campaign_id/journals/index.vue' /* webpackChunkName: "pages/campaigns/_campaign_id/journals/index" */).then(m => m.default || m)
const _6d3e2c60 = () => import('../pages/campaigns/_campaign_id/journals/_journal_id/index.vue' /* webpackChunkName: "pages/campaigns/_campaign_id/journals/_journal_id/index" */).then(m => m.default || m)
const _32cfa8c3 = () => import('../pages/campaigns/_campaign_id/shiny_pile/index.vue' /* webpackChunkName: "pages/campaigns/_campaign_id/shiny_pile/index" */).then(m => m.default || m)
const _003ffd28 = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



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
			component: _7e24bb82,
			name: "login"
		},
		{
			path: "/campaigns/:campaign_id?/journals",
			component: _5fd765ed,
			name: "campaigns-campaign_id-journals"
		},
		{
			path: "/campaigns/:campaign_id?/journals/:journal_id",
			component: _6d3e2c60,
			name: "campaigns-campaign_id-journals-journal_id"
		},
		{
			path: "/campaigns/:campaign_id?/shiny:pile?",
			component: _32cfa8c3,
			name: "campaigns-campaign_id-shinypile"
		},
		{
			path: "/",
			component: _003ffd28,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
