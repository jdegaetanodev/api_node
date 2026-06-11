import * as especialidadesServicio from '../servicios/especialidades.servicio.js';

export const obtenerTodos = async (req, res) => {
  try {
    const [especialidades] = await especialidadesServicio.obtenerTodos();
    res.status(200).json({ estado: true, mensaje: 'Especialidades encontradas.', especialidades });
  } catch (error) {
    console.log(`Error en GET /especialidades ${error}`);
    res.status(500).json({ estado: false, mensaje: 'Error interno' });
  }
};

export const obtenerUno = async (req, res) => {
  try {
    const [filas] = await especialidadesServicio.obtenerUno(req.params.id);
    if (!filas.length)
      return res.status(404).json({ estado: false, mensaje: 'Especialidad no encontrada' });
    res.status(200).json({ estado: true, mensaje: 'Especialidad encontrada.', especialidad: filas[0] });
  } catch (error) {
    console.log(`Error en GET /especialidades/:id ${error}`);
    res.status(500).json({ estado: false, mensaje: 'Error interno' });
  }
};

export const crear = async (req, res) => {
  try {
    const [resultado] = await especialidadesServicio.crear(req.dto);
    res.status(201).json({ estado: true, mensaje: 'Especialidad creada.', id: resultado.insertId });
  } catch (error) {
    console.log(`Error en POST /especialidades ${error}`);
    res.status(500).json({ estado: false, mensaje: 'Error interno' });
  }
};

export const actualizar = async (req, res) => {
  try {
    const [resultado] = await especialidadesServicio.actualizar(req.dto, req.params.id);
    if (!resultado.affectedRows)
      return res.status(404).json({ estado: false, mensaje: 'Especialidad no encontrada' });
    res.status(200).json({ estado: true, mensaje: 'Especialidad actualizada.' });
  } catch (error) {
    console.log(`Error en PUT /especialidades/:id ${error}`);
    res.status(500).json({ estado: false, mensaje: 'Error interno' });
  }
};

export const eliminar = async (req, res) => {
  try {
    const [resultado] = await especialidadesServicio.eliminar(req.params.id);
    if (!resultado.affectedRows)
      return res.status(404).json({ estado: false, mensaje: 'Especialidad no encontrada' });
    res.status(200).json({ estado: true, mensaje: 'Especialidad dada de baja.' });
  } catch (error) {
    console.log(`Error en DELETE /especialidades/:id ${error}`);
    res.status(500).json({ estado: false, mensaje: 'Error interno' });
  }
};
