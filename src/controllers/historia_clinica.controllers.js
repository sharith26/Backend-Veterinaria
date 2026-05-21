import { supabase } from '../config/supabase.js';

export const obtenerHistoriasClinicas = async (req, res) => {
    try {
        const { data, error } = await supabase.from('historia_clinica').select('*');
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerHistoriaClinicaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('historia_clinica').select('*').eq('id_historia', id).single();
        if (error) throw error;
        if (!data) return res.status(404).json({ mensaje: 'Historia clínica no encontrada' });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};