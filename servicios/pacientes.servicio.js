import { pool } from "../db/conexion.js";

export const obtenerTodos = async () => pool.query("SELECT * FROM v_pacientes");

export const obtenerUno = async (id) =>
  pool.execute("SELECT * FROM v_pacientes WHERE id_paciente = ?", [id]);

export const crear = async ({ id_usuario, id_obra_social }) =>
  pool.execute(
    "INSERT INTO pacientes (id_usuario, id_obra_social) VALUES (?, ?)",
    [id_usuario, id_obra_social],
  );

export const actualizar = async (dto, id) => {
  const campos = Object.keys(dto)
    .map((campo) => `${campo} = ?`)
    .join(", ");
  const valores = [...Object.values(dto), id];

  return pool.execute(
    `UPDATE pacientes SET ${campos} WHERE id_paciente = ?`,
    valores,
  );
};

export const eliminar = async (id) =>
  pool.execute(
    "UPDATE usuarios u JOIN pacientes p ON u.id_usuario = p.id_usuario SET u.activo = 0 WHERE p.id_paciente = ? AND u.activo = 1",
    [id],
  );
