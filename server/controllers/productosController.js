import pool from '../db/pool.js'
import { v2 as cloudinary } from 'cloudinary'
import { getPublicIdFromUrl } from '../middleware/upload.js'

// Helper: elimina imagen de Cloudinary
async function deleteCloudinaryFile(url) {
  const publicId = getPublicIdFromUrl(url)
  if (publicId) {
    try {
      await cloudinary.uploader.destroy(publicId)
    } catch (error) {
      console.error('Error al eliminar imagen de Cloudinary:', error)
    }
  }
}

// ─── GET /api/productos ────────────────────────────────────────────────────
export async function getProductos(req, res) {
  try {
    const result = await pool.query(
      `SELECT p.id, p.nombre, p.precio, p.descuento, p.stock,
              p.imagen_principal, p.galeria, p.categoria_id,
              c.nombre AS "categoriaNombre",
              TO_CHAR(p.created_at, 'YYYY-MM-DD') AS "fechaAlta",
              p.updated_at AS "updatedAt"
       FROM productos p
       LEFT JOIN categorias c ON p.categoria_id = c.id
       WHERE p.deleted_at IS NULL
       ORDER BY p.id ASC`
    )
    res.json(result.rows)
  } catch (err) {
    console.error('getProductos:', err.message)
    res.status(500).json({ error: 'Error al obtener productos' })
  }
}

// ─── GET /api/productos/:id ────────────────────────────────────────────────
export async function getProductoById(req, res) {
  const { id } = req.params
  try {
    const result = await pool.query(
      `SELECT p.id, p.nombre, p.precio, p.descuento, p.stock,
              p.imagen_principal, p.galeria, p.categoria_id,
              c.nombre AS "categoriaNombre",
              TO_CHAR(p.created_at, 'YYYY-MM-DD') AS "fechaAlta",
              p.updated_at AS "updatedAt"
       FROM productos p
       LEFT JOIN categorias c ON p.categoria_id = c.id
       WHERE p.id = $1 AND p.deleted_at IS NULL`,
      [id]
    )
    if (!result.rows.length)
      return res.status(404).json({ error: 'Producto no encontrado' })
    res.json(result.rows[0])
  } catch (err) {
    console.error('getProductoById:', err.message)
    res.status(500).json({ error: 'Error al obtener el producto' })
  }
}

// ─── POST /api/productos ───────────────────────────────────────────────────
export async function createProducto(req, res) {
  const { nombre, precio, descuento = 0, stock = 0, categoria_id } = req.body

  if (!nombre || precio === undefined) {
    return res.status(400).json({ error: 'Nombre y precio son obligatorios' })
  }

  // Archivos subidos a Cloudinary (la URL viene en req.file(s)[].path)
  const files = req.files || {}
  const principal = files.imagen_principal?.[0]?.path ?? null
  const galeriaFiles = (files.galeria || []).slice(0, 5).map((f) => f.path)

  let catId = categoria_id && categoria_id !== 'null' && categoria_id !== '' 
              ? parseInt(categoria_id) : null

  try {
    const result = await pool.query(
      `INSERT INTO productos (nombre, precio, descuento, stock, imagen_principal, galeria, categoria_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, nombre, precio, descuento, stock,
                 imagen_principal, galeria, categoria_id,
                 TO_CHAR(created_at, 'YYYY-MM-DD') AS "fechaAlta"`,
      [nombre, precio, descuento, stock, principal, JSON.stringify(galeriaFiles), catId]
    )

    // Opcionalmente podemos tratar de devolver el nombre de la categoría inmediatamente
    // o el frontend simplemente usará el categoria_id para machear. Retornaremos la fila.
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error('createProducto:', err.message)
    res.status(500).json({ error: 'Error al crear el producto' })
  }
}

// ─── PUT /api/productos/:id ────────────────────────────────────────────────
export async function updateProducto(req, res) {
  const { id } = req.params
  const { nombre, precio, descuento = 0, stock = 0, categoria_id } = req.body

  if (!nombre || precio === undefined) {
    return res.status(400).json({ error: 'Nombre y precio son obligatorios' })
  }

  try {
    const current = await pool.query(
      'SELECT imagen_principal, galeria FROM productos WHERE id=$1 AND deleted_at IS NULL',
      [id]
    )
    if (!current.rows.length)
      return res.status(404).json({ error: 'Producto no encontrado' })

    const files = req.files || {}
    let newPrincipal = current.rows[0].imagen_principal
    let newGaleria = current.rows[0].galeria || []

    if (files.imagen_principal?.[0]) {
      if (newPrincipal) await deleteCloudinaryFile(newPrincipal)
      newPrincipal = files.imagen_principal[0].path
    }

    if (files.galeria?.length) {
      for (const p of newGaleria) {
        if (p) await deleteCloudinaryFile(p)
      }
      newGaleria = files.galeria.slice(0, 5).map((f) => f.path)
    }

    let catId = categoria_id && categoria_id !== 'null' && categoria_id !== '' 
              ? parseInt(categoria_id) : null

    const result = await pool.query(
      `UPDATE productos
       SET nombre=$1, precio=$2, descuento=$3, stock=$4,
           imagen_principal=$5, galeria=$6, categoria_id=$7, updated_at=NOW()
       WHERE id=$8 AND deleted_at IS NULL
       RETURNING id, nombre, precio, descuento, stock,
                 imagen_principal, galeria, categoria_id,
                 TO_CHAR(created_at, 'YYYY-MM-DD') AS "fechaAlta"`,
      [nombre, precio, descuento, stock, newPrincipal, JSON.stringify(newGaleria), catId, id]
    )
    res.json(result.rows[0])
  } catch (err) {
    console.error('updateProducto:', err.message)
    res.status(500).json({ error: 'Error al actualizar el producto' })
  }
}

// ─── DELETE /api/productos/:id (soft delete) ───────────────────────────────
export async function deleteProducto(req, res) {
  const { id } = req.params
  try {
    const result = await pool.query(
      `UPDATE productos SET deleted_at=NOW()
       WHERE id=$1 AND deleted_at IS NULL RETURNING id`,
      [id]
    )
    if (!result.rows.length)
      return res.status(404).json({ error: 'Producto no encontrado' })
    res.json({ message: 'Producto eliminado', id: result.rows[0].id })
  } catch (err) {
    console.error('deleteProducto:', err.message)
    res.status(500).json({ error: 'Error al eliminar el producto' })
  }
}
