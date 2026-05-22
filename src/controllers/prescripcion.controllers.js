import { supabase } from '../config/supabase.js';

export const obtenerPrescripciones = async (req, res) => {
    try {
    const { data, error } = await supabase.from('prescripcion').select('*');
    if (error) throw error;
    res.json(data);
} catch (error) {
    res.status(500).json({ error: error.message });
    }
};

export const obtenerPrescripcionPorId = async (req, res) => {
    try {
    const { id } = req.params;
    const { data, error } = await supabase.from('prescripcion').select('*').eq('id_prescripcion', id).single();
    if (error) return res.status(404).json({ error: "Prescripción no encontrada" });
    res.json(data);
} catch (error) {
    res.status(500).json({ error: error.message });
    }
};

export const crearPrescripcion = async (req, res) => {
    try {
    const { dosis, cantidad, entregado, id_historia, id_medicamento } = req.body;
    const { data, error } = await supabase.from('prescripcion').insert([{ dosis, cantidad, entregado, id_historia, id_medicamento }]).select();
    if (error) throw error;
    res.status(201).json(data[0]);
} catch (error) {
    res.status(400).json({ error: error.message });
    }
};

export const actualizarPrescripcion = async (req, res) => {
    try {
    const { id } = req.params;
    const { dosis, cantidad, entregado, id_historia, id_medicamento } = req.body;
    const { data, error } = await supabase.from('prescripcion').update({ dosis, cantidad, entregado, id_historia, id_medicamento }).eq('id_prescripcion', id).select();
    if (error) throw error;
    res.json(data[0]);
} catch (error) {
    res.status(400).json({ error: error.message });
    }
};

export const eliminarPrescripcion = async (req, res) => {
    try {
    const { id } = req.params;
    const { error } = await supabase.from('prescripcion').delete().eq('id_prescripcion', id);
    if (error) throw error;
    res.json({ message: "Prescripción eliminada correctamente" });
} catch (error) {
    res.status(400).json({ error: error.message });
    }
};