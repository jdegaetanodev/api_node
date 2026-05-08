import { Router } from 'express';
import { body, param } from 'express-validator';
import { validar } from '../middlewares/validar.middleware.js';
import * as especialidadesControlador from '../controladores/especialidades.controlador.js';

const router = Router();

const validarId     = param('id').isInt({ min: 1 }).withMessage('ID inválido');
const validarNombre = body('nombre').notEmpty().withMessage('El nombre es requerido').trim();

router.get('/',       especialidadesControlador.obtenerTodos);
router.get('/:id',    [validarId], validar, especialidadesControlador.obtenerUno);
router.post('/',      [validarNombre], validar, especialidadesControlador.crear);
router.put('/:id',    [validarId, validarNombre], validar, especialidadesControlador.actualizar);
router.delete('/:id', [validarId], validar, especialidadesControlador.eliminar);

export default router;