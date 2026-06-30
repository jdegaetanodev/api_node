import { pool } from '../db/conexion.js';
import crypto from 'crypto';

export const encontrarPorEmail = async (email) =>
  pool.execute(
    'SELECT id_usuario, email, contrasenia, rol FROM usuarios WHERE email = ? AND activo = 1',
    [email]
  );

export const guardarTokenRecuperacion = async (email) => {
  const [usuarios] = await pool.execute(
    'SELECT id_usuario FROM usuarios WHERE email = ? AND activo = 1',
    [email]
  );
  if (!usuarios.length) return null;

  const id_usuario = usuarios[0].id_usuario;
  const token = crypto.randomBytes(16).toString('hex');
  const expira = new Date();
  expira.setHours(expira.getHours() + 1);

  await pool.execute(
    'UPDATE usuarios SET reset_token = ?, reset_token_expira = ? WHERE id_usuario = ?',
    [token, expira, id_usuario]
  );

  return token;
};

export const resetearContraseniaConToken = async (token, nuevaContrasenia) => {
  const [usuarios] = await pool.execute(
    'SELECT id_usuario FROM usuarios WHERE reset_token = ? AND reset_token_expira > NOW() AND activo = 1',
    [token]
  );
  if (!usuarios.length) return false;

  const id_usuario = usuarios[0].id_usuario;

  await pool.execute(
    'UPDATE usuarios SET contrasenia = ?, reset_token = NULL, reset_token_expira = NULL WHERE id_usuario = ?',
    [nuevaContrasenia, id_usuario]
  );

  return true;
};
export const hashContrasenia = async (contrasenia) =>
  pool.execute('SELECT SHA2(?, 256) AS hash', [contrasenia]);
