import { Router } from "express";
import { validar } from "../middlewares/validar.middleware.js";
import {
  validarId,
  validarCrear,
  validarActualizar,
} from "../dtos/medicosObrasSociales.dto.js";
import TransformarDTO from "../middlewares/transformarDTOs.js";
import * as mosControlador from "../controladores/medicosObrasSociales.controlador.js";
import { verificarToken, esAdmin } from "../middlewares/auth.middleware.js";

const enrutador = Router();
const transformar = new TransformarDTO();

/**
 * @swagger
 * tags:
 *   name: MedicosObrasSociales
 *   description: Asociación entre médicos y obras sociales
 */

/**
 * @swagger
 * /medicos-obras-sociales:
 *   get:
 *     summary: Obtiene todas las asociaciones médico-obra social
 *     tags: [MedicosObrasSociales]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de asociaciones obtenida correctamente
 *       403:
 *         description: Acceso denegado, se requieren permisos de administrador
 *       500:
 *         description: Error interno del servidor
 */
enrutador.get("/", verificarToken, esAdmin, mosControlador.obtenerTodos);

/**
 * @swagger
 * /medicos-obras-sociales/{id}:
 *   get:
 *     summary: Obtiene una asociación médico-obra social por ID
 *     tags: [MedicosObrasSociales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la asociación
 *     responses:
 *       200:
 *         description: Asociación encontrada
 *       403:
 *         description: Acceso denegado, se requieren permisos de administrador
 *       404:
 *         description: Asociación no encontrada
 *       422:
 *         description: ID inválido
 */
enrutador.get("/:id", verificarToken, esAdmin, validarId, validar, mosControlador.obtenerUno);

/**
 * @swagger
 * /medicos-obras-sociales:
 *   post:
 *     summary: Asocia un médico con una obra social
 *     tags: [MedicosObrasSociales]
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
 *               - id_obra_social
 *             properties:
 *               id_medico:
 *                 type: integer
 *                 example: 1
 *               id_obra_social:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Asociación creada correctamente
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
  transformar.medicosObrasSocialesCrearDTO,
  mosControlador.crear,
);

/**
 * @swagger
 * /medicos-obras-sociales/{id}:
 *   put:
 *     summary: Actualiza una asociación médico-obra social
 *     tags: [MedicosObrasSociales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la asociación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_medico:
 *                 type: integer
 *               id_obra_social:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Asociación actualizada correctamente
 *       403:
 *         description: Acceso denegado, se requieren permisos de administrador
 *       404:
 *         description: Asociación no encontrada
 *       422:
 *         description: Error de validación
 */
enrutador.put(
  "/:id",
  verificarToken,
  esAdmin,
  validarActualizar,
  validar,
  transformar.medicosObrasSocialesActualizarDTO,
  mosControlador.actualizar,
);

/**
 * @swagger
 * /medicos-obras-sociales/{id}:
 *   delete:
 *     summary: Da de baja una asociación médico-obra social (soft delete)
 *     tags: [MedicosObrasSociales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la asociación
 *     responses:
 *       200:
 *         description: Asociación dada de baja correctamente
 *       403:
 *         description: Acceso denegado, se requieren permisos de administrador
 *       404:
 *         description: Asociación no encontrada
 *       422:
 *         description: ID inválido
 */
enrutador.delete("/:id", verificarToken, esAdmin, validarId, validar, mosControlador.eliminar);

export default enrutador;
