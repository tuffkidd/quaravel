import { LocalStorage } from 'quasar'
import { boot } from 'quasar/wrappers'
import { useAuthStore } from 'src/stores/auth'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ store, router }) => {
  const authStore = useAuthStore(store)
  const ls = LocalStorage.getItem('auth')
  console.log(ls)

  router.beforeEach((to, from) => {
    // const records = to.matched.filter((record) => record.meta.requiresAdmin)
    // if (records.length > 0) {
    //   if (!authStore.isAdmin) {
    //     return {
    //       path: '/admin/login',
    //       query: { redirect: to.fullPath }
    //     }
    //   }
    // }

    const publicAdminPaths = ['/admin/login', '/admin/recover']
    console.log(from)
    if (to.matched.some(route => route.meta.requiresAdmin) || publicAdminPaths.includes(to.path)) {
      return
    }

    if (!authStore.isAdmin) {
      return { name: 'admin-login' }
    }
    // if (publicAdminPaths.includes(to.path)) {
    //   next()
    // } else if (to.matched.some(route => route.meta.requiresAdmin) && !authStore.isAdmin) {
    //   console.log('시팔', authStore.isAdmin)
    //   next({ path: '/admin/login' })
    // } else {
    //   next()
    // }
  })
})
