export const validarTelefono = (telefono) => {
    return /^[0-9]{10}$/.test(String(telefono));
};

export const validarCorreoVetPaws = (correo) => {
    return /^[a-zA-Z0-9._%+-]+@vetpaws\.co$/.test(correo);
};

export const validarTarjetaProfesional = (tp) => {
    return /^TP-[0-9]{5}$/.test(tp);
};

export const validarCedula = (cedula) => {
    return /^[0-9]{7,10}$/.test(String(cedula));
};

export const validarDireccionBogota = (direccion) => {
    return /bogot[aá]/i.test(direccion);
};