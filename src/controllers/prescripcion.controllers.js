import { supabase } from '../config/supabase.js';

export const obtenerPrescripciones = async (req, res) => {
    try {
        const { data, error } = await supabase.from('prescripcion').select('*');
        if (error) throw error;
        res.json(data);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const obtenerPrescripcionPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('prescripcion').select('*').eq('id_prescripcion', id).single();
        if (error) throw error;
        if (!data) return res.status(404).json({ mensaje: 'Prescripción no encontrada' });
        res.json(data);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const crearPrescripcion = async (req, res) => {
    try {
        const { data, error } = await supabase.from('prescripcion').insert([req.body]).select();
        if (error) throw error;
        res.status(201).json({ mensaje: 'Prescripción registrada con éxito', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const actualizarPrescripcion = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('prescripcion').update(req.body).eq('id_prescripcion', id).select();
        if (error) throw error;
        res.json({ mensaje: 'Prescripción actualizada', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const eliminarPrescripcion = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('prescripcion').delete().eq('id_prescripcion', id).select();
        if (error) throw error;
        res.json({ mensaje: 'Prescripción eliminada físicamente del sistema', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};