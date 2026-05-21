import express from 'express';
import { obtenerDetallesFactura, obtenerDetalleFacturaPorId } from '../controllers/detalle_factura.controllers.js';

const router = express.Router();

router.get('/', obtenerDetallesFactura);
router.get('/:id', obtenerDetalleFacturaPorId);

export default router;