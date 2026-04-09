<template>
  <section class="asymmetric-about">
    <div class="about-grid">
      <!-- Image floating out of bounds to the left -->
      <div class="about-image-wrapper">
        <img src="/img_about.png" alt="Clínica Interior" class="parallax-img" />
      </div>

      <!-- Text block placed asymmetrically -->
      <div class="about-text-wrapper">
        <h2 class="editorial-title">El Arte de<br/>la Biología.</h2>
        <div class="divider-line"></div>
        <p class="editorial-p">
          Entender tu cuerpo no es una métrica, es una disciplina artística. En NutriKer cruzamos la línea 
          entre la ciencia pura y el estilo de vida de vanguardia.
        </p>
        <p class="editorial-p">
          No somos una dieta. Somos una curaduría de tus procesos metabólicos, diseñados para empoderar 
          el cuerpo y refinar el rendimiento humano con máxima elegancia.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.asymmetric-about {
  padding: 10rem 5vw;
  background-color: var(--color-bg);
  min-height: 80vh;
}

.about-grid {
  display: flex;
  align-items: center;
  gap: 8vw;
  max-width: 1400px;
  margin: 0 auto;
}

.about-image-wrapper {
  flex: 0 0 50%;
  position: relative;
  /* El float asimétrico: ligeramente desplazado hacia arriba y la izquierda */
  transform: translateY(-50px);
}

.about-image-wrapper img {
  width: 100%;
  aspect-ratio: 4/5;
  object-fit: cover;
  box-shadow: 0 30px 60px rgba(0,0,0,0.1);
}

.about-text-wrapper {
  flex: 1;
  padding-left: 2rem;
}

.editorial-title {
  font-family: var(--font-serif);
  font-size: clamp(3rem, 6vw, 6rem);
  line-height: 0.9;
  letter-spacing: -2px;
  color: var(--color-primary-dark);
  margin-bottom: 2rem;
}

.divider-line {
  width: 60px;
  height: 2px;
  background-color: var(--color-secondary);
  margin-bottom: 2.5rem;
}

.editorial-p {
  font-size: 1.15rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 1.5rem;
  max-width: 450px;
}

@media (max-width: 900px) {
  .about-grid {
    flex-direction: column-reverse;
    gap: 4rem;
  }
  .about-image-wrapper {
    transform: translateY(0);
    width: 100%;
  }
  .about-text-wrapper {
    padding-left: 0;
  }
}
</style>
