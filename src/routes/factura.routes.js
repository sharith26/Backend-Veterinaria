import express from 'express';
import { obtenerFacturas, obtenerFacturaPorId, crearFactura, actualizarFactura, eliminarFactura } from '../controllers/factura.controllers.js';

const router = express.Router();

router.get('/', obtenerFacturas);
router.get('/:id', obtenerFacturaPorId);
router.post('/', crearFactura);
router.put('/:id', actualizarFactura);
router.delete('/:id', eliminarFactura);

export default router;