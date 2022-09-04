import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { useAuthStore } from 'src/stores/auth'

const api = axios.create({
  baseURL: 'http://quaravel.test/api',
  withCredentials: true
})

export default boot(async ({ app, store }) => {
  const authStore = useAuthStore(store)
  console.log('axios.js 스토어', authStore.token)
  // const authStore = useAuthStore(store)
  api.interceptors.request.use(config => {
    config.headers = {
      Authorization: 'Bearer ' + authStore.token
    }
    return config
  })
})

export { api }
