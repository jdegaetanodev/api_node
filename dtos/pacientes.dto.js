import { body, param } from "express-validator";

export const validarId = [
  param("id").isInt({ min: 1 }).withMessage("ID inválido"),
];

export const validarCrear = [
  body("id_usuario")
    .notEmpty()
    .withMessage("El id_usuario es requerido")
    .isInt({ min: 1 })
    .withMessage("Debe ser un ID de usuario válido"),
  body("id_obra_social")
    .notEmpty()
    .withMessage("El id_obra_social es requerido")
    .isInt({ min: 1 })
    .withMessage("Debe ser un ID de obra social válido"),
];

export const validarActualizar = [
  ...validarId,
  body("id_obra_social")
    .optional()
    .isInt({ min: 1 })
    .withMessage("ID de obra social inválido"),
];