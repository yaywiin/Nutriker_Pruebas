<template>
  <AdminLayout>
    <!-- Encabezado -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white/90">Categorías</h2>
      <button @click="abrirAgregar"
        class="rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-600 focus:outline-none focus:ring-4 focus:ring-brand-300">
        Agregar Nueva
      </button>
    </div>

    <!-- Alerta global -->
    <div v-if="errorGlobal"
      class="mb-4 flex items-center gap-2 rounded-lg bg-error-50 px-4 py-3 text-error-700 dark:bg-error-500/15 dark:text-error-400">
      <svg class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {{ errorGlobal }}
    </div>

    <!-- Tabla -->
    <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <!-- Spinner -->
      <div v-if="loading" class="flex items-center justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent"></div>
        <span class="ml-3 text-gray-500 dark:text-gray-400">Cargando categorías...</span>
      </div>

      <div v-else class="max-w-full overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
              <th class="px-5 py-3 text-left w-1/12"><p class="font-medium text-gray-500 text-xs dark:text-gray-400 uppercase tracking-wider">ID</p></th>
              <th class="px-5 py-3 text-left w-6/12"><p class="font-medium text-gray-500 text-xs dark:text-gray-400 uppercase tracking-wider">Nombre</p></th>
              <th class="px-5 py-3 text-left w-3/12"><p class="font-medium text-gray-500 text-xs dark:text-gray-400 uppercase tracking-wider">Alta</p></th>
              <th class="px-5 py-3 text-center w-2/12"><p class="font-medium text-gray-500 text-xs dark:text-gray-400 uppercase tracking-wider">Acciones</p></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="c in categorias" :key="c.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
              <td class="px-5 py-4 text-gray-500 text-sm dark:text-gray-400">#{{ c.id }}</td>
              <td class="px-5 py-4">
                <span class="font-medium text-gray-800 text-sm dark:text-white/90">{{ c.nombre }}</span>
              </td>
              <td class="px-5 py-4 text-gray-500 text-sm dark:text-gray-400">{{ c.fechaAlta }}</td>
              <td class="px-5 py-4">
                <div class="flex justify-center gap-3">
                  <button @click="abrirDetalles(c)" class="text-blue-500 hover:text-blue-700" title="Mostrar Detalles">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  </button>
                  <button @click="abrirEditar(c)" class="text-yellow-500 hover:text-yellow-700" title="Editar">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                  </button>
                  <button @click="handleEliminar(c.id)" class="text-red-500 hover:text-red-700" title="Eliminar">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="!loading && categorias.length === 0">
              <td colspan="4" class="px-5 py-10 text-center text-gray-500 dark:text-gray-400">No hay categorías registradas.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════
         MODAL FORMULARIO
    ═══════════════════════════════════════════════════════ -->
    <Modal v-if="modalFormVisible" :fullScreenBackdrop="true" @close="cerrarFormulario">
      <template #body>
        <div class="relative w-full max-w-lg rounded-xl bg-white shadow-theme-lg dark:bg-gray-800 m-4 mx-auto my-10">
          <div class="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              {{ isEditing ? 'Editar Categoría' : 'Agregar Nueva Categoría' }}
            </h3>
          </div>

          <div v-if="formError"
            class="mx-6 mt-4 rounded-lg bg-error-50 px-3 py-2 text-sm text-error-700 dark:bg-error-500/15 dark:text-error-400">
            {{ formError }}
          </div>

          <form @submit.prevent="guardarCategoria" class="p-6">
            <div class="mb-6">
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Nombre de la Categoría</label>
              <input v-model="form.nombre" type="text" required
                class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 outline-none focus:border-brand-500 dark:border-gray-700 dark:text-white/90"
                placeholder="Ej. Tratamientos faciales" />
            </div>

            <div class="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button type="button" @click="cerrarFormulario"
                class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700">
                Cancelar
              </button>
              <button type="submit" :disabled="saving"
                class="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-60">
                <span v-if="saving" class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                Guardar
              </button>
            </div>
          </form>
        </div>
      </template>
    </Modal>

    <!-- ═══════════════════════════════════════════════════════
         MODAL DETALLES
    ═══════════════════════════════════════════════════════ -->
    <Modal v-if="modalDetallesVisible" :fullScreenBackdrop="true" @close="cerrarDetalles">
      <template #body>
        <div class="relative w-full max-w-lg rounded-xl bg-white shadow-theme-lg dark:bg-gray-800 m-4 mx-auto my-10">
          <div class="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">Detalles de la Categoría</h3>
          </div>

          <div class="p-6 space-y-5" v-if="categoriaSeleccionada">
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">ID</p>
              <p class="font-medium text-gray-800 dark:text-white/90">#{{ categoriaSeleccionada.id }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Nombre</p>
              <p class="font-semibold text-lg text-gray-800 dark:text-white/90">{{ categoriaSeleccionada.nombre }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Fecha de Alta</p>
              <p class="font-medium text-gray-800 dark:text-white/90">{{ categoriaSeleccionada.fechaAlta }}</p>
            </div>
          </div>

          <div class="flex justify-end px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <button @click="cerrarDetalles"
              class="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
              Cerrar
            </button>
          </div>
        </div>
      </template>
    </Modal>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import Modal from '@/components/ui/Modal.vue'
import { categoriasApi } from '@/api/index.js'

// ── Estado ────────────────────────────────────────────────────────────────────
const categorias  = ref<any[]>([])
const loading     = ref(false)
const saving      = ref(false)
const errorGlobal = ref('')
const formError   = ref('')

// ── Modales ───────────────────────────────────────────────────────────────────
const modalFormVisible       = ref(false)
const modalDetallesVisible   = ref(false)
const isEditing              = ref(false)
const categoriaSeleccionada  = ref<any>(null)

// ── Formulario ────────────────────────────────────────────────────────────────
const initForm = () => ({ id: null as number | null, nombre: '' })
const form = reactive({ ...initForm() })

// ── Cargar ────────────────────────────────────────────────────────────────────
async function cargarCategorias() {
  loading.value = true
  errorGlobal.value = ''
  try {
    categorias.value = await categoriasApi.getAll()
  } catch (e: any) {
    errorGlobal.value = e.message || 'No se pudo conectar al servidor'
  } finally {
    loading.value = false
  }
}
onMounted(cargarCategorias)

// ── Formulario ────────────────────────────────────────────────────────────────
function abrirAgregar() {
  isEditing.value = false
  Object.assign(form, initForm())
  formError.value = ''
  modalFormVisible.value = true
}

function abrirEditar(c: any) {
  isEditing.value = true
  Object.assign(form, { ...c })
  formError.value = ''
  modalFormVisible.value = true
}

function cerrarFormulario() {
  modalFormVisible.value = false
}

async function guardarCategoria() {
  saving.value = true
  formError.value = ''
  try {
    let result: any
    if (isEditing.value && form.id) {
      result = await categoriasApi.update(form.id, { nombre: form.nombre })
      const idx = categorias.value.findIndex(c => c.id === form.id)
      if (idx !== -1) categorias.value[idx] = result
    } else {
      result = await categoriasApi.create({ nombre: form.nombre })
      categorias.value.push(result)
    }
    cerrarFormulario()
  } catch (e: any) {
    formError.value = e.message || 'Error al guardar la categoría'
  } finally {
    saving.value = false
  }
}

// ── Detalles ──────────────────────────────────────────────────────────────────
function abrirDetalles(c: any) {
  categoriaSeleccionada.value = { ...c }
  modalDetallesVisible.value = true
}
function cerrarDetalles() {
  modalDetallesVisible.value = false
  setTimeout(() => { categoriaSeleccionada.value = null }, 300)
}

// ── Eliminar ──────────────────────────────────────────────────────────────────
async function handleEliminar(id: number) {
  if (!confirm('¿Deseas eliminar esta categoría?')) return
  try {
    await categoriasApi.delete(id)
    categorias.value = categorias.value.filter(c => c.id !== id)
  } catch (e: any) {
    errorGlobal.value = e.message || 'Error al eliminar la categoría'
  }
}
</script>
