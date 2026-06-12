import { Router } from 'express';
import { login, solicitarReset, cambiarContraseniaConToken } from '../controladores/auth.controlador.js';
import { validar } from '../middlewares/validar.middleware.js';
import { validarSolicitudReset, validarCambioContrasenia } from '../dtos/auth.dto.js';

const enrutador = Router();

// Endpoint para el inicio de sesión
enrutador.post('/login', login);

// Reinicio de contraseña
enrutador.post('/solicitar-reset', validarSolicitudReset, validar, solicitarReset);
enrutador.post('/ejecutar-reset', validarCambioContrasenia, validar, cambiarContraseniaConToken);

export default enrutador;