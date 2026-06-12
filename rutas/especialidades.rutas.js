import { Router } from 'express';
import { validar } from '../middlewares/validar.middleware.js';
import { validarId, validarCrear, validarActualizar } from '../dtos/especialidades.dto.js';
import TransformarDTO from '../middlewares/transformarDTOs.js';
import * as especialidadesControlador from '../controladores/especialidades.controlador.js';
import { verificarToken, esAdmin } from '../middlewares/auth.middleware.js';

const enrutador = Router();
const transformar = new TransformarDTO();

// Las rutas GET las dejamos accesibles porque los pacientes también necesitan listar especialidades
enrutador.get('/',       especialidadesControlador.obtenerTodos);
enrutador.get('/:id',    validarId, validar, especialidadesControlador.obtenerUno);

// Rutas POST, PUT y DELETE protegidas SOLO para Administradores (Rol 3)
enrutador.post('/',      verificarToken, esAdmin, validarCrear, validar, transformar.especialidadesCrearDTO, especialidadesControlador.crear);
enrutador.put('/:id',    verificarToken, esAdmin, validarActualizar, validar, transformar.especialidadesActualizarDTO, especialidadesControlador.actualizar);
enrutador.delete('/:id', verificarToken, esAdmin, validarId, validar, especialidadesControlador.eliminar);

export default enrutador;