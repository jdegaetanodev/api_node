import { pool } from '../db/conexion.js';

export const ejecutarStoredProcedure = async () =>
  pool.query('CALL sp_obtener_estadisticas_turnos()');
