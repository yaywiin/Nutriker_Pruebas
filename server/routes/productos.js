import { Router } from 'express'
import { upload } from '../middleware/upload.js'
import { verificarToken } from '../middleware/authMiddleware.js'
import {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
} from '../controllers/productosController.js'

const router = Router()

// Multer: acepta 1 imagen principal + hasta 5 de galería
const productUpload = upload.fields([
  { name: 'imagen_principal', maxCount: 1 },
  { name: 'galeria',          maxCount: 5 },
])

router.get('/',       getProductos)
router.get('/:id',    getProductoById)

// Rutas protegidas
router.post('/',      verificarToken, productUpload, createProducto)
router.put('/:id',    verificarToken, productUpload, updateProducto)
router.delete('/:id', verificarToken, deleteProducto)

export default router
