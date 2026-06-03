import express from 'express';
import {
    obtenerCitas,
    obtenerCitaPorId,
    obtenerCitasPorMascota,
    crearCita,
    actualizarCita,
    eliminarCita
} from '../controllers/cita.controllers.js';

const router = express.Router();

router.get('/', obtenerCitas);
// ✅ NUEVO: ruta para filtrar citas por mascota — debe ir ANTES de /:id
router.get('/mascota/:idMascota', obtenerCitasPorMascota);
router.get('/:id', obtenerCitaPorId);
router.post('/', crearCita);
router.put('/:id', actualizarCita);
router.delete('/:id', eliminarCita);

export default router;