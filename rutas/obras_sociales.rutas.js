import { Router } from "express";
import { validar } from "../middlewares/validar.middleware.js";
import {
  validarId,
  validarCrear,
  validarActualizar,
} from "../dtos/obras_sociales.dto.js";
import TransformarDTO from "../middlewares/transformarDTOs.js";
import * as obrasSocialesControlador from "../controladores/obras_sociales.controlador.js";
import { verificarToken, esAdmin } from "../middlewares/auth.middleware.js";

const enrutador = Router();
const transformar = new TransformarDTO();

/**
 * @swagger
 * tags:
 *   name: ObrasSociales
 *   description: Gestión de obras sociales
 */

/**
 * @swagger
 * /obras-sociales:
 *   get:
 *     summary: Obtiene todas las obras sociales activas
 *     tags: [ObrasSociales]
 *     responses:
 *       200:
 *         description: Lista de obras sociales obtenida correctamente
 *       500:
 *         description: Error interno del servidor
 */
enrutador.get("/", obrasSocialesControlador.obtenerTodos);

/**
 * @swagger
 * /obras-sociales/{id}:
 *   get:
 *     summary: Obtiene una obra social por ID
 *     tags: [ObrasSociales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la obra social
 *     responses:
 *       200:
 *         description: Obra social encontrada
 *       404:
 *         description: Obra social no encontrada
 *       422:
 *         description: ID inválido
 */
enrutador.get("/:id", validarId, validar, obrasSocialesControlador.obtenerUno);

/**
 * @swagger
 * /obras-sociales:
 *   post:
 *     summary: Crea una nueva obra social
 *     tags: [ObrasSociales]
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
 *               - descripcion
 *               - porcentaje_descuento
 *               - es_particular
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: OSDE
 *               descripcion:
 *                 type: string
 *                 example: Obra social OSDE
 *               porcentaje_descuento:
 *                 type: number
 *                 example: 15.00
 *               es_particular:
 *                 type: integer
 *                 example: 0
 *     responses:
 *       201:
 *         description: Obra social creada correctamente
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
  transformar.obrasSocialesCrearDTO,
  obrasSocialesControlador.crear,
);

/**
 * @swagger
 * /obras-sociales/{id}:
 *   put:
 *     summary: Actualiza una obra social existente
 *     tags: [ObrasSociales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la obra social
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               porcentaje_descuento:
 *                 type: number
 *               es_particular:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Obra social actualizada correctamente
 *       403:
 *         description: Acceso denegado, se requieren permisos de administrador
 *       404:
 *         description: Obra social no encontrada
 *       422:
 *         description: Error de validación
 */
enrutador.put(
  "/:id",
  verificarToken,
  esAdmin,
  validarActualizar,
  validar,
  transformar.obrasSocialesActualizarDTO,
  obrasSocialesControlador.actualizar,
);

/**
 * @swagger
 * /obras-sociales/{id}:
 *   delete:
 *     summary: Da de baja una obra social (soft delete)
 *     tags: [ObrasSociales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la obra social
 *     responses:
 *       200:
 *         description: Obra social dada de baja correctamente
 *       403:
 *         description: Acceso denegado, se requieren permisos de administrador
 *       404:
 *         description: Obra social no encontrada
 *       422:
 *         description: ID inválido
 */
enrutador.delete("/:id", verificarToken, esAdmin, validarId, validar, obrasSocialesControlador.eliminar);

export default enrutador;
