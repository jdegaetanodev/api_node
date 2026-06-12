import { Router } from 'express';
import { validar } from '../middlewares/validar.middleware.js';
import { validarId, validarCrear, validarActualizar } from '../dtos/turnosReservas.dto.js';
import TransformarDTO from '../middlewares/transformarDTOs.js';
import * as turnosControlador from '../controladores/turnosReservas.controlador.js';
import { verificarToken, esAdmin } from '../middlewares/auth.middleware.js';

const enrutador = Router();
const transformar = new TransformarDTO();

// Obtener todos los turnos (Requisito funcional)
enrutador.get('/', verificarToken, turnosControlador.obtenerTodos);
enrutador.get('/:id', verificarToken, validarId, validar, turnosControlador.obtenerUno);

// Registrar un turno (Solo permitido al Administrador)
enrutador.post('/', verificarToken, esAdmin, validarCrear, validar, transformar.turnosReservasCrearDTO, turnosControlador.crear);

// Modificar o cancelar turnos (Baja lógica)
enrutador.put('/:id', verificarToken, esAdmin, validarActualizar, validar, transformar.turnosReservasActualizarDTO, turnosControlador.actualizar);
enrutador.delete('/:id', verificarToken, esAdmin, validarId, validar, turnosControlador.eliminar);

export default enrutador;