import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import usuariosRouter from './routes/usuarios.js'
import productosRouter from './routes/productos.js'
import categoriasRouter from './routes/categorias.js'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:4173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(express.json())

// ── Archivos estáticos (imágenes subidas) ───────────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// ── Rutas API ───────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api/usuarios',   usuariosRouter)
app.use('/api/productos',  productosRouter)
app.use('/api/categorias', categoriasRouter)

// ── 404 catch ───────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Ruta ${req.method} ${req.url} no encontrada` })
})

// ── Arrancar servidor ────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Servidor Bioclinik escuchando en http://localhost:${PORT}`)
})
