import { supabase } from '../config/supabase.js';

export const obtenerPropietarios = async (req, res) => {
    try {
        const { data, error } = await supabase.from('propietario').select('*');
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerPropietarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('propietario').select('*').eq('id_propietario', id).single();
        if (error) throw error;
        if (!data) return res.status(404).json({ mensaje: 'Propietario no encontrado' });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};