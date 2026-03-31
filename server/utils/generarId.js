import pool from '../db/pool.js'

/**
 * Genera un ID numérico de 8 dígitos y verifica que no exista en la tabla dada.
 * Retorna el ID como String (ej. "83921094")
 */
export const generarIdUnico = async (tableName) => {
  let unique = false
  let idString = ''
  
  while (!unique) {
    // Generar 8 dígitos (ej. entre 10000000 y 99999999)
    idString = Math.floor(10000000 + Math.random() * 90000000).toString()
    
    // Validar existencia en la tabla
    const query = `SELECT 1 FROM ${tableName} WHERE id = $1`
    const result = await pool.query(query, [idString])
    
    if (result.rowCount === 0) {
      unique = true
    }
  }
  return idString
}
