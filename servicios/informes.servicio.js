import * as informesRepositorio from '../repositorios/informes.repositorio.js';

export const obtenerDetalleTurnosPDF = async () => {
  const [filas] = await informesRepositorio.obtenerDetalleTurnos();
  return filas;
};

export const obtenerMetricasConsolidadas = async () =>
  informesRepositorio.obtenerMetricas();