import { pool } from "../db/conexion.js";

export const obtenerTodos = async () =>
  pool.query(`
    SELECT tr.*, 
           u_med.apellido AS medico_apellido, u_med.nombres AS medico_nombres,
           u_pac.apellido AS paciente_apellido, u_pac.nombres AS paciente_nombres,
           os.nombre AS obra_social_nombre
    FROM turnos_reservas tr
    JOIN medicos m ON tr.id_medico = m.id_medico
    JOIN usuarios u_med ON m.id_usuario = u_med.id_usuario
    JOIN pacientes p ON tr.id_paciente = p.id_paciente
    JOIN usuarios u_pac ON p.id_usuario = u_pac.id_usuario
    JOIN obras_sociales os ON tr.id_obra_social = os.id_obra_social
    WHERE tr.activo = 1
  `);

export const obtenerUno = async (id) =>
  pool.execute(
    "SELECT * FROM turnos_reservas WHERE activo = 1 AND id_turno_reserva = ?",
    [id]
  );

export const obtenerPorMedico = async (id_usuario) =>
  pool.execute(`
    SELECT tr.* 
    FROM turnos_reservas tr
    JOIN medicos m ON tr.id_medico = m.id_medico
    WHERE m.id_usuario = ? AND tr.activo = 1
  `, [id_usuario]);

export const obtenerPorPaciente = async (id_usuario) =>
  pool.execute(`
    SELECT tr.*
    FROM turnos_reservas tr
    JOIN pacientes p ON tr.id_paciente = p.id_paciente
    WHERE p.id_usuario = ? AND tr.activo = 1
  `, [id_usuario]);

export const marcarAtendido = async (id) =>
  pool.execute(
    "UPDATE turnos_reservas SET atendido = 1 WHERE id_turno_reserva = ? AND activo = 1",
    [id]
  );

export const crearConTransaccion = async ({
  id_medico,
  id_paciente,
  id_obra_social,
  fecha_hora,
  atendido,
}) => {
  const conexion = await pool.getConnection();
  try {
    await conexion.beginTransaction();

    const [medicoFilas] = await conexion.execute(
      "SELECT valor_consulta FROM medicos m JOIN usuarios u ON m.id_usuario = u.id_usuario WHERE m.id_medico = ? AND u.activo = 1",
      [id_medico]
    );
    if (!medicoFilas.length) throw new Error("MEDICO_NOT_FOUND");
    const valorConsulta = parseFloat(medicoFilas[0].valor_consulta);

    const [osFilas] = await conexion.execute(
      "SELECT es_particular, porcentaje_descuento FROM obras_sociales WHERE id_obra_social = ? AND activo = 1",
      [id_obra_social]
    );
    if (!osFilas.length) throw new Error("OS_NOT_FOUND");

    const { es_particular, porcentaje_descuento } = osFilas[0];

    let valorTotal = valorConsulta;
    if (es_particular === 0) {
      const descuento = valorConsulta * (parseFloat(porcentaje_descuento) / 100);
      valorTotal = valorConsulta - descuento;
    }

    const [resultado] = await conexion.execute(
      `INSERT INTO turnos_reservas (id_medico, id_paciente, id_obra_social, fecha_hora, valor_total, atendido, activo)
       VALUES (?, ?, ?, ?, ?, ?, 1)`,
      [id_medico, id_paciente, id_obra_social, fecha_hora, valorTotal, atendido]
    );

    await conexion.commit();
    return resultado;
  } catch (error) {
    await conexion.rollback();
    throw error;
  } finally {
    conexion.release();
  }
};

export const actualizar = async (dto, id) => {
  const campos = Object.keys(dto).map((campo) => `${campo} = ?`).join(", ");
  const valores = [...Object.values(dto), id];
  return pool.execute(
    `UPDATE turnos_reservas SET ${campos} WHERE id_turno_reserva = ? AND activo = 1`,
    valores
  );
};

export const eliminar = async (id) =>
  pool.execute(
    "UPDATE turnos_reservas SET activo = 0 WHERE id_turno_reserva = ? AND activo = 1",
    [id]
  );

export const obtenerDatosPacientePorUsuario = async (id_usuario) => {
  return pool.execute(
    "SELECT id_paciente, id_obra_social FROM pacientes p JOIN usuarios u ON p.id_usuario = u.id_usuario WHERE u.id_usuario = ? AND u.activo = 1",
    [id_usuario]
  );
};