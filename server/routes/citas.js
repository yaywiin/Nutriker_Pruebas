import express from 'express'
import { verificarToken } from '../middleware/authMiddleware.js'
import {
  getCitas,
  createCita,
  updateCita,
  deleteCita
} from '../controllers/citasController.js'

const router = express.Router()

// Ruta pública para que los clientes agenden citas
router.post('/', createCita)

// Rutas protegidas (Admin)
router.get('/', verificarToken, getCitas)
router.put('/:id', verificarToken, updateCita)
router.delete('/:id', verificarToken, deleteCita)

export default router
