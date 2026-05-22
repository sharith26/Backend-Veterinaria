import { supabase } from '../config/supabase.js';

export const obtenerRazas = async (req, res) => {
    try {
        const { data, error } = await supabase.from('raza').select('*');
        if (error) throw error;
        res.json(data);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const obtenerRazaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('raza').select('*').eq('id_raza', id).single();
        if (error) throw error;
        if (!data) return res.status(404).json({ mensaje: 'Raza no encontrada' });
        res.json(data);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const crearRaza = async (req, res) => {
    try {
        const { data, error } = await supabase.from('raza').insert([{ ...req.body, activo: true }]).select();
        if (error) throw error;
        res.status(201).json({ mensaje: 'Raza registrada con éxito', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const actualizarRaza = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('raza').update(req.body).eq('id_raza', id).select();
        if (error) throw error;
        res.json({ mensaje: 'Raza actualizada', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const eliminarRaza = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('raza').update({ activo: false }).eq('id_raza', id).select();
        if (error) throw error;
        res.json({ mensaje: 'Raza inactivada', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};