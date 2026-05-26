import { supabase } from '../config/supabase.js';

export const login = async (req, res) => {
    try {
        const { email, contrasena } = req.body;

        if (!email || !contrasena) {
            return res.status(400).json({ error: "El correo y la contraseña son obligatorios." });
        }

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

        if (error || !usuario || usuario.contrasena !== contrasena) {
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

export const crearUsuario = async (req, res) => {
    try {
        const { nombre_completo, email, contrasena, activo, telefono, id_rol } = req.body;
        const { data, error } = await supabase
            .from('usuario')
            .insert([{ nombre_completo, email, contrasena, activo, telefono, id_rol }])
            .select();
        
        if (error) throw error;
        return res.status(201).json(data[0]);
    } catch (error) {
        return res.status(400).json({ error: error.message });
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