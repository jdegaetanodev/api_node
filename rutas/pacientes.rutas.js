import { Router } from "express";
import { validar } from "../middlewares/validar.middleware.js";
import {
  validarId,
  validarCrear,
  validarActualizar,
} from "../dtos/pacientes.dto.js";
import TransformarDTO from "../middlewares/transformarDTOs.js";
import * as pacientesControlador from "../controladores/pacientes.controlador.js";
import { verificarToken, esAdmin } from "../middlewares/auth.middleware.js";

const enrutador = Router();
const transformar = new TransformarDTO();

/**
 * @swagger
 * tags:
 *   name: Pacientes
 *   description: Gestión de pacientes
 */

/**
 * @swagger
 * /pacientes:
 *   get:
 *     summary: Obtiene todos los pacientes
 *     tags: [Pacientes]
 *     responses:
 *       200:
 *         description: Lista de pacientes obtenida correctamente
 *       500:
 *         description: Error interno del servidor
 */
enrutador.get("/", pacientesControlador.obtenerTodos);

/**
 * @swagger
 * /pacientes/{id}:
 *   get:
 *     summary: Obtiene un paciente por ID
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del paciente
 *     responses:
 *       200:
 *         description: Paciente encontrado
 *       404:
 *         description: Paciente no encontrado o inactivo
 *       422:
 *         description: ID inválido
 */
enrutador.get("/:id", validarId, validar, pacientesControlador.obtenerUno);

/**
 * @swagger
 * /pacientes:
 *   post:
 *     summary: Registra un nuevo paciente
 *     tags: [Pacientes]
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
 *               - id_obra_social
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 example: 5
 *               id_obra_social:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Paciente registrado con éxito
 *       400:
 *         description: Datos duplicados o referencias inexistentes
 *       403:
 *         description: Acceso denegado, se requieren permisos de administrador
 *       422:
 *         description: Error de validación
 */
enrutador.post(
  "/",
  verificarToken,
  esAdmin,
  validarCrear,
  validar,
  transformar.pacientesCrearDTO,
  pacientesControlador.crear,
);

/**
 * @swagger
 * /pacientes/{id}:
 *   put:
 *     summary: Actualiza los datos de un paciente
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del paciente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_obra_social:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Datos del paciente actualizados
 *       400:
 *         description: Sin datos para actualizar
 *       403:
 *         description: Acceso denegado, se requieren permisos de administrador
 *       404:
 *         description: Paciente no encontrado
 *       422:
 *         description: Error de validación
 */
enrutador.put(
  "/:id",
  verificarToken,
  esAdmin,
  validarActualizar,
  validar,
  transformar.pacientesActualizarDTO,
  pacientesControlador.actualizar,
);

/**
 * @swagger
 * /pacientes/{id}:
 *   delete:
 *     summary: Da de baja un paciente (soft delete)
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del paciente
 *     responses:
 *       200:
 *         description: Paciente dado de baja correctamente
 *       403:
 *         description: Acceso denegado, se requieren permisos de administrador
 *       404:
 *         description: Paciente no encontrado o ya dado de baja
 *       422:
 *         description: ID inválido
 */
enrutador.delete("/:id", verificarToken, esAdmin, validarId, validar, pacientesControlador.eliminar);

export default enrutador;