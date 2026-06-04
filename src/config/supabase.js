import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = 'https://gsogbwkggoczxsuumwji.supabase.co';
const supabaseKey = 'sb_publishable_lJqqDGCB0p7X90L6MWKJvA_fNTY2o1W';

console.log("=== CONEXIÓN DIRECTA ACTIVADA ===");

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);