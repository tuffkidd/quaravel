import { defineStore } from 'pinia'
import { SessionStorage } from 'quasar'

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    drawerMini: false,
    expandOnHover: false
  }),

  persist: { storage: SessionStorage },

  getters: {},

  actions: {
    setDrawerMini (payload) {
      this.drawerMini = !this.drawerMini
      this.drawerMini ? this.expandOnHover = true : this.expandOnHover = false
    }
  }
})
