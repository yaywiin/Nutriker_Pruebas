<template>
  <div class="nosotros-page">
    
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container hero-content fade-in-up">
        <h1 class="hero-title">Nuestra Esencia</h1>
        <p class="hero-subtitle">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <!-- Decorative element -->
      <div class="hero-decoration"></div>
    </section>

    <!-- History / Info Section -->
    <section class="history-section container">
      <div class="history-grid">
        <div class="history-text slide-in-left">
          <h2 class="section-badge">Nuestra Historia</h2>
          <h3 class="section-title">Pasión por el Bienestar Integral</h3>
          <p class="text-muted">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p class="text-muted">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          
          <div class="stats-row mt-4">
            <div class="stat-item">
              <span class="stat-number">+15</span>
              <span class="stat-label">Años de Experiencia</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">+5k</span>
              <span class="stat-label">Pacientes Satisfechos</span>
            </div>
          </div>
        </div>

        <div class="history-image-placeholder slide-in-right">
          <!-- An elegant abstract gradient placeholder -->
          <div class="abstract-shape"></div>
          <div class="abstract-shape secondary-shape"></div>
        </div>
      </div>
    </section>

    <!-- Mission & Vision Banner -->
    <section class="mission-banner">
      <div class="container">
        <div class="mission-glass-card">
          <div class="mission-icon">
            <Target :size="32" />
          </div>
          <h2>Nuestra Misión</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at erat in purus aliquet commodo. 
            Fusce in nulla justo. Maecenas blandit dictum augue, et tristique est condimentum nec.
          </p>
        </div>
      </div>
    </section>

    <!-- Core Values Section -->
    <section class="values-section container">
      <div class="text-center mb-5 fade-in-up">
        <h2 class="section-badge mx-auto">Valores CORE</h2>
        <h3 class="section-title">Lo que nos impulsa</h3>
      </div>
      
      <div class="values-grid">
        <div class="value-card fade-in-up" v-for="(val, index) in values" :key="index" :style="{ animationDelay: `${index * 0.15}s` }">
          <div class="value-icon-wrapper">
            <component :is="val.icon" :size="28" />
          </div>
          <h4 class="value-title">{{ val.title }}</h4>
          <p class="value-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris laoreet elit id pretium finibus.
          </p>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { Target, Heart, Shield, Award, Users, Star } from 'lucide-vue-next'

const values = [
  { title: 'Empatía y Cuidado', icon: Heart },
  { title: 'Excelencia Médica', icon: Award },
  { title: 'Ética y Transparencia', icon: Shield },
  { title: 'Trato Humano', icon: Users },
  { title: 'Innovación Continua', icon: Star },
  { title: 'Compromiso Total', icon: Target },
]
</script>

<style scoped>
.nosotros-page {
  padding-bottom: 4rem;
  overflow-x: hidden;
}

/* Base Typography */
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

.text-muted {
  color: #555;
  line-height: 1.7;
  margin-bottom: 1.2rem;
  font-size: 1.05rem;
}

.text-center { text-align: center; }
.mb-5 { margin-bottom: 3rem; }
.mt-4 { margin-top: 2rem; }
.mx-auto { margin-left: auto; margin-right: auto; }

/* Hero Section */
.hero-section {
  position: relative;
  background: linear-gradient(135deg, var(--color-secondary) 0%, #1a3a41 100%);
  color: var(--color-white);
  padding: 10rem 0 7rem 0; /* extra top padding for navbar */
  text-align: center;
  overflow: hidden;
}

.hero-decoration {
  position: absolute;
  top: -50%;
  left: -10%;
  width: 120%;
  height: 200%;
  background: radial-gradient(circle, rgba(117,203,190,0.15) 0%, transparent 60%);
  z-index: 0;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-shadow: 0 4px 20px rgba(0,0,0,0.2);
}

.hero-subtitle {
  font-size: 1.2rem;
  color: rgba(255,255,255,0.8);
  line-height: 1.6;
}

/* History Section */
.history-section {
  padding: 6rem 0;
}

.history-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;
}

