import express from 'express';
import { obtenerCitas, obtenerCitaPorId } from '../controllers/cita.controllers.js';

const router = express.Router();

router.get('/', obtenerCitas);
router.get('/:id', obtenerCitaPorId);

export default router;