{\rtf1\ansi\ansicpg1252\cocoartf2870
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 (()=>\{\
const $=s=>document.querySelector(s),a=\{\},EX=/^(Prefer not|None|Not applicable|I do not encounter|Unsure|No particular)/;\
let i=0,busy=false;\
const cfg=window.BTB_CONFIG,sb=cfg.SUPABASE_URL.startsWith("http")?supabase.createClient(cfg.SUPABASE_URL,cfg.SUPABASE_ANON_KEY):null;\
const vis=()=>QS.filter(q=>!q.show||q.show(a));\
const set=(h,p)=>\{$("#card").innerHTML=h;$("#bar").style.width=p+"%";$(".progress").setAttribute("aria-valuenow",p);$("#card").scrollIntoView(\{block:"nearest"\})\};\
const txt=v=>v===undefined||(Array.isArray(v)&&!v.length)?"Skipped":Array.isArray(v)?v.join(", "):v;\
$("#start").onclick=()=>\{$("#hero").hidden=$("#why").hidden=true;$("#quiz").hidden=false;render()\};\
\
function render()\{\
 const v=vis();if(i>=v.length)return review(v);\
 const q=v[i],p=Math.round(100*i/(v.length+1));\
 $("#plabel").textContent=`Question $\{i+1\} of $\{v.length\}`;\
 let h=`<p class="sec">$\{q.s\}</p><h3 id="qt">$\{q.t\}</h3>$\{q.n?`<p class="hint">$\{q.n\}</p>`:""\}<p class="hint">$\{q.req?"Required":"Optional: you can skip this"\}$\{q.k==="many"?" \'b7 Select all that apply":""\}</p><div class="opts $\{q.k==="scale"?"scale":""\}" role="group" aria-labelledby="qt">`;\
 q.o.forEach((o,j)=>\{const on=q.k==="many"?(a[q.id]||[]).includes(o):a[q.id]===o;h+=`<button type="button" class="opt$\{on?" on":""\}" aria-pressed="$\{on\}" data-j="$\{j\}">$\{o\}</button>`\});\
 h+=`</div><p class="err" id="err" role="alert"></p><div class="nav"><button class="btn ghost" id="back" $\{i?"":"disabled"\}>Back</button><button class="btn primary" id="next">Continue</button></div>`;\
 set(h,p);\
 document.querySelectorAll(".opt").forEach(b=>b.onclick=()=>\{\
  const o=q.o[b.dataset.j];\
  if(q.k==="many")\{let c=a[q.id]||[];if(c.includes(o))c=c.filter(x=>x!==o);else c=EX.test(o)?[o]:[...c.filter(x=>!EX.test(x)),o];a[q.id]=c;if(!c.length)delete a[q.id]\}\
  else a[q.id]=o;\
  render()\});\
 $("#back").onclick=()=>\{i--;render()\};\
 $("#next").onclick=()=>\{\
  if(q.req&&!a[q.id])return $("#err").textContent="Please choose an answer to continue.";\
  if(q.id==="consent"&&a.consent!==q.o[0])return done(false);\
  i++;render()\};\
\}\
function review(v)\{\
 $("#plabel").textContent="Review";\
 set(`<h3>Check your answers</h3><p class="hint">Nothing is sent until you press Submit. Use Back to change anything.</p><dl class="rev">$\{v.map(q=>`<dt>$\{q.t\}</dt><dd>$\{txt(a[q.id])\}</dd>`).join("")\}</dl><p class="err" id="err" role="alert"></p><div class="nav"><button class="btn ghost" id="back">Back</button><button class="btn primary" id="send">Submit</button></div>`,95);\
 $("#back").onclick=()=>\{i=v.length-1;render()\};\
 $("#send").onclick=async()=>\{\
  if(busy)return;busy=true;$("#send").disabled=true;\
  const rec=\{\};vis().forEach(q=>\{if(a[q.id]!==undefined)rec[q.id]=a[q.id]\});\
  if(!sb)\{busy=false;$("#send").disabled=false;return $("#err").textContent="The survey is not connected to its database yet. Add the Supabase details in js/config.js."\}\
  const\{error\}=await sb.from("responses").insert(\{answers:rec\});\
  if(error)\{busy=false;$("#send").disabled=false;return $("#err").textContent="Could not send your answers. Check your connection and try again."\}\
  done(true)\};\
\}\
function done(ok)\{\
 $("#plabel").textContent="";\
 set(ok?`<h3>Thank you</h3><p>Your anonymous answers have been sent. They will be analysed together with everyone else's to look for patterns, not to judge anyone's choices.</p><p class="hint">This survey cannot give medical advice. If you have questions about caffeine or your health, ask a doctor or pharmacist.</p>`:`<h3>No problem</h3><p>Nothing was recorded. Thanks for stopping by.</p>`,100);\
\}\
\})();}
