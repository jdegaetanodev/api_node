import { Router } from 'express';
import { login, solicitarReset, cambiarContraseniaConToken } from '../controladores/auth.controlador.js';
import { validar } from '../middlewares/validar.middleware.js';
import { validarLogin, validarSolicitudReset, validarCambioContrasenia } from '../dtos/auth.dto.js';

const enrutador = Router();

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Login y recuperación de contraseña
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión y devuelve un token JWT
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - contrasenia
 *             properties:
 *               email:
 *                 type: string
 *                 example: lopmar@correo.com
 *               contrasenia:
 *                 type: string
 *                 example: 2a2646782c5b98ee3084c8734c05f870dbd39a8320e0a2d356acb12083d61bef
 *     responses:
 *       200:
 *         description: Login exitoso, devuelve token y rol
 *       401:
 *         description: Credenciales inválidas
 *       422:
 *         description: Error de validación
 */
enrutador.post('/login', validarLogin, validar, login);

/**
 * @swagger
 * /auth/solicitar-reset:
 *   post:
 *     summary: Solicita un token de recuperación de contraseña
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: lopmar@correo.com
 *     responses:
 *       200:
 *         description: Token de recuperación generado
 *       422:
 *         description: Error de validación
 */
enrutador.post('/solicitar-reset', validarSolicitudReset, validar, solicitarReset);

/**
 * @swagger
 * /auth/ejecutar-reset:
 *   post:
 *     summary: Cambia la contraseña usando un token de recuperación
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - nueva_contrasenia
 *             properties:
 *               token:
 *                 type: string
 *               nueva_contrasenia:
 *                 type: string
 *                 example: nuevaPass123
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente
 *       400:
 *         description: Token inválido o expirado
 *       422:
 *         description: Error de validación
 */
enrutador.post('/ejecutar-reset', validarCambioContrasenia, validar, cambiarContraseniaConToken);

export default enrutador;
