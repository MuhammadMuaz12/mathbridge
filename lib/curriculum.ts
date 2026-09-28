export type Skill = {id:string;title:string;group:number;prerequisites:string[];description:string;rule:string;example:string[];urdu:string};
export const groups=['Number foundations','Expressions & relationships','Solving equations','Putting it together'];
const rows:[string,string,number,string[],string,string,string[],string][]=[
['integers','Signed numbers',0,[],'Make sense of positive and negative numbers.','Adding a negative moves left on the number line. Subtracting a negative moves right.',['−4 + 9 = 5','−4 − (−3) = −4 + 3 = −1'],'منفی عدد جمع کرنے سے عددی لکیر پر بائیں طرف جاتے ہیں۔'],
['multiply','Multiplying signs',0,['integers'],'Keep track of signs when multiplying.','Matching signs give a positive product. Different signs give a negative product.',['(−3) × 4 = −12','(−3) × (−4) = 12'],'ایک جیسے نشانوں کا حاصل ضرب مثبت ہوتا ہے۔'],
['order','Order of operations',0,['multiply'],'Choose the right operation to do first.','Work inside brackets, then powers, multiplication and division, then addition and subtraction. Work left to right within each level.',['3 + 4 × 2','3 + 8 = 11'],'پہلے قوسین، پھر ضرب اور تقسیم، پھر جمع اور تفریق کریں۔'],
['fractions','Equivalent fractions',0,['multiply'],'Recognize different names for the same number.','Multiply or divide the numerator and denominator by the same nonzero number.',['2/3 = (2 × 4)/(3 × 4)','2/3 = 8/12'],'شمار کنندہ اور مخرج کو ایک ہی غیر صفر عدد سے ضرب دیں۔'],
['fraction-add','Adding fractions',0,['fractions'],'Combine fractions with different denominators.','Find a common denominator before adding the numerators.',['1/2 + 1/3 = 3/6 + 2/6','3/6 + 2/6 = 5/6'],'کسریں جمع کرنے سے پہلے مخرج برابر کریں۔'],
['substitute','Substitution',1,['order'],'Replace a letter with its given value.','Replace every occurrence of the variable, then follow the order of operations.',['If x = 4, then 3x + 2','3 × 4 + 2 = 14'],'متغیر کی جگہ دی گئی قیمت رکھیں۔'],
['like-terms','Combining like terms',1,['integers'],'Collect terms that have the same variable.','Add the coefficients of like terms. Keep unlike terms separate.',['3x + 5x − 2x','(3 + 5 − 2)x = 6x'],'ایک جیسے متغیر والی اصطلاحات کے عددی سر جمع کریں۔'],
['distribute','Expanding brackets',1,['multiply','like-terms'],'Multiply every term inside the brackets.','The outside factor multiplies every term: a(b + c) = ab + ac.',['3(x + 4) = 3x + 3 × 4','3(x + 4) = 3x + 12'],'قوسین سے باہر کے عدد کو اندر کی ہر اصطلاح سے ضرب دیں۔'],
['balance','Keeping equations balanced',1,['integers'],'Understand why the same operation goes on both sides.','An equation stays true when you add or subtract the same number on both sides.',['x + 7 = 12','Subtract 7 from both sides: x = 5'],'مساوات کے دونوں طرف ایک ہی عمل کریں۔'],
['one-add','One-step equations',2,['balance'],'Undo addition or subtraction to isolate x.','Use the inverse operation on both sides. Check by substituting your answer.',['x − 6 = 9','Add 6 to both sides: x = 15','Check: 15 − 6 = 9'],'متغیر کو الگ کرنے کے لیے الٹا عمل کریں۔'],
['one-mul','Multiplication equations',2,['multiply','balance'],'Undo multiplication using division.','For ax = b with a ≠ 0, divide both sides by a.',['4x = 20','x = 20 ÷ 4 = 5'],'دونوں طرف متغیر کے عددی سر سے تقسیم کریں۔'],
['two-step','Two-step equations',2,['one-add','one-mul'],'Undo operations in the right sequence.','Undo the added or subtracted number first, then divide by the coefficient.',['3x + 4 = 19','3x = 15','x = 5'],'پہلے جمع یا تفریق ختم کریں، پھر تقسیم کریں۔'],
['both-sides','Variables on both sides',2,['two-step','like-terms'],'Bring variable terms together.','Subtract a variable term from both sides, then solve the simpler equation.',['5x + 2 = 3x + 10','2x + 2 = 10','2x = 8, so x = 4'],'متغیر والی اصطلاحات کو ایک طرف جمع کریں۔'],
['bracket-eq','Equations with brackets',2,['distribute','two-step'],'Connect expansion with equation solving.','Expand the brackets, combine like terms, then isolate the variable.',['2(x + 3) = 14','2x + 6 = 14','2x = 8, so x = 4'],'پہلے قوسین کھولیں، پھر مساوات حل کریں۔'],
['word','Words into equations',3,['two-step'],'Translate a short story into mathematics.','Choose an unknown, write the relationship as an equation, solve, and check the units.',['Three notebooks and a Rs 20 pen cost Rs 110.','3x + 20 = 110','x = 30 rupees per notebook'],'نامعلوم مقدار کے لیے متغیر منتخب کریں اور مساوات بنائیں۔'],
['check','Checking solutions',3,['substitute','bracket-eq','both-sides'],'Use substitution to verify a proposed answer.','Replace x with the proposed value on both sides. Equal values mean the solution works.',['Does x = 3 solve 2x + 1 = 7?','Left side: 2 × 3 + 1 = 7','Both sides are 7: yes.'],'جواب کو اصل مساوات میں رکھ کر دونوں طرف کی قیمت برابر کریں۔']
];
export const skills:Skill[]=rows.map(([id,title,group,prerequisites,description,rule,example,urdu])=>({id,title,group,prerequisites,description,rule,example,urdu}));
export type Question={id:string;skillId:string;prompt:string;expression:string;answer:number;hint:string[];solution:string[];unit?:string;difficulty:number;misconception?:{value:number;text:string}};
export function makeQuestion(s:Skill,i:number):Question {
 const a=i+2,b=i%4+3,x=i+1;let prompt='Calculate the value.',expression='',answer=0,hint=[s.rule],solution:string[]=[],unit:string|undefined,misconception:Question['misconception'];
 switch(s.id){
 case'integers':expression=`−${a} + ${a+b}`;answer=b;solution=[`Start at −${a} and move ${a+b} steps right.`,`−${a} + ${a+b} = ${b}`];break;
 case'multiply':expression=`(−${a}) × ${i%2?`(−${b})`:b}`;answer=i%2?a*b:-a*b;solution=[i%2?'Two negative factors give a positive product.':'Different signs give a negative product.',`The answer is ${answer}.`];break;
 case'order':expression=`${a} + ${b} × ${x}`;answer=a+b*x;misconception={value:(a+b)*x,text:'It looks like you added before multiplying. Multiplication comes first here.'};solution=[`${b} × ${x} = ${b*x}`,`${a} + ${b*x} = ${answer}`];break;
 case'fractions':prompt='What number belongs in the box?';expression=`${a}/${a+1} = □/${(a+1)*b}`;answer=a*b;solution=[`The denominator is multiplied by ${b}.`,`Multiply the numerator too: ${a} × ${b} = ${answer}.`];break;
 case'fraction-add':expression=`1/${a} + 1/${2*a}`;answer=3/(2*a);prompt='Give your answer as a fraction or decimal.';solution=[`1/${a} = 2/${2*a}`,`2/${2*a} + 1/${2*a} = 3/${2*a}`];break;
 case'substitute':prompt=`Evaluate when x = ${x}.`;expression=`${a}x + ${b}`;answer=a*x+b;solution=[`${a} × ${x} + ${b}`,`${a*x} + ${b} = ${answer}`];break;
 case'like-terms':prompt='What is the coefficient of x after simplifying?';expression=`${a}x + ${b}x − x`;answer=a+b-1;unit='coefficient';solution=[`Combine the coefficients: ${a} + ${b} − 1 = ${answer}.`,`The expression is ${answer}x.`];break;
 case'distribute':prompt='Expand the brackets. What is the constant term?';expression=`${a}(x + ${b})`;answer=a*b;misconception={value:b,text:'The outside number multiplies both x and the constant inside the brackets.'};solution=[`${a}(x + ${b}) = ${a}x + ${a} × ${b}`,`The constant term is ${answer}.`];break;
 case'balance':prompt=`Subtract ${b} from both sides. What is the new right-hand side?`;expression=`x + ${b} = ${x+b}`;answer=x;solution=[`x + ${b} − ${b} = ${x+b} − ${b}`,`x = ${x}`];break;
 case'one-add':prompt='Find x.';expression=`x − ${b} = ${x}`;answer=x+b;solution=[`Add ${b} to both sides.`,`x = ${x} + ${b} = ${answer}`];break;
 case'one-mul':prompt='Find x.';expression=`${a}x = ${a*x}`;answer=x;solution=[`Divide both sides by ${a}.`,`x = ${a*x} ÷ ${a} = ${x}`];break;
 case'two-step':prompt='Find x.';expression=`${a}x + ${b} = ${a*x+b}`;answer=x;solution=[`Subtract ${b}: ${a}x = ${a*x}.`,`Divide by ${a}: x = ${x}.`];break;
 case'both-sides':prompt='Find x.';expression=`${a+b}x + ${b} = ${a}x + ${b*x+b}`;answer=x;solution=[`Subtract ${a}x: ${b}x + ${b} = ${b*x+b}.`,`Subtract ${b}: ${b}x = ${b*x}.`,`Divide by ${b}: x = ${x}.`];break;
 case'bracket-eq':prompt='Find x.';expression=`${a}(x + ${b}) = ${a*(x+b)}`;answer=x;misconception={value:(a*(x+b)-b)/a,text:'Check the expansion: the outside factor multiplies every term inside the brackets.'};solution=[`Divide both sides by ${a}: x + ${b} = ${x+b}.`,`Subtract ${b}: x = ${x}.`];break;
 case'word':prompt=`${a} identical notebooks and a Rs ${b*10} pen cost Rs ${a*x*10+b*10}. How much is one notebook?`;expression=`${a}x + ${b*10} = ${a*x*10+b*10}`;answer=x*10;unit='rupees';solution=[`Subtract the pen's price: ${a}x = ${a*x*10}.`,`Divide by ${a}: x = ${x*10} rupees.`];break;
 case'check':prompt=`For x = ${x}, calculate the left side to check the equation.`;expression=`${a}x + ${b} = ${a*x+b}`;answer=a*x+b;solution=[`Substitute x = ${x}: ${a} × ${x} + ${b} = ${answer}.`,`This equals the right side, so x = ${x} works.`];break;
 }
 hint.push(solution[0]);return {id:`${s.id}:${i}`,skillId:s.id,prompt,expression,answer,hint,solution,unit,difficulty:Math.floor(i/3)+1,misconception};
}
export const questions=skills.flatMap(s=>Array.from({length:9},(_,i)=>makeQuestion(s,i)));
export function question(id:string){return questions.find(q=>q.id===id);}
export function parseAnswer(raw:string):number|null{
 const t=raw.trim().replace(/−/g,'-').replace(/^x\s*=\s*/i,'');
 if(/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(t)){const n=Number(t);return Number.isFinite(n)?n:null;}
 const m=t.match(/^([+-]?(?:\d+(?:\.\d*)?|\.\d+))\s*\/\s*([+-]?(?:\d+(?:\.\d*)?|\.\d+))$/);
 if(m&&Number(m[2])!==0)return Number(m[1])/Number(m[2]);return null;
}
export function isCorrect(raw:string,expected:number){const value=parseAnswer(raw);return value!==null&&Math.abs(value-expected)<=1e-6*Math.max(1,Math.abs(expected));}
export type Attempt={id:string;qid:string;answer:string;correct:boolean;hints:number;mode:'practice'|'diagnostic'|'review';created:number};
export type Learning={name:string;goal:string;attempts:Attempt[];lessons:string[];diagnostic:{run:string;seen:string[];done:boolean}|null};
export const emptyLearning=():Learning=>({name:'',goal:'Build confidence in algebra',attempts:[],lessons:[],diagnostic:null});
export function evidence(state:Learning,id:string){
 const rows=state.attempts.filter(a=>question(a.qid)?.skillId===id);const last=rows.slice(-5),independent=last.filter(a=>a.correct&&a.hints===0);
 const distinct=new Set(independent.map(a=>a.qid)).size;
 const status=rows.length===0?'Not assessed':last.length>=4&&distinct>=3&&independent.length>=4?'Demonstrated':last.slice(-2).some(a=>!a.correct)?'Needs practice':'Developing';
 return {total:rows.length,correct:rows.filter(a=>a.correct).length,independent:independent.length,status,percent:status==='Demonstrated'?100:rows.length===0?0:Math.min(80,Math.round(independent.length/5*100)),last:rows.at(-1)?.created};
}
export function recommended(state:Learning){
 const tried=skills.filter(s=>evidence(state,s.id).status==='Needs practice');
 return tried.find(s=>s.prerequisites.every(p=>evidence(state,p).status!=='Needs practice'))||skills.find(s=>evidence(state,s.id).status!=='Demonstrated')||skills[0];
}
export function diagnosticNext(state:Learning):Question|undefined{
 if(!state.diagnostic||state.diagnostic.done)return undefined;
 const remaining=skills.filter(s=>!state.diagnostic!.seen.includes(s.id));
 const last=state.attempts.filter(a=>a.mode==='diagnostic').at(-1);const lastSkill=skills.find(s=>s.id===question(last?.qid||'')?.skillId);
 const target=last&&!last.correct?remaining.find(s=>lastSkill?.prerequisites.includes(s.id)):undefined;
 const s=target||remaining.find(s=>s.group===2)||remaining[0];return s?makeQuestion(s,4):undefined;
}
export function practiceNext(state:Learning,id:string){const s=skills.find(s=>s.id===id)||recommended(state);const a=state.attempts.filter(a=>question(a.qid)?.skillId===s.id);const level=a.length&&a.at(-1)?.correct?Math.min(2,Math.floor(a.filter(r=>r.correct&&r.hints===0).length/3)):0;const choices=questions.filter(q=>q.skillId===s.id&&q.difficulty===level+1);return choices.find(q=>!a.slice(-3).some(v=>v.qid===q.id))||choices[0];}
