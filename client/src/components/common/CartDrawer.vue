<template>
  <div>
    <!-- Backdrop Overlay -->
    <div 
      class="cart-overlay" 
      :class="{ 'is-open': cartStore.isCartOpen }"
      @click="cartStore.toggleCart(false)"
    ></div>

    <!-- Right Drawer -->
    <div class="cart-drawer" :class="{ 'is-open': cartStore.isCartOpen }">
      <!-- Header -->
      <div class="cart-header border-bottom">
        <div class="flex items-center gap-2">
          <ShoppingCart :size="20" class="color-secondary" />
          <h3 class="cart-title">Tu Carrito</h3>
          <span class="cart-count badge" v-if="cartStore.cartItemCount > 0">{{ cartStore.cartItemCount }}</span>
        </div>
        <button class="close-btn" @click="cartStore.toggleCart(false)" aria-label="Cerrar carrito">
          <X :size="24" />
        </button>
      </div>

      <!-- Content: Empty State -->
      <div v-if="cartStore.items.length === 0" class="cart-empty flex-center flex-col">
        <Package :size="64" class="empty-icon mb-3" />
        <p class="empty-text">Tu carrito está vacío.</p>
        <button class="btn btn-primary mt-4 w-full" @click="goToShop">Explorar Tienda</button>
      </div>

      <!-- Content: Items List -->
      <div v-else class="cart-items custom-scrollbar">
        <div class="cart-item border-bottom" v-for="item in cartStore.items" :key="item.id">
          <!-- Item Image -->
          <div class="item-img shadow-sm" :style="item.imagen_principal ? { backgroundImage: `url(${item.imagen_principal})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { background: '#f5f7fa' }">
             <Package v-if="!item.imagen_principal" :size="24" style="color:#cbd5e1" />
          </div>
          
          <!-- Item Details -->
          <div class="item-details">
            <h4 class="item-name">{{ item.nombre }}</h4>
            <span class="item-category">{{ item.categoriaNombre || 'Sin Categoría' }}</span>
            <div class="item-price">
              <!-- Using computed final price inline or store calculated price, keeping simple here -->
              ${{ ((item.descuento > 0 ? (Number(item.precio) * (1 - Number(item.descuento) / 100)) : Number(item.precio))).toFixed(2) }} 
            </div>
            
            <div class="item-actions mt-2">
              <div class="qty-control">
                <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)" aria-label="Quitar">-</button>
                <input type="number" :value="item.quantity" readonly />
                <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)" aria-label="Agregar">+</button>
              </div>
              <button class="remove-btn" @click="cartStore.removeFromCart(item.id)" title="Eliminar producto">
                <Trash2 :size="16" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer: Total & Actions -->
      <div v-if="cartStore.items.length > 0" class="cart-footer shadow-lg border-top">
        <div class="flex-between mb-3 text-lg font-bold">
          <span>Subtotal</span>
          <span class="color-secondary">${{ cartStore.cartTotal.toFixed(2) }}</span>
        </div>
        <p class="text-xs text-muted mb-3 flex items-center gap-1">
          <Truck :size="12"/> Envío gratis disponible (calculado en el checkout).
        </p>
        <button class="btn btn-primary btn-lg w-full flex-center gap-2" @click="proceedToCheckout">
          Proceder al Pago
          <ArrowRight :size="18" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../../stores/cart'
import { useRouter } from 'vue-router'
import { ShoppingCart, X, Package, Trash2, ArrowRight, Truck } from 'lucide-vue-next'

const cartStore = useCartStore()
const router = useRouter()

const goToShop = () => {
  cartStore.toggleCart(false)
  router.push('/tienda')
}

const proceedToCheckout = () => {
  cartStore.toggleCart(false)
  router.push('/checkout')
}
</script>

<style scoped>
/* Overlay */
.cart-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  z-index: 1040;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.cart-overlay.is-open {
  opacity: 1;
  visibility: visible;
}

