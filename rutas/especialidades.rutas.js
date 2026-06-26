import { Router } from 'express';
import { validar } from '../middlewares/validar.middleware.js';
import { validarId, validarCrear, validarActualizar } from '../dtos/especialidades.dto.js';
import TransformarDTO from '../middlewares/transformarDTOs.js';
import * as especialidadesControlador from '../controladores/especialidades.controlador.js';
import { verificarToken, esAdmin } from '../middlewares/auth.middleware.js';

const enrutador = Router();
const transformar = new TransformarDTO();

/**
 * @swagger
 * tags:
 *   name: Especialidades
 *   description: Gestión de especialidades médicas
 */

/**
 * @swagger
 * /especialidades:
 *   get:
 *     summary: Obtiene todas las especialidades activas
 *     tags: [Especialidades]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de especialidades obtenida correctamente
 *       500:
 *         description: Error interno del servidor
 */
enrutador.get('/',       verificarToken, especialidadesControlador.obtenerTodos);

/**
 * @swagger
 * /especialidades/{id}:
 *   get:
 *     summary: Obtiene una especialidad por ID
 *     tags: [Especialidades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la especialidad
 *     responses:
 *       200:
 *         description: Especialidad encontrada
 *       404:
 *         description: Especialidad no encontrada
 *       422:
 *         description: ID inválido
 */
enrutador.get('/:id',    verificarToken, validarId, validar, especialidadesControlador.obtenerUno);

/**
 * @swagger
 * /especialidades:
 *   post:
 *     summary: Crea una nueva especialidad
 *     tags: [Especialidades]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: CARDIOLOGÍA
 *     responses:
 *       201:
 *         description: Especialidad creada correctamente
 *       403:
 *         description: Acceso denegado, se requieren permisos de administrador
 *       422:
 *         description: Error de validación
 */
enrutador.post('/',      verificarToken, esAdmin, validarCrear, validar, transformar.especialidadesCrearDTO, especialidadesControlador.crear);

/**
 * @swagger
 * /especialidades/{id}:
 *   put:
 *     summary: Actualiza una especialidad existente
 *     tags: [Especialidades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la especialidad
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: CARDIOLOGÍA INFANTIL
 *     responses:
 *       200:
 *         description: Especialidad actualizada correctamente
 *       403:
 *         description: Acceso denegado, se requieren permisos de administrador
 *       404:
 *         description: Especialidad no encontrada
 *       422:
 *         description: Error de validación
 */
enrutador.put('/:id',    verificarToken, esAdmin, validarActualizar, validar, transformar.especialidadesActualizarDTO, especialidadesControlador.actualizar);

/**
 * @swagger
 * /especialidades/{id}:
 *   delete:
 *     summary: Da de baja una especialidad (soft delete)
 *     tags: [Especialidades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la especialidad
 *     responses:
 *       200:
 *         description: Especialidad dada de baja correctamente
 *       403:
 *         description: Acceso denegado, se requieren permisos de administrador
 *       404:
 *         description: Especialidad no encontrada
 *       422:
 *         description: ID inválido
 */
enrutador.delete('/:id', verificarToken, esAdmin, validarId, validar, especialidadesControlador.eliminar);

export default enrutador;