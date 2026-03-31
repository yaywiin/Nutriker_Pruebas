import pool from './pool.js'

async function alter() {
  const client = await pool.connect()
  try {
    console.log('Agregando columnas descripcion a la tabla productos...')
    await client.query(`
      ALTER TABLE productos 
      ADD COLUMN IF NOT EXISTS descripcion TEXT NOT NULL DEFAULT '',
      ADD COLUMN IF NOT EXISTS descripcion_detallada TEXT NOT NULL DEFAULT '';
    `)
    console.log('✅ Columnas agregadas correctamente.')
  } catch(e) {
    console.error('Error:', e)
  } finally {
    client.release()
    await pool.end()
  }
}

alter()
