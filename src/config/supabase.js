import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = 'https://gsogbwkggoczxsuumwji.supabase.co/rest/v1/'
const supabaseKey = 'sb_publishable_lJqqDGCB0p7X90L6MWKJvA_fNTY2o1W';

console.log("=== CONEXIÓN DIRECTA ACTIVADA ===");

if (!supabaseUrl || !supabaseKey) {
    console.error("ERROR: Faltan las variables de entorno SUPABASE_URL o SUPABASE_ANON_KEY en el archivo .env");
    process.exit(1); 
}

export const supabase = createClient(supabaseUrl, supabaseKey);





