import { Router } from 'express'
import { upload } from '../middleware/upload.js'
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
router.post('/',      productUpload, createProducto)
router.put('/:id',    productUpload, updateProducto)
router.delete('/:id', deleteProducto)

export default router
