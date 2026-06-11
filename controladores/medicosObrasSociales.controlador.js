import * as mosServicio from "../servicios/medicosObrasSociales.servicio.js";

export const obtenerTodos = async (req, res) => {
  try {
    const [coberturas] = await mosServicio.obtenerTodos();
    res
      .status(200)
      .json({
        estado: true,
        mensaje: "Vínculos de médicos y obras sociales encontrados.",
        coberturas,
      });
  } catch (error) {
    console.log(`Error en GET /medicos-obras-sociales ${error}`);
    res.status(500).json({ estado: false, mensaje: "Error interno" });
  }
};

export const obtenerUno = async (req, res) => {
  try {
    const [filas] = await mosServicio.obtenerUno(req.params.id);
    if (!filas.length)
      return res
        .status(404)
        .json({ estado: false, mensaje: "Vínculo no encontrado o inactivo" });
    res
      .status(200)
      .json({
        estado: true,
        mensaje: "Vínculo encontrado.",
        cobertura: filas[0],
      });
  } catch (error) {
    console.log(`Error en GET /medicos-obras-sociales/:id ${error}`);
    res.status(500).json({ estado: false, mensaje: "Error interno" });
  }
};

export const crear = async (req, res) => {
  try {
    const [resultado] = await mosServicio.crear(req.dto);
    res
      .status(201)
      .json({
        estado: true,
        mensaje: "Obra social asociada al médico con éxito.",
        id: resultado.insertId,
      });
  } catch (error) {
    console.log(`Error en POST /medicos-obras-sociales ${error}`);
    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res
        .status(400)
        .json({
          estado: false,
          mensaje:
            "El id_medico o id_obra_social provisto no existe en el sistema.",
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
    const [resultado] = await mosServicio.actualizar(req.dto, req.params.id);
    if (!resultado.affectedRows)
      return res
        .status(404)
        .json({ estado: false, mensaje: "Vínculo no encontrado" });
    res
      .status(200)
      .json({ estado: true, mensaje: "Vínculo actualizado correctamente." });
  } catch (error) {
    console.log(`Error en PUT /medicos-obras-sociales/:id ${error}`);
    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res
        .status(400)
        .json({
          estado: false,
          mensaje: "El id_medico o id_obra_social provisto no existe.",
        });
    }
    res.status(500).json({ estado: false, mensaje: "Error interno" });
  }
};

export const eliminar = async (req, res) => {
  try {
    const [resultado] = await mosServicio.eliminar(req.params.id);
    if (!resultado.affectedRows)
      return res
        .status(404)
        .json({
          estado: false,
          mensaje: "Vínculo no encontrado o ya dado de baja",
        });
    res.status(200).json({ estado: true, mensaje: "Asociación dada de baja." });
  } catch (error) {
    console.log(`Error en DELETE /medicos-obras-sociales/:id ${error}`);
    res.status(500).json({ estado: false, mensaje: "Error interno" });
  }
};
