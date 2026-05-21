import express from 'express';
import {
    obtenerMascotas,
    obtenerMascotaPorId,
    crearMascota,
    actualizarMascota,
    eliminarMascota
} from '../controllers/mascota.controllers.js'; // 💡 Asegurado en singular

const router = express.Router();

router.get('/', obtenerMascotas);
router.get('/:id', obtenerMascotaPorId);
router.post('/', crearMascota);
router.put('/:id', actualizarMascota);
router.delete('/:id', eliminarMascota);

export default router;