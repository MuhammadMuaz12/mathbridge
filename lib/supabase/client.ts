import { createClient, type SupabaseClient } from '@supabase/supabase-js';
let client: SupabaseClient | undefined;
export function browserDatabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error('The learning service is not configured yet.');
  return client ??= createClient(url, key);
}
export async function learningFetch(input: string, init: RequestInit = {}) {
  const { data, error } = await browserDatabase().auth.getSession();
  if (error || !data.session) throw new Error('Please sign in again to continue.');
  // This only forwards the token. The API independently verifies it with getUser.
  return fetch(input, {...init, headers: {...init.headers, Authorization: `Bearer ${data.session.access_token}`}});
}
