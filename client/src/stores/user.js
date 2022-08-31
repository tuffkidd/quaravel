import { defineStore } from 'pinia'
import { SessionStorage } from 'quasar'
import { api } from 'src/boot/axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {},
    token: SessionStorage.getItem('token') || ''
  }),

  getters: {
    // 사용자 정보 가져오기
    getUser: () => {
      return this.user
    },

    // 토큰 가져오기
    getToken: () => {
      return SessionStorage.getItem('token')
    }
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
      // 이미 세션이 존재하면 로그인하지 않는다.
      if (
        !SessionStorage.getItem('token') ||
        SessionStorage.getItem('token') === ''
      ) {
        await this.getCsrf()

        try {
          const { data } = await api.post('/v1/auth/login', { email, password })
          this.setToken(data)
        } catch (error) {
          if (error) throw error
        }
      } else {
        alert('이미 로그인되어있습니다.')
      }
    },
    // 토큰 저장
    setToken (loginData) {
      const copyOfData = { ...loginData }
      SessionStorage.set('token', copyOfData.token)
      this.token = copyOfData.token
    }
  }
})
