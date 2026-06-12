import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { pool } from '../db/conexion.js';

export const login = async (req, res) => {
  try {
    const { email, contrasenia } = req.body;
    
    // Buscar usuario (solo activos)
    const [usuarios] = await pool.execute(
      'SELECT id_usuario, email, contrasenia, rol FROM usuarios WHERE email = ? AND activo = 1',
      [email]
    );

    if (usuarios.length === 0) {
      return res.status(401).json({ estado: false, mensaje: 'Credenciales inválidas.' });
    }

    const usuario = usuarios[0];

    // Verificar contraseña (idealmente las contraseñas en tu DB deberían estar hasheadas con bcrypt)
    // NOTA: Si en la DB están en texto plano por ahora o con otro hash (como se ve en el dump, parecen SHA-256), 
    // vas a tener que adaptar esta comparación temporalmente o re-hashear los seeds.
    // const passwordValido = await bcrypt.compare(contrasenia, usuario.contrasenia);
    
    // Simulación directa si no usaste bcrypt en los inserts del dump:
    const passwordValido = (contrasenia === usuario.contrasenia); 

    if (!passwordValido) {
      return res.status(401).json({ estado: false, mensaje: 'Credenciales inválidas.' });
    }

    // Generar JWT
    const token = jwt.sign(
      { id_usuario: usuario.id_usuario, rol: usuario.rol },
      process.env.JWT_SECRET || 'mi_secreto_super_seguro',
      { expiresIn: '2h' }
    );

    res.status(200).json({ estado: true, token, rol: usuario.rol });
  } catch (error) {
    console.log(`Error en POST /auth/login ${error}`);
    res.status(500).json({ estado: false, mensaje: 'Error interno' });
  }
};