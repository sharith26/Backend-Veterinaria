import { supabase } from '../config/supabase.js';

export const obtenerCitas = async (req, res) => {
    try {
        const { data, error } = await supabase.from('cita').select('*');
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerCitaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('cita').select('*').eq('id_cita', id).single();
        if (error) throw error;
        if (!data) return res.status(404).json({ mensaje: 'Cita no encontrada' });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};