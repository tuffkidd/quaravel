import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    miniMode: false,
    expandOnHover: false
  }),

  persist: true,

  getters: {},

  actions: {
    setminiMode (payload) {
      this.miniMode = !this.miniMode
      this.miniMode ? this.expandOnHover = true : this.expandOnHover = false
    }
  }
})
