import { boot } from 'quasar/wrappers'
import { createPinia } from 'pinia'
import { createQuasarWebStoragePersistedState } from 'pinia-plugin-persistedstate/quasar'
import { SessionStorage } from 'quasar'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
// export default boot(async (/* { app, router, ... } */) => {
//   // something to do
// })

export default boot(({ app }) => {
  const pinia = createPinia()
  pinia.use(createQuasarWebStoragePersistedState(SessionStorage))
  app.use(pinia)
})
