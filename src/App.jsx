'use client'
import { useState, useRef, useEffect, useCallback } from 'react'

// ==================================================
// ICON SYSTEM (unchanged)
// ==================================================
const Icon = ({ name, size = 18, color = 'currentColor' }) => {
  const p = {
    menu:'M3 6h18M3 12h18M3 18h18',x:'M18 6L6 18M6 6l12 12',settings:'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-7-3h2m10 0h2M12 6V4m0 16v-2',chart:'M18 20V4M12 20V8M6 20V12',hourglass:'M12 2v4M12 22v-4M4 6h16M4 18h16M8 6v3a4 4 0 0 0 8 0V6H8zm0 12v-3a4 4 0 0 1 8 0v3H8z',cpu:'M4 4h4v4H4zm6 0h10v4H10zM4 10h10v4H4zm12 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z',memory:'M2 6h20v12H2zM6 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z',clock:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm1-16v6l4 2M12 6v4',alertTriangle:'M12 9v4m0 4h.01M12 2L1 21h22L12 2z',send:'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z',phone:'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0 1 22 16.92z',mic:'M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zm-7 9v1a7 7 0 0 0 14 0v-1M12 22v-3',close:'M18 6L6 18M6 6l12 12',desktop:'M4 4h16v12H4zM8 20h8M12 16v4',mobile:'M12 2C8 2 4 4 4 8v12c0 4 4 6 8 6s8-2 8-6V8c0-4-4-6-8-6z',file:'M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM13 2v7h7',image:'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l3-3 3 3 3-3 3 3',video:'M23 7l-5 5 5 5V7zM1 5h15v14H1z',arrowLeft:'M19 12H5M12 19l-7-7 7-7',volume2:'M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07',volumeX:'M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6',atSign:'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM16 12h4',pencil:'M17 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10z',save:'M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2zM17 21v-8H7v8M7 3v5h8',trash:'M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6',user:'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',edit:'M17 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10z',chat:'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z',rotate:'M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9',camera:'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2v11zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',cog:'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-7-3h2m10 0h2M12 6V4m0 16v-2',copy:'M8 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1M8 5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2V5z',pause:'M6 4h4v16H6V4zm8 0h4v16h-4V4z',play:'M5 3l14 9-14 9V3z',sparkles:'M12 3l1.9 5.8L20 10l-6.1 1.2L12 17l-1.9-5.8L4 10l6.1-1.2L12 3z',refresh:'M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15',music:'M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z',zap:'M13 2L3 14h9l-1 8 10-12h-9l1-8z',shield:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',reply:'M9 17l-6-6 6-6M3 11h10a6 6 0 0 1 6 6v2',download:'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3',check:'M20 6L9 17l-5-5',plus:'M12 5v14M5 12h14',terminal:'M4 17l6-6-6-6M12 19h8',globe:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20',calendar:'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',paperclip:'M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48',lock:'M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4',layers:'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  }
  if (!p[name]) return null
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:'inline-block',verticalAlign:'middle',flexShrink:0}}><path d={p[name]} /></svg>
}

// ==================================================
// CONFIG
// ==================================================
const TAVILY_API_KEY = "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"
const TAVILY_URL = "https://api.tavily.com/search"
const VERSION = "v28"
const VERSION_FULL = "CYPHER4X v28.0.0"
const APP_START_TIME = Date.now()
const TOOLS_ENABLED = true

// ==================================================
// STORAGE
// ==================================================
const getStorageKey = (e, p) => `cypher4x_${e}_${p}`
const saveUserData = (e, p, d) => { try { localStorage.setItem(getStorageKey(e, p), JSON.stringify(d)) } catch {} }
const loadUserData = (e, p) => { try { const r = localStorage.getItem(getStorageKey(e, p)); return r ? JSON.parse(r) : null } catch { return null } }
const getAllUsers = () => { try { const l = localStorage.getItem('cypher4x_users'); return l ? JSON.parse(l) : [] } catch { return [] } }
const addUser = (e, p) => { const l = getAllUsers(); if (!l.some(u => u.email === e)) { l.push({ email: e, pin: p }); localStorage.setItem('cypher4x_users', JSON.stringify(l)) } }
const userExists = (e, p) => getAllUsers().some(u => u.email === e && u.pin === p)
const saveAuth = (e, p) => { try { localStorage.setItem('cypher4x_auth', JSON.stringify({ email: e, pin: p })) } catch {} }
const clearAuth = () => { try { localStorage.removeItem('cypher4x_auth') } catch {} }
const isMobileDevice = () => /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
const isAndroid = () => /Android/i.test(navigator.userAgent)

// ==================================================
// SMART GREETING + KNOWLEDGE
// ==================================================
const isPureGreeting = (text) => {
  const t = text.toLowerCase().trim()
  if (t.split(/\s+/).length > 4) return false
  if (/\?/.test(t)) return false
  if (/\b(teach|explain|what|how|why|when|where|who|tell|show|help)\b/.test(t)) return false
  const first = t.split(/\s+/)[0].replace(/[^a-z']/g, '')
  return ['hello','hi','hey','yo','sup','howdy','hiya','greetings'].includes(first) || /^(good (morning|afternoon|evening|day))$/.test(t) || /^(what'?s up|whats up)$/.test(t)
}
const KNOWLEDGE = [
  { match:/ethical hacking|penetration test|cybersecurity/i, answer:`**Ethical Hacking Roadmap**\n\n1. Networking\n2. Linux\n3. Web basics\n4. Python+Bash\n5. OWASP Top 10\n6. TryHackMe / HackTheBox\n7. Security+ → OSCP` },
  { match:/(what is|explain) (javascript|js)\b/i, answer:`**JavaScript** — high-level language for browsers and servers.` },
  { match:/(what is|explain) python\b/i, answer:`**Python** — readable, great for AI/ML, data, automation.` },
  { match:/(what is|explain) (react|react\.?js)/i, answer:`**React** — component-based UI library by Meta.` },
  { match:/(what is|explain) (ai|artificial intelligence)\b/i, answer:`**AI** — ML, DL, NLP, CV, RL, Generative AI.` },
]

// ==================================================
// APP DEEP-LINK
// ==================================================
const APP_MAP = {
  whatsapp:{name:'WhatsApp',pkg:'com.whatsapp',scheme:'whatsapp',universal:'https://wa.me/',web:'https://web.whatsapp.com'},
  instagram:{name:'Instagram',pkg:'com.instagram.android',scheme:'instagram',universal:'https://instagram.com/',web:'https://instagram.com'},
  youtube:{name:'YouTube',pkg:'com.google.android.youtube',scheme:'vnd.youtube',universal:'https://youtube.com/',web:'https://youtube.com'},
  github:{name:'GitHub',pkg:null,scheme:null,universal:'https://github.com/',web:'https://github.com'},
}
const openApp = (k, x='') => {
  const a = APP_MAP[k]; if (!a) return `Unknown: ${k}`
  if (isAndroid() && a.pkg) { try { window.location.href = `intent://${x}#Intent;scheme=${a.scheme};package=${a.pkg};S.browser_fallback_url=${encodeURIComponent(a.universal)};end`; return `Opening ${a.name}...` } catch {} }
  if (isMobileDevice()) { window.open(a.universal + x, '_blank'); return `Opening ${a.name}...` }
  window.open(a.web, '_blank'); return `Opening ${a.name}...`
}

// ==================================================
// CODE GENERATION (for "show code" requests)
// ==================================================
const generateLongCode = (lang, purpose) => {
  const L = (lang || '').toLowerCase()
  if (L.includes('python')) return `# ${purpose}\nimport json, logging\nfrom datetime import datetime\nlogging.basicConfig(level=logging.INFO)\n\nclass AppManager:\n    def __init__(self): self.items = []\n    def add(self, title):\n        item = {'id': len(self.items)+1, 'title': title, 'at': datetime.now().isoformat()}\n        self.items.append(item); logging.info(f'Added {title}'); return item\n    def list(self): return self.items\n\nif __name__ == '__main__':\n    m = AppManager(); m.add('Sample'); print(m.list())\n`
  if (L.includes('react') || L.includes('jsx')) return `import React, { useState } from 'react';\nexport default function App() {\n  const [items, setItems] = useState([]);\n  const [v, setV] = useState('');\n  const add = () => { if(v){setItems([...items, v]); setV('')} };\n  return (<div><h1>${purpose}</h1>\n    <input value={v} onChange={e=>setV(e.target.value)} />\n    <button onClick={add}>Add</button>\n    <ul>{items.map((i,k)=><li key={k}>{i}</li>)}</ul></div>);\n}`
  return `// ${purpose}\n'use strict';\nclass AppManager {\n  constructor(){ this.items=[]; }\n  add(t){ const i={id:this.items.length+1,title:t,at:Date.now()}; this.items.push(i); return i; }\n  list(){ return [...this.items]; }\n  remove(id){ const i=this.items.findIndex(x=>x.id===id); if(i>=0) return this.items.splice(i,1)[0]; }\n}\nconst app = new AppManager();\nconsole.log('${purpose}');\nconsole.log(app.add('Sample'));\nconsole.log(app.list());\nif (typeof module !== 'undefined') module.exports = AppManager;\n`
}
const detectLanguage = (q) => {
  const x = (q||'').toLowerCase()
  if (/\b(react|jsx|tsx|next)\b/.test(x)) return 'react'
  if (/\b(python|py|django|flask)\b/.test(x)) return 'python'
  if (/\b(typescript|\bts\b)\b/.test(x)) return 'typescript'
  if (/\b(html|css|web)\b/.test(x)) return 'html'
  if (/\b(java)\b/.test(x) && !/javascript/.test(x)) return 'java'
  return 'javascript'
}
const isCodeRequest = (q) => ['generate code','write code','create code','make code','build code','code for','code to','function in','write me a'].some(k => q.toLowerCase().includes(k))

// ==================================================
// WEB SEARCH + WEATHER + MUSIC + VIDEO (same as before)
// ==================================================
const searchWeb = async (query) => {
  try {
    const r = await fetch(TAVILY_URL, { method:'POST', headers:{'Content-Type':'application/json','Authorization':`Bearer ${TAVILY_API_KEY}`}, body:JSON.stringify({query,search_depth:'advanced',include_answer:true,max_results:6}) })
    if (!r.ok) throw new Error(`HTTP ${r.status}`)
    const d = await r.json()
    const results = d.results || []
    const safe = results.find(x => { try { return /wikipedia|github|stackoverflow|mozilla|gov|edu/.test(new URL(x.url).hostname) } catch { return false } }) || results[0]
    return { answer: d.answer || results.map(x => x.content).join('\n\n') || 'No results.', safestUrl: safe?.url }
  } catch (e) { return { error: e.message } }
}
const openAnonymous = (q) => window.open(`https://duckduckgo.com/?q=${encodeURIComponent(q)}&kae=d`, '_blank')
const fetchWeather = async (lat, lon) => { try { const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`); const d = await r.json(); return { temp: d.current?.temperature_2m, code: d.current?.weather_code } } catch { return null } }

// ==================================================
// 🎨 THEMES for generated apps
// ==================================================
const THEMES = {
  dark:   { bg:'#0a0a0a', card:'#151515', text:'#ffffff', muted:'#888888', accent:'#00ff41', border:'#2a2a2a', btnText:'#000000' },
  light:  { bg:'#f5f5f5', card:'#ffffff', text:'#111111', muted:'#666666', accent:'#ff003c', border:'#e0e0e0', btnText:'#ffffff' },
  cyber:  { bg:'#000000', card:'#0d0208', text:'#00ff41', muted:'#008f11', accent:'#00ff41', border:'#00ff41', btnText:'#000000' },
  pink:   { bg:'#fff0f5', card:'#ffffff', text:'#5c0a2e', muted:'#a0527a', accent:'#ff4f9a', border:'#ffd1e8', btnText:'#ffffff' },
  blue:   { bg:'#0a1929', card:'#102a43', text:'#ffffff', muted:'#829ab1', accent:'#00c8ff', border:'#1a3d5c', btnText:'#000000' },
  purple: { bg:'#1a0a2e', card:'#2a1a4e', text:'#ffffff', muted:'#a89ec9', accent:'#c800ff', border:'#3a2a5e', btnText:'#ffffff' },
  nature: { bg:'#0f2417', card:'#1a3a24', text:'#ffffff', muted:'#7ba888', accent:'#2ecc71', border:'#254e34', btnText:'#000000' },
}

const pickTheme = (l) => {
  if (/cyber|hacker|matrix|neon|terminal/.test(l)) return THEMES.cyber
  if (/pink|rose|romantic|valentine|love/.test(l)) return THEMES.pink
  if (/blue|ocean|sky|water/.test(l)) return THEMES.blue
  if (/purple|violet|galaxy/.test(l)) return THEMES.purple
  if (/green|nature|forest|eco/.test(l)) return THEMES.nature
  if (/light|white|clean|bright/.test(l)) return THEMES.light
  return THEMES.dark
}
const pickIcon = (l) => {
  if (/chat|message|talk|whatsapp/.test(l)) return '💬'
  if (/note|journal|diary/.test(l)) return '📝'
  if (/todo|task|checklist|list/.test(l)) return '✅'
  if (/calc|math/.test(l)) return '🧮'
  if (/timer|clock|stopwatch|countdown/.test(l)) return '⏱️'
  if (/music|song|audio|spotify/.test(l)) return '🎵'
  if (/video|youtube|movie/.test(l)) return '🎬'
  if (/weather|forecast/.test(l)) return '🌤️'
  if (/photo|camera|image/.test(l)) return '📷'
  if (/shop|cart|store|ecommerce/.test(l)) return '🛒'
  if (/money|bank|finance|expense|budget/.test(l)) return '💰'
  if (/health|fitness|workout|gym/.test(l)) return '💪'
  if (/food|recipe|cook/.test(l)) return '🍳'
  if (/book|read|library/.test(l)) return '📚'
  if (/game|play|arcade/.test(l)) return '🎮'
  if (/quiz|test|trivia/.test(l)) return '❓'
  if (/password|lock|secure|vault/.test(l)) return '🔒'
  if (/habit|track/.test(l)) return '📊'
  if (/contact|friend|people/.test(l)) return '👥'
  if (/convert|unit|currency/.test(l)) return '🔄'
  if (/random|dice|pick/.test(l)) return '🎲'
  if (/draw|paint|sketch|art/.test(l)) return '🎨'
  if (/news|feed/.test(l)) return '📰'
  if (/calendar|schedule|event/.test(l)) return '📅'
  if (/map|location/.test(l)) return '🗺️'
  return '⚡'
}
const extractTitle = (desc) => {
  let t = (desc||'')
    .replace(/^(please\s+)?(build|create|make|generate|design|develop|code|want|need|give)\s+(me\s+)?(a|an|the)?\s*/i,'')
    .replace(/\s+(app|application|tool|program|website|web ?page|site|page|service|system)\s*$/i,'')
    .replace(/\s+(in|using|with)\s+(javascript|python|html|css|react|node|typescript|java|c\+\+).*$/i,'')
    .replace(/\s+for\s+.*$/i,'')
    .replace(/[.!?]+$/,'')
    .trim()
  if (!t) t = 'My App'
  return t.split(/\s+/).slice(0,5).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

// ==================================================
// 🧠 GENERATIVE APP BUILDER
// ==================================================
const buildGenApp = (desc) => {
  const l = desc.toLowerCase()
  const T = pickTheme(l)
  const icon = pickIcon(l)
  const title = extractTitle(desc)
  const esc = s => String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))
  const safeTitle = esc(title)
  const key = 'genapp_' + title.replace(/\W/g,'_').slice(0,30)

  // --- Component selector ---
  let main = '', js = '', comp = 'list'
  if (/chat|message|talk|whatsapp|messenger/.test(l)) comp = 'chat'
  else if (/calc|math|arith/.test(l)) comp = 'calc'
  else if (/timer|stopwatch|countdown|clock/.test(l)) comp = 'timer'
  else if (/quiz|trivia|test|exam/.test(l)) comp = 'quiz'
  else if (/draw|paint|sketch|canvas|art/.test(l)) comp = 'draw'
  else if (/convert|unit|currency|temperature/.test(l)) comp = 'convert'
  else if (/random|dice|pick|choose|lucky/.test(l)) comp = 'random'
  else if (/counter|tally|click count/.test(l)) comp = 'counter'
  else if (/password|secure|vault|hash/.test(l)) comp = 'secure'
  else if (/expense|budget|money|spend|track|habit|calorie|weight|step/.test(l)) comp = 'tracker'
  else if (/weather|forecast|climate/.test(l)) comp = 'weather'
  else if (/tone|beep|sound|noise/.test(l)) comp = 'tone'
  else if (/color|palette|gradient/.test(l)) comp = 'color'
  else if (/unit|length|mass|weight conv/.test(l)) comp = 'convert'

  switch (comp) {
    case 'chat': {
      main = `<div id="chat-log"></div>
<div class="row"><input id="chat-in" placeholder="Type a message..." autocomplete="off"/><button onclick="sendMsg()">➤</button></div>`
      js = `const K='${key}_chat';let msgs=JSON.parse(localStorage.getItem(K)||'[]');
const L=document.getElementById('chat-log');
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function render(){L.innerHTML=msgs.map(m=>'<div class="msg '+m.who+'">'+esc(m.text)+'<div class="t">'+m.t+'</div></div>').join('');L.scrollTop=L.scrollHeight}
function sendMsg(){const I=document.getElementById('chat-in');const t=I.value.trim();if(!t)return;const now=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});msgs.push({who:'me',text:t,t:now});I.value='';save();
setTimeout(()=>{const R=["Got it!","Interesting...","Tell me more.","👍","I see.","Nice!","Really?","Sounds good.","Hmm...","Cool!"];msgs.push({who:'you',text:R[Math.floor(Math.random()*R.length)],t:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})});save()},500+Math.random()*700)}
function save(){localStorage.setItem(K,JSON.stringify(msgs));render()}
document.getElementById('chat-in').addEventListener('keydown',e=>{if(e.key==='Enter')sendMsg()});
render();`
      break
    }
    case 'calc': {
      main = `<div id="display">0</div>
<div class="grid">
<button class="op" onclick="k('C')">C</button><button class="op" onclick="k('←')">←</button><button class="op" onclick="k('%')">%</button><button class="op" onclick="k('/')">÷</button>
<button onclick="k('7')">7</button><button onclick="k('8')">8</button><button onclick="k('9')">9</button><button class="op" onclick="k('*')">×</button>
<button onclick="k('4')">4</button><button onclick="k('5')">5</button><button onclick="k('6')">6</button><button class="op" onclick="k('-')">−</button>
<button onclick="k('1')">1</button><button onclick="k('2')">2</button><button onclick="k('3')">3</button><button class="op" onclick="k('+')">+</button>
<button onclick="k('0')" style="grid-column:span 2">0</button><button onclick="k('.')">.</button><button class="op" onclick="k('=')" style="background:${T.accent};color:${T.btnText}">=</button>
</div>`
      js = `let v='0';const D=document.getElementById('display');
function k(x){if(x==='C')v='0';else if(x==='←')v=v.slice(0,-1)||'0';else if(x==='='){try{v=String(eval(v.replace(/%/g,'/100*')))}catch{v='Error'}}else if(x==='%'){try{v=String(eval(v)/100)}catch{}}else{v=v==='0'?x:v+x}D.textContent=v}
document.addEventListener('keydown',e=>{if(/[0-9+\\-*/.%]/.test(e.key))k(e.key);else if(e.key==='Enter')k('=');else if(e.key==='Backspace')k('←');else if(e.key==='Escape')k('C')});`
      break
    }
    case 'timer': {
      main = `<div id="timer-display">00:00.00</div>
<div class="row"><button onclick="startPause()" id="sp">Start</button><button class="secondary" onclick="lap()">Lap</button><button class="secondary" onclick="reset()">Reset</button></div>
<div id="laps" style="margin-top:16px"></div>`
      js = `let start=0,elapsed=0,running=false,raf,laps=[];const D=document.getElementById('timer-display'),S=document.getElementById('sp'),L=document.getElementById('laps');
function fmt(ms){const m=Math.floor(ms/60000),s=Math.floor(ms/1000)%60,cs=Math.floor(ms/10)%100;return String(m).padStart(2,'0')+':'+String(s).padStart(2,'0')+'.'+String(cs).padStart(2,'0')}
function tick(){if(running){D.textContent=fmt(elapsed+performance.now()-start);raf=requestAnimationFrame(tick)}}
function startPause(){if(!running){start=performance.now();running=true;S.textContent='Pause';tick()}else{elapsed+=performance.now()-start;running=false;S.textContent='Resume';cancelAnimationFrame(raf)}}
function lap(){if(!running&&!elapsed)return;const now=running?elapsed+performance.now()-start:elapsed;laps.unshift(now);L.innerHTML=laps.map((t,i)=>'<div class="stat"><span>Lap '+(laps.length-i)+'</span><b>'+fmt(t)+'</b></div>').join('')}
function reset(){running=false;elapsed=0;laps=[];cancelAnimationFrame(raf);D.textContent='00:00.00';S.textContent='Start';L.innerHTML=''}`
      break
    }
    case 'draw': {
      main = `<canvas id="cv" width="600" height="400"></canvas>
<div class="row" style="margin-top:10px"><input type="color" id="col" value="${T.accent}" style="width:60px;height:44px;padding:0"/><input type="range" id="sz" min="1" max="40" value="4" style="flex:1"/><button class="secondary" onclick="clearCv()">Clear</button><button onclick="dl()">Save</button></div>`
      js = `const cv=document.getElementById('cv'),x=cv.getContext('2d');x.fillStyle='${T.card}';x.fillRect(0,0,cv.width,cv.height);
let dr=false;cv.addEventListener('pointerdown',e=>{dr=true;x.beginPath();x.moveTo(e.offsetX*(cv.width/cv.clientWidth),e.offsetY*(cv.height/cv.clientHeight))});
cv.addEventListener('pointermove',e=>{if(!dr)return;x.strokeStyle=document.getElementById('col').value;x.lineWidth=parseInt(document.getElementById('sz').value);x.lineCap='round';x.lineTo(e.offsetX*(cv.width/cv.clientWidth),e.offsetY*(cv.height/cv.clientHeight));x.stroke()});
cv.addEventListener('pointerup',()=>dr=false);cv.addEventListener('pointerleave',()=>dr=false);
function clearCv(){x.fillStyle='${T.card}';x.fillRect(0,0,cv.width,cv.height)}
function dl(){const a=document.createElement('a');a.download='drawing.png';a.href=cv.toDataURL();a.click()}`
      break
    }
    case 'convert': {
      main = `<div class="card"><input id="c-in" type="number" value="1" placeholder="Value"/>
<div class="row" style="margin-top:10px">
<select id="c-from" style="flex:1"><option value="m">Meters</option><option value="km">Kilometers</option><option value="cm">Centimeters</option><option value="mi">Miles</option><option value="ft">Feet</option><option value="in">Inches</option><option value="kg">Kilograms</option><option value="lb">Pounds</option><option value="c">Celsius</option><option value="f">Fahrenheit</option><option value="k">Kelvin</option></select>
<select id="c-to" style="flex:1"><option value="km">Kilometers</option><option value="m">Meters</option><option value="cm">Centimeters</option><option value="mi">Miles</option><option value="ft">Feet</option><option value="in">Inches</option><option value="kg">Kilograms</option><option value="lb">Pounds</option><option value="c">Celsius</option><option value="f">Fahrenheit</option><option value="k">Kelvin</option></select>
</div><div id="c-out" class="big-num" style="font-size:36px;margin-top:10px">—</div></div>`
      js = `function toBase(v,u){if(u==='m')return v;if(u==='km')return v*1000;if(u==='cm')return v/100;if(u==='mi')return v*1609.34;if(u==='ft')return v*0.3048;if(u==='in')return v*0.0254;if(u==='kg')return v;if(u==='lb')return v*0.453592;if(u==='c')return v;if(u==='f')return(v-32)*5/9;if(u==='k')return v-273.15;return v}
function fromBase(v,u){if(u==='m')return v;if(u==='km')return v/1000;if(u==='cm')return v*100;if(u==='mi')return v/1609.34;if(u==='ft')return v/0.3048;if(u==='in')return v/0.0254;if(u==='kg')return v;if(u==='lb')return v/0.453592;if(u==='c')return v;if(u==='f')return v*9/5+32;if(u==='k')return v+273.15;return v}
const isTemp=u=>['c','f','k'].includes(u);
function conv(){const v=parseFloat(document.getElementById('c-in').value)||0;const f=document.getElementById('c-from').value;const t=document.getElementById('c-to').value;
if(isTemp(f)!==isTemp(t)){document.getElementById('c-out').textContent='Incompatible';return}
const r=fromBase(toBase(v,f),t);document.getElementById('c-out').textContent=r.toFixed(4).replace(/\\.?0+$/,'')+' '+t.toUpperCase()}
['c-in','c-from','c-to'].forEach(id=>document.getElementById(id).addEventListener('input',conv));conv();`
      break
    }
    case 'random': {
      main = `<div class="big-num" id="r-out">?</div>
<div class="row"><input id="r-min" type="number" value="1" placeholder="Min"/><input id="r-max" type="number" value="100" placeholder="Max"/></div>
<button onclick="roll()" style="margin-top:12px;font-size:18px;padding:18px">🎲 Roll</button>`
      js = `function roll(){const a=parseInt(document.getElementById('r-min').value)||1;const b=parseInt(document.getElementById('r-max').value)||100;const lo=Math.min(a,b),hi=Math.max(a,b);const n=Math.floor(Math.random()*(hi-lo+1))+lo;const o=document.getElementById('r-out');o.textContent=n;o.style.transform='scale(1.3)';setTimeout(()=>o.style.transform='scale(1)',150);o.style.transition='transform .15s'}`
      break
    }
    case 'counter': {
      main = `<div class="big-num" id="cnt">0</div>
<div class="row" style="justify-content:center;gap:20px;margin-top:20px">
<button class="secondary" onclick="inc(-1)" style="font-size:24px;padding:20px 30px">−</button>
<button onclick="inc(1)" style="font-size:24px;padding:20px 30px">+</button>
</div>
<button class="secondary" onclick="rst()" style="margin-top:20px">Reset</button>`
      js = `const K='${key}_cnt';let n=parseInt(localStorage.getItem(K)||'0');const E=document.getElementById('cnt');E.textContent=n;
function inc(d){n+=d;E.textContent=n;E.style.transform='scale(1.2)';setTimeout(()=>E.style.transform='scale(1)',120);E.style.transition='transform .12s';localStorage.setItem(K,n)}
function rst(){if(confirm('Reset?')){n=0;E.textContent=0;localStorage.setItem(K,0)}}`
      break
    }
    case 'secure': {
      main = `<div class="card"><label style="font-size:13px;color:${T.muted}">Enter text</label>
<textarea id="s-in" style="min-height:80px;margin-top:6px" placeholder="Type password or text..."></textarea>
<div class="row" style="margin-top:10px"><button onclick="genHash()">Hash SHA-256</button><button class="secondary" onclick="b64()">Base64</button><button class="secondary" onclick="unb64()">Decode B64</button></div>
<div id="s-out" class="card" style="margin-top:12px;font-family:monospace;font-size:12px;word-break:break-all;color:${T.accent}">—</div>
<div id="pw" style="margin-top:16px"></div></div>`
      js = `const I=document.getElementById('s-in'),O=document.getElementById('s-out');
async function genHash(){const v=I.value;if(!v)return;const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(v));O.textContent=Array.from(new Uint8Array(b)).map(x=>x.toString(16).padStart(2,'0')).join('')}
function b64(){try{O.textContent=btoa(unescape(encodeURIComponent(I.value)))}catch{O.textContent='Invalid'}}
function unb64(){try{O.textContent=decodeURIComponent(escape(atob(I.value)))}catch{O.textContent='Invalid'}}
I.addEventListener('input',()=>{const v=I.value;const C={len:v.length>=12,low:/[a-z]/.test(v),up:/[A-Z]/.test(v),dig:/\\d/.test(v),sp:/[^A-Za-z0-9]/.test(v)};const s=Object.values(C).filter(Boolean).length;const L=['','Very Weak','Weak','Fair','Good','Strong'];const Col=['${T.muted}','#ff003c','#ff6600','#ffcc00','#00c8ff','${T.accent}'];document.getElementById('pw').innerHTML='<div class="stat"><span>Password strength</span><b style="color:'+Col[s]+'">'+(L[s]||'—')+'</b></div>'})`
      break
    }
    case 'tracker': {
      main = `<div class="row"><input id="tr-in" placeholder="Add entry..." type="number" step="any"/><button onclick="addTr()">Add</button></div>
