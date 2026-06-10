import { supabase } from '../config/supabase.js';

import {
    validarTarjetaProfesional
} from '../utils/validators.js';

export const obtenerVeterinarios = async (req, res) => {
    try {

        console.log('=== ENTRÓ A OBTENER VETERINARIOS ===');

        const { data: veterinarios, error: errorVet } = await supabase
            .from('veterinario')
            .select('*');

        if (errorVet) throw errorVet;

        console.log('VETERINARIOS BRUTOS:', veterinarios?.length);

        if (!veterinarios || veterinarios.length === 0) {
            return res.json([]);
        }

        const { data: todosUsuarios } = await supabase
            .from('usuario')
            .select('id_usuario, nombre_completo, email, telefono');

        const usuariosData = {};

        if (todosUsuarios) {
            todosUsuarios.forEach(u => {
                usuariosData[u.id_usuario] = u;
            });
        }

        const { data: todasEspecialidades } = await supabase
            .from('especialidad')
            .select('id_especialidad, nombre');

        const especialidadesData = {};

        if (todasEspecialidades) {
            todasEspecialidades.forEach(e => {
                especialidadesData[e.id_especialidad] = e;
            });
        }

        const respuestaFinal = veterinarios.map(vet => ({
            id_veterinario: vet.id_veterinario,
            tarjeta_profesional: vet.tarjeta_profesional,
            usuario: usuariosData[vet.id_usuario] || null,
            especialidad: especialidadesData[vet.id_especialidad] || null,
            id_usuario: vet.id_usuario,
            id_especialidad: vet.id_especialidad
        }));

        console.log('RESPUESTA FINAL:', respuestaFinal);

        res.json(respuestaFinal);

    } catch (error) {

        console.error('ERROR COMPLETO:', error);

        res.status(500).json({
            error: error.message,
            detalle: error
        });
    }
};

export const obtenerVeterinarioPorId = async (req, res) => {
    try {

        const { id } = req.params;

        const { data, error } = await supabase
            .from('veterinario')
            .select('*')
            .eq('id_veterinario', id)
            .single();

        if (error) {
            return res.status(404).json({
                error: "Veterinario no encontrado"
            });
        }

        res.json(data);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};

export const crearVeterinario = async (req, res) => {
    try {

        const {
            id_especialidad,
            tarjeta_profesional,
            id_usuario
        } = req.body;

        if (!validarTarjetaProfesional(tarjeta_profesional)) {
            return res.status(400).json({
                error: 'La tarjeta profesional debe tener formato TP-00000'
            });
        }

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

        res.status(400).json({
            error: error.message
        });
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

        if (!validarTarjetaProfesional(tarjeta_profesional)) {
            return res.status(400).json({
                error: 'La tarjeta profesional debe tener formato TP-00000'
            });
        }

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

        res.status(400).json({
            error: error.message
        });
    }
};

export const eliminarVeterinario = async (req, res) => {
    try {

        const { id } = req.params;

        const { error } = await supabase
            .from('veterinario')
            .delete()
            .eq('id_veterinario', id);

        if (error) throw error;

        res.json({
            message: "Veterinario eliminado correctamente"
        });

    } catch (error) {

        res.status(400).json({
            error: error.message
        });
    }
};