/* Drawer Container */
.cart-drawer {
  position: fixed;
  top: 0;
  right: -100%; /* Hidden initially */
  width: 100%;
  max-width: 420px;
  height: 100vh;
  background-color: var(--color-white);
  box-shadow: -10px 0 30px rgba(0,0,0,0.1);
  z-index: 1050;
  display: flex;
  flex-direction: column;
  transition: right 0.4s cubic-bezier(0.175, 0.885, 0.32, 1);
}

.cart-drawer.is-open {
  right: 0;
}

/* Header */
.cart-header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-secondary);
  margin: 0;
}

.badge {
  background: var(--color-primary);
  color: #fff;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.1rem 0.6rem;
  border-radius: var(--radius-full);
}

.close-btn {
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  transition: all 0.2s;
  border-radius: var(--radius-full);
}

.close-btn:hover {
  background: rgba(0,0,0,0.05);
  color: var(--color-secondary);
  transform: rotate(90deg);
}

/* Empty State */
.cart-empty {
  flex: 1;
  padding: 2rem;
  text-align: center;
}

.empty-icon {
  color: #dfe6e9;
}

.empty-text {
  color: #636e72;
  font-size: 1.1rem;
  font-weight: 500;
}

/* List Items */
.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 0 1.5rem;
}

.cart-item {
  display: flex;
  gap: 1rem;
  padding: 1.5rem 0;
}

.item-img {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-md);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.item-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-secondary);
  margin-bottom: 0.2rem;
  line-height: 1.3;
}

.item-category {
  font-size: 0.7rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.item-price {
  font-size: 1rem;
  font-weight: 800;
  color: var(--color-secondary);
  margin-top: 0.4rem;
}

.item-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Quantity Control */
.qty-control {
  display: flex;
  align-items: center;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: var(--radius-md);
  height: 32px;
}

.qty-control button {
  background: none;
  border: none;
  width: 32px;
  height: 100%;
  font-size: 1rem;
  cursor: pointer;
  color: var(--color-secondary);
}

.qty-control input {
  width: 30px;
  height: 100%;
  border: none;
  border-left: 1px solid rgba(0,0,0,0.1);
  border-right: 1px solid rgba(0,0,0,0.1);
  text-align: center;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-secondary);
  -moz-appearance: textfield;
}

.qty-control input::-webkit-outer-spin-button,
.qty-control input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.remove-btn {
  background: #fff0f0;
  color: #ff4757;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
}

.remove-btn:hover {
  background: #ff4757;
  color: #fff;
}

/* Footer */
.cart-footer {
  padding: 1.5rem;
  background: var(--color-white);
}

.flex-between { display: flex; justify-content: space-between; align-items: center; }
.flex-center { display: flex; justify-content: center; align-items: center; }
.flex-col { flex-direction: column; }
.w-full { width: 100%; }
.mt-2 { margin-top: 0.5rem; }
.mt-4 { margin-top: 1.5rem; }
.mb-3 { margin-bottom: 1rem; }
.gap-1 { gap: 0.25rem; }
.gap-2 { gap: 0.5rem; }
.text-xs { font-size: 0.75rem; }
.text-lg { font-size: 1.2rem; }
.font-bold { font-weight: 700; }
.text-muted { color: #888; }
.color-secondary { color: var(--color-secondary); }
.border-bottom { border-bottom: 1px solid rgba(0,0,0,0.05); }
.border-top { border-top: 1px solid rgba(0,0,0,0.05); }
.shadow-lg { box-shadow: 0 -5px 20px rgba(0,0,0,0.03); }
.shadow-sm { box-shadow: 0 2px 10px rgba(0,0,0,0.05); }

.btn-lg {
  height: 52px;
  font-weight: 800;
  font-size: 1.05rem;
}

/* Scrollbar customization */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.02);
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.1);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(0,0,0,0.2);
}
</style>
