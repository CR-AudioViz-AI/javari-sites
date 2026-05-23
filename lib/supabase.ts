// lib/supabase.ts — Complete Supabase client with all common exports
// CR AudioViz AI · EIN 39-3646201 · May 2026
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://kteobfyferrukqeolofj.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Browser client (singleton)
let _browserClient: SupabaseClient | null = null;

export function createSupabaseBrowserClient(): SupabaseClient {
  if (!_browserClient) {
    _browserClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true },
    });
  }
  return _browserClient;
}

// Server client (new instance per call)
export function createSupabaseServerClient(): SupabaseClient {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;
  return createClient(SUPABASE_URL, key, { auth: { persistSession: false } });
}

// Admin client
export function createSupabaseAdminClient(): SupabaseClient {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;
  return createClient(SUPABASE_URL, key, { auth: { persistSession: false } });
}

// Backwards-compat aliases
export const createBrowserClient = createSupabaseBrowserClient;
export const createServerClient = createSupabaseServerClient;
export const createAdminClient = createSupabaseAdminClient;
export const getSupabase = createSupabaseBrowserClient;
export const supabaseAdmin = createSupabaseAdminClient();
export const supabaseServer = createSupabaseServerClient();

// Default singleton export
const supabase = createSupabaseBrowserClient();
export default supabase;
export { supabase };

// Re-export common types
export type { User, Session, AuthChangeEvent, AuthError } from "@supabase/supabase-js";