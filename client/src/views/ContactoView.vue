<template>
  <div class="contacto-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container hero-content fade-in-up">
        <h1 class="hero-title">Estamos para escucharte</h1>
        <p class="hero-subtitle">
          Escríbenos para cualquier duda o comentario sobre nuestros servicios nutricionales y metabólicos.
        </p>
      </div>
    </section>

    <!-- Main Contact Content -->
    <section class="contact-section container">
      <div class="contact-grid">
        
        <!-- Info & Map (Left Column) -->
        <div class="contact-info-col slide-in-left">
          <div class="info-card">
            <h3 class="info-title">Nuestra Clínica</h3>
            <p class="text-muted mb-4">Visítanos y comienza tu camino hacia una vida integral y saludable con tecnología de punta.</p>
            
            <ul class="info-list">
              <li>
                <div class="icon-circle"><MapPin :size="20"/></div>
                <div>
                  <strong>Dirección</strong>
                  <p>Av. Chapultepec Sur 123, Col. Americana,<br>44160 Guadalajara, Jal.</p>
                </div>
              </li>
              <li>
                <div class="icon-circle"><Phone :size="20"/></div>
                <div>
                  <strong>Teléfono</strong>
                  <p>+52 (33) 1234 5678</p>
                </div>
              </li>
              <li>
                <div class="icon-circle"><Mail :size="20"/></div>
                <div>
                  <strong>Correo Electrónico</strong>
                  <p>hola@bioclinik.com</p>
                </div>
              </li>
              <li>
                <div class="icon-circle"><Clock :size="20"/></div>
                <div>
                  <strong>Horario de Atención</strong>
                  <p>Lunes - Viernes: 9:00 AM - 7:00 PM<br>Sábados: 9:00 AM - 2:00 PM</p>
                </div>
              </li>
            </ul>

            <!-- Google Maps Embed -->
            <div class="map-container mt-5">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119460.70881180295!2d-103.4118837267104!3d20.67385966453629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428b18cb52fd39b%3A0xd43d84c4ffa8bad3!2sGuadalajara%2C%20Jal.!5e0!3m2!1sen!2smx!4v1700000000000!5m2!1sen!2smx" 
                width="100%" 
                height="250" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>

        <!-- Contact Form (Right Column) -->
        <div class="contact-form-col slide-in-right">
          <div class="form-card">
            <h3 class="form-title">Envíanos un mensaje</h3>
            <form @submit.prevent="submitContact" class="contact-form">
              
              <div class="form-group">
                <label>Nombre Completo</label>
                <input type="text" placeholder="Ej. Ana Pérez" required />
              </div>
              
              <div class="form-group">
                <label>Correo Electrónico</label>
                <input type="email" placeholder="ana@ejemplo.com" required />
              </div>

              <div class="form-group">
                <label>Asunto</label>
                <select required>
                  <option value="" disabled selected>Selecciona un motivo...</option>
                  <option value="duda">Duda sobre servicios</option>
                  <option value="tienda">Soporte tienda online</option>
                  <option value="prensa">Prensa / Negocios</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              
              <div class="form-group">
                <label>Mensaje</label>
                <textarea rows="5" placeholder="¿En qué te podemos ayudar?" required></textarea>
              </div>
              
              <button type="submit" class="btn btn-secondary btn-lg btn-pulse flex-center gap-2">
                <Send :size="18" />
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
        
      </div>
    </section>
  </div>
</template>

<script setup>
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-vue-next'

const submitContact = () => {
  alert('Mensaje enviado. Nos pondremos en contacto contigo pronto.')
}
</script>

<style scoped>
.contacto-page {
  padding-bottom: 5rem;
  overflow-x: hidden;
  background-color: #fafbfc;
}

/* Base Typo */
.text-muted { color: #666; line-height: 1.6; }
.mb-4 { margin-bottom: 2rem; }
.mt-5 { margin-top: 3rem; }
.flex-center { display: flex; justify-content: center; align-items: center; }
.gap-2 { gap: 0.5rem; }

/* Hero Section */
.hero-section {
  position: relative;
  background: linear-gradient(135deg, var(--color-secondary) 0%, #1a3a41 100%);
  color: var(--color-white);
  padding: 10rem 0 7rem 0;
  text-align: center;
  margin-bottom: -4rem; /* overlaps the content below */
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: rgba(255,255,255,0.85);
  max-width: 700px;
  margin: 0 auto;
}

/* Contact Grid */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  position: relative;
  z-index: 10;
}

/* Cards Base */
.info-card, .form-card {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: 3rem;
  box-shadow: 0 15px 40px rgba(0,0,0,0.06);
  border: 1px solid rgba(0,0,0,0.02);
  height: 100%;
}

/* Info Column */
.info-title {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--color-secondary);
  margin-bottom: 1rem;
}

.info-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-list li {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
}

.icon-circle {
  background: rgba(117,203,190,0.15);
  color: var(--color-primary);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.info-list li:hover .icon-circle {
  background: var(--color-primary);
  color: var(--color-white);
  transform: scale(1.1);
}

.info-list strong {
  display: block;
  font-size: 1.05rem;
  color: var(--color-secondary);
  margin-bottom: 0.25rem;
}

.info-list p {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
}

.map-container {
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  filter: grayscale(100%) contrast(1.2) sepia(10%) hue-rotate(180deg);
  transition: filter 0.5s ease;
}

.map-container:hover {
  filter: grayscale(0%);
}

/* Form Column */
.form-title {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--color-secondary);
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-secondary);
  margin-bottom: 0.5rem;
}

.contact-form input,
.contact-form select,
.contact-form textarea {
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid #ddd;
  border-radius: var(--radius-md);
  color: var(--color-text);
  font-size: 1rem;
  background: #fdfdfd;
  transition: all 0.3s ease;
}

.contact-form input:focus,
.contact-form select:focus,
.contact-form textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  background: #fff;
  box-shadow: 0 0 0 3px rgba(117, 203, 190, 0.2);
}

.btn-lg {
  width: 100%;
  font-size: 1.1rem;
  padding: 1rem;
  font-weight: 700;
  margin-top: 1rem;
}

.btn-secondary {
  background: var(--color-secondary);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-pulse:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(26, 58, 65, 0.4);
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

/* Responsive */
@media (min-width: 992px) {
  .contact-grid {
    grid-template-columns: 5fr 7fr;
    gap: 3rem;
  }
}
</style>
