import { store } from 'quasar/wrappers'
import { createPinia } from 'pinia'

// 로컬스토리지
// import { createQuasarWebStoragePersistedState } from 'pinia-plugin-persistedstate/quasar'
// import { SessionStorage } from 'quasar'

// 쿠키
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

  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies
  pinia.use(createQuasarCookiesPersistedState(
    cookies,
    {
      cookieOptions: {
        httpOnly: true,
        secure: true,
        expires: 3600,
        maxAge: 3600,
        sameSite: 'strict'
      }
    }
  ))

  return pinia
})
