import express from 'express';
import { 
    obtenerPropietarios, 
    obtenerPropietarioPorId 
} from '../controllers/propietario.controllers.js';

const router = express.Router();

router.get('/', obtenerPropietarios);
router.get('/:id', obtenerPropietarioPorId);

export default router;