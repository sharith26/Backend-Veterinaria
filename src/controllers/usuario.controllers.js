import { supabase } from '../config/supabase.js';
import crypto from 'crypto';

// Función auxiliar para hashear contraseñas
const hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
};

export const login = async (req, res) => {
    try {
        const { email, contrasena } = req.body;

        if (!email || !contrasena) {
            return res.status(400).json({ error: "El correo y la contraseña son obligatorios." });
        }

        // Hasheamos la contraseña recibida para compararla con la base de datos
        const contrasenaHash = hashPassword(contrasena);

        const { data: usuario, error } = await supabase
            .from('usuario')
            .select(`
                id_usuario,
                nombre_completo,
                email,
                contrasena,
                rol (
                    nombre_rol
                )
            `)
            .eq('email', email)
            .single();

        // Comparamos el hash recibido con el hash almacenado
        if (error || !usuario || usuario.contrasena !== contrasenaHash) {
            return res.status(401).json({ error: "Correo electrónico o contraseña incorrectos." });
        }

        const nombreRol = usuario.rol ? usuario.rol.nombre_rol : 'Consultas';
        const payload = { id: usuario.id_usuario, rol: nombreRol, exp: Date.now() + 28800000 };
        const tokenToken = btoa(JSON.stringify(payload));

        return res.json({
            message: "Autenticación exitosa",
            token: tokenToken,
            user: {
                id: usuario.id_usuario,
                nombre: usuario.nombre_completo,
                rol: nombreRol
            }
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const crearUsuario = async (req, res) => {
    try {
        const { nombre_completo, email, contrasena, activo, telefono, id_rol } = req.body;
        
        // Validación básica antes de ir a la BD
        if (!email || !contrasena) {
            return res.status(400).json({ error: "El email y la contraseña son obligatorios" });
        }

        const contrasenaHash = hashPassword(contrasena);

        const { data, error } = await supabase
            .from('usuario')
            .insert([{ 
                nombre_completo, 
                email, 
                contrasena: contrasenaHash, 
                activo: activo ?? true, // Valor por defecto
                telefono, 
                id_rol 
            }])
            .select();
        
        if (error) {
            // AQUÍ ESTÁ EL TRUCO: Imprime el error completo en el servidor
            console.error("Error detallado de Supabase:", error);
            return res.status(400).json({ 
                error: "Error al crear usuario", 
                detalles: error.message,
                hint: error.hint // Supabase a veces da una pista del error (ej. llave duplicada)
            });
        }
        
        return res.status(201).json(data[0]);
    } catch (error) {
        return res.status(500).json({ error: "Error interno del servidor", detalle: error.message });
    }
};
export const obtenerUsuarios = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('usuario')
            .select('id_usuario, nombre_completo, email, activo, telefono, id_rol');
        
        if (error) throw error;
        return res.json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const obtenerUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('usuario')
            .select('id_usuario, nombre_completo, email, activo, telefono, id_rol')
            .eq('id_usuario', id)
            .single();
        
        if (error) return res.status(404).json({ error: "Usuario no encontrado" });
        return res.json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_completo, email, activo, telefono, id_rol } = req.body;
        const { data, error } = await supabase
            .from('usuario')
            .update({ nombre_completo, email, activo, telefono, id_rol })
            .eq('id_usuario', id)
            .select();
        
        if (error) throw error;
        return res.json(data[0]);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = await supabase
            .from('usuario')
            .delete()
            .eq('id_usuario', id);
        
        if (error) throw error;
        return res.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};