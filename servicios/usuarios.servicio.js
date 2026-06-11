import { pool } from "../db/conexion.js";

export const obtenerTodos = async () =>
  pool.query(
    "SELECT id_usuario, documento, apellido, nombres, email, foto_path, rol, activo FROM usuarios WHERE activo = 1",
  );

export const obtenerUno = async (id) =>
  pool.execute(
    "SELECT id_usuario, documento, apellido, nombres, email, foto_path, rol, activo FROM usuarios WHERE activo = 1 AND id_usuario = ?",
    [id],
  );

export const crear = async ({
  documento,
  apellido,
  nombres,
  email,
  contrasenia,
  foto_path,
  rol,
}) =>
  pool.execute(
    "INSERT INTO usuarios (documento, apellido, nombres, email, contrasenia, foto_path, rol) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [documento, apellido, nombres, email, contrasenia, foto_path, rol],
  );

export const actualizar = async (dto, id) => {

  const campos = Object.keys(dto)
    .map((campo) => `${campo} = ?`)
    .join(", ");
  const valores = [...Object.values(dto), id];

  return pool.execute(
    `UPDATE usuarios SET ${campos} WHERE id_usuario = ? AND activo = 1`,
    valores,
  );
};

export const eliminar = async (id) =>
  pool.execute(
    "UPDATE usuarios SET activo = 0 WHERE id_usuario = ? AND activo = 1",
    [id],
  );
