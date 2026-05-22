import { supabase } from '../config/supabase.js';

export const obtenerUsuarios = async (req, res) => {
    try {
    const { data, error } = await supabase.from('usuario').select('id_usuario, nombre_completo, email, activo, telefono, id_rol');
    if (error) throw error;
    res.json(data);
} catch (error) {
    res.status(500).json({ error: error.message });
    }
};

export const obtenerUsuarioPorId = async (req, res) => {
    try {
    const { id } = req.params;
    const { data, error } = await supabase.from('usuario').select('id_usuario, nombre_completo, email, activo, telefono, id_rol').eq('id_usuario', id).single();
    if (error) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(data);
} catch (error) {
    res.status(500).json({ error: error.message });
    }
};

export const crearUsuario = async (req, res) => {
    try {
    const { nombre_completo, email, contrasena, activo, telefono, id_rol } = req.body;
    const { data, error } = await supabase.from('usuario').insert([{ nombre_completo, email, contrasena, activo, telefono, id_rol }]).select();
    if (error) throw error;
    res.status(201).json(data[0]);
} catch (error) {
    res.status(400).json({ error: error.message });
    }
};

export const actualizarUsuario = async (req, res) => {
    try {
    const { id } = req.params;
    const { nombre_completo, email, activo, telefono, id_rol } = req.body;
    const { data, error } = await supabase.from('usuario').update({ nombre_completo, email, activo, telefono, id_rol }).eq('id_usuario', id).select();
    if (error) throw error;
    res.json(data[0]);
} catch (error) {
    res.status(400).json({ error: error.message });
    }
};

export const eliminarUsuario = async (req, res) => {
    try {
    const { id } = req.params;
    const { error } = await supabase.from('usuario').delete().eq('id_usuario', id);
    if (error) throw error;
    res.json({ message: "Usuario eliminado correctamente" });
} catch (error) {
    res.status(400).json({ error: error.message });
    }
};