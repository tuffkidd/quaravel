/* eslint-disable indent */
import { route } from 'quasar/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory
} from 'vue-router'
import routes from './routes'
import { useAuthStore } from 'src/stores/auth'
import { api } from 'src/boot/axios'

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
/*
  Router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore(store)
    const publicAdminPaths = ['/admin/login', '/admin/recover']

    console.log(
      'requiresAdmin: ',
      to.matched.some(route => route.meta.requiresAdmin)
    )

    console.log('어드민이냐', authStore.isAdmin)

    if (to.path.startsWith('/admin')) {
      next

    //   if (to.matched.some(route => route.meta.requiresAdmin)) {
    //     if (!authStore.isAdmin) { // 로그인 안되어있음.
    //       next({ path: '/admin/login', replace: true })
    //     }
    //   } else {
    //     next()
    //   }
    // } else {
    //   next()
    }
    // if (
    //   to.matched.some(route => route.meta.requiresAdmin) &&
    //   !authStore.isAdmin
    // ) {
    //   console.log('Route: ', to.matched.some((route) => {
    //     console.log(route)
    //   }))
    //   // next({ name: 'admin-login' })
    //   next()
    // } else if (
    //   !to.matched.some(route => route.meta.requiresAdmin) &&
    //   authStore.isAdmin &&
    //   publicAdminPaths.includes(to.path)
    // ) {
    //   next({ name: 'admin-dashboard' })
    // } else {
    //   next()
    // }
  })
 */
  return Router
})
