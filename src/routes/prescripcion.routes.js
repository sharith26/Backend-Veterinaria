import express from 'express';
import { obtenerPrescripciones, obtenerPrescripcionPorId, crearPrescripcion, actualizarPrescripcion, eliminarPrescripcion } from '../controllers/prescripcion.controllers.js';

const router = express.Router();

router.get('/', obtenerPrescripciones);
router.get('/:id', obtenerPrescripcionPorId);
router.post('/', crearPrescripcion);
router.put('/:id', actualizarPrescripcion);
router.delete('/:id', eliminarPrescripcion);

export default router;