import { createClient } from "@supabase/supabase-js";

// Real Supabase project — anon key is safe to ship (intended for public frontend use)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://wpbfwgwxxcplaclkdbzi.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwYmZ3Z3d4eGNwbGFjbGtkYnppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5Mzc2NDksImV4cCI6MjA5NjUxMzY0OX0.iuFihrtyg393FXcXBr2usKVlKqnfWto0p-HJ2xmv8mw";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
