import { Router } from 'express';
import { validar } from '../middlewares/validar.middleware.js';
import { validarId, validarCrear, validarActualizar, validarCrearReservaPropia } from '../dtos/turnosReservas.dto.js';
import TransformarDTO from '../middlewares/transformarDTOs.js';
import * as turnosControlador from '../controladores/turnosReservas.controlador.js';
import { verificarToken, esAdmin, esMedico, esPaciente } from '../middlewares/auth.middleware.js';

const enrutador = Router();
const transformar = new TransformarDTO();

/**
 * @swagger
 * tags:
 *   name: TurnosReservas
 *   description: Gestión de turnos y reservas médicas
 */

/**
 * @swagger
 * /turnos-reservas:
 *   get:
 *     summary: Obtiene todos los turnos (solo administrador)
 *     tags: [TurnosReservas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de turnos obtenida correctamente
 *       403:
 *         description: Acceso denegado, se requieren permisos de administrador
 */
enrutador.get('/', verificarToken, esAdmin, turnosControlador.obtenerTodos);

/**
 * @swagger
 * /turnos-reservas/{id}:
 *   get:
 *     summary: Obtiene un turno por ID
 *     tags: [TurnosReservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del turno
 *     responses:
 *       200:
 *         description: Turno encontrado
 *       404:
 *         description: Turno no encontrado o inactivo
 *       422:
 *         description: ID inválido
 */
enrutador.get('/:id', verificarToken, validarId, validar, turnosControlador.obtenerUno);

/**
 * @swagger
 * /turnos-reservas/mis-turnos/medico:
 *   get:
 *     summary: Lista los turnos propios del médico autenticado
 *     tags: [TurnosReservas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de turnos del médico
 *       403:
 *         description: Acceso denegado, se requieren permisos de médico
 */
enrutador.get('/mis-turnos/medico', verificarToken, esMedico, turnosControlador.obtenerMisTurnosMedico);

/**
 * @swagger
 * /turnos-reservas/{id}/atendido:
 *   put:
 *     summary: Marca un turno como atendido (solo médico)
 *     tags: [TurnosReservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del turno
 *     responses:
 *       200:
 *         description: Turno marcado como atendido
 *       403:
 *         description: Acceso denegado, se requieren permisos de médico
 *       404:
 *         description: Turno no encontrado o ya atendido
 *       422:
 *         description: ID inválido
 */
enrutador.put('/:id/atendido', verificarToken, esMedico, validarId, validar, turnosControlador.marcarAtendido);

/**
 * @swagger
 * /turnos-reservas/mis-turnos/paciente:
 *   get:
 *     summary: Lista los turnos propios del paciente autenticado
 *     tags: [TurnosReservas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de turnos del paciente
 *       403:
 *         description: Acceso denegado, se requieren permisos de paciente
 */
enrutador.get('/mis-turnos/paciente', verificarToken, esPaciente, turnosControlador.obtenerMisTurnosPaciente);

/**
 * @swagger
 * /turnos-reservas/mis-turnos:
 *   post:
 *     summary: Crea una reserva propia (solo paciente)
 *     tags: [TurnosReservas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_medico
 *               - fecha_hora
 *             properties:
 *               id_medico:
 *                 type: integer
 *                 example: 1
 *               fecha_hora:
 *                 type: string
 *                 example: "2026-06-20 10:00:00"
 *               atendido:
 *                 type: integer
 *                 example: 0
 *     responses:
 *       201:
 *         description: Reserva creada con éxito
 *       403:
 *         description: Acceso denegado, se requieren permisos de paciente
 *       422:
 *         description: Error de validación
 */
enrutador.post('/mis-turnos', verificarToken, esPaciente, validarCrearReservaPropia, validar, transformar.turnosReservasCrearDTO, turnosControlador.crearReservaPropia);

/**
 * @swagger
 * /turnos-reservas:
 *   post:
 *     summary: Registra un turno para un paciente, médico y fecha (solo administrador)
 *     tags: [TurnosReservas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_medico
 *               - id_paciente
 *               - id_obra_social
 *               - fecha_hora
 *             properties:
 *               id_medico:
 *                 type: integer
 *                 example: 1
 *               id_paciente:
 *                 type: integer
 *                 example: 1
 *               id_obra_social:
 *                 type: integer
 *                 example: 1
 *               fecha_hora:
 *                 type: string
 *                 example: "2026-06-20 10:00:00"
 *               atendido:
 *                 type: integer
 *                 example: 0
 *     responses:
 *       201:
 *         description: Turno reservado con éxito y valor total calculado
 *       400:
 *         description: Médico, obra social o referencias inexistentes
 *       403:
 *         description: Acceso denegado, se requieren permisos de administrador
 *       422:
 *         description: Error de validación
 */
enrutador.post('/', verificarToken, esAdmin, validarCrear, validar, transformar.turnosReservasCrearDTO, turnosControlador.crear);

/**
 * @swagger
 * /turnos-reservas/{id}:
 *   put:
 *     summary: Modifica un turno existente (solo administrador)
 *     tags: [TurnosReservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del turno
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_medico:
 *                 type: integer
 *               id_paciente:
 *                 type: integer
 *               id_obra_social:
 *                 type: integer
 *               fecha_hora:
 *                 type: string
 *               atendido:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Turno modificado correctamente
 *       400:
 *         description: Sin datos para actualizar
 *       403:
 *         description: Acceso denegado, se requieren permisos de administrador
 *       404:
 *         description: Turno no encontrado
 *       422:
 *         description: Error de validación
 */
enrutador.put('/:id', verificarToken, esAdmin, validarActualizar, validar, transformar.turnosReservasActualizarDTO, turnosControlador.actualizar);

/**
 * @swagger
 * /turnos-reservas/{id}:
 *   delete:
 *     summary: Cancela un turno (soft delete, solo administrador)
 *     tags: [TurnosReservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del turno
 *     responses:
 *       200:
 *         description: Turno cancelado (baja lógica)
 *       403:
 *         description: Acceso denegado, se requieren permisos de administrador
 *       404:
 *         description: Turno no encontrado o ya cancelado
 *       422:
 *         description: ID inválido
 */
enrutador.delete('/:id', verificarToken, esAdmin, validarId, validar, turnosControlador.eliminar);

export default enrutador;