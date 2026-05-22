import express from 'express';
import { obtenerMedicamentos, obtenerMedicamentoPorId, crearMedicamento, actualizarMedicamento, eliminarMedicamento } from '../controllers/medicamento.controllers.js';

const router = express.Router();

router.get('/', obtenerMedicamentos);
router.get('/:id', obtenerMedicamentoPorId);
router.post('/', crearMedicamento);
router.put('/:id', actualizarMedicamento);
router.delete('/:id', eliminarMedicamento);

export default router;