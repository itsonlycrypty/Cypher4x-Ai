'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

// ==================================================
// ICON SYSTEM
// ==================================================
const Icon = ({ name, size = 18, color = 'currentColor' }) => {
  const p = {
    menu: 'M3 6h18M3 12h18M3 18h18', x: 'M18 6L6 18M6 6l12 12',
    settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-7-3h2m10 0h2M12 6V4m0 16v-2',
    chart: 'M18 20V4M12 20V8M6 20V12',
    hourglass: 'M12 2v4M12 22v-4M4 6h16M4 18h16M8 6v3a4 4 0 0 0 8 0V6H8zm0 12v-3a4 4 0 0 1 8 0v3H8z',
    cpu: 'M4 4h4v4H4zm6 0h10v4H10zM4 10h10v4H4zm12 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z',
    memory: 'M2 6h20v12H2zM6 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z',
    network: 'M4 12a8 8 0 0 1 16 0M6 12a6 6 0 0 1 12 0M8 12a4 4 0 0 1 8 0M10 12a2 2 0 0 1 4 0',
    clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm1-16v6l4 2M12 6v4',
    alertTriangle: 'M12 9v4m0 4h.01M12 2L1 21h22L12 2z',
    send: 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z',
    phone: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0 1 22 16.92z',
    mic: 'M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zm-7 9v1a7 7 0 0 0 14 0v-1M12 22v-3',
    close: 'M18 6L6 18M6 6l12 12', desktop: 'M4 4h16v12H4zM8 20h8M12 16v4',
    mobile: 'M12 2C8 2 4 4 4 8v12c0 4 4 6 8 6s8-2 8-6V8c0-4-4-6-8-6zm0 4c2 0 4 1 4 3s-2 3-4 3-4-1-4-3 2-3 4-3zm0 14c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z',
    file: 'M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM13 2v7h7',
    image: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l3-3 3 3 3-3 3 3',
    video: 'M23 7l-5 5 5 5V7zM1 5h15v14H1z',
    arrowLeft: 'M19 12H5M12 19l-7-7 7-7',
    volume2: 'M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07',
    volumeX: 'M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6',
    atSign: 'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM16 12h4',
    pencil: 'M17 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10zm-6 5l-4 4v3h3l4-4-3-3z',
    save: 'M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2zM17 21v-8H7v8M7 3v5h8',
    trash: 'M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6',
    user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    edit: 'M17 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10zm-5 7l-3 3v3h3l3-3-3-3z',
    chat: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z',
    rotate: 'M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9',
    camera: 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2v11zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
    cog: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-7-3h2m10 0h2M12 6V4m0 16v-2',
    copy: 'M8 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1M8 5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2V5zm4 2h4m-4 4h4',
    pause: 'M6 4h4v16H6V4zm8 0h4v16h-4V4z', play: 'M5 3l14 9-14 9V3z',
    sparkles: 'M12 3l1.9 5.8L20 10l-6.1 1.2L12 17l-1.9-5.8L4 10l6.1-1.2L12 3z',
    refresh: 'M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15',
    music: 'M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z',
    zap: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
    shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    reply: 'M9 17l-6-6 6-6M3 11h10a6 6 0 0 1 6 6v2',
    download: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3',
    check: 'M20 6L9 17l-5-5',
    plus: 'M12 5v14M5 12h14',
    terminal: 'M4 17l6-6-6-6M12 19h8',
    globe: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20',
    sun: 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42',
    calendar: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
    palette: 'M12 22a10 10 0 1 1 0-20c5.5 0 10 4.5 10 10 0 1.7-1.3 3-3 3h-1.5a1.5 1.5 0 0 0-1.5 1.5c0 .4.1.7.4 1 .3.3.6.6.6 1.2A1.8 1.8 0 0 1 12 22zM7.5 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm5-3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm5 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-5 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
    paperclip: 'M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48',
    lock: 'M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4',
    playCircle: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM10 8l6 4-6 4V8z',
    layers: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  }
  if (!p[name]) return null
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display:'inline-block', verticalAlign:'middle', flexShrink:0 }}><path d={p[name]} /></svg>
}

// ==================================================
// CONFIG
// ==================================================
// ⚠️ SECURITY: Revoke this key at https://app.tavily.com — it's exposed to the browser.
const TAVILY_API_KEY = "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"
const TAVILY_URL = "https://api.tavily.com/search"
const VERSION = "v27"
const VERSION_FULL = "CYPHER4X v27.0.0"
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
const getAuth = () => { try { const r = localStorage.getItem('cypher4x_auth'); return r ? JSON.parse(r) : null } catch { return null } }
const clearAuth = () => { try { localStorage.removeItem('cypher4x_auth') } catch {} }

const isMobileDevice = () => /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
const isAndroid = () => /Android/i.test(navigator.userAgent)

