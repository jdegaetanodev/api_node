import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ estado: false, mensaje: 'Se requiere un token de autenticación.' });
  }

  try {
    // Se asume formato "Bearer <token>"
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET || 'mi_secreto_super_seguro');
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ estado: false, mensaje: 'Token inválido o expirado.' });
  }
};

export const esAdmin = (req, res, next) => {
  // ROL 3 es Administrador
  if (req.usuario.rol !== 3) {
    return res.status(403).json({ estado: false, mensaje: 'Acceso denegado. Se requieren permisos de administrador.' });
  }
  next();
};