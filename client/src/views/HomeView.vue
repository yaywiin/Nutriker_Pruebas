<template>
  <div class="home-view">
    <!-- 1. Hero Section -->
    <section class="hero-section">
      <div class="container hero-container">
        <div class="hero-content">
          <span class="badge">Salud Especializada</span>
          <h1 class="hero-title">Nutrición Integral para tu <span class="text-gradient">Metabolismo</span></h1>
          <p class="hero-subtitle">Descubre un enfoque científico y personalizado para mejorar tu salud, alcanzar tu peso ideal y recuperar tu energía vital.</p>
          <div class="hero-actions">
            <button class="btn btn-primary" @click="appStore.toggleModal(true)">Agendar mi Consulta</button>
            <RouterLink to="/nosotros" class="btn btn-outline">Conoce Más</RouterLink>
          </div>
        </div>
        <div class="hero-image-wrapper">
          <div class="blob-shape">
            <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80" alt="Nutrición Saludable" class="hero-img" />
          </div>
        </div>
      </div>
    </section>

    <!-- Wave Divider -->
    <div class="wave-divider">
      <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="var(--color-bg)"></path>
      </svg>
    </div>

    <!-- 2. Nosotros Preview -->
    <section class="about-preview bg-light">
      <div class="container about-container">
        <div class="about-image-wrapper">
          <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80" alt="Especialista en nutrición" class="about-img responsive-img shadow" />
        </div>
        <div class="about-content">
          <span class="badge badge-secondary">Sobre Nosotros</span>
          <h2 class="section-title">Ciencia y empatía para tu bienestar</h2>
          <p class="text-gray mb-4">En <strong>Bioclinik</strong> somos un equipo multidisciplinario enfocado en la raíz metabólica de tu salud. Entendemos que cada cuerpo humano responde distinto a los alimentos y al entorno.</p>
          <p class="text-gray mb-4">No recetamos dietas de moda; analizamos tu bioquímica, diseñamos programas totalmente personalizados y te enseñamos a nutrirte de forma sostenible, sin perder el placer de comer.</p>
          <RouterLink to="/nosotros" class="btn btn-secondary mt-4">Conoce al equipo</RouterLink>
        </div>
      </div>
    </section>

    <!-- 3. Grid de 6 Servicios -->
    <section class="services-section">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="section-title">El Método Bioclinik</h2>
          <p class="section-desc">Especialidades médicas y nutricionales diseñadas para atacar el problema desde la raíz biológica.</p>
        </div>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon"><Microscope :size="32" :stroke-width="1.5" /></div>
            <h3 class="feature-title">Evaluación Metabólica</h3>
            <p>Análisis de composición corporal y bioquímica para conocer con exactitud tus necesidades.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"><Apple :size="32" :stroke-width="1.5" /></div>
            <h3 class="feature-title">Nutrición Clínica</h3>
            <p>Planes personalizados enfocados en revertir patologías y optimizar tu peso de manera natural.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"><Dna :size="32" :stroke-width="1.5" /></div>
            <h3 class="feature-title">Salud Hormonal</h3>
            <p>Corrección de desequilibrios hormonales a través de una correcta asimilación de nutrientes.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"><HeartPulse :size="32" :stroke-width="1.5" /></div>
            <h3 class="feature-title">Nutrición Deportiva</h3>
            <p>Estrategias avanzadas para mejorar tu rendimiento físico, ganar masa muscular o acelerar la quema de grasa.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"><Brain :size="32" :stroke-width="1.5" /></div>
            <h3 class="feature-title">Psiconutrición</h3>
            <p>Abordamos la relación emocional con la comida, eliminando la ansiedad y los atracones emocionales.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"><TrendingUp :size="32" :stroke-width="1.5" /></div>
            <h3 class="feature-title">Seguimiento Continuo</h3>
            <p>Acompañamiento estrecho (mensual o quincenal) para ajustar el plan y garantizar resultados.</p>
          </div>
        </div>
        
        <div class="text-center mt-8 pt-4">
          <RouterLink to="/servicios" class="btn btn-primary">Ver Todos los Servicios</RouterLink>
        </div>
      </div>
    </section>

    <!-- 4. Productos Más Vendidos -->
    <section class="products-section bg-light">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="section-title">Complementa tu Nutrición</h2>
          <p class="section-desc">Descubre nuestros suplementos y productos avalados científicamente, creados para acelerar tus metas.</p>
        </div>

        <div class="products-grid">
          <!-- Producto 1 -->
          <div class="product-card">
            <div class="product-img-wrapper">
              <img src="https://images.unsplash.com/photo-1594824436951-7f12bc15865d?auto=format&fit=crop&w=400&q=80" alt="Suplemento" />
              <div class="product-tag">Más vendido</div>
            </div>
            <div class="product-info">
              <h3 class="product-title">Vitaminas Bioclinik Max</h3>
              <p class="product-price">$ 450.00 MXN</p>
              <button class="btn btn-primary btn-full mt-4">Agregar al Carrito</button>
            </div>
          </div>
          <!-- Producto 2 -->
          <div class="product-card">
            <div class="product-img-wrapper">
              <img src="https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&w=400&q=80" alt="Proteína" />
            </div>
            <div class="product-info">
              <h3 class="product-title">Proteína Isolada Clean</h3>
              <p class="product-price">$ 980.00 MXN</p>
              <button class="btn btn-primary btn-full mt-4">Agregar al Carrito</button>
            </div>
          </div>
          <!-- Producto 3 -->
          <div class="product-card">
            <div class="product-img-wrapper">
              <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80" alt="Snack Saludable" />
              <div class="product-tag">Nuevo</div>
            </div>
            <div class="product-info">
              <h3 class="product-title">Keto Snacks Box</h3>
              <p class="product-price">$ 320.00 MXN</p>
              <button class="btn btn-primary btn-full mt-4">Agregar al Carrito</button>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-8">
          <RouterLink to="/tienda" class="btn btn-outline">Visitar la Tienda Completa</RouterLink>
        </div>
      </div>
    </section>

    <!-- 5. Formulario y Newsletter -->
    <section class="contact-newsletter-section">
      <div class="container contact-container">
        
        <!-- Formulario Contacto -->
        <div class="contact-card">
          <h2 class="form-title">Escríbenos</h2>
          <p class="mb-4">¿Tienes dudas sobre nuestros servicios? Déjanos un mensaje y te contactaremos a la brevedad.</p>
          <form @submit.prevent="" class="contact-form">
            <div class="form-group">
              <input type="text" placeholder="Tu Nombre Completo" class="form-input" required />
            </div>
            <div class="form-group mt-4">
              <input type="email" placeholder="Correo Electrónico" class="form-input" required />
            </div>
            <div class="form-group mt-4">
              <textarea placeholder="¿Cómo podemos ayudarte?" class="form-textarea" rows="4" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary mt-4">Enviar Mensaje</button>
          </form>
        </div>

        <!-- Newsletter -->
        <div class="newsletter-card">
          <div class="newsletter-icon">💌</div>
          <h2>Únete a nuestra comunidad</h2>
          <p class="mb-4">Recibe tips nutricionales, recetas saludables y promociones exclusivas directo en tu bandeja de entrada.</p>
          <form @submit.prevent="" class="newsletter-form">
            <input type="email" placeholder="Tu mejor correo electrónico" class="form-input" required />
            <button type="submit" class="btn btn-secondary mt-4">Suscribirme al Newsletter</button>
          </form>
          <p class="guarantee-text mt-4">🔒 Prometemos no enviar spam. Cancelas cuando quieras.</p>
        </div>

      </div>
    </section>

  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { Microscope, Apple, Dna, HeartPulse, Brain, TrendingUp, ArrowRight, Activity, Heart } from 'lucide-vue-next'
