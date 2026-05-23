// lib/supabase.ts — Supabase client (lazy init, never crashes at build time)
// CR AudioViz AI · EIN 39-3646201 · May 2026
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Lazy singleton — never initialized at module level
let _client: ReturnType<typeof createClient> | null = null;

export function getSupabase() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  if (!_client) {
    _client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true },
    });
  }
  return _client;
}

// Default export for backward compat with `import supabase from "@/lib/supabase"`
const supabase = SUPABASE_URL && SUPABASE_ANON_KEY
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null as any;

export default supabase;
export { supabase };

// Named exports for common Supabase types
export type { User, Session, AuthChangeEvent } from "@supabase/supabase-js";