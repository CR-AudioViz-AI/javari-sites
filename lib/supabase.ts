// lib/supabase.ts — Complete Supabase client with all common exports
// CR AudioViz AI · EIN 39-3646201 · May 2026
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { secretKey, publishableKey, supabaseUrl } from "@craudioviz/platform-sdk";

const SUPABASE_URL = supabaseUrl();
const SUPABASE_ANON_KEY = publishableKey();

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
  const key = secretKey() || SUPABASE_ANON_KEY;
  return createClient(SUPABASE_URL, key, { auth: { persistSession: false } });
}

// Admin client
export function createSupabaseAdminClient(): SupabaseClient {
  const key = secretKey() || SUPABASE_ANON_KEY;
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