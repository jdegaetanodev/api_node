import * as mosRepositorio from '../repositorios/medicosObrasSociales.repositorio.js';

export const obtenerTodos = async () =>
  mosRepositorio.encontrarTodos();

export const obtenerUno = async (id) =>
  mosRepositorio.encontrarUno(id);

export const crear = async ({ id_medico, id_obra_social }) =>
  mosRepositorio.insertar(id_medico, id_obra_social);

export const actualizar = async (dto, id) =>
  mosRepositorio.actualizar(dto, id);

export const eliminar = async (id) =>
  mosRepositorio.eliminar(id);