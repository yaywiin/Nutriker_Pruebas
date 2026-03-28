import pool from './pool.js'

const SQL = `
  CREATE TABLE IF NOT EXISTS categorias (
    id          SERIAL PRIMARY KEY,
    nombre      VARCHAR(200) NOT NULL UNIQUE,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    deleted_at  TIMESTAMPTZ  DEFAULT NULL
  );
`

async function migrate() {
  const client = await pool.connect()
  try {
    console.log('🚀 Ejecutando migración de categorías...')
    await client.query(SQL)
    console.log('✅ Tabla "categorias" creada/verificada correctamente.')
  } catch (err) {
    console.error('❌ Error en la migración:', err.message)
    process.exit(1)
  } finally {
    client.release()
    await pool.end()
  }
}

migrate()
