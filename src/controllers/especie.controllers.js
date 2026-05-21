import { supabase } from '../config/supabase.js';

export const obtenerEspecies = async (req, res) => {
    try {
        const { data, error } = await supabase.from('especie').select('*');
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerEspeciePorId = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('especie').select('*').eq('id_especie', id).single();
        if (error) throw error;
        if (!data) return res.status(404).json({ mensaje: 'Especie no encontrada' });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};