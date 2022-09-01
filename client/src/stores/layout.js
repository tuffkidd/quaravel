import { defineStore } from 'pinia'
import { SessionStorage } from 'quasar'

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    layout: SessionStorage.getItem('layout') || {}
  }),

  getters: {},

  actions: {
    setDrawerMini (payload) {
      this.layout.drawerMini = payload
    }
  }
})
