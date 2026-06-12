import { Router } from 'express';
import { obtenerEstadisticas } from '../controladores/estadisticas.controlador.js';
import { verificarToken, esAdmin } from '../middlewares/auth.middleware.js';

const enrutador = Router();

// Endpoint protegido exclusivamente para el administrador
enrutador.get('/', verificarToken, esAdmin, obtenerEstadisticas);

export default enrutador;