import { useAppStore } from '../stores/app'

const appStore = useAppStore()
</script>

<style scoped>
.home-view {
  overflow-x: hidden;
}

/* Backgrounds */
.bg-light { background-color: var(--color-bg); }

/* Text Utilities */
.text-gray {
  color: var(--color-text-light);
  line-height: 1.7;
}

/* Hero Section */
.hero-section {
  padding: 4rem 0 2rem;
  background-color: var(--color-white);
  min-height: 80vh;
  display: flex;
  align-items: center;
}
.hero-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
}
@media (min-width: 992px) {
  .hero-container { grid-template-columns: 1fr 1fr; }
}
.badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: var(--color-bg);
  color: var(--color-primary);
  border-radius: var(--radius-full);
  font-weight: 700;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
}
.badge-secondary {
  background-color: #E6EFFF;
  color: var(--color-secondary);
}
.hero-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-secondary);
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: -1px;
}
@media (min-width: 768px) {
  .hero-title { font-size: 3.5rem; }
}
.text-gradient {
  background: linear-gradient(135deg, var(--color-primary), #448cf1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-subtitle {
  font-size: 1.1rem;
  color: var(--color-text-light);
  margin-bottom: 2rem;
  max-width: 500px;
}
.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Blob Image Wrapper */
.hero-image-wrapper {
  display: flex;
  justify-content: center;
  position: relative;
}
.blob-shape {
  width: 100%;
  max-width: 500px;
  aspect-ratio: 1;
  border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  animation: blob-anim 8s ease-in-out infinite alternate;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}
.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
@keyframes blob-anim {
  0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
  100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
}

/* Wave Divider */
.wave-divider {
  width: 100%;
  line-height: 0;
  margin-top: -1px;
}
.wave-divider svg {
  display: block;
  width: 100%;
  height: 60px;
}
@media (min-width: 768px) {
  .wave-divider svg { height: 120px; }
}

/* Nosotros Preview */
.about-preview {
  padding: 4rem 0 6rem;
}
.about-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
}
@media (min-width: 992px) {
  .about-container { grid-template-columns: 5fr 6fr; gap: 4rem; }
}
.responsive-img {
  width: 100%;
  height: auto;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  object-fit: cover;
}
.about-image-wrapper {
  position: relative;
}
/* A small decorative blob behind the about image */
.about-image-wrapper::before {
  content: '';
  position: absolute;
  top: -20px;
  left: -20px;
  width: 100%;
  height: 100%;
  background-color: var(--color-primary);
  border-radius: var(--radius-xl);
  z-index: -1;
  opacity: 0.1;
}

