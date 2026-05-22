import { supabase } from '../config/supabase.js';

export const obtenerDetallesFactura = async (req, res) => {
    try {
        const { data, error } = await supabase.from('detalle_factura').select('*');
        if (error) throw error;
        res.json(data);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const obtenerDetalleFacturaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('detalle_factura').select('*').eq('id_detalle', id).single();
        if (error) throw error;
        if (!data) return res.status(404).json({ mensaje: 'Detalle no encontrado' });
        res.json(data);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const crearDetalleFactura = async (req, res) => {
    try {
        const { data, error } = await supabase.from('detalle_factura').insert([req.body]).select();
        if (error) throw error;
        res.status(201).json({ mensaje: 'Detalle registrado con éxito', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const actualizarDetalleFactura = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('detalle_factura').update(req.body).eq('id_detalle', id).select();
        if (error) throw error;
        res.json({ mensaje: 'Detalle actualizado', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const eliminarDetalleFactura = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('detalle_factura').delete().eq('id_detalle', id).select();
        if (error) throw error;
        res.json({ mensaje: 'Detalle eliminado físicamente', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};