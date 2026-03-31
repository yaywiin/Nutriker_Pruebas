import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: useStorage('bioclinik-cart', []),
    isCartOpen: false
  }),
  
  getters: {
    cartItemCount: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },
    
    cartTotal: (state) => {
      return state.items.reduce((total, item) => {
        // Calculate price with discount if applicable
        const price = item.descuento > 0 
          ? Number(item.precio) * (1 - Number(item.descuento) / 100)
          : Number(item.precio)
        
        return total + (price * item.quantity)
      }, 0)
    }
  },
  
  actions: {
    toggleCart(value) {
      this.isCartOpen = value !== undefined ? value : !this.isCartOpen
      if (this.isCartOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    },
    
    addToCart(product, quantity = 1) {
      const existingItem = this.items.find(item => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        // We only copy necessary product fields to keep storage light
        this.items.push({
          id: product.id,
          nombre: product.nombre,
          precio: product.precio,
          descuento: product.descuento || 0,
          imagen_principal: product.imagen_principal,
          categoriaNombre: product.categoriaNombre,
          quantity: quantity
        })
      }
      
      // Auto open cart when adding
      this.toggleCart(true)
    },
    
    removeFromCart(productId) {
      const index = this.items.findIndex(item => item.id === productId)
      if (index !== -1) {
        this.items.splice(index, 1)
      }
    },
    
    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.id === productId)
      if (item) {
        if (quantity <= 0) {
          this.removeFromCart(productId)
        } else {
          item.quantity = quantity
        }
      }
    },
    
    clearCart() {
      this.items = []
    }
  }
})
