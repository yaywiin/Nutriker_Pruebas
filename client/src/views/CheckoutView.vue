<template>
  <div class="checkout-page bg-light">
    <!-- Success State -->
    <div v-if="orderSubmitted" class="container text-center success-container fade-in-up" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 70vh;">
      <div class="success-icon-wrapper mx-auto mb-4">
        <CheckCircle :size="80" class="success-icon" />
      </div>
      <h1 class="success-title">¡Pedido Confirmado!</h1>
      <p class="success-subtitle">Hemos recibido tu orden y pronto nos pondremos en contacto contigo.</p>
      <div class="order-details-card mt-4 mb-4 mx-auto w-full text-center" style="max-width: 400px;">
        <h3 class="mb-3 border-bottom pb-2">Resumen de tu compra</h3>
        <p><strong>Subtotal:</strong> ${{ lastOrderTotal.toFixed(2) }}</p>
        <p><strong>Envío:</strong> ¡Gratis!</p>
        <p class="text-xl font-bold mt-2"><strong>Total a Pagar:</strong> ${{ lastOrderTotal.toFixed(2) }}</p>
        <p class="mt-3 text-muted text-sm">Método seleccionado: {{ lastPaymentMethod === 'card' ? 'Tarjeta de crédito/débito' : 'Transferencia Bancaria' }}</p>
      </div>
      <button class="btn btn-primary btn-lg" @click="$router.push('/tienda')">
        Seguir Comprando
      </button>
    </div>

    <!-- Empty Cart State -->
    <div v-else-if="cartStore.items.length === 0" class="container text-center pt-10 pb-10">
      <div class="mx-auto flex-center mb-4" style="width:100px; height:100px; background:white; border-radius:50%; box-shadow:0 10px 30px rgba(0,0,0,0.05)">
        <ShoppingCart :size="48" style="color:#d1d5db" />
      </div>
      <h2 class="text-2xl font-bold color-secondary mb-2">Tu carrito está vacío</h2>
      <p class="text-muted mb-4">No hay productos en tu carrito para proceder al pago.</p>
      <button class="btn btn-primary" @click="$router.push('/tienda')">Ir a la tienda</button>
    </div>

    <!-- Checkout Form -->
    <div v-else class="container checkout-container mt-10 mb-10 fade-in-up">
      <div class="checkout-grid">
        
        <!-- Left Column: Form -->
        <div class="checkout-form-section">
          <form @submit.prevent="submitOrder">
            
            <!-- Contact Info -->
            <div class="form-card mb-4">
              <div class="form-header">
                <User :size="20" class="icon" />
                <h3>Información de Contacto</h3>
              </div>
              <div class="form-body">
                <div class="input-group">
                  <div class="input-field">
                    <label>Nombre(s) *</label>
                    <input type="text" v-model="form.firstName" required placeholder="Ej. Juan" />
                  </div>
                  <div class="input-field">
                    <label>Apellidos *</label>
                    <input type="text" v-model="form.lastName" required placeholder="Ej. Pérez" />
                  </div>
                </div>
                <div class="input-group mt-3">
                  <div class="input-field">
                    <label>Correo Electrónico *</label>
                    <input type="email" v-model="form.email" required placeholder="tu@correo.com" />
                  </div>
                  <div class="input-field">
                    <label>Teléfono *</label>
                    <input type="tel" v-model="form.phone" required placeholder="10 dígitos" maxlength="10" title="Debe contener 10 dígitos" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Shipping Info -->
            <div class="form-card mb-4">
              <div class="form-header">
                <Truck :size="20" class="icon" />
                <h3>Dirección de Envío</h3>
              </div>
              <div class="form-body">
                <div class="input-field mb-3">
                  <label>Calle y Número *</label>
                  <input type="text" v-model="form.address" required placeholder="Ej. Av. Reforma 123, Int 4" />
                </div>
                <div class="input-field mb-3">
                  <label>Colonia / Barrio *</label>
                  <input type="text" v-model="form.neighborhood" required placeholder="Ej. Centro Histórico" />
                </div>
                <div class="input-group mb-3">
                  <div class="input-field">
                    <label>Ciudad *</label>
                    <input type="text" v-model="form.city" required placeholder="Ciudad" />
                  </div>
                  <div class="input-field">
                    <label>Estado *</label>
                    <input type="text" v-model="form.state" required placeholder="Estado" />
                  </div>
                </div>
                <div class="input-field" style="max-width: 200px;">
                  <label>Código Postal *</label>
                  <input type="text" v-model="form.zip" required placeholder="Ej. 06000" maxlength="5" title="Debe contener 5 dígitos" />
                </div>
              </div>
            </div>

            <!-- Payment Method -->
            <div class="form-card mb-4">
              <div class="form-header">
                <Wallet :size="20" class="icon" />
                <h3>Método de Pago</h3>
              </div>
              <div class="form-body pb-2">
                
                <label class="payment-method-label" :class="{ 'active': form.paymentMethod === 'card' }">
                  <div class="radio-wrapper">
                    <input type="radio" v-model="form.paymentMethod" value="card" name="payment" />
                    <span class="custom-radio"></span>
                  </div>
                  <div class="method-details flex-1">
                    <span class="method-title">Tarjeta de Crédito / Débito</span>
                    <span class="method-subtitle">Pago seguro en línea (Simulado)</span>
                  </div>
                  <CreditCard :size="24" class="method-icon" />
                </label>

                <label class="payment-method-label mt-3" :class="{ 'active': form.paymentMethod === 'transfer' }">
                  <div class="radio-wrapper">
                    <input type="radio" v-model="form.paymentMethod" value="transfer" name="payment" />
                    <span class="custom-radio"></span>
                  </div>
                  <div class="method-details flex-1">
                    <span class="method-title">Transferencia Bancaria (SPEI)</span>
                    <span class="method-subtitle">Instrucciones al confirmar pedido</span>
                  </div>
                  <Building :size="24" class="method-icon" />
                </label>

              </div>
            </div>

            <!-- Mobile Submit Button (Visible only on small screens) -->
            <div class="mobile-submit mt-4">
              <button type="submit" class="btn btn-primary btn-lg w-full flex-center gap-2" :disabled="isSubmitting">
                <span v-if="!isSubmitting">Confirmar y Pagar ${{(cartStore.cartTotal).toFixed(2)}}</span>
                <span v-else>Procesando...</span>
              </button>
            </div>

          </form>
        </div>

        <!-- Right Column: Order Summary -->
        <div class="checkout-summary-section">
          <div class="summary-card shadow-elegant sticky-summary">
            <h3 class="summary-title mb-4">Tu Pedido</h3>
            
            <div class="summary-items custom-scrollbar mb-4">
              <div class="summary-item" v-for="item in cartStore.items" :key="item.id">
                <div class="item-img shadow-sm" :style="item.imagen_principal ? { backgroundImage: `url(${item.imagen_principal})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { background: '#f5f7fa' }">
                   <Package v-if="!item.imagen_principal" :size="20" style="color:#cbd5e1" />
                </div>
                <div class="item-info">
                  <span class="item-name">{{ item.nombre }} <span class="text-muted text-xs ml-1">x{{ item.quantity }}</span></span>
                  <span class="item-category">{{ item.categoriaNombre }}</span>
                </div>
                <div class="item-price">
                  ${{ ((item.descuento > 0 ? (Number(item.precio) * (1 - Number(item.descuento) / 100)) : Number(item.precio)) * item.quantity).toFixed(2) }} 
                </div>
              </div>
            </div>

            <div class="summary-totals pt-3 border-top">
              <div class="flex-between mb-2 text-muted">
                <span>Subtotal</span>
                <span>${{ cartStore.cartTotal.toFixed(2) }}</span>
              </div>
              <div class="flex-between mb-3 text-muted">
                <span>Envío</span>
                <span class="color-success">Gratis</span>
              </div>
              <div class="flex-between pt-3 border-top text-xl font-bold color-secondary">
                <span>Total a Pagar</span>
                <span>${{ cartStore.cartTotal.toFixed(2) }}</span>
              </div>
            </div>

            <!-- Desktop Submit Button -->
            <button class="btn btn-primary btn-lg w-full mt-4 flex-center gap-2 desktop-submit" @click="triggerSubmit" :disabled="isSubmitting">
              <Lock :size="16" />
              <span v-if="!isSubmitting">Confirmar Pedido</span>
              <span v-else>Procesando...</span>
            </button>
            
            <p class="text-xs text-center text-muted mt-3 flex-center gap-1">
              <ShieldCheck :size="14" /> Pago 100% encriptado y seguro
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import api from '../services/api'
import { 
  ShoppingCart, Package, Truck, Wallet, 
  CreditCard, Building, User, Lock, ShieldCheck, CheckCircle 
} from 'lucide-vue-next'

