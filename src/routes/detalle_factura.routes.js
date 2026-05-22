import express from 'express';
import { obtenerDetallesFactura, obtenerDetalleFacturaPorId, crearDetalleFactura, actualizarDetalleFactura, eliminarDetalleFactura } from '../controllers/detalle_factura.controllers.js';

const router = express.Router();

router.get('/', obtenerDetallesFactura);
router.get('/:id', obtenerDetalleFacturaPorId);
router.post('/', crearDetalleFactura);
router.put('/:id', actualizarDetalleFactura);
router.delete('/:id', eliminarDetalleFactura);

export default router;