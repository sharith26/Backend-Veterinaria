import { supabase } from '../config/supabase.js';

export const obtenerDetallesFactura = async (req, res) => {
    try {
        const { data, error } = await supabase.from('detalle_factura').select('*');
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerDetalleFacturaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('detalle_factura').select('*').eq('id_detalle', id).single();
        if (error) throw error;
        if (!data) return res.status(404).json({ mensaje: 'Detalle de factura no encontrado' });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};