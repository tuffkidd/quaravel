import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: ''
  }),
  persist: true,
  getters: {
    // getAdmin: state => state.isAdmin,
    getToken: state => state.token
  },
  actions: {
    // CSRF
    async getCsrf () {
      try {
        await api.get('/v1/sanctum/csrf-cookie')
      } catch (error) {
        if (error) throw error
      }
    },
    // 로그인
    async login (email, password) {
      try {
        const { data } = await api.post('/v1/auth/login', { email, password })
        this.setToken(data)
      } catch (error) {
        if (error) throw error
      }
    },
    // // 사용자 저장
    // async getUser () {
    //   try {
    //     const { data } = await api.get('/v1/auth/user')
    //     this.id = data.id
    //     this.name = data.name
    //     this.email = data.email
    //     this.isAdmin = !!(data.type === 'S' || data.type === 'A')
    //   } catch (error) {
    //     if (error) throw error
    //   }
    // },
    setToken (payload) {
      this.token = payload.token
    }
  }
})