/* Features Section (6 elements) */
.services-section {
  padding: 6rem 0;
  background-color: var(--color-white);
}
.section-header {
  margin-bottom: 4rem;
}
.section-title {
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--color-secondary);
  margin-bottom: 1rem;
  letter-spacing: -0.5px;
}
.section-desc {
  font-size: 1.1rem;
  color: var(--color-text-light);
  max-width: 600px;
  margin: 0 auto;
}
.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}
@media (min-width: 768px) {
  .features-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .features-grid { grid-template-columns: repeat(3, 1fr); }
}
.feature-card {
  background-color: var(--color-bg);
  padding: 2.5rem 2rem;
  border-radius: var(--radius-xl);
  transition: all 0.3s ease;
  border: 1px solid transparent;
  text-align: center;
}
.feature-card:hover {
  transform: translateY(-5px);
  background-color: var(--color-white);
  box-shadow: var(--shadow-lg);
  border-color: rgba(25, 98, 200, 0.1);
}
.feature-icon {
  width: 64px;
  height: 64px;
  background-color: var(--color-white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0 auto 1.5rem auto;
  color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}
.feature-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-secondary);
  margin-bottom: 1rem;
}

/* Products Section */
.products-section {
  padding: 6rem 0;
}
.products-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}
@media (min-width: 768px) {
  .products-grid { grid-template-columns: repeat(3, 1fr); }
}
.product-card {
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.product-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}
.product-img-wrapper {
  position: relative;
  height: 250px;
}
.product-img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.product-tag {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: var(--color-secondary);
  color: var(--color-white);
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  font-weight: 700;
  font-size: 0.75rem;
}
.product-info {
  padding: 1.5rem;
  text-align: center;
}
.product-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-secondary);
  margin-bottom: 0.5rem;
}
.product-price {
  font-weight: 800;
  color: var(--color-primary);
  font-size: 1.15rem;
}
.btn-full {
  width: 100%;
  display: block;
}

/* Contact & Newsletter Section */
.contact-newsletter-section {
  padding: 6rem 0;
  background-color: var(--color-white);
}
.contact-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}
@media (min-width: 992px) {
  .contact-container { grid-template-columns: 1fr 1fr; }
}

.contact-card {
  background-color: var(--color-bg);
  padding: 3rem;
  border-radius: var(--radius-xl);
}
.form-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--color-secondary);
  margin-bottom: 0.5rem;
}
.form-input, .form-textarea {
  width: 100%;
  padding: 1rem 1.25rem;
  border-radius: var(--radius-md);
  border: 1px solid #d2d6dc;
  font-family: var(--font-main);
  font-size: 1rem;
  background-color: var(--color-white);
  transition: border-color 0.3s ease;
}
.form-input:focus, .form-textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(25, 98, 200, 0.1);
}

.newsletter-card {
  background: linear-gradient(135deg, var(--color-primary), #114a9b);
  padding: 3rem;
  border-radius: var(--radius-xl);
  color: var(--color-white);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.newsletter-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}
.newsletter-card h2 {
  font-size: 1.75rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}
.newsletter-card p {
  color: rgba(255, 255, 255, 0.85);
}
.newsletter-form {
  display: flex;
  flex-direction: column;
}
.newsletter-card .btn-secondary {
  width: 100%;
}
.guarantee-text {
  font-size: 0.8rem !important;
  color: rgba(255,255,255,0.6) !important;
}
</style>
