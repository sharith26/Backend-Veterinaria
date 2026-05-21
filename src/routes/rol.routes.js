import express from 'express';
import { obtenerRoles, obtenerRolPorId } from '../controllers/rol.controllers.js';

const router = express.Router();

router.get('/', obtenerRoles);
router.get('/:id', obtenerRolPorId);

export default router;