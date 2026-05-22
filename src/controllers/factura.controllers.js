import { supabase } from '../config/supabase.js';

export const obtenerFacturas = async (req, res) => {
    try {
        const { data, error } = await supabase.from('factura').select('*');
        if (error) throw error;
        res.json(data);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const obtenerFacturaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('factura').select('*').eq('id_factura', id).single();
        if (error) throw error;
        if (!data) return res.status(404).json({ mensaje: 'Factura no encontrada' });
        res.json(data);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const crearFactura = async (req, res) => {
    try {
        const { data, error } = await supabase.from('factura').insert([req.body]).select();
        if (error) throw error;
        res.status(201).json({ mensaje: 'Factura generada con éxito', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const actualizarFactura = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('factura').update(req.body).eq('id_factura', id).select();
        if (error) throw error;
        res.json({ mensaje: 'Factura actualizada', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const eliminarFactura = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('factura').update({ estado: 'Anulada' }).eq('id_factura', id).select();
        if (error) throw error;
        res.json({ mensaje: 'Factura anulada en el sistema', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};