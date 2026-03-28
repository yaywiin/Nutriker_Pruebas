const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
export const SERVER_BASE = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000'

async function request(method, path, body = null) {
  const options = { method, headers: { 'Content-Type': 'application/json' } }
  if (body) options.body = JSON.stringify(body)
  const res = await fetch(`${API_BASE}${path}`, options)
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Error en la solicitud')
  return data
}

// Petición multipart/form-data (para subida de archivos)
async function requestForm(method, path, formData) {
  const res = await fetch(`${API_BASE}${path}`, { method, body: formData })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Error en la solicitud')
  return data
}

// --- Usuarios ---
export const usuariosApi = {
  getAll:  ()         => request('GET',    '/usuarios'),
  getById: (id)       => request('GET',    `/usuarios/${id}`),
  create:  (body)     => request('POST',   '/usuarios', body),
  update:  (id, body) => request('PUT',    `/usuarios/${id}`, body),
  delete:  (id)       => request('DELETE', `/usuarios/${id}`),
}

// --- Productos ---
export const productosApi = {
  getAll:  ()              => request('GET',    '/productos'),
  getById: (id)            => request('GET',    `/productos/${id}`),
  create:  (formData)      => requestForm('POST',   '/productos', formData),
  update:  (id, formData)  => requestForm('PUT',    `/productos/${id}`, formData),
  delete:  (id)            => request('DELETE', `/productos/${id}`),
}

// --- Categorias ---
export const categoriasApi = {
  getAll:  ()         => request('GET',    '/categorias'),
  getById: (id)       => request('GET',    `/categorias/${id}`),
  create:  (body)     => request('POST',   '/categorias', body),
  update:  (id, body) => request('PUT',    `/categorias/${id}`, body),
  delete:  (id)       => request('DELETE', `/categorias/${id}`),
}
