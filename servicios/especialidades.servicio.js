import * as especialidadesRepositorio from '../repositorios/especialidades.repositorio.js';

export const obtenerTodos = async () =>
  especialidadesRepositorio.encontrarTodos();

export const obtenerUno = async (id) =>
  especialidadesRepositorio.encontrarUno(id);

export const crear = async ({ nombre }) =>
  especialidadesRepositorio.insertar(nombre);

export const actualizar = async ({ nombre }, id) =>
  especialidadesRepositorio.actualizar(nombre, id);

export const eliminar = async (id) =>
  especialidadesRepositorio.eliminar(id);