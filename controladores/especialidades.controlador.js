import * as especialidadesServicio from '../servicios/especialidades.servicio.js';

export const obtenerTodos = async (req, res) => {
  try {
    const [especialidades] = await especialidadesServicio.obtenerTodos();
    res.status(200).json({ estado: 'ok', especialidades });
  } catch (error) {
    console.log(error);
    res.status(500).json({ estado: 'error', mensaje: 'Error en el servidor' });
  }
};

export const obtenerUno = async (req, res) => {
  try {
    const [filas] = await especialidadesServicio.obtenerUno(req.params.id);
    if (!filas.length)
      return res.status(404).json({ estado: 'error', mensaje: 'Especialidad no encontrada' });
    res.status(200).json({ estado: 'ok', especialidad: filas[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ estado: 'error', mensaje: 'Error en el servidor' });
  }
};

export const crear = async (req, res) => {
  try {
    const [resultado] = await especialidadesServicio.crear(req.body.nombre);
    res.status(201).json({ estado: 'ok', mensaje: 'Especialidad creada', id: resultado.insertId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ estado: 'error', mensaje: 'Error en el servidor' });
  }
};

export const actualizar = async (req, res) => {
  try {
    const [resultado] = await especialidadesServicio.actualizar(req.body.nombre, req.params.id);
    if (!resultado.affectedRows)
      return res.status(404).json({ estado: 'error', mensaje: 'Especialidad no encontrada' });
    res.status(200).json({ estado: 'ok', mensaje: 'Especialidad actualizada' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ estado: 'error', mensaje: 'Error al actualizar' });
  }
};

export const eliminar = async (req, res) => {
  try {
    const [resultado] = await especialidadesServicio.eliminar(req.params.id);
    if (!resultado.affectedRows)
      return res.status(404).json({ estado: 'error', mensaje: 'Especialidad no encontrada' });
    res.status(200).json({ estado: 'ok', mensaje: 'Especialidad dada de baja' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ estado: 'error', mensaje: 'Error al eliminar' });
  }
};