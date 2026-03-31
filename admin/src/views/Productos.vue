<template>
  <AdminLayout>
    <!-- Encabezado -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white/90">Productos</h2>
      <button @click="abrirAgregar"
        class="rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-600 focus:outline-none focus:ring-4 focus:ring-brand-300">
        Agregar Nuevo
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

    <!-- Filtros -->
    <div class="mb-6 flex flex-col sm:flex-row gap-4">
      <div class="flex-1">
        <label class="sr-only">Buscar producto</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input v-model="searchQuery" type="text"
            class="block w-full rounded-lg border border-gray-300 bg-white p-2.5 pl-10 text-sm text-gray-900 focus:border-brand-500 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            placeholder="Buscar por nombre o ID del producto..." />
        </div>
      </div>
      <div>
        <label class="sr-only">Filtrar por Fecha</label>
        <input v-model="filterDate" type="date"
          class="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-brand-500 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white [color-scheme:light] dark:[color-scheme:dark]"
          title="Puedes escribir la fecha o usar el calendario" />
      </div>
    </div>

    <!-- Tabla -->
    <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div v-if="loading" class="flex items-center justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent"></div>
        <span class="ml-3 text-gray-500 dark:text-gray-400">Cargando productos...</span>
      </div>

      <div v-else class="max-w-full overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
              <th class="px-4 py-3 text-left"><p class="font-medium text-gray-500 text-xs dark:text-gray-400 uppercase tracking-wider">ID</p></th>
              <th class="px-4 py-3 text-left"><p class="font-medium text-gray-500 text-xs dark:text-gray-400 uppercase tracking-wider">Nombre</p></th>
              <th class="px-4 py-3 text-left"><p class="font-medium text-gray-500 text-xs dark:text-gray-400 uppercase tracking-wider">Categoría</p></th>
              <th class="px-4 py-3 text-left"><p class="font-medium text-gray-500 text-xs dark:text-gray-400 uppercase tracking-wider">Desc. (%)</p></th>
              <th class="px-4 py-3 text-left"><p class="font-medium text-gray-500 text-xs dark:text-gray-400 uppercase tracking-wider">Precio</p></th>
              <th class="px-4 py-3 text-left"><p class="font-medium text-gray-500 text-xs dark:text-gray-400 uppercase tracking-wider">Stock</p></th>
              <th class="px-4 py-3 text-center"><p class="font-medium text-gray-500 text-xs dark:text-gray-400 uppercase tracking-wider">Acciones</p></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="p in filteredProductos" :key="p.id" class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
              <td class="px-4 py-3 text-gray-500 text-sm dark:text-gray-400">#{{ p.id }}</td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <div v-if="p.imagen_principal" class="h-10 w-10 rounded-lg overflow-hidden shrink-0 border border-gray-200 dark:border-gray-700">
                    <img :src="getImageUrl(p.imagen_principal)" :alt="p.nombre" class="h-full w-full object-cover" />
                  </div>
                  <div v-else class="h-10 w-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center shrink-0">
                    <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </div>
                  <span class="font-medium text-gray-800 text-sm dark:text-white/90">{{ p.nombre }}</span>
                </div>
              </td>
              <td class="px-4 py-3 text-gray-600 text-sm dark:text-gray-400">
                <span v-if="p.categoriaNombre" class="inline-block px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                  {{ p.categoriaNombre }}
                </span>
                <span v-else class="text-gray-400 italic">Sin categoría</span>
              </td>
              <td class="px-4 py-3">
                <span v-if="p.descuento > 0" class="rounded-full bg-success-50 px-2 py-0.5 text-xs font-medium text-success-700 dark:bg-success-500/15 dark:text-success-500">
                  {{ p.descuento }}%
                </span>
                <span v-else class="text-gray-400 text-sm">—</span>
              </td>
              <td class="px-4 py-3 text-sm font-medium">
                <template v-if="p.descuento > 0">
                  <span class="text-gray-400 line-through mr-1 dark:text-gray-500">${{ Number(p.precio).toFixed(2) }}</span>
                  <span class="text-success-600 dark:text-success-400 font-bold">${{ (Number(p.precio) * (1 - Number(p.descuento) / 100)).toFixed(2) }}</span>
                </template>
                <template v-else>
                  <span class="text-gray-700 dark:text-white/80">${{ Number(p.precio).toFixed(2) }}</span>
                </template>
              </td>
              <td class="px-4 py-3">
                <span :class="['text-sm font-medium', p.stock > 0 ? 'text-gray-700 dark:text-white/80' : 'text-error-500']">
                  {{ p.stock }}
                </span>
              </td>
              <td class="px-4 py-3">
                <div class="flex justify-center gap-3">
                  <button @click="abrirDetalles(p)" class="text-blue-500 hover:text-blue-700" title="Mostrar Detalles">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  </button>
                  <button @click="abrirEditar(p)" class="text-yellow-500 hover:text-yellow-700" title="Editar">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                  </button>
                  <button @click="handleEliminar(p.id)" class="text-red-500 hover:text-red-700" title="Eliminar">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="!loading && filteredProductos.length === 0">
              <td colspan="7" class="px-4 py-10 text-center text-gray-500 dark:text-gray-400">No hay productos que coincidan con la búsqueda.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════
         MODAL FORMULARIO (Layout 80/20)
    ═══════════════════════════════════════════════════════ -->
    <Modal v-if="modalFormVisible" :fullScreenBackdrop="true" @close="cerrarFormulario">
      <template #body>
        <div class="relative w-full max-w-5xl rounded-xl bg-white shadow-theme-lg dark:bg-gray-800 m-4 mx-auto my-10 max-h-[90vh] overflow-y-auto">
          <div class="border-b border-gray-200 dark:border-gray-700 px-6 py-4 sticky top-0 bg-white dark:bg-gray-800 z-10">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              {{ isEditing ? 'Editar Producto' : 'Agregar Nuevo Producto' }}
            </h3>
          </div>

          <div v-if="formError" class="mx-6 mt-4 rounded-lg bg-error-50 px-3 py-2 text-sm text-error-700 dark:bg-error-500/15 dark:text-error-400">
            {{ formError }}
          </div>

          <form @submit.prevent="guardarProducto">
            <div class="grid grid-cols-1 lg:grid-cols-5 gap-0">

              <!-- IZQUIERDA (80%) ── Nombre, Categoría e Imágenes -->
              <div class="lg:col-span-4 border-r border-gray-200 dark:border-gray-700 p-6 space-y-5">
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Nombre -->
                  <div>
                    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Nombre del Producto</label>
                    <input v-model="form.nombre" type="text" required
                      class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 outline-none focus:border-brand-500 dark:border-gray-700 dark:text-white/90"
                      placeholder="Ej. Tratamiento facial" />
                  </div>
                  <!-- Categoría -->
                  <div>
                    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Categoría</label>
                    <select v-model="form.categoria_id" class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90">
                      <option :value="null">-- Ninguna categoría --</option>
                      <option v-for="cat in listaCategorias" :key="cat.id" :value="cat.id">
                        {{ cat.nombre }}
                      </option>
                    </select>
                  </div>
                </div>

                <!-- Descripciones -->
                <div class="space-y-4">
                  <div>
                    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Descripción Corta</label>
                    <textarea v-model="form.descripcion" required rows="2"
                      class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 outline-none focus:border-brand-500 dark:border-gray-700 dark:text-white/90"
                      placeholder="Breve resumen del producto..."></textarea>
                  </div>
                  <div>
                    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Descripción Detallada</label>
                    <textarea v-model="form.descripcion_detallada" required rows="4"
                      class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 outline-none focus:border-brand-500 dark:border-gray-700 dark:text-white/90"
                      placeholder="Ingredientes, beneficios, modo de uso..."></textarea>
                  </div>
                </div>

                <!-- Imagen Principal -->
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Imagen Principal <span class="text-xs font-normal text-gray-400 ml-1">(Máx. 5 MB)</span>
                  </label>

                  <div v-if="isEditing && form.imagen_principal && !previewPrincipal" class="mb-2 flex items-center gap-3 rounded-lg border border-gray-200 p-2 dark:border-gray-700">
                    <img :src="getImageUrl(form.imagen_principal)" alt="Actual" class="h-16 w-16 rounded-md object-cover border border-gray-200 dark:border-gray-700" />
                    <span class="text-xs text-gray-500 dark:text-gray-400">Imagen actual (sube una nueva para reemplazarla)</span>
                  </div>

                  <div v-if="previewPrincipal" class="mb-2">
                    <img :src="previewPrincipal" alt="Preview" class="h-24 w-24 rounded-lg border border-gray-200 dark:border-gray-700 object-cover" />
                  </div>

                  <label class="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-500 hover:border-brand-400 hover:text-brand-500 dark:border-gray-600 dark:hover:border-brand-500">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                    <span>{{ previewPrincipal ? 'Cambiar imagen' : 'Seleccionar imagen principal' }}</span>
                    <input type="file" accept="image/*" class="hidden" @change="onPrincipalChange" />
                  </label>
                </div>

                <!-- Galería -->
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Galería <span class="text-xs font-normal text-gray-400 ml-1">(máximo 5 fotos)</span>
                  </label>

                  <div v-if="isEditing && form.galeria?.length && !previewsGaleria.length" class="mb-2 flex flex-wrap gap-2">
                    <div v-for="(img, i) in form.galeria" :key="i" class="relative h-16 w-16">
                      <img :src="getImageUrl(img)" :alt="`Galería ${i+1}`" class="h-full w-full rounded-md object-cover border border-gray-200 dark:border-gray-700" />
                    </div>
                    <span class="flex items-center text-xs text-gray-400 dark:text-gray-500 w-full mt-1">Sube nuevas fotos para reemplazar toda la galería</span>
                  </div>

                  <div v-if="previewsGaleria.length" class="mb-2 flex flex-wrap gap-2">
                    <div v-for="(prev, i) in previewsGaleria" :key="i" class="relative h-16 w-16">
                      <img :src="prev" :alt="`Galería nueva ${i+1}`" class="h-16 w-16 rounded-md object-cover border border-gray-200 dark:border-gray-700" />
                      <button type="button" @click="removeGaleriaFile(i)" class="absolute -top-1 -right-1 rounded-full bg-red-500 text-white h-5 w-5 flex items-center justify-center text-xs leading-none shadow hover:bg-red-600 transition-colors">✕</button>
                    </div>
                    <label v-if="previewsGaleria.length < 5" class="flex h-16 w-16 cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 text-gray-400 hover:border-brand-400 hover:text-brand-500 dark:border-gray-600">
                      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                      <input type="file" accept="image/*" class="hidden" multiple @change="onGaleriaChange" />
                    </label>
                  </div>

                  <label v-if="!previewsGaleria.length" class="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-500 hover:border-brand-400 hover:text-brand-500 dark:border-gray-600 dark:hover:border-brand-500">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                    <span>Seleccionar fotos de galería</span>
                    <input type="file" accept="image/*" multiple class="hidden" @change="onGaleriaChange" />
                  </label>
                </div>
              </div>

              <!-- DERECHA (20%) ── Precio, Descuento, Stock -->
              <div class="lg:col-span-1 p-6 space-y-5">
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Precio ($)</label>
                  <input v-model="form.precio" type="number" min="0" step="0.01" required
                    class="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2.5 text-gray-800 outline-none focus:border-brand-500 dark:border-gray-700 dark:text-white/90"
                    placeholder="0.00" />
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Desc. (%)</label>
                  <input v-model="form.descuento" type="number" min="0" max="100" step="0.01"
                    class="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2.5 text-gray-800 outline-none focus:border-brand-500 dark:border-gray-700 dark:text-white/90"
                    placeholder="0" />
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Stock</label>
                  <input v-model="form.stock" type="number" min="0" step="1"
                    class="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2.5 text-gray-800 outline-none focus:border-brand-500 dark:border-gray-700 dark:text-white/90"
                    placeholder="0" />
                </div>

                <div v-if="form.precio && form.descuento > 0" class="rounded-lg bg-success-50 px-3 py-2 dark:bg-success-500/10">
                  <p class="text-xs text-success-600 dark:text-success-400 font-medium">Precio final:</p>
                  <p class="text-lg font-bold text-success-700 dark:text-success-400">
                    ${{ (form.precio * (1 - form.descuento / 100)).toFixed(2) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Pie del modal -->
            <div class="flex justify-end gap-3 sticky bottom-0 bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-800 px-6 py-4 rounded-b-xl z-10">
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
        <div class="relative w-full max-w-2xl rounded-xl bg-white shadow-theme-lg dark:bg-gray-800 m-4 mx-auto my-10 max-h-[90vh] overflow-y-auto">
          <div class="border-b border-gray-200 dark:border-gray-700 px-6 py-4 sticky top-0 bg-white dark:bg-gray-800 z-10">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">Detalles del Producto</h3>
          </div>

          <div class="p-6 space-y-5" v-if="productoSeleccionado">
            <!-- Imagen principal -->
            <div v-if="productoSeleccionado.imagen_principal" class="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 max-h-80 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
              <img :src="getImageUrl(productoSeleccionado.imagen_principal)" :alt="productoSeleccionado.nombre" class="w-full h-full object-contain" />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="col-span-2">
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Nombre</p>
                <p class="font-semibold text-xl text-gray-800 dark:text-white/90">{{ productoSeleccionado.nombre }}</p>
              </div>
              <div class="col-span-2">
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Categoría</p>
                <div v-if="productoSeleccionado.categoriaNombre" class="inline-block mt-1">
                  <span class="px-2.5 py-1 rounded bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-white/90">
                    {{ productoSeleccionado.categoriaNombre }}
                  </span>
                </div>
                <p v-else class="text-gray-400 font-medium italic">Sin categoría</p>
              </div>
              
              <div class="mt-2">
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Precio</p>
                <p class="font-bold text-lg text-gray-800 dark:text-white/90">${{ Number(productoSeleccionado.precio).toFixed(2) }}</p>
              </div>
              <div class="mt-2">
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Descuento</p>
                <p class="font-medium text-gray-800 dark:text-white/90">
                  <span v-if="productoSeleccionado.descuento > 0" class="rounded-full bg-success-50 px-2.5 py-1 text-sm font-medium text-success-700">
                    {{ productoSeleccionado.descuento }}%
                  </span>
                  <span v-else class="text-gray-400">Ninguno</span>
                </p>
              </div>
              <div v-if="productoSeleccionado.descuento > 0">
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Precio Final</p>
                <p class="font-bold text-success-600 text-lg">${{ (productoSeleccionado.precio * (1 - productoSeleccionado.descuento / 100)).toFixed(2) }}</p>
              </div>
              <div :class="{ 'mt-2': productoSeleccionado.descuento <= 0 }">
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Stock Disponible</p>
                <p :class="['font-semibold text-lg', productoSeleccionado.stock > 0 ? 'text-gray-800 dark:text-white/90' : 'text-error-500']">
                  {{ productoSeleccionado.stock }} unidades
                </p>
              </div>
              <div class="col-span-2 mt-2">
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Fecha de Alta</p>
                <p class="font-medium text-gray-600 dark:text-gray-400">{{ productoSeleccionado.fechaAlta }}</p>
              </div>

              <div class="col-span-2 mt-2">
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Descripción</p>
                <p class="text-sm text-gray-800 dark:text-white/90">{{ productoSeleccionado.descripcion }}</p>
              </div>
              <div class="col-span-2 mt-2">
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Descripción Detallada</p>
                <p class="text-sm text-gray-800 dark:text-white/90 whitespace-pre-wrap">{{ productoSeleccionado.descripcion_detallada }}</p>
              </div>
            </div>

            <!-- Galería -->
            <div v-if="productoSeleccionado.galeria?.length" class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Galería ({{ productoSeleccionado.galeria.length }})</p>
              <div class="flex gap-3 flex-wrap">
                <div v-for="(img, i) in productoSeleccionado.galeria" :key="i" class="h-24 w-24 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm transition hover:scale-105">
                  <img :src="getImageUrl(img)" :alt="`Foto ${i+1}`" class="h-full w-full object-cover cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-end px-6 py-4 border-t border-gray-200 dark:border-gray-700 sticky bottom-0 bg-white dark:bg-gray-800 rounded-b-xl z-10">
            <button @click="cerrarDetalles" class="rounded-lg bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition">
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
import { productosApi, categoriasApi, SERVER_BASE } from '@/api/index.js'

const serverBase = SERVER_BASE
const getImageUrl = (url: string) => {
  if (!url) return ''
  return url.startsWith('http') ? url : serverBase + url
}

// ── Estado ────────────────────────────────────────────────────────────────────
const productos       = ref<any[]>([])
const listaCategorias = ref<any[]>([])
const loading         = ref(false)
const saving          = ref(false)
const errorGlobal     = ref('')
const formError       = ref('')

// ── Filtros ───────────────────────────────────────────────────────────────────
const searchQuery     = ref('')
const filterDate      = ref('')

// ── Modales ───────────────────────────────────────────────────────────────────
const modalFormVisible     = ref(false)
const modalDetallesVisible = ref(false)
const isEditing            = ref(false)
const productoSeleccionado = ref<any>(null)

// ── Formulario ────────────────────────────────────────────────────────────────
const initForm = () => ({
  id: null as number | null,
  nombre: '',
  descripcion: '',
  descripcion_detallada: '',
  precio: 0,
  descuento: 0,
  stock: 0,
  categoria_id: null as number | null,
  imagen_principal: null as string | null,
  galeria: [] as string[],
})
const form = reactive({ ...initForm() })

const archivoPrincipal   = ref<File | null>(null)
const archivosGaleria    = ref<File[]>([])
const previewPrincipal   = ref('')
const previewsGaleria    = ref<string[]>([])

// ── Cargar Datos ──────────────────────────────────────────────────────────────
async function cargarDatos() {
  loading.value = true
  errorGlobal.value = ''
  try {
    const [prodData, catData] = await Promise.all([
      productosApi.getAll(),
      categoriasApi.getAll()
    ])
    productos.value = prodData
    listaCategorias.value = catData
  } catch (e: any) {
    errorGlobal.value = e.message || 'Error al conectar al servidor'
  } finally {
    loading.value = false
  }
}
onMounted(cargarDatos)

// ── Computed (Filtros) ────────────────────────────────────────────────────────
const filteredProductos = computed(() => {
  let result = productos.value

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(p => 
      String(p.id).toLowerCase().includes(q) || 
      p.nombre.toLowerCase().includes(q)
    )
  }

  if (filterDate.value) {
    const dFilter = filterDate.value
    result = result.filter(p => {
      if (!p.created_at) return false
      const pDate = new Date(p.created_at).toISOString().split('T')[0]
      return pDate === dFilter
    })
  }

  return result
})

// ── Manejo de imágenes ────────────────────────────────────────────────────────
function onPrincipalChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  archivoPrincipal.value = file
  previewPrincipal.value = URL.createObjectURL(file)
}
function onGaleriaChange(e: Event) {
  const files = Array.from((e.target as HTMLInputElement).files || [])
  const remaining = 5 - archivosGaleria.value.length
  const toAdd = files.slice(0, remaining)
  archivosGaleria.value.push(...toAdd)
  previewsGaleria.value.push(...toAdd.map(f => URL.createObjectURL(f)))
  ;(e.target as HTMLInputElement).value = ''
}
function removeGaleriaFile(index: number) {
  archivosGaleria.value.splice(index, 1)
  URL.revokeObjectURL(previewsGaleria.value[index])
  previewsGaleria.value.splice(index, 1)
}
function resetFiles() {
  archivoPrincipal.value = null
  archivosGaleria.value = []
  if (previewPrincipal.value) URL.revokeObjectURL(previewPrincipal.value)
  previewsGaleria.value.forEach(u => URL.revokeObjectURL(u))
  previewPrincipal.value = ''
  previewsGaleria.value = []
}

