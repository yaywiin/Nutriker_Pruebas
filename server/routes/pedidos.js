import express from 'express'
import { verificarToken } from '../middleware/authMiddleware.js'
import {
  getPedidos,
  getPedidoById,
  createPedido,
  updateEstadoPedido,
  updateNotasPedido,
  deletePedido
} from '../controllers/pedidosController.js'

const router = express.Router()

// Ruta pública para que los clientes puedan crear pedidos
router.post('/', createPedido)

// Rutas protegidas (Admin)
router.get('/', verificarToken, getPedidos)
router.get('/:identifier', verificarToken, getPedidoById)
router.put('/:id/estado', verificarToken, updateEstadoPedido)
router.put('/:id/notas', verificarToken, updateNotasPedido)
router.delete('/:id', verificarToken, deletePedido)

export default router
