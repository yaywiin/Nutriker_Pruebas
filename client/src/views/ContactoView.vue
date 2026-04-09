<template>
  <section class="asymmetric-contact">
    <div class="contact-grid">
      <!-- Title crashing top left -->
      <div class="contact-header">
        <h1 class="editorial-title">Hablemos.</h1>
        <p class="editorial-subtitle">Comienza tu evolución somática.</p>
      </div>

      <!-- Image deeply bleeding right -->
      <div class="contact-image-wrapper">
        <img src="/img_contact.png" alt="Agenda tu cita" />
      </div>

      <!-- Info box floating over the bottom of the image -->
      <div class="contact-card">
        <div class="card-item">
          <span class="card-label">Teléfono</span>
          <p>+52 55 1234 5678</p>
        </div>
        <div class="card-item">
          <span class="card-label">Email</span>
          <p>contacto@nutriker.com</p>
        </div>
        <div class="card-item">
          <span class="card-label">Ubicación</span>
          <p>Paseo de la Reforma 250, CDMX</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.asymmetric-contact {
  padding: 10rem 5vw 15rem; /* Extra padding bottom because of floating global button */
  background-color: var(--color-bg);
  min-height: 100vh;
  position: relative;
}

.contact-grid {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  min-height: 70vh;
}

.contact-header {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
}

.editorial-title {
  font-family: var(--font-serif);
  font-size: clamp(5rem, 12vw, 10rem);
  line-height: 0.8;
  letter-spacing: -3px;
  color: var(--color-secondary);
}

.editorial-subtitle {
  font-size: 1.25rem;
  color: #666;
  margin-top: 1rem;
  padding-left: 0.5rem;
  font-weight: 600;
}

.contact-image-wrapper {
  position: absolute;
  right: 0;
  top: 5vh;
  width: 55vw;
  height: 65vh;
  z-index: 1;
}

.contact-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(1.1) contrast(1.1);
}

.contact-card {
  position: absolute;
  bottom: 0;
  left: 10vw;
  background: var(--color-white);
  padding: 3rem 4rem;
  z-index: 15;
  box-shadow: 0 40px 60px rgba(0,0,0,0.08);
  display: flex;
  gap: 4rem;
  transform: translateY(30%); /* Push it down over the image border */
}

.card-item {
  display: flex;
  flex-direction: column;
}

.card-label {
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 1px;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.card-item p {
  font-size: 1.1rem;
  color: var(--color-text);
  font-family: var(--font-serif);
}

@media (max-width: 900px) {
  .asymmetric-contact { padding: 6rem 5vw 10rem; }
  .contact-header { position: relative; }
  .contact-image-wrapper {
    position: relative;
    width: 100%;
    height: 50vh;
    margin-top: 2rem;
  }
  .contact-card {
    position: relative;
    left: 0;
    transform: translateY(-20px);
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
    width: 90%;
    margin: 0 auto;
  }
}
</style>
