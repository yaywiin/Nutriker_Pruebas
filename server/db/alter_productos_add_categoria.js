import pool from './pool.js'

const SQL = `
  ALTER TABLE productos 
  ADD COLUMN IF NOT EXISTS categoria_id INTEGER REFERENCES categorias(id) ON DELETE SET NULL;
`

async function migrate() {
  const client = await pool.connect()
  try {
    console.log('🚀 Alterando tabla productos (añadiendo categoria_id)...')
    await client.query(SQL)
    console.log('✅ Columna "categoria_id" añadida correctamente a la tabla "productos".')
  } catch (err) {
    console.error('❌ Error en la alteración:', err.message)
    process.exit(1)
  } finally {
    client.release()
    await pool.end()
  }
}

migrate()
