import express from 'express';
import { obtenerVeterinarios, obtenerVeterinarioPorId, crearVeterinario, actualizarVeterinario, eliminarVeterinario } from '../controllers/veterinario.controllers.js';

const router = express.Router();

router.get('/', obtenerVeterinarios);
router.get('/:id', obtenerVeterinarioPorId);
router.post('/', crearVeterinario);
router.put('/:id', actualizarVeterinario);
router.delete('/:id', eliminarVeterinario);

export default router;