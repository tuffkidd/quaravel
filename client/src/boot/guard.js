// import { LocalStorage } from 'quasar'
import { boot } from 'quasar/wrappers'
import { useAuthStore } from 'src/stores/auth'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ store, router }) => {
  const authStore = useAuthStore(store)

  // router.beforeEach((to, from, next) => {
  //   const publicAdminPaths = ['/admin/login', '/admin/recover']

  console.log('부트가드에서 찍은 관리자 여부: ', authStore.isAdmin)

  //   if (to.matched.some(route => route.meta.requiresAdmin) && !authStore.isAdmin && !publicAdminPaths.includes(to.path)) {
  //     next({ path: '/admin/login' })
  //   } else if (authStore.isAdmin && publicAdminPaths.includes(to.path)) {
  //     next({ path: '/admin/dashboard', replace: true })
  //   } else {
  //     next()
  //   }
  // })
})
