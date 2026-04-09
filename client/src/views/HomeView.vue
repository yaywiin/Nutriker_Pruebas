<template>
  <div class="home-view">
    <!-- 1. Inicio / Hero (Asymmetrical) -->
    <section id="inicio" class="asymmetric-hero">
      <div class="hero-typography slide-in-bottom">
        <span class="editorial-badge">
          <img src="/icon_heart.png" alt="Corazón" class="badge-icon" />
          Nutrición Integral
        </span>
        <h1>Vitalidad<br/>Pura.</h1>
      </div>
      <div class="hero-image-box parallax-img fade-in">
        <img src="/img_hero.png" alt="Editorial Food" />
      </div>
    </section>

    <!-- 2. Nosotros -->
    <NosotrosSection id="nosotros" />

    <!-- 3. Servicios -->
    <ServiciosSection id="servicios" />

    <!-- 4. Contacto Unificado -->
    <ContactoSection id="contacto" />
    
    <!-- Floating Agendar Button -->
    <button class="floating-agendar" @click="appStore.toggleModal(true)">
      Agendar Cita
    </button>
  </div>
</template>

<script setup>
import NosotrosSection from './NosotrosView.vue'
import ServiciosSection from './ServiciosView.vue'
import ContactoSection from './ContactoView.vue'
import { useAppStore } from '../stores/app'

const appStore = useAppStore()
</script>

<style scoped>
.home-view {
  width: 100%;
  position: relative;
  background-color: var(--color-bg);
}

/* ── ASYMMETRIC HERO HEADER ── */
.asymmetric-hero {
  min-height: 100vh;
  position: relative;
  display: flex;
  padding: 12rem 5vw 5rem;
  overflow: hidden;
}

.hero-typography {
  position: relative;
  z-index: 5;
  width: 45%;
  padding-top: 5vh;
}

.hero-typography h1 {
  font-size: clamp(5rem, 12vw, 10rem);
  line-height: 0.85;
  letter-spacing: -4px;
  color: var(--color-secondary);
  font-family: var(--font-serif);
  font-weight: 400;
  margin-top: 1rem;
}

.hero-image-box {
  position: absolute;
  right: 5vw;
  top: 15vh;
  width: 45vw;
  height: 85vh;
  z-index: 2;
  overflow: hidden;
}

.hero-image-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.5s ease;
}

.hero-image-box:hover img {
  transform: scale(1.05); /* Slight breathe */
}

/* ── FLOATING BUTTON ── */
.floating-agendar {
  position: fixed;
  top: 30px; /* Alineado con el logo en el Header */
  right: 40px;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-full);
  padding: 1rem 2rem;
  font-family: var(--font-main);
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 0 15px 35px rgba(74, 140, 91, 0.5);
  z-index: 9999;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s;
}

.floating-agendar:hover {
  transform: translateY(-8px) scale(1.02);
  background-color: var(--color-primary-dark);
}

/* ── EDITORIAL BADGE ── */
.editorial-badge {
  display: inline-flex;
  align-items: center;
  color: var(--color-primary-dark);
  text-transform: uppercase;
  font-weight: 800;
  font-size: 0.75rem;
  letter-spacing: 3px;
  margin-bottom: 2rem;
  position: relative;
}

.editorial-badge::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 40px;
  height: 2px;
  background-color: var(--color-secondary);
}

.badge-icon {
  height: 16px;
  margin-right: 12px;
  opacity: 0.9;
}

@media (max-width: 900px) {
  .asymmetric-hero {
    flex-direction: column;
    padding-top: 8rem;
  }
  .hero-typography {
    width: 100%;
    position: relative;
    z-index: 10;
  }
  .hero-image-box {
    position: relative;
    top: auto;
    right: auto;
    width: 100%;
    height: 60vh;
    margin-top: 3rem;
  }
  .floating-agendar {
    top: auto;
    bottom: 20px;
    right: 50%;
    transform: translateX(50%);
    width: 90%;
    text-align: center;
    z-index: 8000; /* Debajo de modales */
  }
}
</style>
