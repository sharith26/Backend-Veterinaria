import { supabase } from '../config/supabase.js';

export const obtenerMascotas = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('mascota')
            .select(`
                id_mascota,
                nombre,
                fecha_nacimiento,
                activo,
                especie:id_especie (nombre_especie),
                raza:id_raza (nombre_raza),
                propietario:id_propietario (nombres, apellidos)
            `);

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
            .insert([{
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
            }])
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

export const obtenerMedicamentosPorMascota = async (req, res) => {
    try {
        const { id } = req.params;

        const { data: citas, error: errorCitas } = await supabase
            .from('cita')
            .select('id_cita')
            .eq('id_mascota', id);

        if (errorCitas) throw errorCitas;
        if (!citas || citas.length === 0) return res.json([]);

        const idsCitas = citas.map(c => c.id_cita);

        const { data: historias, error: errorHistorias } = await supabase
            .from('historia_clinica')
            .select('id_historia')
            .in('id_cita', idsCitas);

        if (errorHistorias) throw errorHistorias;
        if (!historias || historias.length === 0) return res.json([]);

        const idsHistorias = historias.map(h => h.id_historia);

        const { data: prescripciones, error: errorPrescripciones } = await supabase
            .from('prescripcion')
            .select(`
                id_prescripcion,
                dosis,
                cantidad,
                entregado,
                id_historia,
                medicamento (
                    id_medicamento,
                    nombre
                )
            `)
            .in('id_historia', idsHistorias);

        if (errorPrescripciones) throw errorPrescripciones;

        res.json(prescripciones || []);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerHistorialPorMascota = async (req, res) => {
    try {
        const { id } = req.params;

        const { data: mascota, error: errorMascota } = await supabase
            .from('mascota')
            .select(`
                id_mascota, nombre, fecha_nacimiento, activo,
                especie:id_especie (nombre_especie),
                raza:id_raza (nombre_raza),
                propietario:id_propietario (nombres, apellidos)
            `)
            .eq('id_mascota', id)
            .single();

        if (errorMascota) throw errorMascota;

        const { data: citas, error: errorCitas } = await supabase
            .from('cita')
            .select('id_cita')
            .eq('id_mascota', id);

        if (errorCitas) throw errorCitas;
        if (!citas || citas.length === 0) return res.json({ mascota, historias: [] });

        const idsCitas = citas.map(c => c.id_cita);

        const { data: historias, error: errorHistorias } = await supabase
            .from('historia_clinica')
            .select(`
                id_historia, fecha_consulta, peso_kg, temperatura_c,
                frec_cardiaca, frec_respiratoria, sintomas,
                diagnostico, tratamiento, observaciones
            `)
            .in('id_cita', idsCitas)
            .order('fecha_consulta', { ascending: false });

        if (errorHistorias) throw errorHistorias;

        res.json({ mascota, historias: historias || [] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}; // <--- Se cierra correctamente la función anterior

export const obtenerMascotasPorPropietario = async (req, res) => {
    try {
        const { id_propietario } = req.query;

        if (!id_propietario) {
            return res.status(400).json({ error: "El ID del propietario es requerido" });
        }

        const { data, error } = await supabase
            .from('mascota')
            .select(`
                id_mascota,
                nombre,
                id_propietario
            `)
            .eq('id_propietario', id_propietario)
            .eq('activo', true);

        if (error) throw error;

        res.json(data || []);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};