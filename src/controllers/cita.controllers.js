import { supabase } from '../config/supabase.js';

export const obtenerCitas = async (req, res) => {
    try {
        const { data, error } = await supabase.from('cita').select('*');
        if (error) throw error;
        res.json(data);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const obtenerCitaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('cita').select('*').eq('id_cita', id).single();
        if (error) throw error;
        if (!data) return res.status(404).json({ mensaje: 'Cita no encontrada' });
        res.json(data);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const crearCita = async (req, res) => {
    try {
        const { data, error } = await supabase.from('cita').insert([{ ...req.body, activo: true }]).select();
        if (error) throw error;
        res.status(201).json({ mensaje: 'Cita registrada con éxito', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const actualizarCita = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('cita').update(req.body).eq('id_cita', id).select();
        if (error) throw error;
        res.json({ mensaje: 'Cita actualizada con éxito', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const eliminarCita = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('cita').update({ activo: false }).eq('id_cita', id).select();
        if (error) throw error;
        res.json({ mensaje: 'Cita inactivada en el sistema', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};