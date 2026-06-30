import * as medicosRepositorio from '../repositorios/medicos.repositorio.js';

export const obtenerTodos = async () =>
  medicosRepositorio.encontrarTodos();

export const obtenerUno = async (id) =>
  medicosRepositorio.encontrarUno(id);

export const obtenerPorEspecialidad = async (id_especialidad) =>
  medicosRepositorio.encontrarPorEspecialidad(id_especialidad);

export const crear = async ({ id_usuario, id_especialidad, matricula, descripcion, valor_consulta }) =>
  medicosRepositorio.insertar(id_usuario, id_especialidad, matricula, descripcion, valor_consulta);

export const actualizar = async (dto, id) =>
  medicosRepositorio.actualizar(dto, id);

export const eliminar = async (id) =>
  medicosRepositorio.eliminar(id);