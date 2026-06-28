import * as obrasSocialesRepositorio from '../repositorios/obras_sociales.repositorio.js';

export const obtenerTodos = async () =>
  obrasSocialesRepositorio.encontrarTodos();

export const obtenerUno = async (id) =>
  obrasSocialesRepositorio.encontrarUno(id);

export const crear = async ({ nombre, descripcion, porcentaje_descuento, es_particular }) =>
  obrasSocialesRepositorio.insertar(nombre, descripcion, porcentaje_descuento, es_particular);

export const actualizar = async ({ nombre, descripcion, porcentaje_descuento, es_particular }, id) =>
  obrasSocialesRepositorio.actualizar(nombre, descripcion, porcentaje_descuento, es_particular, id);

export const eliminar = async (id) =>
  obrasSocialesRepositorio.eliminar(id);