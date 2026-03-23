import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/HomeView.vue') },
  { path: '/nosotros', name: 'Nosotros', component: () => import('../views/NosotrosView.vue') },
  { path: '/servicios', name: 'Servicios', component: () => import('../views/ServiciosView.vue') },
  { path: '/tienda', name: 'Tienda', component: () => import('../views/TiendaView.vue') },
  { path: '/tienda/:id', name: 'ProductoDetalle', component: () => import('../views/ProductoView.vue') },
  { path: '/citas', name: 'Citas', component: () => import('../views/CitasView.vue') },
  { path: '/contacto', name: 'Contacto', component: () => import('../views/ContactoView.vue') },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
