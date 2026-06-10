import * as obrasSocialesServicio from '../servicios/obras_sociales.servicio.js';

export const obtenerTodos = async (req, res) => {
  try {
    const [obrasSociales] = await obrasSocialesServicio.obtenerTodos();
    res.status(200).json({ estado: 'ok', obrasSociales });
  } catch (error) {
    console.log(error);
    res.status(500).json({ estado: 'error', mensaje: 'Error en el servidor' });
  }
};

export const obtenerUno = async (req, res) => {
  try {
    const [filas] = await obrasSocialesServicio.obtenerUno(req.params.id);
    if (!filas.length)
      return res.status(404).json({ estado: 'error', mensaje: 'Obra social no encontrada' });
    res.status(200).json({ estado: 'ok', obraSocial: filas[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ estado: 'error', mensaje: 'Error en el servidor' });
  }
};

export const crear = async (req, res) => {
  try {
    const [resultado] = await obrasSocialesServicio.crear(req.dto);
    res.status(201).json({ estado: 'ok', mensaje: 'Obra social creada', id: resultado.insertId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ estado: 'error', mensaje: 'Error en el servidor' });
  }
};

export const actualizar = async (req, res) => {
  try {
    const [resultado] = await obrasSocialesServicio.actualizar(req.dto, req.params.id);
    if (!resultado.affectedRows)
      return res.status(404).json({ estado: 'error', mensaje: 'Obra social no encontrada' });
    res.status(200).json({ estado: 'ok', mensaje: 'Obra social actualizada' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ estado: 'error', mensaje: 'Error al actualizar' });
  }
};

export const eliminar = async (req, res) => {
  try {
    const [resultado] = await obrasSocialesServicio.eliminar(req.params.id);
    if (!resultado.affectedRows)
      return res.status(404).json({ estado: 'error', mensaje: 'Obra social no encontrada' });
    res.status(200).json({ estado: 'ok', mensaje: 'Obra social dada de baja' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ estado: 'error', mensaje: 'Error al eliminar' });
  }
};