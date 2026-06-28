import jwt from 'jsonwebtoken';
import * as authServicio from '../servicios/auth.servicio.js';
import * as authRepositorio from '../repositorios/auth.repositorio.js';

// --- INICIO DE SESIÓN ---
export const login = async (req, res) => {
  try {
    const { email, contrasenia } = req.body;

    const [usuarios] = await authRepositorio.encontrarPorEmail(email);

    if (usuarios.length === 0) {
      return res.status(401).json({ estado: false, mensaje: 'Credenciales inválidas.' });
    }

    const usuario = usuarios[0];

    const [hashRows] = await authRepositorio.hashContrasenia(contrasenia);
    const passwordValido = hashRows[0].hash === usuario.contrasenia;

    if (!passwordValido) {
      return res.status(401).json({ estado: false, mensaje: 'Credenciales inválidas.' });
    }

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

// --- FUNCIONALIDAD EXTRA: SOLICITAR REINICIO DE CONTRASEÑA ---
export const solicitarReset = async (req, res) => {
  try {
    const { email } = req.body;
    const token = await authServicio.guardarTokenRecuperacion(email);

    if (!token) {
      return res.status(200).json({
        estado: true,
        mensaje: 'Si el correo electrónico coincide con una cuenta activa, se ha generado el token de recuperación.'
      });
    }

    console.log(`\n=== 📧 EMAIL DE SIMULACIÓN DE RECUPERACIÓN ===`);
    console.log(`Para: ${email}`);
    console.log(`Token de acceso rápido: ${token}`);
    console.log(`============================================\n`);

    res.status(200).json({
      estado: true,
      mensaje: 'Token de recuperación generado con éxito.',
      desarrollo_token: token
    });
  } catch (error) {
    console.log(`Error en POST /auth/solicitar-reset ${error}`);
    res.status(500).json({ estado: false, mensaje: 'Error interno del servidor.' });
  }
};

// --- FUNCIONALIDAD EXTRA: EJECUTAR CAMBIO DE CONTRASEÑA ---
export const cambiarContraseniaConToken = async (req, res) => {
  try {
    const { token, nueva_contrasenia } = req.body;

    const exito = await authServicio.resetearContraseniaConToken(token, nueva_contrasenia);

    if (!exito) {
      return res.status(400).json({
        estado: false,
        mensaje: 'El token de recuperación es inválido o ya ha expirado.'
      });
    }

    res.status(200).json({ estado: true, mensaje: 'Contraseña actualizada correctamente.' });
  } catch (error) {
    console.log(`Error en POST /auth/ejecutar-reset ${error}`);
    res.status(500).json({ estado: false, mensaje: 'Error interno del servidor.' });
  }
};