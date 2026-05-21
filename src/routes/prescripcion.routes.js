import express from 'express';
import { obtenerPrescripciones, obtenerPrescripcionPorId } from '../controllers/prescripcion.controllers.js';

const router = express.Router();

router.get('/', obtenerPrescripciones);
router.get('/:id', obtenerPrescripcionPorId);

export default router;