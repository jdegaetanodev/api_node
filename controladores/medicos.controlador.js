import * as medicosServicio from "../servicios/medicos.servicio.js";

export const obtenerTodos = async (req, res) => {
  try {
    const [medicos] = await medicosServicio.obtenerTodos();
    res
      .status(200)
      .json({ estado: true, mensaje: "Médicos encontrados.", medicos });
  } catch (error) {
    console.log(`Error en GET /medicos ${error}`);
    res.status(500).json({ estado: false, mensaje: "Error interno" });
  }
};

export const obtenerUno = async (req, res) => {
  try {
    const [filas] = await medicosServicio.obtenerUno(req.params.id);
    if (!filas.length)
      return res
        .status(404)
        .json({ estado: false, mensaje: "Médico no encontrado o inactivo" });
    res
      .status(200)
      .json({ estado: true, mensaje: "Médico encontrado.", medico: filas[0] });
  } catch (error) {
    console.log(`Error en GET /medicos/:id ${error}`);
    res.status(500).json({ estado: false, mensaje: "Error interno" });
  }
};

export const crear = async (req, res) => {
  try {
    const [resultado] = await medicosServicio.crear(req.dto);
    res
      .status(201)
      .json({
        estado: true,
        mensaje: "Médico registrado con éxito.",
        id: resultado.insertId,
      });
  } catch (error) {
    console.log(`Error en POST /medicos ${error}`);
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(400)
        .json({
          estado: false,
          mensaje: "La matrícula o el id_usuario ya se encuentra registrado.",
        });
    }
    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res
        .status(400)
        .json({
          estado: false,
          mensaje: "El id_usuario o id_especialidad provisto no existe.",
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
    const [resultado] = await medicosServicio.actualizar(
      req.dto,
      req.params.id,
    );
    if (!resultado.affectedRows)
      return res
        .status(404)
        .json({ estado: false, mensaje: "Médico no encontrado" });
    res
      .status(200)
      .json({ estado: true, mensaje: "Datos del médico actualizados." });
  } catch (error) {
    console.log(`Error en PUT /medicos/:id ${error}`);
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(400)
        .json({
          estado: false,
          mensaje: "La matrícula ingresada ya está en uso.",
        });
    }
    res.status(500).json({ estado: false, mensaje: "Error interno" });
  }
};

export const eliminar = async (req, res) => {
  try {
    const [resultado] = await medicosServicio.eliminar(req.params.id);
    if (!resultado.affectedRows)
      return res
        .status(404)
        .json({
          estado: false,
          mensaje: "Médico no encontrado o ya se encontraba de baja",
        });
    res
      .status(200)
      .json({ estado: true, mensaje: "Médico dado de baja (desactivado)." });
  } catch (error) {
    console.log(`Error en DELETE /medicos/:id ${error}`);
    res.status(500).json({ estado: false, mensaje: "Error interno" });
  }
};
