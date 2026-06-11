import { pool } from "../db/conexion.js";

export const obtenerTodos = async () =>
  pool.query(`
    SELECT mos.id_medico_obra_social, mos.id_medico, mos.id_obra_social, 
           u.apellido AS medico_apellido, u.nombres AS medico_nombres, 
           os.nombre AS obra_social_nombre
    FROM medicos_obras_sociales mos
    JOIN medicos m ON mos.id_medico = m.id_medico
    JOIN usuarios u ON m.id_usuario = u.id_usuario
    JOIN obras_sociales os ON mos.id_obra_social = os.id_obra_social
    WHERE mos.activo = 1
  `);

export const obtenerUno = async (id) =>
  pool.execute(
    `
    SELECT mos.id_medico_obra_social, mos.id_medico, mos.id_obra_social, 
           u.apellido AS medico_apellido, u.nombres AS medico_nombres, 
           os.nombre AS obra_social_nombre
    FROM medicos_obras_sociales mos
    JOIN medicos m ON mos.id_medico = m.id_medico
    JOIN usuarios u ON m.id_usuario = u.id_usuario
    JOIN obras_sociales os ON mos.id_obra_social = os.id_obra_social
    WHERE mos.activo = 1 AND mos.id_medico_obra_social = ?
  `,
    [id],
  );

export const crear = async ({ id_medico, id_obra_social }) =>
  pool.execute(
    "INSERT INTO medicos_obras_sociales (id_medico, id_obra_social) VALUES (?, ?)",
    [id_medico, id_obra_social],
  );

export const actualizar = async (dto, id) => {
  const campos = Object.keys(dto)
    .map((campo) => `${campo} = ?`)
    .join(", ");
  const valores = [...Object.values(dto), id];

  return pool.execute(
    `UPDATE medicos_obras_sociales SET ${campos} WHERE id_medico_obra_social = ? AND activo = 1`,
    valores,
  );
};

export const eliminar = async (id) =>
  pool.execute(
    "UPDATE medicos_obras_sociales SET activo = 0 WHERE id_medico_obra_social = ? AND activo = 1",
    [id],
  );
