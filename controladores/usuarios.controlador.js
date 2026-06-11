import * as usuariosServicio from "../servicios/usuarios.servicio.js";

export const obtenerTodos = async (req, res) => {
  try {
    const [usuarios] = await usuariosServicio.obtenerTodos();
    res
      .status(200)
      .json({ estado: true, mensaje: "Usuarios encontrados.", usuarios });
  } catch (error) {
    console.log(`Error en GET /usuarios ${error}`);
    res.status(500).json({ estado: false, mensaje: "Error interno" });
  }
};

export const obtenerUno = async (req, res) => {
  try {
    const [filas] = await usuariosServicio.obtenerUno(req.params.id);
    if (!filas.length)
      return res
        .status(404)
        .json({ estado: false, mensaje: "Usuario no encontrado" });
    res
      .status(200)
      .json({
        estado: true,
        mensaje: "Usuario encontrado.",
        usuario: filas[0],
      });
  } catch (error) {
    console.log(`Error en GET /usuarios/:id ${error}`);
    res.status(500).json({ estado: false, mensaje: "Error interno" });
  }
};

export const crear = async (req, res) => {
  try {
    const [resultado] = await usuariosServicio.crear(req.dto);
    res
      .status(201)
      .json({
        estado: true,
        mensaje: "Usuario creado.",
        id: resultado.insertId,
      });
  } catch (error) {
    console.log(`Error en POST /usuarios ${error}`);
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(400)
        .json({
          estado: false,
          mensaje: "El documento o email ya se encuentra registrado.",
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
    const [resultado] = await usuariosServicio.actualizar(
      req.dto,
      req.params.id,
    );
    if (!resultado.affectedRows)
      return res
        .status(404)
        .json({ estado: false, mensaje: "Usuario no encontrado" });
    res.status(200).json({ estado: true, mensaje: "Usuario actualizado." });
  } catch (error) {
    console.log(`Error en PUT /usuarios/:id ${error}`);
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(400)
        .json({
          estado: false,
          mensaje: "El documento o email ya está en uso por otro usuario.",
        });
    }
    res.status(500).json({ estado: false, mensaje: "Error interno" });
  }
};

export const eliminar = async (req, res) => {
  try {
    const [resultado] = await usuariosServicio.eliminar(req.params.id);
    if (!resultado.affectedRows)
      return res
        .status(404)
        .json({ estado: false, mensaje: "Usuario no encontrado" });
    res.status(200).json({ estado: true, mensaje: "Usuario dado de baja." });
  } catch (error) {
    console.log(`Error en DELETE /usuarios/:id ${error}`);
    res.status(500).json({ estado: false, mensaje: "Error interno" });
  }
};