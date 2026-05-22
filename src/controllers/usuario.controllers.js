import { supabase } from '../config/supabase.js';

export const obtenerUsuarios = async (req, res) => {
    try {
        const { data, error } = await supabase.from('usuario').select('*');
        if (error) throw error;
        res.json(data);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const obtenerUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('usuario').select('*').eq('id_usuario', id).single();
        if (error) throw error;
        if (!data) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        res.json(data);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const crearUsuario = async (req, res) => {
    try {
        const { data, error } = await supabase.from('usuario').insert([{ ...req.body, activo: true }]).select();
        if (error) throw error;
        res.status(201).json({ mensaje: 'Usuario registrado con éxito', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('usuario').update(req.body).eq('id_usuario', id).select();
        if (error) throw error;
        res.json({ mensaje: 'Datos del usuario actualizados', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('usuario').update({ activo: false }).eq('id_usuario', id).select();
        if (error) throw error;
        res.json({ mensaje: 'Usuario dado de baja (Inactivado)', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};