import { Router } from "express";
import { validar } from "../middlewares/validar.middleware.js";
import {
  validarId,
  validarCrear,
  validarActualizar,
} from "../dtos/pacientes.dto.js";
import TransformarDTO from "../middlewares/transformarDTOs.js";
import * as pacientesControlador from "../controladores/pacientes.controlador.js";

const enrutador = Router();
const transformar = new TransformarDTO();

enrutador.get("/", pacientesControlador.obtenerTodos);
enrutador.get("/:id", validarId, validar, pacientesControlador.obtenerUno);
enrutador.post(
  "/",
  validarCrear,
  validar,
  transformar.pacientesCrearDTO,
  pacientesControlador.crear,
);
enrutador.put(
  "/:id",
  validarActualizar,
  validar,
  transformar.pacientesActualizarDTO,
  pacientesControlador.actualizar,
);
enrutador.delete("/:id", validarId, validar, pacientesControlador.eliminar);

export default enrutador;