<div id="tr-total" class="big-num" style="font-size:36px;margin:16px 0">0</div>
<div id="tr-list"></div>
<button class="secondary" onclick="clearTr()" style="margin-top:12px">Clear all</button>`
      js = `const K='${key}_tr';let data=JSON.parse(localStorage.getItem(K)||'[]');
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function render(){const t=data.reduce((a,b)=>a+b.v,0);document.getElementById('tr-total').textContent=t.toFixed(2);document.getElementById('tr-list').innerHTML=data.map((d,i)=>'<div class="item"><span>'+new Date(d.at).toLocaleString()+'</span><b>'+d.v+'</b><button onclick="delTr('+i+')">✕</button></div>').join('')||'<div class="empty">No entries yet.</div>'}
function addTr(){const I=document.getElementById('tr-in');const v=parseFloat(I.value);if(isNaN(v))return;data.unshift({v,at:Date.now()});I.value='';save()}
function delTr(i){data.splice(i,1);save()}
function clearTr(){if(confirm('Clear all?')){data=[];save()}}
function save(){localStorage.setItem(K,JSON.stringify(data));render()}
document.getElementById('tr-in').addEventListener('keydown',e=>{if(e.key==='Enter')addTr()});render();`
      break
    }
    case 'quiz': {
      main = `<div id="q-prog" style="height:6px;background:${T.card};border-radius:3px;overflow:hidden;margin-bottom:20px"><div id="q-prog-fill" style="height:100%;background:${T.accent};width:0;transition:width .3s"></div></div>
<h2 id="q-text" style="color:${T.accent};font-family:monospace;margin:0 0 16px;font-size:16px">QUESTION</h2>
<div id="q-opts"></div>
<div id="q-res" style="display:none;text-align:center"><h1 id="q-score" style="color:${T.accent};font-size:56px;margin:0">0/0</h1><p style="color:${T.muted}">Complete!</p><button onclick="restart()">Try Again</button></div>`
      js = `const QS=[{q:'What does HTML stand for?',o:['Hyper Text Markup Language','Home Tool ML','Hyperlinks & Text ML','None'],a:0},
{q:'Which runs in browser?',o:['Java','C++','JavaScript','Python'],a:2},
{q:'What does CSS stand for?',o:['Computer SS','Creative SS','Cascading Style Sheets','Colorful SS'],a:2},
{q:'JS was invented in?',o:['1996','1995','1994','1997'],a:1},
{q:'HTTP port?',o:['21','22','80','443'],a:2}];
let idx=0,score=0;
function render(){if(idx>=QS.length)return end();const c=QS[idx];document.getElementById('q-text').textContent=c.q;document.getElementById('q-prog-fill').style.width=((idx/QS.length)*100)+'%';const O=document.getElementById('q-opts');O.innerHTML='';c.o.forEach((t,i)=>{const d=document.createElement('div');d.className='item';d.style.cursor='pointer';d.textContent=t;d.onclick=()=>pick(i,d);O.appendChild(d)})}
function pick(i,el){document.querySelectorAll('#q-opts .item').forEach(x=>x.style.pointerEvents='none');const c=QS[idx];if(i===c.a){el.style.background='${T.accent}';el.style.color='${T.btnText}';score++}else{el.style.background='rgba(255,0,60,0.25)';document.querySelectorAll('#q-opts .item')[c.a].style.background='${T.accent}';document.querySelectorAll('#q-opts .item')[c.a].style.color='${T.btnText}'}setTimeout(()=>{idx++;render()},850)}
function end(){document.getElementById('q-text').parentNode.querySelector('#q-opts').style.display='none';document.getElementById('q-text').style.display='none';document.getElementById('q-prog-fill').style.width='100%';document.getElementById('q-res').style.display='block';document.getElementById('q-score').textContent=score+'/'+QS.length}
function restart(){idx=0;score=0;document.getElementById('q-opts').style.display='block';document.getElementById('q-text').style.display='block';document.getElementById('q-res').style.display='none';render()}
render();`
      break
    }
    case 'weather': {
      main = `<div class="row"><input id="w-city" placeholder="Enter city..." value="London"/><button onclick="fetchW()">Search</button></div>
<div class="big-num" id="w-temp">—</div>
<div id="w-city-name" style="text-align:center;color:${T.muted};margin-bottom:6px">—</div>
<div id="w-desc" style="text-align:center;color:${T.accent};margin-bottom:20px;text-transform:capitalize">—</div>
<div id="w-info"></div>`
      js = `async function fetchW(){const c=document.getElementById('w-city').value.trim();if(!c)return;document.getElementById('w-temp').textContent='...';try{
const g=await fetch('https://geocoding-api.open-meteo.com/v1/search?name='+encodeURIComponent(c)+'&count=1');const gd=await g.json();
if(!gd.results||!gd.results[0]){document.getElementById('w-temp').textContent='—';document.getElementById('w-city-name').textContent='Not found';return}
const loc=gd.results[0];const w=await fetch('https://api.open-meteo.com/v1/forecast?latitude='+loc.latitude+'&longitude='+loc.longitude+'&current=temperature_2m,relative_humidity_2m,apparent_temperature,pressure_msl,wind_speed_10m,weather_code');const wd=await w.json();const cur=wd.current;
document.getElementById('w-temp').textContent=Math.round(cur.temperature_2m)+'°';
document.getElementById('w-city-name').textContent=loc.name+', '+(loc.country||'');
const codes={0:'Clear',1:'Mainly clear',2:'Partly cloudy',3:'Overcast',45:'Fog',51:'Drizzle',61:'Light rain',63:'Rain',65:'Heavy rain',71:'Snow',80:'Showers',95:'Thunderstorm'};
document.getElementById('w-desc').textContent=codes[cur.weather_code]||'Unknown';
document.getElementById('w-info').innerHTML='<div class="stat"><span>Feels like</span><b>'+Math.round(cur.apparent_temperature)+'°</b></div><div class="stat"><span>Humidity</span><b>'+cur.relative_humidity_2m+'%</b></div><div class="stat"><span>Wind</span><b>'+cur.wind_speed_10m+' km/h</b></div><div class="stat"><span>Pressure</span><b>'+Math.round(cur.pressure_msl)+' hPa</b></div>';
}catch(e){document.getElementById('w-temp').textContent='Error'}}
document.getElementById('w-city').addEventListener('keydown',e=>{if(e.key==='Enter')fetchW()});fetchW();`
      break
    }
    case 'tone': {
      main = `<div class="big-num" id="t-freq">440 Hz</div>
<input type="range" id="t-slide" min="100" max="2000" value="440" style="width:100%"/>
<div class="row" style="margin-top:12px"><button onclick="playTone()">▶ Play</button><button class="secondary" onclick="stopTone()">■ Stop</button></div>
<div class="row" style="margin-top:8px"><button class="secondary" onclick="preset(261)">C4</button><button class="secondary" onclick="preset(329)">E4</button><button class="secondary" onclick="preset(392)">G4</button><button class="secondary" onclick="preset(523)">C5</button></div>`
      js = `let ctx,osc;const S=document.getElementById('t-slide');
S.oninput=()=>{document.getElementById('t-freq').textContent=S.value+' Hz';if(osc)osc.frequency.value=parseFloat(S.value)};
function playTone(){if(!ctx)ctx=new(window.AudioContext||window.webkitAudioContext)();if(osc)osc.stop();osc=ctx.createOscillator();const g=ctx.createGain();g.gain.value=0.15;osc.frequency.value=parseFloat(S.value);osc.connect(g).connect(ctx.destination);osc.start()}
function stopTone(){if(osc){osc.stop();osc=null}}
function preset(f){S.value=f;S.oninput();playTone()}`
      break
    }
    case 'color': {
      main = `<div id="c-preview" style="height:200px;border-radius:12px;background:${T.accent};box-shadow:0 10px 40px rgba(0,0,0,0.4);transition:background .3s"></div>
<div style="margin-top:16px;font-family:monospace" id="c-codes"></div>
<button onclick="randColor()" style="margin-top:12px">🎲 Random</button>
<button class="secondary" onclick="saveColor()" style="margin-top:12px">💾 Save Palette</button>
<div id="c-saved" style="margin-top:12px"></div>`
      js = `let current='${T.accent}';const K='${key}_colors';
function setColor(c){current=c;document.getElementById('c-preview').style.background=c;
const r=parseInt(c.slice(1,3),16),g=parseInt(c.slice(3,5),16),b=parseInt(c.slice(5,7),16);
const hsl=rgbToHsl(r,g,b);
document.getElementById('c-codes').innerHTML='<div class="stat"><span>HEX</span><b>'+c.toUpperCase()+'</b></div><div class="stat"><span>RGB</span><b>rgb('+r+','+g+','+b+')</b></div><div class="stat"><span>HSL</span><b>hsl('+hsl[0]+','+hsl[1]+'%,'+hsl[2]+'%)</b></div>'}
function rgbToHsl(r,g,b){r/=255;g/=255;b/=255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b);let h,s,l=(mx+mn)/2;if(mx===mn){h=s=0}else{const d=mx-mn;s=l>0.5?d/(2-mx-mn):d/(mx+mn);switch(mx){case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;case b:h=(r-g)/d+4;break}h/=6}return[Math.round(h*360),Math.round(s*100),Math.round(l*100)]}
function randColor(){const c='#'+Math.floor(Math.random()*16777215).toString(16).padStart(6,'0');setColor(c)}
function saveColor(){const list=JSON.parse(localStorage.getItem(K)||'[]');if(!list.includes(current)){list.push(current);localStorage.setItem(K,JSON.stringify(list))}renderSaved()}
function renderSaved(){const list=JSON.parse(localStorage.getItem(K)||'[]');document.getElementById('c-saved').innerHTML=list.map(c=>'<div class="item" style="cursor:pointer" onclick="setColor(\\''+c+'\\')"><div style="width:24px;height:24px;border-radius:6px;background:'+c+'"></div><span style="font-family:monospace">'+c+'</span></div>').join('')||'<div class="empty">No saved colors</div>'}
setColor(current);renderSaved();`
      break
    }
    default: {
      // Generic list/CRUD app
      const label = safeTitle.toLowerCase() || 'item'
      main = `<div class="row"><input id="g-in" placeholder="Add ${label}..."/><button onclick="add()">Add</button></div>
<div class="row" style="margin-top:8px"><input id="g-search" placeholder="🔍 Search..." oninput="render()"/></div>
<div id="g-list" style="margin-top:16px"></div>
<div id="g-stats" class="stat" style="margin-top:12px;display:none"><span>Total</span><b id="g-total">0</b></div>
<div class="row" style="margin-top:12px"><button class="secondary" onclick="clearDone()" style="flex:1">Clear Done</button><button class="secondary" onclick="clearAll()" style="flex:1">Clear All</button></div>`
      js = `const K='${key}_list';let items=JSON.parse(localStorage.getItem(K)||'[]');
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function render(){const q=(document.getElementById('g-search').value||'').toLowerCase();const filtered=items.map((it,i)=>({it,i})).filter(({it})=>!q||it.text.toLowerCase().includes(q));
document.getElementById('g-list').innerHTML=filtered.length?filtered.map(({it,i})=>'<div class="item '+(it.done?'done':'')+'"><input type="checkbox" '+(it.done?'checked':'')+' style="width:auto" onchange="toggle('+i+')"/><span>'+esc(it.text)+'</span><button onclick="del('+i+')">✕</button></div>').join(''):'<div class="empty">Nothing here yet.</div>';
const S=document.getElementById('g-stats');if(items.length){S.style.display='flex';document.getElementById('g-total').textContent=items.filter(x=>!x.done).length+'/'+items.length+' active'}}
function add(){const I=document.getElementById('g-in');const t=I.value.trim();if(!t)return;items.unshift({text:t,done:false,at:Date.now()});I.value='';save()}
function toggle(i){items[i].done=!items[i].done;save()}
function del(i){items.splice(i,1);save()}
function clearDone(){if(!confirm('Remove completed?'))return;items=items.filter(x=>!x.done);save()}
function clearAll(){if(!confirm('Clear everything?'))return;items=[];save()}
function save(){localStorage.setItem(K,JSON.stringify(items));render()}
document.getElementById('g-in').addEventListener('keydown',e=>{if(e.key==='Enter')add()});
render();`
    }
  }

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${safeTitle}</title><style>
*{box-sizing:border-box}
body{margin:0;font-family:system-ui,-apple-system,sans-serif;background:${T.bg};color:${T.text};min-height:100vh;padding:0}
#app{max-width:640px;margin:0 auto;padding:20px;min-height:100vh;display:flex;flex-direction:column}
header{padding:16px 0;border-bottom:1px solid ${T.border};margin-bottom:20px;display:flex;align-items:center;gap:12px}
header h1{margin:0;font-size:20px;color:${T.accent};font-family:monospace;letter-spacing:1px}
main{flex:1;display:flex;flex-direction:column;gap:12px}
input,textarea,select{width:100%;padding:12px;background:${T.card};border:1px solid ${T.border};color:${T.text};border-radius:10px;outline:none;font-size:15px;font-family:inherit}
input:focus,textarea:focus,select:focus{border-color:${T.accent}}
input[type=checkbox]{width:auto}
input[type=color]{padding:0}
button{padding:12px 20px;background:${T.accent};color:${T.btnText};border:none;border-radius:10px;font-weight:bold;cursor:pointer;font-size:14px;font-family:inherit;transition:opacity .15s}
button:hover{opacity:0.85}
button.secondary{background:${T.card};color:${T.text};border:1px solid ${T.border}}
.row{display:flex;gap:8px;align-items:center}
.row input{flex:1}
.card{background:${T.card};border:1px solid ${T.border};border-radius:12px;padding:16px}
.item{display:flex;align-items:center;gap:10px;padding:12px;background:${T.card};border:1px solid ${T.border};border-radius:10px;margin-bottom:6px}
.item.done{opacity:0.5;text-decoration:line-through}
.item span{flex:1;word-break:break-word}
.item b{color:${T.accent};font-family:monospace}
.item button{padding:4px 10px;background:transparent;color:#ff6688;font-size:16px}
.empty{color:${T.muted};text-align:center;padding:40px 20px;font-style:italic}
#display{background:${T.card};padding:20px;border-radius:10px;font-size:32px;text-align:right;color:${T.accent};margin-bottom:12px;min-height:70px;word-break:break-all;font-family:monospace;border:1px solid ${T.border}}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.grid button{padding:18px;font-size:20px;background:${T.card};color:${T.text};border:1px solid ${T.border}}
.grid button.op{background:${T.accent};color:${T.btnText};border-color:${T.accent}}
#chat-log{flex:1;overflow-y:auto;padding:10px 0;display:flex;flex-direction:column;gap:8px;min-height:280px;max-height:60vh}
.msg{max-width:78%;padding:10px 14px;border-radius:14px;word-break:break-word;font-size:14px;line-height:1.4}
.msg.me{align-self:flex-end;background:${T.accent};color:${T.btnText}}
.msg.you{align-self:flex-start;background:${T.card};border:1px solid ${T.border}}
.msg .t{font-size:9px;opacity:0.55;margin-top:4px;text-align:right}
#timer-display{font-size:56px;text-align:center;color:${T.accent};font-family:monospace;padding:30px 0;text-shadow:0 0 20px ${T.accent}55}
canvas{width:100%;max-width:100%;background:${T.card};border:1px solid ${T.border};border-radius:10px;touch-action:none;display:block;cursor:crosshair}
.big-num{font-size:56px;text-align:center;color:${T.accent};font-family:monospace;padding:20px 0;text-shadow:0 0 20px ${T.accent}55}
.stat{display:flex;justify-content:space-between;padding:10px 14px;background:${T.card};border:1px solid ${T.border};border-radius:8px;margin-bottom:6px;font-size:14px}
.stat b{color:${T.accent};font-family:monospace}
@keyframes pop{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.item,.msg,.card{animation:pop .2s ease}
<\/style><\/head><body><div id="app"><header><span style="font-size:28px">${icon}</span><h1>${safeTitle.toUpperCase()}</h1></header><main>${main}</main></div><script>${js}<\/script></body></html>`

  return { title, type:'app', lang:'html', html, description: desc, generated: true, apiRequirements: [] }
}

// Intent detection + dispatcher
const detectIntent = (text) => {
  const l = (text||'').toLowerCase()
  if (/\b(image|picture|photo|draw me|render|show me a (pic|photo|image))\b/.test(l) && !/drawing app|draw app/.test(l)) return 'image'
  if (/\b(source ?code|show code|only code|raw code|show me the code)\b/.test(l)) return 'code'
  return 'app'
}

const buildPracticalArtifact = (desc, forcedLang) => {
  const intent = detectIntent(desc)
  if (intent === 'image') {
    const kw = desc.replace(/show me|image|picture|photo|of|draw|generate|create|make|a |an |render/gi,'').trim() || 'abstract'
    return { title: kw.slice(0,40), type:'image', lang:'image', url: `https://source.unsplash.com/900x600/?${encodeURIComponent(kw)}`, description: desc }
  }
  if (intent === 'code') {
    const lang = forcedLang || detectLanguage(desc)
    return { title:'Source Code', type:'code', lang, code: generateLongCode(lang, desc), description: desc }
  }
  return buildGenApp(desc)
}

