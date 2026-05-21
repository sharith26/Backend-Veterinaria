import { supabase } from '../config/supabase.js';

export const obtenerUsuarios = async (req, res) => {
    try {
        const { data, error } = await supabase.from('usuario').select('*');
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('usuario').select('*').eq('id_usuario', id).single();
        if (error) throw error;
        if (!data) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};