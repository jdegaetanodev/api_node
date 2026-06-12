import { Router } from 'express';
import { login } from '../controladores/auth.controlador.js';

const enrutador = Router();

// Endpoint para el inicio de sesión
enrutador.post('/login', login);

export default enrutador;