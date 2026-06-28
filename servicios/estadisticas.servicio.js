import * as estadisticasRepositorio from '../repositorios/estadisticas.repositorio.js';

export const obtenerEstadisticas = async () => {
  const [filas] = await estadisticasRepositorio.ejecutarStoredProcedure();
  return filas[0];
};