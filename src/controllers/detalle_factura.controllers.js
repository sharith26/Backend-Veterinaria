import { supabase } from '../config/supabase.js';

export const obtenerDetallesFactura = async (req, res) => {
  try {
    console.log("=== API: Intentando obtener detalles de factura ===");
    
    const { data, error } = await supabase
      .from('detalle_factura')
      .select('*');

    if (error) {
      console.error("❌ Error directo de Supabase:", error);
      return res.status(400).json({ error: error.message, detalle: "Error en la consulta a Supabase" });
    }

    console.log("📊 Datos obtenidos de Supabase:", data);
    
    // Si la tabla está vacía, esto devolverá [] pero ya no se quedará en blanco
    return res.json(data);

  } catch (error) {
    console.error("❌ Error crítico en el servidor:", error);
    return res.status(500).json({ error: error.message, detalle: "Error interno del servidor" });
  }
};

export const obtenerDetalleFacturaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('detalle_factura').select('*').eq('id_detalle', id).single();
    if (error) return res.status(404).json({ error: "Detalle de factura no encontrado" });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const crearDetalleFactura = async (req, res) => {
  try {
    const { concepto, tipo, cantidad, precio_unitario, subtotal, id_factura } = req.body;
    const { data, error } = await supabase.from('detalle_factura').insert([{ concepto, tipo, cantidad, precio_unitario, subtotal, id_factura }]).select();
    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json(data[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const actualizarDetalleFactura = async (req, res) => {
  try {
    const { id } = req.params;
    const { concepto, tipo, cantidad, precio_unitario, subtotal, id_factura } = req.body;
    const { data, error } = await supabase.from('detalle_factura').update({ concepto, tipo, cantidad, precio_unitario, subtotal, id_factura }).eq('id_detalle', id).select();
    if (error) return res.status(400).json({ error: error.message });
    return res.json(data[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const eliminarDetalleFactura = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('detalle_factura').delete().eq('id_detalle', id);
    if (error) return res.status(400).json({ error: error.message });
    return res.json({ message: "Detalle de factura eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};