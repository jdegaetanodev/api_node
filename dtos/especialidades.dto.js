import { body, param } from 'express-validator';

export const validarId = [
  param('id').isInt({ min: 1 }).withMessage('ID inválido')
];

export const validarCrear = [
  body('nombre')
    .notEmpty().withMessage('El nombre es requerido')
    .isLength({ max: 120 }).withMessage('Máximo 120 caracteres'),
];

export const validarActualizar = [
  ...validarId,
  ...validarCrear
];
