import { createClient } from '@supabase/supabase-js';
export async function requestDatabase(request: Request) {
  const authorization = request.headers.get('authorization') || '';
  if (!authorization.startsWith('Bearer ')) return null;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw Error('Supabase configuration is missing');
  const db = createClient(url,key,{global:{headers:{Authorization:authorization}},auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});
  const {data,error} = await db.auth.getUser(authorization.slice(7));
  if (error || !data.user || !data.user.email_confirmed_at) return null;
  const invitation = await db.from('mathbridge_members').select('email').eq('email',data.user.email?.toLowerCase()).maybeSingle();
  if (invitation.error) throw Error('Could not verify pilot access');
  if (!invitation.data) return null;
  return {db,user:data.user};
}