// ==================================================
// SMART GREETING
// ==================================================
const isPureGreeting = (text) => {
  const t = text.toLowerCase().trim()
  const words = t.split(/\s+/)
  if (words.length > 4) return false
  if (/\?/.test(t)) return false
  if (/\b(teach|explain|what|how|why|when|where|who|tell|show|help)\b/.test(t)) return false
  const first = words[0].replace(/[^a-z']/g, '')
  const greetings = ['hello', 'hi', 'hey', 'yo', 'sup', 'howdy', 'hiya', 'greetings']
  if (greetings.includes(first)) return true
  if (/^(good (morning|afternoon|evening|day))$/.test(t)) return true
  if (/^(what'?s up|whats up)$/.test(t)) return true
  return false
}

// ==================================================
// KNOWLEDGE
// ==================================================
const KNOWLEDGE = [
  { match: /ethical hacking|penetration test|white ?hat|cyber ?security|cybersecurity|learn hacking/i, answer: `**Ethical Hacking — Learning Path**\n\nEthical hacking = finding vulnerabilities **legally and with permission**.\n\n**📚 Roadmap**\n1. Networking — TCP/IP, DNS, HTTP (TryHackMe Pre-Security)\n2. Linux — bash, permissions (OverTheWire Bandit)\n3. Web — HTML/CSS/JS, HTTP, cookies\n4. Programming — Python + Bash\n5. Core security — OWASP Top 10, crypto, auth\n6. Labs — TryHackMe, HackTheBox, PortSwigger\n7. Certs — Security+ → CEH → OSCP\n\n**⚠️ Rules** — Only test systems you OWN or have permission for.\n\n💡 Open **🔒 Cyber Lab** to practice.` },
  { match: /(what is|explain|define) (javascript|js)\b/i, answer: `**JavaScript**\n\nHigh-level, interpreted. Runs in browsers and on servers (Node.js).\n\n\`\`\`javascript\nconst greet = (name) => \`Hello, \${name}!\`\nconsole.log(greet('World'))\n\`\`\`` },
  { match: /(what is|explain|define) python\b/i, answer: `**Python**\n\nReadable, high-level. #1 for AI/ML, data science, automation.` },
  { match: /(what is|explain) (react|react\.?js)/i, answer: `**React**\n\nJS library by Meta for UI. Component-based.` },
  { match: /(what is|explain) (ai|artificial intelligence)\b/i, answer: `**AI** — ML, Deep Learning, NLP, CV, RL, Generative AI.\n\nModern: GPT, Claude, Gemini, Llama.` },
  { match: /^(hi|hello|hey|yo|sup|howdy)\b/i, answer: `Hey there! 👋 How can I help?` },
]

// ==================================================
// APP DEEP-LINK
// ==================================================
const APP_MAP = {
  whatsapp: { name:'WhatsApp', pkg:'com.whatsapp', scheme:'whatsapp', universal:'https://wa.me/', web:'https://web.whatsapp.com' },
  whatsappbusiness: { name:'WhatsApp Business', pkg:'com.whatsapp.w4b', scheme:'whatsapp', universal:'https://wa.me/', web:'https://web.whatsapp.com' },
  instagram: { name:'Instagram', pkg:'com.instagram.android', scheme:'instagram', universal:'https://instagram.com/', web:'https://instagram.com' },
  youtube: { name:'YouTube', pkg:'com.google.android.youtube', scheme:'vnd.youtube', universal:'https://youtube.com/', web:'https://youtube.com' },
  github: { name:'GitHub', pkg:null, scheme:null, universal:'https://github.com/', web:'https://github.com' },
}
const openApp = (k, x = '') => {
  const a = APP_MAP[k]; if (!a) return `Unknown: ${k}`
  if (isAndroid() && a.pkg) { try { window.location.href = `intent://${x}#Intent;scheme=${a.scheme};package=${a.pkg};S.browser_fallback_url=${encodeURIComponent(a.universal)};end`; return `Opening ${a.name}...` } catch {} }
  if (isMobileDevice()) { window.open(a.universal + x, '_blank', 'noopener,noreferrer'); return `Opening ${a.name}...` }
  window.open(a.web, '_blank', 'noopener,noreferrer'); return `Opening ${a.name}...`
}
const openWhatsAppGroup = (n) => {
  const t = `Looking for group: ${n}`
  if (isAndroid()) { window.location.href = `intent://send?text=${encodeURIComponent(t)}#Intent;scheme=whatsapp;package=com.whatsapp;end`; return `Opening WhatsApp. Search "${n}".` }
  if (isMobileDevice()) { window.open(`https://wa.me/?text=${encodeURIComponent(t)}`, '_blank'); return `Opening WhatsApp. Search "${n}".` }
  window.open('https://web.whatsapp.com', '_blank'); return `WhatsApp Web opened.`
}

// ==================================================
// CODE GENERATION
// ==================================================
const generateLongCode = (lang, purpose, detail) => {
  const L = (lang || '').toLowerCase()

  if (L.includes('javascript') || L.includes('typescript') || (L.includes('js') && !L.includes('json'))) {
    return `// ${purpose} - JavaScript Implementation
// Author: Cypher4X AI

'use strict';

class AppManager {
  constructor() {
    this.items = [];
    this.nextId = 1;
  }
  add(title, description = '') {
    const item = { id: this.nextId++, title, description, createdAt: new Date().toISOString() };
    this.items.push(item);
    return item;
  }
  remove(id) {
    const i = this.items.findIndex(x => x.id === id);
    if (i >= 0) return this.items.splice(i, 1)[0];
    return null;
  }
  list() { return [...this.items]; }
  find(id) { return this.items.find(x => x.id === id) || null; }
  stats() { return { total: this.items.length, created: new Date().toISOString() }; }
}

const app = new AppManager();
console.log('${purpose} initialized');
const sample = app.add('Sample Item', 'Created by Cypher4X');
console.log('Added:', sample);
console.log('All items:', app.list());
console.log('Stats:', app.stats());

if (typeof module !== 'undefined') module.exports = AppManager;
`
  }

  if (L.includes('python')) {
    return `# ${purpose} - Python Implementation
# Author: Cypher4X AI

import os
import json
import logging
from datetime import datetime
from dataclasses import dataclass, asdict, field
from typing import List, Optional, Dict, Any
from enum import Enum

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger("Cypher4XApp")

class Status(Enum):
    PENDING = "pending"
    COMPLETED = "completed"

@dataclass
class Item:
    id: int
    title: str
    description: str = ""
    status: Status = Status.PENDING
    created_at: str = field(default_factory=lambda: datetime.now().isoformat())

    def to_dict(self):
        d = asdict(self); d['status'] = self.status.value; return d

class AppManager:
    def __init__(self, data_file="data.json"):
        self.data_file = data_file
        self.items: List[Item] = []
        self.load()

    def load(self):
        try:
            if os.path.exists(self.data_file):
                with open(self.data_file) as f:
                    self.items = [Item(**{**i, 'status': Status(i['status'])}) for i in json.load(f)]
        except Exception as e:
            logger.error(f"Load failed: {e}")

    def save(self):
        try:
            with open(self.data_file, 'w') as f:
                json.dump([i.to_dict() for i in self.items], f, indent=4)
        except Exception as e:
            logger.error(f"Save failed: {e}")

    def add(self, title: str, description: str = "") -> Item:
        item_id = max([i.id for i in self.items], default=0) + 1
        new_item = Item(id=item_id, title=title, description=description)
        self.items.append(new_item)
        self.save()
        return new_item

    def list(self, status: Optional[Status] = None) -> List[Item]:
        return [i for i in self.items if i.status == status] if status else self.items

if __name__ == "__main__":
    mgr = AppManager()
    mgr.add("Sample Task", "Generated by Cypher4X")
    for item in mgr.list():
        print(f"[{item.id}] {item.title} — {item.status.value}")
`
  }

  if (L.includes('react') || L.includes('jsx')) {
    return `// ${purpose} - React Application
import React, { useState, useEffect, useMemo } from 'react';

export default function App() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');

  const addItem = () => {
    if (!title.trim()) return;
    setItems(prev => [...prev, { id: Date.now(), title, done: false }]);
    setTitle('');
  };

  const toggle = (id) => setItems(prev => prev.map(i => i.id === id ? { ...i, done: !i.done } : i));
  const remove = (id) => setItems(prev => prev.filter(i => i.id !== id));

  const pending = useMemo(() => items.filter(i => !i.done).length, [items]);

  return (
    <div style={{ padding: 24, fontFamily: 'system-ui', maxWidth: 500, margin: '0 auto' }}>
      <h1>${purpose}</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New item..." style={{ flex: 1, padding: 10 }} />
        <button onClick={addItem}>Add</button>
      </div>
      <p>{pending} pending / {items.length} total</p>
      {items.map(i => (
        <div key={i.id} style={{ display: 'flex', gap: 8, padding: 8, borderBottom: '1px solid #eee' }}>
          <input type="checkbox" checked={i.done} onChange={() => toggle(i.id)} />
          <span style={{ flex: 1, textDecoration: i.done ? 'line-through' : 'none' }}>{i.title}</span>
          <button onClick={() => remove(i.id)}>✕</button>
        </div>
      ))}
    </div>
  );
}
`
  }

  if (L.includes('html') || L.includes('css') || L.includes('web')) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${purpose}</title>
<style>
  :root { --primary: #ff003c; --bg: #0a0a0a; --text: #fff; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui, sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; display: flex; justify-content: center; align-items: center; padding: 20px; }
  .card { width: 100%; max-width: 720px; background: #151515; border: 1px solid #2a2a2a; border-radius: 16px; padding: 32px; }
  h1 { color: var(--primary); margin-bottom: 16px; }
  .btn { padding: 12px 24px; background: var(--primary); color: #fff; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; }
  #out { margin-top: 20px; padding: 16px; background: #000; border-left: 4px solid var(--primary); border-radius: 4px; font-family: monospace; }
</style>
</head>
<body>
<div class="card">
  <h1>${purpose}</h1>
  <p>Generated by Cypher4X AI.</p>
  <button class="btn" onclick="run()">Run</button>
  <div id="out">Awaiting input...</div>
</div>
<script>
  function run() {
    document.getElementById('out').textContent = 'Ran at ' + new Date().toLocaleTimeString();
  }
</script>
</body>
</html>
`
  }

  if (L.includes('java') && !L.includes('javascript')) {
    return `// ${purpose} - Java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> items = new ArrayList<>();
        Scanner sc = new Scanner(System.in);
        System.out.println("${purpose}");
        while (true) {
            System.out.println("1.Add 2.List 3.Exit");
            String c = sc.nextLine();
            if ("1".equals(c)) { System.out.print("Item: "); items.add(sc.nextLine()); }
            else if ("2".equals(c)) items.forEach(i -> System.out.println("- " + i));
            else if ("3".equals(c)) return;
        }
    }
}
`
  }

  if (L.includes('c#') || L.includes('csharp')) {
    return `// ${purpose} - C#
using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        var items = new List<string>();
        Console.WriteLine("${purpose}");
        while (true) {
            Console.WriteLine("1.Add 2.List 3.Exit");
            var c = Console.ReadLine();
            if (c == "1") { Console.Write("Item: "); items.Add(Console.ReadLine()); }
            else if (c == "2") items.ForEach(i => Console.WriteLine("- " + i));
            else if (c == "3") return;
        }
    }
}
`
  }

  if (L.includes('cpp') || L.includes('c++')) {
    return `// ${purpose} - C++
#include <iostream>
#include <vector>
#include <string>

int main() {
    std::vector<std::string> items;
    int c;
    std::cout << "${purpose}" << std::endl;
    while (true) {
        std::cout << "1.Add 2.List 3.Exit: ";
        std::cin >> c;
        if (c == 1) { std::string i; std::cin >> i; items.push_back(i); }
        else if (c == 2) for (auto& i : items) std::cout << "- " << i << std::endl;
        else if (c == 3) break;
    }
    return 0;
}
`
  }

  if (L.includes('rust')) {
    return `// ${purpose} - Rust
use std::io;
fn main() {
    let mut items: Vec<String> = Vec::new();
    println!("${purpose}");
    loop {
        println!("1.Add 2.List 3.Exit");
        let mut c = String::new();
        io::stdin().read_line(&mut c).unwrap();
        match c.trim() {
            "1" => { let mut i = String::new(); io::stdin().read_line(&mut i).unwrap(); items.push(i.trim().into()); }
            "2" => items.iter().for_each(|i| println!("- {}", i)),
            "3" => break,
            _ => {}
        }
    }
}
`
  }

  if (L.includes('go')) {
    return `// ${purpose} - Go
package main
import ("bufio"; "fmt"; "os"; "strings")
func main() {
    items := []string{}
    r := bufio.NewReader(os.Stdin)
    for {
        fmt.Println("1.Add 2.List 3.Exit")
        c, _ := r.ReadString('\\n')
        switch strings.TrimSpace(c) {
        case "1": fmt.Print("Item: "); i, _ := r.ReadString('\\n'); items = append(items, strings.TrimSpace(i))
        case "2": for _, i := range items { fmt.Println("-", i) }
        case "3": return
        }
    }
}
`
  }

  if (L.includes('swift')) {
    return `// ${purpose} - Swift
import Foundation
var items: [String] = []
print("${purpose}")
while true {
    print("1.Add 2.List 3.Exit")
    if let c = readLine() {
        switch c {
        case "1": if let i = readLine() { items.append(i) }
        case "2": for i in items { print("- \\(i)") }
        case "3": exit(0)
        default: break
        }
    }
}
`
  }

  if (L.includes('kotlin')) {
    return `// ${purpose} - Kotlin
fun main() {
    val items = mutableListOf<String>()
    println("${purpose}")
    while (true) {
        println("1.Add 2.List 3.Exit")
        when (readLine()) {
            "1" -> items.add(readLine() ?: "")
            "2" -> items.forEach { println("- \$it") }
            "3" -> return
        }
    }
}
`
  }

  return `-- ${purpose} - SQL Schema
CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO items (title, status) VALUES ('Sample', 'pending');
`
}

// ==================================================
// LANGUAGE DETECTION
// ==================================================
const detectLanguage = (q) => {
  const x = (q || '').toLowerCase()
  if (/\b(react|jsx|tsx|next\.?js)\b/.test(x)) return 'react'
  if (/\b(typescript|\bts\b)\b/.test(x)) return 'typescript'
  if (/\b(python|py|django|flask)\b/.test(x)) return 'python'
  if (/\b(javascript|\bjs\b|node\.?js|node)\b/.test(x)) return 'javascript'
  if (/\b(html|css|webpage|website|landing)\b/.test(x)) return 'html'
  if (/\bjava\b/.test(x) && !/javascript/.test(x)) return 'java'
  if (/\b(c\+\+|cpp)\b/.test(x)) return 'cpp'
  if (/\bc#|\bcsharp\b/.test(x)) return 'csharp'
  if (/\brust\b/.test(x)) return 'rust'
  if (/\bgolang\b/.test(x)) return 'go'
  if (/\bswift\b/.test(x)) return 'swift'
  if (/\bkotlin\b/.test(x)) return 'kotlin'
  if (/\b(sql|database|query|schema)\b/.test(x)) return 'sql'
  return 'javascript'
}

// ==================================================
// PRACTICAL WORKSPACE — INTENT DETECTION & BUILDERS
// ==================================================
const detectIntent = (text) => {
  const l = (text || '').toLowerCase()
  if (/\b(image|picture|photo|draw|render)\b/.test(l) || /\bshow me a (pic|photo|image)\b/.test(l)) return 'image'
  if (/\b(hack|security|password|hash|encrypt|decrypt|port ?scan|exploit|pentest|ctf|crypto|base64|rot13|caesar|sniff|brute|firewall)\b/.test(l)) return 'tool'
  if (/\b(game|snake|pong|tetris|breakout|brick|platformer|shooter|rpg|arcade|2048|flappy|invader|asteroid|maze)\b/.test(l)) return 'game'
  if (/\b(source ?code|show code|only code|raw code)\b/.test(l)) return 'code'
  return 'app'
}

const buildAppArtifact = (desc) => {
  const l = desc.toLowerCase()
  if (/todo|task|checklist/.test(l)) return { title:'Todo App', type:'app', lang:'html', html: APP_TODO }
  return { title:'Calculator', type:'app', lang:'html', html: APP_CALC }
}
const buildGameArtifact = (desc) => {
  const l = desc.toLowerCase()
  if (/pong/.test(l)) return { title:'Pong Game', type:'game', lang:'html', html: GAME_PONG }
  return { title:'Snake Game', type:'game', lang:'html', html: GAME_SNAKE }
}
const buildToolArtifact = (desc) => {
  const l = desc.toLowerCase()
  if (/hash|sha|md5/.test(l)) return { title:'Hash Generator', type:'tool', lang:'html', html: TOOL_HASH }
  return { title:'Password Strength Tool', type:'tool', lang:'html', html: TOOL_PASS }
}
const buildPracticalArtifact = (desc, forcedLang) => {
  const intent = detectIntent(desc)
  if (intent === 'image') {
    const kw = desc.replace(/show me|image|picture|photo|of|draw|generate|create|make|a |an /gi,'').trim() || 'abstract'
    return { title: kw, type:'image', lang:'image', url: `https://source.unsplash.com/900x600/?${encodeURIComponent(kw)}` }
  }
  if (intent === 'code') {
    const lang = forcedLang || detectLanguage(desc)
    return { title: 'Source Code', type:'code', lang, code: generateLongCode(lang, desc, '') }
  }
  if (intent === 'game') return buildGameArtifact(desc)
  if (intent === 'tool') return buildToolArtifact(desc)
  return buildAppArtifact(desc)
}

// ==================================================
// HTML TEMPLATES (for inline previews)
// ==================================================
const APP_CALC = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Calculator</title><style>
*{box-sizing:border-box}body{margin:0;font-family:system-ui;background:#1a1a1a;color:#fff;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:16px}
#c{width:100%;max-width:340px;background:#222;border-radius:16px;padding:20px;box-shadow:0 10px 40px rgba(0,0,0,0.5)}
#d{background:#000;color:#fff;font-size:32px;text-align:right;padding:20px;border-radius:8px;margin-bottom:12px;word-break:break-all;min-height:60px;overflow:hidden}
.g{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
button{padding:18px;font-size:20px;border:none;border-radius:8px;background:#333;color:#fff;cursor:pointer;transition:background .15s}
button:hover{background:#444}button.op{background:#ff003c}button.op:hover{background:#cc0033}
button.eq{background:#00c853;grid-column:span 2}button.eq:hover{background:#00a844}
</style></head><body><div id="c"><div id="d">0</div><div class="g">
<button class="op" onclick="k('C')">C</button><button class="op" onclick="k('←')">←</button><button class="op" onclick="k('%')">%</button><button class="op" onclick="k('/')">÷</button>
<button onclick="k('7')">7</button><button onclick="k('8')">8</button><button onclick="k('9')">9</button><button class="op" onclick="k('*')">×</button>
<button onclick="k('4')">4</button><button onclick="k('5')">5</button><button onclick="k('6')">6</button><button class="op" onclick="k('-')">−</button>
<button onclick="k('1')">1</button><button onclick="k('2')">2</button><button onclick="k('3')">3</button><button class="op" onclick="k('+')">+</button>
<button onclick="k('0')" style="grid-column:span 2">0</button><button onclick="k('.')">.</button><button class="eq" onclick="k('=')">=</button>
</div></div><script>
let d=document.getElementById('d'),v='0';
function k(x){if(x==='C'){v='0'}else if(x==='←'){v=v.slice(0,-1)||'0'}else if(x==='='){try{v=String(eval(v.replace(/%/g,'/100*')))}catch{v='Error'}}else if(x==='%'){try{v=String(eval(v)/100)}catch{}}else{v=v==='0'?x:v+x}d.textContent=v}
document.addEventListener('keydown',e=>{if(/[0-9+\\-*/.%]/.test(e.key))k(e.key);else if(e.key==='Enter')k('=');else if(e.key==='Backspace')k('←');else if(e.key==='Escape')k('C')});
<\/script></body></html>`

const APP_TODO = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Todo</title><style>
*{box-sizing:border-box}body{margin:0;font-family:system-ui;background:#0a0a0a;color:#eee;display:flex;justify-content:center;padding:20px;min-height:100vh}
#w{width:100%;max-width:500px;background:#151515;border-radius:16px;padding:24px;border:1px solid #222}
h1{color:#00ff41;font-family:monospace;margin:0 0 20px;font-size:22px}
.r{display:flex;gap:8px;margin-bottom:16px}
input{flex:1;padding:12px;background:#000;border:1px solid #333;color:#fff;border-radius:8px;font-size:15px;outline:none}
input:focus{border-color:#00ff41}
#add{padding:12px 20px;background:#00ff41;color:#000;border:none;border-radius:8px;font-weight:bold;cursor:pointer}
.t{display:flex;align-items:center;gap:10px;padding:12px;background:#1a1a1a;border-radius:8px;margin-bottom:6px}
.t.done span{text-decoration:line-through;color:#666}
.t span{flex:1;cursor:pointer}
.t button{background:none;border:none;color:#ff003c;font-size:18px;cursor:pointer;padding:4px 8px}
.e{color:#666;text-align:center;padding:20px;font-style:italic}
</style></head><body><div id="w"><h1>✅ TODO APP</h1>
<div class="r"><input id="i" placeholder="What needs doing?" /><button id="add">ADD</button></div>
<div id="l"></div></div><script>
let items=JSON.parse(localStorage.getItem('todo')||'[]');
const L=document.getElementById('l'),I=document.getElementById('i');
function render(){if(!items.length){L.innerHTML='<div class="e">No tasks yet.</div>';return}L.innerHTML='';items.forEach((it,i)=>{const d=document.createElement('div');d.className='t'+(it.done?' done':'');d.innerHTML='<span>'+it.text+'</span><button>✕</button>';d.querySelector('span').onclick=()=>{it.done=!it.done;save()};d.querySelector('button').onclick=()=>{items.splice(i,1);save()};L.appendChild(d)})}
function save(){localStorage.setItem('todo',JSON.stringify(items));render()}
document.getElementById('add').onclick=()=>{if(!I.value.trim())return;items.push({text:I.value.trim(),done:false});I.value='';save()};
I.addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('add').click()});
render();
<\/script></body></html>`

const GAME_SNAKE = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Snake</title><style>
*{box-sizing:border-box}body{margin:0;background:#0a0a0a;color:#fff;font-family:monospace;display:flex;flex-direction:column;justify-content:center;align-items:center;min-height:100vh;padding:10px;user-select:none}
#h{font-size:18px;margin:8px;color:#00ff41}
canvas{border:2px solid #00ff41;border-radius:8px;box-shadow:0 0 30px rgba(0,255,65,0.3);max-width:100%;touch-action:none}
#ctrl{display:grid;grid-template-columns:repeat(3,60px);gap:6px;margin:15px}
#ctrl button{padding:18px;font-size:18px;background:#1a1a1a;color:#00ff41;border:1px solid #00ff41;border-radius:8px;cursor:pointer}
#ctrl .sp{visibility:hidden}
</style></head><body>
<div id="h">SCORE: <span id="s">0</span></div>
<canvas id="c" width="360" height="360"></canvas>
<div id="ctrl">
<button class="sp"></button><button onclick="d(0,-1)">▲</button><button class="sp"></button>
<button onclick="d(-1,0)">◀</button><button class="sp"></button><button onclick="d(1,0)">▶</button>
<button class="sp"></button><button onclick="d(0,1)">▼</button><button class="sp"></button>
</div><script>
const cv=document.getElementById('c'),x=cv.getContext('2d'),S=20,N=18;
let sn=[{x:9,y:9}],dir={x:1,y:0},nd={x:1,y:0},fd={x:5,y:5},sc=0,tick=0,spd=8,gm=false;
function d(a,b){if(gm)return;if(a===-dir.x&&b===-dir.y)return;nd={x:a,y:b}}
function spawn(){fd={x:Math.floor(Math.random()*N),y:Math.floor(Math.random()*N)};if(sn.some(s=>s.x===fd.x&&s.y===fd.y))spawn()}
function loop(){if(gm)return;tick++;if(tick<spd){draw();requestAnimationFrame(loop);return}tick=0;dir=nd;const h={x:sn[0].x+dir.x,y:sn[0].y+dir.y};
if(h.x<0||h.x>=N||h.y<0||h.y>=N||sn.some(s=>s.x===h.x&&s.y===h.y)){gm=true;draw();return}
sn.unshift(h);if(h.x===fd.x&&h.y===fd.y){sc++;document.getElementById('s').textContent=sc;spawn()}else sn.pop();draw();requestAnimationFrame(loop)}
function draw(){x.fillStyle='#0a0a0a';x.fillRect(0,0,360,360);x.fillStyle='#ff003c';x.fillRect(fd.x*S+2,fd.y*S+2,S-4,S-4);sn.forEach((s,i)=>{x.fillStyle=i===0?'#00ff41':'#008f11';x.fillRect(s.x*S+1,s.y*S+1,S-2,S-2)});
if(gm){x.fillStyle='rgba(0,0,0,0.75)';x.fillRect(0,0,360,360);x.fillStyle='#00ff41';x.font='bold 28px monospace';x.textAlign='center';x.fillText('GAME OVER',180,155);x.font='16px monospace';x.fillText('Score: '+sc,180,185);x.fillText('Tap to restart',180,215)}}
cv.addEventListener('click',()=>{if(gm){sn=[{x:9,y:9}];dir={x:1,y:0};nd={x:1,y:0};sc=0;gm=false;document.getElementById('s').textContent=0;spawn();loop()}});
document.addEventListener('keydown',e=>{const k={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0]};if(k[e.key]){e.preventDefault();d(...k[e.key])}});
spawn();loop();
<\/script></body></html>`

const GAME_PONG = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Pong</title><style>
*{box-sizing:border-box}body{margin:0;background:#0a0a0a;color:#fff;font-family:monospace;display:flex;flex-direction:column;justify-content:center;align-items:center;min-height:100vh;touch-action:none;user-select:none}
#s{font-size:22px;color:#00ff41;margin:10px;font-weight:bold}
canvas{border:2px solid #00ff41;border-radius:8px;box-shadow:0 0 30px rgba(0,255,65,0.3);max-width:95vw;touch-action:none}
</style></head><body><div id="s">0 - 0</div><canvas id="c" width="480" height="320"></canvas><script>
const cv=document.getElementById('c'),x=cv.getContext('2d'),W=480,H=320,PH=60,PW=10;
let p1=H/2-PH/2,p2=H/2-PH/2,by=H/2,vy=3,vx=3,ps=0,cs=0,gm=false,bx=W/2;
function reset(){by=H/2;vx=Math.random()>.5?3:-3;vy=(Math.random()*4-2);bx=W/2}
cv.addEventListener('mousemove',e=>{const r=cv.getBoundingClientRect();p1=Math.max(0,Math.min(H-PH,(e.clientY-r.top)*(H/r.height)-PH/2))});
cv.addEventListener('touchmove',e=>{e.preventDefault();const r=cv.getBoundingClientRect();p1=Math.max(0,Math.min(H-PH,(e.touches[0].clientY-r.top)*(H/r.height)-PH/2))},{passive:false});
function loop(){
  if(!gm){
    by+=vy;if(by<5||by>H-5)vy*=-1;by=Math.max(5,Math.min(H-5,by));
    const ai=by-PH/2;if(ai>p2+2)p2+=2.6;else if(ai<p2-2)p2-=2.6;p2=Math.max(0,Math.min(H-PH,p2));
    bx+=vx;
    if(bx<25&&bx>10&&by>p1&&by<p1+PH&&vx<0){vx=Math.abs(vx)*1.02;vy+=(by-p1-PH/2)*0.08}
    if(bx>W-25&&bx<W-10&&by>p2&&by<p2+PH&&vx>0){vx=-Math.abs(vx)*1.02;vy+=(by-p2-PH/2)*0.08}
    if(bx<0){cs++;document.getElementById('s').textContent=cs+' - '+ps;reset()}
    if(bx>W){ps++;document.getElementById('s').textContent=cs+' - '+ps;reset()}
  }
  x.fillStyle='#0a0a0a';x.fillRect(0,0,W,H);
  x.setLineDash([6,8]);x.strokeStyle='#222';x.beginPath();x.moveTo(W/2,0);x.lineTo(W/2,H);x.stroke();x.setLineDash([]);
  x.fillStyle='#00ff41';x.fillRect(15,p1,PW,PH);x.fillRect(W-15-PW,p2,PW,PH);
  x.fillStyle='#ff003c';x.beginPath();x.arc(bx,by,6,0,Math.PI*2);x.fill();
  requestAnimationFrame(loop)
}
loop();
<\/script></body></html>`

const TOOL_PASS = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Password Tool</title><style>
*{box-sizing:border-box}body{margin:0;font-family:system-ui;background:#0a0a0a;color:#eee;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:20px}
#w{width:100%;max-width:520px;background:#151515;border:1px solid #2a2a2a;border-radius:16px;padding:28px}
h1{color:#00ff41;font-family:monospace;margin:0 0 20px;font-size:20px}
input{width:100%;padding:14px;border-radius:8px;border:1px solid #333;background:#000;color:#fff;font-size:16px;outline:none;box-sizing:border-box}
input:focus{border-color:#00ff41}
#bar{height:8px;background:#222;border-radius:4px;margin:16px 0;overflow:hidden}
#fill{height:100%;width:0;transition:all .3s}
ul{list-style:none;padding:0;margin:16px 0 0}li{padding:8px 0;color:#888;font-size:14px}li.ok{color:#00ff41}
#s{font-size:14px;color:#888;margin-top:4px}
</style></head><body><div id="w"><h1>🔒 PASSWORD STRENGTH ANALYZER</h1>
<input id="i" type="text" placeholder="Type a password..." autofocus/>
<div id="bar"><div id="fill"></div></div><div id="s">Start typing to analyze</div>
<ul><li id="c1">• At least 12 characters</li><li id="c2">• Contains lowercase</li><li id="c3">• Contains uppercase</li><li id="c4">• Contains digit</li><li id="c5">• Contains symbol</li><li id="c6">• Not a common password</li></ul>
</div><script>
const i=document.getElementById('i'),f=document.getElementById('fill'),s=document.getElementById('s');
i.oninput=()=>{const p=i.value;const c={c1:p.length>=12,c2:/[a-z]/.test(p),c3:/[A-Z]/.test(p),c4:/\\d/.test(p),c5:/[^A-Za-z0-9]/.test(p),c6:!/^(password|123456|qwerty|admin|letmein)/i.test(p)};
let sc=Object.values(c).filter(Boolean).length;
Object.keys(c).forEach(k=>document.getElementById(k).classList.toggle('ok',c[k]));
const colors=['#ff003c','#ff003c','#ffcc00','#ffcc00','#00c8ff','#00ff41','#00ff41'];
const labels=['','Very Weak','Weak','Fair','Good','Strong','Excellent'];
f.style.width=(sc/6*100)+'%';f.style.background=colors[sc];
s.textContent=p?labels[sc]+' — '+sc+'/6':'Start typing to analyze';s.style.color=colors[sc]||'#888'}
<\/script></body></html>`

const TOOL_HASH = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Hash</title><style>
*{box-sizing:border-box}body{margin:0;font-family:system-ui;background:#0a0a0a;color:#eee;display:flex;justify-content:center;padding:20px;min-height:100vh}
#w{width:100%;max-width:560px;background:#151515;border:1px solid #2a2a2a;border-radius:16px;padding:24px}
h1{color:#00ff41;font-family:monospace;margin:0 0 16px;font-size:20px}
textarea{width:100%;min-height:80px;padding:12px;border-radius:8px;border:1px solid #333;background:#000;color:#fff;font-size:14px;outline:none;font-family:monospace;resize:vertical;box-sizing:border-box}
textarea:focus{border-color:#00ff41}
.lbl{color:#888;font-size:11px;margin:14px 0 6px;text-transform:uppercase;letter-spacing:1px}
.out{background:#000;border:1px solid #333;border-radius:8px;padding:12px;font-family:monospace;font-size:12px;word-break:break-all;color:#00ff41;cursor:pointer}
</style></head><body><div id="w"><h1>🔐 HASH GENERATOR</h1>
<textarea id="t" placeholder="Enter text..."></textarea>
<div class="lbl">SHA-256</div><div class="out" id="o1">-</div>
<div class="lbl">SHA-1</div><div class="out" id="o2">-</div>
<div class="lbl">Base64</div><div class="out" id="o3">-</div>
</div><script>
const t=document.getElementById('t');
async function h(a,d){const b=await crypto.subtle.digest(a,new TextEncoder().encode(d));return Array.from(new Uint8Array(b)).map(x=>x.toString(16).padStart(2,'0')).join('')}
t.oninput=async()=>{const v=t.value;if(!v){['o1','o2','o3'].forEach(i=>document.getElementById(i).textContent='-');return}
document.getElementById('o1').textContent=await h('SHA-256',v);
document.getElementById('o2').textContent=await h('SHA-1',v);
document.getElementById('o3').textContent=btoa(unescape(encodeURIComponent(v)))}
document.querySelectorAll('.out').forEach(o=>o.onclick=()=>{navigator.clipboard.writeText(o.textContent).then(()=>{const s=o.textContent;o.textContent='✓ Copied!';setTimeout(()=>o.textContent=s,800)})});
<\/script></body></html>`

// ==================================================
// WEB SEARCH
// ==================================================
const searchWeb = async (query) => {
  try {
    const r = await fetch(TAVILY_URL, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${TAVILY_API_KEY}` }, body: JSON.stringify({ query, search_depth: 'advanced', include_answer: true, max_results: 6 }) })
    if (!r.ok) throw new Error(`HTTP ${r.status}`)
    const d = await r.json()
    const results = d.results || []
    const safe = results.find(x => { try { const h = new URL(x.url).hostname; return /wikipedia|britannica|github|stackoverflow|mozilla|python|reactjs|gov|edu/.test(h) } catch { return false } }) || results[0]
    return { answer: d.answer || results.map(x => x.content).join('\n\n') || 'No results.', safestUrl: safe?.url }
  } catch (e) { return { error: e.message } }
}
const openAnonymous = (q) => window.open(`https://duckduckgo.com/?q=${encodeURIComponent(q)}&kae=d`, '_blank', 'noopener,noreferrer')

// ==================================================
// WEATHER
// ==================================================
const fetchWeather = async (lat, lon) => {
  try {
    const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`)
    const d = await r.json()
    return { temp: d.current?.temperature_2m, code: d.current?.weather_code }
  } catch (e) { return null }
}

// ==================================================
// MUSIC SYNTH
// ==================================================
const MUSIC_STYLES = {
  love: { scale: 'major', bpm: 78 }, pink: { scale: 'major', bpm: 100 },
  sad: { scale: 'minor', bpm: 68 }, happy: { scale: 'major', bpm: 128 },
  chill: { scale: 'pentatonic', bpm: 88 }, epic: { scale: 'minor', bpm: 140 },
  default: { scale: 'major', bpm: 118 },
}
const guessMusicStyle = (d) => {
  const x = (d || '').toLowerCase()
  for (const k of Object.keys(MUSIC_STYLES)) if (x.includes(k)) return { ...MUSIC_STYLES[k], name: k }
  return { ...MUSIC_STYLES.default, name: 'balanced' }
}
const m2hz = (m) => 440 * Math.pow(2, (m - 69) / 12)
const kick = (c, t, dst) => { const o = c.createOscillator(), g = c.createGain(); o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(40, t + 0.15); g.gain.setValueAtTime(0.9, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.25); o.connect(g).connect(dst); o.start(t); o.stop(t + 0.3) }
const snare = (c, t, dst) => { const b = c.createBuffer(1, c.sampleRate * 0.2, c.sampleRate); const d = b.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 2); const s = c.createBufferSource(); s.buffer = b; const hp = c.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 1000; const g = c.createGain(); g.gain.value = 0.6; s.connect(hp).connect(g).connect(dst); s.start(t) }
const hihat = (c, t, dst, open = false) => { const b = c.createBuffer(1, c.sampleRate * (open ? 0.3 : 0.06), c.sampleRate); const d = b.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; const s = c.createBufferSource(); s.buffer = b; const hp = c.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 7000; const g = c.createGain(); g.gain.setValueAtTime(0.3, t); g.gain.exponentialRampToValueAtTime(0.001, t + (open ? 0.25 : 0.05)); s.connect(hp).connect(g).connect(dst); s.start(t) }
const bassNote = (c, t, dur, f, dst) => { const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f; const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 500; const g = c.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.5, t + 0.02); g.gain.exponentialRampToValueAtTime(0.001, t + dur); o.connect(lp).connect(g).connect(dst); o.start(t); o.stop(t + dur + 0.05) }
const leadNote = (c, t, dur, f, dst) => { const o = c.createOscillator(); o.type = 'triangle'; o.frequency.value = f; const v = c.createOscillator(); v.frequency.value = 5; const vg = c.createGain(); vg.gain.value = 3; v.connect(vg).connect(o.frequency); const g = c.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.28, t + 0.03); g.gain.exponentialRampToValueAtTime(0.001, t + dur); o.connect(g).connect(dst); o.start(t); v.start(t); o.stop(t + dur + 0.1); v.stop(t + dur + 0.1) }
function generateRichMelody(bpm, scale, bars) {
  const scales = { major: [0,2,4,5,7,9,11], minor: [0,2,3,5,7,8,10], pentatonic: [0,2,4,7,9] }
  const s = scales[scale] || scales.major
  const beat = 60 / bpm
  const notes = []
  for (let b = 0; b < bars * 4; b++) {
    if (Math.random() < 0.15) { notes.push({ t: b * beat, freq: 0, dur: beat * 0.5 }); continue }
    const deg = s[Math.floor(Math.random() * s.length)]
    const oct = Math.random() < 0.3 ? 12 : 0
    notes.push({ t: b * beat, freq: m2hz(60 + deg + oct), dur: beat * (Math.random() < 0.3 ? 1 : 0.5) })
  }
  return notes
}
function playRichMelody(notes, quality = 'medium', bpm = 120) {
  const Ctx = window.AudioContext || window.webkitAudioContext
  if (!Ctx) throw new Error('Web Audio not supported')
  const ctx = new Ctx()
  const master = ctx.createGain(); master.gain.value = 0.7; master.connect(ctx.destination)
  const dbus = ctx.createGain(); dbus.gain.value = quality === 'low' ? 0.4 : 0.7; dbus.connect(master)
  const mbus = ctx.createGain(); mbus.gain.value = 0.8; mbus.connect(master)
  const beat = 60 / bpm
  const start = ctx.currentTime + 0.05
  const totalBars = Math.ceil(notes.length / 4)
  for (let b = 0; b < totalBars * 4; b++) {
    const t = start + b * beat
    if (b % 4 === 0 || b % 4 === 2) kick(ctx, t, dbus)
    if (b % 4 === 1 || b % 4 === 3) snare(ctx, t, dbus)
    hihat(ctx, t, dbus, b % 4 === 3)
    hihat(ctx, t + beat / 2, dbus, false)
  }
  notes.forEach(n => {
    if (!n.freq) return
    const t = start + n.t
    leadNote(ctx, t, n.dur, n.freq, mbus)
    if (quality !== 'low' && Math.random() < 0.4) bassNote(ctx, t, beat * 0.9, n.freq / 2, mbus)
  })
  const totalDur = notes.reduce((m, n) => Math.max(m, n.t + n.dur), 0) + 1
  return { ctx, duration: totalDur }
}

// ==================================================
// VIDEO ENGINE
// ==================================================
const VIDEO_STYLES = {
  anime: { palette: ['#ffb6d5','#ff4f9a','#ffffff','#ffd1e8'], label: 'Anime', scene: 'sakura' },
  movie: { palette: ['#0b0b0b','#1a1a2e','#ffcc00','#e94560'], label: 'Cinematic', scene: 'movie' },
  cartoon: { palette: ['#ffe066','#ff6b6b','#4ecdc4','#a8e6cf'], label: 'Cartoon', scene: 'cartoon' },
  cyber: { palette: ['#00ff41','#008f11','#0d0208','#ff003c'], label: 'Cyberpunk', scene: 'matrix' },
  nature: { palette: ['#2ecc71','#27ae60','#f39c12','#a8e6cf'], label: 'Nature', scene: 'nature' },
  space: { palette: ['#000','#1a0033','#ff00ff','#00ffff'], label: 'Space', scene: 'space' },
  abstract: { palette: ['#ff003c','#ff69b4','#ffa500','#00ffff'], label: 'Abstract', scene: 'blobs' },
  default: { palette: ['#ff003c','#ff6688','#ffa500','#ffff00'], label: 'Default', scene: 'particles' },
}
const guessVideoStyle = (d) => {
  const x = (d || '').toLowerCase()
  for (const k of Object.keys(VIDEO_STYLES)) if (x.includes(k)) return VIDEO_STYLES[k]
  return VIDEO_STYLES.default
}
function drawWatermark(ctx, W, H, text) {
  ctx.save(); ctx.font = 'bold 14px monospace'; ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.textAlign = 'right'; ctx.fillText(text, W - 12, H - 12)
  ctx.font = '11px monospace'; ctx.fillStyle = 'rgba(255,0,60,0.75)'; ctx.fillText(VERSION, W - 12, H - 28); ctx.restore()
}
function startCanvasVideo(canvas, style, userDesc, wm, onProgress) {
  const ctx = canvas.getContext('2d'); const W = canvas.width, H = canvas.height
  let t = 0, raf; const stream = canvas.captureStream(30)
  const pal = style.palette, scene = style.scene
  const parts = Array.from({ length: 120 }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2, r: Math.random() * 4 + 1, rot: Math.random() * Math.PI * 2, c: pal[Math.floor(Math.random() * pal.length)] }))
  const stars = Array.from({ length: 100 }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.6 + 0.3 }))
  const draw = () => {
    t += 0.03
    if (scene === 'matrix') { ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); ctx.font = '14px monospace'; for (let i = 0; i < 40; i++) { const x = i * W / 40, y = ((t * 60 + i * 30) % H); ctx.fillStyle = `rgba(0,255,65,${0.3 + Math.random() * 0.6})`; ctx.fillText(String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96)), x, y) } }
    else if (scene === 'space') { const g = ctx.createRadialGradient(W/2,H/2,20,W/2,H/2,W); g.addColorStop(0,'#1a0033'); g.addColorStop(1,'#000'); ctx.fillStyle = g; ctx.fillRect(0,0,W,H); stars.forEach(s => { ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fillStyle = `rgba(255,255,255,${0.3+Math.random()*0.7})`; ctx.fill(); s.x -= 0.15; if (s.x < 0) s.x = W }); const px = W/2 + Math.sin(t)*30, py = H/2; const pg = ctx.createRadialGradient(px-15,py-15,5,px,py,60); pg.addColorStop(0,'#ff00ff'); pg.addColorStop(1,'#330033'); ctx.beginPath(); ctx.arc(px,py,55,0,Math.PI*2); ctx.fillStyle = pg; ctx.fill() }
    else if (scene === 'movie') { ctx.fillStyle = '#0b0b0b'; ctx.fillRect(0,0,W,H); ctx.fillStyle = '#000'; ctx.fillRect(0,0,W,H*0.12); ctx.fillRect(0,H*0.88,W,H*0.12); const creds = ['CYPHER4X PRODUCTIONS','directed by You','cinematography · AI','A CYPHER4X FILM']; ctx.font = '14px monospace'; ctx.textAlign = 'center'; creds.forEach((l, i) => { const y = (t*40+i*40)%H; if (y > H*0.15 && y < H*0.85) { ctx.fillStyle = i === 0 ? '#ffcc00' : 'rgba(255,255,255,0.8)'; ctx.fillText(l, W/2, y) } }) }
    else if (scene === 'sakura') { const g = ctx.createLinearGradient(0,0,0,H); g.addColorStop(0,'#ffb6d5'); g.addColorStop(1,'#ff4f9a'); ctx.fillStyle = g; ctx.fillRect(0,0,W,H); parts.forEach(p => { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.beginPath(); ctx.ellipse(0,0,p.r*2.5,p.r,0,0,Math.PI*2); ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.fill(); ctx.restore(); p.y += 1.2; p.x += Math.sin(t + p.y * 0.05) * 0.8; p.rot += 0.02; if (p.y > H) { p.y = -10; p.x = Math.random() * W } }) }
    else { const g = ctx.createLinearGradient(0,0,W,H); g.addColorStop(0, pal[0]); g.addColorStop(1, pal[1] || pal[0]); ctx.fillStyle = g; ctx.fillRect(0,0,W,H); parts.forEach(p => { ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle = p.c; ctx.fill(); p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1 }) }
    ctx.save(); ctx.textAlign = 'center'; ctx.font = 'bold 42px sans-serif'; ctx.fillStyle = 'rgba(255,255,255,0.95)'; ctx.shadowColor = 'rgba(0,0,0,0.7)'; ctx.shadowBlur = 12; ctx.fillText('CYPHER4X', W/2, H/2 - 8); ctx.font = '16px sans-serif'; ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.fillText(style.label + ' Style', W/2, H/2 + 22); ctx.restore()
    drawWatermark(ctx, W, H, wm || 'CYPHER4X')
    onProgress && onProgress(t)
    raf = requestAnimationFrame(draw)
  }
  draw()
  const recorder = new MediaRecorder(stream, { mimeType: 'video/webm', videoBitsPerSecond: 2500000 })
  const chunks = []
  recorder.ondataavailable = e => e.data.size > 0 && chunks.push(e.data)
  recorder.start()
  return { stop: () => new Promise(res => { recorder.onstop = () => res(new Blob(chunks, { type: 'video/webm' })); cancelAnimationFrame(raf); recorder.stop() }) }
}

// ==================================================
// COLOR HELPERS
// ==================================================
function hexA(hex, a) {
  if (!hex || !hex.startsWith('#')) return hex
  const r = parseInt(hex.slice(1,3), 16), g = parseInt(hex.slice(3,5), 16), b = parseInt(hex.slice(5,7), 16)
  return `rgba(${r},${g},${b},${a})`
}
function lightenColor(hex) {
  if (!hex || !hex.startsWith('#')) return hex
  const r = Math.min(255, parseInt(hex.slice(1,3),16) + 70)
  const g = Math.min(255, parseInt(hex.slice(3,5),16) + 70)
  const b = Math.min(255, parseInt(hex.slice(5,7),16) + 70)
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`
}
function darkenColor(hex) {
  if (!hex || !hex.startsWith('#')) return hex
  const r = Math.max(0, parseInt(hex.slice(1,3),16) - 60)
  const g = Math.max(0, parseInt(hex.slice(3,5),16) - 60)
  const b = Math.max(0, parseInt(hex.slice(5,7),16) - 60)
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`
}

// ==================================================
// RED BALL
// ==================================================
const RedBall = ({ isSpeaking = false, theme = {}, size = 180 }) => {
  const c = theme.ballColor || '#ff003c'
  const c2 = theme.ballColorLight || lightenColor(c)
  const c3 = theme.ballColorDark || darkenColor(c)
  const scale = size / 180
  return (
    <div style={{...styles.ballContainer, width: 300 * scale, height: 300 * scale}}>
      <div style={{ ...styles.ring1, width: 240*scale, height: 240*scale, marginLeft: -120*scale, marginTop: -120*scale, borderColor: hexA(c, 0.25) }} />
      <div style={{ ...styles.ring2, width: 280*scale, height: 280*scale, marginLeft: -140*scale, marginTop: -140*scale, borderColor: hexA(c, 0.12) }} />
      <div style={{ ...styles.ring3, width: 200*scale, height: 200*scale, marginLeft: -100*scale, marginTop: -100*scale, borderColor: hexA(c, 0.15) }} />
      <div style={styles.ball3DContainer}>
        <div style={{
          ...styles.ball3D,
          width: size, height: size,
          background: `radial-gradient(circle at 30% 25%, ${hexA(c2, 0.9)} 0%, transparent 45%), radial-gradient(circle at 40% 35%, ${c2} 0%, ${c} 25%, ${c} 50%, ${c3} 75%, ${darkenColor(c3)} 100%)`,
          boxShadow: `inset -20px -20px 40px ${hexA(c3, 0.8)}, inset 15px 15px 30px ${hexA(c2, 0.4)}, 0 0 50px ${hexA(c, 0.5)}, 0 0 100px ${hexA(c, 0.3)}`,
          ...(isSpeaking ? { animation: 'ballShake 0.35s ease-in-out infinite' } : {})
        }}>
          <div style={styles.ballHighlight} />
          <div style={styles.ballInnerGlow} />
        </div>
      </div>
    </div>
  )
}

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
  const [profileForm, setProfileForm] = useState({ name: '', username: '', avatar: '', bio: '' })
  const [editingProfile, setEditingProfile] = useState(false)

  const [showIntro, setShowIntro] = useState(true)
  const [introStep, setIntroStep] = useState(0)

  const [isBooting, setIsBooting] = useState(false)
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
  const [workspaceLogs, setWorkspaceLogs] = useState([{ type: 'system', text: 'Workspace initialized. Awaiting command...' }])

  const [showPracticalWorkspace, setShowPracticalWorkspace] = useState(false)
  const [practicalBg, setPracticalBg] = useState('#ffffff')
  const [practicalLogs, setPracticalLogs] = useState([
    { id: 1, role: 'ai', type: 'text', content: 'Hello! I am your Practical Workspace AI. I can create apps, games, tools, images — all built and ready to use. Just tell me what you want.' }
  ])
  const [practicalInput, setPracticalInput] = useState('')
  const [practicalProcessing, setPracticalProcessing] = useState(false)
  const [practicalActionText, setPracticalActionText] = useState('')
  const [practicalBuildState, setPracticalBuildState] = useState(null)
  const [practicalBuildTimer, setPracticalBuildTimer] = useState(0)
  const [practicalBuildDetails, setPracticalBuildDetails] = useState({ type: '', lang: '' })

  const [theme, setTheme] = useState({
    primary: '#ff003c',
    secondary: '#000000',
    ballColor: '#ff003c',
    ballColorLight: '#ff6688',
    ballColorDark: '#990022',
    backgroundImage: null,
  })

  const [settings, setSettings] = useState({
    welcomeEnabled: true, autoStartVoice: true, voiceSpeed: 1,
    secretMode: false, overlayButton: false, safeLinks: true, autoScroll: true, haptic: true,
    soundFx: false, showTimestamps: true, typingIndicator: true, readAloud: false,
    highContrast: false, compactMode: false, codeAutoOverview: true, confirmDelete: true,
    restrictTools: true,
    locationEnabled: false,
  })

  const [now, setNow] = useState(new Date())
  const [weather, setWeather] = useState(null)

  const [chats, setChats] = useState(() => {
    if (typeof window === 'undefined') return [{ id: 'default-' + Date.now(), title: 'Chat 1', messages: [], createdAt: Date.now() }]
    const saved = localStorage.getItem('cypher4x_chats')
    return saved ? JSON.parse(saved) : [{ id: 'default-' + Date.now(), title: 'Chat 1', messages: [], createdAt: Date.now() }]
  })
  const [activeChatId, setActiveChatId] = useState(() => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('cypher4x_active_chat') || null
  })
  const conversation = chats.find(c => c.id === activeChatId)?.messages || []
  const setConversation = (updater) => {
    setChats(prev => prev.map(c => {
      if (c.id !== activeChatId) return c
      const newMessages = typeof updater === 'function' ? updater(c.messages) : updater
      return { ...c, messages: newMessages }
    }))
  }

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
  const [stats, setStats] = useState({ uptime: 0, cpuUsage: 0, cpuTemp: 0, ramUsage: 0, storageUsed: 0, networkSpeed: 0 })
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
  const [videoRecording, setVideoRecording] = useState(false)
  const [videoProgress, setVideoProgress] = useState(0)
  const canvasRef = useRef(null); const videoRecorderRef = useRef(null)

  const [showCyberLab, setShowCyberLab] = useState(false); const [cyberTab, setCyberTab] = useState('terminal')
  const [cyberInput, setCyberInput] = useState(''); const [cyberLines, setCyberLines] = useState([
    { type: 'info', text: `${VERSION_FULL} Terminal — type "help" for commands` },
    { type: 'info', text: '⚠️ Simulated shell. Educational use only.' },
  ])
  const [cyberToolOutput, setCyberToolOutput] = useState(''); const [cyberTool, setCyberTool] = useState('passcheck')
  const [cyberToolInput, setCyberToolInput] = useState(''); const [ctfChallenge, setCtfChallenge] = useState(null)
  const cyberEndRef = useRef(null)

  const synthRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null)
  const recognitionRef = useRef(null); const msgCounter = useRef(0)
  const fileInputRef = useRef(null); const bgInputRef = useRef(null); const chatEndRef = useRef(null)
  const workspaceEndRef = useRef(null)
  const practicalEndRef = useRef(null)

  const hasGreeted = useRef(false)

  const playBeep = useCallback((f = 800, d = 0.08) => {
    if (!settings.soundFx) return
    try { const C = window.AudioContext || window.webkitAudioContext; if (!C) return; const c = new C(); const o = c.createOscillator(); const g = c.createGain(); o.frequency.value = f; o.type = 'sine'; g.gain.setValueAtTime(0.1, c.currentTime); g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + d); o.connect(g).connect(c.destination); o.start(); o.stop(c.currentTime + d) } catch {}
  }, [settings.soundFx])
  const vibrate = useCallback((p = 10) => { if (!settings.haptic) return; try { navigator.vibrate && navigator.vibrate(p) } catch {} }, [settings.haptic])

  // speakText moved above effects that reference it
  const speakText = useCallback((text, onEnd = null) => {
    if (!text || !synthRef.current) return
    try {
      synthRef.current.cancel()
      const u = new SpeechSynthesisUtterance(text.replace(/[*_`#]/g, ''))
      u.rate = settings.voiceSpeed || 0.95
      u.pitch = voiceGender === 'male' ? 0.7 : 1.0
      const voices = synthRef.current.getVoices()
      const preferred = voices.find(v => v.name.includes('Google US English') || (voiceGender === 'male' && v.name.includes('David'))) || voices.find(v => v.lang === 'en-US')
      if (preferred) u.voice = preferred
      u.onstart = () => setIsAISpeaking(true)
      u.onend = () => { setIsAISpeaking(false); if (onEnd) onEnd() }
      u.onerror = () => { setIsAISpeaking(false); if (onEnd) onEnd() }
      synthRef.current.speak(u)
    } catch { setIsAISpeaking(false); if (onEnd) onEnd() }
  }, [settings.voiceSpeed, voiceGender])

  // ==================================================
  // INTRO / BOOT
  // ==================================================
  useEffect(() => {
    if (!showIntro) return
    const t1 = setTimeout(() => setIntroStep(1), 1000)
    const t2 = setTimeout(() => setIntroStep(2), 3500)
    const t3 = setTimeout(() => { setShowIntro(false); setIsBooting(false); setIsEnteringAI(true) }, 6000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [showIntro])

  useEffect(() => {
    if (!isEnteringAI) return
    setEnterProgress(0); setEnterMessage('Updating...')
    const messages = [
      { at: 0, text: 'Updating...' }, { at: 25, text: 'Loading engine...' },
      { at: 50, text: 'Syncing data...' }, { at: 75, text: 'Almost ready...' }, { at: 95, text: 'Welcome!' },
    ]
    const start = Date.now(), duration = 12000
    const interval = setInterval(() => {
      const pct = Math.min(((Date.now() - start) / duration) * 100, 100)
      setEnterProgress(pct)
      let cur = messages[0].text
      for (const m of messages) { if (pct >= m.at) cur = m.text }
      setEnterMessage(cur)
      if (pct >= 100) { clearInterval(interval); setIsEnteringAI(false) }
    }, 100)
    return () => clearInterval(interval)
  }, [isEnteringAI])

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (!settings.locationEnabled || !navigator.geolocation) return
    const grab = () => navigator.geolocation.getCurrentPosition(async (pos) => { const w = await fetchWeather(pos.coords.latitude, pos.coords.longitude); if (w) setWeather(w) }, () => {}, { timeout: 5000 })
    grab()
    const refresh = setInterval(grab, 600000)
    return () => clearInterval(refresh)
  }, [settings.locationEnabled])

  useEffect(() => { try { localStorage.setItem('cypher4x_chats', JSON.stringify(chats)) } catch {} }, [chats])
  useEffect(() => { if (activeChatId) try { localStorage.setItem('cypher4x_active_chat', activeChatId) } catch {} }, [activeChatId])
  useEffect(() => { if (!activeChatId && chats.length > 0) setActiveChatId(chats[0].id) }, [chats, activeChatId])
  useEffect(() => { if (settings.autoScroll && showChatOverview) chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [conversation, showChatOverview, settings.autoScroll])
  useEffect(() => { cyberEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [cyberLines])
  useEffect(() => { workspaceEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [workspaceLogs, workspaceTasks])
  useEffect(() => { practicalEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [practicalLogs])

  useEffect(() => {
    const t = setInterval(() => {
      setStats(p => ({ ...p, uptime: Math.floor((Date.now() - APP_START_TIME)/1000), cpuUsage: Math.floor(Math.random()*30)+10, cpuTemp: Math.floor(Math.random()*20)+55, ramUsage: Math.floor(Math.random()*4)+3.5, storageUsed: Math.floor(Math.random()*50)+120, networkSpeed: (Math.random()*5+0.5).toFixed(2) }))
    }, 3000)
    return () => clearInterval(t)
  }, [])

  // ==================================================
  // AUTH
  // ==================================================
  const handleAuthSubmit = () => {
    if (!email || !pin || pin.length !== 4 || !/^\d{4}$/.test(pin)) { setAuthError('Valid email + 4-digit PIN required.'); return }
    if (showLogin) { if (userExists(email, pin)) { loginUser(email, pin); setShowAuthModal(false) } else setAuthError('No account found.') }
    else {
      if (userExists(email, pin)) { setAuthError('Account exists.'); return }
      addUser(email, pin)
      saveUserData(email, pin, { profile: null, chats: [{ id: 'chat-' + Date.now(), title: 'Chat 1', messages: [], createdAt: Date.now() }], commandHistory: [], backgroundImage: null, theme, settings })
      loginUser(email, pin); setShowAuthModal(false)
    }
  }
  const loginUser = (e, p) => { saveAuth(e, p); setUserMode('loggedin'); loadUserDataByEmail(e, p); setAuthError(''); setGuestMessageCount(0); hasGreeted.current = false }
  const loadUserDataByEmail = (e, p) => {
    const d = loadUserData(e, p)
    if (d) {
      setProfile(d.profile || null); setCommandHistory(d.commandHistory || [])
      setBackgroundImage(d.backgroundImage || null)
      if (d.theme) setTheme(d.theme)
      if (d.settings) setSettings({ ...settings, ...d.settings })
      if (d.chats && d.chats.length) { setChats(d.chats); setActiveChatId(d.activeChatId || d.chats[0].id) }
    }
  }
  const saveCurrentUserData = () => {
    if (userMode !== 'loggedin') return
    saveUserData(email, pin, { profile, chats, activeChatId, commandHistory, backgroundImage, theme, settings })
  }
  useEffect(() => { if (userMode === 'loggedin') saveCurrentUserData() }, [profile, chats, activeChatId, commandHistory, backgroundImage, theme, settings])

  const handleLogout = () => {
    if (!confirm('Logout?')) return
    clearAuth(); setUserMode('guest'); setProfile(null); setChats([{ id: 'default-' + Date.now(), title: 'Chat 1', messages: [], createdAt: Date.now() }])
    setCommandHistory([]); setSidebarOpen(false); setGuestMessageCount(0); setShowAuthModal(false); msgCounter.current = 0
    hasGreeted.current = false
  }
  const incrementGuestMessage = () => { if (userMode !== 'guest') return; const n = guestMessageCount + 1; setGuestMessageCount(n); if (n >= 5) setShowGuestLimit(true) }

  const requireLogin = (featureName) => {
    if (!TOOLS_ENABLED) { alert(`🔒 ${featureName} is not yet available.`); return false }
    if (settings.restrictTools && userMode !== 'loggedin') { alert(`🔒 ${featureName} is restricted.\n\nPlease login or sign up.`); return false }
    return true
  }

  useEffect(() => {
    if (!isBooting && !isEnteringAI && !hasGreeted.current && activeChatId && !showIntro) {
      hasGreeted.current = true
      const name = profile?.name || (userMode === 'guest' ? 'Guest' : 'there')
      const greeting = `Hello ${name}! 👋 I am CYPHER4X. How can I help?`
      setConversation(prev => prev.length === 0 ? [{ id: ++msgCounter.current, role: 'assistant', content: greeting, time: Date.now() }] : prev)
      if (settings.readAloud || settings.autoStartVoice) speakText(greeting)
    }
  }, [isBooting, isEnteringAI, activeChatId, showIntro])

  // ==================================================
  // CHAT MGMT
  // ==================================================
  const createNewChat = () => {
    const newChat = { id: 'chat-' + Date.now(), title: 'Chat ' + (chats.length + 1), messages: [], createdAt: Date.now() }
    setChats(prev => [newChat, ...prev]); setActiveChatId(newChat.id)
    setChatOverviewInput(''); setReplyingTo(null); setShowChatMenu(false)
  }
  const switchChat = (chatId) => { setActiveChatId(chatId); setChatOverviewInput(''); setReplyingTo(null); setShowChatMenu(false) }
  const renameChat = (chatId) => {
    const chat = chats.find(c => c.id === chatId); if (!chat) return
    const newTitle = prompt('Rename chat:', chat.title)
    if (newTitle && newTitle.trim()) setChats(prev => prev.map(c => c.id === chatId ? { ...c, title: newTitle.trim() } : c))
    setShowChatMenu(false)
  }
  const deleteChat = (chatId) => {
    if (chats.length <= 1) { alert('Need at least one chat.'); return }
    if (!confirm('Delete this chat?')) return
    const remaining = chats.filter(c => c.id !== chatId)
    setChats(remaining)
    if (activeChatId === chatId) setActiveChatId(remaining[0].id)
    setShowChatMenu(false)
  }
  const clearConversation = useCallback(() => setConversation([]), [activeChatId])

  // ==================================================
  // SPEECH RECOGNITION
  // ==================================================
  const setupSpeechRecognition = useCallback((isOneOff = false, onFinal = null) => {
    if (typeof window === 'undefined') return null
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) { alert('Speech not supported.'); return null }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    const r = new SR(); r.continuous = !isOneOff; r.interimResults = true; r.lang = 'en-US'
    r.onstart = () => { setIsListening(true); setInterimTranscript('') }
    r.onend = () => { setIsListening(false); setInterimTranscript(''); if (!isOneOff && isFullscreenCall) try { r.start() } catch {} }
    r.onerror = (e) => { if (e.error === 'not-allowed') { alert('Allow mic.'); setIsFullscreenCall(false); setIsCallActive(false); setRecordingMode(false); setIsListening(false); return } if (!isOneOff && isFullscreenCall) setTimeout(() => { try { r.start() } catch {} }, 500) }
    r.onresult = async (e) => {
      let f = '', i = ''
      for (let k = e.resultIndex; k < e.results.length; k++) { const res = e.results[k]; if (res.isFinal) f += res[0].transcript; else i += res[0].transcript }
      if (f) { setInterimTranscript(''); setRecordingMode(false); if (onFinal) onFinal(f); else await processUserQuery(f) }
      else if (i) setInterimTranscript(i)
    }
    return r
  }, [isFullscreenCall])

  const getDashboardInfo = () => {
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
    return {
      date: `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`,
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      day: days[now.getDay()],
      temp: weather?.temp != null ? `${weather.temp}°C` : null,
    }
  }

  // ==================================================
  // WORKSPACE (legacy)
  // ==================================================
  const addWorkspaceTask = (text) => {
    const id = Date.now() + Math.random()
    setWorkspaceTasks(prev => [...prev, { id, text, status: 'pending', progress: 0 }])
    return id
  }
  const updateWorkspaceTask = (id, updates) => setWorkspaceTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t))
  const removeWorkspaceTask = (id) => setTimeout(() => setWorkspaceTasks(prev => prev.filter(t => t.id !== id)), 2000)
  const processWorkspaceCommand = async (cmdText) => {
    if (!cmdText.trim() || workspaceProcessing) return
    setWorkspaceProcessing(true)
    setWorkspaceLogs(prev => [...prev, { type: 'user', text: cmdText }])
    setWorkspaceCommand('')
    const l = cmdText.toLowerCase()
    if (l.includes('image') || l.includes('picture') || l.includes('3d') || l.includes('draw')) {
      const t1 = addWorkspaceTask('Analyzing visual request...'); await new Promise(r => setTimeout(r, 500)); updateWorkspaceTask(t1, { status: 'done', progress: 100 })
      const t2 = addWorkspaceTask('Generating image...'); setWorkspaceActiveTab('canvas')
      const imageUrl = 'https://source.unsplash.com/600x400/?abstract'
      setWorkspaceContent({ type: '3d', data: { title: 'Generated: ' + cmdText.slice(0, 30), image: imageUrl } })
      await new Promise(r => setTimeout(r, 1500)); updateWorkspaceTask(t2, { status: 'done', progress: 100 }); removeWorkspaceTask(t2)
      setWorkspaceLogs(prev => [...prev, { type: 'ai', text: `Generated image on Canvas tab.` }])
      speakText("Image ready on the workspace canvas.")
    } else if (l.includes('game') || l.includes('code') || l.includes('script') || l.includes('program')) {
      const t1 = addWorkspaceTask('Writing code...')
      const lang = detectLanguage(cmdText)
      const code = generateLongCode(lang, cmdText, '')
      setWorkspaceContent({ type: 'code', data: { lang, code } })
      setWorkspaceActiveTab('code')
      await new Promise(r => setTimeout(r, 1000)); updateWorkspaceTask(t1, { status: 'done', progress: 100 })
      setWorkspaceLogs(prev => [...prev, { type: 'ai', text: `Code ready:\n\n\`\`\`${lang}\n${code}\n\`\`\`` }])
      speakText("I have written the code.")
    } else {
      await new Promise(r => setTimeout(r, 500))
      setWorkspaceLogs(prev => [...prev, { type: 'ai', text: `Received: "${cmdText}".` }])
      speakText("Command received.")
    }
    setWorkspaceProcessing(false)
  }
  const handleWorkspaceSubmit = (e) => { if (e) e.preventDefault(); processWorkspaceCommand(workspaceCommand) }
  const handleWorkspaceVoice = () => {
    if (isRecording) return
    const r = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
    r.continuous = false; r.interimResults = false; r.lang = 'en-US'
    r.onstart = () => { setIsRecording(true); setWorkspaceLogs(prev => [...prev, { type: 'system', text: 'Listening...' }]) }
    r.onend = () => setIsRecording(false)
    r.onerror = (e) => { setIsRecording(false); setWorkspaceLogs(prev => [...prev, { type: 'system', text: 'Voice error: ' + e.error }]) }
    r.onresult = (e) => processWorkspaceCommand(e.results[0][0].transcript)
    r.start()
  }

  // ==================================================
  // PRACTICAL WORKSPACE
  // ==================================================
  const processPracticalCommand = async (cmdText) => {
    if (!cmdText.trim() || practicalProcessing) return
    setPracticalLogs(prev => [...prev, { id: Date.now(), role: 'user', type: 'text', content: cmdText, time: Date.now() }])
    setPracticalInput('')
    const l = cmdText.toLowerCase()

    if (practicalBuildState === 'awaiting_lang') {
      setPracticalBuildState(null)
      return runDirectBuild(practicalBuildDetails.type + ' in ' + cmdText, cmdText)
    }

    if (isPureGreeting(cmdText)) {
      const r = "Hello! 👋 Ready to build. What do you want to make?"
      setPracticalLogs(prev => [...prev, { id: Date.now(), role: 'ai', type: 'text', content: r }])
      speakText(r); return
    }
    if (/how are you/.test(l)) {
      const r = "I'm running perfectly. What shall we create today?"
      setPracticalLogs(prev => [...prev, { id: Date.now(), role: 'ai', type: 'text', content: r }])
      speakText(r); return
    }
    if (/your name|who are you/.test(l)) {
      const r = "I'm CYPHER4X — your AI builder. I make apps, games, tools, and images."
      setPracticalLogs(prev => [...prev, { id: Date.now(), role: 'ai', type: 'text', content: r }])
      speakText(r); return
    }

    await runDirectBuild(cmdText, null)
  }

  const runDirectBuild = async (desc, forcedLang) => {
    setPracticalProcessing(true)
    const intent = detectIntent(desc)
    const labelMap = { app: 'app', game: 'game', tool: 'tool', image: 'image', code: 'source code' }
    const label = labelMap[intent] || 'app'
    setPracticalActionText(`Building your ${label}...`)
    setPracticalLogs(prev => [...prev, { id: Date.now(), role: 'ai', type: 'text', content: `⚙️ Building your ${label}...\n\nAlmost ready...` }])

    await new Promise(r => setTimeout(r, 1200))

    let artifact
    try {
      artifact = buildPracticalArtifact(desc, forcedLang)
    } catch (e) {
      artifact = { title: 'Build error', type: 'text', content: 'Build failed: ' + e.message }
    }

    setPracticalLogs(prev => [...prev, { id: Date.now(), role: 'ai', type: 'artifact', content: artifact, time: Date.now() }])
    speakText(`Your ${label} is ready. You can download it or open in a new tab.`)
    setPracticalProcessing(false)
    setPracticalActionText('')
  }

  const handlePracticalDelete = (id) => {
    if (!confirm('Delete this message?')) return
    setPracticalLogs(prev => prev.filter(l => l.id !== id))
  }

  const handlePracticalEdit = (log) => {
    const nc = prompt('Edit message:', log.content)
    if (nc === null || !nc.trim() || nc === log.content) return
    setPracticalLogs(prev => prev.map(l => l.id === log.id ? { ...l, content: nc.trim() } : l))
  }

  const downloadBlob = (blob, name) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = name; a.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  const handleArtifactDownload = (artifact) => {
    if (artifact.type === 'image') { window.open(artifact.url, '_blank'); return }
    if (artifact.type === 'code') {
      const ext = { javascript: 'js', typescript: 'ts', python: 'py', java: 'java', csharp: 'cs', cpp: 'cpp', rust: 'rs', go: 'go', swift: 'swift', kotlin: 'kt', react: 'jsx', html: 'html', sql: 'sql' }[artifact.lang] || 'txt'
      downloadBlob(new Blob([artifact.code], { type: 'text/plain' }), `${artifact.title.toLowerCase().replace(/\s+/g,'_')}.${ext}`)
      return
    }
    if (artifact.html) {
      downloadBlob(new Blob([artifact.html], { type: 'text/html' }), `${artifact.title.toLowerCase().replace(/\s+/g,'_')}.html`)
    }
  }

  const openArtifactInTab = (artifact) => {
    if (artifact.type === 'image') { window.open(artifact.url, '_blank'); return }
    if (!artifact.html) return
    const blob = new Blob([artifact.html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
    setTimeout(() => URL.revokeObjectURL(url), 60000)
  }

  const handlePracticalSubmit = (e) => { if (e) e.preventDefault(); processPracticalCommand(practicalInput) }
  const handlePracticalVoice = () => {
    if (isRecording) return
    const r = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
    r.continuous = false; r.interimResults = false; r.lang = 'en-US'
    r.onstart = () => setIsRecording(true)
    r.onend = () => setIsRecording(false)
    r.onerror = (e) => { setIsRecording(false); alert('Voice error: ' + e.error) }
    r.onresult = (e) => processPracticalCommand(e.results[0][0].transcript)
    r.start()
  }

  // ==================================================
  // MAIN CHAT
  // ==================================================
  const executeCommand = (q) => {
    const l = q.toLowerCase().trim()
    if (l.includes('whatsapp business')) { const g = q.match(/group(?:\s+named)?\s+(.+)/i); if (g) return { response: openWhatsAppGroup(g[1].trim()) }; return { response: openApp('whatsappbusiness') } }
    const wg = l.match(/(?:open\s+)?(?:my\s+)?whatsapp.*group(?:\s+named)?\s+(.+)/i); if (wg) return { response: openWhatsAppGroup(wg[1].trim()) }
    const am = l.match(/^open\s+(?:my\s+)?(whatsapp|instagram|facebook|telegram|youtube|spotify|gmail|maps|github)(?:\s+(?:on\s+my\s+device)?)?(?:\s+and\s+open\s+my\s+group\s+named\s+(.+))?$/i)
    if (am) { const k = am[1], g = am[2]; if (k === 'whatsapp' && g) return { response: openWhatsAppGroup(g) }; return { response: openApp(k) } }
    if ((l.startsWith('secret ') || l.startsWith('anonymous ')) && settings.secretMode) { const t = q.replace(/^(secret|anonymous)\s+/i, ''); openAnonymous(t); return { response: `Anonymous search: "${t}" 🔒` } }
    if (l.startsWith('web ') || l.startsWith('search web ')) { const t = q.replace(/^(web|search web)\s+/i, ''); openAnonymous(t); return { response: `Searching "${t}"...` } }
    if (l.startsWith('play ')) { const s = l.replace('play ', '').trim(); window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(s)}`, '_blank'); return { response: `Playing "${s}"! 🎵` } }
    const dash = getDashboardInfo()
    if (l === 'time' || l.includes('what time') || l.includes('current time')) return { response: `🕒 Current time: **${dash.time}**\n📅 ${dash.day}, ${dash.date}` }
    if (l === 'date' || l.includes('what date') || l === 'today') return { response: `📅 Today is **${dash.day}**, ${dash.date}\n🕒 Time: ${dash.time}` }
    if (l.includes('what day') || l === 'day') return { response: `📆 Today is **${dash.day}**` }
    if (l.includes('temperature') || l.includes('how hot') || l.includes('how cold') || l.includes('weather')) {
      if (!settings.locationEnabled) return { response: `⚠️ Location disabled. Enable it in Settings.` }
      if (!weather) return { response: `⏳ Fetching weather...` }
      return { response: `🌡️ Temp: **${dash.temp}**` }
    }
    if (l.startsWith('calc ') || l.includes('calculate')) { try { const e = l.replace('calculate','').replace('calc','').trim(); const r = Function(`"use strict"; return (${e})`)(); if (typeof r === 'number') return { response: `Answer: ${r} 🧮` } } catch {} }
    return null
  }

  const processUserQuery = useCallback(async (query) => {
    if (!query || isProcessing) return
    if (userMode === 'guest') incrementGuestMessage()
    setIsProcessing(true); setInterimTranscript(''); setRecordingMode(false)
    vibrate(15); playBeep(700, 0.06)

    const userMsg = { id: ++msgCounter.current, role: 'user', content: query, time: Date.now(), replyTo: replyingTo?.id || null, replyToText: replyingTo?.content?.slice(0, 80) || null }
    setConversation(prev => [...prev, userMsg])
    setCommandHistory(prev => [...prev, { command: query, timestamp: Date.now() }])
    setReplyingTo(null)

    if (pendingCode) {
      const next = { ...pendingCode.answers, [pendingCode.step]: query }
      const idx = ['language','purpose','detail'].findIndex(k => !next[k])
      if (idx === -1) {
        const code = generateLongCode(next.language, next.purpose, next.detail)
        setConversation(prev => [...prev, { id: ++msgCounter.current, role: 'assistant', content: code, time: Date.now() }])
        setPendingCode(null)
        if (settings.codeAutoOverview) setShowChatOverview(true)
      } else {
        const nk = ['language','purpose','detail'][idx]
        setPendingCode({ step: nk, answers: next })
        const qs = { language: 'What programming language? (JavaScript, Python, React, etc.)', purpose: 'What should the code do?', detail: 'Any extra details?' }
        const q = qs[nk]
        setConversation(prev => [...prev, { id: ++msgCounter.current, role: 'assistant', content: q, time: Date.now() }])
        if (settings.readAloud || settings.autoStartVoice) speakText(q)
      }
      setIsProcessing(false); return
    }

    const cmd = executeCommand(query)
    if (cmd) {
      setConversation(prev => [...prev, { id: ++msgCounter.current, role: 'assistant', content: cmd.response, time: Date.now() }])
      if (settings.readAloud) speakText(cmd.response)
      setIsProcessing(false); return
    }

    for (const k of KNOWLEDGE) {
      if (k.match.test(query)) {
        setConversation(prev => [...prev, { id: ++msgCounter.current, role: 'assistant', content: k.answer, time: Date.now() }])
        if (settings.readAloud) speakText(k.answer.slice(0, 300))
        playBeep(500, 0.08); vibrate(10)
        setIsProcessing(false); return
      }
    }

    if (isPureGreeting(query)) {
      const g = 'Hey there! 👋 How can I help?'
      setConversation(prev => [...prev, { id: ++msgCounter.current, role: 'assistant', content: g, time: Date.now() }])
      if (settings.readAloud) speakText(g)
      setIsProcessing(false); return
    }

    const result = await searchWeb(query)
    let reply = result.error ? `Search error: ${result.error}` : (result.answer || "I couldn't find a clear answer.")
    const wantsLink = /\b(link|url|website|source|reference|open|visit|goto|go to|show me)\b/i.test(query)
    if (!result.error && result.safestUrl && settings.safeLinks && wantsLink) reply += `\n\n🔗 Source: ${result.safestUrl}`
    setConversation(prev => [...prev, { id: ++msgCounter.current, role: 'assistant', content: reply, time: Date.now() }])
    if (settings.readAloud) speakText(reply.replace(/🔗.*$/s, ''))
    playBeep(500, 0.08); vibrate(10)
    setIsProcessing(false)
  }, [isProcessing, userMode, settings, pendingCode, replyingTo, activeChatId, weather, now, vibrate, playBeep, speakText])

  // OVERVIEW VOICE
  const setupOverviewRecognition = useCallback(() => {
    if (typeof window === 'undefined') return null
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) return null
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    const r = new SR(); r.continuous = false; r.interimResults = true; r.lang = 'en-US'
    r.onstart = () => { setChatOverviewListening(true); setIsRecordingVoice(true); setVoicePaused(false); setVoiceTranscript('') }
    r.onend = () => { setChatOverviewListening(false); setIsRecordingVoice(false) }
    r.onerror = () => { setChatOverviewListening(false); setIsRecordingVoice(false) }
    r.onresult = (e) => { let f = '', i = ''; for (let k = e.resultIndex; k < e.results.length; k++) { const r2 = e.results[k]; if (r2.isFinal) f += r2[0].transcript; else i += r2[0].transcript } if (f) setVoiceTranscript(f); else if (i) setVoiceTranscript(i) }
    return r
  }, [])
  const startVoiceRecording = useCallback(() => { if (isRecordingVoice || chatOverviewListening) return; if (!chatOverviewRecognitionRef.current) chatOverviewRecognitionRef.current = setupOverviewRecognition(); if (chatOverviewRecognitionRef.current) { try { chatOverviewRecognitionRef.current.start(); setVoiceTranscript('') } catch {} } }, [isRecordingVoice, chatOverviewListening, setupOverviewRecognition])
  const pauseVoiceRecording = useCallback(() => { if (chatOverviewRecognitionRef.current && chatOverviewListening) { try { chatOverviewRecognitionRef.current.stop(); setVoicePaused(true); setChatOverviewListening(false); setIsRecordingVoice(false) } catch {} } }, [chatOverviewListening])
  const resumeVoiceRecording = useCallback(() => { if (voicePaused && chatOverviewRecognitionRef.current) { try { chatOverviewRecognitionRef.current.start(); setVoicePaused(false); setChatOverviewListening(true); setIsRecordingVoice(true) } catch {} } }, [voicePaused])
  const deleteVoiceRecording = useCallback(() => { if (chatOverviewRecognitionRef.current) { try { chatOverviewRecognitionRef.current.stop() } catch {} } setVoiceTranscript(''); setChatOverviewListening(false); setIsRecordingVoice(false); setVoicePaused(false) }, [])
  const sendVoiceRecording = useCallback(() => { const t = voiceTranscript.trim(); if (!t || isProcessing) return; setVoiceTranscript(''); setChatOverviewListening(false); setIsRecordingVoice(false); setVoicePaused(false); if (chatOverviewRecognitionRef.current) { try { chatOverviewRecognitionRef.current.stop() } catch {} } processUserQuery(t) }, [voiceTranscript, isProcessing, processUserQuery])
  useEffect(() => { if (voiceTranscript && !chatOverviewListening) setChatOverviewInput(voiceTranscript) }, [voiceTranscript, chatOverviewListening])
  const sendOverviewText = useCallback(() => { const t = chatOverviewInput.trim(); if (!t || isProcessing) return; setChatOverviewInput(''); processUserQuery(t) }, [chatOverviewInput, isProcessing, processUserQuery])

  const handleOverviewFileShare = useCallback((e) => {
    const files = e.target.files; if (!files || !files[0]) return
    const f = files[0]; if (f.size > 20 * 1024 * 1024) { alert('Max 20MB'); return }
    const rd = new FileReader()
    rd.onloadend = () => {
      setConversation(prev => [...prev, { id: ++msgCounter.current, role: 'user', content: `📎 ${f.name}`, time: Date.now(), file: { name: f.name, type: f.type, data: rd.result, size: f.size } }])
      setConversation(prev => [...prev, { id: ++msgCounter.current, role: 'assistant', content: `Received: **${f.name}** (${(f.size/1024).toFixed(1)} KB).`, time: Date.now() }])
    }
    rd.readAsDataURL(f); e.target.value = ''
  }, [activeChatId])
  const handleEditMessage = useCallback((id) => { const msg = conversation.find(m => m.id === id); if (!msg || msg.role !== 'user') return; const nc = prompt('Edit:', msg.content); if (nc !== null && nc.trim()) setConversation(prev => prev.map(m => m.id === id ? { ...m, content: nc.trim() } : m)) }, [conversation, activeChatId])
  const handleDeleteMessage = useCallback((id) => { if (settings.confirmDelete && !confirm('Delete?')) return; setConversation(prev => prev.filter(m => m.id !== id)) }, [settings.confirmDelete, activeChatId])
  const handleShareMessage = useCallback(async (msg) => { const c = msg.content; if (navigator.share) { try { await navigator.share({ title: 'CYPHER4X', text: c }) } catch {} } else { try { await navigator.clipboard.writeText(c); alert('Copied!') } catch {} } }, [])
  const copyCode = async (code, id) => { try { await navigator.clipboard.writeText(code); setCopiedId(id); setTimeout(() => setCopiedId(null), 1500); vibrate(20) } catch {} }
  const handleReply = (msg) => { setReplyingTo({ id: msg.id, content: msg.content }); setShowChatOverview(true) }

  const renderMessageContent = (msg) => {
    const c = msg.content || ''
    const rx = /```(\w+)?\n([\s\S]*?)```/g
    const parts = []; let last = 0, m, idx = 0
    while ((m = rx.exec(c)) !== null) {
      if (m.index > last) parts.push({ type: 'text', value: c.slice(last, m.index) })
      parts.push({ type: 'code', lang: m[1] || 'text', value: m[2], key: `${msg.id}-${idx++}` })
      last = m.index + m[0].length
    }
    if (last < c.length) parts.push({ type: 'text', value: c.slice(last) })
    if (!parts.length) parts.push({ type: 'text', value: c })
    return parts.map((p, i) => p.type === 'code' ? (
      <div key={p.key || i} style={{ ...styles.codeBlockWrap, borderColor: hexA(theme.primary, 0.5) }}>
        <div style={{ ...styles.codeBlockHeader, borderBottom: `1px solid ${hexA(theme.primary, 0.3)}` }}>
          <span style={{ ...styles.codeLang, color: theme.primary }}>{p.lang}</span>
          <button onClick={() => copyCode(p.value, p.key)} style={{ ...styles.codeCopyBtn, backgroundColor: theme.primary }}>
            <Icon name={copiedId === p.key ? 'check' : 'copy'} size={14} color="#fff" /><span>{copiedId === p.key ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
        <pre style={styles.codeBlock}>{p.value}</pre>
      </div>
    ) : <span key={i} style={styles.chatOverviewMsgText}>{p.value}</span>)
  }

  // CALL
  const toggleFullscreenCall = useCallback(() => {
    if (isFullscreenCall) { setIsFullscreenCall(false); setIsCallActive(false); if (recognitionRef.current) try { recognitionRef.current.stop() } catch {}; setIsListening(false); setInterimTranscript(''); synthRef.current?.cancel(); setIsAISpeaking(false) }
    else {
      setIsFullscreenCall(true); setIsCallActive(true)
      if (!recognitionRef.current) recognitionRef.current = setupSpeechRecognition(false, (t) => processUserQuery(t))
      if (recognitionRef.current) { try { recognitionRef.current.start(); speakText("I'm listening.") } catch {} }
    }
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
    r.onerror = (e) => { setIsRecording(false); setRecordingMode(false); setIsListening(false); if (e.error === 'not-allowed') alert('Allow mic.'); else alert('Error: ' + e.error) }
    r.onresult = async (e) => { let f = '', i = ''; for (let k = e.resultIndex; k < e.results.length; k++) { const res = e.results[k]; if (res.isFinal) f += res[0].transcript; else i += res[0].transcript } if (f) { setInterimTranscript(''); setRecordingMode(false); await processUserQuery(f) } else if (i) setInterimTranscript(i) }
    recognitionRef.current = r
    try { r.start() } catch (e) { alert('Failed: ' + e.message); setRecordingMode(false) }
  }, [isRecording, isProcessing, isFullscreenCall, processUserQuery, vibrate])
  const sendInterim = useCallback(() => { if (!interimTranscript.trim() || isProcessing) return; const t = interimTranscript.trim(); setInterimTranscript(''); setRecordingMode(false); if (recognitionRef.current) try { recognitionRef.current.stop() } catch {}; processUserQuery(t) }, [interimTranscript, isProcessing, processUserQuery])
  const sendTextMessage = useCallback(() => { const t = inputText.trim(); if (!t || isProcessing) return; setInputText(''); processUserQuery(t) }, [inputText, isProcessing, processUserQuery])

  // SETTINGS
  const handleBackgroundChange = (e) => {
    const f = e.target.files[0]; if (!f) return
    if (!f.type.startsWith('image/')) { alert('Image only'); return }
    if (f.size > 5 * 1024 * 1024) { alert('Max 5MB'); return }
    const rd = new FileReader(); rd.onloadend = () => setBackgroundImage(rd.result); rd.readAsDataURL(f)
  }
  const resetBackground = () => { setBackgroundImage(null); if (bgInputRef.current) bgInputRef.current.value = '' }
  const toggleView = useCallback(() => {
    setViewMode(p => { const n = p === 'android' ? 'pc' : 'android'; if (n === 'pc') setShowRotateOverlay(true); return n })
    setSidebarOpen(false)
  }, [])
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

  // MUSIC
  const handleGenerateMusic = async () => {
    if (!requireLogin('Music Generator')) return
    if (!musicDesc.trim()) { alert('Describe the music first.'); return }
    setMusicGenerating(true); setMusicInfo('📡 Trying Tunova...'); setMusicDownloadUrl(null)
    const fallback = () => {
      try {
        const style = guessMusicStyle(musicDesc)
        const bars = Math.max(2, Math.round(musicDuration * style.bpm / 60 / 4))
        setMusicInfo(`🎵 Built-in synth — ${style.name} • ${style.bpm} BPM`)
        const notes = generateRichMelody(style.bpm, style.scale, bars)
        const { ctx, duration } = playRichMelody(notes, musicQuality, style.bpm)
        setMusicPlaying(true)
        setTimeout(() => { setMusicPlaying(false); try { ctx.close() } catch {} }, (duration + 1) * 1000)
      } catch (e) { setMusicInfo('❌ Synth error: ' + e.message) }
      setMusicGenerating(false)
    }
    try {
      const res = await fetch('/api/music', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: musicDesc, duration: musicDuration }) })
      const data = await res.json()
      if (!res.ok || data.error) { setMusicInfo('⚠️ Tunova unavailable — using built-in synth'); return fallback() }
      const taskId = data.id || data.task_id || data.data?.id || data.result?.id
      if (!taskId) { setMusicInfo('⚠️ No task ID — using built-in synth'); return fallback() }
      setMusicInfo('✓ Tunova task created. Polling...')
      let attempts = 0
      const poll = setInterval(async () => {
        attempts++
        try {
          const check = await fetch(`/api/music-status?task_id=${taskId}`)
          const status = await check.json()
          const url = status.audio_url || status.url || status.data?.audio_url || status.result?.audio_url
          if (url) { clearInterval(poll); setMusicDownloadUrl(url); setMusicInfo('✓ Ready!');
