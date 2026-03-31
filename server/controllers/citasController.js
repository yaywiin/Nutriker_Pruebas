import pool from '../db/pool.js'
import { generarIdUnico } from '../utils/generarId.js'

export const getCitas = async (req, res) => {
  try {
    const query = `
      SELECT * FROM citas 
      WHERE deleted_at IS NULL 
      ORDER BY created_at DESC
    `
    const { rows } = await pool.query(query)
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener citas', detalle: error.message })
  }
}

export const createCita = async (req, res) => {
  try {
    const { 
      cliente_nombre, cliente_telefono, fecha, 
      atencion_previa, peso, estatura 
    } = req.body

    const newId = await generarIdUnico('citas')

    const query = `
      INSERT INTO citas (
        id, cliente_nombre, cliente_telefono, fecha, 
        atencion_previa, peso, estatura
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `
    const values = [
      newId, cliente_nombre, cliente_telefono, fecha,
      atencion_previa || 'no', 
      peso ? parseFloat(peso) : null, 
      estatura ? parseFloat(estatura) : null
    ]

    const { rows } = await pool.query(query, values)
    res.status(201).json(rows[0])
  } catch (error) {
    res.status(500).json({ error: 'Error al solicitar cita', detalle: error.message })
  }
}

export const updateCita = async (req, res) => {
  try {
    const { id } = req.params
    const { 
      cliente_nombre, cliente_telefono, fecha, 
      atencion_previa, peso, estatura 
    } = req.body

    const query = `
      UPDATE citas 
      SET cliente_nombre = $1, 
          cliente_telefono = $2, 
          fecha = $3, 
          atencion_previa = $4, 
          peso = $5, 
          estatura = $6, 
          updated_at = NOW() 
      WHERE id = $7 AND deleted_at IS NULL 
      RETURNING *
    `
    const values = [
      cliente_nombre, cliente_telefono, fecha,
      atencion_previa || 'no', 
      peso ? parseFloat(peso) : null, 
      estatura ? parseFloat(estatura) : null,
      id
    ]

    const { rows } = await pool.query(query, values)
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Cita no encontrada' })
    }

    res.json(rows[0])
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la cita', detalle: error.message })
  }
}

export const deleteCita = async (req, res) => {
  try {
    const { id } = req.params
    // Soft delete
    const query = `
      UPDATE citas 
      SET deleted_at = NOW() 
      WHERE id = $1 AND deleted_at IS NULL 
      RETURNING id
    `
    const { rows } = await pool.query(query, [id])
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Cita no encontrada o ya eliminada' })
    }

    res.json({ message: 'Cita eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar cita', detalle: error.message })
  }
}
