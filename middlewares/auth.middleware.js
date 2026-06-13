import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
  const token = req.headers['authorization'];

  console.log('JWT_SECRET:', process.env.JWT_SECRET);
  console.log('TOKEN RECIBIDO:', token);
 

  if (!token) {
    return res.status(403).json({ estado: false, mensaje: 'Se requiere un token de autenticación.' }); 
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ estado: false, mensaje: 'Token inválido o expirado.' });
  }
};

export const esAdmin = (req, res, next) => {
  if (req.usuario.rol !== 3) {
    return res.status(403).json({ estado: false, mensaje: 'Acceso denegado. Se requieren permisos de administrador.' });
  }
  next();
};

export const esMedico = (req, res, next) => {
  if (req.usuario.rol !== 1) {
    return res.status(403).json({ estado: false, mensaje: 'Acceso denegado. Se requieren permisos de médico.' });
  }
  next();
};

export const esPaciente = (req, res, next) => {
  if (req.usuario.rol !== 2) {
    return res.status(403).json({ estado: false, mensaje: 'Acceso denegado. Se requieren permisos de paciente.' });
  }
  next();
};