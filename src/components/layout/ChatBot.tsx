"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  MessageSquare, X, Minus, Send, Paperclip,
  Lightbulb, ShieldCheck, Thermometer, LayoutGrid,
  ClipboardList, Wrench, CheckCircle, Sunrise, Sunset,
  CalendarCheck, Info, ArrowRight, Home, DollarSign,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
type Stage = "greeting"|"area_select"|"stage_select"|"next_step"|"collect_name"|"collect_contact"|"lead_captured"|"book_time"|"done";
interface Message { id: number; role: "bot"|"user"; text: string; time: string; }
interface Lead { area?: string; stage?: string; name?: string; contact?: string; }

// ── Card meta ──────────────────────────────────────────────────────────────
// Per-card icon accent colors
const ICON_COLOR: Record<string,string> = {
  "Lighting":"#f59e0b","Security":"#3b82f6","Climate":"#10b981","Full Setup":"#8b5cf6",
  "Planning":"#6b7280","Under construction":"#f97316","Ready to install":"#10b981",
  "Yes, plan it out":"#2563eb","Tell me more first":"#6b7280",
  "Yes, book a call":"#2563eb","No thanks":"#9ca3af",
  "Morning":"#f59e0b","Afternoon":"#f97316",
  "Explore Services":"#2563eb","View Pricing":"#6b7280",
};
const CARD_MAP: Record<string,{icon:React.ReactNode;subtitle:string}> = {
  "Lighting":             { icon:<Lightbulb   size={16}/>, subtitle:"Scenes & automation"       },
  "Security":             { icon:<ShieldCheck  size={16}/>, subtitle:"Cameras & sensors"          },
  "Climate":              { icon:<Thermometer  size={16}/>, subtitle:"AC & temperature control"   },
  "Full Setup":           { icon:<LayoutGrid   size={16}/>, subtitle:"Complete system"            },
  "Planning":             { icon:<ClipboardList size={16}/>, subtitle:"System design phase"       },
  "Under construction":   { icon:<Wrench        size={16}/>, subtitle:"Active build"              },
  "Ready to install":     { icon:<CheckCircle   size={16}/>, subtitle:"Install & go live"         },
  "Yes, plan it out":     { icon:<ArrowRight    size={16}/>, subtitle:"Get a tailored proposal"   },
  "Tell me more first":   { icon:<Info          size={16}/>, subtitle:"Learn about the system"    },
  "Yes, book a call":     { icon:<CalendarCheck size={16}/>, subtitle:"Schedule a consultation"   },
  "No thanks":            { icon:<X             size={16}/>, subtitle:"We'll reach out instead"   },
  "Morning":              { icon:<Sunrise       size={16}/>, subtitle:"9 am – 12 pm"              },
  "Afternoon":            { icon:<Sunset        size={16}/>, subtitle:"12 pm – 5 pm"              },
  "Explore Services":     { icon:<Home          size={16}/>, subtitle:"See what we offer"         },
  "View Pricing":         { icon:<DollarSign    size={16}/>, subtitle:"Packages & costs"          },
};
function cardMeta(chip:string){ return CARD_MAP[chip] ?? { icon:<ArrowRight size={16}/>, subtitle:"" }; }

// ── Chips ──────────────────────────────────────────────────────────────────
const CHIPS: Partial<Record<Stage,string[]>> = {
  greeting:      ["Lighting","Security","Climate","Full Setup"],
  stage_select:  ["Planning","Under construction","Ready to install"],
  next_step:     ["Yes, plan it out","Tell me more first"],
  lead_captured: ["Yes, book a call","No thanks"],
  book_time:     ["Morning","Afternoon"],
};

