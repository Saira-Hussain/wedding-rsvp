import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// MUST be (url, key) — swapping them breaks the REST path builder
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
