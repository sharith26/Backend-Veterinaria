import express from 'express';
import { obtenerEspecies, obtenerEspeciePorId, crearEspecie, actualizarEspecie, eliminarEspecie } from '../controllers/especie.controllers.js';

const router = express.Router();

router.get('/', obtenerEspecies);
router.get('/:id', obtenerEspeciePorId);
router.post('/', crearEspecie);
router.put('/:id', actualizarEspecie);
router.delete('/:id', eliminarEspecie);

export default router;