import { supabase } from '../config/supabase.js';

export const obtenerCitas = async (req, res) => {
    try {
    const { data, error } = await supabase.from('cita').select('*');
    if (error) throw error;
    res.json(data);
} catch (error) {
    res.status(500).json({ error: error.message });
    }
};

export const obtenerCitaPorId = async (req, res) => {
    try {
    const { id } = req.params;
    const { data, error } = await supabase.from('cita').select('*').eq('id_cita', id).single();
    if (error) return res.status(404).json({ error: "Cita no encontrada" });
    res.json(data);
} catch (error) {
    res.status(500).json({ error: error.message });
    }
};

export const crearCita = async (req, res) => {
    try {
    const { fecha, hora, motivo, estado, id_mascota, id_veterinario, id_usuario_agenda } = req.body;
    const { data, error } = await supabase.from('cita').insert([{ fecha, hora, motivo, estado, id_mascota, id_veterinario, id_usuario_agenda }]).select();
    if (error) throw error;
    res.status(201).json(data[0]);
} catch (error) {
    res.status(400).json({ error: error.message });
    }
};

export const actualizarCita = async (req, res) => {
    try {
    const { id } = req.params;
    const { fecha, hora, motivo, estado, id_mascota, id_veterinario, id_usuario_agenda } = req.body;
    const { data, error } = await supabase.from('cita').update({ fecha, hora, motivo, estado, id_mascota, id_veterinario, id_usuario_agenda }).eq('id_cita', id).select();
    if (error) throw error;
    res.json(data[0]);
} catch (error) {
    res.status(400).json({ error: error.message });
    }
};

export const eliminarCita = async (req, res) => {
    try {
    const { id } = req.params;
    const { error } = await supabase.from('cita').delete().eq('id_cita', id);
    if (error) throw error;
    res.json({ message: "Cita eliminada correctamente" });
} catch (error) {
    res.status(400).json({ error: error.message });
    }
};