import { Router } from "express";
import { validar } from "../middlewares/validar.middleware.js";
import {
  validarId,
  validarCrear,
  validarActualizar,
} from "../dtos/usuarios.dto.js";
import TransformarDTO from "../middlewares/transformarDTOs.js";
import * as usuariosControlador from "../controladores/usuarios.controlador.js";

const enrutador = Router();
const transformar = new TransformarDTO();

enrutador.get("/", usuariosControlador.obtenerTodos);
enrutador.get("/:id", validarId, validar, usuariosControlador.obtenerUno);
enrutador.post(
  "/",
  validarCrear,
  validar,
  transformar.usuariosCrearDTO,
  usuariosControlador.crear,
);
enrutador.put(
  "/:id",
  validarActualizar,
  validar,
  transformar.usuariosActualizarDTO,
  usuariosControlador.actualizar,
);
enrutador.delete("/:id", validarId, validar, usuariosControlador.eliminar);

export default enrutador;
