import pool from '../db/pool.js'
import { generarIdUnico } from '../utils/generarId.js'

export const getPedidos = async (req, res) => {
  try {
    const query = `
      SELECT * FROM pedidos 
      WHERE deleted_at IS NULL 
      ORDER BY created_at DESC
    `
    const { rows } = await pool.query(query)
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pedidos', detalle: error.message })
  }
}

export const getPedidoById = async (req, res) => {
  try {
    const { identifier } = req.params
    const query = `
      SELECT * FROM pedidos 
      WHERE deleted_at IS NULL 
      AND id = $1
    `
    const { rows } = await pool.query(query, [identifier])
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado' })
    }
    
    res.json(rows[0])
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el pedido', detalle: error.message })
  }
}

export const createPedido = async (req, res) => {
  try {
    const { 
      cliente_nombre, cliente_email, cliente_telefono, total, 
      direccion_entrega, ciudad, estado, codigo_postal, 
      notas, metodo_pago, estado_pedido 
    } = req.body

    const newId = await generarIdUnico('pedidos')
    const currentEstado = estado_pedido || 'En proceso'

    const query = `
      INSERT INTO pedidos (
        id, cliente_nombre, cliente_email, cliente_telefono, 
        total, direccion_entrega, ciudad, estado, codigo_postal, 
        notas, estado_pedido, metodo_pago
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `
    const values = [
      newId, cliente_nombre, cliente_email, cliente_telefono,
      total, direccion_entrega, ciudad, estado, codigo_postal,
      notas, currentEstado, metodo_pago
    ]

    const { rows } = await pool.query(query, values)
    res.status(201).json(rows[0])
  } catch (error) {
    res.status(500).json({ error: 'Error al crear pedido', detalle: error.message })
  }
}

export const updateEstadoPedido = async (req, res) => {
  try {
    const { id } = req.params
    const { estado_pedido } = req.body

    // Validar enumerador
    const estadosValidos = ['En proceso', 'pendiente', 'completado', 'cancelado', 'fallido', 'rembolsado']
    if (!estadosValidos.includes(estado_pedido)) {
      return res.status(400).json({ error: 'Estado de pedido no es válido.' })
    }

    const query = `
      UPDATE pedidos 
      SET estado_pedido = $1, updated_at = NOW() 
      WHERE id = $2 AND deleted_at IS NULL 
      RETURNING *
    `
    const { rows } = await pool.query(query, [estado_pedido, id])
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado' })
    }

    res.json(rows[0])
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar estado del pedido', detalle: error.message })
  }
}

export const updateNotasPedido = async (req, res) => {
  try {
    const { id } = req.params
    const { notas } = req.body

    const query = `
      UPDATE pedidos 
      SET notas = $1, updated_at = NOW() 
      WHERE id = $2 AND deleted_at IS NULL 
      RETURNING *
    `
    const { rows } = await pool.query(query, [notas, id])
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado' })
    }

    res.json(rows[0])
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar notas del pedido', detalle: error.message })
  }
}

export const deletePedido = async (req, res) => {
  try {
    const { id } = req.params
    // Soft delete
    const query = `
      UPDATE pedidos 
      SET deleted_at = NOW() 
      WHERE id = $1 AND deleted_at IS NULL 
      RETURNING id
    `
    const { rows } = await pool.query(query, [id])
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado o ya eliminado' })
    }

    res.json({ message: 'Pedido eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar pedido', detalle: error.message })
  }
}
