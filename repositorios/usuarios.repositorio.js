import { pool } from '../db/conexion.js';

export const encontrarTodos = async () =>
  pool.query('SELECT * FROM usuarios WHERE activo = 1');

export const encontrarUno = async (id) =>
  pool.execute('SELECT * FROM usuarios WHERE activo = 1 AND id_usuario = ?', [id]);

export const insertar = async (documento, apellido, nombres, email, contrasenia, foto_path, rol) =>
  pool.execute(
    'INSERT INTO usuarios (documento, apellido, nombres, email, contrasenia, foto_path, rol) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [documento, apellido, nombres, email, contrasenia, foto_path, rol]
  );

export const actualizar = async (dto, id) => {
  const campos = Object.keys(dto).map((campo) => `${campo} = ?`).join(', ');
  const valores = [...Object.values(dto), id];
  return pool.execute(`UPDATE usuarios SET ${campos} WHERE id_usuario = ? AND activo = 1`, valores);
};

export const eliminar = async (id) =>
  pool.execute(
    'UPDATE usuarios SET activo = 0 WHERE id_usuario = ? AND activo = 1',
    [id]
  );