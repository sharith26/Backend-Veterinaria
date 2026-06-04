import { supabase } from '../config/supabase.js';

export const obtenerVeterinarios = async (req, res) => {
  try {

    console.log('=== ENTRÓ A OBTENER VETERINARIOS ===');

    const { data: prueba, error: errorPrueba } = await supabase
      .from('veterinario')
      .select('*');

    console.log('Error prueba:', errorPrueba);
    console.log('Cantidad registros:', prueba?.length);

    const { data, error } = await supabase
      .from('veterinario')
      .select(`
        id_veterinario,
        tarjeta_profesional,
        id_usuario,
        id_especialidad,
        especialidad:id_especialidad (
          id_especialidad,
          nombre
        ),
        usuario:id_usuario (
          id_usuario,
          nombre_completo,
          email,
          telefono
        )
      `);

    console.log('Error consulta principal:', error);

    if (error) throw error;

    res.json(data);

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