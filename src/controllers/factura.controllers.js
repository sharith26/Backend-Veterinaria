import { supabase } from '../config/supabase.js';

export const obtenerFacturas = async (req, res) => {
    try {
        const { data, error } = await supabase.from('factura').select('*');
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerFacturaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('factura').select('*').eq('id_factura', id).single();
        if (error) throw error;
        if (!data) return res.status(404).json({ mensaje: 'Factura no encontrada' });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};