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
    if (error) return res.status(404).json({ error: "Especie no encontrada" });
    res.json(data);
} catch (error) {
    res.status(500).json({ error: error.message });
    }
};

export const crearEspecie = async (req, res) => {
    try {
    const { nombre_especie } = req.body;
    const { data, error } = await supabase.from('especie').insert([{ nombre_especie }]).select();
    if (error) throw error;
    res.status(201).json(data[0]);
} catch (error) {
    res.status(400).json({ error: error.message });
    }
};

export const actualizarEspecie = async (req, res) => {
    try {
    const { id } = req.params;
    const { nombre_especie } = req.body;
    const { data, error } = await supabase.from('especie').update({ nombre_especie }).eq('id_especie', id).select();
    if (error) throw error;
    res.json(data[0]);
} catch (error) {
    res.status(400).json({ error: error.message });
    }
};

export const eliminarEspecie = async (req, res) => {
    try {
    const { id } = req.params;
    const { error } = await supabase.from('especie').delete().eq('id_especie', id);
    if (error) throw error;
    res.json({ message: "Especie eliminada correctamente" });
} catch (error) {
    res.status(400).json({ error: error.message });
    }
};