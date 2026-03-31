<template>
  <AdminLayout>
    <!-- Encabezado -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white/90">Gestión de Citas</h2>
    </div>

    <!-- Alerta global -->
    <div v-if="errorGlobal"
      class="mb-4 flex items-center gap-2 rounded-lg bg-error-50 px-4 py-3 text-error-700 dark:bg-error-500/15 dark:text-error-400">
      <svg class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {{ errorGlobal }}
    </div>
    <div v-if="successGlobal"
      class="mb-4 flex items-center gap-2 rounded-lg bg-success-50 px-4 py-3 text-success-700 dark:bg-success-500/15 dark:text-success-400">
      <svg class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      {{ successGlobal }}
    </div>

    <!-- Filtros -->
    <div class="mb-6 flex flex-col gap-4 sm:flex-row">
      <div class="relative max-w-md flex-1">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input v-model="searchQuery" type="text"
          class="block w-full rounded-lg border border-gray-300 bg-white p-2.5 pl-10 text-sm text-gray-900 focus:border-brand-500 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
          placeholder="Buscar por Nombre del Cliente..." />
      </div>
      <div>
        <input v-model="filterDate" type="date"
          class="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-brand-500 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 [color-scheme:light] dark:[color-scheme:dark]" />
      </div>
    </div>

    <!-- Tabla -->
    <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div v-if="loading" class="flex items-center justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent"></div>
        <span class="ml-3 text-gray-500 dark:text-gray-400">Cargando citas...</span>
      </div>

      <div v-else class="max-w-full overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
              <th class="px-4 py-3 text-left"><p class="font-medium text-gray-500 text-xs dark:text-gray-400 uppercase tracking-wider">Cliente / Contacto</p></th>
              <th class="px-4 py-3 text-left"><p class="font-medium text-gray-500 text-xs dark:text-gray-400 uppercase tracking-wider">Fecha</p></th>
              <th class="px-4 py-3 text-left"><p class="font-medium text-gray-500 text-xs dark:text-gray-400 uppercase tracking-wider">Atención Previa</p></th>
              <th class="px-4 py-3 text-left"><p class="font-medium text-gray-500 text-xs dark:text-gray-400 uppercase tracking-wider">Físico (Peso / Estatura)</p></th>
              <th class="px-4 py-3 text-center"><p class="font-medium text-gray-500 text-xs dark:text-gray-400 uppercase tracking-wider">Acciones</p></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="c in filteredCitas" :key="c.id" class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
              <td class="px-4 py-3">
                <span class="font-semibold text-gray-800 text-sm dark:text-white/90 block">{{ c.cliente_nombre }}</span>
                <span class="text-xs text-brand-600 dark:text-brand-400 flex items-center gap-1 mt-0.5">
                  {{ c.cliente_telefono }}
                </span>
              </td>
              <td class="px-4 py-3">
                <div class="inline-flex flex-col">
                  <span class="font-medium text-gray-800 text-sm dark:text-white/90">{{ formatDate(c.fecha) }}</span>
                </div>
              </td>
              <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                <span v-if="c.atencion_previa?.toLowerCase() === 'si'" class="px-2 py-1 rounded bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400 text-xs font-semibold border border-brand-200 dark:border-brand-800">
                  Sí (Paciente Previo)
                </span>
                <span v-else class="px-2 py-1 rounded bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 text-xs font-medium border border-gray-200 dark:border-gray-700">
                  No
                </span>
              </td>
              <td class="px-4 py-3">
                <div class="text-sm text-gray-600 dark:text-gray-400 flex flex-col gap-0.5">
                  <span><strong class="text-gray-400">P:</strong> {{ c.peso ? `${parseFloat(c.peso)} kg` : '--' }}</span>
                  <span><strong class="text-gray-400">E:</strong> {{ c.estatura ? `${parseFloat(c.estatura)} cm` : '--' }}</span>
                </div>
              </td>
              <td class="px-4 py-3">
                <div class="flex justify-center gap-3">
                  <button @click="abrirEditar(c)" class="text-yellow-500 hover:text-yellow-700 transition" title="Editar cita">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                  </button>
                  <button @click="handleEliminar(c.id)" class="text-red-500 hover:text-red-700 transition" title="Eliminar/Cancelar cita">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="!loading && filteredCitas.length === 0">
              <td colspan="5" class="px-4 py-10 text-center text-gray-500 dark:text-gray-400">No hay citas registradas.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════
         MODAL FORMULARIO EDICIÓN
    ═══════════════════════════════════════════════════════ -->
    <Modal v-if="modalFormVisible" :fullScreenBackdrop="true" @close="cerrarFormulario">
      <template #body>
        <div class="relative w-full max-w-2xl rounded-xl bg-white shadow-theme-lg dark:bg-gray-800 m-4 mx-auto my-10">
          <div class="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">Editar Cita y Datos Físicos</h3>
          </div>

          <div v-if="formError" class="mx-6 mt-4 rounded-lg bg-error-50 px-3 py-2 text-sm text-error-700 dark:bg-error-500/15 dark:text-error-400">
            {{ formError }}
          </div>

          <form @submit.prevent="guardarCita" class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              <!-- Cliente y Teléfono -->
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-500 dark:text-gray-400">Nombre del Cliente</label>
                <input v-model="form.cliente_nombre" type="text" disabled
                  class="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-500 outline-none cursor-not-allowed dark:border-gray-700 dark:bg-gray-700 dark:text-gray-400" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-500 dark:text-gray-400">Teléfono</label>
                <input v-model="form.cliente_telefono" type="tel" disabled
                  class="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-500 outline-none cursor-not-allowed dark:border-gray-700 dark:bg-gray-700 dark:text-gray-400" />
              </div>

              <!-- Fecha y Atención -->
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Fecha Deseada</label>
                <input v-model="form.fecha" type="date" required
                  class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 outline-none focus:border-brand-500 dark:border-gray-700 dark:text-white/90 [color-scheme:light] dark:[color-scheme:dark]" />
              </div>
              
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-500 dark:text-gray-400">¿Atención Previa?</label>
                <select v-model="form.atencion_previa" disabled
                  class="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-500 outline-none cursor-not-allowed dark:border-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
              </div>

              <!-- Datos Físicos -->
              <div class="border-t border-gray-100 dark:border-gray-700 pt-4 md:col-span-2 grid grid-cols-2 gap-5 mt-2">
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-500 dark:text-gray-400">Peso Aproximado (kg)</label>
                  <input v-model="form.peso" type="number" step="0.1" min="0" disabled
                    class="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-500 outline-none cursor-not-allowed dark:border-gray-700 dark:bg-gray-700 dark:text-gray-400" />
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-500 dark:text-gray-400">Estatura (cm)</label>
                  <input v-model="form.estatura" type="number" step="0.1" min="0" disabled
                    class="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-500 outline-none cursor-not-allowed dark:border-gray-700 dark:bg-gray-700 dark:text-gray-400" />
                </div>
              </div>

            </div>

            <!-- Pie del modal -->
            <div class="flex justify-end gap-3 mt-8 border-t border-gray-200 dark:border-gray-700 pt-5">
              <button type="button" @click="cerrarFormulario"
                class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700">
                Cancelar
              </button>
              <button type="submit" :disabled="saving"
                class="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-60">
                <span v-if="saving" class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </template>
    </Modal>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import Modal from '@/components/ui/Modal.vue'
