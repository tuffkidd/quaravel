import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { useAuthStore } from 'src/stores/auth'
import { useUserStore } from 'src/stores/user'

const api = axios.create({
  baseURL: 'http://quaravel.test/api',
  withCredentials: true
})

export default boot(async ({ app, store }) => {
  const authStore = useAuthStore(store)
  const userStore = useUserStore(store)
  console.log('axios.js 스토어', authStore.token)

  // const authStore = useAuthStore(store)
  api.interceptors.request.use(config => {
    config.headers = {
      Authorization: 'Bearer ' + authStore.token
    }
    return config
  })

  // 사용자를 계속 확인하자.
  if (authStore.token) {
    await userStore.getUser()
  }
  // userStore.id = data.id
  // userStore.name = data.name
  // userStore.email = data.email
  // userStore.isAdmin = !!(data.type === 'S' || data.type === 'A')

  return false
})

export { api }
