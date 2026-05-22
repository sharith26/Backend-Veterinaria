import { supabase } from '../config/supabase.js';

export const obtenerPropietarios = async (req, res) => {
    try {
        const { data, error } = await supabase.from('propietario').select('*');
        if (error) throw error;
        res.json(data);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const obtenerPropietarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('propietario').select('*').eq('id_propietario', id).single();
        if (error) throw error;
        if (!data) return res.status(404).json({ mensaje: 'Propietario no encontrado' });
        res.json(data);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const crearPropietario = async (req, res) => {
    try {
        const { data, error } = await supabase.from('propietario').insert([{ ...req.body, activo: true }]).select();
        if (error) throw error;
        res.status(201).json({ mensaje: 'Propietario registrado con éxito', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const actualizarPropietario = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('propietario').update(req.body).eq('id_propietario', id).select();
        if (error) throw error;
        res.json({ mensaje: 'Propietario actualizado con éxito', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const eliminarPropietario = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('propietario').update({ activo: false }).eq('id_propietario', id).select();
        if (error) throw error;
        res.json({ mensaje: 'Propietario inactivado del sistema', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};