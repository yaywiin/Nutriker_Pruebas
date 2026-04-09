/**
 * store.js — Base de datos en memoria (sustituye PostgreSQL)
 * Los datos se resetean al reiniciar el servidor.
 */

export const db = {
  usuarios: [
    {
      id: '00000001',
      nombre: 'Administrador',
      usuario: 'admin',
      correo: 'admin@nutriker.com',
      // contraseña: admin123 (bcrypt hash)
      contrasena: '$2b$10$Y9z1yYuG0vAnIblRiDpuuO8HV36BI/R6KG0BxRhI4DqBx.lqiC0di',
      rol: 'Administrador',
      fecha_alta: new Date().toISOString().split('T')[0],
      updated_at: null,
      deleted_at: null,
    },
  ],
  productos: [],
  categorias: [],
  pedidos: [],
  citas: [],
}
