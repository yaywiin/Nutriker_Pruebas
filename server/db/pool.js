import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})

pool.on('connect', () => {
  console.log('✅ Conectado a la base de datos PostgreSQL (Neon.tech)')
})

pool.on('error', (err) => {
  console.error('❌ Error en el pool de conexión:', err.message)
})

export default pool
