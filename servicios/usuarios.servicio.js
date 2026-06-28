import * as usuariosRepositorio from '../repositorios/usuarios.repositorio.js';

export const obtenerTodos = async () =>
  usuariosRepositorio.encontrarTodos();

export const obtenerUno = async (id) =>
  usuariosRepositorio.encontrarUno(id);

export const crear = async ({ documento, apellido, nombres, email, contrasenia, foto_path, rol }) =>
  usuariosRepositorio.insertar(documento, apellido, nombres, email, contrasenia, foto_path, rol);

export const actualizar = async (dto, id) =>
  usuariosRepositorio.actualizar(dto, id);

export const eliminar = async (id) =>
  usuariosRepositorio.eliminar(id);