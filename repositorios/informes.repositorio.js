import { pool } from '../db/conexion.js';

export const obtenerDetalleTurnos = async () =>
  pool.query(`
    SELECT tr.id_turno_reserva, tr.fecha_hora, tr.valor_total, tr.atendido,
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

export const obtenerMetricas = async () => {
  const [totales] = await pool.query(`
    SELECT COUNT(tr.id_turno_reserva) AS total_turnos,
           COUNT(DISTINCT tr.id_paciente) AS total_pacientes
    FROM turnos_reservas tr
    WHERE tr.activo = 1
  `);

  const [porObraSocial] = await pool.query(`
    SELECT os.nombre AS obra_social, COUNT(tr.id_turno_reserva) AS cantidad
    FROM obras_sociales os
    LEFT JOIN turnos_reservas tr ON os.id_obra_social = tr.id_obra_social AND tr.activo = 1
    WHERE os.activo = 1
    GROUP BY os.id_obra_social, os.nombre
  `);

  return { globales: totales[0], coberturas: porObraSocial };
};