import { body, param } from "express-validator";

export const validarId = [
  param("id").isInt({ min: 1 }).withMessage("ID inválido"),
];

export const validarCrear = [
  body("id_medico")
    .notEmpty()
    .withMessage("El id_medico es requerido")
    .isInt({ min: 1 })
    .withMessage("Debe ser un ID de médico válido"),
  body("id_paciente")
    .notEmpty()
    .withMessage("El id_paciente es requerido")
    .isInt({ min: 1 })
    .withMessage("Debe ser un ID de paciente válido"),
  body("id_obra_social")
    .notEmpty()
    .withMessage("El id_obra_social es requerido")
    .isInt({ min: 1 })
    .withMessage("Debe ser un ID de obra social válido"),
  body("fecha_hora")
    .notEmpty()
    .withMessage("La fecha y hora son requeridas")
    .isISO8601()
    .withMessage("Debe ser una fecha y hora válida (Formato ISO8601 o YYYY-MM-DD HH:MM:SS)"),
  body("atendido")
    .optional()
    .isInt({ min: 0, max: 1 })
    .withMessage("El campo atendido debe ser 0 (No) o 1 (Sí)"),
];

export const validarActualizar = [
  ...validarId,
  body("id_medico").optional().isInt({ min: 1 }),
  body("id_paciente").optional().isInt({ min: 1 }),
  body("id_obra_social").optional().isInt({ min: 1 }),
  body("fecha_hora").optional().isISO8601(),
  body("atendido").optional().isInt({ min: 0, max: 1 }),
];

export const validarCrearReservaPropia = [
  body("id_medico")
    .notEmpty().withMessage("El id_medico es requerido")
    .isInt({ min: 1 }).withMessage("Debe ser un ID de médico válido"),
  body("fecha_hora")
    .notEmpty().withMessage("La fecha y hora son requeridas")
    .isISO8601().withMessage("Debe ser una fecha y hora válida"),
  body("atendido")
    .optional()
    .isInt({ min: 0, max: 1 }).withMessage("El campo atendido debe ser 0 o 1"),
];