import { Router } from 'express';
import { validar } from '../middlewares/validar.middleware.js';
import { validarId, validarCrear, validarActualizar } from '../dtos/obras_sociales.dto.js';
import TransformarDTO from '../middlewares/transformarDTOs.js';
import * as obrasSocialesControlador from '../controladores/obras_sociales.controlador.js';

const enrutador = Router();
const transformar = new TransformarDTO();

enrutador.get('/',       obrasSocialesControlador.obtenerTodos);
enrutador.get('/:id',    validarId, validar, obrasSocialesControlador.obtenerUno);
enrutador.post('/',      validarCrear, validar, transformar.obrasSocialesCrearDTO, obrasSocialesControlador.crear);
enrutador.put('/:id',    validarActualizar, validar, transformar.obrasSocialesActualizarDTO, obrasSocialesControlador.actualizar);
enrutador.delete('/:id', validarId, validar, obrasSocialesControlador.eliminar);

export default enrutador;
