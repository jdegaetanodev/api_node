import { Router } from 'express';
import { validar } from '../middlewares/validar.middleware.js';
import { validarId, validarCrear, validarActualizar } from '../dtos/especialidades.dto.js';
import TransformarDTO from '../middlewares/transformarDTOs.js';
import * as especialidadesControlador from '../controladores/especialidades.controlador.js';

const enrutador = Router();
const transformar = new TransformarDTO();

enrutador.get('/',       especialidadesControlador.obtenerTodos);
enrutador.get('/:id',    validarId, validar, especialidadesControlador.obtenerUno);
enrutador.post('/',      validarCrear, validar, transformar.especialidadesCrearDTO, especialidadesControlador.crear);
enrutador.put('/:id',    validarActualizar, validar, transformar.especialidadesActualizarDTO, especialidadesControlador.actualizar);
enrutador.delete('/:id', validarId, validar, especialidadesControlador.eliminar);

export default enrutador;
