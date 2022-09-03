import { storeToRefs } from 'pinia'
import { boot } from 'quasar/wrappers'

import { useAuthStore } from 'src/stores/auth'
import { toRefs } from 'vue'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ router, store, redirect }) => {
  router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore(store)
    const publicAdminPaths = ['/admin/login', '/admin/recover']

    // await api.post('/v1/posttest').then(res => {
    //   console.log(res)
    // })

    // await api.get('/v1/sanctum/csrf-cookie')
    // await api.get('/v1/auth/login')

    // await authStore.getCsrf()

    // await authStore.setUser()

    console.log(to.path)
    console.log(
      'requiresAdmin: ',
      to.matched.some(route => route.meta.requiresAdmin)
    )

    console.log(authStore.id)
    console.log(authStore.name)
    console.log('어드민이냐', authStore.getAdmin)

    /**
     * 관리자 페이지 접근
     */
    // if (to.path.startsWith('/admin')) {
    //   if (to.matched.some(route => route.meta.requiresAdmin)) {
    //     if (!authStore.isAdmin) { // 로그인 안되어있음.
    //       next({ path: '/admin/login', replace: true })
    //     }
    //   } else {
    //     next()
    //   }
    // } else {
    //   next()
    // }
    next()

    // if (publicAdminPaths.includes(to.path)) { // 퍼블릭 패스
    //   //
    //   if (!to.matched.some(route => route.meta.requiresAdmin) && authStore.isAdmin) {
    //     next({ path: '/admin/dashboard' })
    //   } else {
    //     next()
    //   }
    // } else {
    //   if (
    //     to.matched.some(route => route.meta.requiresAdmin) &&
    //     !authStore.isAdmin
    //   ) {
    //     console.log('Route: ', to.matched.some((route) => {
    //       console.log(route)
    //     }))
    //     next({ name: 'admin-login' })
    //   } else if (
    //     !to.matched.some(route => route.meta.requiresAdmin) &&
    //     authStore.isAdmin &&
    //     publicAdminPaths.includes(to.path)
    //   ) {
    //     next({ name: 'admin-dashboard' })
    //   } else {
    //     next()
    //   }
    // }
  })
})