.stats-row {
  display: flex;
  gap: 3rem;
  border-top: 1px solid rgba(0,0,0,0.1);
  padding-top: 1.5rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-primary);
  line-height: 1;
}

.stat-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-secondary);
  text-transform: uppercase;
  margin-top: 0.5rem;
  letter-spacing: 1px;
}

/* Elegant Image Placeholder (Abstract Art) */
.history-image-placeholder {
  position: relative;
  width: 100%;
  height: 450px;
  background-color: #f7f9fc;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: inset 0 0 50px rgba(0,0,0,0.02);
}

.abstract-shape {
  position: absolute;
  top: -20%;
  right: -20%;
  width: 300px;
  height: 400px;
  background: linear-gradient(135deg, var(--color-primary) 0%, rgba(117,203,190,0.3) 100%);
  border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  filter: blur(40px);
  animation: liquidFloat 10s ease-in-out infinite alternate;
}

.secondary-shape {
  top: 50%;
  left: -20%;
  width: 250px;
  height: 250px;
  background: linear-gradient(135deg, var(--color-secondary) 0%, rgba(35,78,88,0.3) 100%);
  animation-delay: -5s;
}

@keyframes liquidFloat {
  0% { transform: translate(0, 0) rotate(0deg) scale(1); }
  100% { transform: translate(20px, -40px) rotate(20deg) scale(1.1); }
}

/* Mission Banner */
.mission-banner {
  background: url('data:image/svg+xml;utf8,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="%23234E58"/><circle cx="50" cy="50" r="40" fill="%231a3a41"/></svg>') center/cover;
  position: relative;
  padding: 6rem 0;
  color: var(--color-white);
}

.mission-banner::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(35, 78, 88, 0.85); /* Overlay over the SVG pattern */
  backdrop-filter: blur(5px);
}

.mission-glass-card {
  position: relative;
  z-index: 1;
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: var(--radius-lg);
  padding: 4rem 2rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  transition: transform 0.4s ease;
}

.mission-glass-card:hover {
  transform: translateY(-5px);
}

.mission-icon {
  background: linear-gradient(135deg, var(--color-primary), #4ca597);
  display: inline-flex;
  padding: 1rem;
  border-radius: 50%;
  color: #fff;
  margin-bottom: 1.5rem;
  box-shadow: 0 10px 20px rgba(117,203,190,0.3);
}

.mission-glass-card h2 {
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.mission-glass-card p {
  font-size: 1.15rem;
  color: rgba(255,255,255,0.85);
  line-height: 1.8;
}

/* Values Grid */
.values-section {
  padding: 6rem 0;
}

.values-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.value-card {
  background: var(--color-white);
  padding: 2.5rem 2rem;
  border-radius: var(--radius-lg);
  box-shadow: 0 10px 30px rgba(0,0,0,0.04);
  border: 1px solid rgba(0,0,0,0.02);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.value-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(117,203,190,0.15);
  border-color: rgba(117,203,190,0.3);
}

.value-icon-wrapper {
  color: var(--color-primary);
  margin-bottom: 1.5rem;
  transition: transform 0.4s ease;
}

.value-card:hover .value-icon-wrapper {
  transform: scale(1.15) rotate(5deg);
}

.value-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-secondary);
  margin-bottom: 0.85rem;
}

.value-desc {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.6;
}

/* Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-40px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
}

.fade-in-up { animation: fadeInUp 0.8s ease forwards; opacity: 0; }
.slide-in-left { animation: slideInLeft 0.8s ease forwards; opacity: 0; }
.slide-in-right { animation: slideInRight 0.8s ease forwards; opacity: 0; }

/* Responsive Adjustments */
@media (min-width: 768px) {
  .history-grid {
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
  }
  
  .hero-title {
    font-size: 4.5rem;
  }

  .values-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .values-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
