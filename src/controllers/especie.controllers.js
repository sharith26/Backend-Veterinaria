import { supabase } from '../config/supabase.js';

export const obtenerEspecies = async (req, res) => {
    try {
        const { data, error } = await supabase.from('especie').select('*');
        if (error) throw error;
        res.json(data);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const obtenerEspeciePorId = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('especie').select('*').eq('id_especie', id).single();
        if (error) throw error;
        if (!data) return res.status(404).json({ mensaje: 'Especie no encontrada' });
        res.json(data);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const crearEspecie = async (req, res) => {
    try {
        const { data, error } = await supabase.from('especie').insert([{ ...req.body, activo: true }]).select();
        if (error) throw error;
        res.status(201).json({ mensaje: 'Especie creada con éxito', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const actualizarEspecie = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('especie').update(req.body).eq('id_especie', id).select();
        if (error) throw error;
        res.json({ mensaje: 'Especie actualizada', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const eliminarEspecie = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('especie').update({ activo: false }).eq('id_especie', id).select();
        if (error) throw error;
        res.json({ mensaje: 'Especie inactivada', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};