import { pool } from "../db/conexion.js";
import * as turnosServicio from "../servicios/turnosReservas.servicio.js";

export const obtenerTodos = async (req, res) => {
  try {
    const [turnos] = await turnosServicio.obtenerTodos();
    res.status(200).json({ estado: true, mensaje: "Turnos encontrados.", turnos });
  } catch (error) {
    console.log(`Error en GET /turnos-reservas ${error}`);
    res.status(500).json({ estado: false, mensaje: "Error interno" });
  }
};

export const obtenerUno = async (req, res) => {
  try {
    const [filas] = await turnosServicio.obtenerUno(req.params.id);
    if (!filas.length)
      return res.status(404).json({ estado: false, mensaje: "Turno no encontrado o inactivo" });
    res.status(200).json({ estado: true, mensaje: "Turno encontrado.", turno: filas[0] });
  } catch (error) {
    console.log(`Error en GET /turnos-reservas/:id ${error}`);
    res.status(500).json({ estado: false, mensaje: "Error interno" });
  }
};

export const obtenerMisTurnosMedico = async (req, res) => {
  try {
    const [turnos] = await turnosServicio.obtenerPorMedico(req.usuario.id_usuario);
    res.status(200).json({ estado: true, mensaje: "Turnos encontrados.", turnos });
  } catch (error) {
    console.log(`Error en GET /turnos-reservas/mis-turnos/medico ${error}`);
    res.status(500).json({ estado: false, mensaje: "Error interno" });
  }
};

export const obtenerMisTurnosPaciente = async (req, res) => {
  try {
    const [turnos] = await turnosServicio.obtenerPorPaciente(req.usuario.id_usuario);
    res.status(200).json({ estado: true, mensaje: "Turnos encontrados.", turnos });
  } catch (error) {
    console.log(`Error en GET /turnos-reservas/mis-turnos/paciente ${error}`);
    res.status(500).json({ estado: false, mensaje: "Error interno" });
  }
};

export const marcarAtendido = async (req, res) => {
  try {
    const [resultado] = await turnosServicio.marcarAtendido(req.params.id);
    if (!resultado.affectedRows)
      return res.status(404).json({ estado: false, mensaje: "Turno no encontrado o ya atendido" });
    res.status(200).json({ estado: true, mensaje: "Turno marcado como atendido." });
  } catch (error) {
    console.log(`Error en PUT /turnos-reservas/:id/atendido ${error}`);
    res.status(500).json({ estado: false, mensaje: "Error interno" });
  }
};

export const crearReservaPropia = async (req, res) => {
  try {
    const [paciente] = await pool.execute(
      "SELECT id_paciente, id_obra_social FROM pacientes p JOIN usuarios u ON p.id_usuario = u.id_usuario WHERE u.id_usuario = ? AND u.activo = 1",
      [req.usuario.id_usuario]
    );
    if (!paciente.length)
      return res.status(404).json({ estado: false, mensaje: "Paciente no encontrado." });

    const dto = {
      ...req.dto,
      id_paciente: paciente[0].id_paciente,
      id_obra_social: paciente[0].id_obra_social,
    };

    const resultado = await turnosServicio.crearConTransaccion(dto);
    res.status(201).json({ estado: true, mensaje: "Reserva creada con éxito.", id: resultado.insertId });
  } catch (error) {
    console.log(`Error en POST /turnos-reservas/mis-turnos ${error}`);
    res.status(500).json({ estado: false, mensaje: "Error interno" });
  }
};

export const crear = async (req, res) => {
  try {
    const resultado = await turnosServicio.crearConTransaccion(req.dto);
    res.status(201).json({
      estado: true,
      mensaje: "Turno reservado con éxito y valor total calculado.",
      id: resultado.insertId,
    });
  } catch (error) {
    console.log(`Error en POST /turnos-reservas ${error}`);
    if (error.message === "MEDICO_NOT_FOUND")
      return res.status(400).json({ estado: false, mensaje: "El médico seleccionado no existe o está inactivo." });
    if (error.message === "OS_NOT_FOUND")
      return res.status(400).json({ estado: false, mensaje: "La obra social seleccionada no existe o está inactiva." });
    if (error.code === "ER_NO_REFERENCED_ROW_2")
      return res.status(400).json({ estado: false, mensaje: "Verifique los IDs de médico, paciente u obra social provistos." });
    res.status(500).json({ estado: false, mensaje: "Error interno de servidor al procesar la transacción." });
  }
};

export const actualizar = async (req, res) => {
  try {
    if (Object.keys(req.dto).length === 0)
      return res.status(400).json({ estado: false, mensaje: "No se enviaron datos para actualizar." });
    const [resultado] = await turnosServicio.actualizar(req.dto, req.params.id);
    if (!resultado.affectedRows)
      return res.status(404).json({ estado: false, mensaje: "Turno no encontrado" });
    res.status(200).json({ estado: true, mensaje: "Turno modificado correctamente." });
  } catch (error) {
    console.log(`Error en PUT /turnos-reservas/:id ${error}`);
    res.status(500).json({ estado: false, mensaje: "Error interno" });
  }
};

export const eliminar = async (req, res) => {
  try {
    const [resultado] = await turnosServicio.eliminar(req.params.id);
    if (!resultado.affectedRows)
      return res.status(404).json({ estado: false, mensaje: "Turno no encontrado o ya cancelado" });
    res.status(200).json({ estado: true, mensaje: "Turno cancelado (Baja lógica)." });
  } catch (error) {
    console.log(`Error en DELETE /turnos-reservas/:id ${error}`);
    res.status(500).json({ estado: false, mensaje: "Error interno" });
  }
};