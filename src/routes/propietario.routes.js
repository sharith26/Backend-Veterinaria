import express from 'express';
import { obtenerPropietarios, obtenerPropietarioPorId, crearPropietario, actualizarPropietario, eliminarPropietario } from '../controllers/propietario.controllers.js';

const router = express.Router();

router.get('/', obtenerPropietarios);
router.get('/:id', obtenerPropietarioPorId);
router.post('/', crearPropietario);
router.put('/:id', actualizarPropietario);
router.delete('/:id', eliminarPropietario);

export default router;