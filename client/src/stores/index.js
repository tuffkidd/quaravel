import { store } from 'quasar/wrappers'
import { createPinia } from 'pinia'

// 로컬스토리지
import { Cookies } from 'quasar'
import { createQuasarCookiesPersistedState } from 'pinia-plugin-persistedstate/quasar'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(({ ssrContext }) => {
  const pinia = createPinia()

  // You can add Pinia plugins here
  // pinia.use(SomePiniaPlugin)

  /**
   * 쿠키용
   */
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies

  pinia.use(
    createQuasarCookiesPersistedState(cookies, {
      cookiesOptions: {
        path: '/',
        // httpOnly: process.env.NODE_ENV === 'production',
        // secure: true,
        expires: 10,
        sameSite: 'Lax'
        // maxAge: 3600,
      }
    })
  )
  // 쿠키용 끝

  /**
   * 웹스토리지용
   */
  // pinia.use(createQuasarWebStoragePersistedState(SessionStorage))
  return pinia
})
