import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qkgzxcsrffisjtbocqtu.supabase.co'
const supabaseKey = 'sb_publishable_o9rUKjEdilYfUdSd0793lQ_YXuBw6Vg';

console.log("=== CONEXIÓN DIRECTA ACTIVADA ===");

export const supabase = createClient(supabaseUrl, supabaseKey);