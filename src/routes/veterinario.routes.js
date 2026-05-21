import express from 'express';
import { obtenerVeterinarios, obtenerVeterinarioPorId } from '../controllers/veterinario.controllers.js';

const router = express.Router();

router.get('/', obtenerVeterinarios);
router.get('/:id', obtenerVeterinarioPorId);

export default router;