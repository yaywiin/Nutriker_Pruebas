<template>
  <nav class="navbar" :class="{ 'navbar-scrolled': isScrolled }">
    <div class="container navbar-container">
      
      <!-- Logo -->
      <RouterLink to="/" class="navbar-brand">
        <img src="/logo.png" alt="Bioclinik Logo" class="navbar-logo desktop-logo" />
        <img src="/logo-mobile.png" alt="Bioclinik Logo" class="navbar-logo mobile-logo" />
      </RouterLink>

      <!-- Desktop Menu -->
      <ul class="nav-links desktop-menu">
        <li><RouterLink to="/">Inicio</RouterLink></li>
        <li><RouterLink to="/nosotros">Nosotros</RouterLink></li>
        <li><RouterLink to="/servicios">Servicios</RouterLink></li>
        <li><RouterLink to="/tienda">Tienda</RouterLink></li>
        <li><RouterLink to="/contacto">Contacto</RouterLink></li>
        <li><button class="btn btn-primary btn-sm" @click="appStore.toggleModal(true)">Agendar Cita</button></li>
      </ul>

      <!-- Right Actions (Cart and Hamburger) -->
      <div class="nav-actions">
        <button class="cart-icon-btn mr-3" @click="cartStore.toggleCart(true)" aria-label="Abrir carrito">
          <ShoppingCart :size="20" class="icon" />
          <span class="cart-badge" v-if="cartStore.cartItemCount > 0">{{ cartStore.cartItemCount }}</span>
        </button>

        <!-- Hamburger Menu Button -->
        <button class="hamburger-btn" @click="toggleMenu" :class="{ active: isMenuOpen }" aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

    </div>

    <!-- Mobile Menu Overlay -->
    <div class="mobile-menu-overlay" :class="{ active: isMenuOpen }">
      <ul class="mobile-nav-links">
        <li><RouterLink to="/" @click="closeMenu">Inicio</RouterLink></li>
        <li><RouterLink to="/nosotros" @click="closeMenu">Nosotros</RouterLink></li>
        <li><RouterLink to="/servicios" @click="closeMenu">Servicios</RouterLink></li>
        <li><RouterLink to="/tienda" @click="closeMenu">Tienda</RouterLink></li>
        <li><RouterLink to="/contacto" @click="closeMenu">Contacto</RouterLink></li>
        <li class="mt-4">
          <button class="btn btn-primary" @click="closeMenu(); appStore.toggleModal(true)">Agendar Cita</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ShoppingCart } from 'lucide-vue-next'
import { useAppStore } from '../../stores/app'
import { useCartStore } from '../../stores/cart'

const appStore = useAppStore()
const cartStore = useCartStore()

const isMenuOpen = ref(false)
const isScrolled = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMenu = () => {
  isMenuOpen.value = false
  document.body.style.overflow = ''
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: var(--color-white);
  z-index: 1000;
  transition: all 0.3s ease;
}

.navbar-scrolled {
  box-shadow: var(--shadow-sm);
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

/* Brand */
.navbar-brand {
  display: flex;
  align-items: center;
  z-index: 1001;
}

.navbar-logo {
  height: 54px;
  width: auto;
  object-fit: contain;
}

.mobile-logo {
  display: none;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-actions {
  display: flex;
  align-items: center;
}

.nav-links a {
  font-weight: 600;
  color: var(--color-text);
  font-size: 1rem;
  position: relative;
}

.nav-links a:hover, .nav-links a.router-link-active {
  color: var(--color-primary);
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0%;
  height: 2px;
  background-color: var(--color-primary);
  transition: width 0.3s ease;
  border-radius: var(--radius-full);
}

.nav-links a:hover::after, .nav-links a.router-link-active::after {
  width: 100%;
}

/* Base button adjustment */
.btn-sm {
  padding: 0.6rem 1.25rem;
  font-size: 0.95rem;
}

/* Cart Icon */
.cart-icon-btn {
  background: none;
  border: none;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  transition: transform 0.2s ease;
}

.cart-icon-btn:hover {
  transform: scale(1.1);
}

.cart-icon-btn .icon {
  color: var(--color-secondary);
}

.cart-badge {
  position: absolute;
  top: 0px;
  right: -5px;
  background-color: var(--color-primary);
  color: white;
  font-size: 0.65rem;
  font-weight: bold;
  height: 18px;
  min-width: 18px;
  padding: 0 4px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-white);
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.mr-3 { margin-right: 1rem; }
.gap-3 { gap: 1rem; }

/* Mobile & Hamburger */
.hamburger-btn {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1001;
}

.hamburger-btn span {
  width: 100%;
  height: 3px;
  background-color: var(--color-secondary);
  border-radius: var(--radius-full);
  transition: all 0.3s ease;
}

.hamburger-btn.active span:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.hamburger-btn.active span:nth-child(2) {
  opacity: 0;
}

.hamburger-btn.active span:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--color-white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translateY(-100%);
  transition: transform 0.4s cubic-bezier(0.77, 0, 0.175, 1);
  z-index: 1000;
}

.mobile-menu-overlay.active {
  transform: translateY(0);
}

.mobile-nav-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;
}

.mobile-nav-links a {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-secondary);
}

.mobile-nav-links a.btn {
  color: var(--color-white);
}

.mobile-nav-links a.router-link-active {
  color: var(--color-primary);
}

/* Responsive */
@media (max-width: 991px) {
  .desktop-menu {
    display: none;
  }
  .hamburger-btn {
    display: flex;
  }
  .desktop-logo {
    display: none;
  }
  .mobile-logo {
    display: block;
  }
}
</style>
