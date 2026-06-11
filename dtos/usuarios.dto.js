import { body, param } from "express-validator";

export const validarId = [
  param("id").isInt({ min: 1 }).withMessage("ID inválido"),
];

export const validarCrear = [
  body("documento")
    .notEmpty()
    .withMessage("El documento es requerido")
    .isLength({ max: 20 })
    .withMessage("Máximo 20 caracteres"),
  body("apellido")
    .notEmpty()
    .withMessage("El apellido es requerido")
    .isLength({ max: 100 })
    .withMessage("Máximo 100 caracteres"),
  body("nombres")
    .notEmpty()
    .withMessage("El nombre es requerido")
    .isLength({ max: 100 })
    .withMessage("Máximo 100 caracteres"),
  body("email")
    .notEmpty()
    .withMessage("El email es requerido")
    .isEmail()
    .withMessage("Debe ser un email válido")
    .isLength({ max: 255 })
    .withMessage("Máximo 255 caracteres"),
  body("contrasenia")
    .notEmpty()
    .withMessage("La contraseña es requerida")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
  body("rol")
    .notEmpty()
    .withMessage("El rol es requerido")
    .isInt({ min: 1, max: 3 })
    .withMessage("Rol inválido (1: Médico, 2: Paciente, 3: Administrador)"),
];

export const validarActualizar = [
  ...validarId,
  body("documento")
    .optional()
    .isLength({ max: 20 })
    .withMessage("Máximo 20 caracteres"),
  body("apellido")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Máximo 100 caracteres"),
  body("nombres")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Máximo 100 caracteres"),
  body("email").optional().isEmail().withMessage("Debe ser un email válido"),
  body("contrasenia")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Mínimo 6 caracteres"),
  body("rol").optional().isInt({ min: 1, max: 3 }).withMessage("Rol inválido"),
];
