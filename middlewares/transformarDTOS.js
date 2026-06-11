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
    const { nombre, descripcion, porcentaje_descuento, es_particular } =
      req.body;

    req.dto = {
      nombre: nombre.trim().toUpperCase(),
      descripcion: descripcion.trim(),
      porcentaje_descuento,
      es_particular,
    };

    next();
  };

  obrasSocialesActualizarDTO = async (req, res, next) => {
    const { nombre, descripcion, porcentaje_descuento, es_particular } =
      req.body;

    const dto = {};

    if (nombre !== undefined) dto.nombre = nombre.trim().toUpperCase();
    if (descripcion !== undefined) dto.descripcion = descripcion.trim();
    if (porcentaje_descuento !== undefined)
      dto.porcentaje_descuento = porcentaje_descuento;
    if (es_particular !== undefined) dto.es_particular = es_particular;

    req.dto = dto;

    next();
  };

  // usuarios
  usuariosCrearDTO = async (req, res, next) => {
    const { documento, apellido, nombres, email, contrasenia, rol } = req.body;

    req.dto = {
      documento: documento.trim(),
      apellido: apellido.trim().toUpperCase(),
      nombres: nombres.trim().toUpperCase(),
      email: email.trim().toLowerCase(),
      contrasenia, 
      foto_path: req.body.foto_path || "",
      rol,
    };

    next();
  };

  usuariosActualizarDTO = async (req, res, next) => {
    const { documento, apellido, nombres, email, contrasenia, rol, foto_path } =
      req.body;
    const dto = {};

    if (documento !== undefined) dto.documento = documento.trim();
    if (apellido !== undefined) dto.apellido = apellido.trim().toUpperCase();
    if (nombres !== undefined) dto.nombres = nombres.trim().toUpperCase();
    if (email !== undefined) dto.email = email.trim().toLowerCase();
    if (contrasenia !== undefined) dto.contrasenia = contrasenia;
    if (foto_path !== undefined) dto.foto_path = foto_path;
    if (rol !== undefined) dto.rol = rol;

    req.dto = dto;
    next();
  };

  // medicos
  medicosCrearDTO = async (req, res, next) => {
    const {
      id_usuario,
      id_especialidad,
      matricula,
      descripcion,
      valor_consulta,
    } = req.body;

    req.dto = {
      id_usuario,
      id_especialidad,
      matricula,
      descripcion: descripcion ? descripcion.trim() : null,
      valor_consulta,
    };

    next();
  };

  medicosActualizarDTO = async (req, res, next) => {
    const { id_especialidad, matricula, descripcion, valor_consulta } =
      req.body;
    const dto = {};

    if (id_especialidad !== undefined) dto.id_especialidad = id_especialidad;
    if (matricula !== undefined) dto.matricula = matricula;
    if (descripcion !== undefined)
      dto.descripcion = descripcion ? descripcion.trim() : null;
    if (valor_consulta !== undefined) dto.valor_consulta = valor_consulta;

    req.dto = dto;
    next();
  };

  // medicos_obras_sociales
  medicosObrasSocialesCrearDTO = async (req, res, next) => {
    const { id_medico, id_obra_social } = req.body;

    req.dto = {
      id_medico,
      id_obra_social,
    };

    next();
  };

  medicosObrasSocialesActualizarDTO = async (req, res, next) => {
    const { id_medico, id_obra_social } = req.body;
    const dto = {};

    if (id_medico !== undefined) dto.id_medico = id_medico;
    if (id_obra_social !== undefined) dto.id_obra_social = id_obra_social;

    req.dto = dto;
    next();
  };

  // pacientes
  pacientesCrearDTO = async (req, res, next) => {
    const { id_usuario, id_obra_social } = req.body;

    req.dto = {
      id_usuario,
      id_obra_social,
    };

    next();
  };

  pacientesActualizarDTO = async (req, res, next) => {
    const { id_obra_social } = req.body;
    const dto = {};

    if (id_obra_social !== undefined) dto.id_obra_social = id_obra_social;

    req.dto = dto;
    next();
  };

  // turnos_reservas
  turnosReservasCrearDTO = async (req, res, next) => {
    const { id_medico, id_paciente, id_obra_social, fecha_hora, atendido } =
      req.body;

    req.dto = {
      id_medico,
      id_paciente,
      id_obra_social,
      fecha_hora,
      atendido: atendido !== undefined ? atendido : 0,
    };

    next();
  };

  turnosReservasActualizarDTO = async (req, res, next) => {
    const { id_medico, id_paciente, id_obra_social, fecha_hora, atendido } =
      req.body;
    const dto = {};

    if (id_medico !== undefined) dto.id_medico = id_medico;
    if (id_paciente !== undefined) dto.id_paciente = id_paciente;
    if (id_obra_social !== undefined) dto.id_obra_social = id_obra_social;
    if (fecha_hora !== undefined) dto.fecha_hora = fecha_hora;
    if (atendido !== undefined) dto.atendido = atendido;

    req.dto = dto;
    next();
  };
}