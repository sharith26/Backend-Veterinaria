import express from 'express';
import { obtenerRazas, obtenerRazaPorId, crearRaza, actualizarRaza, eliminarRaza } from '../controllers/raza.controllers.js';

const router = express.Router();

router.get('/', obtenerRazas);
router.get('/:id', obtenerRazaPorId);
router.post('/', crearRaza);
router.put('/:id', actualizarRaza);
router.delete('/:id', eliminarRaza);

export default router;