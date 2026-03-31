<template>
  <div class="product-page">
    <div class="container product-container fade-in-up">
      <!-- Breadcrumb -->
      <div class="breadcrumb">
        <RouterLink to="/tienda">Tienda</RouterLink>
        <ChevronRight :size="14" class="mx-2" />
        <span class="active">Detalle del Producto</span>
      </div>

      <div v-if="loading" class="flex-center" style="min-height: 400px; color: var(--color-primary)">
        <p>Cargando producto...</p>
      </div>

      <div v-else-if="!product" class="flex-center" style="min-height: 400px; color: red">
        <p>Producto no encontrado.</p>
      </div>

      <div v-else class="product-layout">
        <!-- Left: Image Gallery / Placeholder -->
        <div class="product-gallery slide-in-left">
          <div class="main-image shadow-elegant" :style="product.imagen_principal ? { backgroundImage: `url(${product.imagen_principal})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}">
            <Package v-if="!product.imagen_principal" :size="80" class="placeholder-icon" />
            
            <!-- Floating Decorative Badges -->
            <div class="badge badge-top">⭐ Top Seller</div>
            <div class="badge badge-bottom">100% Puro</div>
          </div>
          <!-- Thumbnails (Galería real si aplica) -->
          <div class="thumbnails mt-3" v-if="product.galeria && product.galeria.length > 0">
            <div class="thumbnail" v-for="(img, idx) in product.galeria" :key="idx" 
                 :style="{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }"></div>
          </div>
          <div class="thumbnails mt-3" v-else>
            <!-- No gallery -->
          </div>
        </div>

        <!-- Right: Product Information -->
        <div class="product-details slide-in-right">
          <span class="product-category">{{ product.categoriaNombre || 'Sin Categoría' }} | SKU-{{ product.id }}</span>
          <h1 class="product-title">{{ product.nombre }}</h1>
          
          <div class="rating-stars flex items-center gap-1 mb-2">
            <Star :size="16" class="star" v-for="i in 5" :key="i" />
            <span class="text-sm ml-2 text-muted">(Stock: {{ product.stock }})</span>
          </div>

          <p class="product-price flex items-center">
            <template v-if="product.descuento > 0">
              <span class="price-strikethrough mr-2" style="font-size: 1.2rem; color: #aaa; margin-right: 0.5rem;">
                ${{ Number(product.precio).toFixed(2) }}
              </span>
              <span>
                ${{ (Number(product.precio) * (1 - Number(product.descuento) / 100)).toFixed(2) }}
              </span>
              <span style="color:#2ed573; margin-left:0.5rem; font-size: 1rem; font-weight: bold;">
                 -{{ product.descuento }}%
              </span>
            </template>
            <template v-else>
              ${{ Number(product.precio).toFixed(2) }}
            </template>
          </p>

          <p class="product-description whitespace-pre-wrap">
            {{ product.descripcion }}
          </p>

          <div class="product-features">
            <ul>
              <li><CheckCircle :size="16" class="feature-icon" /> Ingredientes naturales</li>
              <li><CheckCircle :size="16" class="feature-icon" /> Sin gluten ni lácteos</li>
              <li><CheckCircle :size="16" class="feature-icon" /> Aprobado por expertos</li>
            </ul>
          </div>

          <div class="purchase-actions mt-4">
            <div class="quantity-selector">
              <button @click="qty > 1 ? qty-- : null" aria-label="Decrease quantity">-</button>
              <input type="number" v-model="qty" min="1" readonly />
              <button @click="qty++" aria-label="Increase quantity">+</button>
            </div>
            <button class="btn btn-primary btn-lg btn-pulse flex-1 flex-center gap-2" @click="cartStore.addToCart(product, qty)">
              <ShoppingCart :size="18" />
              Añadir al carrito
            </button>
          </div>

          <div class="delivery-info mt-4 pb-3 border-bottom">
            <div class="flex items-start gap-2 text-muted text-sm mb-2">
              <Truck :size="18" class="color-secondary"/> 
              <span>Envío gratis a partir de $1,000 MXN en todo el país.</span>
            </div>
          </div>
          
          <div class="product-accordion mt-4" v-if="product.descripcion_detallada">
            <!-- Detalles Section -->
            <div class="accordion-item">
               <h4><Info :size="16"/> Descripción Detallada</h4>
               <p class="text-sm text-muted mt-2 whitespace-pre-wrap">{{ product.descripcion_detallada }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { Package, ChevronRight, ShoppingCart, Star, CheckCircle, Truck, Info } from 'lucide-vue-next'
import api from '../services/api'
import { useCartStore } from '../stores/cart'

const route = useRoute()
const cartStore = useCartStore()
const qty = ref(1)
const product = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const data = await api.get(`/productos/${route.params.id}`)
    product.value = data
  } catch (error) {
    console.error('Error al cargar producto:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.product-page {
  padding-top: 8rem; /* space for navbar */
  padding-bottom: 5rem;
  background-color: #fafbfc;
  min-height: calc(100vh - 200px);
}

.breadcrumb {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 2rem;
}

.breadcrumb a {
  color: var(--color-primary);
  font-weight: 600;
}
.breadcrumb a:hover {
  text-decoration: underline;
}

.breadcrumb .active {
  color: var(--color-secondary);
}

.mx-2 { margin-left: 0.5rem; margin-right: 0.5rem; }
.mt-2 { margin-top: 0.5rem; }
.mt-3 { margin-top: 1rem; }
.mt-4 { margin-top: 2rem; }
.mb-2 { margin-bottom: 0.5rem; }
.pb-3 { padding-bottom: 1rem; }
.border-bottom { border-bottom: 1px solid rgba(0,0,0,0.05); }
.ml-2 { margin-left: 0.5rem; }
.flex { display: flex; }
.items-center { align-items: center; }
.items-start { align-items: flex-start; }
.flex-1 { flex: 1; }
.gap-1 { gap: 0.25rem; }
.gap-2 { gap: 0.5rem; }
.text-sm { font-size: 0.85rem; }
.text-muted { color: #777; line-height: 1.5; }
.color-secondary { color: var(--color-secondary); }
.flex-center { display: flex; justify-content: center; align-items: center; }

/* Layout */
.product-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  background: var(--color-white);
  padding: 3rem;
  border-radius: var(--radius-xl);
  box-shadow: 0 10px 40px rgba(0,0,0,0.03);
}

/* Gallery */
.main-image {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  height: 400px;
  border-radius: var(--radius-lg);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.shadow-elegant {
  box-shadow: inset 0 0 50px rgba(0,0,0,0.02), 0 10px 30px rgba(0,0,0,0.05);
}

.placeholder-icon {
  color: rgba(255,255,255,0.7);
  filter: drop-shadow(0 10px 10px rgba(0,0,0,0.1));
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}

.badge {
  position: absolute;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(5px);
  padding: 0.4rem 0.8rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--color-secondary);
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  letter-spacing: 1px;
}

.badge-top { top: 20px; right: 20px; color: #ff9800;}
.badge-bottom { bottom: 20px; left: 20px; color: var(--color-primary); }

.thumbnails {
  display: flex;
  gap: 1rem;
}

.thumbnail {
  height: 80px;
  flex: 1;
  background: #f5f7fa;
  border-radius: var(--radius-md);
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.thumbnail.active { border-color: var(--color-primary); }
.thumbnail:hover { opacity: 0.8; }

/* Product Details */
.product-details {
  display: flex;
  flex-direction: column;
}

.product-category {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-primary-light);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
}

.product-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--color-secondary);
  line-height: 1.2;
  margin-bottom: 1rem;
}

