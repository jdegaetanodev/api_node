import { Router } from "express";
import { validar } from "../middlewares/validar.middleware.js";
import {
  validarId,
  validarCrear,
  validarActualizar,
} from "../dtos/medicosObrasSociales.dto.js";
import TransformarDTO from "../middlewares/transformarDTOs.js";
import * as mosControlador from "../controladores/medicosObrasSociales.controlador.js";

const enrutador = Router();
const transformar = new TransformarDTO();

enrutador.get("/", mosControlador.obtenerTodos);
enrutador.get("/:id", validarId, validar, mosControlador.obtenerUno);
enrutador.post(
  "/",
  validarCrear,
  validar,
  transformar.medicosObrasSocialesCrearDTO,
  mosControlador.crear,
);
enrutador.put(
  "/:id",
  validarActualizar,
  validar,
  transformar.medicosObrasSocialesActualizarDTO,
  mosControlador.actualizar,
);
enrutador.delete("/:id", validarId, validar, mosControlador.eliminar);

export default enrutador;