// ── Knowledge ──────────────────────────────────────────────────────────────
const AREA: Record<string,{label:string;benefit:string}> = {
  lighting:{ label:"Smart Lighting",    benefit:"Automated lighting reduces energy use by up to 40% and lets you set scenes for every moment." },
  security:{ label:"Security & Access", benefit:"Smart locks and cameras give you full visibility and control — remotely, 24/7." },
  climate: { label:"Climate Control",   benefit:"A smart HVAC system learns your schedule and keeps comfort consistent while cutting power bills." },
  full:    { label:"Full Smart Home",   benefit:"A unified system ties lighting, security, and climate into one seamless, app-driven experience." },
};
const MORE: Record<string,string> = {
  lighting:"Our lighting system uses Zigbee or Wi-Fi switches — no new wiring. Scene control, schedules, motion triggers, voice support.\n\nReady for a plan?",
  security:"Smart locks, door/window sensors, and cameras in a single dashboard. Real-time alerts and remote access from anywhere.\n\nReady for a recommendation?",
  climate: "Smart thermostats and IR controllers work with any AC or HVAC brand. Average energy saving: 20–30%.\n\nWant a scoped plan?",
  full:    "A full setup covers lighting scenes, security monitoring, and climate — all in one app.\n\nWant us to build a plan?",
};
function stageAdvice(area:string, stage:string){
  const m = AREA[area]??AREA.full;
  if(/plan/i.test(stage))      return `Good — planning is the best time to get this right.\n\nFor ${m.label.toLowerCase()}, I'd start with a system design: device placement, hub selection, and integration.\n\nWould you like a tailored plan?`;
  if(/construct|build/i.test(stage)) return `Perfect timing. We can pre-wire for ${m.label.toLowerCase()} during construction for a clean, zero-compromise install.\n\nWould you like a tailored plan?`;
  return `Ready to install — let's move efficiently.\n\nFor ${m.label.toLowerCase()}, I'd recommend a product shortlist and single-visit setup. Most apartments are live within 2 days.\n\nWould you like a tailored plan?`;
}

// ── Engine ─────────────────────────────────────────────────────────────────
const REASK: Partial<Record<Stage,string>> = {
  greeting:"What would you like to improve — Lighting, Security, Climate, or a Full Setup?",
  area_select:"What would you like to improve — Lighting, Security, Climate, or a Full Setup?",
  stage_select:"Where are you — Planning, Under construction, or Ready to install?",
  next_step:"Would you like us to put together a tailored plan?",
  collect_name:"May I have your name?",
  collect_contact:"What's the best way to reach you — phone or email?",
};
function intercept(text:string, stage:Stage, reask:string):string|null{
  const t=text.toLowerCase();
  if(/price|cost|how much|budget/.test(t)) return `Pricing scales with complexity. A starter lighting setup begins around ₹25,000. Full home: ₹1.5L–₹4L.\n\n${reask}`;
  if(/how long|timeline|days|weeks/.test(t)) return `Most apartments are fully set up within 1–3 days. No major rewiring needed.\n\n${reask}`;
  if(/rewir|wall|drill/.test(t)) return `Our systems are retrofit-first — no drilling into walls. Devices are wireless or use existing wiring.\n\n${reask}`;
  if(/contact|reach|email|phone|call/.test(t)&&stage!=="collect_contact") return `Reach us at hello@weinkling.com or +91 98765 43210.\n\n${reask}`;
  return null;
}
function process(text:string, stage:Stage, lead:Lead):{reply:string;nextStage:Stage;chips?:string[];leadUpdate?:Partial<Lead>}{
  const t=text.toLowerCase(); const reask=REASK[stage]??"";
  if(stage!=="collect_name"&&stage!=="collect_contact"){ const hit=intercept(text,stage,reask); if(hit) return {reply:hit,nextStage:stage,chips:CHIPS[stage]}; }
  switch(stage){
    case "greeting":
    case "area_select":{
      let area="full";
      if(/light/.test(t)) area="lighting";
      else if(/secur|lock|camera/.test(t)) area="security";
      else if(/climat|hvac|ac|heat|temp/.test(t)) area="climate";
      return {reply:`${AREA[area].benefit}\n\nWhere are you in the process?`,nextStage:"stage_select",chips:CHIPS.stage_select,leadUpdate:{area}};
    }
    case "stage_select":
      return {reply:stageAdvice(lead.area??"full",t),nextStage:"next_step",chips:CHIPS.next_step,leadUpdate:{stage:text.trim()}};
    case "next_step":
      if(/yes|sure|go|plan|ok|please|let/.test(t)) return {reply:"Let me get that started. What's your name?",nextStage:"collect_name"};
      return {reply:MORE[lead.area??"full"]??MORE.full,nextStage:"next_step",chips:CHIPS.next_step};
    case "collect_name":{
      const name=text.trim().split(" ")[0];
      return {reply:`Good to meet you, ${name}. What's the best way to reach you — phone or email?`,nextStage:"collect_contact",leadUpdate:{name}};
    }
    case "collect_contact":
      return {reply:`Noted. Our team will send you a tailored plan for your ${AREA[lead.area??"full"]?.label.toLowerCase()??"smart home"} setup within 24 hours.\n\nWould you like to book a quick consultation call?`,nextStage:"lead_captured",chips:CHIPS.lead_captured,leadUpdate:{contact:text.trim()}};
    case "lead_captured":
      if(/yes|book|call|sure|ok/.test(t)) return {reply:"What time works — morning or afternoon?",nextStage:"book_time",chips:CHIPS.book_time};
      return {reply:`Understood${lead.name?`, ${lead.name}`:""}. We'll be in touch soon.\n\nAnything else I can help with?`,nextStage:"done"};
    case "book_time":{
      const slot=/morning/i.test(t)?"morning":"afternoon";
      return {reply:`We'll confirm your ${slot} slot shortly${lead.name?`, ${lead.name}`:""}.\n\nThank you for choosing Weinkling.`,nextStage:"done"};
    }
    case "done":
      return {reply:"Happy to help with anything else. You can also reach us at hello@weinkling.com or +91 98765 43210.",nextStage:"done",chips:["Explore Services","View Pricing"]};
    default:
      return {reply:"Let's start fresh. What would you like to improve?",nextStage:"greeting",chips:CHIPS.greeting};
  }
}

