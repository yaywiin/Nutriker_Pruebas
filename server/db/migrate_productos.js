import pool from './pool.js'

const SQL = `
  CREATE TABLE IF NOT EXISTS productos (
    id                SERIAL PRIMARY KEY,
    nombre            VARCHAR(200)    NOT NULL,
    precio            NUMERIC(10,2)   NOT NULL DEFAULT 0,
    descuento         NUMERIC(5,2)    NOT NULL DEFAULT 0,
    stock             INTEGER         NOT NULL DEFAULT 0,
    descripcion       TEXT            NOT NULL DEFAULT '',
    descripcion_detallada TEXT        NOT NULL DEFAULT '',
    imagen_principal  TEXT            DEFAULT NULL,
    galeria           JSONB           NOT NULL DEFAULT '[]',
    created_at        TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    deleted_at        TIMESTAMPTZ     DEFAULT NULL
  );
`

async function migrate() {
  const client = await pool.connect()
  try {
    console.log('🚀 Ejecutando migración de productos...')
    await client.query(SQL)
    console.log('✅ Tabla "productos" creada/verificada correctamente.')
  } catch (err) {
    console.error('❌ Error en la migración:', err.message)
    process.exit(1)
  } finally {
    client.release()
    await pool.end()
  }
}

migrate()
