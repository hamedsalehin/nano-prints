import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials missing. Using fallback dummy client to prevent crashes.");
}

// Provide a dummy URL and key so the application doesn't crash with "Cannot read properties of null"
const safeUrl = supabaseUrl || "https://dummyproject.supabase.co";
const safeKey = supabaseAnonKey || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSJ9.dummy";

export const supabase: SupabaseClient = createClient(safeUrl, safeKey);
