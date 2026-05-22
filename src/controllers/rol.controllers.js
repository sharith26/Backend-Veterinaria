import { supabase } from '../config/supabase.js';

export const obtenerRoles = async (req, res) => {
    try {
        const { data, error } = await supabase.from('rol').select('*');
        if (error) throw error;
        res.json(data);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const obtenerRolPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('rol').select('*').eq('id_rol', id).single();
        if (error) throw error;
        if (!data) return res.status(404).json({ mensaje: 'Rol no encontrado' });
        res.json(data);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const crearRol = async (req, res) => {
    try {
        const { data, error } = await supabase.from('rol').insert([req.body]).select();
        if (error) throw error;
        res.status(201).json({ mensaje: 'Rol creado con éxito', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const actualizarRol = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('rol').update(req.body).eq('id_rol', id).select();
        if (error) throw error;
        res.json({ mensaje: 'Rol actualizado', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const eliminarRol = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('rol').delete().eq('id_rol', id).select();
        if (error) throw error;
        res.json({ mensaje: 'Rol eliminado físicamente', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};