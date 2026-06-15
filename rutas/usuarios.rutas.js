import { Router } from "express";
import { validar } from "../middlewares/validar.middleware.js";
import {
  validarId,
  validarCrear,
  validarActualizar,
} from "../dtos/usuarios.dto.js";
import TransformarDTO from "../middlewares/transformarDTOs.js";
import * as usuariosControlador from "../controladores/usuarios.controlador.js";
import { upload } from "../middlewares/multer.middleware.js";

const enrutador = Router();
const transformar = new TransformarDTO();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión de usuarios del sistema
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *       500:
 *         description: Error interno del servidor
 */
enrutador.get("/", usuariosControlador.obtenerTodos);

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 *       422:
 *         description: ID inválido
 */
enrutador.get("/:id", validarId, validar, usuariosControlador.obtenerUno);

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - documento
 *               - apellido
 *               - nombres
 *               - email
 *               - contrasenia
 *               - rol
 *             properties:
 *               documento:
 *                 type: string
 *                 example: "31000111"
 *               apellido:
 *                 type: string
 *                 example: Lopez
 *               nombres:
 *                 type: string
 *                 example: Marcelo
 *               email:
 *                 type: string
 *                 example: lopmar@correo.com
 *               contrasenia:
 *                 type: string
 *                 example: claveSegura123
 *               rol:
 *                 type: integer
 *                 description: 1 = Médico, 2 = Paciente, 3 = Administrador
 *                 example: 1
 *               foto:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito
 *       400:
 *         description: Datos duplicados
 *       422:
 *         description: Error de validación
 */
enrutador.post(
  "/",
  upload.single('foto'),
  validarCrear,
  validar,
  transformar.usuariosCrearDTO,
  usuariosControlador.crear,
);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Actualiza los datos de un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               documento:
 *                 type: string
 *               apellido:
 *                 type: string
 *               nombres:
 *                 type: string
 *               email:
 *                 type: string
 *               contrasenia:
 *                 type: string
 *               rol:
 *                 type: integer
 *               foto:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       400:
 *         description: Sin datos para actualizar o duplicados
 *       404:
 *         description: Usuario no encontrado
 *       422:
 *         description: Error de validación
 */
enrutador.put(
  "/:id",
  upload.single('foto'),
  validarActualizar,
  validar,
  transformar.usuariosActualizarDTO,
  usuariosControlador.actualizar,
);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Da de baja un usuario (soft delete)
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario dado de baja correctamente
 *       404:
 *         description: Usuario no encontrado
 *       422:
 *         description: ID inválido
 */
enrutador.delete("/:id", validarId, validar, usuariosControlador.eliminar);

export default enrutador;