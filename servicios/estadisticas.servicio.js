import { pool } from '../db/conexion.js';

export const obtenerMetricasSP = async () => {
  const [lineas] = await pool.query('CALL sp_obtener_estadisticas_turnos()');
  return lineas[0];
};

export const obtenerDatosParaReporte = async () => {
  const [filas] = await pool.query(`
    SELECT tr.id_turno_reserva, tr.fecha_hora, tr.valor_total, tr.atentido,
           u_med.apellido AS medico_apellido, os.nombre AS obra_social,
           u_pac.apellido AS paciente_apellido, u_pac.documento AS paciente_doc
    FROM turnos_reservas tr
    JOIN medicos m ON tr.id_medico = m.id_medico
    JOIN usuarios u_med ON m.id_usuario = u_med.id_usuario
    JOIN pacientes p ON tr.id_paciente = p.id_paciente
    JOIN usuarios u_pac ON p.id_usuario = u_pac.id_usuario
    JOIN obras_sociales os ON tr.id_obra_social = os.id_obra_social
    WHERE tr.activo = 1
    ORDER BY tr.fecha_hora DESC
  `);
  return filas;
};