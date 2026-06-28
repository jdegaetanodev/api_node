import * as estadisticasServicio from '../servicios/estadisticas.servicio.js';

export const obtenerEstadisticas = async (req, res) => {
  try {
    const estadisticas = await estadisticasServicio.obtenerMetricasSP();
    
    res.status(200).json({
      estado: true,
      mensaje: "Estadísticas de turnos generadas con éxito.",
      estadisticas
    });
  } catch (error) {
    console.log(`Error en GET /estadisticas ${error}`);
    res.status(500).json({ estado: false, mensaje: 'Error interno al procesar el reporte.' });
  }
};