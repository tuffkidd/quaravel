import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { useUserStore } from 'src/stores/user'

const api = axios.create({
  baseURL: 'http://quaravel.test/api',
  withCredentials: true
})

export default boot(async ({ app, store }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  const userStore = useUserStore(store)

  api.interceptors.request.use(config => {
    config.headers = {
      Authorization: 'Bearer ' + userStore.token
    }
    return config
  })

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
