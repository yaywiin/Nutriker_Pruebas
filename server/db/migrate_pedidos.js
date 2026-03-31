import pool from './pool.js'

const createPedidosSQL = `
  CREATE TABLE IF NOT EXISTS pedidos (
    id SERIAL PRIMARY KEY,
    numero_pedido VARCHAR(8) UNIQUE NOT NULL,
    cliente_nombre VARCHAR(150) NOT NULL,
    cliente_email VARCHAR(200),
    cliente_telefono VARCHAR(20),
    total DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    direccion_entrega TEXT NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    estado VARCHAR(100) NOT NULL,
    codigo_postal VARCHAR(20) NOT NULL,
    notas TEXT,
    estado_pedido VARCHAR(50) NOT NULL DEFAULT 'En proceso' CHECK (estado_pedido IN ('En proceso', 'pendiente', 'completado', 'cancelado', 'fallido', 'rembolsado')),
    metodo_pago VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ DEFAULT NULL
  );
`

async function migrate() {
  const client = await pool.connect()
  try {
    console.log('🚀 Ejecutando migración de pedidos...')
    await client.query(createPedidosSQL)
    console.log('✅ Tabla "pedidos" creada/verificada correctamente.')
  } catch (err) {
    console.error('❌ Error en la migración de pedidos:', err.message)
    process.exit(1)
  } finally {
    client.release()
    await pool.end()
  }
}

migrate()
