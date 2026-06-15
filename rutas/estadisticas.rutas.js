import { Router } from 'express';
import { obtenerEstadisticas } from '../controladores/estadisticas.controlador.js';
import { descargarReportePDF } from '../controladores/informes.controlador.js'; 
import { verificarToken, esAdmin } from '../middlewares/auth.middleware.js';

const enrutador = Router();

/**
 * @swagger
 * tags:
 *   name: Estadisticas
 *   description: Estadísticas y reportes de atenciones (solo administrador)
 */

/**
 * @swagger
 * /estadisticas:
 *   get:
 *     summary: Obtiene estadísticas de atenciones (generadas mediante stored procedures)
 *     tags: [Estadisticas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estadísticas obtenidas correctamente
 *       403:
 *         description: Acceso denegado, se requieren permisos de administrador
 *       500:
 *         description: Error interno del servidor
 */
enrutador.get('/', verificarToken, esAdmin, obtenerEstadisticas);

/**
 * @swagger
 * /estadisticas/pdf:
 *   get:
 *     summary: Descarga un reporte PDF con estadísticas de turnos, pacientes y obras sociales
 *     tags: [Estadisticas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Archivo PDF generado correctamente
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       403:
 *         description: Acceso denegado, se requieren permisos de administrador
 *       500:
 *         description: Error interno del servidor
 */
enrutador.get('/pdf', verificarToken, esAdmin, descargarReportePDF);

export default enrutador;