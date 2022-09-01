/* eslint-disable indent */
import { route } from 'quasar/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory
} from 'vue-router'
import routes from './routes'
import { useUserStore } from 'src/stores/user'
import { Notify } from 'quasar'

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

  Router.beforeEach((to, from, next) => {
    const userStore = useUserStore(store)
    const isAdmin = userStore.isAdmin
    const isUser = userStore.user

    if (to.name === 'admin' && isAdmin) {
      // 로그인되어있는데. /admin 으로 접속하는 경우
      next({ name: 'admin-dashboard' })
    } else if (to.name === 'admin' && !isAdmin) {
      Notify.create('hhdh')
      next({ name: 'admin-login' })
    }

    if (to.matched.some(route => route.meta.requiresAdmin) && !isAdmin) {
      next({ name: 'admin-login' })
    } else if (to.matched.some(route => route.meta.requiresAdmin) && !isUser) {
      Notify.create({
        icon: 'mdi-alert-outline',
        message: '로그인 후 이용해주세요.',
        type: 'warning',
        timeout: 2000
        // classes: 'ww-notify'
      })

      next({ name: 'user-login' })
    }
    next()
  })

  return Router
})
