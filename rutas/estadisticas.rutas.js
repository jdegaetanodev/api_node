import { Router } from 'express';
import { obtenerEstadisticas } from '../controladores/estadisticas.controlador.js';
import { descargarReportePDF } from '../controladores/informes.controlador.js'; 
import { verificarToken, esAdmin } from '../middlewares/auth.middleware.js';

const enrutador = Router();

enrutador.get('/', verificarToken, esAdmin, obtenerEstadisticas);
enrutador.get('/pdf', verificarToken, esAdmin, descargarReportePDF);

export default enrutador;