import { pool } from '../db/conexion.js';

export const obtenerTodos = async () =>
  pool.query('SELECT * FROM especialidades WHERE activo = 1');

export const obtenerUno = async (id) =>
  pool.execute('SELECT * FROM especialidades WHERE activo = 1 AND id_especialidad = ?', [id]);

export const crear = async (nombre) =>
  pool.execute('INSERT INTO especialidades (nombre) VALUES (?)', [nombre]);

export const actualizar = async (nombre, id) =>
  pool.execute('UPDATE especialidades SET nombre = ? WHERE id_especialidad = ? AND activo = 1', [nombre, id]);

export const eliminar = async (id) =>
  pool.execute('UPDATE especialidades SET activo = 0 WHERE id_especialidad = ? AND activo = 1', [id]);