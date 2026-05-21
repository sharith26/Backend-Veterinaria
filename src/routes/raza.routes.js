import express from 'express';
import { obtenerRazas, obtenerRazaPorId } from '../controllers/raza.controllers.js';

const router = express.Router();

router.get('/', obtenerRazas);
router.get('/:id', obtenerRazaPorId);

export default router;