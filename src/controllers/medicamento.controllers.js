import { supabase } from '../config/supabase.js';

export const obtenerMedicamentos = async (req, res) => {
    try {
        const { data, error } = await supabase.from('medicamento').select('*');
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerMedicamentoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('medicamento').select('*').eq('id_medicamento', id).single();
        if (error) throw error;
        if (!data) return res.status(404).json({ mensaje: 'Medicamento no encontrado' });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};