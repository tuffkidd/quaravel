/* eslint-disable indent */
import { preFetch, route } from 'quasar/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory
} from 'vue-router'
import routes from './routes'
import { useAuthStore } from 'src/stores/auth'

export default route(function ({ store }) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes: routes(store),

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE
    )
  })

  // Router.beforeEach((to, from, next) => {
  //   const authStore = useAuthStore(store)
  //   const publicAdminPaths = ['/admin/login', '/admin/recover']

  //   console.log('현재 라우트: ', to.name)

  //   console.log(
  //     'requiresAdmin: ',
  //     to.matched.some(route => route.meta.requiresAdmin)
  //   )

  //   if (publicAdminPaths.includes(to.path)) {
  //     if (authStore.isAdmin) {
  //       next({ path: '/admin/dashboard' })
  //     } else {
  //       next()
  //     }
  //   } else if (to.matched.some(route => route.meta.requiresAdmin) && !authStore.isAdmin) {
  //     console.log('시팔', authStore.isAdmin)
  //     next({ path: '/admin/login' })
  //   } else {
  //     next()
  //   }
  // })

  return Router
})
