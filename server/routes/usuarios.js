import { Router } from 'express'
import {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from '../controllers/usuariosController.js'
import { verificarToken } from '../middleware/authMiddleware.js'

const router = Router()

// Todas las rutas de usuarios requieren estar autenticado
router.use(verificarToken)

router.get('/',      getUsuarios)
router.get('/:id',   getUsuarioById)
router.post('/',     createUsuario)
router.put('/:id',   updateUsuario)
router.delete('/:id', deleteUsuario)

export default router
