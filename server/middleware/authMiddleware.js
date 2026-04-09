import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'nutriker_secreto_super_seguro_2024'

export function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Acceso denegado: Token no proporcionado' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decodificado = jwt.verify(token, JWT_SECRET)
    req.usuario = decodificado // { id, correo, rol }
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Acceso denegado: Token inválido o expirado' })
  }
}
