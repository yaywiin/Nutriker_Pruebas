import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

let pool

if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  })

  pool.on('connect', () => {
    console.log('✅ Conectado a la base de datos PostgreSQL (Neon.tech)')
  })

  pool.on('error', (err) => {
    console.error('❌ Error en el pool de conexión:', err.message)
  })
} else {
  console.warn('⚠️  DATABASE_URL no configurada — PostgreSQL deshabilitado.')
  pool = {
    query: async () => ({ rows: [], rowCount: 0 }),
    connect: async () => ({
      query: async () => ({ rows: [], rowCount: 0 }),
      release: () => {},
    }),
    end: async () => {},
    on: () => {},
  }
}

export default pool

