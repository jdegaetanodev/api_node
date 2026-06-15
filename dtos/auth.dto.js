import { body } from 'express-validator';

export const validarLogin = [
  body('email')
    .notEmpty().withMessage('El email es requerido')
    .isEmail().withMessage('Debe ser un email válido'),
  body('contrasenia')
    .notEmpty().withMessage('La contraseña es requerida')
];

export const validarSolicitudReset = [
  body('email')
    .notEmpty().withMessage('El email es requerido')
    .isEmail().withMessage('Debe ser un email válido')
];

export const validarCambioContrasenia = [
  body('token')
    .notEmpty().withMessage('El token de recuperación es requerido'),
  body('nueva_contrasenia')
    .notEmpty().withMessage('La nueva contraseña es requerida')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];