const router = useRouter()
const cartStore = useCartStore()

const isSubmitting = ref(false)
const orderSubmitted = ref(false)
const lastOrderTotal = ref(0)
const lastPaymentMethod = ref('')

// Form state
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  neighborhood: '',
  city: '',
  state: '',
  zip: '',
  paymentMethod: 'card' // default
})

const triggerSubmit = () => {
  // Try to submit the hidden form logic from outside the form context 
  // Normally the button is inside the form, but due to layout it might be outside.
  // In Vue, we can just grab form elements or use standard programmatic validation.
  const formEl = document.querySelector('form')
  if (formEl) {
    if (formEl.reportValidity()) {
      submitOrder()
    }
  }
}

const submitOrder = async () => {
  isSubmitting.value = true
  
  try {
    // Generamos resumen visual para las notas del administrador
    const itemsSummary = cartStore.items.map(i => `${i.quantity}x ${i.nombre}`).join(' | ')
    const generatedNotes = `Artículos comprados: ${itemsSummary}`

    const payload = {
      cliente_nombre: `${form.firstName} ${form.lastName}`.trim(),
      cliente_email: form.email,
      cliente_telefono: form.phone,
      direccion_entrega: `${form.address}, ${form.neighborhood}`,
      ciudad: form.city,
      estado: form.state,
      codigo_postal: form.zip,
      metodo_pago: form.paymentMethod,
      total: cartStore.cartTotal,
      notas: generatedNotes,
      estado_pedido: 'En proceso'
    }

    await api.post('/pedidos', payload)

    // Guardar para pantalla de éxito
    lastOrderTotal.value = cartStore.cartTotal
    lastPaymentMethod.value = form.paymentMethod
    
    // Limpiar y finalizar
    cartStore.clearCart()
    orderSubmitted.value = true
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
  } catch (error) {
    console.error('Error al enviar el pedido:', error)
    alert('Hubo un problema al procesar tu pedido. Por favor intenta de nuevo.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.checkout-page {
  padding-top: 8rem; /* space for navbar */
  min-height: calc(100vh - 200px);
}

.bg-light { background-color: #f8fafc; }
.pt-10 { padding-top: 4rem; }
.pb-10 { padding-bottom: 4rem; }
.mt-10 { margin-top: 2rem; }
.mb-10 { margin-bottom: 4rem; }
.color-secondary { color: var(--color-secondary); }
.color-success { color: #10b981; font-weight: 600; }
.text-muted { color: #64748b; }
.text-xl { font-size: 1.25rem; }
.text-2xl { font-size: 1.5rem; }
.font-bold { font-weight: 700; }
.flex-between { display: flex; justify-content: space-between; align-items: center; }
.flex-center { display: flex; justify-content: center; align-items: center; }
.gap-1 { gap: 0.25rem; }
.gap-2 { gap: 0.5rem; }
.w-full { width: 100%; }
.border-top { border-top: 1px solid #e2e8f0; }
.border-bottom { border-bottom: 1px solid #e2e8f0; }
.pb-2 { padding-bottom: 0.5rem; }
.pt-3 { padding-top: 1rem; }
.ml-1 { margin-left: 0.25rem; }
.text-xs { font-size: 0.8rem; }

/* Grid Layout */
.checkout-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 992px) {
  .checkout-grid {
    grid-template-columns: 1.5fr 1fr;
    gap: 3rem;
  }
}

/* Form Styles */
.form-card {
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);
  border: 1px solid rgba(0,0,0,0.04);
  overflow: hidden;
}

.form-header {
  padding: 1.25rem 1.5rem;
  background: #fdfdfd;
  border-bottom: 1px solid rgba(0,0,0,0.04);
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.form-header .icon {
  color: var(--color-primary);
}

.form-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-secondary);
}

.form-body {
  padding: 1.5rem;
}

.input-group {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}

@media (min-width: 576px) {
  .input-group {
    flex-direction: row;
  }
  .input-field {
    flex: 1;
  }
}

.input-field {
  display: flex;
  flex-direction: column;
}

.input-field label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 0.4rem;
}

.input-field input {
  padding: 0.75rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: var(--radius-md);
  font-size: 0.95rem;
  transition: all 0.2s;
  background: #fdfdfd;
}

.input-field input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(117, 203, 190, 0.15);
  background: white;
}

/* Payment Methods */
.payment-method-label {
  display: flex;
  align-items: center;
  padding: 1rem 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s;
  background: white;
}

.payment-method-label:hover {
  border-color: #cbd5e1;
  background: #fafafa;
}

.payment-method-label.active {
  border-color: var(--color-primary);
  background: rgba(117, 203, 190, 0.05);
}

.custom-radio {
  width: 20px;
  height: 20px;
  border: 2px solid #cbd5e1;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  transition: all 0.2s;
}

.payment-method-label input[type="radio"] {
  display: none;
}

.payment-method-label.active .custom-radio {
  border-color: var(--color-primary);
}

.payment-method-label.active .custom-radio::after {
  content: '';
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 10px; height: 10px;
  background: var(--color-primary);
  border-radius: 50%;
}

.radio-wrapper { margin-right: 1rem; display: flex; align-items: center; }
.flex-1 { flex: 1; display:flex; flex-direction: column; }
.method-title { font-weight: 700; color: var(--color-secondary); font-size: 0.95rem; }
.method-subtitle { font-size: 0.75rem; color: #94a3b8; }
.method-icon { color: #94a3b8; }
.payment-method-label.active .method-icon { color: var(--color-primary); }

/* Summary List */
.sticky-summary {
  position: sticky;
  top: 100px; /* offset from navbar */
}

.summary-card {
  background: white;
  padding: 2rem;
  border-radius: var(--radius-xl);
  border: 1px solid rgba(0,0,0,0.03);
}

.shadow-elegant {
  box-shadow: 0 10px 40px rgba(0,0,0,0.04);
}

.summary-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--color-secondary);
}

.summary-items {
  max-height: 350px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.summary-item:last-child { margin-bottom: 0; }

.item-img {
  width: 60px;
  height: 60px;
  border-radius: var(--radius-md);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.item-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-secondary);
  line-height: 1.2;
}

.item-category {
  font-size: 0.7rem;
  color: #94a3b8;
  margin-top: 0.2rem;
}

.item-price {
  font-weight: 700;
  color: var(--color-secondary);
  font-size: 0.95rem;
}

/* Success State */
.success-container {
  max-width: 600px;
  padding: 4rem 1rem;
}

.success-icon-wrapper {
  color: #10b981;
  animation: scaleBounce 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

.success-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-secondary);
  margin-bottom: 0.5rem;
}

.success-subtitle {
  color: #64748b;
  font-size: 1.1rem;
}

.order-details-card {
  background: white;
  padding: 2rem;
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  max-width: 400px;
}

/* Mobile Visibility adjustments */
.mobile-submit { display: none; }

@media (max-width: 991px) {
  .mobile-submit { display: block; }
  .desktop-submit { display: none; }
  .checkout-grid { display: flex; flex-direction: column-reverse; }
}

/* Scrollbar customization */
.custom-scrollbar::-webkit-scrollbar { width: 5px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.2); }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scaleBounce {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}

.fade-in-up { animation: fadeInUp 0.6s ease forwards; opacity: 0; }
</style>
