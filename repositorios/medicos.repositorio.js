import { pool } from '../db/conexion.js';

export const encontrarTodos = async () =>
  pool.query('SELECT * FROM v_medicos');

export const encontrarUno = async (id) =>
  pool.execute('SELECT * FROM v_medicos WHERE id_medico = ?', [id]);

export const encontrarPorEspecialidad = async (id_especialidad) =>
  pool.execute(`
    SELECT v.* FROM v_medicos v
    JOIN medicos m ON v.id_medico = m.id_medico
    WHERE m.id_especialidad = ?
  `, [id_especialidad]);

export const insertar = async (id_usuario, id_especialidad, matricula, descripcion, valor_consulta) =>
  pool.execute(
    'INSERT INTO medicos (id_usuario, id_especialidad, matricula, descripcion, valor_consulta) VALUES (?, ?, ?, ?, ?)',
    [id_usuario, id_especialidad, matricula, descripcion, valor_consulta]
  );

export const actualizar = async (dto, id) => {
  const campos = Object.keys(dto).map((campo) => `${campo} = ?`).join(', ');
  const valores = [...Object.values(dto), id];
  return pool.execute(`UPDATE medicos SET ${campos} WHERE id_medico = ?`, valores);
};

export const eliminar = async (id) =>
  pool.execute(
    'UPDATE usuarios u JOIN medicos m ON u.id_usuario = m.id_usuario SET u.activo = 0 WHERE m.id_medico = ? AND u.activo = 1',
    [id]
  );