import { citasApi } from '@/api/index.js'

// ── Estado ────────────────────────────────────────────────────────────────────
const citas = ref<any[]>([])
const loading = ref(false)
const saving = ref(false)

const errorGlobal = ref('')
const successGlobal = ref('')
const formError = ref('')

// Buscador y Filtro
const searchQuery = ref('')
const filterDate = ref('')

// Modo Modal
const modalFormVisible = ref(false)

// ── Formulario Inicial ────────────────────────────────────────────────────────
const initForm = () => ({
  id: null as string | null,
  cliente_nombre: '',
  cliente_telefono: '',
  fecha: '',
  atencion_previa: 'no',
  peso: '',
  estatura: ''
})
const form = reactive({ ...initForm() })

// ── Cargar Datos ──────────────────────────────────────────────────────────────
async function cargarDatos() {
  loading.value = true
  errorGlobal.value = ''
  try {
    const data = await citasApi.getAll()
    citas.value = data
  } catch (e: any) {
    errorGlobal.value = e.message || 'Error al conectar al servidor'
  } finally {
    loading.value = false
  }
}
onMounted(cargarDatos)

// ── Filtro Computado ────────────────────────────────────────────────────────
const filteredCitas = computed(() => {
  let result = citas.value
  
  if (filterDate.value) {
    result = result.filter(c => {
      const dbDate = c.fecha ? new Date(c.fecha).toISOString().split('T')[0] : ''
      return dbDate === filterDate.value
    })
  }
  
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(c => c.cliente_nombre.toLowerCase().includes(q))
  }
  
  return result
})

// ── Formateo Visual ───────────────────────────────────────────────────────
function formatDate(dateString: string) {
  if (!dateString) return ''
  // Asumiendo formato YYYY-MM-DD
  const dateObj = new Date(dateString)
  return new Intl.DateTimeFormat('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(dateObj).replace(/^\w/, (c) => c.toUpperCase())
}

// ── Operaciones (Editar) ───────────────────────────────────────────────────────
function abrirEditar(c: any) {
  // Ajustar fecha para el input type="date"
  let fechaFormateada = ''
  if (c.fecha) {
    fechaFormateada = new Date(c.fecha).toISOString().split('T')[0]
  }

  Object.assign(form, {
    id: c.id,
    cliente_nombre: c.cliente_nombre,
    cliente_telefono: c.cliente_telefono,
    fecha: fechaFormateada,
    atencion_previa: c.atencion_previa,
    peso: c.peso === null ? '' : c.peso,
    estatura: c.estatura === null ? '' : c.estatura
  })
  
  formError.value = ''
  modalFormVisible.value = true
}

function cerrarFormulario() {
  modalFormVisible.value = false
}

async function guardarCita() {
  if (!form.id) return // Solo admitimos edición
  saving.value = true
  formError.value = ''
  try {
    const payload = { ...form }
    const result = await citasApi.update(form.id, payload)
    
    // update in local UI array
    const idx = citas.value.findIndex(x => x.id === form.id)
    if (idx !== -1) citas.value[idx] = result
    
    successGlobal.value = 'Registro actualizado correctamente'
    setTimeout(() => { successGlobal.value = '' }, 3000)
    cerrarFormulario()
  } catch (error: any) {
    formError.value = error.message || 'Hubo un error al guardar'
  } finally {
    saving.value = false
  }
}

// ── Operaciones (Eliminar) ─────────────────────────────────────────────────────
async function handleEliminar(id: string) {
  if (!confirm('¿Seguro que deseas eliminar/cancelar esta cita en sistema?')) return
  try {
    await citasApi.delete(id)
    citas.value = citas.value.filter(c => c.id !== id)
    successGlobal.value = 'Cita borrada satisfactoriamente.'
    setTimeout(() => { successGlobal.value = '' }, 3000)
  } catch (error: any) {
    errorGlobal.value = error.message || 'No se pudo eliminar'
  }
}
</script>
