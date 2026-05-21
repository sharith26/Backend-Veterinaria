import express from 'express';
import { obtenerUsuarios, obtenerUsuarioPorId } from '../controllers/usuario.controllers.js';

const router = express.Router();

router.get('/', obtenerUsuarios);
router.get('/:id', obtenerUsuarioPorId);

export default router;