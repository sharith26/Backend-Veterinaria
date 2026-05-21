import { supabase } from '../config/supabase.js';

export const obtenerMascotas = async (req, res) => {
    try {
        // Usamos '*' en una sola línea para evitar errores de mapeo en la URL de la API
        const { data, error } = await supabase
            .from('mascota')
            .select('*'); 

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerMascotaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('mascota')
            .select('*')
            .eq('id_mascota', id) 
            .single();

        if (error) throw error;
        if (!data) return res.status(404).json({ mensaje: 'Mascota no encontrada' });

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const crearMascota = async (req, res) => {
    try {
        const { nombre, fecha_nacimiento, sexo, peso_actual, color, esterilizado, id_propietario, id_especie, id_raza } = req.body;

        const { data, error } = await supabase
            .from('mascota')
            .insert([
                { 
                    nombre, 
                    fecha_nacimiento, 
                    sexo, 
                    peso_actual, 
                    color, 
                    esterilizado, 
                    id_propietario, 
                    id_especie, 
                    id_raza,
                    activo: true 
                }
            ])
            .select();

        if (error) throw error;
        res.status(201).json({ mensaje: 'Mascota registrada con éxito', data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const actualizarMascota = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const { data, error } = await supabase
            .from('mascota')
            .update(updateData)
            .eq('id_mascota', id)
            .select();

        if (error) throw error;
        res.json({ mensaje: 'Datos de la mascota actualizados', data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const eliminarMascota = async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from('mascota')
            .update({ activo: false })
            .eq('id_mascota', id)
            .select();

        if (error) throw error;
        res.json({ mensaje: 'Mascota dada de baja en el sistema (Inactivada)', data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};