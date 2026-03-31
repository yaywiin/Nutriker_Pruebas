<template>
  <div class="layout-app">
    <Navbar />
    <main class="layout-main">
      <RouterView />
    </main>
    <Footer />
    <CitasModal />
    <CartDrawer />
  </div>
</template>

<script setup>
import Navbar from './components/common/Navbar.vue'
import Footer from './components/common/Footer.vue'
import CitasModal from './components/common/CitasModal.vue'
import CartDrawer from './components/common/CartDrawer.vue'
</script>
