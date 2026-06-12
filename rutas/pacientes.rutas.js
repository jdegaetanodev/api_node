import { Router } from "express";
import { validar } from "../middlewares/validar.middleware.js";
import {
  validarId,
  validarCrear,
  validarActualizar,
} from "../dtos/pacientes.dto.js";
import TransformarDTO from "../middlewares/transformarDTOs.js";
import * as pacientesControlador from "../controladores/pacientes.controlador.js";

// IMPORTAMOS LOS MIDDLEWARES DE AUTENTICACIÓN
import { verificarToken, esAdmin } from "../middlewares/auth.middleware.js";

const enrutador = Router();
const transformar = new TransformarDTO();

enrutador.get("/", pacientesControlador.obtenerTodos);
enrutador.get("/:id", validarId, validar, pacientesControlador.obtenerUno);

// Rutas de escritura protegidas para el Administrador
enrutador.post(
  "/",
  verificarToken,
  esAdmin,
  validarCrear,
  validar,
  transformar.pacientesCrearDTO,
  pacientesControlador.crear,
);
enrutador.put(
  "/:id",
  verificarToken,
  esAdmin,
  validarActualizar,
  validar,
  transformar.pacientesActualizarDTO,
  pacientesControlador.actualizar,
);
enrutador.delete("/:id", verificarToken, esAdmin, validarId, validar, pacientesControlador.eliminar);

export default enrutador;