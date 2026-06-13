import { Router } from "express";
import { validar } from "../middlewares/validar.middleware.js";
import { validarId, validarCrear, validarActualizar } from "../dtos/medicos.dto.js";
import TransformarDTO from "../middlewares/transformarDTOs.js";
import * as medicosControlador from "../controladores/medicos.controlador.js";
import { verificarToken, esAdmin } from "../middlewares/auth.middleware.js";

const enrutador = Router();
const transformar = new TransformarDTO();

enrutador.get("/", medicosControlador.obtenerTodos);
enrutador.get("/especialidad/:id", validarId, validar, medicosControlador.obtenerPorEspecialidad);
enrutador.get("/:id", validarId, validar, medicosControlador.obtenerUno);

enrutador.post("/", verificarToken, esAdmin, validarCrear, validar, transformar.medicosCrearDTO, medicosControlador.crear);
enrutador.put("/:id", verificarToken, esAdmin, validarActualizar, validar, transformar.medicosActualizarDTO, medicosControlador.actualizar);
enrutador.delete("/:id", verificarToken, esAdmin, validarId, validar, medicosControlador.eliminar);

export default enrutador;