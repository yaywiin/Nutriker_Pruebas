<template>
  <header class="editorial-header">
    <div class="header-left">
      <img src="/icon_apple.png" alt="NutriKer Ícono" class="navbar-icon" />
    </div>
    
    <div class="header-center">
      <img src="/logo_text.png" alt="NutriKer" class="brand-image" />
    </div>

    <!-- Espacio en blanco a la derecha para emparejar la grilla y lograr centrado absoluto -->
    <div class="header-right"></div>
  </header>
</template>

<script setup>
</script>

<style scoped>
.editorial-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 2rem 4rem;
  z-index: 50;
  
  /* Uso de Grid 1fr - auto - 1fr para asegurar centrado perfecto del texto */
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  
  pointer-events: none; /* Allows clicking through the empty header space */
}

.header-left, .header-center {
  pointer-events: auto; /* Logo and brand name remain clickable/interactable */
}

.header-left {
  display: flex;
  justify-content: flex-start;
}

.header-right {
  /* Only exists to balance the text perfectly in the middle */
}

.navbar-icon {
  height: 55px; /* Ícono agrandado */
  object-fit: contain;
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
  transition: transform 0.3s;
}

.navbar-icon:hover {
  transform: scale(1.1);
}

.brand-image {
  height: 48px; /* Tamaño equivalente al H1 gigante que teníamos */
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(255, 255, 255, 0.8));
}

@media (max-width: 768px) {
  .editorial-header {
    padding: 1.5rem 2rem;
  }
  .navbar-icon {
    height: 40px;
  }
  .brand-image {
    height: 35px;
  }
}
</style>
