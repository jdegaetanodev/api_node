import { pool } from '../db/conexion.js';

export const obtenerEstadisticas = async (req, res) => {
  try {
   
    const [resultados] = await pool.query('CALL sp_obtener_estadisticas_turnos()');
    
    res.status(200).json({
      estado: true,
      mensaje: "Estadísticas de turnos generadas con éxito.",
      estadisticas: resultados[0]
    });
  } catch (error) {
    console.log(`Error en GET /estadisticas ${error}`);
    res.status(500).json({ estado: false, mensaje: 'Error interno al procesar el reporte.' });
  }
};