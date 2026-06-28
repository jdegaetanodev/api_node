import { pool } from '../db/conexion.js';

export const encontrarTodos = async () =>
  pool.query('SELECT * FROM medicos_obras_sociales WHERE activo = 1');

export const encontrarUno = async (id) =>
  pool.execute('SELECT * FROM medicos_obras_sociales WHERE activo = 1 AND id_medico_obra_social = ?', [id]);

export const insertar = async (id_medico, id_obra_social) =>
  pool.execute(
    'INSERT INTO medicos_obras_sociales (id_medico, id_obra_social) VALUES (?, ?)',
    [id_medico, id_obra_social]
  );

export const actualizar = async (dto, id) => {
  const campos = Object.keys(dto).map((campo) => `${campo} = ?`).join(', ');
  const valores = [...Object.values(dto), id];
  return pool.execute(
    `UPDATE medicos_obras_sociales SET ${campos} WHERE id_medico_obra_social = ? AND activo = 1`,
    valores
  );
};

export const eliminar = async (id) =>
  pool.execute(
    'UPDATE medicos_obras_sociales SET activo = 0 WHERE id_medico_obra_social = ? AND activo = 1',
    [id]
  );