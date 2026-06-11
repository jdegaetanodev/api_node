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
  body("id_especialidad")
    .notEmpty()
    .withMessage("El id_especialidad es requerido")
    .isInt({ min: 1 })
    .withMessage("Debe ser un ID de especialidad válido"),
  body("matricula")
    .notEmpty()
    .withMessage("La matrícula es requerida")
    .isInt({ min: 1 })
    .withMessage("Debe ser un número de matrícula válido"),
  body("descripcion")
    .optional()
    .isString()
    .withMessage("La descripción debe ser un texto"),
  body("valor_consulta")
    .notEmpty()
    .withMessage("El valor de la consulta es requerido")
    .isFloat({ min: 0 })
    .withMessage("Debe ser un valor numérico positivo"),
];

export const validarActualizar = [
  ...validarId,
  body("id_especialidad")
    .optional()
    .isInt({ min: 1 })
    .withMessage("ID de especialidad inválido"),
  body("matricula")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Matrícula inválida"),
  body("descripcion").optional().isString(),
  body("valor_consulta")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Valor de consulta inválido"),
];
