import express from 'express';
import { obtenerHistoriasClinicas, obtenerHistoriaClinicaPorId, crearHistoriaClinica, actualizarHistoriaClinica, eliminarHistoriaClinica } from '../controllers/historia_clinica.controllers.js';

const router = express.Router();

router.get('/', obtenerHistoriasClinicas);
router.get('/:id', obtenerHistoriaClinicaPorId);
router.post('/', crearHistoriaClinica);
router.put('/:id', actualizarHistoriaClinica);
router.delete('/:id', eliminarHistoriaClinica);

export default router;