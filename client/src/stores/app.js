import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    loading: false,
    isModalOpen: false,
  }),
  actions: {
    setLoading(value) {
      this.loading = value
    },
    toggleModal(value) {
      this.isModalOpen = value !== undefined ? value : !this.isModalOpen
    },
  },
})
