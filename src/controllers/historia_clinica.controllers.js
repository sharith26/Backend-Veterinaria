import { supabase } from '../config/supabase.js';

export const obtenerHistoriasClinicas = async (req, res) => {
    try {
        const { data, error } = await supabase.from('historia_clinica').select('*');
        if (error) throw error;
        res.json(data);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const obtenerHistoriaClinicaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('historia_clinica').select('*').eq('id_historia', id).single();
        if (error) throw error;
        if (!data) return res.status(404).json({ mensaje: 'Historia no encontrada' });
        res.json(data);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const crearHistoriaClinica = async (req, res) => {
    try {
        const { data, error } = await supabase.from('historia_clinica').insert([{ ...req.body, activo: true }]).select();
        if (error) throw error;
        res.status(201).json({ mensaje: 'Historia clínica creada con éxito', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const actualizarHistoriaClinica = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('historia_clinica').update(req.body).eq('id_historia', id).select();
        if (error) throw error;
        res.json({ mensaje: 'Historia clínica actualizada', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

export const eliminarHistoriaClinica = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('historia_clinica').update({ activo: false }).eq('id_historia', id).select();
        if (error) throw error;
        res.json({ mensaje: 'Historia clínica inactivada', data });
    } catch (error) { res.status(500).json({ error: error.message }); }
};