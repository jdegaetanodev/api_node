import { Router } from "express";
import { validar } from "../middlewares/validar.middleware.js";
import { validarId, validarCrear, validarActualizar } from "../dtos/medicos.dto.js";
import TransformarDTO from "../middlewares/transformarDTOs.js";
import * as medicosControlador from "../controladores/medicos.controlador.js";
import { verificarToken, esAdmin, esPacienteOAdmin } from "../middlewares/auth.middleware.js";

const enrutador = Router();
const transformar = new TransformarDTO();

/**
 * @swagger
 * tags:
 *   name: Medicos
 *   description: Gestión de médicos
 */

/**
 * @swagger
 * /medicos:
 *   get:
 *     summary: Obtiene todos los médicos
 *     tags: [Medicos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de médicos obtenida correctamente
 *       500:
 *         description: Error interno del servidor
 */
enrutador.get("/", verificarToken, esPacienteOAdmin, medicosControlador.obtenerTodos);

/**
 * @swagger
 * /medicos/especialidad/{id}:
 *   get:
 *     summary: Obtiene los médicos de una especialidad
 *     tags: [Medicos]
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
 *         description: Lista de médicos de la especialidad
 *       422:
 *         description: ID inválido
 */
enrutador.get("/especialidad/:id", verificarToken, esPacienteOAdmin, validarId, validar, medicosControlador.obtenerPorEspecialidad);

/**
 * @swagger
 * /medicos/{id}:
 *   get:
 *     summary: Obtiene un médico por ID
 *     tags: [Medicos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del médico
 *     responses:
 *       200:
 *         description: Médico encontrado
 *       404:
 *         description: Médico no encontrado o inactivo
 *       422:
 *         description: ID inválido
 */
enrutador.get("/:id", verificarToken, esPacienteOAdmin, validarId, validar, medicosControlador.obtenerUno);

/**
 * @swagger
 * /medicos:
 *   post:
 *     summary: Registra un nuevo médico
 *     tags: [Medicos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_usuario
 *               - id_especialidad
 *               - matricula
 *               - valor_consulta
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 example: 1
 *               id_especialidad:
 *                 type: integer
 *                 example: 1
 *               matricula:
 *                 type: integer
 *                 example: 1000
 *               descripcion:
 *                 type: string
 *                 example: Médico especialista
 *               valor_consulta:
 *                 type: number
 *                 example: 5000.00
 *     responses:
 *       201:
 *         description: Médico registrado con éxito
 *       400:
 *         description: Datos duplicados o referencias inexistentes
 *       403:
 *         description: Acceso denegado, se requieren permisos de administrador
 *       422:
 *         description: Error de validación
 */
enrutador.post("/", verificarToken, esAdmin, validarCrear, validar, transformar.medicosCrearDTO, medicosControlador.crear);

/**
 * @swagger
 * /medicos/{id}:
 *   put:
 *     summary: Actualiza los datos de un médico
 *     tags: [Medicos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del médico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_especialidad:
 *                 type: integer
 *               matricula:
 *                 type: integer
 *               descripcion:
 *                 type: string
 *               valor_consulta:
 *                 type: number
 *     responses:
 *       200:
 *         description: Datos del médico actualizados
 *       400:
 *         description: Datos duplicados o sin datos para actualizar
 *       403:
 *         description: Acceso denegado, se requieren permisos de administrador
 *       404:
 *         description: Médico no encontrado
 *       422:
 *         description: Error de validación
 */
enrutador.put("/:id", verificarToken, esAdmin, validarActualizar, validar, transformar.medicosActualizarDTO, medicosControlador.actualizar);

/**
 * @swagger
 * /medicos/{id}:
 *   delete:
 *     summary: Da de baja un médico (soft delete)
 *     tags: [Medicos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del médico
 *     responses:
 *       200:
 *         description: Médico dado de baja correctamente
 *       403:
 *         description: Acceso denegado, se requieren permisos de administrador
 *       404:
 *         description: Médico no encontrado o ya estaba de baja
 *       422:
 *         description: ID inválido
 */
enrutador.delete("/:id", verificarToken, esAdmin, validarId, validar, medicosControlador.eliminar);

export default enrutador;