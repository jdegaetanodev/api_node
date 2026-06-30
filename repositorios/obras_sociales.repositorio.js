import { pool } from '../db/conexion.js';

export const encontrarTodos = async () =>
  pool.query('SELECT * FROM obras_sociales WHERE activo = 1');

export const encontrarUno = async (id) =>
  pool.execute('SELECT * FROM obras_sociales WHERE activo = 1 AND id_obra_social = ?', [id]);

export const insertar = async (nombre, descripcion, porcentaje_descuento, es_particular) =>
  pool.execute(
    'INSERT INTO obras_sociales (nombre, descripcion, porcentaje_descuento, es_particular) VALUES (?, ?, ?, ?)',
    [nombre, descripcion, porcentaje_descuento, es_particular]
  );

export const actualizar = async (nombre, descripcion, porcentaje_descuento, es_particular, id) =>
  pool.execute(
    'UPDATE obras_sociales SET nombre = ?, descripcion = ?, porcentaje_descuento = ?, es_particular = ? WHERE id_obra_social = ? AND activo = 1',
    [nombre, descripcion, porcentaje_descuento, es_particular, id]
  );

export const eliminar = async (id) =>
  pool.execute(
    'UPDATE obras_sociales SET activo = 0 WHERE id_obra_social = ? AND activo = 1',
    [id]
  );