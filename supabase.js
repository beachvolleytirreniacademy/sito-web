import { createClient } from '@supabase/supabase-js'

// Recupera le variabili dal file .env (o dalle impostazioni di Vercel)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('⚠️ Supabase URL o Key mancanti! Controlla il file .env')
}

export const supabase = createClient(supabaseUrl, supabaseKey)