import * as pacientesRepositorio from '../repositorios/pacientes.repositorio.js';

export const obtenerTodos = async () =>
  pacientesRepositorio.encontrarTodos();

export const obtenerUno = async (id) =>
  pacientesRepositorio.encontrarUno(id);

export const crear = async ({ id_usuario, id_obra_social }) =>
  pacientesRepositorio.insertar(id_usuario, id_obra_social);

export const actualizar = async (dto, id) =>
  pacientesRepositorio.actualizar(dto, id);

export const eliminar = async (id) =>
  pacientesRepositorio.eliminar(id);