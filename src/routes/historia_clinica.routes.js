import express from 'express';
import { obtenerHistoriasClinicas, obtenerHistoriaClinicaPorId } from '../controllers/historia_clinica.controllers.js';

const router = express.Router();

router.get('/', obtenerHistoriasClinicas);
router.get('/:id', obtenerHistoriaClinicaPorId);

export default router;