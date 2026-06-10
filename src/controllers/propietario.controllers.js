import { supabase } from '../config/supabase.js';

import {
    validarTelefono,
    validarCedula,
    validarDireccionBogota
} from '../utils/validators.js';

export const obtenerPropietarios = async (req, res) => {
    try {

        const { data, error } = await supabase
            .from('propietario')
            .select('*');

        if (error) throw error;

        res.json(data);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};

export const obtenerPropietarioPorId = async (req, res) => {
    try {

        const { id } = req.params;

        const { data, error } = await supabase
            .from('propietario')
            .select('*')
            .eq('id_propietario', id)
            .single();

        if (error) {
            return res.status(404).json({
                error: "Propietario no encontrado"
            });
        }

        res.json(data);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};

export const crearPropietario = async (req, res) => {
    try {

        const {
            nombres,
            apellidos,
            tipo_documento,
            numero_documento,
            telefono,
            email,
            direccion
        } = req.body;

        if (!validarTelefono(telefono)) {
            return res.status(400).json({
                error: 'El teléfono debe tener exactamente 10 números'
            });
        }

        if (!validarCedula(numero_documento)) {
            return res.status(400).json({
                error: 'La cédula debe tener entre 7 y 10 dígitos'
            });
        }

        if (!validarDireccionBogota(direccion)) {
            return res.status(400).json({
                error: 'Solo se permiten direcciones de Bogotá'
            });
        }

        const { data, error } = await supabase
            .from('propietario')
            .insert([
                {
                    nombres,
                    apellidos,
                    tipo_documento,
                    numero_documento,
                    telefono,
                    email,
                    direccion
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

export const actualizarPropietario = async (req, res) => {
    try {

        const { id } = req.params;

        const {
            nombres,
            apellidos,
            tipo_documento,
            numero_documento,
            telefono,
            email,
            direccion
        } = req.body;

        if (!validarTelefono(telefono)) {
            return res.status(400).json({
                error: 'El teléfono debe tener exactamente 10 números'
            });
        }

        if (!validarCedula(numero_documento)) {
            return res.status(400).json({
                error: 'La cédula debe tener entre 7 y 10 dígitos'
            });
        }

        if (!validarDireccionBogota(direccion)) {
            return res.status(400).json({
                error: 'Solo se permiten direcciones de Bogotá'
            });
        }

        const { data, error } = await supabase
            .from('propietario')
            .update({
                nombres,
                apellidos,
                tipo_documento,
                numero_documento,
                telefono,
                email,
                direccion
            })
            .eq('id_propietario', id)
            .select();

        if (error) throw error;

        res.json(data[0]);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });
    }
};

export const eliminarPropietario = async (req, res) => {
    try {

        const { id } = req.params;

        const { error } = await supabase
            .from('propietario')
            .delete()
            .eq('id_propietario', id);

        if (error) throw error;

        res.json({
            message: "Propietario eliminado correctamente"
        });

    } catch (error) {

        res.status(400).json({
            error: error.message
        });
    }
};
