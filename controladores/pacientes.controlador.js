import * as pacientesServicio from "../servicios/pacientes.servicio.js";

export const obtenerTodos = async (req, res) => {
  try {
    const [pacientes] = await pacientesServicio.obtenerTodos();
    res
      .status(200)
      .json({ estado: true, mensaje: "Pacientes encontrados.", pacientes });
  } catch (error) {
    console.log(`Error en GET /pacientes ${error}`);
    res.status(500).json({ estado: false, mensaje: "Error interno" });
  }
};

export const obtenerUno = async (req, res) => {
  try {
    const [filas] = await pacientesServicio.obtenerUno(req.params.id);
    if (!filas.length)
      return res
        .status(404)
        .json({ estado: false, mensaje: "Paciente no encontrado o inactivo" });
    res
      .status(200)
      .json({
        estado: true,
        mensaje: "Paciente encontrado.",
        paciente: filas[0],
      });
  } catch (error) {
    console.log(`Error en GET /pacientes/:id ${error}`);
    res.status(500).json({ estado: false, mensaje: "Error interno" });
  }
};

export const crear = async (req, res) => {
  try {
    const [resultado] = await pacientesServicio.crear(req.dto);
    res
      .status(201)
      .json({
        estado: true,
        mensaje: "Paciente registrado con éxito.",
        id: resultado.insertId,
      });
  } catch (error) {
    console.log(`Error en POST /pacientes ${error}`);
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(400)
        .json({
          estado: false,
          mensaje: "El id_usuario ya está asignado a un paciente.",
        });
    }
    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res
        .status(400)
        .json({
          estado: false,
          mensaje: "El id_usuario o id_obra_social provisto no existe.",
        });
    }
    res.status(500).json({ estado: false, mensaje: "Error interno" });
  }
};

export const actualizar = async (req, res) => {
  try {
    if (Object.keys(req.dto).length === 0) {
      return res
        .status(400)
        .json({
          estado: false,
          mensaje: "No se enviaron datos para actualizar.",
        });
    }
    const [resultado] = await pacientesServicio.actualizar(
      req.dto,
      req.params.id,
    );
    if (!resultado.affectedRows)
      return res
        .status(404)
        .json({ estado: false, mensaje: "Paciente no encontrado" });
    res
      .status(200)
      .json({ estado: true, mensaje: "Datos del paciente actualizados." });
  } catch (error) {
    console.log(`Error en PUT /pacientes/:id ${error}`);
    res.status(500).json({ estado: false, mensaje: "Error interno" });
  }
};

export const eliminar = async (req, res) => {
  try {
    const [resultado] = await pacientesServicio.eliminar(req.params.id);
    if (!resultado.affectedRows)
      return res
        .status(404)
        .json({
          estado: false,
          mensaje: "Paciente no encontrado o ya dado de baja",
        });
    res
      .status(200)
      .json({ estado: true, mensaje: "Paciente dado de baja con éxito." });
  } catch (error) {
    console.log(`Error en DELETE /pacientes/:id ${error}`);
    res.status(500).json({ estado: false, mensaje: "Error interno" });
  }
};
