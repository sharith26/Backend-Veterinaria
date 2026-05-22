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
    if (error) return res.status(404).json({ error: "Medicamento no encontrado" });
    res.json(data);
} catch (error) {
    res.status(500).json({ error: error.message });
    }
};

export const crearMedicamento = async (req, res) => {
    try {
    const { nombre, principio_act, presentacion, stock, stock_minimo, precio_unitario, activo } = req.body;
    const { data, error } = await supabase.from('medicamento').insert([{ nombre, principio_act, presentacion, stock, stock_minimo, precio_unitario, activo }]).select();
    if (error) throw error;
    res.status(201).json(data[0]);
} catch (error) {
    res.status(400).json({ error: error.message });
    }
};

export const actualizarMedicamento = async (req, res) => {
    try {
    const { id } = req.params;
    const { nombre, principio_act, presentacion, stock, stock_minimo, precio_unitario, activo } = req.body;
    const { data, error } = await supabase.from('medicamento').update({ nombre, principio_act, presentacion, stock, stock_minimo, precio_unitario, activo }).eq('id_medicamento', id).select();
    if (error) throw error;
    res.json(data[0]);
} catch (error) {
    res.status(400).json({ error: error.message });
    }
};

export const eliminarMedicamento = async (req, res) => {
    try {
    const { id } = req.params;
    const { error } = await supabase.from('medicamento').delete().eq('id_medicamento', id);
    if (error) throw error;
    res.json({ message: "Medicamento eliminado correctamente" });
} catch (error) {
    res.status(400).json({ error: error.message });
    }
};