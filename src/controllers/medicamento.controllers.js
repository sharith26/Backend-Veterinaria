import { supabase } from '../config/supabase.js';

export const obtenerMedicamentos = async (req, res) => {
    try {
        const { data, error } = await supabase.from('medicamento').select('*');
        if (error) throw error;
        res.json(data);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const obtenerMedicamentoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('medicamento').select('*').eq('id_medicamento', id).single();
        if (error) throw error;
        if (!data) return res.status(404).json({ mensaje: 'Medicamento no encontrado' });
        res.json(data);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const crearMedicamento = async (req, res) => {
    try {
        const { data, error } = await supabase.from('medicamento').insert([{ ...req.body, activo: true }]).select();
        if (error) throw error;
        res.status(201).json({ mensaje: 'Medicamento registrado con éxito', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const actualizarMedicamento = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('medicamento').update(req.body).eq('id_medicamento', id).select();
        if (error) throw error;
        res.json({ mensaje: 'Medicamento actualizado con éxito', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const eliminarMedicamento = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('medicamento').update({ activo: false }).eq('id_medicamento', id).select();
        if (error) throw error;
        res.json({ mensaje: 'Medicamento dado de baja (Inactivado)', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};