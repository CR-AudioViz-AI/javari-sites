// lib/supabase/server.ts — server-side Supabase
import { createClient } from "@supabase/supabase-js";
import { secretKey, supabaseUrl } from "@craudioviz/platform-sdk";
export function createServerClient() {
  const url = supabaseUrl();
  const key = secretKey()|| "";
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}
export default createServerClient();