import express from 'express';
import {
    obtenerMascotas,
    obtenerMascotaPorId,
    crearMascota,
    actualizarMascota,
    eliminarMascota,
    obtenerMedicamentosPorMascota  // ← ¿está importado?
} from '../controllers/mascota.controllers.js';

const router = express.Router();

router.get('/', obtenerMascotas);
router.get('/:id/medicamentos', obtenerMedicamentosPorMascota);  // ← ANTES de /:id
router.get('/:id', obtenerMascotaPorId);
router.post('/', crearMascota);
router.put('/:id', actualizarMascota);
router.delete('/:id', eliminarMascota);

export default router;