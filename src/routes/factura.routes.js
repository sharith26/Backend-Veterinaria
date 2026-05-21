import express from 'express';
import { obtenerFacturas, obtenerFacturaPorId } from '../controllers/factura.controllers.js';

const router = express.Router();

router.get('/', obtenerFacturas);
router.get('/:id', obtenerFacturaPorId);

export default router;