import { createClient } from "@supabase/supabase-js";
import type { Database } from "~/types/database";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('⚠️ Supabase URL o Key mancanti! Controlla il file .env')
}

const supabaseClient: any = createClient(supabaseUrl, supabaseKey)

export const supabase: any = supabaseClient as ReturnType<typeof createClient<Database>>