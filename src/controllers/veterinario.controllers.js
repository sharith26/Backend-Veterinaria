import { supabase } from '../config/supabase.js';

export const obtenerVeterinarios = async (req, res) => {
    try {
        const { data, error } = await supabase.from('veterinario').select('*');
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerVeterinarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('veterinario').select('*').eq('id_veterinario', id).single();
        if (error) throw error;
        if (!data) return res.status(404).json({ mensaje: 'Veterinario no encontrado' });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};