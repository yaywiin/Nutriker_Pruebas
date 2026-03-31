import { Router } from 'express'
import { verificarToken } from '../middleware/authMiddleware.js'
import {
  getCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} from '../controllers/categoriasController.js'

const router = Router()

router.get('/',       getCategorias)
router.get('/:id',    getCategoriaById)

// Rutas protegidas
router.post('/',      verificarToken, createCategoria)
router.put('/:id',    verificarToken, updateCategoria)
router.delete('/:id', verificarToken, deleteCategoria)

export default router
