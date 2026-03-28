import pool from './pool.js'

const createTablesSQL = `
  CREATE TABLE IF NOT EXISTS usuarios (
    id          SERIAL PRIMARY KEY,
    nombre      VARCHAR(150)  NOT NULL,
    usuario     VARCHAR(100)  NOT NULL UNIQUE,
    correo      VARCHAR(200)  NOT NULL UNIQUE,
    contrasena  TEXT          NOT NULL,
    rol         VARCHAR(20)   NOT NULL DEFAULT 'Asistente' CHECK (rol IN ('Administrador', 'Asistente')),
    fecha_alta  DATE          NOT NULL DEFAULT CURRENT_DATE,
    updated_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    deleted_at  TIMESTAMPTZ   DEFAULT NULL
  );
`

async function migrate() {
  const client = await pool.connect()
  try {
    console.log('🚀 Ejecutando migración...')
    await client.query(createTablesSQL)
    console.log('✅ Tabla "usuarios" creada/verificada correctamente.')
  } catch (err) {
    console.error('❌ Error en la migración:', err.message)
    process.exit(1)
  } finally {
    client.release()
    await pool.end()
  }
}

migrate()