// ── Formulario ────────────────────────────────────────────────────────────────
function abrirAgregar() {
  isEditing.value = false
  Object.assign(form, initForm())
  resetFiles()
  formError.value = ''
  modalFormVisible.value = true
}

function abrirEditar(p: any) {
  isEditing.value = true
  Object.assign(form, { ...p })
  resetFiles()
  formError.value = ''
  modalFormVisible.value = true
}

function cerrarFormulario() {
  modalFormVisible.value = false
}

async function guardarProducto() {
  saving.value = true
  formError.value = ''
  try {
    const fd = new FormData()
    fd.append('nombre',    form.nombre)
    fd.append('descripcion', form.descripcion)
    fd.append('descripcion_detallada', form.descripcion_detallada)
    fd.append('precio',    String(form.precio))
    fd.append('descuento', String(form.descuento || 0))
    fd.append('stock',     String(form.stock || 0))
    fd.append('categoria_id', form.categoria_id ? String(form.categoria_id) : '')

    if (archivoPrincipal.value) fd.append('imagen_principal', archivoPrincipal.value)
    archivosGaleria.value.forEach(f => fd.append('galeria', f))

    let result: any
    if (isEditing.value && form.id) {
      result = await productosApi.update(form.id, fd)
      const cachedCat = listaCategorias.value.find(c => c.id === result.categoria_id)
      result.categoriaNombre = cachedCat ? cachedCat.nombre : null
      const idx = productos.value.findIndex(p => p.id === form.id)
      if (idx !== -1) productos.value[idx] = result
    } else {
      result = await productosApi.create(fd)
      const cachedCat = listaCategorias.value.find(c => c.id === result.categoria_id)
      result.categoriaNombre = cachedCat ? cachedCat.nombre : null
      productos.value.push(result)
    }
    cerrarFormulario()
  } catch (e: any) {
    formError.value = e.message || 'Error al guardar el producto'
  } finally {
    saving.value = false
  }
}

// ── Detalles ──────────────────────────────────────────────────────────────────
function abrirDetalles(p: any) {
  productoSeleccionado.value = { ...p }
  modalDetallesVisible.value = true
}
function cerrarDetalles() {
  modalDetallesVisible.value = false
  setTimeout(() => { productoSeleccionado.value = null }, 300)
}

// ── Eliminar ──────────────────────────────────────────────────────────────────
async function handleEliminar(id: number) {
  if (!confirm('¿Deseas eliminar este producto?')) return
  try {
    await productosApi.delete(id)
    productos.value = productos.value.filter(p => p.id !== id)
  } catch (e: any) {
    errorGlobal.value = e.message || 'Error al eliminar el producto'
  }
}
</script>
