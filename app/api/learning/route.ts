import {requestDatabase} from '@/lib/supabase/server';
import {emptyLearning,question,isCorrect,diagnosticNext,skills,type Learning} from '@/lib/curriculum';
import type {SupabaseClient} from '@supabase/supabase-js';
export const dynamic='force-dynamic';
const noStore={'Cache-Control':'private, no-store'};
async function read(db:SupabaseClient,uid:string){
 let {data,error}=await db.from('mathbridge_learning').select('payload,revision').eq('user_id',uid).maybeSingle();
 if(error)throw error;
 if(!data){const created=await db.from('mathbridge_learning').insert({user_id:uid,payload:emptyLearning(),revision:0}).select('payload,revision').single();
  if(created.error&&created.error.code!=='23505')throw created.error;
  const found=created.data?created:await db.from('mathbridge_learning').select('payload,revision').eq('user_id',uid).single();
  if(found.error||!found.data)throw Error('Could not create learning progress');data=found.data;}
 return {state:data.payload as Learning,revision:data.revision as number};
}
export async function GET(req:Request){try{const auth=await requestDatabase(req);if(!auth)return Response.json({error:'Please sign in with your invited email to access this private pilot.'},{status:401,headers:noStore});return Response.json(await read(auth.db,auth.user.id),{headers:noStore});}catch{ return Response.json({error:'Your progress could not be loaded. Please try again.'},{status:503,headers:noStore});}}
export async function POST(req:Request){try{
 const origin=req.headers.get('origin');if(origin&&origin!==new URL(req.url).origin)return Response.json({error:'Request origin rejected.'},{status:403,headers:noStore});
 const auth=await requestDatabase(req);if(!auth)return Response.json({error:'Please sign in with your invited email to save your progress.'},{status:401,headers:noStore});
 const b=await req.json() as Record<string,unknown>;const {state,revision}=await read(auth.db,auth.user.id);
 if(b.revision!==revision)return Response.json({error:'Your progress changed in another tab. Refresh your progress and try again.'},{status:409,headers:noStore});
 let feedback:Record<string,unknown>|undefined;
 if(b.action==='profile'){if(typeof b.name!=='string'||b.name.length>60||typeof b.goal!=='string'||b.goal.length>120)return Response.json({error:'Please use a name under 60 characters.'},{status:400});state.name=b.name.trim();state.goal=b.goal;}
 else if(b.action==='start-diagnostic'){if(!state.diagnostic||state.diagnostic.done)state.diagnostic={run:crypto.randomUUID(),seen:[],done:false};}
 else if(b.action==='lesson'){if(typeof b.skillId!=='string'||!skills.some(s=>s.id===b.skillId))return Response.json({error:'Unknown lesson.'},{status:400});if(!state.lessons.includes(b.skillId))state.lessons.push(b.skillId);}
 else if(b.action==='answer'){
  if(typeof b.qid!=='string'||typeof b.answer!=='string'||b.answer.length>100||typeof b.id!=='string'||b.id.length>80||!['practice','diagnostic','review'].includes(String(b.mode))||!Number.isInteger(b.hints)||Number(b.hints)<0||Number(b.hints)>2)return Response.json({error:'Please check your answer and try again.'},{status:400});
  const q=question(b.qid);if(!q)return Response.json({error:'Question not found.'},{status:400});
  if(b.mode==='diagnostic'&&diagnosticNext(state)?.id!==q.id)return Response.json({error:'Please continue with the current diagnostic question.'},{status:400});
  if(!state.attempts.some(a=>a.id===b.id)){const correct=isCorrect(b.answer,q.answer);state.attempts.push({id:b.id,qid:q.id,answer:b.answer,correct,hints:Number(b.hints),mode:b.mode as 'practice'|'diagnostic'|'review',created:Date.now()});if(b.mode==='diagnostic'&&state.diagnostic){state.diagnostic.seen.push(q.skillId);state.diagnostic.done=state.diagnostic.seen.length===skills.length;}feedback={correct,solution:q.solution,message:q.misconception&&isCorrect(b.answer,q.misconception.value)?q.misconception.text:null};}
 }else return Response.json({error:'Unknown action.'},{status:400});
 const result=await auth.db.from('mathbridge_learning').update({payload:state,revision:revision+1,updated_at:new Date().toISOString()}).eq('user_id',auth.user.id).eq('revision',revision).select('revision').maybeSingle();
 if(result.error)throw result.error;
 if(!result.data)return Response.json({error:'Progress was updated elsewhere. Refresh and try again.'},{status:409,headers:noStore});
 return Response.json({state,revision:revision+1,feedback},{headers:noStore});
 }catch{return Response.json({error:'Your answer has not been saved. Please try again.'},{status:503,headers:noStore});}}
