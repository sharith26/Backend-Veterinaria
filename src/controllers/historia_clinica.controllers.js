import { supabase } from '../config/supabase.js';

export const obtenerHistoriasClinicas = async (req, res) => {
    try {
    const { data, error } = await supabase.from('historia_clinica').select('*');
    if (error) throw error;
    res.json(data);
} catch (error) {
    res.status(500).json({ error: error.message });
    }
};

export const obtenerHistoriaClinicaPorId = async (req, res) => {
    try {
    const { id } = req.params;
    const { data, error } = await supabase.from('historia_clinica').select('*').eq('id_historia', id).single();
    if (error) return res.status(404).json({ error: "Historia clínica no encontrada" });
    res.json(data);
} catch (error) {
    res.status(500).json({ error: error.message });
    }
};

export const crearHistoriaClinica = async (req, res) => {
    try {
    const { fecha_consulta, peso_kg, temperatura_c, frec_cardiaca, frec_respiratoria, sintomas, diagnostico, tratamiento, observaciones, id_cita } = req.body;
    const { data, error } = await supabase.from('historia_clinica').insert([{ fecha_consulta, peso_kg, temperatura_c, frec_cardiaca, frec_respiratoria, sintomas, diagnostico, tratamiento, observaciones, id_cita }]).select();
    if (error) throw error;
    res.status(201).json(data[0]);
} catch (error) {
    res.status(400).json({ error: error.message });
    }
};

export const actualizarHistoriaClinica = async (req, res) => {
    try {
    const { id } = req.params;
    const { fecha_consulta, peso_kg, temperatura_c, frec_cardiaca, frec_respiratoria, sintomas, diagnostico, tratamiento, observaciones, id_cita } = req.body;
    const { data, error } = await supabase.from('historia_clinica').update({ fecha_consulta, peso_kg, temperatura_c, frec_cardiaca, frec_respiratoria, sintomas, diagnostico, tratamiento, observaciones, id_cita }).eq('id_historia', id).select();
    if (error) throw error;
    res.json(data[0]);
} catch (error) {
    res.status(400).json({ error: error.message });
    }
};

export const eliminarHistoriaClinica = async (req, res) => {
    try {
    const { id } = req.params;
    const { error } = await supabase.from('historia_clinica').delete().eq('id_historia', id);
    if (error) throw error;
    res.json({ message: "Historia clínica eliminada correctamente" });
} catch (error) {
    res.status(400).json({ error: error.message });
    }
};