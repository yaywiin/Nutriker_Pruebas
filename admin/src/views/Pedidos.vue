<template>
  <AdminLayout>
    <!-- Encabezado -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white/90">Pedidos</h2>
    </div>

    <!-- Alerta global -->
    <div v-if="errorGlobal"
      class="mb-4 flex items-center gap-2 rounded-lg bg-error-50 px-4 py-3 text-error-700 dark:bg-error-500/15 dark:text-error-400">
      <svg class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {{ errorGlobal }}
    </div>

    <!-- Filtros -->
    <div class="mb-6 flex flex-col sm:flex-row gap-4">
      <div class="flex-1">
        <label class="sr-only">Buscar pedido</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input v-model="searchQuery" type="text"
            class="block w-full rounded-lg border border-gray-300 bg-white p-2.5 pl-10 text-sm text-gray-900 focus:border-brand-500 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            placeholder="Buscar por cliente o ID de pedido (8 dígitos)..." />
        </div>
      </div>
      <div>
        <label class="sr-only">Filtrar por Fecha</label>
        <input v-model="filterDate" type="date"
          class="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-brand-500 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white [color-scheme:light] dark:[color-scheme:dark]"
          title="Filtrar por fecha" />
      </div>
    </div>

    <!-- Tabla -->
    <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div v-if="loading" class="flex items-center justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent"></div>
        <span class="ml-3 text-gray-500 dark:text-gray-400">Cargando pedidos...</span>
      </div>

      <div v-else class="max-w-full overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
              <th class="px-4 py-3 text-left"><p class="font-medium text-gray-500 text-xs dark:text-gray-400 uppercase tracking-wider">No. Pedido</p></th>
              <th class="px-4 py-3 text-left"><p class="font-medium text-gray-500 text-xs dark:text-gray-400 uppercase tracking-wider">Cliente</p></th>
              <th class="px-4 py-3 text-left"><p class="font-medium text-gray-500 text-xs dark:text-gray-400 uppercase tracking-wider">Total</p></th>
              <th class="px-4 py-3 text-left"><p class="font-medium text-gray-500 text-xs dark:text-gray-400 uppercase tracking-wider">Destino</p></th>
              <th class="px-4 py-3 text-left"><p class="font-medium text-gray-500 text-xs dark:text-gray-400 uppercase tracking-wider">Fecha</p></th>
              <th class="px-4 py-3 text-left"><p class="font-medium text-gray-500 text-xs dark:text-gray-400 uppercase tracking-wider">Estado</p></th>
              <th class="px-4 py-3 text-center"><p class="font-medium text-gray-500 text-xs dark:text-gray-400 uppercase tracking-wider">Acciones</p></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="p in filteredPedidos" :key="p.id" class="hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer" @click="abrirDetalles(p)">
              <td class="px-4 py-3 text-gray-900 font-medium text-sm dark:text-white/90">#{{ p.id }}</td>
              <td class="px-4 py-3">
                <span class="font-medium text-gray-800 text-sm dark:text-white/90">{{ p.cliente_nombre }}</span>
                <p class="text-xs text-gray-500">{{ p.cliente_email }}</p>
              </td>
              <td class="px-4 py-3 text-gray-700 text-sm font-bold dark:text-white/80">
                ${{ Number(p.total).toFixed(2) }}
              </td>
              <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                {{ p.ciudad }}, {{ p.estado }}
              </td>
              <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                {{ formatDate(p.created_at) }}
              </td>
              <td class="px-4 py-3">
                <span :class="getStatusClass(p.estado_pedido)" class="px-2.5 py-1 rounded-full text-xs font-medium border border-transparent">
                  {{ p.estado_pedido }}
                </span>
              </td>
              <td class="px-4 py-3">
                <div class="flex justify-center gap-3">
                  <button @click.stop="abrirDetalles(p)" class="text-brand-500 hover:text-brand-700 flex items-center gap-1 text-sm font-medium transition" title="Ver Detalles">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    Ver
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="!loading && filteredPedidos.length === 0">
              <td colspan="7" class="px-4 py-10 text-center text-gray-500 dark:text-gray-400">
                No hay pedidos que coincidan con la búsqueda.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════
         MODAL DETALLES DEL PEDIDO
    ═══════════════════════════════════════════════════════ -->
    <Modal v-if="modalDetallesVisible" :fullScreenBackdrop="true" @close="cerrarDetalles">
      <template #body>
        <div class="relative w-full max-w-4xl rounded-xl bg-white shadow-theme-lg dark:bg-gray-800 m-4 mx-auto my-10 max-h-[90vh] overflow-y-auto">
          <div class="border-b border-gray-200 dark:border-gray-700 px-6 py-4 sticky top-0 bg-white dark:bg-gray-800 z-10 flex justify-between items-center">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              Pedido #{{ pedidoSeleccionado?.id }}
              <span :class="getStatusClass(formEstado.estado_pedido)" class="ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium border border-transparent">
                {{ formEstado.estado_pedido }}
              </span>
            </h3>
            <button @click="cerrarDetalles" class="text-gray-400 hover:text-gray-600 transition p-1">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <div v-if="successMsg" class="mx-6 mt-4 rounded-lg bg-success-50 px-3 py-2 text-sm text-success-700 dark:bg-success-500/15 dark:text-success-400">
            {{ successMsg }}
          </div>

          <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-8" v-if="pedidoSeleccionado">
            
            <!-- Columna Izquierda: Detalles estáticos -->
            <div class="space-y-6">
              
              <!-- Cliente -->
              <div>
                <h4 class="text-base font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  Datos del Cliente
                </h4>
                <div class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700 space-y-2">
                  <p><span class="text-gray-500 text-sm block">Nombre:</span> <span class="font-medium">{{ pedidoSeleccionado.cliente_nombre }}</span></p>
                  <p><span class="text-gray-500 text-sm block">Email:</span> <a :href="'mailto:' + pedidoSeleccionado.cliente_email" class="text-brand-600 hover:underline">{{ pedidoSeleccionado.cliente_email || 'N/A' }}</a></p>
                  <p><span class="text-gray-500 text-sm block">Teléfono:</span> <span class="font-medium">{{ pedidoSeleccionado.cliente_telefono || 'N/A' }}</span></p>
                </div>
              </div>

              <!-- Entrega -->
              <div>
                <h4 class="text-base font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path></svg>
                  Datos de Entrega
                </h4>
                <div class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700 space-y-2">
                  <p><span class="text-gray-500 text-sm block">Dirección:</span> <span class="font-medium">{{ pedidoSeleccionado.direccion_entrega }}</span></p>
                  <p><span class="text-gray-500 text-sm block">Ciudad/Estado:</span> <span class="font-medium">{{ pedidoSeleccionado.ciudad }}, {{ pedidoSeleccionado.estado }}</span></p>
                  <p><span class="text-gray-500 text-sm block">Código Postal:</span> <span class="font-medium">{{ pedidoSeleccionado.codigo_postal }}</span></p>
                </div>
              </div>

              <!-- Resumen Finanzas -->
              <div class="bg-brand-50 dark:bg-brand-900/10 p-4 rounded-lg border border-brand-100 dark:border-brand-900/40">
                <p><span class="text-gray-600 dark:text-gray-400 text-sm">Método de Pago:</span> <span class="font-semibold text-gray-800 dark:text-white">{{ pedidoSeleccionado.metodo_pago === 'card' ? 'Tarjeta' : 'Transferencia' }}</span></p>
                <div class="mt-2 pt-2 border-t border-brand-100 dark:border-brand-800 flex justify-between items-center">
                  <span class="text-gray-600 dark:text-gray-400">Total Pagado:</span>
                  <span class="text-xl font-bold text-brand-700 dark:text-brand-400">${{ Number(pedidoSeleccionado.total).toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <!-- Columna Derecha: Acciones Administrativas -->
            <div class="space-y-6">
              
              <!-- Cambio de Estado -->
              <div class="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 class="text-base font-bold text-gray-800 dark:text-white mb-3">Actualizar Estado</h4>
                <form @submit.prevent="guardarEstado" class="space-y-3">
                  <select v-model="formEstado.estado_pedido" class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                    <option value="En proceso">En proceso</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="completado">Completado</option>
                    <option value="cancelado">Cancelado</option>
                    <option value="fallido">Fallido</option>
                    <option value="rembolsado">Rembolsado</option>
                  </select>
                  <button type="submit" :disabled="saving" class="w-full flex justify-center items-center gap-2 rounded-lg bg-gray-900 dark:bg-white dark:text-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition disabled:opacity-70">
                    <span v-if="saving" class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                    Aplicar Estado
                  </button>
                </form>
              </div>

              <!-- Notas -->
              <div class="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 class="text-base font-bold text-gray-800 dark:text-white mb-3">Notas Internas</h4>
                <p class="text-xs text-gray-500 mb-3">Estas notas son solo visibles para administradores (ej. número de guía, comentarios del cliente).</p>
                <form @submit.prevent="guardarNotas" class="space-y-3">
                  <textarea v-model="formNotas.notas" rows="5" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 outline-none focus:border-brand-500 dark:border-gray-700 dark:text-white" placeholder="Ej. Guía Estafeta: 123456789..."></textarea>
                  <button type="submit" :disabled="savingNotas" class="w-full flex justify-center items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 transition disabled:opacity-70">
                    <span v-if="savingNotas" class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Guardar Notas
                  </button>
                </form>
              </div>
              
              <div class="text-right">
                <p class="text-xs text-gray-400">Fecha de Alta: {{ formatDateTime(pedidoSeleccionado.created_at) }}</p>
                <p class="text-xs text-gray-400">Última Actualización: {{ formatDateTime(pedidoSeleccionado.updated_at) }}</p>
              </div>

            </div>
          </div>
        </div>
      </template>
    </Modal>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import Modal from '@/components/ui/Modal.vue'
import { pedidosApi } from '@/api/index.js'

// ── Estado ────────────────────────────────────────────────────────────────────
const pedidos = ref<any[]>([])
const loading = ref(false)
const errorGlobal = ref('')
const successMsg = ref('')

// Buscador y filtros
const searchQuery = ref('')
const filterDate = ref('')

// Modal
const modalDetallesVisible = ref(false)
const pedidoSeleccionado = ref<any>(null)

const saving = ref(false)
const savingNotas = ref(false)

const formEstado = ref({ estado_pedido: '' })
const formNotas = ref({ notas: '' })

// ── Cargar Datos ──────────────────────────────────────────────────────────────
async function cargarDatos() {
  loading.value = true
  errorGlobal.value = ''
  try {
    const data = await pedidosApi.getAll()
    pedidos.value = data
  } catch (e: any) {
    errorGlobal.value = e.message || 'Error al conectar al servidor'
  } finally {
    loading.value = false
  }
}
onMounted(cargarDatos)

// ── Propiedades Computadas (Filtros) ──────────────────────────────────────────
const filteredPedidos = computed(() => {
  let result = pedidos.value

  // Búsqueda por ID o Nombre
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(p => 
      String(p.id).toLowerCase().includes(q) || 
      p.cliente_nombre.toLowerCase().includes(q)
    )
  }

  // Búsqueda por fecha exacta (comparando formato YYYY-MM-DD vs el ISO del timestamp sqlite/pg)
  if (filterDate.value) {
    // filterDate.value viene como "2026-10-30" del input type date
    const dFilter = filterDate.value
    result = result.filter(p => {
      if (!p.created_at) return false
      // Extract YYYY-MM-DD from created_at robustly
      const pDate = new Date(p.created_at).toISOString().split('T')[0]
      return pDate === dFilter
    })
  }

  return result
})

// ── Utilidades Visuales ───────────────────────────────────────────────────────
function formatDate(isoString: string) {
  if (!isoString) return ''
  const d = new Date(isoString)
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function formatDateTime(isoString: string) {
  if (!isoString) return ''
  const d = new Date(isoString)
  return d.toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function getStatusClass(status: string) {
  const norm = status?.toLowerCase()
  if (norm === 'en proceso') return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800'
  if (norm === 'pendiente') return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800'
  if (norm === 'completado') return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800'
  if (['cancelado', 'fallido'].includes(norm)) return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800'
  if (norm === 'rembolsado') return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700'
  return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
}

// ── Acciones de Modal ─────────────────────────────────────────────────────────
function abrirDetalles(p: any) {
  pedidoSeleccionado.value = { ...p }
  formEstado.value.estado_pedido = p.estado_pedido
  formNotas.value.notas = p.notas || ''
  successMsg.value = ''
  modalDetallesVisible.value = true
}

function cerrarDetalles() {
  modalDetallesVisible.value = false
  setTimeout(() => { pedidoSeleccionado.value = null; successMsg.value = '' }, 300)
}

function showSuccess(msg: string) {
  successMsg.value = msg
  setTimeout(() => { successMsg.value = '' }, 3000)
}

async function guardarEstado() {
  if (!pedidoSeleccionado.value) return
  saving.value = true
  successMsg.value = ''
  try {
    const res = await pedidosApi.updateEstado(pedidoSeleccionado.value.id, formEstado.value.estado_pedido)
    // Actualizar cache local
    const pIdx = pedidos.value.findIndex(p => p.id === res.id)
    if (pIdx !== -1) pedidos.value[pIdx] = res
    pedidoSeleccionado.value = res

    showSuccess('Estado actualizado correctamente.')
  } catch (error: any) {
    alert(error.message || 'Error al actualizar estado')
    // Reset local to initial if fail
    formEstado.value.estado_pedido = pedidoSeleccionado.value.estado_pedido
  } finally {
    saving.value = false
  }
}

async function guardarNotas() {
  if (!pedidoSeleccionado.value) return
  savingNotas.value = true
  successMsg.value = ''
  try {
    const res = await pedidosApi.updateNotas(pedidoSeleccionado.value.id, formNotas.value.notas)
    // Actualizar cache local
    const pIdx = pedidos.value.findIndex(p => p.id === res.id)
    if (pIdx !== -1) pedidos.value[pIdx] = res
    pedidoSeleccionado.value = res

    showSuccess('Notas actualizadas correctamente.')
  } catch (error: any) {
    alert(error.message || 'Error al guardar notas')
  } finally {
    savingNotas.value = false
  }
}
</script>
