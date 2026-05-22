import { supabase } from '../config/supabase.js';

export const obtenerRoles = async (req, res) => {
    try {
    const { data, error } = await supabase.from('rol').select('*');
    if (error) throw error;
    res.json(data);
} catch (error) {
    res.status(500).json({ error: error.message });
    }
};

export const obtenerRolPorId = async (req, res) => {
    try {
    const { id } = req.params;
    const { data, error } = await supabase.from('rol').select('*').eq('id_rol', id).single();
    if (error) return res.status(404).json({ error: "Rol no encontrado" });
    res.json(data);
} catch (error) {
    res.status(500).json({ error: error.message });
    }
};

export const crearRol = async (req, res) => {
    try {
    const { nombre_rol, descripcion } = req.body;
    const { data, error } = await supabase.from('rol').insert([{ nombre_rol, descripcion }]).select();
    if (error) throw error;
    res.status(201).json(data[0]);
} catch (error) {
    res.status(400).json({ error: error.message });
    }
};

export const actualizarRol = async (req, res) => {
    try {
    const { id } = req.params;
    const { nombre_rol, descripcion } = req.body;
    const { data, error } = await supabase.from('rol').update({ nombre_rol, descripcion }).eq('id_rol', id).select();
    if (error) throw error;
    res.json(data[0]);
} catch (error) {
    res.status(400).json({ error: error.message });
    }
};

export const eliminarRol = async (req, res) => {
    try {
    const { id } = req.params;
    const { error } = await supabase.from('rol').delete().eq('id_rol', id);
    if (error) throw error;
    res.json({ message: "Rol eliminado correctamente" });
} catch (error) {
    res.status(400).json({ error: error.message });
    }
};