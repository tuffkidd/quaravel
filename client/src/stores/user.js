import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    email: '',
    name: '',
    nickname: '',
    isAdmin: false
  }),
  // persist: true,
  getters: {
    getAdmin: state => state.isAdmin
  },
  actions: {
    async getUser () {
      try {
        const { data } = await api.get('/v1/auth/user')
        this.id = data.id
        this.name = data.name
        this.email = data.email
        this.isAdmin = !!(data.type === 'S' || data.type === 'A')
        console.log('유저 세팅 완료')
      } catch (error) {
        if (error) throw error
      }
    }
  }
})
