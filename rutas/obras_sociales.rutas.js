import { Router } from "express";
import { validar } from "../middlewares/validar.middleware.js";
import {
  validarId,
  validarCrear,
  validarActualizar,
} from "../dtos/medicosObrasSociales.dto.js";
import TransformarDTO from "../middlewares/transformarDTOs.js";
import * as mosControlador from "../controladores/medicosObrasSociales.controlador.js";

// IMPORTAMOS LOS MIDDLEWARES DE AUTENTICACIÓN
import { verificarToken, esAdmin } from "../middlewares/auth.middleware.js";

const enrutador = Router();
const transformar = new TransformarDTO();

enrutador.get("/", mosControlador.obtenerTodos);
enrutador.get("/:id", validarId, validar, mosControlador.obtenerUno);

// Rutas de escritura protegidas para el Administrador
enrutador.post(
  "/",
  verificarToken,
  esAdmin,
  validarCrear,
  validar,
  transformar.medicosObrasSocialesCrearDTO,
  mosControlador.crear,
);
enrutador.put(
  "/:id",
  verificarToken,
  esAdmin,
  validarActualizar,
  validar,
  transformar.medicosObrasSocialesActualizarDTO,
  mosControlador.actualizar,
);
enrutador.delete("/:id", verificarToken, esAdmin, validarId, validar, mosControlador.eliminar);

export default enrutador;