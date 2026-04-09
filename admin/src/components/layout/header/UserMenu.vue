<template>
  <div class="relative" ref="dropdownRef">
    <button
      class="flex items-center text-gray-700 dark:text-gray-400"
      @click.prevent="toggleDropdown"
    >
      <span class="mr-3 flex items-center justify-center overflow-hidden rounded-full h-11 w-11 bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400 font-bold text-lg">
        {{ userInitial }}
      </span>
      <span class="block mr-1 font-medium text-theme-sm">{{ userName }}</span>
      <ChevronDownIcon :class="{ 'rotate-180': dropdownOpen }" />
    </button>

    <!-- Dropdown Start -->
    <div
      v-if="dropdownOpen"
      class="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
    >
      <div class="border-b border-gray-200 dark:border-gray-800 pb-3">
        <span class="block font-medium text-gray-700 text-theme-sm dark:text-gray-300">
          {{ userName }}
        </span>
        <span class="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
          {{ userEmail }}
        </span>
      </div>
      <router-link
        to="/login"
        @click="signOut"
        class="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
      >
        <LogoutIcon
          class="text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300"
        />
        Sign out
      </router-link>
    </div>
    <!-- Dropdown End -->
  </div>
</template>

<script setup>
import { ChevronDownIcon, LogoutIcon } from '@/icons'
import { RouterLink } from 'vue-router'
import { ref, computed, onMounted, onUnmounted } from 'vue'

const dropdownOpen = ref(false)
const dropdownRef = ref(null)

// Datos del usuario logueado
const userData = ref({
  nombre: 'Administrador',
  correo: 'admin@nutriker.com'
})

const userName = computed(() => userData.value.nombre)
const userEmail = computed(() => userData.value.correo)
const userInitial = computed(() => (userName.value || 'A').charAt(0).toUpperCase())

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const closeDropdown = () => {
  dropdownOpen.value = false
}

const signOut = () => {
  localStorage.removeItem('admin_logged')
  localStorage.removeItem('admin_token')
  localStorage.removeItem('admin_user')
  closeDropdown()
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  
  // Cargar datos reales
  const storedUser = localStorage.getItem('admin_user')
  if (storedUser) {
    try {
      const parsed = JSON.parse(storedUser)
      if (parsed.nombre) userData.value.nombre = parsed.nombre
      if (parsed.correo) userData.value.correo = parsed.correo
    } catch (e) {
      console.error('Error al parsear admin_user', e)
    }
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
