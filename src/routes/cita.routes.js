import express from 'express';
import { obtenerCitas, obtenerCitaPorId, crearCita, actualizarCita, eliminarCita } from '../controllers/cita.controllers.js';

const router = express.Router();

router.get('/', obtenerCitas);
router.get('/:id', obtenerCitaPorId);
router.post('/', crearCita);
router.put('/:id', actualizarCita);
router.delete('/:id', eliminarCita);

export default router;