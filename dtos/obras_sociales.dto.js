import { body, param } from 'express-validator';

export const validarId = [
  param('id').isInt({ min: 1 }).withMessage('ID inválido')
];

export const validarCrear = [
  body('nombre')
    .notEmpty().withMessage('El nombre es requerido')
    .isLength({ max: 120 }).withMessage('Máximo 120 caracteres'),
  body('descripcion')
    .notEmpty().withMessage('La descripción es requerida')
    .isLength({ max: 255 }).withMessage('Máximo 255 caracteres'),
  body('porcentaje_descuento')
    .notEmpty().withMessage('El porcentaje de descuento es requerido')
    .isDecimal().withMessage('Debe ser un número decimal'),
  body('es_particular')
    .notEmpty().withMessage('El campo es_particular es requerido')
    .isIn([0, 1]).withMessage('Debe ser 0 o 1'),
];

export const validarActualizar = [
  ...validarId,
  ...validarCrear
];