<template>
  <div class="servicios-page">
    
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container hero-content fade-in-up">
        <h1 class="hero-title">Nuestros Servicios</h1>
        <p class="hero-subtitle">
          Soluciones integrales diseñadas para optimizar tu salud metabólica y nutricional.
        </p>
      </div>
      <!-- Background SVG Pattern -->
      <div class="bg-pattern" aria-hidden="true">
        <svg fill="none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path fill="currentColor" opacity="0.05" d="M0 100 V 50 Q 25 25 50 50 T 100 50 V 100 z" />
        </svg>
      </div>
    </section>

    <!-- Services Grid Section -->
    <section class="services-section container">
      <div class="services-header text-center fade-in-up">
        <h2 class="section-badge">Atención Personalizada</h2>
        <h3 class="section-title">El camino hacia tu bienestar</h3>
      </div>
      
      <div class="services-grid">
        <div 
          v-for="(svc, index) in servicios" 
          :key="svc.id" 
          class="service-card fade-in-up" 
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="card-icon-box">
            <component :is="svc.icon" :size="32" />
          </div>
          <div class="card-content">
            <h4 class="card-title">{{ svc.title }}</h4>
            <p class="card-desc">
              {{ svc.desc }}
            </p>
            <div class="card-action">
              <span class="action-text">Conocer más</span>
              <ArrowRight :size="16" class="action-icon" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Banner -->
    <section class="cta-banner">
      <div class="container cta-content fade-in-up" style="animation-delay: 0.3s;">
        <div class="cta-box">
          <div class="cta-text">
            <h2>¿Listo para transformar tu salud?</h2>
            <p>Agenda tu primera consulta y descubre un plan metabólico hecho a tu medida.</p>
          </div>
          <div class="cta-button">
            <button class="btn btn-primary btn-lg btn-pulse" @click="appStore.toggleModal(true)">Agendar Cita</button>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { Activity, Apple, Scale, FlaskConical, Stethoscope, Dumbbell, ArrowRight } from 'lucide-vue-next'
import { useAppStore } from '../stores/app'

const appStore = useAppStore()

const servicios = [
  {
    id: 1,
    title: 'Consulta Nutricional Inicial',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat justo. Morbi luctus, erat at pulvinar.',
    icon: Stethoscope
  },
  {
    id: 2,
    title: 'Plan Metabólico Integral',
    desc: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    icon: Activity
  },
  {
    id: 3,
    title: 'Análisis de Composición Corporal',
    desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur.',
    icon: Scale
  },
  {
    id: 4,
    title: 'Nutrición Deportiva',
    desc: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    icon: Dumbbell
  },
  {
    id: 5,
    title: 'Programas de Alimentación',
    desc: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas mauris.',
    icon: Apple
  },
  {
    id: 6,
    title: 'Estudios de Laboratorio Core',
    desc: 'Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Vivamus magna justo lacinia eget neque.',
    icon: FlaskConical
  }
]
</script>

<style scoped>
.servicios-page {
  padding-bottom: 2rem;
  overflow-x: hidden;
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
  margin-bottom: 1rem;
}

.section-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--color-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.text-center { text-align: center; }

/* Hero Section */
.hero-section {
  position: relative;
  background: linear-gradient(135deg, var(--color-secondary) 0%, #112a30 100%);
  color: var(--color-white);
  padding: 11rem 0 8rem 0;
  text-align: center;
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
}

.hero-title {
  font-size: 3.8rem;
  font-weight: 800;
  margin-bottom: 1.2rem;
  text-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.hero-subtitle {
  font-size: 1.3rem;
  color: rgba(255,255,255,0.85);
  line-height: 1.6;
}

.bg-pattern {
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 50%;
  color: var(--color-primary);
  z-index: 1;
  pointer-events: none;
}

.bg-pattern svg {
  width: 100%;
  height: 100%;
}

/* Services Grid */
.services-section {
  padding: 6rem 0;
}

.services-header {
  margin-bottom: 4rem;
}

.services-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
}

.service-card {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: 0 5px 20px rgba(0,0,0,0.03);
  border: 1px solid rgba(0,0,0,0.02);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: var(--color-primary);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(117,203,190,0.15);
  border-color: rgba(117,203,190,0.2);
}

.service-card:hover::before {
  transform: scaleX(1);
}

.card-icon-box {
  width: 70px;
  height: 70px;
  background: rgba(117,203,190,0.1);
  color: var(--color-primary);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 2rem 1rem 2rem;
  transition: background 0.4s ease, color 0.4s ease;
}

.service-card:hover .card-icon-box {
  background: var(--color-primary);
  color: var(--color-white);
  box-shadow: 0 10px 20px rgba(117,203,190,0.3);
}

.card-content {
  padding: 0 2rem 2rem 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-secondary);
  margin-bottom: 1rem;
}

.card-desc {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  flex: 1;
}

.card-action {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  color: var(--color-secondary);
  font-size: 0.95rem;
  margin-top: auto;
  cursor: pointer;
  transition: color 0.3s ease;
}

.service-card:hover .card-action {
  color: var(--color-primary);
}

.action-icon {
  transition: transform 0.3s ease;
}

.service-card:hover .action-icon {
  transform: translateX(5px);
}

/* CTA Banner */
.cta-banner {
  padding: 4rem 0;
  background: url('data:image/svg+xml;utf8,<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="1" fill="%2375cbbea0"/></svg>') repeat;
  background-color: #f7f9fc;
  margin-top: 2rem;
  border-radius: var(--radius-xl);
  margin-left: 20px;
  margin-right: 20px;
}

.cta-box {
  background: var(--color-secondary);
  border-radius: var(--radius-xl);
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  text-align: center;
}

.cta-text h2 {
  color: var(--color-white);
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.cta-text p {
  color: rgba(255,255,255,0.8);
  font-size: 1.15rem;
  max-width: 500px;
  margin: 0 auto;
}

.btn-lg {
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 700;
}

.btn-pulse {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.btn-pulse:hover {
  transform: scale(1.05);
  box-shadow: 0 0 25px rgba(117, 203, 190, 0.4);
}

/* Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in-up { 
  animation: fadeInUp 0.8s ease forwards; 
  opacity: 0; 
}

/* Responsive */
@media (min-width: 768px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .cta-box {
    padding: 4rem;
    flex-direction: row;
    text-align: left;
  }
  
  .cta-text {
    flex: 1;
  }
  
  .cta-text p {
    margin: 0;
  }
  
  .cta-banner {
    margin-left: max(20px, auto);
    margin-right: max(20px, auto);
  }
}

@media (min-width: 1024px) {
  .hero-title {
    font-size: 4.8rem;
  }
  
  .services-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .cta-banner {
    margin-left: 0;
    margin-right: 0;
    border-radius: 0;
  }
}
</style>
