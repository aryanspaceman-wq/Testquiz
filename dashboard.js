{\rtf1\ansi\ansicpg1252\cocoartf2870
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 (()=>\{\
const $=s=>document.querySelector(s),Q=Object.fromEntries(QS.map(q=>[q.id,q])),MIN=5,cfg=window.BTB_CONFIG;\
const sb=supabase.createClient(cfg.SUPABASE_URL,cfg.SUPABASE_ANON_KEY);\
let rows=[];\
const pc=x=>Math.round(100*x)+"%",vals=(r,id)=>\{const v=r[id];return v===undefined?[]:Array.isArray(v)?v:[v]\};\
const wilson=(k,n)=>\{const z=1.96,p=k/n,d=1+z*z/n,c=p+z*z/(2*n),m=z*Math.sqrt(p*(1-p)/n+z*z/(4*n*n));return[(c-m)/d,(c+m)/d]\};\
const card=(t,b,f)=>`<section class="dc"><h3>$\{t\}</h3>$\{b\}<p class="foot">$\{f\}</p></section>`;\
\
async function enter()\{\
 $("#login").hidden=true;$("#dash").hidden=false;\
 let all=[],f=0;\
 for(;;)\{const\{data,error\}=await sb.from("responses").select("id,created_at,answers").order("id").range(f,f+999);\
  if(error)\{$("#out-charts").innerHTML=`<p class="err">$\{error.message\}</p>`;return\}\
  all=all.concat(data);if(data.length<1000)break;f+=1000\}\
 rows=all.map(r=>(\{id:r.id,created_at:r.created_at,...r.answers\}));\
 const fill=(el,l,o)=>\{$(el).innerHTML=`<option value="">$\{l\}</option>`+o.map(x=>`<option>$\{x\}</option>`).join("");$(el).onchange=draw\};\
 fill("#fa","All ages",Q.age.o);fill("#fr","All areas",Q.area.o);fill("#fe","All consumption",Q.ever.o);\
 draw();\
\}\
function bars(d,t,id)\{\
 const ans=d.filter(r=>vals(r,id).length),n=ans.length;\
 const b=Q[id].o.map(o=>\{const k=ans.filter(r=>vals(r,id).includes(o)).length;\
  return k<MIN?`<div class="r"><span>$\{o\}</span><i></i><em>&lt;$\{MIN\}</em></div>`:`<div class="r"><span>$\{o\}</span><i><u style="width:$\{100*k/n\}%"></u></i><em>$\{pc(k/n)\} ($\{k\})</em></div>`\}).join("");\
 return card(t,b,`$\{n\} answered of $\{d.length\}; $\{d.length-n\} missing. Percentages are of those who answered.`);\
\}\
function stack(d,t,x,y="ever")\{\
 const qy=Q[y],both=d.filter(r=>vals(r,x).length&&vals(r,y).length);\
 const b=Q[x].o.map(o=>\{const g=both.filter(r=>vals(r,x)[0]===o),n=g.length;\
  if(n<MIN)return `<div class="r"><span>$\{o\}</span><i></i><em>n&lt;$\{MIN\}</em></div>`;\
  return `<div class="r"><span>$\{o\}</span><i>$\{qy.o.map((yo,j)=>\{const k=g.filter(r=>vals(r,y)[0]===yo).length;return k?`<u class="s$\{j\}" style="width:$\{100*k/n\}%" title="$\{yo\}: $\{pc(k/n)\} (n=$\{k\})"></u>`:""\}).join("")\}</i><em>n=$\{n\}</em></div>`\}).join("");\
 const lg=qy.o.map((yo,j)=>`<b class="lg"><u class="s$\{j\}"></u>$\{yo\}</b>`).join("");\
 return card(t,lg+b,`Denominator: $\{both.length\} people who answered both questions (of $\{d.length\} in view). Hover a bar segment for details. Association only, not cause.`);\
\}\
function draw()\{\
 const fa=$("#fa").value,fr=$("#fr").value,fe=$("#fe").value;\
 const d=rows.filter(r=>(!fa||r.age===fa)&&(!fr||r.area===fr)&&(!fe||r.ever===fe));\
 let h=`<p class="stat"><b>$\{d.length\}</b> valid responses in view ($\{rows.length\} in total)</p>`;\
 if(d.length<MIN)\{$("#out-charts").innerHTML=h+`<p class="note">Fewer than $\{MIN\} responses in this view, so breakdowns are hidden to protect participants.</p>`;return\}\
 const ev=d.filter(r=>r.ever),k=ev.filter(r=>r.ever==="Yes").length;\
 let pv="";if(ev.length>=MIN)\{const[l,u]=wilson(k,ev.length);pv=`<p class="stat"><b>$\{pc(k/ev.length)\}</b> have ever tried an energy drink</p><p>95% confidence interval: $\{pc(l)\} to $\{pc(u)\} (Wilson method).</p>`\}\
 h+=card("Estimated prevalence (ever consumed)",pv||"Not enough answers.",`Denominator: $\{ev.length\} who answered, of $\{d.length\}. The interval describes sampling uncertainty only, not bias from who chose to take part.`);\
 h+=bars(d,"Age groups","age");\
 h+=stack(d,"Ever consumed, by age group","age");\
 h+=stack(d,"Days of use in the past 30 days, by age group","age","days30");\
 h+=stack(d,"Ever consumed, by broad area","area");\
 h+=stack(d,"Friends' recommendations influence what I try, vs ever consumed","c2");\
 h+=stack(d,"Tried because someone recommended it, vs ever consumed","rec");\
 h+=stack(d,"Energy drink content seen on social media, vs ever consumed","d_freq");\
 h+=stack(d,"Tried after seeing it online, vs ever consumed","d_buy");\
 h+=stack(d,"Gaming frequency, vs ever consumed","f_game");\
 h+=stack(d,"Staying up late for schoolwork, vs ever consumed","f_late");\
 h+=bars(d,"Change in use during exams","f_exam");\
 h+=stack(d,"How easy to find energy drinks, vs ever consumed","e_find");\
 h+=bars(d,"Where energy drinks have been seen","e_where");\
 h+=stack(d,"Familiarity with health effects, vs ever consumed","g_fam");\
 h+=bars(d,"What would help informed decisions","g_enc");\
 $("#out-charts").innerHTML=h;\
\}\
const esc=v=>`"$\{String(v??"").replace(/"/g,'""')\}"`;\
$("#csv").onclick=()=>\{\
 const cols=["id","created_at",...QS.map(q=>q.id)];\
 const csv=[cols.join(","),...rows.map(r=>cols.map(c=>esc(Array.isArray(r[c])?r[c].join("|"):r[c])).join(","))].join("\\n");\
 const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],\{type:"text/csv"\}));a.download="beyond-the-buzz.csv";a.click();\
\};\
$("#out").onclick=async()=>\{await sb.auth.signOut();location.reload()\};\
$("#go").onclick=async()=>\{\
 const\{error\}=await sb.auth.signInWithPassword(\{email:$("#em").value.trim(),password:$("#pw").value\});\
 if(error)return $("#lerr").textContent="Sign-in failed. Check your email and password.";enter()\};\
sb.auth.getSession().then((\{data\})=>\{if(data.session)enter()\});\
\})();}