// Edit engine (unchanged logic)
const applyEditToArtifact = (artifact, editText) => {
  const l = editText.toLowerCase()
  let newHtml = artifact.html || ''
  let changed = false
  const notes = []
  if (/dark ?mode|night ?mode/.test(l)) { newHtml = newHtml.replace(/body\{[^}]*background:[^;]+/i,'body{background:#0a0a0a').replace(/#ffffff/gi,'#0a0a0a').replace(/#f5f5f5/gi,'#0a0a0a'); notes.push('Dark mode applied'); changed = true }
  if (/light ?mode/.test(l)) { newHtml = newHtml.replace(/body\{[^}]*background:[^;]+/i,'body{background:#f5f5f5').replace(/#0a0a0a/gi,'#f5f5f5').replace(/color:\s*#fff/gi,'color:#111'); notes.push('Light mode applied'); changed = true }
  const cm = l.match(/colou?r(?:\s+(?:to|into))?\s+(#[0-9a-f]{3,6}|red|blue|green|purple|orange|pink|yellow|cyan|gold)/i)
  if (cm) { const map = { red:'#ff003c',blue:'#00c8ff',green:'#00ff41',purple:'#c800ff',orange:'#ff8800',pink:'#ff6688',yellow:'#ffcc00',cyan:'#00ffff',gold:'#ffcc00' }; const col = map[cm[1].toLowerCase()] || cm[1]; newHtml = newHtml.replace(/#00ff41/gi, col).replace(/#ff003c/gi, col).replace(/#00c8ff/gi, col); notes.push(`Color → ${col}`); changed = true }
  if (/bigger (font|text)|larger (font|text)/.test(l)) { newHtml = newHtml.replace('</head>','<style>body{font-size:1.15em !important}</style></head>'); notes.push('Font larger'); changed = true }
  if (/round(er)? (corners|edges)|border ?radius/.test(l)) { newHtml = newHtml.replace('</head>','<style>*{border-radius:16px !important}</style></head>'); notes.push('Rounded corners'); changed = true }
  const tm = editText.match(/title(?:\s+(?:to|as))?\s+["']?([^"'\n]+)["']?$/i)
  if (tm) { newHtml = newHtml.replace(/<title>.*?<\/title>/i, `<title>${tm[1]}</title>`); newHtml = newHtml.replace(/(<h1>)(.*?)(<\/h1>)/, `$1${tm[1].toUpperCase()}$3`); notes.push(`Title → "${tm[1]}"`); changed = true }
  const rm = editText.match(/change\s+["']?(.+?)["']?\s+to\s+["']?(.+?)["']?\s*$/i)
  if (rm) { const re = new RegExp(rm[1].replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'gi'); newHtml = newHtml.replace(re, rm[2]); notes.push(`"${rm[1]}" → "${rm[2]}"`); changed = true }
  if (!changed) return { artifact, changed: false, notes: [`Couldn't apply "${editText}". Try: "dark mode", "color to blue", "bigger font", "title to MyApp", or "change X to Y".`] }
  return { artifact: { ...artifact, html: newHtml, title: artifact.title + ' (edited)' }, changed: true, notes }
}

// ==================================================
// RED BALL
// ==================================================
const RedBall = ({ isSpeaking = false, theme = {}, size = 180 }) => {
  const c = theme.ballColor || '#ff003c'
  const c2 = theme.ballColorLight || lightenColor(c)
  const c3 = theme.ballColorDark || darkenColor(c)
  const scale = size / 180
  return (<div style={{...styles.ballContainer, width: 300 * scale, height: 300 * scale}}>
    <div style={{ ...styles.ring1, width:240*scale, height:240*scale, marginLeft:-120*scale, marginTop:-120*scale, borderColor:hexA(c,0.25) }} />
    <div style={{ ...styles.ring2, width:280*scale, height:280*scale, marginLeft:-140*scale, marginTop:-140*scale, borderColor:hexA(c,0.12) }} />
    <div style={{ ...styles.ring3, width:200*scale, height:200*scale, marginLeft:-100*scale, marginTop:-100*scale, borderColor:hexA(c,0.15) }} />
    <div style={styles.ball3DContainer}><div style={{ ...styles.ball3D, width: size, height: size, background:`radial-gradient(circle at 30% 25%, ${hexA(c2,0.9)} 0%, transparent 45%), radial-gradient(circle at 40% 35%, ${c2} 0%, ${c} 25%, ${c} 50%, ${c3} 75%, ${darkenColor(c3)} 100%)`, boxShadow:`inset -20px -20px 40px ${hexA(c3,0.8)}, inset 15px 15px 30px ${hexA(c2,0.4)}, 0 0 50px ${hexA(c,0.5)}, 0 0 100px ${hexA(c,0.3)}`, ...(isSpeaking?{animation:'ballShake 0.35s ease-in-out infinite'}:{}) }}>
      <div style={styles.ballHighlight} /><div style={styles.ballInnerGlow} />
    </div></div>
  </div>)
}
const hexA = (hex,a) => { if(!hex||!hex.startsWith('#'))return hex; const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16); return `rgba(${r},${g},${b},${a})` }
const lightenColor = (hex) => { if(!hex||!hex.startsWith('#'))return hex; const r=Math.min(255,parseInt(hex.slice(1,3),16)+70),g=Math.min(255,parseInt(hex.slice(3,5),16)+70),b=Math.min(255,parseInt(hex.slice(5,7),16)+70); return '#'+r.toString(16).padStart(2,'0')+g.toString(16).padStart(2,'0')+b.toString(16).padStart(2,'0') }
const darkenColor = (hex) => { if(!hex||!hex.startsWith('#'))return hex; const r=Math.max(0,parseInt(hex.slice(1,3),16)-60),g=Math.max(0,parseInt(hex.slice(3,5),16)-60),b=Math.max(0,parseInt(hex.slice(5,7),16)-60); return '#'+r.toString(16).padStart(2,'0')+g.toString(16).padStart(2,'0')+b.toString(16).padStart(2,'0') }

// ==================================================
// MAIN APP
// ==================================================
export default function App() {
  const [userMode, setUserMode] = useState('guest')
  const [email, setEmail] = useState(''); const [pin, setPin] = useState('')
  const [showLogin, setShowLogin] = useState(true); const [authError, setAuthError] = useState('')
  const [guestMessageCount, setGuestMessageCount] = useState(0); const [showGuestLimit, setShowGuestLimit] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [profile, setProfile] = useState(null)
  const [profileForm, setProfileForm] = useState({ name:'', username:'', avatar:'', bio:'' })
  const [editingProfile, setEditingProfile] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [introStep, setIntroStep] = useState(0)
  const [isEnteringAI, setIsEnteringAI] = useState(false)
  const [enterProgress, setEnterProgress] = useState(0)
  const [enterMessage, setEnterMessage] = useState('Updating...')
  const [viewMode, setViewMode] = useState('android'); const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [backgroundImage, setBackgroundImage] = useState(null)
  const [showChatMenu, setShowChatMenu] = useState(false)
  const [showWorkspace, setShowWorkspace] = useState(false)
  const [workspaceTasks, setWorkspaceTasks] = useState([])
  const [workspaceActiveTab, setWorkspaceActiveTab] = useState('canvas')
  const [workspaceContent, setWorkspaceContent] = useState(null)
  const [workspaceCommand, setWorkspaceCommand] = useState('')
  const [workspaceProcessing, setWorkspaceProcessing] = useState(false)
  const [workspaceLogs, setWorkspaceLogs] = useState([{ type:'system', text:'Workspace initialized.' }])

  const [showPracticalWorkspace, setShowPracticalWorkspace] = useState(false)
  const [practicalBg, setPracticalBg] = useState('#ffffff')
  const [practicalLogs, setPracticalLogs] = useState(() => {
    const def = [{ id: 1, role: 'ai', type: 'text', content: 'Hello! I am your Practical Workspace AI. Describe ANY app, tool, game, or image — and I\'ll build it for you. Try "chat app", "calculator", "snake game", "todo list", "pixel art tool", "money tracker" — anything!' }]
    if (typeof window === 'undefined') return def
    try { const s = localStorage.getItem('cypher4x_practical_logs'); if (s) { const p = JSON.parse(s); if (Array.isArray(p) && p.length > 0) return p } } catch {}
    return def
  })
  const [practicalInput, setPracticalInput] = useState('')
  const [practicalProcessing, setPracticalProcessing] = useState(false)
  const [practicalActionText, setPracticalActionText] = useState('')
  const [practicalReplyingTo, setPracticalReplyingTo] = useState(null)
  const [codeEditorArtifact, setCodeEditorArtifact] = useState(null)
  const [codeEditorValue, setCodeEditorValue] = useState('')

  const [theme, setTheme] = useState({ primary:'#ff003c', secondary:'#000000', ballColor:'#ff003c', ballColorLight:'#ff6688', ballColorDark:'#990022', backgroundImage:null })
  const [settings, setSettings] = useState({ welcomeEnabled:true, autoStartVoice:true, voiceSpeed:1, secretMode:false, overlayButton:false, safeLinks:true, autoScroll:true, haptic:true, soundFx:false, showTimestamps:true, typingIndicator:true, readAloud:false, highContrast:false, compactMode:false, confirmDelete:true, restrictTools:true, locationEnabled:false })
  const [now, setNow] = useState(new Date()); const [weather, setWeather] = useState(null)
  const [chats, setChats] = useState(() => {
    if (typeof window === 'undefined') return [{ id:'default-'+Date.now(), title:'Chat 1', messages:[], createdAt:Date.now() }]
    const s = localStorage.getItem('cypher4x_chats'); return s ? JSON.parse(s) : [{ id:'default-'+Date.now(), title:'Chat 1', messages:[], createdAt:Date.now() }]
  })
  const [activeChatId, setActiveChatId] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('cypher4x_active_chat') : null)
  const conversation = chats.find(c => c.id === activeChatId)?.messages || []
  const setConversation = (updater) => setChats(prev => prev.map(c => c.id !== activeChatId ? c : { ...c, messages: typeof updater === 'function' ? updater(c.messages) : updater }))
  const [showChatOverview, setShowChatOverview] = useState(false)
  const [chatOverviewInput, setChatOverviewInput] = useState(''); const [chatOverviewListening, setChatOverviewListening] = useState(false)
  const [chatOverviewVoiceEnabled, setChatOverviewVoiceEnabled] = useState(true)
  const [isRecordingVoice, setIsRecordingVoice] = useState(false); const [voicePaused, setVoicePaused] = useState(false)
  const [voiceTranscript, setVoiceTranscript] = useState(''); const chatOverviewRecognitionRef = useRef(null)
  const [showRotateOverlay, setShowRotateOverlay] = useState(false)
  const [inputText, setInputText] = useState('')
  const [commandHistory, setCommandHistory] = useState([])
  const [isCallActive, setIsCallActive] = useState(false); const [isFullscreenCall, setIsFullscreenCall] = useState(false)
  const [isListening, setIsListening] = useState(false); const [isProcessing, setIsProcessing] = useState(false)
  const [isRecording, setIsRecording] = useState(false); const [isAISpeaking, setIsAISpeaking] = useState(false)
  const [interimTranscript, setInterimTranscript] = useState(''); const [recordingMode, setRecordingMode] = useState(false)
  const [voiceGender, setVoiceGender] = useState('female')
  const [stats, setStats] = useState({ uptime:0, cpuUsage:0, cpuTemp:0, ramUsage:0, storageUsed:0, networkSpeed:0 })
  const [overlayActive, setOverlayActive] = useState(false); const [overlayListening, setOverlayListening] = useState(false)
  const overlayRecognitionRef = useRef(null)
  const [pendingCode, setPendingCode] = useState(null); const [copiedId, setCopiedId] = useState(null)
  const [replyingTo, setReplyingTo] = useState(null)

  const [showMusicPanel, setShowMusicPanel] = useState(false)
  const [musicDesc, setMusicDesc] = useState(''); const [musicDuration, setMusicDuration] = useState(30)
  const [musicQuality, setMusicQuality] = useState('high'); const [musicPlaying, setMusicPlaying] = useState(false)
  const [musicInfo, setMusicInfo] = useState(''); const [musicDownloadUrl, setMusicDownloadUrl] = useState(null)
  const [musicGenerating, setMusicGenerating] = useState(false); const [musicAudioRef, setMusicAudioRef] = useState(null)

  const [showVideoPanel, setShowVideoPanel] = useState(false)
  const [videoDesc, setVideoDesc] = useState(''); const [videoDuration, setVideoDuration] = useState(5)
  const [videoQuality, setVideoQuality] = useState('medium'); const [videoGenerating, setVideoGenerating] = useState(false)
  const [videoTaskId, setVideoTaskId] = useState(null); const [videoResultUrl, setVideoResultUrl] = useState(null)
  const [videoInfo, setVideoInfo] = useState(''); const [videoPolling, setVideoPolling] = useState(false)
  const [videoRecording, setVideoRecording] = useState(false); const [videoProgress, setVideoProgress] = useState(0)
  const canvasRef = useRef(null); const videoRecorderRef = useRef(null)

  const [showCyberLab, setShowCyberLab] = useState(false); const [cyberTab, setCyberTab] = useState('terminal')
  const [cyberInput, setCyberInput] = useState(''); const [cyberLines, setCyberLines] = useState([
    { type:'info', text: `${VERSION_FULL} — type "help"` },
    { type:'info', text: '⚠️ Simulated shell. Educational only.' },
  ])
  const [cyberToolOutput, setCyberToolOutput] = useState(''); const [cyberTool, setCyberTool] = useState('passcheck')
  const [cyberToolInput, setCyberToolInput] = useState(''); const [ctfChallenge, setCtfChallenge] = useState(null)
  const cyberEndRef = useRef(null)

  const synthRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null)
  const recognitionRef = useRef(null); const msgCounter = useRef(0)
  const fileInputRef = useRef(null); const bgInputRef = useRef(null); const chatEndRef = useRef(null)
  const workspaceEndRef = useRef(null); const practicalEndRef = useRef(null)
  const hasGreeted = useRef(false)

  const playBeep = useCallback((f=800,d=0.08) => { if(!settings.soundFx)return; try { const C=window.AudioContext||window.webkitAudioContext; if(!C)return; const c=new C(),o=c.createOscillator(),g=c.createGain(); o.frequency.value=f; o.type='sine'; g.gain.setValueAtTime(0.1,c.currentTime); g.gain.exponentialRampToValueAtTime(0.001,c.currentTime+d); o.connect(g).connect(c.destination); o.start(); o.stop(c.currentTime+d) } catch {} }, [settings.soundFx])
  const vibrate = useCallback((p=10) => { if(!settings.haptic)return; try { navigator.vibrate && navigator.vibrate(p) } catch {} }, [settings.haptic])
  const speakText = useCallback((text, onEnd=null) => {
    if (!text || !synthRef.current) return
    try {
      synthRef.current.cancel()
      const u = new SpeechSynthesisUtterance(text.replace(/[*_`#]/g,''))
      u.rate = settings.voiceSpeed || 0.95
      u.pitch = voiceGender === 'male' ? 0.7 : 1.0
      const voices = synthRef.current.getVoices()
      const pref = voices.find(v => v.name.includes('Google US English') || (voiceGender==='male' && v.name.includes('David'))) || voices.find(v => v.lang === 'en-US')
      if (pref) u.voice = pref
      u.onstart = () => setIsAISpeaking(true)
      u.onend = () => { setIsAISpeaking(false); if(onEnd)onEnd() }
      u.onerror = () => { setIsAISpeaking(false); if(onEnd)onEnd() }
      synthRef.current.speak(u)
    } catch { setIsAISpeaking(false); if(onEnd)onEnd() }
  }, [settings.voiceSpeed, voiceGender])

  // ============== EFFECTS ==============
  useEffect(() => {
    if (!showIntro) return
    const t1=setTimeout(()=>setIntroStep(1),1000),t2=setTimeout(()=>setIntroStep(2),3500),t3=setTimeout(()=>{setShowIntro(false);setIsEnteringAI(true)},6000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [showIntro])

  useEffect(() => {
    if (!isEnteringAI) return
    setEnterProgress(0); setEnterMessage('Updating...')
    const msgs = [{at:0,text:'Updating...'},{at:25,text:'Loading engine...'},{at:50,text:'Syncing data...'},{at:75,text:'Almost ready...'},{at:95,text:'Welcome!'}]
    const start = Date.now(), dur = 12000
    const iv = setInterval(() => {
      const pct = Math.min(((Date.now()-start)/dur)*100, 100)
      setEnterProgress(pct)
      let cur = msgs[0].text
      for (const m of msgs) if (pct >= m.at) cur = m.text
      setEnterMessage(cur)
      if (pct >= 100) { clearInterval(iv); setIsEnteringAI(false) }
    }, 100)
    return () => clearInterval(iv)
  }, [isEnteringAI])

  useEffect(() => { const t = setInterval(()=>setNow(new Date()),30000); return () => clearInterval(t) }, [])
  useEffect(() => {
    if (!settings.locationEnabled || !navigator.geolocation) return
    const grab = () => navigator.geolocation.getCurrentPosition(async p => { const w = await fetchWeather(p.coords.latitude,p.coords.longitude); if(w)setWeather(w) },()=>{},{timeout:5000})
    grab(); const r = setInterval(grab, 600000); return () => clearInterval(r)
  }, [settings.locationEnabled])
  useEffect(() => { try { localStorage.setItem('cypher4x_chats', JSON.stringify(chats)) } catch {} }, [chats])
  useEffect(() => { if (activeChatId) try { localStorage.setItem('cypher4x_active_chat', activeChatId) } catch {} }, [activeChatId])
  useEffect(() => { if (!activeChatId && chats.length > 0) setActiveChatId(chats[0].id) }, [chats, activeChatId])
  useEffect(() => { if (settings.autoScroll && showChatOverview) chatEndRef.current?.scrollIntoView({behavior:'smooth'}) }, [conversation, showChatOverview, settings.autoScroll])
  useEffect(() => { cyberEndRef.current?.scrollIntoView({behavior:'smooth'}) }, [cyberLines])
  useEffect(() => { workspaceEndRef.current?.scrollIntoView({behavior:'smooth'}) }, [workspaceLogs, workspaceTasks])
  useEffect(() => { practicalEndRef.current?.scrollIntoView({behavior:'smooth'}) }, [practicalLogs])
  useEffect(() => { try { localStorage.setItem('cypher4x_practical_logs', JSON.stringify(practicalLogs)) } catch {} }, [practicalLogs])
  useEffect(() => { const t = setInterval(() => setStats(p => ({ ...p, uptime:Math.floor((Date.now()-APP_START_TIME)/1000), cpuUsage:Math.floor(Math.random()*30)+10, cpuTemp:Math.floor(Math.random()*20)+55, ramUsage:Math.floor(Math.random()*4)+3.5, storageUsed:Math.floor(Math.random()*50)+120, networkSpeed:(Math.random()*5+0.5).toFixed(2) })), 3000); return () => clearInterval(t) }, [])

  // Auth
  const handleAuthSubmit = () => {
    if (!email || !pin || pin.length !== 4 || !/^\d{4}$/.test(pin)) { setAuthError('Valid email + 4-digit PIN required.'); return }
    if (showLogin) { if (userExists(email,pin)) { loginUser(email,pin); setShowAuthModal(false) } else setAuthError('No account found.') }
    else {
      if (userExists(email,pin)) { setAuthError('Account exists.'); return }
      addUser(email,pin)
      saveUserData(email,pin,{ profile:null, chats:[{id:'chat-'+Date.now(),title:'Chat 1',messages:[],createdAt:Date.now()}], commandHistory:[], backgroundImage:null, theme, settings })
      loginUser(email,pin); setShowAuthModal(false)
    }
  }
  const loginUser = (e,p) => { saveAuth(e,p); setUserMode('loggedin'); loadUserDataByEmail(e,p); setAuthError(''); setGuestMessageCount(0); hasGreeted.current = false }
  const loadUserDataByEmail = (e,p) => {
    const d = loadUserData(e,p); if (!d) return
    setProfile(d.profile||null); setCommandHistory(d.commandHistory||[]); setBackgroundImage(d.backgroundImage||null)
    if (d.theme) setTheme(d.theme); if (d.settings) setSettings({ ...settings, ...d.settings })
    if (d.chats && d.chats.length) { setChats(d.chats); setActiveChatId(d.activeChatId||d.chats[0].id) }
  }
  const saveCurrentUserData = () => { if (userMode !== 'loggedin') return; saveUserData(email,pin,{ profile, chats, activeChatId, commandHistory, backgroundImage, theme, settings }) }
  useEffect(() => { if (userMode === 'loggedin') saveCurrentUserData() }, [profile, chats, activeChatId, commandHistory, backgroundImage, theme, settings])

  const handleLogout = () => {
    if (!confirm('Logout?')) return
    clearAuth(); setUserMode('guest'); setProfile(null); setChats([{ id:'default-'+Date.now(), title:'Chat 1', messages:[], createdAt:Date.now() }])
    setCommandHistory([]); setSidebarOpen(false); setGuestMessageCount(0); setShowAuthModal(false); msgCounter.current = 0; hasGreeted.current = false
  }
  const incrementGuestMessage = () => { if (userMode !== 'guest') return; const n = guestMessageCount+1; setGuestMessageCount(n); if (n >= 5) setShowGuestLimit(true) }
  const requireLogin = (n) => { if (!TOOLS_ENABLED) { alert(`🔒 ${n} not available.`); return false } if (settings.restrictTools && userMode !== 'loggedin') { alert(`🔒 ${n} requires login.`); return false } return true }

  useEffect(() => {
    if (!isEnteringAI && !hasGreeted.current && activeChatId && !showIntro) {
      hasGreeted.current = true
      const name = profile?.name || (userMode === 'guest' ? 'Guest' : 'there')
      const g = `Hello ${name}! 👋 I am CYPHER4X. How can I help?`
      setConversation(prev => prev.length === 0 ? [{ id:++msgCounter.current, role:'assistant', content:g, time:Date.now() }] : prev)
      if (settings.readAloud || settings.autoStartVoice) speakText(g)
    }
  }, [isEnteringAI, activeChatId, showIntro])

  // Chat mgmt
  const createNewChat = () => { const n = { id:'chat-'+Date.now(), title:'Chat '+(chats.length+1), messages:[], createdAt:Date.now() }; setChats(prev => [n, ...prev]); setActiveChatId(n.id); setChatOverviewInput(''); setReplyingTo(null); setShowChatMenu(false) }
  const switchChat = (id) => { setActiveChatId(id); setChatOverviewInput(''); setReplyingTo(null); setShowChatMenu(false) }
  const renameChat = (id) => { const c = chats.find(x=>x.id===id); if(!c)return; const t = prompt('Rename:',c.title); if(t&&t.trim()) setChats(prev => prev.map(x => x.id===id?{...x,title:t.trim()}:x)); setShowChatMenu(false) }
  const deleteChat = (id) => { if (chats.length <= 1) { alert('Need at least one chat.'); return } if (!confirm('Delete?')) return; const r = chats.filter(x=>x.id!==id); setChats(r); if (activeChatId===id) setActiveChatId(r[0].id); setShowChatMenu(false) }
  const clearConversation = useCallback(() => setConversation([]), [activeChatId])

  // Speech
  const setupSpeechRecognition = useCallback((isOneOff = false, onFinal = null) => {
    if (typeof window === 'undefined') return null
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) { alert('Speech not supported.'); return null }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    const r = new SR(); r.continuous = !isOneOff; r.interimResults = true; r.lang = 'en-US'
    r.onstart = () => { setIsListening(true); setInterimTranscript('') }
    r.onend = () => { setIsListening(false); setInterimTranscript(''); if (!isOneOff && isFullscreenCall) try { r.start() } catch {} }
    r.onerror = (e) => { if (e.error === 'not-allowed') { alert('Allow mic.'); setIsFullscreenCall(false); setIsCallActive(false); setRecordingMode(false); setIsListening(false) } }
    r.onresult = async (e) => { let f='',i=''; for (let k=e.resultIndex; k<e.results.length; k++) { const r2=e.results[k]; if (r2.isFinal) f+=r2[0].transcript; else i+=r2[0].transcript } if (f) { setInterimTranscript(''); setRecordingMode(false); if(onFinal) onFinal(f); else await processUserQuery(f) } else if (i) setInterimTranscript(i) }
    return r
  }, [isFullscreenCall])

  const getDashboardInfo = () => {
    const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], months=['January','February','March','April','May','June','July','August','September','October','November','December']
    return { date:`${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`, time:now.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',second:'2-digit'}), day:days[now.getDay()], temp:weather?.temp!=null?`${weather.temp}°C`:null }
  }

  // Workspace (legacy)
  const addWorkspaceTask = (text) => { const id = Date.now()+Math.random(); setWorkspaceTasks(prev => [...prev, { id, text, status:'pending', progress:0 }]); return id }
  const updateWorkspaceTask = (id,u) => setWorkspaceTasks(prev => prev.map(t => t.id===id?{...t,...u}:t))
  const removeWorkspaceTask = (id) => setTimeout(() => setWorkspaceTasks(prev => prev.filter(t => t.id!==id)), 2000)
  const processWorkspaceCommand = async (cmdText) => {
    if (!cmdText.trim() || workspaceProcessing) return
    setWorkspaceProcessing(true); setWorkspaceLogs(prev => [...prev, { type:'user', text:cmdText }]); setWorkspaceCommand('')
    const t1 = addWorkspaceTask('Processing...'); await new Promise(r => setTimeout(r, 800)); updateWorkspaceTask(t1, { status:'done', progress:100 }); removeWorkspaceTask(t1)
    setWorkspaceLogs(prev => [...prev, { type:'ai', text:`Received: "${cmdText}". Try Practical Workspace for real building.` }])
    speakText('Command received.')
    setWorkspaceProcessing(false)
  }
  const handleWorkspaceSubmit = (e) => { if(e)e.preventDefault(); processWorkspaceCommand(workspaceCommand) }
  const handleWorkspaceVoice = () => {
    if (isRecording) return
    const r = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
    r.continuous=false; r.interimResults=false; r.lang='en-US'
    r.onstart=()=>setIsRecording(true); r.onend=()=>setIsRecording(false)
    r.onerror=(e)=>{setIsRecording(false); alert('Voice error: '+e.error)}
    r.onresult=(e)=>processWorkspaceCommand(e.results[0][0].transcript)
    r.start()
  }

  // Practical Workspace
  const processPracticalCommand = async (cmdText) => {
    if (!cmdText.trim() || practicalProcessing) return
    setPracticalLogs(prev => [...prev, { id:Date.now(), role:'user', type:'text', content:cmdText, time:Date.now(), replyTo:practicalReplyingTo?.id||null, replyToPreview:practicalReplyingTo?.preview||null }])
    setPracticalInput('')
    const l = cmdText.toLowerCase()

    if (practicalReplyingTo) {
      const targetLog = practicalLogs.find(x => x.id === practicalReplyingTo.id)
      setPracticalReplyingTo(null)
      if (targetLog && targetLog.type === 'artifact' && targetLog.content) {
        setPracticalProcessing(true); setPracticalActionText('Applying changes...')
        setPracticalLogs(prev => [...prev, { id:Date.now(), role:'ai', type:'text', content:'✏️ Applying your changes...' }])
        await new Promise(r => setTimeout(r, 900))
        try {
          const result = applyEditToArtifact(targetLog.content, cmdText)
          setPracticalLogs(prev => [...prev, { id:Date.now()+1, role:'ai', type:'text', content: result.changed ? `✅ Done:\n${result.notes.join('\n')}` : `⚠️ ${result.notes.join('\n')}` }, ...(result.changed ? [{ id:Date.now()+2, role:'ai', type:'artifact', content:result.artifact, time:Date.now() }] : [])])
          speakText(result.changed ? 'Changes applied.' : 'Could not apply those changes.')
        } catch (e) { setPracticalLogs(prev => [...prev, { id:Date.now(), role:'ai', type:'text', content:'⚠️ Error: '+e.message }]) }
        setPracticalProcessing(false); setPracticalActionText(''); return
      }
      return runDirectBuild(cmdText)
    }

    if (isPureGreeting(cmdText)) { const r = "Hello! 👋 What should I build for you?"; setPracticalLogs(prev => [...prev, { id:Date.now(), role:'ai', type:'text', content:r }]); speakText(r); return }
    if (/how are you/.test(l)) { const r = "Running perfectly. What can I build?"; setPracticalLogs(prev => [...prev, { id:Date.now(), role:'ai', type:'text', content:r }]); speakText(r); return }
    if (/your name|who are you/.test(l)) { const r = "I'm CYPHER4X — I build ANY app, tool, game, or image you describe."; setPracticalLogs(prev => [...prev, { id:Date.now(), role:'ai', type:'text', content:r }]); speakText(r); return }

    await runDirectBuild(cmdText)
  }

  const runDirectBuild = async (desc) => {
    setPracticalProcessing(true)
    const intent = detectIntent(desc)
    const labelMap = { app:'app', image:'image', code:'source code' }
    const label = labelMap[intent] || 'app'
    setPracticalActionText(`Building your ${label}...`)
    setPracticalLogs(prev => [...prev, { id:Date.now(), role:'ai', type:'text', content:`⚙️ Building your ${label}...\n\nAlmost ready...` }])
    await new Promise(r => setTimeout(r, 1200))
    let artifact
    try { artifact = buildPracticalArtifact(desc) } catch (e) { artifact = { title:'Build error', type:'text', content:'Failed: '+e.message } }
    setPracticalLogs(prev => [...prev, { id:Date.now(), role:'ai', type:'artifact', content:artifact, time:Date.now() }])
    speakText(`Your ${label} is ready. Download it, open in tab, or reply to make edits.`)
    setPracticalProcessing(false); setPracticalActionText('')
  }

  const handlePracticalDelete = (id) => { if (!confirm('Delete this message?')) return; setPracticalLogs(prev => prev.filter(l => l.id !== id)) }
  const handlePracticalEdit = (log) => { const nc = prompt('Edit your message:', log.content); if (nc === null || !nc.trim() || nc === log.content) return; setPracticalLogs(prev => prev.map(l => l.id === log.id ? { ...l, content:nc.trim(), edited:true } : l)) }
  const handlePracticalCopy = async (log) => { const text = typeof log.content === 'string' ? log.content : (log.content?.code || log.content?.html || JSON.stringify(log.content)); try { await navigator.clipboard.writeText(text); alert('Copied!') } catch { alert('Copy failed') } }
  const handlePracticalReply = (log) => { const preview = typeof log.content === 'string' ? log.content : (log.content?.title || 'artifact'); setPracticalReplyingTo({ id:log.id, preview }) }
  const openCodeEditor = (log) => { if (!log.content) return; const initial = log.content.type === 'code' ? log.content.code : (log.content.html || ''); setCodeEditorArtifact({ logId:log.id, artifact:log.content }); setCodeEditorValue(initial) }
  const saveCodeEdit = () => {
    if (!codeEditorArtifact) return
    const { logId, artifact } = codeEditorArtifact
    setPracticalLogs(prev => prev.map(l => { if (l.id !== logId) return l; const u = { ...l.content }; if (u.type === 'code') u.code = codeEditorValue; else u.html = codeEditorValue; u.title = u.title + ' (edited)'; return { ...l, content:u } }))
    setCodeEditorArtifact(null); setCodeEditorValue('')
    setPracticalLogs(prev => [...prev, { id:Date.now(), role:'ai', type:'text', content:'✅ Source code updated — preview refreshed.' }])
  }
  const downloadBlob = (blob, name) => { const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000) }
  const handleArtifactDownload = (a) => {
    if (a.type === 'image') { window.open(a.url, '_blank'); return }
    if (a.type === 'code') { const ext = { javascript:'js', typescript:'ts', python:'py', java:'java', csharp:'cs', cpp:'cpp', rust:'rs', go:'go', swift:'swift', kotlin:'kt', react:'jsx', html:'html', sql:'sql' }[a.lang] || 'txt'; downloadBlob(new Blob([a.code], { type:'text/plain' }), `${a.title.toLowerCase().replace(/\s+/g,'_')}.${ext}`); return }
    if (a.html) downloadBlob(new Blob([a.html], { type:'text/html' }), `${a.title.toLowerCase().replace(/\s+/g,'_')}.html`)
  }
  const openArtifactInTab = (a) => { if (a.type === 'image') { window.open(a.url,'_blank'); return } if (!a.html) return; const blob = new Blob([a.html],{type:'text/html'}); const url = URL.createObjectURL(blob); window.open(url,'_blank'); setTimeout(() => URL.revokeObjectURL(url), 60000) }
  const handlePracticalSubmit = (e) => { if(e)e.preventDefault(); processPracticalCommand(practicalInput) }
  const handlePracticalVoice = () => {
    if (isRecording) return
    const r = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
    r.continuous=false; r.interimResults=false; r.lang='en-US'
    r.onstart=()=>setIsRecording(true); r.onend=()=>setIsRecording(false)
    r.onerror=(e)=>{setIsRecording(false); alert('Voice error: '+e.error)}
    r.onresult=(e)=>processPracticalCommand(e.results[0][0].transcript)
    r.start()
  }

  // Main chat
  const executeCommand = (q) => {
    const l = q.toLowerCase().trim()
    const wg = l.match(/(?:open\s+)?(?:my\s+)?whatsapp.*group(?:\s+named)?\s+(.+)/i); if (wg) return { response:`Opening WhatsApp, searching "${wg[1].trim()}".` }
    const am = l.match(/^open\s+(?:my\s+)?(whatsapp|instagram|youtube|github)(?:\s+on\s+my\s+device)?$/i); if (am) return { response:openApp(am[1]) }
    if ((l.startsWith('secret ') || l.startsWith('anonymous ')) && settings.secretMode) { const t = q.replace(/^(secret|anonymous)\s+/i,''); openAnonymous(t); return { response:`Anonymous search: "${t}" 🔒` } }
    if (l.startsWith('web ') || l.startsWith('search web ')) { const t = q.replace(/^(web|search web)\s+/i,''); openAnonymous(t); return { response:`Searching "${t}"...` } }
    if (l.startsWith('play ')) { const s = l.replace('play ','').trim(); window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(s)}`,'_blank'); return { response:`Playing "${s}"! 🎵` } }
    const d = getDashboardInfo()
    if (l === 'time' || l.includes('what time')) return { response:`🕒 **${d.time}**\n📅 ${d.day}, ${d.date}` }
    if (l === 'date' || l.includes('what date') || l === 'today') return { response:`📅 **${d.day}**, ${d.date}` }
    if (l.includes('weather') || l.includes('temperature')) { if (!settings.locationEnabled) return { response:'⚠️ Enable Location in Settings.' }; if (!weather) return { response:'⏳ Fetching...' }; return { response:`🌡️ **${d.temp}**` } }
    if (l.startsWith('calc ') || l.includes('calculate')) { try { const e = l.replace('calculate','').replace('calc','').trim(); const r = Function(`"use strict"; return (${e})`)(); if (typeof r === 'number') return { response:`Answer: ${r} 🧮` } } catch {} }
    return null
  }

  const processUserQuery = useCallback(async (query) => {
    if (!query || isProcessing) return
    if (userMode === 'guest') incrementGuestMessage()
    setIsProcessing(true); setInterimTranscript(''); setRecordingMode(false); vibrate(15); playBeep(700,0.06)
    const um = { id:++msgCounter.current, role:'user', content:query, time:Date.now(), replyTo:replyingTo?.id||null, replyToText:replyingTo?.content?.slice(0,80)||null }
    setConversation(prev => [...prev, um]); setCommandHistory(prev => [...prev, { command:query, timestamp:Date.now() }]); setReplyingTo(null)

    if (pendingCode) {
      const next = { ...pendingCode.answers, [pendingCode.step]:query }
      const idx = ['language','purpose'].findIndex(k => !next[k])
      if (idx === -1) { const code = generateLongCode(next.language, next.purpose); setConversation(prev => [...prev, { id:++msgCounter.current, role:'assistant', content:code, time:Date.now() }]); setPendingCode(null) }
      else { const nk = ['language','purpose'][idx]; setPendingCode({ step:nk, answers:next }); const qs = { language:'What language?', purpose:'What should it do?' }; const q = qs[nk]; setConversation(prev => [...prev, { id:++msgCounter.current, role:'assistant', content:q, time:Date.now() }]); if (settings.readAloud) speakText(q) }
      setIsProcessing(false); return
    }
    if (isCodeRequest(query)) { const lang = detectLanguage(query); setConversation(prev => [...prev, { id:++msgCounter.current, role:'assistant', content:`Code request! Q1 — Language?\n\n_Detected: **${lang}**_`, time:Date.now() }]); setPendingCode({ step:'language', answers:{ language:null } }); setIsProcessing(false); return }
    const cmd = executeCommand(query); if (cmd) { setConversation(prev => [...prev, { id:++msgCounter.current, role:'assistant', content:cmd.response, time:Date.now() }]); if (settings.readAloud) speakText(cmd.response); setIsProcessing(false); return }
    for (const k of KNOWLEDGE) { if (k.match.test(query)) { setConversation(prev => [...prev, { id:++msgCounter.current, role:'assistant', content:k.answer, time:Date.now() }]); if (settings.readAloud) speakText(k.answer.slice(0,300)); setIsProcessing(false); return } }
    if (isPureGreeting(query)) { const g = 'Hey! 👋 How can I help?'; setConversation(prev => [...prev, { id:++msgCounter.current, role:'assistant', content:g, time:Date.now() }]); if (settings.readAloud) speakText(g); setIsProcessing(false); return }
    const result = await searchWeb(query)
    let reply = result.error ? `Error: ${result.error}` : (result.answer || 'No answer found.')
    if (!result.error && result.safestUrl && settings.safeLinks && /\b(link|url|source|open|visit)\b/i.test(query)) reply += `\n\n🔗 ${result.safestUrl}`
    setConversation(prev => [...prev, { id:++msgCounter.current, role:'assistant', content:reply, time:Date.now() }])
    if (settings.readAloud) speakText(reply.replace(/🔗.*$/s,''))
    setIsProcessing(false)
  }, [isProcessing, userMode, settings, pendingCode, replyingTo, activeChatId, weather, now, vibrate, playBeep, speakText])

  // Overview voice
  const setupOverviewRecognition = useCallback(() => {
    if (typeof window === 'undefined') return null
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) return null
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    const r = new SR(); r.continuous = false; r.interimResults = true; r.lang = 'en-US'
    r.onstart = () => { setChatOverviewListening(true); setIsRecordingVoice(true); setVoicePaused(false); setVoiceTranscript('') }
    r.onend = () => { setChatOverviewListening(false); setIsRecordingVoice(false) }
    r.onerror = () => { setChatOverviewListening(false); setIsRecordingVoice(false) }
    r.onresult = (e) => { let f='',i=''; for (let k=e.resultIndex; k<e.results.length; k++) { const r2=e.results[k]; if (r2.isFinal) f+=r2[0].transcript; else i+=r2[0].transcript } if (f) setVoiceTranscript(f); else if (i) setVoiceTranscript(i) }
    return r
  }, [])
  const startVoiceRecording = useCallback(() => { if (isRecordingVoice || chatOverviewListening) return; if (!chatOverviewRecognitionRef.current) chatOverviewRecognitionRef.current = setupOverviewRecognition(); if (chatOverviewRecognitionRef.current) { try { chatOverviewRecognitionRef.current.start(); setVoiceTranscript('') } catch {} } }, [isRecordingVoice, chatOverviewListening, setupOverviewRecognition])
  const pauseVoiceRecording = useCallback(() => { if (chatOverviewRecognitionRef.current && chatOverviewListening) { try { chatOverviewRecognitionRef.current.stop(); setVoicePaused(true); setChatOverviewListening(false); setIsRecordingVoice(false) } catch {} } }, [chatOverviewListening])
  const resumeVoiceRecording = useCallback(() => { if (voicePaused && chatOverviewRecognitionRef.current) { try { chatOverviewRecognitionRef.current.start(); setVoicePaused(false); setChatOverviewListening(true); setIsRecordingVoice(true) } catch {} } }, [voicePaused])
  const deleteVoiceRecording = useCallback(() => { if (chatOverviewRecognitionRef.current) try { chatOverviewRecognitionRef.current.stop() } catch {}; setVoiceTranscript(''); setChatOverviewListening(false); setIsRecordingVoice(false); setVoicePaused(false) }, [])
  const sendVoiceRecording = useCallback(() => { const t = voiceTranscript.trim(); if (!t || isProcessing) return; setVoiceTranscript(''); setChatOverviewListening(false); setIsRecordingVoice(false); setVoicePaused(false); if (chatOverviewRecognitionRef.current) try { chatOverviewRecognitionRef.current.stop() } catch {}; processUserQuery(t) }, [voiceTranscript, isProcessing, processUserQuery])
  useEffect(() => { if (voiceTranscript && !chatOverviewListening) setChatOverviewInput(voiceTranscript) }, [voiceTranscript, chatOverviewListening])
  const sendOverviewText = useCallback(() => { const t = chatOverviewInput.trim(); if (!t || isProcessing) return; setChatOverviewInput(''); processUserQuery(t) }, [chatOverviewInput, isProcessing, processUserQuery])

  const handleOverviewFileShare = useCallback((e) => {
    const files = e.target.files; if (!files || !files[0]) return
    const f = files[0]; if (f.size > 20*1024*1024) { alert('Max 20MB'); return }
    const rd = new FileReader()
    rd.onloadend = () => { setConversation(prev => [...prev, { id:++msgCounter.current, role:'user', content:`📎 ${f.name}`, time:Date.now(), file:{ name:f.name, type:f.type, data:rd.result, size:f.size } }]); setConversation(prev => [...prev, { id:++msgCounter.current, role:'assistant', content:`Received: **${f.name}**`, time:Date.now() }]) }
    rd.readAsDataURL(f); e.target.value = ''
  }, [activeChatId])
  const handleEditMessage = useCallback((id) => { const m = conversation.find(x=>x.id===id); if(!m||m.role!=='user')return; const nc = prompt('Edit:',m.content); if(nc!==null && nc.trim()) setConversation(prev => prev.map(x => x.id===id?{...x,content:nc.trim()}:x)) }, [conversation, activeChatId])
  const handleDeleteMessage = useCallback((id) => { if (settings.confirmDelete && !confirm('Delete?')) return; setConversation(prev => prev.filter(m => m.id !== id)) }, [settings.confirmDelete, activeChatId])
  const handleShareMessage = useCallback(async (m) => { if (navigator.share) { try { await navigator.share({ title:'CYPHER4X', text:m.content }) } catch {} } else { try { await navigator.clipboard.writeText(m.content); alert('Copied!') } catch {} } }, [])
  const copyCode = async (code, id) => { try { await navigator.clipboard.writeText(code); setCopiedId(id); setTimeout(() => setCopiedId(null), 1500); vibrate(20) } catch {} }
  const handleReply = (m) => { setReplyingTo({ id:m.id, content:m.content }); setShowChatOverview(true) }

  const renderMessageContent = (msg) => {
    const c = msg.content || ''
    const rx = /```(\w+)?\n([\s\S]*?)```/g
    const parts = []; let last = 0, m, idx = 0
    while ((m = rx.exec(c)) !== null) { if (m.index > last) parts.push({ type:'text', value:c.slice(last,m.index) }); parts.push({ type:'code', lang:m[1]||'text', value:m[2], key:`${msg.id}-${idx++}` }); last = m.index + m[0].length }
    if (last < c.length) parts.push({ type:'text', value:c.slice(last) })
    if (!parts.length) parts.push({ type:'text', value:c })
    return parts.map((p,i) => p.type === 'code' ? (
      <div key={p.key||i} style={{ ...styles.codeBlockWrap, borderColor:hexA(theme.primary,0.5) }}>
        <div style={{ ...styles.codeBlockHeader, borderBottom:`1px solid ${hexA(theme.primary,0.3)}` }}>
          <span style={{ ...styles.codeLang, color:theme.primary }}>{p.lang}</span>
          <button onClick={() => copyCode(p.value, p.key)} style={{ ...styles.codeCopyBtn, backgroundColor:theme.primary }}>
            <Icon name={copiedId === p.key ? 'check' : 'copy'} size={14} color="#fff" /><span>{copiedId === p.key ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
        <pre style={styles.codeBlock}>{p.value}</pre>
      </div>
    ) : <span key={i} style={styles.chatOverviewMsgText}>{p.value}</span>)
  }

  // Call
  const toggleFullscreenCall = useCallback(() => {
    if (isFullscreenCall) { setIsFullscreenCall(false); setIsCallActive(false); if (recognitionRef.current) try { recognitionRef.current.stop() } catch {}; setIsListening(false); setInterimTranscript(''); synthRef.current?.cancel(); setIsAISpeaking(false) }
    else { setIsFullscreenCall(true); setIsCallActive(true); if (!recognitionRef.current) recognitionRef.current = setupSpeechRecognition(false, (t) => processUserQuery(t)); if (recognitionRef.current) { try { recognitionRef.current.start(); speakText("I'm listening.") } catch {} } }
  }, [isFullscreenCall, setupSpeechRecognition, speakText, processUserQuery])
  const interruptAndListen = useCallback(() => { synthRef.current?.cancel(); setIsAISpeaking(false); if (recognitionRef.current) try { recognitionRef.current.start() } catch {} }, [])
  const startRecording = useCallback(() => {
    if (isRecording || isProcessing || isFullscreenCall) return
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) { alert('Speech not supported.'); return }
    setRecordingMode(true); vibrate(30)
    const r = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
    r.continuous = false; r.interimResults = true; r.lang = 'en-US'
    r.onstart = () => { setIsRecording(true); setIsListening(true); setInterimTranscript('') }
    r.onend = () => { setIsRecording(false); setIsListening(false) }
    r.onerror = (e) => { setIsRecording(false); setRecordingMode(false); setIsListening(false); if (e.error === 'not-allowed') alert('Allow mic.'); else alert('Error: '+e.error) }
    r.onresult = async (e) => { let f='',i=''; for (let k=e.resultIndex; k<e.results.length; k++) { const r2=e.results[k]; if (r2.isFinal) f+=r2[0].transcript; else i+=r2[0].transcript } if (f) { setInterimTranscript(''); setRecordingMode(false); await processUserQuery(f) } else if (i) setInterimTranscript(i) }
    recognitionRef.current = r
    try { r.start() } catch (e) { alert('Failed: '+e.message); setRecordingMode(false) }
  }, [isRecording, isProcessing, isFullscreenCall, processUserQuery, vibrate])
  const sendInterim = useCallback(() => { if (!interimTranscript.trim() || isProcessing) return; const t = interimTranscript.trim(); setInterimTranscript(''); setRecordingMode(false); if (recognitionRef.current) try { recognitionRef.current.stop() } catch {}; processUserQuery(t) }, [interimTranscript, isProcessing, processUserQuery])
  const sendTextMessage = useCallback(() => { const t = inputText.trim(); if (!t || isProcessing) return; setInputText(''); processUserQuery(t) }, [inputText, isProcessing, processUserQuery])

  // Settings
  const handleBackgroundChange = (e) => { const f = e.target.files[0]; if (!f) return; if (!f.type.startsWith('image/')) { alert('Image only'); return }; if (f.size > 5*1024*1024) { alert('Max 5MB'); return }; const rd = new FileReader(); rd.onloadend = () => setBackgroundImage(rd.result); rd.readAsDataURL(f) }
  const resetBackground = () => { setBackgroundImage(null); if (bgInputRef.current) bgInputRef.current.value = '' }
  const toggleView = useCallback(() => { setViewMode(p => { const n = p === 'android' ? 'pc' : 'android'; if (n === 'pc') setShowRotateOverlay(true); return n }); setSidebarOpen(false) }, [])
  const toggleOverlay = () => {
    const s = !overlayActive; setOverlayActive(s)
    if (s) {
      if (!overlayRecognitionRef.current) {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) { setOverlayActive(false); return }
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition
        const rec = new SR(); rec.continuous = false; rec.interimResults = false; rec.lang = 'en-US'
        rec.onstart = () => setOverlayListening(true); rec.onend = () => setOverlayListening(false); rec.onerror = () => setOverlayListening(false)
        rec.onresult = (e) => { const t = e.results[0][0].transcript; setOverlayActive(false); processUserQuery(t) }
        overlayRecognitionRef.current = rec
      }
      try { overlayRecognitionRef.current.start() } catch {}
    } else { try { overlayRecognitionRef.current?.stop() } catch {}; setOverlayListening(false) }
  }

  // Music (simple synth fallback)
  const handleGenerateMusic = async () => {
    if (!requireLogin('Music Generator')) return
    if (!musicDesc.trim()) { alert('Describe the music.'); return }
    setMusicGenerating(true); setMusicInfo('📡 Trying Tunova...')
    const fallback = () => { setMusicInfo('⚠️ Tunova unavailable — using basic synth.'); setMusicGenerating(false); try { const C = window.AudioContext || window.webkitAudioContext; const c = new C(); const o = c.createOscillator(); o.connect(c.destination); o.start(); setTimeout(() => { try { o.stop(); c.close() } catch {} }, 2000) } catch {} }
    try { const r = await fetch('/api/music', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ prompt:musicDesc, duration:musicDuration }) }); if (!r.ok) return fallback(); const d = await r.json(); if (d.error) return fallback(); setMusicInfo('✓ Task created'); setMusicGenerating(false) } catch { fallback() }
  }

  // Video (built-in engine)
  const handleGenerateVideo = async () => {
    if (!requireLogin('Video Generator')) return
    if (!videoDesc.trim()) { alert('Describe the video.'); return }
    setVideoGenerating(true); setVideoInfo('🎬 Building...')
    try {
      const canvas = canvasRef.current; if (!canvas) return
      const ctx = canvas.getContext('2d'); let t = 0
      const style = { cyber:/cyber|neon/.test(videoDesc.toLowerCase()), label: videoDesc.slice(0,20) }
      setVideoRecording(true)
      const stream = canvas.captureStream(30)
      const rec = new MediaRecorder(stream, { mimeType:'video/webm' })
      const chunks = []; rec.ondataavailable = e => e.data.size && chunks.push(e.data)
      rec.start()
      const draw = () => { t += 0.05; ctx.fillStyle = style.cyber ? '#000' : `hsl(${t*20%360},50%,20%)`; ctx.fillRect(0,0,canvas.width,canvas.height); ctx.fillStyle = style.cyber ? '#0f0' : '#fff'; ctx.font = 'bold 40px monospace'; ctx.textAlign = 'center'; ctx.fillText('CYPHER4X', canvas.width/2, canvas.height/2); ctx.font = '16px monospace'; ctx.fillText(style.label, canvas.width/2, canvas.height/2 + 40) }
      const iv = setInterval(draw, 33)
      setTimeout(() => {
        clearInterval(iv); rec.stop()
        rec.onstop = () => { setVideoRecording(false); setVideoResultUrl(URL.createObjectURL(new Blob(chunks, { type:'video/webm' }))); setVideoInfo('✓ Video ready!'); setVideoGenerating(false) }
      }, videoDuration * 1000)
    } catch (e) { setVideoInfo('❌ '+e.message); setVideoGenerating(false) }
  }
  const handleStopLocalVideo = () => { setVideoRecording(false) }

  // Cyber terminal
  const fmtU = (s) => `${Math.floor(s/3600).toString().padStart(2,'0')}:${Math.floor((s%3600)/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`
  const fmtT = (ts) => new Date(ts).toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })

  const runCyberCommand = async (cmd) => {
    if (!requireLogin('Terminal')) return
    const parts = cmd.trim().split(/\s+/); const base = parts[0]?.toLowerCase(); const args = parts.slice(1).join(' '); const arg1 = parts[1]
    let out = ''
    try {
      switch (base) {
        case 'pwd': out = '/home/cypher4x'; break
        case 'ls': out = 'Documents/  Downloads/  Pictures/  README.md'; break
        case 'whoami': out = userMode === 'loggedin' ? email : 'guest'; break
        case 'uname': out = 'Linux'; break
        case 'uptime': out = `up ${fmtU(stats.uptime)}`; break
        case 'date': out = new Date().toString(); break
        case 'ping': out = arg1 ? `PING ${arg1}: 0% packet loss` : 'Usage: ping <host>'; break
        case 'hash': { if (!args) { out = 'Usage: hash <text>'; break } const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(args)); out = Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2,'0')).join(''); break }
        case 'base64': out = (() => { try { return btoa(args) } catch { return 'Invalid' } })(); break
        case 'unbase64': out = (() => { try { return atob(args) } catch { return 'Invalid' } })(); break
        case 'rot13': out = args.replace(/[a-zA-Z]/g, c => String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26)); break
        case 'echo': out = args; break
        case 'calc': { try { out = String(Function(`"use strict"; return (${args})`)()) } catch { out = 'Invalid' } break }
        case 'clear': setCyberLines([{ type:'info', text:'Cleared.' }]); return
        case 'help': out = 'pwd ls whoami uname uptime date ping hash base64 unbase64 rot13 echo calc clear help'; break
        default: out = `command not found: ${base}`
      }
    } catch (e) { out = 'Error: '+e.message }
    setCyberLines(prev => [...prev, { type:'cmd', text:`$ ${cmd}` }, { type:'out', text:out }])
  }
  const handleCyberSubmit = (e) => { e.preventDefault(); if (!cyberInput.trim()) return; runCyberCommand(cyberInput); setCyberInput('') }
  const runCyberTool = async () => {
    if (!requireLogin('Cyber Tools')) return
    let out = ''
    try {
      switch (cyberTool) {
        case 'passcheck': { const pw = cyberToolInput; if (!pw) { out = 'Enter a password'; break } const c = { len:pw.length>=12, low:/[a-z]/.test(pw), up:/[A-Z]/.test(pw), dig:/\d/.test(pw), sp:/[^A-Za-z0-9]/.test(pw) }; const s = Object.values(c).filter(Boolean).length; out = `Score ${s}/5\n${s>=4?'🟢 Strong':s>=3?'🟡 Medium':'🔴 Weak'}`; break }
        case 'hash': { const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(cyberToolInput)); out = Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2,'0')).join(''); break }
        case 'base64': out = (() => { try { return btoa(cyberToolInput) } catch { return 'Invalid' } })(); break
        case 'unbase64': out = (() => { try { return atob(cyberToolInput) } catch { return 'Invalid' } })(); break
        default: out = 'Unknown tool'
      }
    } catch (e) { out = 'Error: '+e.message }
    setCyberToolOutput(out)
  }

  // Profile
  const handleAvatarChange = useCallback((e) => { const f = e.target.files[0]; if (!f) return; if (!f.type.startsWith('image/')) return alert('Image only'); const rd = new FileReader(); rd.onloadend = () => setProfileForm(p => ({ ...p, avatar:rd.result })); rd.readAsDataURL(f) }, [])
  const saveProfile = useCallback(() => { if (!profileForm.name.trim() || !profileForm.username.trim()) { alert('Name & Username required'); return } const np = { ...profileForm, username:profileForm.username.toLowerCase().replace(/[^a-z0-9_]/g,''), updatedAt:new Date().toISOString() }; setProfile(np); setEditingProfile(false); speakText(`Updated, ${np.name}!`) }, [profileForm, speakText])
  const openEditProfile = useCallback(() => { setProfileForm({ name:profile?.name||'', username:profile?.username||'', avatar:profile?.avatar||'', bio:profile?.bio||'' }); setEditingProfile(true); setSidebarOpen(false) }, [profile])
  const resetAllData = useCallback(() => { if (!confirm('Reset ALL data?')) return; if (userMode === 'loggedin') saveUserData(email,pin,{ profile:null, chats:[{id:'chat-'+Date.now(),title:'Chat 1',messages:[],createdAt:Date.now()}], commandHistory:[], backgroundImage:null, theme, settings }); setProfile(null); setChats([{ id:'default-'+Date.now(), title:'Chat 1', messages:[], createdAt:Date.now() }]); setCommandHistory([]); setBackgroundImage(null); setSidebarOpen(false) }, [userMode, email, pin, theme, settings])
  const exportChat = useCallback(() => { const d = { chats, commandHistory, profile, exportedAt:new Date().toISOString() }; const b = new Blob([JSON.stringify(d,null,2)], { type:'application/json' }); const u = URL.createObjectURL(b); const a = document.createElement('a'); a.href = u; a.download = `cypher4x_${Date.now()}.json`; a.click(); URL.revokeObjectURL(u) }, [chats, commandHistory, profile])

  const dash = getDashboardInfo()

  // ==================== RENDER ====================
  if (showIntro) return (
    <div style={styles.introContainer}><div style={styles.introBackground} /><div style={styles.introContent}>
      {introStep === 0 && <h1 style={{...styles.introText}}>INITIALIZING SYSTEM</h1>}
      {introStep === 1 && <h1 style={{...styles.introText}}>HACKERS HUB <span style={{color:theme.primary}}>PRESENTS</span></h1>}
      {introStep === 2 && <h1 style={{...styles.introText, color:theme.primary}}>CYPHER4X</h1>}
    </div></div>
  )
  if (isEnteringAI) return (
    <div style={styles.enterOverlay}><div style={styles.enterBackground} /><div style={styles.enterContent}>
      <h1 style={{ ...styles.enterTitle, color:theme.primary }}>CYPHER4X</h1>
      <p style={styles.enterSubtitleSmall}>{VERSION_FULL}</p>
      <div style={styles.enterUpdatingWrap}><div style={{...styles.enterUpdatingLabel, color:theme.primary}}>Updating</div><div style={{...styles.enterUpdatingDots, color:theme.primary}}><span>.</span><span>.</span><span>.</span></div></div>
      <div style={styles.enterProgressBarWrap}><div style={{ ...styles.enterProgressBar, width:`${enterProgress}%`, backgroundColor:theme.primary }} /></div>
      <span style={{...styles.enterPercent, color:theme.primary}}>{Math.round(enterProgress)}%</span>
      <p style={styles.enterMessageSmall}>{enterMessage}</p>
    </div></div>
  )
  if (showGuestLimit) return (
    <div style={{ ...styles.guestLimitOverlay, background:theme.secondary }}><div style={{ ...styles.guestLimitCard, borderColor:theme.primary }}>
      <h2 style={{ ...styles.guestLimitTitle, color:theme.primary }}>Free Trial Limit Reached</h2>
      <p style={styles.guestLimitText}>Login to continue.</p>
      <div style={styles.guestLimitButtons}>
        <button onClick={() => { setShowGuestLimit(false); setShowLogin(true); setShowAuthModal(true) }} style={{ ...styles.guestLimitLoginBtn, backgroundColor:theme.primary }}>Login</button>
        <button onClick={() => { setShowGuestLimit(false); setShowLogin(false); setShowAuthModal(true) }} style={styles.guestLimitSignupBtn}>Sign Up</button>
      </div>
    </div></div>
  )
  if (showAuthModal) return (
    <div style={styles.authModalOverlay}><div style={{ ...styles.authModalCard, borderColor:theme.primary }}>
      <button onClick={() => setShowAuthModal(false)} style={styles.authModalClose}>✕</button>
      <h1 style={{ ...styles.authTitle, color:theme.primary }}>CYPHER4X</h1>
      <p style={{ ...styles.authSubtitle, color:theme.primary }}>{showLogin ? 'Login' : 'Sign Up'}</p>
      <div style={{ ...styles.authError, color:theme.primary }}>{authError}</div>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={styles.authInput} />
      <input type="password" placeholder="4-digit PIN" value={pin} onChange={e => setPin(e.target.value.replace(/\D/g,'').slice(0,4))} style={styles.authInput} maxLength="4" />
      <button onClick={handleAuthSubmit} style={{ ...styles.authBtn, backgroundColor:theme.primary }}>{showLogin ? 'Login' : 'Create Account'}</button>
      <div style={styles.authSwitch}><span>{showLogin ? 'No account?' : 'Have account?'}</span><button onClick={() => { setShowLogin(!showLogin); setAuthError('') }} style={{ ...styles.authSwitchBtn, color:theme.primary }}>{showLogin ? 'Sign Up' : 'Login'}</button></div>
    </div></div>
  )

  // ==================== PRACTICAL WORKSPACE ====================
  if (showPracticalWorkspace) return (
    <div style={{...styles.practicalContainer, backgroundColor:practicalBg, color:practicalBg === '#ffffff' ? '#000' : '#fff'}}>
      <div style={{...styles.practicalHeader, borderBottomColor:practicalBg === '#ffffff' ? '#ddd' : '#333'}}>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <button onClick={() => setShowPracticalWorkspace(false)} style={{...styles.practicalExitBtn, borderColor:'#00ff41', color:'#00ff41'}}><Icon name="arrowLeft" size={20} color="#00ff41" /> EXIT</button>
          <h1 style={{...styles.practicalTitle, color:'#00ff41'}}>PRACTICAL WORKSPACE</h1>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:8}}>
          <button onClick={() => { if(confirm('Clear all workspace messages?')) { setPracticalLogs([{ id:Date.now(), role:'ai', type:'text', content:'Workspace cleared. What shall I build?' }]); setPracticalReplyingTo(null) } }} style={{...styles.practicalExportBtn, borderColor:'#ff6688', color:'#ff6688'}}><Icon name="trash" size={14} color="#ff6688" /> CLEAR</button>
          <button onClick={() => setPracticalBg(practicalBg === '#ffffff' ? '#000000' : '#ffffff')} style={{...styles.practicalExportBtn, borderColor:practicalBg === '#ffffff' ? '#000' : '#fff', color:practicalBg === '#ffffff' ? '#000' : '#fff'}}><Icon name="refresh" size={16} color={practicalBg === '#ffffff' ? '#000' : '#fff'} /> BG</button>
        </div>
      </div>

      <div style={styles.practicalCanvas}>
        {practicalLogs.map(log => {
          const isUser = log.role === 'user'
          const bubbleBg = isUser ? '#00ff41' : (practicalBg === '#ffffff' ? '#f0f0f0' : '#1a1a1a')
          const bubbleColor = isUser ? '#000' : (practicalBg === '#ffffff' ? '#000' : '#fff')
          return (
            <div key={log.id} style={{display:'flex', flexDirection:'column', alignSelf:isUser ? 'flex-end' : 'flex-start', maxWidth:'92%'}}>
              {log.replyToPreview && (
                <div style={{padding:'6px 12px', backgroundColor:isUser ? 'rgba(0,255,65,0.15)' : 'rgba(255,255,255,0.06)', borderLeft:'3px solid #00ff41', borderRadius:'8px 8px 0 0', fontSize:11, fontStyle:'italic', color:practicalBg === '#ffffff' ? '#555' : '#aaa', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>↳ {log.replyToPreview}...</div>
              )}
              <div style={{...styles.practicalMsg, backgroundColor:bubbleBg, color:bubbleColor}}>
                {log.type === 'text' && <p style={{margin:0, whiteSpace:'pre-wrap'}}>{log.content}</p>}
                {log.type === 'artifact' && log.content && (
                  <div style={{width:'100%'}}>
                    {log.content.type === 'image' ? (
                      <img src={log.content.url} alt={log.content.title} style={{maxWidth:'100%', maxHeight:'60vh', borderRadius:8, display:'block'}} onError={e => { e.target.style.display = 'none' }} />
                    ) : log.content.type === 'code' ? (
                      <>
                        <div style={{marginBottom:8, fontSize:12, color:bubbleColor, opacity:0.7}}>📄 {log.content.title} · <span style={{color:'#00ff41'}}>{log.content.lang}</span></div>
                        <pre style={{margin:0, fontFamily:'monospace', fontSize:12, whiteSpace:'pre-wrap', color:bubbleColor, background:'rgba(0,0,0,0.2)', padding:12, borderRadius:6, maxHeight:400, overflow:'auto'}}>{log.content.code}</pre>
                      </>
                    ) : (
                      <>
                        <div style={styles.practicalPreviewHeader}><span style={{color:'#00ff41', fontWeight:'bold', fontSize:12}}>🎨 {log.content.title}</span><span style={{color:bubbleColor, opacity:0.6, fontSize:10, letterSpacing:1}}>APP</span></div>
                        <iframe srcDoc={log.content.html} style={styles.practicalPreviewIframe} sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-popups" title={log.content.title} />
                      </>
                    )}
                  </div>
                )}
              </div>

              <div style={{display:'flex', gap:6, marginTop:4, justifyContent:isUser ? 'flex-end' : 'flex-start', flexWrap:'wrap'}}>
                <button onClick={() => handlePracticalReply(log)} title="Reply to edit" style={styles.practicalActionBtn}><Icon name="reply" size={12} color="#00ff41" /></button>
                {isUser && <button onClick={() => handlePracticalEdit(log)} title="Edit" style={styles.practicalActionBtn}><Icon name="edit" size={12} color="#00c8ff" /></button>}
                <button onClick={() => handlePracticalCopy(log)} title="Copy" style={styles.practicalActionBtn}><Icon name="copy" size={12} color="#ffcc00" /></button>
                <button onClick={() => handlePracticalDelete(log.id)} title="Delete" style={styles.practicalActionBtn}><Icon name="trash" size={12} color="#ff6688" /></button>
                {log.type === 'artifact' && log.content && (<>
                  <button onClick={() => handleArtifactDownload(log.content)} title="Download" style={styles.practicalActionBtnText}><Icon name="download" size={11} color="#00ff41" /> <span>Download</span></button>
                  {log.content.type !== 'image' && log.content.html && (
                    <button onClick={() => openCodeEditor(log)} title="Edit source code" style={styles.practicalActionBtnText}><Icon name="edit" size={11} color="#00c8ff" /> <span>Edit Code</span></button>
                  )}
                  {log.content.type !== 'image' && (
                    <button onClick={() => openArtifactInTab(log.content)} title="Open in new tab" style={styles.practicalActionBtnText}><Icon name="globe" size={11} color="#ffcc00" /> <span>Open</span></button>
                  )}
                </>)}
              </div>
            </div>
          )
        })}
        {practicalProcessing && (
          <div style={{color:'#00ff41', fontStyle:'italic', display:'flex', alignItems:'center', gap:8, padding:12}}>
            <Icon name="hourglass" size={18} color="#00ff41" /><span>{practicalActionText || 'AI is building...'}</span>
          </div>
        )}
        <div ref={practicalEndRef} />
      </div>

      {practicalReplyingTo && (
        <div style={{display:'flex', alignItems:'center', gap:8, padding:'8px 16px', backgroundColor:practicalBg === '#ffffff' ? '#f5f5f5' : '#1a1a1a', borderTop:'2px solid #00ff41', flexShrink:0}}>
          <Icon name="reply" size={14} color="#00ff41" />
          <div style={{flex:1, overflow:'hidden'}}>
            <div style={{color:'#00ff41', fontSize:10, fontWeight:'bold'}}>REPLYING — describe edits</div>
            <div style={{color:practicalBg === '#ffffff' ? '#333' : '#ddd', fontSize:11, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>"{practicalReplyingTo.preview}..."</div>
          </div>
          <button onClick={() => setPracticalReplyingTo(null)} style={{background:'none', border:'none', cursor:'pointer', padding:4}}><Icon name="x" size={16} color="#888" /></button>
        </div>
      )}

      <form onSubmit={handlePracticalSubmit} style={{...styles.practicalInputRow, backgroundColor:practicalBg === '#ffffff' ? '#fff' : '#0a0a0a', borderTopColor:practicalBg === '#ffffff' ? '#ddd' : '#333'}}>
        <input type="text" value={practicalInput} onChange={e => setPracticalInput(e.target.value)} placeholder={practicalReplyingTo ? "Describe changes: 'dark mode', 'color to blue', 'bigger font'..." : "Describe ANY app, tool, or image — be specific!"} style={{...styles.practicalInput, color:practicalBg === '#ffffff' ? '#000' : '#fff', borderColor:practicalBg === '#ffffff' ? '#ccc' : '#444'}} disabled={practicalProcessing} />
        <button type="button" onClick={handlePracticalVoice} style={{...styles.practicalMicBtn, backgroundColor:isRecording ? '#00ff41' : 'transparent', padding:8}}><Icon name="mic" size={24} color={practicalBg === '#ffffff' ? '#000' : '#fff'} /></button>
        <button type="submit" style={{...styles.practicalSendBtn, backgroundColor:'#00ff41', width:44, height:44, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', border:'none', cursor:'pointer', flexShrink:0}} disabled={practicalProcessing}><Icon name="send" size={18} color="#000" /></button>
      </form>

      {codeEditorArtifact && (
        <div style={{position:'fixed', inset:0, backgroundColor:'rgba(0,0,0,0.92)', zIndex:100001, display:'flex', flexDirection:'column', padding:16}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderBottom:'1px solid #333', marginBottom:12}}>
            <div style={{display:'flex', alignItems:'center', gap:10}}>
              <Icon name="edit" size={20} color="#00ff41" />
              <span style={{color:'#00ff41', fontFamily:'monospace', fontSize:14, fontWeight:'bold'}}>EDIT SOURCE · {codeEditorArtifact.artifact.title}</span>
            </div>
            <button onClick={() => setCodeEditorArtifact(null)} style={{background:'none', border:'1px solid #333', color:'#fff', padding:'6px 14px', borderRadius:6, cursor:'pointer'}}>Close</button>
          </div>
          <textarea value={codeEditorValue} onChange={e => setCodeEditorValue(e.target.value)} spellCheck={false} style={{flex:1, width:'100%', minHeight:0, padding:16, background:'#000', color:'#00ff41', border:'1px solid #333', borderRadius:8, fontFamily:"'Courier New', monospace", fontSize:13, outline:'none', resize:'none', lineHeight:1.5}} />
          <div style={{display:'flex', gap:10, justifyContent:'flex-end', marginTop:12}}>
            <button onClick={() => setCodeEditorArtifact(null)} style={{padding:'12px 24px', background:'#333', color:'#fff', border:'none', borderRadius:8, cursor:'pointer', fontWeight:'bold'}}>Cancel</button>
            <button onClick={saveCodeEdit} style={{padding:'12px 24px', background:'#00ff41', color:'#000', border:'none', borderRadius:8, cursor:'pointer', fontWeight:'bold'}}>💾 Save & Rebuild</button>
          </div>
        </div>
      )}
    </div>
  )

  // ==================== WORKSPACE ====================
  if (showWorkspace) return (
    <div style={styles.workspaceContainer}>
      <div style={styles.workspaceHeader}>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <button onClick={() => setShowWorkspace(false)} style={{...styles.workspaceExitBtn, borderColor:theme.primary}}><Icon name="arrowLeft" size={20} color={theme.primary} /> EXIT</button>
          <h1 style={{...styles.workspaceTitle, color:theme.primary}}>CYPHER4X WORKSPACE</h1>
        </div>
        <RedBall isSpeaking={isAISpeaking} theme={theme} size={40} />
      </div>
      <div style={styles.workspaceBody}>
        <div style={styles.workspaceLeftPanel}>
          <div style={styles.workspacePanelHeader}><Icon name="terminal" size={16} color={theme.primary} /> LOGS</div>
          <div style={styles.workspaceLogList}>
            {workspaceLogs.map((log, i) => <div key={i} style={{marginBottom:6, fontSize:11, fontFamily:'monospace'}}><span style={{color:log.type === 'user' ? theme.primary : log.type === 'ai' ? '#4f8' : '#888'}}>[{log.type.toUpperCase()}]</span> <span style={{color:'#ccc'}}>{log.text}</span></div>)}
            <div ref={workspaceEndRef} />
          </div>
        </div>
        <div style={styles.workspaceRightPanel}>
          <form onSubmit={handleWorkspaceSubmit} style={styles.workspaceInputRow}>
            <input type="text" value={workspaceCommand} onChange={e => setWorkspaceCommand(e.target.value)} placeholder="Command..." style={styles.workspaceInput} disabled={workspaceProcessing} />
            <button type="button" onClick={handleWorkspaceVoice} style={{...styles.workspaceMicBtn, backgroundColor:isRecording ? theme.primary : '#1a1a1a'}}><Icon name="mic" size={18} color="#fff" /></button>
            <button type="submit" style={{...styles.workspaceSendBtn, backgroundColor:theme.primary, width:40, height:40, borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center'}} disabled={workspaceProcessing}><Icon name="send" size={18} color="#fff" /></button>
          </form>
        </div>
      </div>
    </div>
  )

  // ==================== SETTINGS ====================
  if (showSettings) return (
    <div style={styles.settingsFullscreen}>
      <style>{`.tsw{position:relative;display:inline-block;width:46px;height:24px;flex-shrink:0}.tsw input{opacity:0;width:0;height:0}.tsl{position:absolute;cursor:pointer;inset:0;background:#333;transition:.3s;border-radius:24px}.tsl:before{content:"";position:absolute;height:18px;width:18px;left:3px;bottom:3px;background:#fff;transition:.3s;border-radius:50%}.tsw input:checked+.tsl{background:${theme.primary}}.tsw input:checked+.tsl:before{transform:translateX(22px)}`}</style>
      <div style={styles.settingsHeaderFull}><h1 style={{ ...styles.settingsTitleFull, color:theme.primary }}>Settings · {VERSION}</h1><button onClick={() => setShowSettings(false)} style={styles.settingsCloseFull}><Icon name="close" size={28} color="#fff" /></button></div>
      <div style={styles.settingsBodyFull}>
        <div style={styles.settingsSection}><h3 style={{ ...styles.settingsSectionTitle, color:theme.primary }}>Location</h3>
          <div style={styles.settingItem}><span>Enable Location (Weather)</span><label className="tsw"><input type="checkbox" checked={settings.locationEnabled} onChange={e => setSettings({ ...settings, locationEnabled:e.target.checked })} /><span className="tsl"></span></label></div></div>
        <div style={styles.settingsSection}><h3 style={{ ...styles.settingsSectionTitle, color:theme.primary }}>Theme</h3>
          <div style={styles.settingItem}><span>Primary</span><input type="color" value={theme.primary} onChange={e => setTheme({ ...theme, primary:e.target.value })} style={styles.colorPicker} /></div>
          <div style={styles.settingItem}><span>Secondary</span><input type="color" value={theme.secondary} onChange={e => setTheme({ ...theme, secondary:e.target.value })} style={styles.colorPicker} /></div>
          <div style={styles.settingItem}><span>Ball</span><input type="color" value={theme.ballColor} onChange={e => setTheme({ ...theme, ballColor:e.target.value, ballColorLight:lightenColor(e.target.value), ballColorDark:darkenColor(e.target.value) })} style={styles.colorPicker} /></div></div>
        <div style={styles.settingsSection}><h3 style={{ ...styles.settingsSectionTitle, color:theme.primary }}>General</h3>
          <div style={styles.settingItem}><span>Auto-start Voice</span><label className="tsw"><input type="checkbox" checked={settings.autoStartVoice} onChange={e => setSettings({ ...settings, autoStartVoice:e.target.checked })} /><span className="tsl"></span></label></div>
          <div style={styles.settingItem}><span>Read Aloud</span><label className="tsw"><input type="checkbox" checked={settings.readAloud} onChange={e => setSettings({ ...settings, readAloud:e.target.checked })} /><span className="tsl"></span></label></div>
          <div style={styles.settingItem}><span>Safe Links</span><label className="tsw"><input type="checkbox" checked={settings.safeLinks} onChange={e => setSettings({ ...settings, safeLinks:e.target.checked })} /><span className="tsl"></span></label></div>
          <div style={styles.settingItem}><span>🔒 Restrict Tools</span><label className="tsw"><input type="checkbox" checked={settings.restrictTools} onChange={e => setSettings({ ...settings, restrictTools:e.target.checked })} /><span className="tsl"></span></label></div></div>
        <div style={styles.settingsSection}><h3 style={{ ...styles.settingsSectionTitle, color:theme.primary }}>Interface</h3>
          <div style={styles.settingItem}><span>Haptic</span><label className="tsw"><input type="checkbox" checked={settings.haptic} onChange={e => setSettings({ ...settings, haptic:e.target.checked })} /><span className="tsl"></span></label></div>
          <div style={styles.settingItem}><span>Sound Effects</span><label className="tsw"><input type="checkbox" checked={settings.soundFx} onChange={e => setSettings({ ...settings, soundFx:e.target.checked })} /><span className="tsl"></span></label></div></div>
      </div>
      <button onClick={() => setShowSettings(false)} style={{ ...styles.settingsDoneFull, backgroundColor:theme.primary }}>Done</button>
    </div>
  )

  // Music/video/cyber panels (compact)
  if (showMusicPanel) return (
    <div style={styles.settingsFullscreen}>
      <div style={styles.settingsHeaderFull}><h1 style={{ ...styles.settingsTitleFull, color:theme.primary }}>🎵 Music</h1><button onClick={() => setShowMusicPanel(false)} style={styles.settingsCloseFull}><Icon name="close" size={28} color="#fff" /></button></div>
      <div style={styles.settingsBodyFull}>
        <div style={styles.settingsSection}><h3 style={{ ...styles.settingsSectionTitle, color:theme.primary }}>Describe</h3><input value={musicDesc} onChange={e => setMusicDesc(e.target.value)} placeholder="romantic piano, lo-fi..." style={styles.settingsSelect} /></div>
        <div style={styles.settingsSection}><h3 style={{ ...styles.settingsSectionTitle, color:theme.primary }}>Duration</h3><input type="range" min="15" max="180" step="5" value={musicDuration} onChange={e => setMusicDuration(parseInt(e.target.value))} style={{ width:'100%', accentColor:theme.primary }} /></div>
        {musicInfo && <pre style={{ color:'#4f8', padding:12, background:'#0a0a0a', borderRadius:8, border:'1px solid #333', whiteSpace:'pre-wrap' }}>{musicInfo}</pre>}
      </div>
      <button onClick={handleGenerateMusic} disabled={musicGenerating} style={{ ...styles.settingsDoneFull, backgroundColor:theme.primary }}>{musicGenerating ? 'Submitting...' : 'Generate Music'}</button>
    </div>
  )
  if (showVideoPanel) return (
    <div style={styles.settingsFullscreen}>
      <div style={styles.settingsHeaderFull}><h1 style={{ ...styles.settingsTitleFull, color:theme.primary }}>🎬 Video</h1><button onClick={() => setShowVideoPanel(false)} style={styles.settingsCloseFull}><Icon name="close" size={28} color="#fff" /></button></div>
      <div style={styles.settingsBodyFull}>
        <div style={styles.settingsSection}><h3 style={{ ...styles.settingsSectionTitle, color:theme.primary }}>Describe</h3><input value={videoDesc} onChange={e => setVideoDesc(e.target.value)} placeholder="anime sakura, cyber..." style={styles.settingsSelect} /></div>
        <div style={styles.settingsSection}><h3 style={{ ...styles.settingsSectionTitle, color:theme.primary }}>Duration</h3><input type="range" min="3" max="30" step="1" value={videoDuration} onChange={e => setVideoDuration(parseInt(e.target.value))} style={{ width:'100%', accentColor:theme.primary }} /></div>
        <canvas ref={canvasRef} width={480} height={320} style={{ width:'100%', borderRadius:12, background:'#000', marginTop:8, display:videoRecording || videoResultUrl ? 'block' : 'none' }} />
        {videoInfo && <pre style={{ color:'#4f8', padding:12, background:'#0a0a0a', borderRadius:8, border:'1px solid #333', whiteSpace:'pre-wrap' }}>{videoInfo}</pre>}
        {videoResultUrl && <video src={videoResultUrl} controls style={{ width:'100%', borderRadius:12, marginTop:12 }} />}
      </div>
      {videoRecording ? <button onClick={handleStopLocalVideo} style={{ ...styles.settingsDoneFull, backgroundColor:theme.primary }}>Stop & Save</button> : <button onClick={handleGenerateVideo} disabled={videoGenerating} style={{ ...styles.settingsDoneFull, backgroundColor:theme.primary }}>{videoGenerating ? 'Generating...' : 'Generate Video'}</button>}
    </div>
  )
  if (showCyberLab) {
    const tools = [{id:'passcheck',label:'Password'},{id:'hash',label:'Hash'},{id:'base64',label:'B64 Enc'},{id:'unbase64',label:'B64 Dec'}]
    return (
      <div style={styles.settingsFullscreen}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px', backgroundColor:'#000', borderBottom:'1px solid #1a1a1a' }}>
          <button onClick={() => setShowCyberLab(false)} style={{ background:'none', border:'none', color:'#fff', display:'flex', alignItems:'center', gap:6, cursor:'pointer' }}><Icon name="arrowLeft" size={20} color="#fff" /> exit</button>
          <span style={{ color:theme.primary, fontSize:12, fontFamily:'monospace' }}>csh@cypher4x:~$</span>
          <button onClick={() => setCyberLines([{ type:'info', text:`${VERSION_FULL}` }])} style={{ background:'none', border:'1px solid #333', color:'#888', padding:'3px 10px', borderRadius:4, cursor:'pointer', fontSize:11 }}>clear</button>
        </div>
        <div style={{ display:'flex', padding:'8px 16px', gap:8, background:'#111', borderBottom:'1px solid #333' }}>
          <button onClick={() => setCyberTab('terminal')} style={{ flex:1, padding:10, background:cyberTab === 'terminal' ? theme.primary : '#1a1a1a', color:'#fff', border:'none', borderRadius:6, fontWeight:'bold', cursor:'pointer', fontSize:12 }}>Terminal</button>
          <button onClick={() => setCyberTab('tools')} style={{ flex:1, padding:10, background:cyberTab === 'tools' ? theme.primary : '#1a1a1a', color:'#fff', border:'none', borderRadius:6, fontWeight:'bold', cursor:'pointer', fontSize:12 }}>Tools</button>
        </div>
        {cyberTab === 'terminal' && (<>
          <div style={{ flex:1, overflowY:'auto', padding:16, background:'#000', fontFamily:'monospace', fontSize:13 }}>
            {cyberLines.map((l, i) => <pre key={i} style={{ margin:'2px 0', whiteSpace:'pre-wrap', color:l.type === 'cmd' ? '#4f8' : l.type === 'info' ? theme.primary : '#ddd' }}>{l.text}</pre>)}
            <div ref={cyberEndRef} />
          </div>
          <form onSubmit={handleCyberSubmit} style={{ display:'flex', gap:8, padding:12, background:'#111', borderTop:'1px solid #333' }}>
            <span style={{ color:'#4f8', fontWeight:'bold', alignSelf:'center' }}>~$</span>
            <input value={cyberInput} onChange={e => setCyberInput(e.target.value)} placeholder='Type "help"' style={{ flex:1, padding:10, background:'#000', border:'1px solid #333', color:'#fff', borderRadius:4, fontFamily:'monospace', outline:'none' }} />
            <button type="submit" style={{ padding:'8px 14px', background:theme.primary, border:'none', borderRadius:4, color:'#fff', cursor:'pointer' }}><Icon name="send" size={16} color="#fff" /></button>
          </form>
        </>)}
        {cyberTab === 'tools' && (
          <div style={{ flex:1, overflowY:'auto', padding:16 }}>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:16 }}>
              {tools.map(t => <button key={t.id} onClick={() => { setCyberTool(t.id); setCyberToolOutput('') }} style={{ padding:'6px 12px', borderRadius:20, border:cyberTool === t.id ? `1px solid ${theme.primary}` : '1px solid #333', background:cyberTool === t.id ? hexA(theme.primary, 0.15) : '#1a1a1a', color:'#fff', fontSize:12, cursor:'pointer' }}>{t.label}</button>)}
            </div>
            <input value={cyberToolInput} onChange={e => setCyberToolInput(e.target.value)} placeholder="Input..." style={styles.settingsSelect} />
            <button onClick={runCyberTool} style={{ ...styles.uploadBtn, backgroundColor:theme.primary, marginTop:12, width:'100%', justifyContent:'center' }}><Icon name="zap" size={16} color="#fff" /><span>Run</span></button>
            {cyberToolOutput && <pre style={{ marginTop:16, background:'#000', border:'1px solid #333', borderRadius:8, padding:12, color:'#4f8', fontFamily:'monospace', fontSize:12, whiteSpace:'pre-wrap', wordBreak:'break-word' }}>{cyberToolOutput}</pre>}
          </div>
        )}
      </div>
    )
  }
  if (isFullscreenCall) return (
    <div style={styles.fullscreenCallOverlay}>
      <button onClick={toggleFullscreenCall} style={styles.returnBtn}><Icon name="arrowLeft" size={28} color="#fff" /> Return</button>
      <div style={styles.fullscreenCallContentNoBall}>
        <div style={styles.fullscreenListeningStatus}>{isListening ? <div style={{...styles.fullscreenListeningDot, backgroundColor:theme.primary}} /> : isAISpeaking ? <div style={{...styles.fullscreenSpeakingDot, backgroundColor:theme.primary}} /> : null}<span style={styles.fullscreenStatusText}>{isListening ? 'Listening...' : isAISpeaking ? 'Speaking...' : 'Tap mic'}</span></div>
        {interimTranscript && <div style={styles.fullscreenTranscript}>{interimTranscript}</div>}
        <button onClick={interruptAndListen} style={{...styles.fullscreenMicBtn, backgroundColor:theme.primary, borderColor:theme.primary}} disabled={isProcessing}><Icon name="mic" size={48} color="#fff" /></button>
      </div>
    </div>
  )
  if (showRotateOverlay) return (
    <div style={styles.rotateOverlay}><div style={{...styles.rotateCard, borderColor:theme.primary}}>
      <Icon name="rotate" size={48} color={theme.primary} />
      <div style={styles.rotateText}>Please rotate your device.</div>
      <button onClick={() => setShowRotateOverlay(false)} style={{...styles.rotateOkBtn, backgroundColor:theme.primary}}>OK</button>
    </div></div>
  )

  if (showChatOverview) return (
    <div style={{...styles.chatOverviewContainer, backgroundColor:theme.secondary, backgroundImage:backgroundImage ? `url(${backgroundImage})` : 'none', backgroundSize:'cover', backgroundPosition:'center'}}>
      <div style={{...styles.chatOverviewHeader, justifyContent:'space-between', borderBottomColor:theme.primary}}>
        <button onClick={() => setShowChatOverview(false)} style={styles.chatOverviewBackBtn}><Icon name="arrowLeft" size={24} color="#fff" /> Back</button>
        <div style={{display:'flex', alignItems:'center', gap:12}}>
          <button onClick={() => setChatOverviewVoiceEnabled(!chatOverviewVoiceEnabled)} style={styles.chatOverviewVoiceToggle}><Icon name={chatOverviewVoiceEnabled ? 'volume2' : 'volumeX'} size={22} color="#fff" /></button>
          <button onClick={() => setShowChatMenu(!showChatMenu)} style={styles.chatOverviewVoiceToggle}><Icon name="menu" size={22} color="#fff" /></button>
        </div>
      </div>
      {showChatMenu && (
        <div style={styles.chatMenuDropdown}>
          <div style={{padding:10, borderBottom:'1px solid #333', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <span style={{color:theme.primary, fontSize:12, fontWeight:'bold'}}>CHATS</span>
            <button onClick={createNewChat} style={{background:theme.primary, border:'none', borderRadius:4, padding:'4px 8px', color:'#fff', fontSize:10, cursor:'pointer'}}>+ NEW</button>
          </div>
          <div style={{maxHeight:300, overflowY:'auto'}}>
            {chats.map(c => (
              <div key={c.id} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 12px', borderBottom:'1px solid #1a1a1a', backgroundColor:activeChatId === c.id ? hexA(theme.primary, 0.1) : 'transparent'}}>
                <span onClick={() => switchChat(c.id)} style={{color:activeChatId === c.id ? theme.primary : '#ccc', fontSize:13, cursor:'pointer', flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{c.title}</span>
                <div style={{display:'flex', gap:6}}>
                  <button onClick={() => renameChat(c.id)} style={{background:'none', border:'none', cursor:'pointer', padding:4}}><Icon name="edit" size={14} color="#888"/></button>
                  <button onClick={() => deleteChat(c.id)} style={{background:'none', border:'none', cursor:'pointer', padding:4}}><Icon name="trash" size={14} color="#888"/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={styles.chatOverviewMessages}>
        {conversation.length === 0 && <div style={styles.chatOverviewEmpty}><p>Start a conversation!</p></div>}
        {conversation.map(msg => (
          <div key={msg.id} style={{ ...styles.chatOverviewMsg, alignSelf:msg.role === 'user' ? 'flex-end' : 'flex-start', backgroundColor:msg.role === 'user' ? theme.primary : 'rgba(26,26,26,0.9)' }}>
            {msg.replyToText && <div style={{...styles.replyQuote, borderLeftColor:theme.primary}}><Icon name="reply" size={12} color={theme.primary} /><span style={{...styles.replyQuoteText, color:theme.primary}}>{msg.replyToText}...</span></div>}
            {renderMessageContent(msg)}
            {settings.showTimestamps && <span style={styles.chatOverviewMsgTime}>{fmtT(msg.time)}</span>}
            <div style={styles.msgActions}>
              <button onClick={() => handleReply(msg)} style={styles.msgActionBtn}><Icon name="reply" size={14} color="#888" /></button>
              {msg.role === 'user' && <button onClick={() => handleEditMessage(msg.id)} style={styles.msgActionBtn}><Icon name="edit" size={14} color="#888" /></button>}
              <button onClick={() => handleDeleteMessage(msg.id)} style={styles.msgActionBtn}><Icon name="trash" size={14} color="#888" /></button>
              <button onClick={() => handleShareMessage(msg)} style={styles.msgActionBtn}><Icon name="copy" size={14} color="#888" /></button>
            </div>
          </div>
        ))}
        {isProcessing && settings.typingIndicator && <div style={{ ...styles.chatOverviewMsg, alignSelf:'flex-start', backgroundColor:'rgba(26,26,26,0.9)' }}><span style={styles.chatOverviewMsgText}>● ● ●</span></div>}
        <div ref={chatEndRef} />
      </div>
      {replyingTo && <div style={{...styles.replyBar, borderTopColor:theme.primary}}><div style={{ flex:1, overflow:'hidden' }}><div style={{ color:theme.primary, fontSize:11, fontWeight:'bold' }}>Replying to:</div><div style={{ color:'#ddd', fontSize:12, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{replyingTo.content.slice(0,60)}...</div></div><button onClick={() => setReplyingTo(null)} style={{ background:'none', border:'none', color:'#888', cursor:'pointer' }}><Icon name="close" size={18} color="#888" /></button></div>}
      <div style={styles.chatOverviewInputRowRaised}>
        <input type="text" value={chatOverviewInput} onChange={e => setChatOverviewInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendOverviewText()} placeholder={pendingCode ? 'Answer...' : replyingTo ? 'Reply...' : 'Type...'} style={styles.chatOverviewInput} disabled={isProcessing} />
        <div style={styles.voiceControls}>
          {!isRecordingVoice && !voicePaused ? <button onClick={startVoiceRecording} style={styles.chatOverviewMicBtn}><Icon name="mic" size={20} color="#fff" /></button> : (<>{voicePaused ? <button onClick={resumeVoiceRecording} style={styles.chatOverviewMicBtn}><Icon name="play" size={20} color="#4f8" /></button> : <button onClick={pauseVoiceRecording} style={styles.chatOverviewMicBtn}><Icon name="pause" size={20} color={theme.primary} /></button>}<button onClick={deleteVoiceRecording} style={styles.chatOverviewMicBtn}><Icon name="trash" size={20} color={theme.primary} /></button><button onClick={sendVoiceRecording} style={{...styles.chatOverviewSendBtn, backgroundColor:theme.primary}} disabled={isProcessing || !voiceTranscript.trim()}><Icon name="send" size={20} color="#fff" /></button></>)}
        </div>
        <button onClick={sendOverviewText} style={{...styles.chatOverviewSendBtn, backgroundColor:theme.primary}} disabled={isProcessing}><Icon name="send" size={20} color="#fff" /></button>
      </div>
      {voiceTranscript && !chatOverviewListening && <div style={styles.voiceTranscriptPreview}>"{voiceTranscript}"</div>}
    </div>
  )

  if (editingProfile) return (
    <div style={styles.profileContainer}><div style={{...styles.profileCard, borderColor:theme.primary}}>
      <h1 style={{...styles.profileTitle, color:theme.primary}}>EDIT PROFILE</h1>
      <div style={styles.avatarUploadArea} onClick={() => fileInputRef.current?.click()}>{profileForm.avatar ? <img src={profileForm.avatar} alt="" style={styles.avatarPreview} /> : <span style={{...styles.avatarIcon, color:theme.primary}}><Icon name="camera" size={32} color={theme.primary} /><br />Tap to select</span>}</div>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} style={{ display:'none' }} />
      <div style={styles.inputGroup}><label style={{...styles.label, color:theme.primary}}>Name *</label><input type="text" value={profileForm.name} onChange={e => setProfileForm(p => ({ ...p, name:e.target.value }))} style={{...styles.textInput, borderColor:theme.primary}} /></div>
      <div style={styles.inputGroup}><label style={{...styles.label, color:theme.primary}}>Username *</label><input type="text" value={profileForm.username} onChange={e => setProfileForm(p => ({ ...p, username:e.target.value.toLowerCase().replace(/[^a-z0-9_]/g,'') }))} style={{...styles.textInput, borderColor:theme.primary}} /></div>
      <div style={styles.inputGroup}><label style={{...styles.label, color:theme.primary}}>Bio</label><textarea value={profileForm.bio} onChange={e => setProfileForm(p => ({ ...p, bio:e.target.value }))} style={{...styles.bioInput, borderColor:theme.primary}} /></div>
      <div style={styles.profileBtnRow}><button onClick={() => setEditingProfile(false)} style={styles.cancelBtn}>Cancel</button><button onClick={saveProfile} style={{...styles.createBtn, backgroundColor:theme.primary}}>SAVE</button></div>
    </div></div>
  )

  // ANDROID VIEW
  if (viewMode === 'android') return (
    <div style={{ ...styles.appAndroid, backgroundColor:theme.secondary }}>
      {sidebarOpen && (<>
        <div style={styles.sidebarOverlay} onClick={() => setSidebarOpen(false)} />
        <div style={styles.sidebar}>
          <div style={styles.sidebarHeader}><h2 style={{...styles.sidebarTitle, color:theme.primary}}><Icon name="settings" size={20} color={theme.primary} /> CONTROL PANEL</h2><button onClick={() => setSidebarOpen(false)} style={styles.closeBtn}><Icon name="close" size={20} color="#888" /></button></div>
          <div style={styles.sidebarSection}><h3 style={{...styles.sectionTitle, color:theme.primary}}><Icon name="calendar" size={16} color={theme.primary} /> DASHBOARD</h3><div style={styles.statsCard}><div style={{fontSize:11, color:'#ccc'}}>{dash.date}</div><div style={{fontSize:11, color:theme.primary, fontWeight:'bold'}}>{dash.time}</div><div style={{fontSize:11, color:'#ccc'}}>{dash.day}</div>{dash.temp && <div style={{fontSize:11, color:theme.primary}}>{dash.temp}</div>}</div></div>
          <div style={styles.sidebarSection}><h3 style={{...styles.sectionTitle, color:theme.primary}}><Icon name="desktop" size={16} color={theme.primary} /> VIEW MODE</h3><div style={styles.settingRow}><span style={styles.settingLabel}>Android</span><button onClick={toggleView} style={styles.toggleBtn}>PC</button></div></div>
          <div style={styles.sidebarSection}><h3 style={{...styles.sectionTitle, color:theme.primary}}><Icon name="sparkles" size={16} color={theme.primary} /> QUICK TOOLS</h3>
            <button onClick={() => { setSidebarOpen(false); setShowPracticalWorkspace(true) }} style={{...styles.toolBtn, backgroundColor:'rgba(0,255,65,0.2)', border:'1px solid #00ff41'}}><Icon name="zap" size={16} color="#00ff41" /> PRACTICAL WORKSPACE</button>
            <button onClick={() => { if (requireLogin('Cyber Lab')) { setSidebarOpen(false); setShowCyberLab(true) } }} style={styles.toolBtn}><Icon name="shield" size={16} color="#fff" /> Cyber Lab</button>
            <button onClick={() => { if (requireLogin('Music')) { setSidebarOpen(false); setShowMusicPanel(true) } }} style={styles.toolBtn}><Icon name="music" size={16} color="#fff" /> Music</button>
            <button onClick={() => { if (requireLogin('Video')) { setSidebarOpen(false); setShowVideoPanel(true) } }} style={styles.toolBtn}><Icon name="video" size={16} color="#fff" /> Video</button>
            <button onClick={() => { setSidebarOpen(false); setShowSettings(true) }} style={styles.toolBtn}><Icon name="cog" size={16} color="#fff" /> Settings</button>
          </div>
          <div style={styles.sidebarSection}><h3 style={{...styles.sectionTitle, color:theme.primary}}><Icon name="chart" size={16} color={theme.primary} /> SYSTEM</h3><div style={styles.statsCard}>
            <div style={styles.statRow}><span style={styles.statLabel}>Uptime</span><span style={{...styles.statValue, color:theme.primary}}>{fmtU(stats.uptime)}</span></div>
            <div style={styles.statRow}><span style={styles.statLabel}>CPU</span><span style={{...styles.statValue, color:theme.primary}}>{stats.cpuUsage}%</span></div>
            <div style={styles.statRow}><span style={styles.statLabel}>RAM</span><span style={{...styles.statValue, color:theme.primary}}>{stats.ramUsage.toFixed(1)} GB</span></div>
          </div></div>
          <div style={styles.sidebarSection}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}><h3 style={{...styles.sectionTitle, color:theme.primary}}><Icon name="chat" size={16} color={theme.primary} /> CHAT ({chats.length})</h3><button onClick={() => { setSidebarOpen(false); setShowChatOverview(true) }} style={styles.overviewBtn}>Overview</button></div>
            <button onClick={createNewChat} style={{ ...styles.toolBtn, marginBottom:8 }}><Icon name="plus" size={16} color="#fff" /> New Chat</button>
            <button onClick={() => { setSidebarOpen(false); startRecording() }} style={styles.toolBtn}><Icon name="mic" size={16} color="#fff" /> Tap to Speak</button>
            <div style={styles.commandActionsPC}><button onClick={clearConversation} style={styles.dashBtnPC}><Icon name="trash" size={14} color="#fff" /> Clear</button><button onClick={exportChat} style={styles.dashBtnPC}><Icon name="save" size={14} color="#fff" /> Export</button></div>
          </div>
          <div style={styles.sidebarSection}><h3 style={{...styles.sectionTitle, color:theme.primary}}><Icon name="user" size={16} color={theme.primary} /> PROFILE</h3>
            <button onClick={openEditProfile} style={styles.sidebarBtn}><Icon name="edit" size={14} color="#fff" /> Edit Profile</button>
            {userMode === 'loggedin' ? <button onClick={handleLogout} style={styles.logoutBtn}><Icon name="close" size={14} color="#fff" /> Logout</button> : <button onClick={() => { setShowAuthModal(true); setShowLogin(true) }} style={styles.sidebarBtn}><Icon name="settings" size={14} color="#fff" /> Login</button>}
          </div>
          <div style={styles.sidebarSection}><button onClick={resetAllData} style={styles.dangerBtn}><Icon name="trash" size={14} color="#fff" /> Reset All</button></div>
          <div style={{ textAlign:'center', color:'#666', fontSize:10, padding:'12px 0', borderTop:'1px solid #1a1a1a', marginTop:12 }}>{VERSION_FULL}</div>
        </div>
      </>)}
      <div style={{ ...styles.mainContentAndroid, backgroundImage:backgroundImage ? `url(${backgroundImage})` : 'none', backgroundSize:'cover' }}>
        <div style={{...styles.backgroundAndroid, background:backgroundImage ? 'none' : `radial-gradient(ellipse at center, ${hexA(theme.primary, 0.06)} 0%, ${theme.secondary} 100%)`}}>
          <RedBall isSpeaking={isAISpeaking} theme={theme} />
          <div style={{...styles.faceTitleAndroid, color:theme.primary}}>CYPHER4X</div>
        </div>
        <div style={{ position:'absolute', top:22, left:'50%', transform:'translateX(-50%)', color:theme.primary, fontSize:10, letterSpacing:2, fontWeight:'bold', zIndex:10 }}>{VERSION}</div>
        <div style={styles.topBarAndroid}>
          <button onClick={() => setSidebarOpen(true)} style={{ ...styles.hamburgerBtn, position:'static' }}><Icon name="menu" size={28} color={theme.primary} /></button>
          <div style={styles.topRightButtons}>
            <button onClick={toggleFullscreenCall} style={{...styles.callButtonTopRight, borderColor:theme.primary, color:theme.primary, padding:'6px 10px'}}><Icon name="phone" size={18} color={isCallActive ? '#4f8' : theme.primary} /><span style={styles.callLabelTop}>{isFullscreenCall ? 'ACTIVE' : 'CALL'}</span></button>
            <button onClick={() => setShowSettings(true)} style={styles.settingsButtonTop}><Icon name="cog" size={20} color="#fff" /></button>
          </div>
        </div>
        <div style={{ position:'absolute', top:70, left:'50%', transform:'translateX(-50%)', display:'flex', gap:12, backgroundColor:'rgba(0,0,0,0.6)', padding:'6px 16px', borderRadius:20, border:`1px solid ${hexA(theme.primary, 0.3)}`, zIndex:10 }}>
          <span style={{ color:theme.primary, fontSize:11, fontWeight:'bold' }}>{dash.date}</span>
          <span style={{ color:'#fff', fontSize:11 }}>{dash.time}</span>
          <span style={{ color:'#ccc', fontSize:11 }}>{dash.day}</span>
          {dash.temp && <span style={{ color:theme.primary, fontSize:11 }}>{dash.temp}</span>}
        </div>
        <div style={styles.listeningContainer}>
          {isListening ? (<><div style={styles.listeningDot} /><span style={styles.listeningText}>Listening...</span>{interimTranscript && <span style={styles.interimText}>"{interimTranscript}"</span>}{interimTranscript && <button onClick={sendInterim} style={{...styles.sendInterimBtn, backgroundColor:theme.primary}} disabled={isProcessing}><Icon name="send" size={16} color="#fff" /><span>Send</span></button>}</>) : isProcessing ? <span style={styles.listeningText}>Processing...</span> : isRecording ? (<><div style={{ ...styles.listeningDot, backgroundColor:theme.primary }} /><span style={styles.listeningText}>Recording...</span></>) : null}
        </div>
        <div style={styles.voiceButtonContainer}>
          <button onClick={startRecording} disabled={isRecording || isProcessing || isFullscreenCall} style={{ ...styles.voiceButton, borderColor:theme.primary, ...(isRecording ? { backgroundColor:theme.primary, borderColor:theme.primary } : {}) }}>
            <Icon name="mic" size={40} color="#fff" />
            <span style={styles.voiceLabel}>{isRecording ? 'Recording...' : isProcessing ? 'Processing...' : 'Tap to Speak'}</span>
          </button>
        </div>
        {settings.overlayButton && <button onClick={toggleOverlay} style={{ ...styles.floatingBtn, backgroundColor:overlayActive ? theme.primary : 'rgba(0,0,0,0.7)', borderColor:overlayActive ? theme.primary : '#333' }}><Icon name={overlayListening ? 'mic' : 'sparkles'} size={22} color={overlayActive ? '#fff' : theme.primary} /></button>}
      </div>
    </div>
  )

  // PC VIEW
  return (
    <div style={{ ...styles.appPC, backgroundColor:theme.secondary }}>
      <header style={{...styles.headerPC, borderBottomColor:hexA(theme.primary, 0.3)}}>
        <div style={styles.headerLeft}><h1 style={{...styles.titlePC, color:theme.primary}}>CYPHER4X</h1><span style={{...styles.versionBadgePC, color:theme.primary, backgroundColor:hexA(theme.primary, 0.13)}}>{VERSION}</span></div>
        <div style={styles.headerRight}>
          <button onClick={toggleFullscreenCall} style={{...styles.callBtnPC, borderColor:theme.primary, color:theme.primary, padding:'4px 8px'}}><Icon name="phone" size={16} color={theme.primary} /><span>CALL</span></button>
          <button onClick={() => { if (requireLogin('Cyber Lab')) setShowCyberLab(true) }} style={styles.settingsBtnPC}><Icon name="shield" size={20} color="#fff" /></button>
          <button onClick={() => setShowPracticalWorkspace(true)} style={styles.settingsBtnPC}><Icon name="zap" size={20} color="#00ff41" /></button>
          <button onClick={() => setShowSettings(true)} style={styles.settingsBtnPC}><Icon name="cog" size={20} color="#fff" /></button>
          <button onClick={toggleView} style={styles.settingsBtnPC}><Icon name="mobile" size={20} color="#fff" /></button>
          <button onClick={startRecording} disabled={isRecording || isProcessing} style={{...styles.voiceBtnPC, borderColor:theme.primary, color:theme.primary}}><Icon name="mic" size={20} color={theme.primary} /><span>Speak</span></button>
        </div>
      </header>
      <div style={styles.pcLayout}>
        <div style={styles.pcSidebar}>
          <div style={styles.pcSidebarSection}><h3 style={{...styles.pcSidebarTitle, color:theme.primary}}><Icon name="chart" size={16} color={theme.primary} /> STATS</h3><div style={styles.pcSidebarRow}><span>CPU</span><span>{stats.cpuUsage}%</span></div><div style={styles.pcSidebarRow}><span>RAM</span><span>{stats.ramUsage.toFixed(1)} GB</span></div><div style={styles.pcSidebarRow}><span>Uptime</span><span>{fmtU(stats.uptime)}</span></div></div>
          <div style={styles.pcSidebarSection}><h3 style={{...styles.pcSidebarTitle, color:theme.primary}}><Icon name="calendar" size={16} color={theme.primary} /> DASHBOARD</h3><div style={styles.pcSidebarRow}><span>Date</span><span>{dash.date}</span></div><div style={styles.pcSidebarRow}><span>Time</span><span>{dash.time}</span></div><div style={styles.pcSidebarRow}><span>Day</span><span>{dash.day}</span></div>{dash.temp && <div style={styles.pcSidebarRow}><span>Temp</span><span>{dash.temp}</span></div>}</div>
          <div style={styles.pcSidebarSection}><h3 style={{...styles.pcSidebarTitle, color:theme.primary}}><Icon name="chat" size={16} color={theme.primary} /> CHATS</h3><button onClick={createNewChat} style={styles.sidebarBtnPC}><Icon name="plus" size={14} color="#fff" /> New</button><button onClick={() => setShowChatOverview(true)} style={styles.sidebarBtnPC}><Icon name="chat" size={14} color="#fff" /> Open</button></div>
          <div style={styles.pcSidebarSection}><h3 style={{...styles.pcSidebarTitle, color:theme.primary}}><Icon name="user" size={16} color={theme.primary} /> PROFILE</h3><button onClick={openEditProfile} style={styles.sidebarBtnPC}><Icon name="edit" size={14} color="#fff" /> Edit</button>{userMode === 'loggedin' ? <button onClick={handleLogout} style={styles.logoutBtnPC}><Icon name="close" size={14} color="#fff" /> Logout</button> : <button onClick={() => { setShowAuthModal(true); setShowLogin(true) }} style={styles.sidebarBtnPC}><Icon name="settings" size={14} color="#fff" /> Login</button>}</div>
          <div style={{ textAlign:'center', color:'#666', fontSize:10, padding:'12px 0' }}>{VERSION_FULL}</div>
        </div>
        <div style={{ ...styles.pcMain, backgroundImage:backgroundImage ? `url(${backgroundImage})` : 'none', backgroundSize:'cover' }}>
          <div style={styles.pcBallContainer}><RedBall isSpeaking={isAISpeaking} theme={theme} /></div>
          <div style={styles.pcListeningContainer}>
            {isListening ? <><div style={styles.listeningDot} /><span style={styles.listeningText}>Listening...</span>{interimTranscript && <span style={styles.interimText}>"{interimTranscript}"</span>}</> : isProcessing ? <span style={styles.listeningText}>Processing...</span> : isRecording ? <><div style={{ ...styles.listeningDot, backgroundColor:theme.primary }} /><span style={styles.listeningText}>Recording...</span></> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

// ==================================================
// STYLES
// ==================================================
const styles = {
  introContainer:{ position:'fixed', inset:0, backgroundColor:'#000', zIndex:999999, display:'flex', alignItems:'center', justifyContent:'center' },
  introBackground:{ position:'absolute', inset:0, background:'radial-gradient(circle at center, #111 0%, #000 100%)' },
  introContent:{ position:'relative', zIndex:1, textAlign:'center' },
  introText:{ color:'#fff', fontSize:'clamp(20px, 5vw, 48px)', fontWeight:'bold', letterSpacing:6, fontFamily:"'Courier New', monospace" },
  enterOverlay:{ position:'fixed', inset:0, backgroundColor:'#000', zIndex:99999, display:'flex', alignItems:'center', justifyContent:'center' },
  enterBackground:{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center, #1a0000 0%, #000 70%)' },
  enterContent:{ position:'relative', zIndex:1, textAlign:'center', maxWidth:420, padding:20 },
  enterTitle:{ fontSize:38, letterSpacing:10, margin:'0 0 8px', fontWeight:'bold' },
  enterSubtitleSmall:{ color:'#ff6688', fontSize:12, letterSpacing:3, marginBottom:50, opacity:0.7 },
  enterUpdatingWrap:{ display:'flex', alignItems:'center', justifyContent:'center', gap:4, marginBottom:24 },
  enterUpdatingLabel:{ fontSize:22, fontWeight:'bold', letterSpacing:4 },
  enterUpdatingDots:{ display:'flex', alignItems:'center', fontSize:22, fontWeight:'bold' },
  enterProgressBarWrap:{ width:'100%', height:4, backgroundColor:'#1a1a1a', borderRadius:4, overflow:'hidden', marginBottom:8 },
  enterProgressBar:{ height:'100%', transition:'width 0.1s linear' },
  enterPercent:{ fontSize:12, letterSpacing:2 },
  enterMessageSmall:{ color:'#888', fontSize:11, letterSpacing:2, marginTop:16, minHeight:16 },
  appAndroid:{ minHeight:'100vh', height:'100vh', color:'#e0e0e0', fontFamily:"'Segoe UI','Courier New',monospace", overflow:'hidden', margin:0, padding:0 },
  practicalContainer:{ position:'fixed', inset:0, zIndex:99998, display:'flex', flexDirection:'column', overflow:'hidden' },
  practicalHeader:{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 20px', borderBottom:'1px solid', flexShrink:0 },
  practicalExitBtn:{ display:'flex', alignItems:'center', gap:6, backgroundColor:'transparent', border:'1px solid', borderRadius:6, padding:'6px 12px', cursor:'pointer', fontSize:12, fontWeight:'bold' },
  practicalExportBtn:{ display:'flex', alignItems:'center', gap:6, backgroundColor:'transparent', border:'1px solid', borderRadius:6, padding:'6px 12px', cursor:'pointer', fontSize:12, fontWeight:'bold' },
  practicalTitle:{ margin:0, fontSize:16, letterSpacing:2, fontWeight:'bold' },
  practicalCanvas:{ flex:1, overflowY:'auto', padding:20, display:'flex', flexDirection:'column', gap:16 },
  practicalMsg:{ padding:'16px 14px 12px 14px', borderRadius:8, maxWidth:'92%', lineHeight:1.6, fontSize:15, boxShadow:'0 2px 8px rgba(0,0,0,0.06)' },
  practicalPreviewHeader:{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'6px 10px', backgroundColor:'rgba(0,0,0,0.25)', borderTopLeftRadius:8, borderTopRightRadius:8 },
  practicalPreviewIframe:{ width:'100%', height:420, border:'1px solid #333', borderTop:'none', borderBottomLeftRadius:8, borderBottomRightRadius:8, backgroundColor:'#fff', display:'block' },
  practicalActionBtn:{ background:'rgba(0,0,0,0.06)', border:'1px solid rgba(0,0,0,0.1)', borderRadius:6, padding:'4px 6px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', minWidth:24, minHeight:24 },
  practicalActionBtnText:{ background:'rgba(0,0,0,0.06)', border:'1px solid rgba(0,0,0,0.1)', borderRadius:6, padding:'4px 10px', cursor:'pointer', display:'flex', alignItems:'center', gap:4, fontSize:11, fontWeight:'bold', color:'inherit' },
  practicalInputRow:{ display:'flex', gap:8, alignItems:'center', padding:'12px 20px', borderTop:'1px solid', flexShrink:0 },
  practicalInput:{ flex:1, padding:'12px 16px', backgroundColor:'transparent', border:'1px solid', borderRadius:24, fontSize:15, outline:'none' },
  practicalMicBtn:{ padding:10, borderRadius:'50%', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' },
  practicalSendBtn:{ border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' },
  workspaceContainer:{ position:'fixed', inset:0, backgroundColor:'#050505', zIndex:99998, display:'flex', flexDirection:'column', overflow:'hidden' },
  workspaceHeader:{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 20px', backgroundColor:'#0a0a0a', borderBottom:'1px solid #222', flexShrink:0 },
  workspaceExitBtn:{ display:'flex', alignItems:'center', gap:6, backgroundColor:'transparent', border:'1px solid', borderRadius:6, padding:'6px 12px', cursor:'pointer', fontSize:12, fontWeight:'bold' },
  workspaceTitle:{ margin:0, fontSize:16, letterSpacing:2, fontWeight:'bold' },
  workspaceBody:{ flex:1, display:'flex', flexDirection:'row', overflow:'hidden' },
  workspaceLeftPanel:{ flex:1, backgroundColor:'#0a0a0a', borderRight:'1px solid #222', display:'flex', flexDirection:'column', padding:15, overflow:'hidden' },
  workspacePanelHeader:{ color:'#fff', fontSize:11, fontWeight:'bold', letterSpacing:1, marginBottom:10, display:'flex', alignItems:'center', gap:6 },
  workspaceLogList:{ flex:1, overflowY:'auto', backgroundColor:'#000', borderRadius:6, padding:10, border:'1px solid #222' },
  workspaceRightPanel:{ width:'clamp(280px, 40%, 480px)', backgroundColor:'#0a0a0a', borderLeft:'1px solid #222', display:'flex', flexDirection:'column', padding:15, justifyContent:'flex-end' },
  workspaceInputRow:{ display:'flex', gap:8, alignItems:'center', backgroundColor:'#111', padding:8, borderRadius:8, border:'1px solid #333' },
  workspaceInput:{ flex:1, padding:'10px 12px', backgroundColor:'transparent', border:'none', color:'#fff', fontSize:13, outline:'none' },
  workspaceMicBtn:{ padding:10, borderRadius:6, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' },
  workspaceSendBtn:{ padding:10, borderRadius:6, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' },
  authModalOverlay:{ position:'fixed', inset:0, backgroundColor:'rgba(0,0,0,0.9)', zIndex:99999, display:'flex', alignItems:'center', justifyContent:'center', padding:20 },
  authModalCard:{ width:'100%', maxWidth:400, backgroundColor:'#111', border:'2px solid', borderRadius:12, padding:30, textAlign:'center', position:'relative' },
  authModalClose:{ position:'absolute', top:10, right:15, background:'none', border:'none', color:'#888', fontSize:24, cursor:'pointer' },
  authTitle:{ fontSize:32, letterSpacing:4, marginBottom:4 },
  authSubtitle:{ fontSize:18, marginBottom:20 },
  authError:{ fontSize:14, minHeight:24, marginBottom:12 },
  authInput:{ width:'100%', padding:12, marginBottom:12, backgroundColor:'#000', border:'1px solid #333', color:'#fff', borderRadius:6, fontSize:16, outline:'none', boxSizing:'border-box' },
  authBtn:{ width:'100%', padding:14, color:'#fff', border:'none', borderRadius:6, fontSize:18, fontWeight:'bold', cursor:'pointer', marginTop:8 },
  authSwitch:{ marginTop:16, display:'flex', justifyContent:'center', gap:8, color:'#888', fontSize:14 },
  authSwitchBtn:{ background:'none', border:'none', cursor:'pointer', fontSize:14, fontWeight:'bold', textDecoration:'underline' },
  guestLimitOverlay:{ position:'fixed', inset:0, zIndex:99998, display:'flex', alignItems:'center', justifyContent:'center', padding:20 },
  guestLimitCard:{ backgroundColor:'#111', border:'2px solid', borderRadius:20, padding:'40px 30px', maxWidth:420, width:'100%', textAlign:'center' },
  guestLimitTitle:{ fontSize:24, marginBottom:16 },
  guestLimitText:{ color:'#ddd', fontSize:16, lineHeight:1.6, marginBottom:24 },
  guestLimitButtons:{ display:'flex', gap:12, justifyContent:'center' },
  guestLimitLoginBtn:{ padding:'12px 30px', color:'#fff', border:'none', borderRadius:30, fontSize:16, fontWeight:'bold', cursor:'pointer', flex:1 },
  guestLimitSignupBtn:{ padding:'12px 30px', backgroundColor:'#1a3a3a', color:'#fff', border:'1px solid #2a5a5a', borderRadius:30, fontSize:16, fontWeight:'bold', cursor:'pointer', flex:1 },
  settingsFullscreen:{ position:'fixed', inset:0, backgroundColor:'#000', zIndex:100000, display:'flex', flexDirection:'column', overflow:'hidden' },
  settingsHeaderFull:{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 20px', borderBottom:'1px solid #333', backgroundColor:'#0a0000', flexShrink:0 },
  settingsTitleFull:{ fontSize:20, margin:0, letterSpacing:2 },
  settingsCloseFull:{ background:'none', border:'none', cursor:'pointer', padding:8, display:'flex' },
  settingsBodyFull:{ flex:1, overflowY:'auto', padding:20, display:'flex', flexDirection:'column', gap:20 },
  settingsSection:{ borderBottom:'1px solid #1a1a1a', paddingBottom:20 },
  settingsSectionTitle:{ fontSize:14, margin:'0 0 16px', letterSpacing:1, textTransform:'uppercase' },
  settingsDoneFull:{ padding:16, color:'#fff', border:'none', fontSize:16, fontWeight:'bold', cursor:'pointer', flexShrink:0 },
  uploadBtn:{ padding:'10px 16px', color:'#fff', borderRadius:6, cursor:'pointer', display:'flex', alignItems:'center', gap:8, fontSize:14, fontWeight:'bold', border:'none' },
  settingItem:{ display:'flex', justifyContent:'space-between', alignItems:'center', color:'#fff', fontSize:15, marginBottom:14, gap:10 },
  settingsSelect:{ padding:'10px 12px', backgroundColor:'#000', border:'1px solid #444', color:'#fff', borderRadius:6, fontSize:14, width:'100%', boxSizing:'border-box' },
  colorPicker:{ width:60, height:32, border:'1px solid #333', borderRadius:6, background:'#000', cursor:'pointer' },
  rotateOverlay:{ position:'fixed', inset:0, backgroundColor:'rgba(0,0,0,0.9)', zIndex:99996, display:'flex', alignItems:'center', justifyContent:'center', padding:20 },
  rotateCard:{ backgroundColor:'#111', border:'2px solid', borderRadius:20, padding:'40px 30px', maxWidth:400, width:'100%', textAlign:'center' },
  rotateText:{ color:'#fff', fontSize:18, margin:'20px 0', lineHeight:1.6 },
  rotateOkBtn:{ padding:'12px 40px', color:'#fff', border:'none', borderRadius:30, fontSize:16, fontWeight:'bold', cursor:'pointer' },
  fullscreenCallOverlay:{ position:'fixed', inset:0, backgroundColor:'#000', zIndex:99995, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:20 },
  returnBtn:{ position:'absolute', top:20, left:20, backgroundColor:'rgba(255,0,60,0.3)', border:'1px solid #ff003c', borderRadius:30, padding:'10px 20px', color:'#fff', fontSize:16, display:'flex', alignItems:'center', gap:8, cursor:'pointer' },
  fullscreenCallContentNoBall:{ display:'flex', flexDirection:'column', alignItems:'center', gap:30, maxWidth:500 },
  fullscreenListeningStatus:{ display:'flex', alignItems:'center', gap:12, backgroundColor:'rgba(255,255,255,0.05)', padding:'8px 20px', borderRadius:30 },
  fullscreenListeningDot:{ width:12, height:12, borderRadius:'50%' },
  fullscreenSpeakingDot:{ width:12, height:12, borderRadius:'50%' },
  fullscreenStatusText:{ color:'#fff', fontSize:18, fontWeight:'bold' },
  fullscreenTranscript:{ color:'#ff6688', fontSize:16, fontStyle:'italic', padding:'8px 20px', backgroundColor:'rgba(0,0,0,0.5)', borderRadius:12, maxWidth:'90%', textAlign:'center' },
  fullscreenMicBtn:{ width:'clamp(70px,14vw,100px)', height:'clamp(70px,14vw,100px)', borderRadius:'50%', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' },
  chatOverviewContainer:{ position:'fixed', inset:0, zIndex:99994, display:'flex', flexDirection:'column', overflow:'hidden' },
  chatOverviewHeader:{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px', backgroundColor:'#111', borderBottom:'1px solid #333', flexShrink:0, gap:12 },
  chatOverviewBackBtn:{ background:'none', border:'none', color:'#fff', display:'flex', alignItems:'center', gap:8, fontSize:16, cursor:'pointer' },
  chatOverviewVoiceToggle:{ background:'none', border:'none', color:'#fff', cursor:'pointer', padding:6, borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.05)' },
  chatMenuDropdown:{ position:'absolute', top:60, right:20, width:'clamp(250px, 80vw, 350px)', backgroundColor:'#1a1a1a', border:'1px solid #333', borderRadius:8, zIndex:99999, overflow:'hidden' },
  chatOverviewMessages:{ flex:1, overflowY:'auto', padding:'12px 16px', display:'flex', flexDirection:'column', gap:8 },
  chatOverviewEmpty:{ color:'#666', textAlign:'center', fontSize:16, marginTop:40 },
  chatOverviewMsg:{ maxWidth:'88%', padding:'10px 14px', borderRadius:12, display:'flex', flexDirection:'column', gap:4 },
  chatOverviewMsgText:{ color:'#fff', fontSize:14, wordBreak:'break-word', whiteSpace:'pre-wrap' },
  chatOverviewMsgTime:{ fontSize:10, color:'#888', alignSelf:'flex-end' },
  replyQuote:{ display:'flex', alignItems:'center', gap:4, padding:'4px 8px', backgroundColor:'rgba(255,255,255,0.08)', borderLeft:'3px solid', borderRadius:4, marginBottom:4 },
  replyQuoteText:{ fontSize:11, fontStyle:'italic', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' },
  replyBar:{ display:'flex', alignItems:'center', gap:8, padding:'8px 16px', backgroundColor:'#1a1a1a', borderTop:'2px solid' },
  chatOverviewInputRowRaised:{ display:'flex', gap:8, padding:'12px 16px', paddingBottom:'max(30px, env(safe-area-inset-bottom, 50px))', backgroundColor:'#111', borderTop:'1px solid #333', flexShrink:0, alignItems:'center' },
  chatOverviewInput:{ flex:1, padding:'10px 14px', backgroundColor:'#000', border:'1px solid #333', color:'#fff', borderRadius:20, fontSize:14, outline:'none' },
  chatOverviewMicBtn:{ background:'none', border:'none', color:'#fff', cursor:'pointer', padding:8, borderRadius:'50%', backgroundColor:'rgba(255,0,60,0.2)' },
  chatOverviewSendBtn:{ background:'none', border:'none', color:'#fff', cursor:'pointer', padding:8, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' },
  voiceControls:{ display:'flex', gap:6, alignItems:'center' },
  voiceTranscriptPreview:{ position:'absolute', bottom:80, left:16, right:16, backgroundColor:'rgba(0,0,0,0.8)', padding:'8px 16px', borderRadius:12, color:'#ff6688', fontSize:14, fontStyle:'italic', textAlign:'center' },
  msgActions:{ display:'flex', gap:4, justifyContent:'flex-end', marginTop:4, opacity:0.7 },
  msgActionBtn:{ background:'none', border:'none', cursor:'pointer', padding:'2px 6px' },
  codeBlockWrap:{ marginTop:8, marginBottom:8, borderRadius:8, overflow:'hidden', border:'1px solid #333', backgroundColor:'#0a0a0a', alignSelf:'stretch' },
  codeBlockHeader:{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'6px 10px', backgroundColor:'#1a1a1a' },
  codeLang:{ fontSize:11, fontWeight:'bold', textTransform:'uppercase', letterSpacing:1 },
  codeCopyBtn:{ display:'flex', alignItems:'center', gap:4, padding:'4px 10px', color:'#fff', border:'none', borderRadius:4, fontSize:11, fontWeight:'bold', cursor:'pointer' },
  codeBlock:{ margin:0, padding:12, color:'#e0e0e0', fontSize:12, fontFamily:"'Courier New',monospace", whiteSpace:'pre', overflowX:'auto', lineHeight:1.5 },
  profileContainer:{ backgroundColor:'#000', minHeight:'100dvh', display:'flex', alignItems:'center', justifyContent:'center', padding:20 },
  profileCard:{ width:'100%', maxWidth:420, backgroundColor:'#111', border:'2px solid', borderRadius:12, padding:28 },
  profileTitle:{ textAlign:'center', marginBottom:24, fontSize:22 },
  avatarUploadArea:{ width:130, height:130, borderRadius:'50%', border:'3px dashed', margin:'0 auto 20px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', backgroundColor:'#1a1a1a' },
  avatarPreview:{ width:'100%', height:'100%', objectFit:'cover' },
  avatarIcon:{ fontSize:14, textAlign:'center' },
  inputGroup:{ marginBottom:18 },
  label:{ fontSize:14, display:'flex', alignItems:'center', gap:6, marginBottom:8 },
  textInput:{ width:'100%', padding:14, backgroundColor:'#000', border:'1px solid', color:'#fff', borderRadius:8, fontSize:15, outline:'none', boxSizing:'border-box' },
  bioInput:{ width:'100%', minHeight:80, padding:14, backgroundColor:'#000', border:'1px solid', color:'#fff', borderRadius:8, fontSize:15, outline:'none', resize:'vertical', boxSizing:'border-box' },
  profileBtnRow:{ display:'flex', gap:12, marginTop:12 },
  createBtn:{ flex:1, padding:14, color:'#fff', border:'none', borderRadius:8, fontSize:16, fontWeight:'bold', cursor:'pointer' },
  cancelBtn:{ padding:'14px 20px', backgroundColor:'#333', color:'#fff', border:'none', borderRadius:8, fontSize:15, cursor:'pointer' },
  sidebarOverlay:{ position:'fixed', inset:0, backgroundColor:'rgba(0,0,0,0.85)', zIndex:998 },
  sidebar:{ position:'fixed', top:0, left:0, bottom:0, width:380, maxWidth:'90vw', backgroundColor:'#0a0000', borderRight:'2px solid #ff003c', zIndex:999, overflowY:'auto', padding:16 },
  sidebarHeader:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10, paddingBottom:10, borderBottom:'1px solid #333' },
  sidebarTitle:{ fontSize:18, fontWeight:'bold', margin:0, fontFamily:'monospace', display:'flex', alignItems:'center', gap:8 },
  closeBtn:{ backgroundColor:'transparent', border:'none', color:'#888', cursor:'pointer', padding:4, display:'flex' },
  sidebarSection:{ marginBottom:12 },
  sectionTitle:{ fontSize:14, margin:'0 0 8px', paddingBottom:4, borderBottom:'1px solid #333', fontFamily:'monospace', display:'flex', alignItems:'center', gap:6 },
  settingRow:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 },
  settingLabel:{ fontSize:13, color:'#ddd' },
  toggleBtn:{ padding:'4px 12px', borderRadius:3, border:'none', fontSize:11, fontWeight:'bold', cursor:'pointer', backgroundColor:'#333', color:'#fff' },
  toolBtn:{ padding:'8px 12px', backgroundColor:'#1a1a1a', color:'#fff', border:'1px solid #333', borderRadius:6, cursor:'pointer', width:'100%', marginTop:4, display:'flex', alignItems:'center', gap:8, fontSize:13, fontWeight:'bold' },
  statsCard:{ border:'1px solid #ff003c40', borderRadius:6, padding:'10px 12px', backgroundColor:'#0a0a0a' },
  statRow:{ display:'flex', justifyContent:'space-between', padding:'2px 0', fontSize:12 },
  statLabel:{ color:'#aaa' },
  statValue:{ fontWeight:500 },
  sidebarBtn:{ padding:'6px 12px', backgroundColor:'#333', color:'#fff', border:'none', borderRadius:4, cursor:'pointer', width:'100%', marginTop:4, display:'flex', alignItems:'center', justifyContent:'center', gap:4, fontSize:13 },
  dangerBtn:{ padding:'6px 12px', backgroundColor:'#880000', color:'#fff', border:'none', borderRadius:4, cursor:'pointer', width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:4, fontSize:13 },
  logoutBtn:{ padding:'6px 12px', backgroundColor:'#880000', color:'#fff', border:'none', borderRadius:4, cursor:'pointer', width:'100%', marginTop:4, display:'flex', alignItems:'center', justifyContent:'center', gap:4, fontSize:13 },
  overviewBtn:{ padding:'4px 10px', backgroundColor:'#333', color:'#fff', border:'none', borderRadius:4, cursor:'pointer', fontSize:11 },
  topRightButtons:{ display:'flex', gap:8, alignItems:'center' },
  settingsButtonTop:{ backgroundColor:'rgba(0,0,0,0.6)', border:'2px solid #333', borderRadius:30, padding:'6px 12px', display:'flex', alignItems:'center', cursor:'pointer' },
  settingsBtnPC:{ backgroundColor:'rgba(0,0,0,0.6)', border:'1px solid #333', borderRadius:16, padding:'4px 10px', display:'flex', alignItems:'center', cursor:'pointer', marginLeft:6 },
  floatingBtn:{ position:'absolute', bottom:150, right:25, width:56, height:56, borderRadius:'50%', border:'2px solid', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', zIndex:20 },
  mainContentAndroid:{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden', height:'100vh' },
  backgroundAndroid:{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', zIndex:0 },
  ballContainer:{ position:'relative', width:300, height:300, pointerEvents:'none', zIndex:1, display:'flex', alignItems:'center', justifyContent:'center' },
  ball3DContainer:{ perspective:800 },
  ball3D:{ width:180, height:180, borderRadius:'50%', position:'relative' },
  ballHighlight:{ position:'absolute', top:'18%', left:'22%', width:'35%', height:'25%', borderRadius:'50%', background:'radial-gradient(ellipse,rgba(255,255,255,0.6) 0%,transparent 70%)', filter:'blur(4px)' },
  ballInnerGlow:{ position:'absolute', top:'15%', left:'15%', width:'70%', height:'70%', borderRadius:'50%', background:'radial-gradient(circle,rgba(255,100,140,0.2) 0%,transparent 60%)' },
  ring1:{ position:'absolute', top:'50%', left:'50%', borderRadius:'50%', border:'2px solid', animation:'spinRing 12s linear infinite' },
  ring2:{ position:'absolute', top:'50%', left:'50%', borderRadius:'50%', border:'1px solid', animation:'spinRing 18s linear infinite reverse' },
  ring3:{ position:'absolute', top:'50%', left:'50%', borderRadius:'50%', border:'1px dashed', animation:'spinRing 8s linear infinite' },
  faceTitleAndroid:{ position:'absolute', bottom:'35%', fontSize:'clamp(42px,6vw,68px)', fontWeight:'bold', letterSpacing:10, textAlign:'center', width:'100%', zIndex:2, fontFamily:"'Courier New',monospace" },
  topBarAndroid:{ position:'absolute', top:20, left:20, right:20, zIndex:10, display:'flex', justifyContent:'space-between', alignItems:'center' },
  callButtonTopRight:{ backgroundColor:'rgba(0,0,0,0.6)', border:'2px solid', borderRadius:30, padding:'8px 16px', display:'flex', alignItems:'center', gap:8, cursor:'pointer', fontSize:14, fontWeight:'bold' },
  callLabelTop:{ fontSize:12, fontWeight:'bold', color:'#fff' },
  listeningContainer:{ position:'absolute', top:90, left:'50%', transform:'translateX(-50%)', zIndex:10, display:'flex', alignItems:'center', gap:12, backgroundColor:'rgba(0,0,0,0.5)', padding:'8px 20px', borderRadius:30, border:'1px solid rgba(255,0,60,0.2)', flexWrap:'wrap', justifyContent:'center' },
  listeningDot:{ width:10, height:10, borderRadius:'50%', backgroundColor:'#4f8' },
  listeningText:{ color:'#fff', fontSize:16, fontWeight:'bold', letterSpacing:2, fontFamily:"'Courier New',monospace" },
  interimText:{ color:'#ff6688', fontSize:14, fontStyle:'italic', maxWidth:200, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', borderLeft:'1px solid rgba(255,0,60,0.3)', paddingLeft:12 },
  sendInterimBtn:{ border:'none', borderRadius:20, padding:'4px 14px', display:'flex', alignItems:'center', gap:6, color:'#fff', cursor:'pointer', fontSize:13, fontWeight:'bold' },
  voiceButtonContainer:{ position:'absolute', bottom:50, left:'50%', transform:'translateX(-50%)', zIndex:10 },
  voiceButton:{ width:90, height:90, borderRadius:'50%', backgroundColor:'#1a1a1a', border:'3px solid', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:4 },
  voiceLabel:{ color:'#fff', fontSize:12, fontWeight:'bold', letterSpacing:1, marginTop:4 },
  hamburgerBtn:{ backgroundColor:'transparent', border:'none', cursor:'pointer', zIndex:15, padding:8 },
  appPC:{ minHeight:'100vh', height:'100vh', color:'#e0e0e0', fontFamily:"'Segoe UI','Courier New',monospace", overflow:'hidden', display:'flex', flexDirection:'column' },
  headerPC:{ padding:'6px 12px', borderBottom:'1px solid', display:'flex', justifyContent:'space-between', alignItems:'center', flexShrink:0, backgroundColor:'#0a0000', flexWrap:'wrap', gap:4, minHeight:44 },
  headerLeft:{ display:'flex', alignItems:'center', gap:6 },
  titlePC:{ margin:0, fontSize:'clamp(16px,4vw,22px)', fontWeight:'bold', letterSpacing:2 },
  versionBadgePC:{ fontSize:10, padding:'2px 8px', borderRadius:10 },
  headerRight:{ display:'flex', alignItems:'center', gap:6, flexWrap:'wrap' },
  callBtnPC:{ backgroundColor:'rgba(0,0,0,0.6)', border:'1px solid', borderRadius:16, padding:'3px 10px', display:'flex', alignItems:'center', gap:4, cursor:'pointer', fontSize:11, fontWeight:'bold' },
  voiceBtnPC:{ backgroundColor:'rgba(0,0,0,0.6)', border:'1px solid', borderRadius:16, padding:'3px 10px', display:'flex', alignItems:'center', gap:4, cursor:'pointer', fontSize:11, fontWeight:'bold' },
  pcLayout:{ flex:1, display:'flex', overflow:'hidden' },
  pcSidebar:{ width:'clamp(180px,30%,280px)', backgroundColor:'#0a0a0a', overflowY:'auto', padding:'8px 10px', flexShrink:0, borderRight:'1px solid #333' },
  pcSidebarSection:{ marginBottom:12, borderBottom:'1px solid #1a1a1a', paddingBottom:8 },
  pcSidebarTitle:{ fontSize:12, margin:'0 0 6px', display:'flex', alignItems:'center', gap:4, fontWeight:'bold' },
  pcSidebarRow:{ display:'flex', justifyContent:'space-between', padding:'2px 0', fontSize:11, color:'#ccc' },
  pcMain:{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', position:'relative', backgroundColor:'#050505', overflow:'hidden', padding:10 },
  pcBallContainer:{ position:'relative', width:'clamp(160px,25vw,300px)', height:'clamp(160px,25vw,300px)', pointerEvents:'none', marginBottom:10 },
  pcListeningContainer:{ display:'flex', alignItems:'center', gap:8, backgroundColor:'rgba(0,0,0,0.5)', padding:'4px 16px', borderRadius:30, border:'1px solid rgba(255,0,60,0.2)', maxWidth:'90%' },
  dashBtnPC:{ padding:'3px 10px', backgroundColor:'#222', color:'#fff', border:'1px solid #333', borderRadius:4, cursor:'pointer', fontSize:11, display:'flex', alignItems:'center', gap:4 },
  commandActionsPC:{ display:'flex', gap:6, marginTop:4, flexWrap:'wrap' },
  sidebarBtnPC:{ padding:'5px 10px', backgroundColor:'#333', color:'#fff', border:'none', borderRadius:4, cursor:'pointer', width:'100%', marginTop:4, display:'flex', alignItems:'center', justifyContent:'center', gap:4, fontSize:12 },
  logoutBtnPC:{ padding:'5px 10px', backgroundColor:'#880000', color:'#fff', border:'none', borderRadius:4, cursor:'pointer', width:'100%', marginTop:4, display:'flex', alignItems:'center', justifyContent:'center', gap:4, fontSize:12 },
    }
