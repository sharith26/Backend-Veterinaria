export const protegerRuta = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!authHeader) {
        return res.status(400).json({ error: "Acceso denegado", message: "Token de sesión no proporcionado." });
    }

    if (!token) {
        return res.status(401).json({ error: "Acceso denegado", message: "Token de sesión no proporcionado." });
    }

    try {
        const datosUsuario = JSON.parse(atob(token));
        
        req.user = {
            id_usuario: datosUsuario.id,
            nombre_rol: datosUsuario.rol
        };

        return next(); 
    } catch (error) {
        return res.status(403).json({ error: "Sesión inválida", message: "Su sesión ha expirado o el token es corrupto." });
    }
};

export const verificarRol = (rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.user || !req.user.nombre_rol) {
            return res.status(401).json({ error: "No autorizado", message: "No se identificó un rol de usuario válido." });
        }

        const rolUsuario = req.user.nombre_rol;

        if (rolUsuario === 'Superadmin') {
            return next();
        }

        if (rolesPermitidos.includes(rolUsuario)) {
            return next();
        }

        return res.status(403).json({ 
            error: "Acceso denegado", 
            message: `Tu rol actual (${rolUsuario}) no cuenta con autorizaciones para completar esta operación.` 
        });
    };
};