function nowTime(){ return new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}); }

const WELCOME:Message = { id:1, role:"bot", text:"Let's start with one area. What would you like to improve first?", time:"" };

// ── Component ──────────────────────────────────────────────────────────────
export default function ChatBot() {
  const [open, setOpen]           = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages]   = useState<Message[]>([WELCOME]);
  const [chips, setChips]         = useState<string[]>(CHIPS.greeting!);
  const [input, setInput]         = useState("");
  const [typing, setTyping]       = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const bottomRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);
  const nextId     = useRef(2);
  const stageRef   = useRef<Stage>("greeting");
  const leadRef    = useRef<Lead>({});
  const processing = useRef(false);

  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:"smooth"}); },[messages,typing]);
  useEffect(()=>{ if(open){ setHasUnread(false); setShowTooltip(false); setTimeout(()=>inputRef.current?.focus(),200); } },[open]);
  useEffect(()=>{
    // Set welcome message time on client only (avoids SSR hydration mismatch)
    setMessages([{...WELCOME, time:nowTime()}]);
  },[]);
  useEffect(()=>{
    const t = setTimeout(()=>setShowTooltip(true), 3000);
    return ()=>clearTimeout(t);
  },[]);

  const send = useCallback((text:string)=>{
    if(!text.trim()||processing.current) return;
    processing.current=true;
    const userMsg:Message={id:nextId.current++,role:"user",text:text.trim(),time:nowTime()};
    setMessages(p=>[...p,userMsg]); setInput(""); setChips([]); setTyping(true);
    setTimeout(()=>{
      const {reply,nextStage,chips:nc,leadUpdate}=process(text,stageRef.current,leadRef.current);
      if(leadUpdate) leadRef.current={...leadRef.current,...leadUpdate};
      stageRef.current=nextStage;
      setMessages(p=>[...p,{id:nextId.current++,role:"bot",text:reply,time:nowTime()}]);
      setChips(nc??[]); setTyping(false); processing.current=false;
    },900+Math.random()*400);
  },[]);

  return (
    <>
      <style>{`
        @keyframes slideUp   { from{opacity:0;transform:translateY(16px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes fadeUp    { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
        @keyframes dot       { 0%,80%,100%{transform:translateY(0);opacity:.3} 40%{transform:translateY(-4px);opacity:1} }
        @keyframes tooltipIn { from{opacity:0;transform:translateY(8px) scale(0.95)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes pulse     { 0%{box-shadow:0 0 0 0 rgba(15,73,112,0.55)} 70%{box-shadow:0 0 0 10px rgba(15,73,112,0)} 100%{box-shadow:0 0 0 0 rgba(15,73,112,0)} }
        .cb-open    { animation: slideUp   .28s cubic-bezier(.34,1.56,.64,1) both }
        .cb-msg     { animation: fadeUp    .18s ease both }
        .cb-tooltip { animation: tooltipIn .3s cubic-bezier(.34,1.56,.64,1) both }
        .cb-fab-pulse { animation: pulse 2.2s ease-in-out infinite }
        .cb-chip:hover { background:#f8faff !important; border-color:#b0cbdf !important; }
        #chatbot-messages::-webkit-scrollbar { width:4px }
        #chatbot-messages::-webkit-scrollbar-track { background:transparent }
        #chatbot-messages::-webkit-scrollbar-thumb { background:#e5e7eb; border-radius:4px }
      `}</style>

      {/* ── Premium Tooltip ──────────────────────────────────────── */}
      {showTooltip && !open && (
        <div className="cb-tooltip" style={{position:"fixed",bottom:92,right:24,zIndex:9998,background:"#fff",borderRadius:20,width:288,boxShadow:"0 16px 56px rgba(0,0,0,0.16), 0 2px 12px rgba(0,0,0,0.08)",border:"1px solid rgba(0,0,0,0.06)",overflow:"hidden",cursor:"pointer"}}
          onClick={()=>{ setOpen(true); setMinimized(false); }}>
          <div style={{height:3,background:"linear-gradient(90deg,#0F4970 0%,#8cb4b8 50%,#0F4970 100%)"}} />
          <div style={{padding:"14px 14px 15px"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:11}}>
              <div style={{position:"relative",flexShrink:0}}>
                <img src="/nova-avatar.png" alt="Nova" style={{width:38,height:38,borderRadius:"50%",objectFit:"cover",display:"block",border:"2px solid #e8f0f7"}} />
                <span style={{position:"absolute",bottom:1,right:1,width:10,height:10,borderRadius:"50%",background:"#22c55e",border:"2px solid #fff"}} />
              </div>
              <div style={{flex:1,minWidth:0}}>
                <p style={{margin:0,fontSize:13,fontWeight:700,color:"#0a1628",letterSpacing:"-0.01em"}}>Nova — Weinkling</p>
                <p style={{margin:0,fontSize:11,color:"#64748b",marginTop:2}}>Smart Home Consultant · Online</p>
              </div>
              <button onClick={e=>{ e.stopPropagation(); setShowTooltip(false); }} aria-label="Dismiss"
                style={{width:24,height:24,borderRadius:"50%",border:"none",background:"#f1f5f9",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#94a3b8",flexShrink:0,padding:0}}>
                <X size={11}/>
              </button>
            </div>
            <div style={{background:"#f1f5f9",borderRadius:"4px 14px 14px 14px",padding:"10px 13px",marginBottom:12}}>
              <p style={{margin:0,fontSize:13,fontWeight:600,color:"#0a1628",lineHeight:1.5}}>Hi there! 👋 I'm Nova.</p>
              <p style={{margin:"5px 0 0",fontSize:12,color:"#64748b",lineHeight:1.55}}>Ask me about lighting, security, climate — or get a free smart home plan.</p>
            </div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <span style={{fontSize:11,color:"#94a3b8",display:"flex",alignItems:"center",gap:4}}>
                <span style={{width:6,height:6,borderRadius:"50%",background:"#22c55e",display:"inline-block"}}/>
                Replies instantly
              </span>
              <div style={{display:"flex",alignItems:"center",gap:5,background:"#0F4970",color:"#fff",borderRadius:999,padding:"6px 14px",fontSize:12,fontWeight:600}}>
                <span>Chat now</span><ArrowRight size={11}/>
              </div>
            </div>
          </div>
          <span style={{position:"absolute",bottom:-7,right:24,width:14,height:8,overflow:"hidden"}}>
            <span style={{position:"absolute",top:0,left:0,width:14,height:14,background:"#fff",border:"1px solid rgba(0,0,0,0.06)",transform:"rotate(45deg)",transformOrigin:"top left"}} />
          </span>
        </div>
      )}

      {/* ── FAB ──────────────────────────────────────────────────── */}
      <button id="chatbot-fab"
        onClick={()=>{ setOpen(o=>!o); setMinimized(false); }}
        aria-label={open?"Close chat":"Open chat"}
        className={(!open && hasUnread) ? "cb-fab-pulse" : ""}
        style={{position:"fixed",bottom:24,right:24,zIndex:9999,width:56,height:56,borderRadius:"50%",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"transform .2s,box-shadow .2s",overflow:"hidden",padding:0,
          background: open ? "linear-gradient(135deg,#0F4970,#1a6a9a)" : "none",
          boxShadow: open ? "0 4px 20px rgba(15,73,112,0.45)" : "0 4px 20px rgba(15,73,112,0.35)"}}
        onMouseEnter={e=>(e.currentTarget.style.transform="scale(1.07)")}
        onMouseLeave={e=>(e.currentTarget.style.transform="scale(1)")}
      >
        {open && !minimized
          ? <X size={22} color="#fff"/>
          : <img src="/nova-avatar.png" alt="Nova" style={{width:56,height:56,objectFit:"cover",borderRadius:"50%",display:"block"}}/>
        }
        {(!open||minimized) && hasUnread && (
          <span style={{position:"absolute",top:0,right:0,width:14,height:14,borderRadius:"50%",background:"#ef4444",border:"2.5px solid #fff",fontSize:8,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>1</span>
        )}
      </button>

      {/* ── Chat Window ──────────────────────────────────────────── */}
      {open && (
        <div id="chatbot-window" role="dialog" aria-label="Nova – Smart Home Consultant"
          className="cb-open"
          style={{position:"fixed",bottom:92,right:24,zIndex:9998,width:400,maxHeight:minimized?68:620,display:"flex",flexDirection:"column",background:"#f8fafc",borderRadius:24,overflow:"hidden",boxShadow:"0 24px 80px rgba(0,0,0,0.18), 0 4px 20px rgba(0,0,0,0.08)",border:"1px solid rgba(255,255,255,0.8)",transition:"max-height .32s cubic-bezier(.4,0,.2,1)"}}>

          {/* Header — dark branded */}
          <header style={{flexShrink:0,background:"linear-gradient(135deg, #0a1f3d 0%, #0F4970 100%)",padding:"18px 18px 16px",display:"flex",alignItems:"center",gap:12}}>
            <div style={{position:"relative",flexShrink:0}}>
              <img src="/nova-avatar.png" alt="Nova" style={{width:42,height:42,borderRadius:"50%",objectFit:"cover",display:"block",border:"2.5px solid rgba(255,255,255,0.25)"}}/>
              <span style={{position:"absolute",bottom:2,right:2,width:10,height:10,borderRadius:"50%",background:"#22c55e",border:"2px solid #0F4970"}}/>
            </div>
            <div style={{flex:1,minWidth:0}}>
              <p style={{margin:0,fontSize:15,fontWeight:700,color:"#fff",letterSpacing:"-0.02em"}}>Weinkling</p>
              <p style={{margin:0,fontSize:11,color:"rgba(255,255,255,0.6)",marginTop:2,letterSpacing:"0.02em"}}>Elevate Your Living Experience</p>
            </div>
            <div style={{display:"flex",gap:2}}>
              {[{label:minimized?"Expand":"Minimize",icon:<Minus size={14}/>,fn:()=>setMinimized(m=>!m)},
                {label:"Close",icon:<X size={14}/>,fn:()=>{setOpen(false);setMinimized(false);}}
              ].map(b=>(
                <button key={b.label} onClick={b.fn} aria-label={b.label}
                  style={{width:30,height:30,borderRadius:10,border:"none",background:"rgba(255,255,255,0.10)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,0.7)",transition:"background .15s,color .15s"}}
                  onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.background="rgba(255,255,255,0.2)";(e.currentTarget as HTMLButtonElement).style.color="#fff";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background="rgba(255,255,255,0.10)";(e.currentTarget as HTMLButtonElement).style.color="rgba(255,255,255,0.7)";}}
                >{b.icon}</button>
              ))}
            </div>
          </header>

          {/* Messages */}
          {!minimized && (
            <div id="chatbot-messages" role="log" aria-live="polite"
              style={{flex:1,overflowY:"auto",padding:"20px 16px 8px",display:"flex",flexDirection:"column",gap:14,background:"#f8fafc"}}>

              {/* Date separator */}
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",margin:"0 0 4px"}}>
                <span style={{fontSize:11,color:"#94a3b8",background:"#e2e8f0",borderRadius:999,padding:"3px 12px",fontWeight:500,letterSpacing:"0.03em"}}>Today</span>
              </div>

              {messages.map(m=>(
                <div key={m.id} className="cb-msg" style={{display:"flex",alignItems:"flex-end",gap:8,justifyContent:m.role==="bot"?"flex-start":"flex-end"}}>
                  {m.role==="bot" && (
                    <img src="/nova-avatar.png" alt="Nova" style={{width:26,height:26,borderRadius:"50%",objectFit:"cover",flexShrink:0,display:"block",marginBottom:2,border:"1.5px solid #e2e8f0"}}/>
                  )}
                  <div style={{display:"flex",flexDirection:"column",gap:3,maxWidth:"68%",alignItems:m.role==="user"?"flex-end":"flex-start"}}>
                    <div style={{
                      fontSize:13.5,lineHeight:1.65,whiteSpace:"pre-wrap",wordBreak:"break-word",
                      borderRadius: m.role==="bot" ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
                      padding:"11px 15px",
                      ...(m.role==="bot"
                        ? {background:"#ffffff",color:"#1e293b",boxShadow:"0 1px 4px rgba(0,0,0,0.07)",border:"1px solid #e8edf2"}
                        : {background:"linear-gradient(135deg,#0F4970,#1a6a9a)",color:"#fff",boxShadow:"0 2px 10px rgba(15,73,112,0.3)"}
                      )
                    }}>{m.text}</div>
                    <span style={{fontSize:10,color:"#cbd5e1",padding:"0 4px"}}>{m.time}</span>
                  </div>
                </div>
              ))}

              {typing && (
                <div className="cb-msg" style={{display:"flex",alignItems:"flex-end",gap:8}}>
                  <img src="/nova-avatar.png" alt="Nova" style={{width:26,height:26,borderRadius:"50%",objectFit:"cover",flexShrink:0,display:"block",border:"1.5px solid #e2e8f0"}}/>
                  <div style={{background:"#ffffff",borderRadius:"4px 16px 16px 16px",padding:"13px 17px",display:"flex",gap:5,alignItems:"center",boxShadow:"0 1px 4px rgba(0,0,0,0.07)",border:"1px solid #e8edf2"}}>
                    {[0,150,300].map(d=>(
                      <span key={d} style={{width:6,height:6,borderRadius:"50%",background:"#94a3b8",display:"inline-block",animation:`dot 1.2s ease-in-out ${d}ms infinite`}}/>
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef}/>
            </div>
          )}

          {/* Menu-style chips */}
          {chips.length>0 && !typing && !minimized && (
            <div style={{padding:"0 16px 12px",flexShrink:0,background:"#f8fafc"}}>
              <div style={{display:"flex",flexDirection:"column",gap:0,border:"1px solid #e2e8f0",borderRadius:14,overflow:"hidden",background:"#fff",boxShadow:"0 1px 4px rgba(0,0,0,0.05)"}}>
                {chips.map((chip, i)=>{
                  const {icon,subtitle}=cardMeta(chip);
                  return (
                    <button key={chip} id={`chip-${chip.toLowerCase().replace(/\s+/g,"-")}`}
                      className="cb-chip"
                      onClick={()=>send(chip)}
                      style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",textAlign:"left",background:"#fff",border:"none",borderTop: i===0?"none":"1px solid #f1f5f9",cursor:"pointer",transition:"background .15s",width:"100%"}}>
                      <span style={{flexShrink:0,color:ICON_COLOR[chip]??"#64748b",width:30,height:30,borderRadius:8,background:"#f8fafc",display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid #e8edf2"}}>{icon}</span>
                      <span style={{flex:1,minWidth:0}}>
                        <span style={{display:"block",fontSize:13,fontWeight:600,color:"#0F4970",lineHeight:1.3}}>{chip}</span>
                        {subtitle && <span style={{display:"block",fontSize:11,color:"#94a3b8",marginTop:2,lineHeight:1.3}}>{subtitle}</span>}
                      </span>
                      <ArrowRight size={13} color="#cbd5e1"/>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Input bar */}
          {!minimized && (
            <form onSubmit={e=>{e.preventDefault();send(input);}}
              style={{display:"flex",alignItems:"center",gap:8,padding:"10px 14px 14px",borderTop:"1px solid #e8edf2",background:"#fff",flexShrink:0}}>
              <input ref={inputRef} id="chatbot-input" type="text" autoComplete="off" aria-label="Message"
                placeholder={typing?"Nova is typing…":"Ask anything about smart homes…"}
                value={input} disabled={typing} onChange={e=>setInput(e.target.value)}
                style={{flex:1,background:"#f1f5f9",border:"1.5px solid transparent",borderRadius:999,padding:"9px 16px",fontSize:13,color:"#1e293b",outline:"none",transition:"border-color .2s,box-shadow .2s",opacity:typing?.6:1}}
                onFocus={e=>{e.target.style.borderColor="#0F4970";e.target.style.boxShadow="0 0 0 3px rgba(15,73,112,0.10)";}}
                onBlur={e=>{e.target.style.borderColor="transparent";e.target.style.boxShadow="none";}}
              />
              <button type="submit" id="chatbot-send" disabled={!input.trim()||typing} aria-label="Send"
                style={{width:36,height:36,flexShrink:0,borderRadius:"50%",border:"none",background:"linear-gradient(135deg,#0F4970,#1a6a9a)",color:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"transform .2s,opacity .15s,box-shadow .2s",opacity:!input.trim()||typing?.3:1,boxShadow:input.trim()&&!typing?"0 3px 12px rgba(15,73,112,0.4)":"none"}}
                onMouseEnter={e=>{if(input.trim()&&!typing){const b=e.currentTarget as HTMLButtonElement;b.style.transform="scale(1.08)";b.style.boxShadow="0 6px 18px rgba(15,73,112,0.5)";}}}
                onMouseLeave={e=>{const b=e.currentTarget as HTMLButtonElement;b.style.transform="scale(1)";b.style.boxShadow=input.trim()&&!typing?"0 3px 12px rgba(15,73,112,0.4)":"none";}}
              ><Send size={14} strokeWidth={2.2}/></button>
            </form>
          )}
        </div>
      )}
    </>
  );
}

