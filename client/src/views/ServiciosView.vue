<template>
  <section class="asymmetric-services">
    <div class="services-container">
      
      <!-- List block on left -->
      <div class="services-text-wrapper">
        <h2 class="editorial-title text-left">Curaduría de<br/>Servicios.</h2>
        
        <ul class="editorial-list">
          <li 
            v-for="(service, index) in services" 
            :key="index"
            @mouseenter="activeServiceIndex = index"
            :class="{ 'is-active': activeServiceIndex === index }"
          >
            <h3>{{ service.title }}</h3>
            <p>{{ service.desc }}</p>
          </li>
        </ul>
      </div>

      <!-- Bleeding image block on right -->
      <div class="services-image-wrapper">
        <TransitionGroup name="fade-slow" tag="div" class="image-stack">
          <div 
            v-for="(service, index) in services" 
            :key="service.title"
            v-show="activeServiceIndex === index"
            class="services-art"
            :style="{ backgroundImage: `url(${service.image})` }"
          ></div>
        </TransitionGroup>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const activeServiceIndex = ref(0)

const services = [
  { 
    title: 'Control Metabólico', 
    desc: 'Arquitectura alimenticia para estabilización hormonal y pérdida grasa a largo plazo.',
    image: '/img_hero.png'
  },
  { 
    title: 'Fisiología Deportiva', 
    desc: 'Recomposición estructural, volumen limpio y picos de recuperación muscular.',
    image: '/img_about.png'
  },
  { 
    title: 'Saneamiento Celular', 
    desc: 'Restauración del microbioma, reducción de estrés oxidativo y bienestar inmunológico.',
    image: '/img_contact.png'
  }
]
</script>

<style scoped>
.asymmetric-services {
  padding: 8rem 5vw;
  background-color: var(--color-bg);
  min-height: 90vh;
}

.services-container {
  display: flex;
  max-width: 1500px;
  margin: 0 auto;
  align-items: flex-end; /* Asimetría: pegados abajo */
  gap: 5vw;
}

.services-text-wrapper {
  flex: 0 0 40%;
  padding-bottom: 5rem;
}

.editorial-title {
  font-family: var(--font-serif);
  font-size: clamp(3.5rem, 6vw, 6.5rem);
  line-height: 0.9;
  letter-spacing: -2px;
  color: var(--color-secondary);
  margin-bottom: 4rem;
}

/* Service List Typography */
.editorial-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.editorial-list li {
  position: relative;
  padding-left: 2rem;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  opacity: 0.4;
  cursor: pointer;
}

.editorial-list li.is-active {
  opacity: 1;
  transform: translateX(15px); /* Push right slightly */
}

.editorial-list li::before {
  content: '—';
  position: absolute;
  left: -10px;
  top: 0;
  color: var(--color-primary);
  font-weight: bold;
  opacity: 0;
  transition: all 0.3s;
}

.editorial-list li.is-active::before {
  opacity: 1;
  left: 0;
}

.editorial-list h3 {
  font-family: var(--font-serif);
  font-size: 2rem;
  color: var(--color-primary-dark);
  margin-bottom: 0.5rem;
  letter-spacing: -0.5px;
}

.editorial-list p {
  color: #666;
  font-size: 1.1rem;
  max-width: 400px;
  line-height: 1.5;
}

/* Bleeding Image Right */
.services-image-wrapper {
  flex: 1;
  height: 80vh;
  position: relative;
  overflow: hidden;
  transform: translateY(50px); /* Pushing it down for asymmetry */
}

.image-stack {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.services-art {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* Transitions for the background images */
.fade-slow-enter-active,
.fade-slow-leave-active {
  transition: opacity 0.8s ease, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-slow-enter-from {
  opacity: 0;
  transform: scale(1.08); 
}
.fade-slow-leave-to {
  opacity: 0;
}

@media (max-width: 900px) {
  .services-container {
    flex-direction: column;
    align-items: stretch;
  }
  .services-text-wrapper {
    flex: 1;
    padding-bottom: 2rem;
  }
  .services-image-wrapper {
    height: 50vh;
    transform: translateY(0);
  }
}
</style>
