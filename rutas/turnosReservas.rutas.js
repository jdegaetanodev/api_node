import { Router } from 'express';
import { validar } from '../middlewares/validar.middleware.js';
import { validarId, validarCrear, validarActualizar, validarCrearReservaPropia } from '../dtos/turnosReservas.dto.js';
import TransformarDTO from '../middlewares/transformarDTOs.js';
import * as turnosControlador from '../controladores/turnosReservas.controlador.js';
import { verificarToken, esAdmin, esMedico, esPaciente } from '../middlewares/auth.middleware.js';

const enrutador = Router();
const transformar = new TransformarDTO();

// Admin: todos los turnos
enrutador.get('/', verificarToken, esAdmin, turnosControlador.obtenerTodos);
enrutador.get('/:id', verificarToken, validarId, validar, turnosControlador.obtenerUno);

// Médico: sus turnos y marcar atendido
enrutador.get('/mis-turnos/medico', verificarToken, esMedico, turnosControlador.obtenerMisTurnosMedico);
enrutador.put('/:id/atendido', verificarToken, esMedico, validarId, validar, turnosControlador.marcarAtendido);

// Paciente: sus turnos y crear reserva propia
enrutador.get('/mis-turnos/paciente', verificarToken, esPaciente, turnosControlador.obtenerMisTurnosPaciente);
enrutador.post('/mis-turnos', verificarToken, esPaciente, validarCrearReservaPropia, validar, transformar.turnosReservasCrearDTO, turnosControlador.crearReservaPropia);

// Admin: crear, modificar y cancelar turnos
enrutador.post('/', verificarToken, esAdmin, validarCrear, validar, transformar.turnosReservasCrearDTO, turnosControlador.crear);
enrutador.put('/:id', verificarToken, esAdmin, validarActualizar, validar, transformar.turnosReservasActualizarDTO, turnosControlador.actualizar);
enrutador.delete('/:id', verificarToken, esAdmin, validarId, validar, turnosControlador.eliminar);

export default enrutador;