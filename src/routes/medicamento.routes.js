import express from 'express';
import { obtenerMedicamentos, obtenerMedicamentoPorId } from '../controllers/medicamento.controllers.js';

const router = express.Router();

router.get('/', obtenerMedicamentos);
router.get('/:id', obtenerMedicamentoPorId);

export default router;