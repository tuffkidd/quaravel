import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {},
    token: ''
  }),
  persist: true,
  getters: {
    isAdmin: state => state.user.isAdmin
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
      if (!this.token || this.token === '') {
        // 현재 토큰이 없다면 로그인 한다.
        try {
          const { data } = await api.post('/v1/auth/login', { email, password })
          this.setToken(data)
          this.setUser()
        } catch (error) {
          if (error) throw error
        }
      } else {
        // 있다면 대시보드로 이동.
        this.router.push('/admin/dashboard')
      }
    },
    // 토큰 저장
    setToken (loginData) {
      this.token = loginData.token
    },
    // 사용자 저장
    async setUser () {
      await api.get('/v1/auth/user').then(res => {
        this.user = {
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          isAdmin: !!(res.data.type === 'S' || res.data.type === 'A')
        }
      })
    }
  }
})
