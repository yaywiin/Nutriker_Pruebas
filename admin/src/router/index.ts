import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/',
      redirect: '/usuarios',
    },
    {
      path: '/usuarios',
      name: 'Usuarios',
      component: () => import('../views/Usuarios.vue'),
      meta: { title: 'Usuarios' },
    },
    {
      path: '/productos',
      name: 'Productos',
      component: () => import('../views/Productos.vue'),
      meta: { title: 'Productos' },
    },
    {
      path: '/categorias',
      name: 'Categorías',
      component: () => import('../views/Categorias.vue'),
      meta: { title: 'Categorías' },
    },
    {
      path: '/pedidos',
      name: 'Pedidos',
      component: () => import('../views/Pedidos.vue'),
      meta: { title: 'Pedidos' },
    },
    {
      path: '/citas',
      name: 'Citas',
      component: () => import('../views/Citas.vue'),
      meta: { title: 'Citas' },
    },
  ],
})

export default router

router.beforeEach((to, from, next) => {
  document.title = `Bioclinik Admin | ${to.meta.title ?? ''}`
  next()
})