.star { color: #ffb400; fill: #ffb400; }

.product-price {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-secondary);
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.price-strikethrough {
  font-size: 1.2rem;
  color: #aaa;
  text-decoration: line-through;
  font-weight: 500;
}

.product-description {
  color: #555;
  font-size: 1.05rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.product-features ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.product-features li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #444;
  font-weight: 600;
}

.feature-icon {
  color: var(--color-primary);
}

/* Purchase Actions */
.purchase-actions {
  display: flex;
  gap: 1rem;
  align-items: stretch;
}

.quantity-selector {
  display: flex;
  align-items: center;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: #fff;
}

.quantity-selector button {
  width: 40px;
  height: 48px;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: var(--color-secondary);
  transition: background 0.2s;
}

.quantity-selector button:hover {
  background: rgba(0,0,0,0.03);
}

.quantity-selector input {
  width: 40px;
  height: 48px;
  text-align: center;
  border: none;
  border-left: 1px solid rgba(0,0,0,0.1);
  border-right: 1px solid rgba(0,0,0,0.1);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-secondary);
}

.btn-lg {
  height: 48px;
  font-weight: 700;
  font-size: 1.05rem;
}

.btn-pulse {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.btn-pulse:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(117, 203, 190, 0.4);
}

/* Accordion Fake Setup */
.accordion-item h4 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-secondary);
  font-weight: 700;
  cursor: pointer;
}

/* Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(30px); }
  to { opacity: 1; transform: translateX(0); }
}

.fade-in-up { animation: fadeInUp 0.6s ease forwards; opacity: 0; }
.slide-in-left { animation: slideInLeft 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; opacity: 0; }
.slide-in-right { animation: slideInRight 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; opacity: 0; }

/* Responsive */
@media (min-width: 992px) {
  .product-layout {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
}
@media (max-width: 576px) {
  .product-layout { padding: 1.5rem; }
  .purchase-actions { flex-direction: column; }
  .quantity-selector { justify-content: space-between; }
  .quantity-selector input { flex: 1; }
}
</style>
