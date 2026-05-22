import { supabase } from '../config/supabase.js';

export const obtenerRazas = async (req, res) => {
    try {
    const { data, error } = await supabase.from('raza').select('*');
    if (error) throw error;
    res.json(data);
} catch (error) {
    res.status(500).json({ error: error.message });
    }
};

export const obtenerRazaPorId = async (req, res) => {
    try {
    const { id } = req.params;
    const { data, error } = await supabase.from('raza').select('*').eq('id_raza', id).single();
    if (error) return res.status(404).json({ error: "Raza no encontrada" });
    res.json(data);
} catch (error) {
    res.status(500).json({ error: error.message });
    }
};

export const crearRaza = async (req, res) => {
    try {
    const { nombre_raza, id_especie } = req.body;
    const { data, error } = await supabase.from('raza').insert([{ nombre_raza, id_especie }]).select();
    if (error) throw error;
    res.status(201).json(data[0]);
} catch (error) {
    res.status(400).json({ error: error.message });
    }
};

export const actualizarRaza = async (req, res) => {
    try {
    const { id } = req.params;
    const { nombre_raza, id_especie } = req.body;
    const { data, error } = await supabase.from('raza').update({ nombre_raza, id_especie }).eq('id_raza', id).select();
    if (error) throw error;
    res.json(data[0]);
} catch (error) {
    res.status(400).json({ error: error.message });
    }
};

export const eliminarRaza = async (req, res) => {
    try {
    const { id } = req.params;
    const { error } = await supabase.from('raza').delete().eq('id_raza', id);
    if (error) throw error;
    res.json({ message: "Raza eliminada correctamente" });
} catch (error) {
    res.status(400).json({ error: error.message });
    }
};