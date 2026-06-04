import { supabase } from '../config/supabase.js';

export const obtenerVeterinarios = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('veterinario')
            .select(`
                *,
                usuario:id_usuario (nombre_completo),
                especialidad:id_especialidad (nombre)
            `) // Esto recrea el objeto anidado que tu HTML espera
            .order('id_veterinario', { ascending: true });

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerVeterinarioPorId = async (req, res) => {
    try {
    const { id } = req.params;
    const { data, error } = await supabase.from('veterinario').select('*').eq('id_veterinario', id).single();
    if (error) return res.status(404).json({ error: "Veterinario no encontrado" });
    res.json(data);
} catch (error) {
    res.status(500).json({ error: error.message });
    }
};

export const crearVeterinario = async (req, res) => {
    try {
        const { id_especialidad, tarjeta_profesional, id_usuario } = req.body;

        const { data, error } = await supabase
            .from('veterinario')
            .insert([
                {
                    tarjeta_profesional,
                    id_usuario,
                    id_especialidad
                }
            ])
            .select();

        if (error) throw error;

        res.status(201).json(data[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const actualizarVeterinario = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            id_especialidad,
            tarjeta_profesional,
            id_usuario
        } = req.body;

        const { data, error } = await supabase
            .from('veterinario')
            .update({
                tarjeta_profesional,
                id_usuario,
                id_especialidad
            })
            .eq('id_veterinario', id)
            .select();

        if (error) throw error;

        res.json(data[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const eliminarVeterinario = async (req, res) => {
    try {
    const { id } = req.params;
    const { error } = await supabase.from('veterinario').delete().eq('id_veterinario', id);
    if (error) throw error;
    res.json({ message: "Veterinario eliminado correctamente" });
} catch (error) {
    res.status(400).json({ error: error.message });
    }
};