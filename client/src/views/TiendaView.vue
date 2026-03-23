<template>
  <div class="tienda-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container hero-content fade-in-up">
        <h1 class="hero-title">Nuestra Tienda</h1>
        <p class="hero-subtitle">
          Suplementos y productos seleccionados cuidadosamente para potenciar tu metabolismo y bienestar integral.
        </p>
      </div>
      <!-- Background SVG Pattern -->
      <div class="bg-pattern" aria-hidden="true">
        <svg fill="none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <circle cx="50" cy="0" r="40" fill="currentColor" opacity="0.03" />
          <circle cx="10" cy="100" r="30" fill="currentColor" opacity="0.03" />
          <circle cx="90" cy="80" r="20" fill="currentColor" opacity="0.03" />
        </svg>
      </div>
    </section>

    <!-- Store Grid Section -->
    <section class="store-section container">
      <div class="store-header flex-between mb-4 fade-in-up">
        <div>
          <h2 class="section-badge">Catálogo Premium</h2>
          <h3 class="section-title">Productos Destacados</h3>
        </div>
        <div class="store-filters">
           <span class="text-muted">Mostrando 9 productos</span>
        </div>
      </div>
      
      <div class="products-grid">
        <div 
          v-for="(prod, index) in products" 
          :key="prod.id" 
          class="product-card fade-in-up" 
          :style="{ animationDelay: `${index * 0.08}s` }"
        >
          <RouterLink :to="`/tienda/${prod.id}`" class="product-image-link">
            <!-- Elegant Image Placeholder -->
            <div class="product-image-placeholder" :style="{ background: prod.bgGradient }">
               <Package :size="48" class="product-icon" />
               <div class="overlay">
                 <span>Ver Detalle</span>
               </div>
            </div>
          </RouterLink>
          
          <div class="product-info">
            <span class="product-category">{{ prod.category }}</span>
            <RouterLink :to="`/tienda/${prod.id}`" class="product-title-link">
              <h4 class="product-title">{{ prod.name }}</h4>
            </RouterLink>
            <p class="product-price">${{ prod.price.toFixed(2) }}</p>
            
            <button class="btn btn-primary btn-sm btn-full w-full mt-3 flex-center gap-2">
              <ShoppingCart :size="16" />
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { Package, ShoppingCart } from 'lucide-vue-next'

const products = [
  { id: 1, name: 'Whey Protein Isolate Premium', price: 950.00, category: 'Proteínas', bgGradient: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)' },
  { id: 2, name: 'Multivitamínico Core+ Mujer', price: 420.00, category: 'Vitaminas', bgGradient: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' },
  { id: 3, name: 'Omega 3 Ultra Puro', price: 580.00, category: 'Suplementos', bgGradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)' },
  { id: 4, name: 'Magnesio Bisglicinato 400mg', price: 350.00, category: 'Minerales', bgGradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)' },
  { id: 5, name: 'Probióticos Avanzados 50B', price: 690.00, category: 'Salud Digestiva', bgGradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)' },
  { id: 6, name: 'Colágeno Hidrolizado + Vitamina C', price: 720.00, category: 'Piel y Articulaciones', bgGradient: 'linear-gradient(135deg, #accbee 0%, #e7f0fd 100%)' },
  { id: 7, name: 'BCAAs + Glutamina Recovery', price: 640.00, category: 'Rendimiento', bgGradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
  { id: 8, name: 'Extracto de Ashwagandha Root', price: 480.00, category: 'Adaptógenos', bgGradient: 'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)' },
  { id: 9, name: 'Creatina Monohidratada Creapure', price: 590.00, category: 'Rendimiento', bgGradient: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)' }
]
</script>

<style scoped>
.tienda-page {
  padding-bottom: 5rem;
  overflow-x: hidden;
  background-color: #fafbfc;
}

/* Base Typo */
.section-badge {
  display: inline-block;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--color-primary);
  background: rgba(117, 203, 190, 0.1);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-full);
  margin-bottom: 0.5rem;
}

.section-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--color-secondary);
  line-height: 1.2;
}

.text-muted { color: #888; font-size: 0.95rem; }
.mb-4 { margin-bottom: 2.5rem; }
.mt-3 { margin-top: 1rem; }
.w-full { width: 100%; }
.flex-between { display: flex; justify-content: space-between; align-items: flex-end; }
.flex-center { display: flex; justify-content: center; align-items: center; }
.gap-2 { gap: 0.5rem; }

/* Hero Section */
.hero-section {
  position: relative;
  background: linear-gradient(135deg, var(--color-secondary) 0%, #203a43 50%, #0f2027 100%);
  color: var(--color-white);
  padding: 10rem 0 6rem 0;
  text-align: center;
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.hero-subtitle {
  font-size: 1.25rem;
  color: rgba(255,255,255,0.85);
  line-height: 1.6;
}

.bg-pattern {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  color: var(--color-primary);
  z-index: 1;
}

.bg-pattern svg {
  width: 100%; height: 100%;
}

/* Store Section */
.store-section {
  padding: 4rem 0;
}

@media (max-width: 768px) {
  .store-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2.5rem;
}

.product-card {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
  border: 1px solid rgba(0,0,0,0.04);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.08);
}

.product-image-link {
  display: block;
  overflow: hidden;
  position: relative;
}

.product-image-placeholder {
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: transform 0.5s ease;
}

.product-icon {
  color: rgba(0,0,0,0.15);
  transition: transform 0.5s ease;
}

.product-card:hover .product-image-placeholder {
  transform: scale(1.05);
}

.product-card:hover .product-icon {
  transform: scale(1.2) rotate(5deg);
}

.overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(35, 78, 88, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .overlay {
  opacity: 1;
}

.overlay span {
  background: var(--color-white);
  color: var(--color-secondary);
  padding: 0.6rem 1.2rem;
  border-radius: var(--radius-full);
  font-weight: 700;
  font-size: 0.9rem;
  transform: translateY(15px);
  transition: transform 0.3s ease;
}

.product-card:hover .overlay span {
  transform: translateY(0);
}

.product-info {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.product-category {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #999;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.product-title-link {
  text-decoration: none;
  flex: 1;
}

.product-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-secondary);
  line-height: 1.4;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.product-title-link:hover .product-title {
  color: var(--color-primary);
}

.product-price {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--color-secondary);
}

/* Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in-up { 
  animation: fadeInUp 0.6s ease forwards; 
  opacity: 0; 
}
</style>
