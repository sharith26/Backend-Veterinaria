import { supabase } from '../config/supabase.js';

export const obtenerVeterinarios = async (req, res) => {
    try {
        const { data, error } = await supabase.from('veterinario').select('*');
        if (error) throw error;
        res.json(data);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const obtenerVeterinarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('veterinario').select('*').eq('id_veterinario', id).single();
        if (error) throw error;
        if (!data) return res.status(404).json({ mensaje: 'Veterinario no encontrado' });
        res.json(data);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const crearVeterinario = async (req, res) => {
    try {
        const { data, error } = await supabase.from('veterinario').insert([{ ...req.body, activo: true }]).select();
        if (error) throw error;
        res.status(201).json({ mensaje: 'Veterinario registrado con éxito', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const actualizarVeterinario = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('veterinario').update(req.body).eq('id_veterinario', id).select();
        if (error) throw error;
        res.json({ mensaje: 'Datos del veterinario actualizados', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const eliminarVeterinario = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('veterinario').update({ activo: false }).eq('id_veterinario', id).select();
        if (error) throw error;
        res.json({ mensaje: 'Veterinario dado de baja (Inactivado)', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};