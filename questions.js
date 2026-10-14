{\rtf1\ansi\ansicpg1252\cocoartf2870
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const SC=["Strongly disagree","Disagree","Neutral","Agree","Strongly agree"],\
FQ=["Never","Rarely","Sometimes","Often","Very often"],\
YN=["Yes","No","Unsure"],PN="Prefer not to say",\
A="A \'b7 About you",B="B \'b7 Your habits",C="C \'b7 Friends and trends",D="D \'b7 Social media",E="E \'b7 Shops and surroundings",F="F \'b7 Routines",G="G \'b7 Awareness";\
const used=a=>a.ever!=="No";\
window.QS=[\
\{id:"consent",s:"Welcome",t:"Do you agree to take part?",n:"This is an anonymous research survey. It is voluntary and you can stop at any time. If you are under 18, please make sure a parent, guardian or teacher knows you are taking part.",k:"one",req:1,o:["I agree to take part","I do not agree"]\},\
\{id:"age",s:A,t:"Which age group are you in?",n:"Your answers are anonymous and will be analysed in aggregate.",k:"one",req:1,o:["Under 13","13\'9614","15\'9616","17\'9618","19 or older",PN]\},\
\{id:"area",s:A,t:"Which broad area of Qatar do you live in or usually spend most of your time in?",n:"No exact address needed.",k:"one",req:1,o:["Doha","Al Rayyan","Al Wakrah","Lusail","Al Daayen","Al Khor and Al Thakhira","Umm Salal","Al Shamal","Other area in Qatar",PN]\},\
\{id:"routine",s:A,t:"Which best describes your current routine?",k:"many",o:["Mostly studying","Gaming regularly","Participating in sports or exercise","Working part-time","Spending considerable time on social media","Other",PN]\},\
\{id:"ever",s:B,t:"Have you ever consumed an energy drink?",k:"one",req:1,o:YN\},\
\{id:"days30",s:B,t:"On how many days during the past 30 days did you consume an energy drink?",k:"one",show:used,o:["0 days","1\'962 days","3\'965 days","6\'9610 days","11\'9620 days","21\'9630 days","Unsure"]\},\
\{id:"serv",s:B,t:"On a typical day when you consume energy drinks, how many servings do you have?",k:"one",show:used,o:["Less than one","One","Two","Three or more","Unsure"]\},\
\{id:"why",s:B,t:"What are your main reasons for consuming energy drinks?",k:"many",show:used,o:["To feel more awake","To help me concentrate while studying","During examinations","While gaming","Before or during sports","Because friends consume them","Because I like the taste","Because of social media or advertising","Out of curiosity","Other","Not applicable"]\},\
\{id:"when",s:B,t:"When are you most likely to consume an energy drink?",k:"many",show:used,o:["During examination periods","While studying late","While gaming","Before or after sports","During social outings","When tired during an ordinary day","No particular time","Other","Not applicable"]\},\
\{id:"nouse",s:B,t:"What are your main reasons for not consuming energy drinks?",k:"many",show:a=>a.ever==="No",o:["I don't like the taste","Health concerns","Caffeine or sugar content","My family or school discourages it","They cost too much","I prefer other drinks","I have never been interested","Other",PN]\},\
\{id:"c1",s:C,t:"People in my social circle consume energy drinks.",n:"How much do you agree?",k:"scale",o:SC\},\
\{id:"c2",s:C,t:"Friends' recommendations influence which drinks I try.",k:"scale",o:SC\},\
\{id:"c3",s:C,t:"I would be more interested in trying an energy drink if my friends recommended it.",k:"scale",o:SC\},\
\{id:"c4",s:C,t:"Energy drinks are viewed positively by people I spend time with.",k:"scale",o:SC\},\
\{id:"rec",s:C,t:"Have you ever tried an energy drink mainly because someone recommended it?",k:"one",o:[...YN,PN]\},\
\{id:"d_freq",s:D,t:"How often do you see energy drink-related content on social media?",k:"one",o:[...FQ,"Unsure"]\},\
\{id:"d_where",s:D,t:"Where do you see this content?",k:"many",o:["TikTok","Instagram","YouTube","Snapchat","Twitch or gaming streams","Other platforms","I do not encounter such content","Unsure"]\},\
\{id:"d_type",s:D,t:"What type of content do you usually see?",k:"many",o:["Influencers or content creators","Gaming-related content","Sports-related content","Paid advertisements","Product reviews","Friends posting about energy drinks","Memes or entertainment","Other","None"]\},\
\{id:"d_cur",s:D,t:"Seeing an energy drink online has made me curious about trying it.",k:"scale",o:SC\},\
\{id:"d_buy",s:D,t:"Have you ever tried or purchased an energy drink after seeing it featured online?",k:"one",o:[...YN,PN]\},\
\{id:"d_talk",s:D,t:"How often do you discuss energy drinks with friends, in person or in group chats?",k:"one",o:FQ\},\
\{id:"e_find",s:E,t:"How easy is it to find energy drinks where you usually buy food or drinks?",k:"one",o:["Very difficult","Difficult","Neither difficult nor easy","Easy","Very easy","Unsure"]\},\
\{id:"e_where",s:E,t:"Where have you seen energy drinks available?",k:"many",o:["Supermarkets","Convenience stores","Petrol station shops","Vending machines","Caf\'e9s or restaurants","Online retailers","Other","Unsure"]\},\
\{id:"e_time",s:E,t:"About how long does it take to reach a shop that sells energy drinks from places you regularly visit?",k:"one",o:["Less than 5 minutes","5\'9610 minutes","11\'9620 minutes","More than 20 minutes","Unsure"]\},\
\{id:"e_avail",s:E,t:"When buying drinks, how often does easy availability influence your choice?",k:"one",o:FQ\},\
\{id:"f_late",s:F,t:"How often do you stay awake later than intended because of studying or schoolwork?",k:"one",o:FQ\},\
\{id:"f_game",s:F,t:"How often do you play video games?",k:"one",o:["Never","Less than weekly","1\'963 days per week","4\'966 days per week","Daily"]\},\
\{id:"f_press",s:F,t:"How often do you feel pressure to stay alert or productive when tired?",k:"one",o:FQ\},\
\{id:"f_new",s:F,t:"Which statement best describes your usual approach to trying new drinks?",k:"one",o:["I like trying new products","I usually try products recommended by friends","I am influenced by online trends","I prefer familiar products","It depends on the situation",PN]\},\
\{id:"f_exam",s:F,t:"During examination periods, does your energy drink consumption change?",k:"one",o:["Increases","Decreases","Stays about the same","I do not consume energy drinks","Not applicable","Unsure"]\},\
\{id:"g_fam",s:G,t:"Before this survey, how familiar were you with the potential health effects of energy drinks?",k:"one",o:["Not at all familiar","Slightly familiar","Moderately familiar","Very familiar","Extremely familiar"]\},\
\{id:"g_conf",s:G,t:"How confident are you that you can find the caffeine content of an energy drink from its label?",k:"one",o:["Not at all confident","Slightly confident","Moderately confident","Very confident","Extremely confident"]\},\
\{id:"g_enc",s:G,t:"Which would most help you make a more informed decision about energy drinks?",n:"This survey does not give medical advice.",k:"many",o:["Clearer product labels","Information about caffeine content","Information about sleep and health","Advice from a healthcare professional","Information from school","Better awareness of advertising techniques","None of these","Other"]\}\
];}
