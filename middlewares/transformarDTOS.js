export default class TransformarDTO {

  // especialidades
  especialidadesCrearDTO = async (req, res, next) => {
    const { nombre } = req.body;

    req.dto = {
      nombre: nombre.trim().toUpperCase(),
    };

    next();
  };

  especialidadesActualizarDTO = async (req, res, next) => {
    const { nombre } = req.body;

    const dto = {};

    if (nombre !== undefined) dto.nombre = nombre.trim().toUpperCase();

    req.dto = dto;

    next();
  };

  // obras sociales
  obrasSocialesCrearDTO = async (req, res, next) => {
    const { nombre, descripcion, porcentaje_descuento, es_particular } = req.body;

    req.dto = {
      nombre: nombre.trim().toUpperCase(),
      descripcion: descripcion.trim(),
      porcentaje_descuento,
      es_particular
    };

    next();
  };

  obrasSocialesActualizarDTO = async (req, res, next) => {
    const { nombre, descripcion, porcentaje_descuento, es_particular } = req.body;

    const dto = {};

    if (nombre !== undefined) dto.nombre = nombre.trim().toUpperCase();
    if (descripcion !== undefined) dto.descripcion = descripcion.trim();
    if (porcentaje_descuento !== undefined) dto.porcentaje_descuento = porcentaje_descuento;
    if (es_particular !== undefined) dto.es_particular = es_particular;

    req.dto = dto;

    next();
  };

}