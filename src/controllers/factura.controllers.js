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
    if (error) return res.status(404).json({ error: "Factura no encontrada" });
    res.json(data);
} catch (error) {
    res.status(500).json({ error: error.message });
    }
};

export const crearFactura = async (req, res) => {
    try {
    const { fecha, total, estado, id_cita, id_propietario, id_usuario } = req.body;
    const { data, error } = await supabase.from('factura').insert([{ fecha, total, estado, id_cita, id_propietario, id_usuario }]).select();
    if (error) throw error;
    res.status(201).json(data[0]);
} catch (error) {
    res.status(400).json({ error: error.message });
    }
};

export const actualizarFactura = async (req, res) => {
    try {
    const { id } = req.params;
    const { fecha, total, estado, id_cita, id_propietario, id_usuario } = req.body;
    const { data, error } = await supabase.from('factura').update({ fecha, total, estado, id_cita, id_propietario, id_usuario }).eq('id_factura', id).select();
    if (error) throw error;
    res.json(data[0]);
} catch (error) {
    res.status(400).json({ error: error.message });
    }
};

export const eliminarFactura = async (req, res) => {
    try {
    const { id } = req.params;
    const { error } = await supabase.from('factura').delete().eq('id_factura', id);
    if (error) throw error;
    res.json({ message: "Factura eliminada correctamente" });
} catch (error) {
    res.status(400).json({ error: error.message });
    }
};