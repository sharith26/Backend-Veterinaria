import express from 'express';
import { obtenerEspecies, obtenerEspeciePorId } from '../controllers/especie.controllers.js';

const router = express.Router();

router.get('/', obtenerEspecies);
router.get('/:id', obtenerEspeciePorId);

export default router;