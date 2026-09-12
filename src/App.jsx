import { useState, useRef, useEffect, useCallback } from 'react'

const Icon = ({ name, size = 18, color = 'currentColor' }) => {
  const icons = {
    menu: 'M3 6h18M3 12h18M3 18h18',
    x: 'M18 6L6 18M6 6l12 12',
    settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-7-3h2m10 0h2M12 6V4m0 16v-2',
    chart: 'M18 20V4M12 20V8M6 20V12',
    hourglass: 'M12 2v4M12 22v-4M4 6h16M4 18h16M8 6v3a4 4 0 0 0 8 0V6H8zm0 12v-3a4 4 0 0 1 8 0v3H8z',
    cpu: 'M4 4h4v4H4zm6 0h10v4H10zM4 10h10v4H4zm12 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z',
    memory: 'M2 6h20v12H2zM6 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z',
    network: 'M4 12a8 8 0 0 1 16 0M6 12a6 6 0 0 1 12 0M8 12a4 4 0 0 1 8 0M10 12a2 2 0 0 1 4 0',
    calendar: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
    clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm1-16v6l4 2M12 6v4',
    alertTriangle: 'M12 9v4m0 4h.01M12 2L1 21h22L12 2z',
    send: 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z',
    phone: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0 1 22 16.92z',
    mic: 'M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zm-7 9v1a7 7 0 0 0 14 0v-1M12 22v-3',
    close: 'M18 6L6 18M6 6l12 12',
    desktop: 'M4 4h16v12H4zM8 20h8M12 16v4',
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
    faceId: 'M4 4h16v16H4V4zm2 2v12h12V6H6zm4 4h4v4h-4v-4z',
    cog: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-7-3h2m10 0h2M12 6V4m0 16v-2',
    copy: 'M8 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1M8 5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2V5zm4 2h4m-4 4h4',
    pause: 'M6 4h4v16H6V4zm8 0h4v16h-4V4z',
    play: 'M5 3l14 9-14 9V3z',
    sparkles: 'M12 3l1.9 5.8L20 10l-6.1 1.2L12 17l-1.9-5.8L4 10l6.1-1.2L12 3z',
    refresh: 'M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15',
    music: 'M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z',
    zap: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
    shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    reply: 'M9 17l-6-6 6-6M3 11h10a6 6 0 0 1 6 6v2',
    terminal: 'M4 17l6-6-6-6M12 19h8',
    lock: 'M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4',
    eye: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12zm11 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
    wifi: 'M5 12.55a11 11 0 0 1 14 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01',
    globe: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20',
    code: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
  }
  const path = icons[name]
  if (!path) return null
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}>
      <path d={path} />
    </svg>
  )
}

const TAVILY_API_KEY = "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"
const TAVILY_URL = "https://api.tavily.com/search"
const VERSION = "Version 24.0.0"
const APP_START_TIME = Date.now()

const getStorageKey = (email, pin) => `cypher4x_${email}_${pin}`
const saveUserData = (email, pin, data) => { try { localStorage.setItem(getStorageKey(email, pin), JSON.stringify(data)) } catch {} }
const loadUserData = (email, pin) => { try { const raw = localStorage.getItem(getStorageKey(email, pin)); return raw ? JSON.parse(raw) : null } catch { return null } }
const getAllUsers = () => { try { const list = localStorage.getItem('cypher4x_users'); return list ? JSON.parse(list) : [] } catch { return [] } }
const addUser = (email, pin) => { const list = getAllUsers(); if (!list.some(u => u.email === email)) { list.push({ email, pin }); localStorage.setItem('cypher4x_users', JSON.stringify(list)) } }
const userExists = (email, pin) => { const list = getAllUsers(); return list.some(u => u.email === email && u.pin === pin) }
const saveAuth = (email, pin) => { try { localStorage.setItem('cypher4x_auth', JSON.stringify({ email, pin })) } catch {} }
const getAuth = () => { try { const raw = localStorage.getItem('cypher4x_auth'); return raw ? JSON.parse(raw) : null } catch { return null } }
const clearAuth = () => { try { localStorage.removeItem('cypher4x_auth') } catch {} }

const isMobileDevice = () => /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
const isAndroid = () => /Android/i.test(navigator.userAgent)

// ============ APP DEEP-LINK ============
const APP_MAP = {
  whatsapp: { name: 'WhatsApp', pkg: 'com.whatsapp', scheme: 'whatsapp', universal: 'https://wa.me/', web: 'https://web.whatsapp.com' },
  whatsappbusiness: { name: 'WhatsApp Business', pkg: 'com.whatsapp.w4b', scheme: 'whatsapp', universal: 'https://wa.me/', web: 'https://web.whatsapp.com' },
  instagram: { name: 'Instagram', pkg: 'com.instagram.android', scheme: 'instagram', universal: 'https://instagram.com/', web: 'https://instagram.com' },
  facebook: { name: 'Facebook', pkg: 'com.facebook.katana', scheme: 'fb', universal: 'https://facebook.com/', web: 'https://facebook.com' },
  telegram: { name: 'Telegram', pkg: 'org.telegram.messenger', scheme: 'tg', universal: 'https://t.me/', web: 'https://web.telegram.org' },
  youtube: { name: 'YouTube', pkg: 'com.google.android.youtube', scheme: 'vnd.youtube', universal: 'https://youtube.com/', web: 'https://youtube.com' },
  spotify: { name: 'Spotify', pkg: 'com.spotify.music', scheme: 'spotify', universal: 'https://open.spotify.com/', web: 'https://open.spotify.com' },
  gmail: { name: 'Gmail', pkg: 'com.google.android.gm', scheme: 'googlegmail', universal: 'https://mail.google.com/', web: 'https://mail.google.com' },
  maps: { name: 'Maps', pkg: 'com.google.android.apps.maps', scheme: 'geo', universal: 'https://maps.google.com/', web: 'https://maps.google.com' },
  github: { name: 'GitHub', pkg: null, scheme: null, universal: 'https://github.com/', web: 'https://github.com' },
}

const openApp = (appKey, extraPath = '') => {
  const app = APP_MAP[appKey]
  if (!app) return `Unknown app: ${appKey}`
  if (isAndroid() && app.pkg) {
    const intentUrl = `intent://${extraPath || ''}#Intent;scheme=${app.scheme};package=${app.pkg};S.browser_fallback_url=${encodeURIComponent(app.universal)};end`
    try { window.location.href = intentUrl; return `Opening ${app.name}...` } catch (e) {}
  }
  if (isMobileDevice()) { window.open(app.universal + extraPath, '_blank', 'noopener,noreferrer'); return `Opening ${app.name}...` }
  window.open(app.web, '_blank', 'noopener,noreferrer')
  return `Opening ${app.name} in browser...`
}

const openWhatsAppGroup = (name) => {
  const text = `Looking for group: ${name}`
  if (isAndroid()) { window.location.href = `intent://send?text=${encodeURIComponent(text)}#Intent;scheme=whatsapp;package=com.whatsapp;end`; return `Opening WhatsApp. Search "${name}".` }
  if (isMobileDevice()) { window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank'); return `Opening WhatsApp. Search "${name}".` }
  window.open('https://web.whatsapp.com', '_blank'); return `WhatsApp Web opened.`
}

// ============ PERSONALITY ============
const PERSONALITIES = [
  { id: 'polite', label: 'Polite', desc: 'Always respectful', icon: '🤝' },
  { id: 'concise', label: 'Concise', desc: 'Short & direct', icon: '⚡' },
  { id: 'clear', label: 'Clear', desc: 'Simple to understand', icon: '💡' },
  { id: 'comprehensive', label: 'Comprehensive', desc: 'Detailed answers', icon: '📚' },
  { id: 'custom', label: 'Custom', desc: 'Learns your style', icon: '🎨' },
]

const analyzeUserStyle = (messages) => {
  const u = messages.filter(m => m.role === 'user').map(m => m.content)
  if (u.length < 3) return null
  const avg = u.reduce((a, m) => a + m.length, 0) / u.length
  return {
    short: avg < 40, long: avg > 120,
    emoji: u.filter(m => /[\u{1F300}-\u{1F9FF}]/u.test(m)).length / u.length > 0.3,
    formal: u.filter(m => /\b(please|thank you|kindly)\b/i.test(m)).length / u.length > 0.3,
    excited: u.filter(m => /!/.test(m)).length / u.length > 0.4,
    count: u.length,
  }
}
const applyPersonality = (reply, p, cs) => {
  if (!reply) return reply
  const clean = reply.replace(/^(I found this for you:|Great question!|Based on my search,|Certainly!)\s*/i, '').trim()
  if (p === 'concise') { const s = clean.split(/(?<=[.!?])\s+/); return s.slice(0, 2).join(' ') || clean }
  if (p === 'polite') return `Certainly! ${clean}`
  if (p === 'clear') return `Here's a clear answer:\n\n${clean}`
  if (p === 'comprehensive') return `Let me give you a thorough answer:\n\n${clean}\n\nWould you like me to go deeper?`
  if (p === 'custom' && cs && cs.count) {
    let out = clean
    if (cs.short) { const s = clean.split(/(?<=[.!?])\s+/); out = s.slice(0, 2).join(' ') || clean }
    if (cs.formal && !/^Regarding/i.test(out)) out = `Regarding your query: ${out}`
    if (cs.emoji) out = `✨ ${out} 😊`
    if (cs.excited && !/[!?]$/.test(out)) out += '!'
    return out
  }
  return clean
}

// ============ CODE GEN ============
const detectLanguage = (text) => {
  const t = text.toLowerCase()
  const map = [['javascript',['javascript','js','node']],['python',['python','py','django','flask']],['react',['react','jsx','hooks']],['typescript',['typescript','ts']],['html',['html','htm']],['css',['css']],['java',['java']],['c++',['c++','cpp']],['c#',['c#','csharp']],['go',['go','golang']],['rust',['rust']],['php',['php']],['sql',['sql']]]
  for (const [l, k] of map) if (k.some(x => t.includes(x))) return l
  return 'javascript'
}
const generateLongCode = (language, purpose, detail) => {
  const lang = language.toLowerCase()
  if (lang.includes('react')) return `Here's a complete React application for: **${purpose}**${detail ? ` (${detail})` : ''}\n\n\`\`\`jsx\n// ============================================\n// ${purpose.toUpperCase()} — React App\n// ============================================\nimport { useState, useEffect, useCallback } from 'react'\n\nfunction useLocalStorage(key, initial) {\n  const [value, setValue] = useState(() => {\n    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : initial }\n    catch { return initial }\n  })\n  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(value)) } catch {} }, [key, value])\n  return [value, setValue]\n}\n\nexport default function App() {\n  const [items, setItems] = useLocalStorage('app_items', [])\n  const [input, setInput] = useState('')\n\n  const add = useCallback(() => {\n    if (!input.trim()) return\n    setItems(prev => [{ id: Date.now(), text: input, done: false }, ...prev])\n    setInput('')\n  }, [input, setItems])\n\n  const toggle = (id) => setItems(prev => prev.map(i => i.id === id ? { ...i, done: !i.done } : i))\n  const remove = (id) => setItems(prev => prev.filter(i => i.id !== id))\n\n  return (\n    <div style={{ padding: 20, fontFamily: 'system-ui', maxWidth: 600, margin: '0 auto' }}>\n      <h1>${purpose}</h1>\n      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>\n        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && add()}\n          placeholder="Type and press Enter..." style={{ flex: 1, padding: 12, borderRadius: 8, border: '1px solid #ccc' }} />\n        <button onClick={add} style={{ padding: '12px 20px', background: '#ff003c', color: '#fff', border: 'none', borderRadius: 8 }}>Add</button>\n      </div>\n      <ul style={{ listStyle: 'none', padding: 0 }}>\n        {items.map(item => (\n          <li key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderBottom: '1px solid #eee' }}>\n            <input type="checkbox" checked={item.done} onChange={() => toggle(item.id)} />\n            <span style={{ flex: 1, textDecoration: item.done ? 'line-through' : 'none' }}>{item.text}</span>\n            <button onClick={() => remove(item.id)} style={{ background: 'transparent', border: 'none', color: '#999' }}>✕</button>\n          </li>\n        ))}\n      </ul>\n    </div>\n  )\n}\n\`\`\`\n\n**Includes:** custom hooks, CRUD, error handling, responsive layout.\n\nWant auth, routing, or a backend?`
  if (lang.includes('python')) return `Here's a complete Python program for: **${purpose}**${detail ? ` (${detail})` : ''}\n\n\`\`\`python\n# ============================================\n# ${purpose.upper()} — Python\n# ============================================\nimport os, sys, json, logging, argparse\nfrom dataclasses import dataclass, asdict\nfrom typing import List\nfrom datetime import datetime\n\nlogging.basicConfig(level=logging.INFO)\nlog = logging.getLogger(__name__)\n\n@dataclass\nclass Item:\n    id: int\n    title: str\n    done: bool = False\n    created_at: str = ""\n    def __post_init__(self):\n        if not self.created_at:\n            self.created_at = datetime.utcnow().isoformat()\n\nclass Store:\n    def __init__(self, path="items.json"):\n        self.path = path\n        self.items: List[Item] = []\n        self._load()\n    def _load(self):\n        if not os.path.exists(self.path): return\n        try:\n            with open(self.path) as f: data = json.load(f)\n            self.items = [Item(**d) for d in data]\n        except Exception as e: log.error(f"Load failed: {e}")\n    def save(self):\n        with open(self.path, "w") as f: json.dump([asdict(i) for i in self.items], f, indent=2)\n    def add(self, title):\n        nid = max((i.id for i in self.items), default=0) + 1\n        item = Item(id=nid, title=title)\n        self.items.append(item); self.save(); return item\n    def list(self): return sorted(self.items, key=lambda x: x.created_at, reverse=True)\n\ndef main():\n    parser = argparse.ArgumentParser()\n    parser.add_argument("cmd", choices=["add", "list"])\n    parser.add_argument("title", nargs="?")\n    args = parser.parse_args()\n    s = Store()\n    if args.cmd == "add" and args.title:\n        item = s.add(args.title); print(f"Added #{item.id}")\n    else:\n        for i in s.list(): print(f"{'✓' if i.done else '○'} #{i.id} {i.title}")\n\nif __name__ == "__main__": main()\n\`\`\`\n\n**Run:** \`python app.py add "Buy milk"\` and \`python app.py list\``
  return `Here's a complete **${language}** solution for: **${purpose}**${detail ? ` (${detail})` : ''}\n\n\`\`\`javascript\n// ============================================\n// ${purpose.toUpperCase()} — ${language}\n// ============================================\n'use strict';\n\nconst CONFIG = { name: '${purpose.replace(/'/g,"\\'")}', version: '1.0.0', debug: true };\n\nconst log = {\n  info: (...a) => console.log('[INFO]', ...a),\n  warn: (...a) => console.warn('[WARN]', ...a),\n  error: (...a) => console.error('[ERROR]', ...a),\n};\n\nclass App {\n  constructor(options = {}) {\n    this.options = { ...CONFIG, ...options };\n    this.state = { items: [], ready: false };\n    log.info('Init:', this.options.name);\n  }\n  async init() {\n    try { await this.load(); this.state.ready = true; log.info('Ready'); return this }\n    catch (e) { log.error('Init failed:', e); throw e }\n  }\n  async load() { await new Promise(r => setTimeout(r, 10)); this.state.items = [] }\n  add(text) {\n    if (!text) throw new Error('Text required');\n    const item = { id: Date.now(), text, created: new Date().toISOString() };\n    this.state.items.push(item); return item\n  }\n  list() { return [...this.state.items] }\n  remove(id) {\n    const before = this.state.items.length;\n    this.state.items = this.state.items.filter(i => i.id !== id);\n    return this.state.items.length < before\n  }\n}\n\n(async () => {\n  const app = await new App().init();\n  app.add('Sample #1'); app.add('Sample #2');\n  console.log('Items:', app.list());\n})();\n\`\`\`\n\n**Includes:** config, leveled logger, class structure, async init, CRUD.\n\nWant tests or a UI version?`
}

const isCodeRequest = (query) => {
  const q = query.toLowerCase()
  return ['generate code','write code','create code','make code','build code','code for','code to','function in','write me a','write an ai code'].some(k => q.includes(k))
}

// ============ MUSIC GEN ============
const MUSIC_STYLES = {
  'love': { scale: 'major', bpm: 80, mood: 'romantic' },
  'pink': { scale: 'major', bpm: 110, mood: 'dreamy' },
  'sad': { scale: 'minor', bpm: 70, mood: 'melancholic' },
  'happy': { scale: 'major', bpm: 130, mood: 'upbeat' },
  'chill': { scale: 'pentatonic', bpm: 90, mood: 'relaxed' },
  'epic': { scale: 'minor', bpm: 140, mood: 'intense' },
  'default': { scale: 'major', bpm: 120, mood: 'balanced' },
}
const guessMusicStyle = (desc) => {
  const d = desc.toLowerCase()
  for (const [key, val] of Object.entries(MUSIC_STYLES)) if (d.includes(key)) return { ...val, name: key }
  return { ...MUSIC_STYLES.default, name: 'balanced' }
}
const generateRichMelody = (bpm, scale, bars, quality) => {
  const scales = { major: [0,2,4,5,7,9,11,12], minor: [0,2,3,5,7,8,10,12], pentatonic: [0,2,4,7,9,12] }
  const s = scales[scale] || scales.major
  const beat = 60 / bpm
  const notes = []
  for (let b = 0; b < bars * 4; b++) {
    if (Math.random() < 0.2) { notes.push({ t: b * beat, freq: 0, dur: beat * 0.5 }); continue }
    const deg = s[Math.floor(Math.random() * s.length)]
    const oct = Math.random() < 0.3 ? 12 : 0
    const midi = 60 + deg + oct
    notes.push({ t: b * beat, freq: 440 * Math.pow(2, (midi - 69) / 12), dur: beat * (Math.random() < 0.3 ? 1 : 0.5) })
  }
  return notes
}
const playRichMelody = (notes, quality = 'medium') => {
  const Ctx = window.AudioContext || window.webkitAudioContext
  if (!Ctx) throw new Error('Web Audio not supported')
  const ctx = new Ctx()
  const master = ctx.createGain()
  master.gain.value = quality === 'high' ? 0.2 : quality === 'low' ? 0.1 : 0.15
  master.connect(ctx.destination)
  const start = ctx.currentTime + 0.05
  const totalDur = notes.reduce((m, n) => Math.max(m, n.t + n.dur), 0)

  notes.forEach(n => {
    if (!n.freq) return
    const osc = ctx.createOscillator()
    osc.type = quality === 'high' ? 'sawtooth' : 'triangle'
    osc.frequency.value = n.freq
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0, start + n.t)
    gain.gain.linearRampToValueAtTime(1, start + n.t + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.001, start + n.t + n.dur)
    osc.connect(gain).connect(master)
    osc.start(start + n.t); osc.stop(start + n.t + n.dur + 0.05)
  })

  // Bass layer for medium/high quality
  if (quality !== 'low') {
    notes.filter((_, i) => i % 4 === 0).forEach(n => {
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.value = (n.freq || 130) / 2
      const g = ctx.createGain()
      g.gain.setValueAtTime(0, start + n.t)
      g.gain.linearRampToValueAtTime(0.6, start + n.t + 0.03)
      g.gain.exponentialRampToValueAtTime(0.001, start + n.t + n.dur * 2)
      osc.connect(g).connect(master)
      osc.start(start + n.t); osc.stop(start + n.t + n.dur * 2 + 0.1)
    })
  }
  return { ctx, duration: totalDur + 0.5 }
}

// ============ VIDEO GEN ============
const VIDEO_STYLES = {
  'anime': { palette: ['#ff69b4','#ff1493','#ffb6c1','#ffc0cb'], label: 'Anime', shapes: 'sakura' },
  'movie': { palette: ['#1a1a2e','#16213e','#0f3460','#e94560'], label: 'Movie', shapes: 'cinema' },
  'cartoon': { palette: ['#ffdd00','#ff6b6b','#4ecdc4','#a8e6cf'], label: 'Cartoon', shapes: 'bubbles' },
  'cyber': { palette: ['#00ff41','#008f11','#0d0208','#ff003c'], label: 'Cyberpunk', shapes: 'matrix' },
  'nature': { palette: ['#2ecc71','#27ae60','#f39c12','#e67e22'], label: 'Nature', shapes: 'leaves' },
  'space': { palette: ['#000','#1a0033','#ff00ff','#00ffff'], label: 'Space', shapes: 'stars' },
  'abstract': { palette: ['#ff003c','#ff69b4','#ffa500','#00ffff'], label: 'Abstract', shapes: 'blobs' },
  'default': { palette: ['#ff003c','#ff6688','#ffa500','#ffff00'], label: 'Default', shapes: 'particles' },
}
const guessVideoStyle = (desc) => {
  const d = desc.toLowerCase()
  for (const [key, val] of Object.entries(VIDEO_STYLES)) if (d.includes(key)) return val
  return VIDEO_STYLES.default
}

const startCanvasVideo = (canvas, style, onProgress) => {
  const ctx = canvas.getContext('2d')
  const W = canvas.width, H = canvas.height
  let t = 0, raf
  const stream = canvas.captureStream(30)
  const palette = style.palette
  const particles = Array.from({ length: 100 }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2,
    r: Math.random() * 4 + 1,
    c: palette[Math.floor(Math.random() * palette.length)],
  }))
  const draw = () => {
    t += 0.02
    const grad = ctx.createLinearGradient(0, 0, W, H)
    grad.addColorStop(0, palette[0])
    grad.addColorStop(1, palette[1] || palette[0])
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, W, H)

    if (style.shapes === 'stars') {
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 0.5, 0, Math.PI * 2)
        ctx.fillStyle = p.c
        ctx.fill()
        p.x += p.vx * 0.3; p.y += p.vy * 0.3
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
      })
    } else if (style.shapes === 'matrix') {
      for (let i = 0; i < 30; i++) {
        const x = (i * W / 30 + Math.sin(t + i) * 20)
        const y = (t * 100 + i * 50) % H
        ctx.fillStyle = palette[0]
        ctx.font = '14px monospace'
        ctx.fillText(String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96)), x, y)
      }
    } else if (style.shapes === 'sakura') {
      particles.forEach(p => {
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(t + p.x * 0.01)
        ctx.beginPath()
        ctx.ellipse(0, 0, p.r * 2, p.r, 0, 0, Math.PI * 2)
        ctx.fillStyle = p.c + 'cc'
        ctx.fill()
        ctx.restore()
        p.y += 1; p.x += Math.sin(t + p.y * 0.05) * 0.5
        if (p.y > H) { p.y = -10; p.x = Math.random() * W }
      })
    } else if (style.shapes === 'blobs') {
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2)
        ctx.fillStyle = p.c + '40'
        ctx.fill()
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
      })
    } else {
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.c
        ctx.fill()
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
      })
    }

    ctx.fillStyle = 'rgba(255,255,255,0.95)'
    ctx.font = 'bold 40px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('CYPHER4X', W / 2, H / 2 - 15)
    ctx.font = '14px sans-serif'
    ctx.fillStyle = palette[2] || '#fff'
    ctx.fillText(style.label + ' Style', W / 2, H / 2 + 20)

    onProgress && onProgress(t)
    raf = requestAnimationFrame(draw)
  }
  draw()
  const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' })
  const chunks = []
  recorder.ondataavailable = e => e.data.size > 0 && chunks.push(e.data)
  recorder.start()
  return {
    stop: () => new Promise(resolve => {
      recorder.onstop = () => resolve(new Blob(chunks, { type: 'video/webm' }))
      cancelAnimationFrame(raf); recorder.stop()
    }),
  }
}

// ============ CYBER LAB (educational) ============
const CYBER_TOOLS = {
  hash: async (text, algo = 'SHA-256') => {
    if (!text) return 'Enter text to hash'
    const buf = new TextEncoder().encode(text)
    const hash = await crypto.subtle.digest(algo, buf)
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('')
  },
  base64: (text) => { try { return btoa(text) } catch { return 'Invalid' } },
  unbase64: (text) => { try { return atob(text) } catch { return 'Invalid Base64' } },
  hex: (text) => Array.from(new TextEncoder().encode(text)).map(b => b.toString(16).padStart(2, '0')).join(' '),
  rot13: (text) => text.replace(/[a-zA-Z]/g, c => String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26)),
  dns: async (domain) => {
    if (!domain) return 'Enter a domain'
    try {
      const r = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=A`)
      const d = await r.json()
      if (d.Answer) return d.Answer.map(a => `A  ${a.data}  TTL ${a.TTL}`).join('\n')
      return 'No records found'
    } catch (e) { return 'DNS lookup failed: ' + e.message }
  },
  ip: async (ip) => {
    if (!ip) return 'Enter an IP'
    try {
      const r = await fetch(`https://ipapi.co/${encodeURIComponent(ip)}/json/`)
      const d = await r.json()
      return `IP: ${d.ip}\nCity: ${d.city}\nRegion: ${d.region}\nCountry: ${d.country_name}\nISP: ${d.org}\nTimezone: ${d.timezone}`
    } catch (e) { return 'IP lookup failed' }
  },
  whois: async (domain) => {
    if (!domain) return 'Enter a domain'
    return `⚠️ WHOIS lookup requires a backend proxy (CORS).\n\nTry these public WHOIS services:\n• https://who.is/whois/${encodeURIComponent(domain)}\n• https://www.whois.com/whois/${encodeURIComponent(domain)}`
  },
  passwordStrength: (pw) => {
    if (!pw) return 'Enter a password'
    let score = 0
    const checks = {
      length: pw.length >= 12,
      lower: /[a-z]/.test(pw),
      upper: /[A-Z]/.test(pw),
      digit: /\d/.test(pw),
      special: /[^A-Za-z0-9]/.test(pw),
      noCommon: !/^(password|123456|qwerty|admin)/i.test(pw),
    }
    score = Object.values(checks).filter(Boolean).length
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong', 'Excellent']
    const entropy = (pw.length * Math.log2(new Set(pw).size || 1)).toFixed(1)
    return `Score: ${score}/6 (${labels[score]})\nEntropy: ~${entropy} bits\n\nChecks:\n  Length ≥12: ${checks.length ? '✓' : '✗'}\n  Lowercase: ${checks.lower ? '✓' : '✗'}\n  Uppercase: ${checks.upper ? '✓' : '✗'}\n  Digits: ${checks.digit ? '✓' : '✗'}\n  Special: ${checks.special ? '✓' : '✗'}\n  Not common: ${checks.noCommon ? '✓' : '✗'}\n\n${entropy > 80 ? '🟢 Very secure' : entropy > 60 ? '🟡 Decent' : '🔴 Weak — increase length & variety'}`
  },
  portScan: (host) => {
    const ports = [21, 22, 23, 25, 53, 80, 110, 143, 443, 445, 3306, 3389, 5432, 8080, 8443]
    const open = [80, 443].filter(() => Math.random() > 0.3)
    return `⚠️ SIMULATION ONLY — real port scanning requires backend + permission from target owner.\n\nTarget: ${host || 'example.com'}\nScanned 15 common ports\n\nOPEN (simulated):\n${open.map(p => `  ${p}  ${p === 80 ? 'http' : 'https'}`).join('\n') || '  none'}\n\nCLOSED: ${15 - open.length}`
  },
}

const CYBER_TERMINAL_COMMANDS = {
  help: `Available commands (educational):
  help              Show this help
  clear             Clear terminal
  hash <text>       SHA-256 hash
  base64 <text>     Base64 encode
  unbase64 <text>   Base64 decode
  hex <text>        Hex encode
  rot13 <text>      ROT13 cipher
  dns <domain>      DNS lookup (real)
  ip <address>      IP geolocation (real)
  whois <domain>    WHOIS info (opens browser)
  portscan <host>   Simulated port scan
  passcheck <pw>    Password strength
  ctf               Random CTF-style challenge
  about             About this terminal
  ethics            Security ethics reminder`,
  about: `CYPHER4X Cyber Lab v1.0

An educational security toolkit for learning:
• Networking fundamentals (DNS, IP, WHOIS)
• Cryptography basics (hashing, encoding, ciphers)
• Password security best practices
• CTF-style challenge solving

⚠️ This is NOT a real pentesting framework. Real security work requires authorization.`,
  ethics: `🔒 Ethical Security Reminder:

1. Only test systems you OWN or have WRITTEN permission to test.
2. Unauthorized access is illegal in most countries (CFAA, GDPR, Computer Misuse Act, etc).
3. Learn defense — become a white-hat.
4. Report vulnerabilities responsibly.
5. This tool is for EDUCATION only.`,
}

const CTF_CHALLENGES = [
  { q: 'ROT13: "Uryyb, Jbeyq!" decodes to?', a: 'hello, world!' },
  { q: 'Base64 "aGVsbG8=" decodes to?', a: 'hello' },
  { q: 'What does DNS stand for?', a: 'domain name system' },
  { q: 'SHA-256 of empty string starts with?', a: 'e3b0c442' },
  { q: 'Default port for HTTPS?', a: '443' },
  { q: 'What does XSS stand for?', a: 'cross-site scripting' },
  { q: 'What does SQLi stand for?', a: 'sql injection' },
]

// ============ WEB SEARCH ============
const TRUSTED = ['wikipedia.org','britannica.com','gov','edu','who.int','github.com','stackoverflow.com','mozilla.org','python.org','reactjs.org']
const isTrusted = (u) => { if (!u) return false; try { const h = new URL(u).hostname.toLowerCase(); return TRUSTED.some(d => h.includes(d)) } catch { return false } }
const searchWeb = async (query) => {
  if (!TAVILY_API_KEY) return { error: "No API key" }
  try {
    const r = await fetch(TAVILY_URL, { method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${TAVILY_API_KEY}` }, body: JSON.stringify({ query, search_depth: "advanced", include_answer: true, max_results: 6 }) })
    const d = await r.json()
    const results = d.results || []
    const safest = results.find(x => isTrusted(x.url)) || results[0]
    return { answer: d.answer || results.map(x => x.content).join("\n\n") || "No results.", safestUrl: safest?.url }
  } catch (e) { return { error: e.message } }
}
const openAnonymous = (q) => window.open(`https://duckduckgo.com/?q=${encodeURIComponent(q)}&kae=d`, '_blank', 'noopener,noreferrer')

const RedBall = ({ isSpeaking = false }) => (
  <div style={styles.ballContainer}>
    <div style={styles.ring1} /><div style={styles.ring2} /><div style={styles.ring3} />
    <div style={styles.ball3DContainer}>
      <div style={{ ...styles.ball3D, ...(isSpeaking ? styles.ball3DSpeaking : {}) }}>
        <div style={styles.ballHighlight} /><div style={styles.ballInnerGlow} />
      </div>
    </div>
  </div>
)

// ============ MAIN APP ============
export default function App() {
  const [userMode, setUserMode] = useState('guest')
  const [email, setEmail] = useState(''); const [pin, setPin] = useState('')
  const [showLogin, setShowLogin] = useState(true); const [authError, setAuthError] = useState('')
  const [guestMessageCount, setGuestMessageCount] = useState(0); const [showGuestLimit, setShowGuestLimit] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [profile, setProfile] = useState(null)
  const [profileForm, setProfileForm] = useState({ name: "", username: "", avatar: "", bio: "" })
  const [editingProfile, setEditingProfile] = useState(false)
  const [isBooting, setIsBooting] = useState(true)
  const [bootTypedText, setBootTypedText] = useState(''); const [bootTypedCredit, setBootTypedCredit] = useState('')
  const [viewMode, setViewMode] = useState('android'); const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showWelcomeOverlay, setShowWelcomeOverlay] = useState(false); const [welcomeMessage, setWelcomeMessage] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [showPersonalityModal, setShowPersonalityModal] = useState(false)
  const [aiPersonality, setAiPersonality] = useState('polite'); const [customStyle, setCustomStyle] = useState(null)
  const [backgroundImage, setBackgroundImage] = useState(null)
  const [settings, setSettings] = useState({
    welcomeEnabled: true, autoStartVoice: true, language: 'en', voiceSpeed: 1, personality: 'polite',
    secretMode: false, overlayButton: false, safeLinks: true,
    autoScroll: true, haptic: true, soundFx: false, showTimestamps: true,
    typingIndicator: true, readAloud: false, highContrast: false, compactMode: false,
    codeAutoOverview: true, confirmDelete: true,
  })
  const [showChatOverview, setShowChatOverview] = useState(false)
  const [chatOverviewInput, setChatOverviewInput] = useState(''); const [chatOverviewListening, setChatOverviewListening] = useState(false)
  const [chatOverviewVoiceEnabled, setChatOverviewVoiceEnabled] = useState(true)
  const [isRecordingVoice, setIsRecordingVoice] = useState(false); const [voicePaused, setVoicePaused] = useState(false)
  const [voiceTranscript, setVoiceTranscript] = useState(''); const chatOverviewRecognitionRef = useRef(null)
  const [showRotateOverlay, setShowRotateOverlay] = useState(false)
  const [conversation, setConversation] = useState([]); const [inputText, setInputText] = useState("")
  const [commandHistory, setCommandHistory] = useState([])
  const [isCallActive, setIsCallActive] = useState(false); const [isFullscreenCall, setIsFullscreenCall] = useState(false)
  const [isListening, setIsListening] = useState(false); const [isProcessing, setIsProcessing] = useState(false)
  const [isRecording, setIsRecording] = useState(false); const [isAISpeaking, setIsAISpeaking] = useState(false)
  const [interimTranscript, setInterimTranscript] = useState(''); const [recordingMode, setRecordingMode] = useState(false)
  const [faceRecognition, setFaceRecognition] = useState(false); const [biometricAuth, setBiometricAuth] = useState(false)
  const [voiceGender, setVoiceGender] = useState('female')
  const [stats, setStats] = useState({ uptime: 0, cpuUsage: 0, cpuTemp: 0, ramUsage: 0, storageUsed: 0, storageTotal: 475, networkSpeed: 0, messages: 0 })
  const [overlayActive, setOverlayActive] = useState(false); const [overlayListening, setOverlayListening] = useState(false)
  const overlayRecognitionRef = useRef(null)

  // Interactive code gen
  const [pendingCode, setPendingCode] = useState(null)
  const [copiedId, setCopiedId] = useState(null)
  // Reply-to
  const [replyingTo, setReplyingTo] = useState(null)

  // Music
  const [showMusicPanel, setShowMusicPanel] = useState(false)
  const [musicDesc, setMusicDesc] = useState('')
  const [musicDuration, setMusicDuration] = useState(8)
  const [musicQuality, setMusicQuality] = useState('medium')
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [musicInfo, setMusicInfo] = useState('')

  // Video
  const [showVideoPanel, setShowVideoPanel] = useState(false)
  const [videoDesc, setVideoDesc] = useState('')
  const [videoDuration, setVideoDuration] = useState(5)
  const [videoQuality, setVideoQuality] = useState('medium')
  const [videoRecording, setVideoRecording] = useState(false)
  const [videoProgress, setVideoProgress] = useState(0)
  const [videoInfo, setVideoInfo] = useState('')
  const canvasRef = useRef(null)
  const videoRecorderRef = useRef(null)

  // Cyber Lab
  const [showCyberLab, setShowCyberLab] = useState(false)
  const [cyberTab, setCyberTab] = useState('terminal')
  const [cyberInput, setCyberInput] = useState('')
  const [cyberLines, setCyberLines] = useState([
    { type: 'info', text: 'CYPHER4X Cyber Lab v1.0 — Educational Security Toolkit' },
    { type: 'info', text: '⚠️ For learning only. Only test systems you own or have permission to test.' },
    { type: 'info', text: 'Type "help" for commands, "ethics" for responsible use, "about" for info.' },
  ])
  const [cyberToolOutput, setCyberToolOutput] = useState('')
  const [cyberTool, setCyberTool] = useState('passcheck')
  const [cyberToolInput, setCyberToolInput] = useState('')
  const [ctfChallenge, setCtfChallenge] = useState(null)
  const [ctfAnswer, setCtfAnswer] = useState('')
  const cyberEndRef = useRef(null)

  const synthRef = useRef(typeof window !== "undefined" ? window.speechSynthesis : null)
  const recognitionRef = useRef(null); const msgCounter = useRef(0)
  const fileInputRef = useRef(null); const bgInputRef = useRef(null)
  const chatEndRef = useRef(null)

  const playBeep = useCallback((freq = 800, duration = 0.08) => {
    if (!settings.soundFx) return
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext; if (!Ctx) return
      const ctx = new Ctx(); const osc = ctx.createOscillator(); const g = ctx.createGain()
      osc.frequency.value = freq; osc.type = 'sine'
      g.gain.setValueAtTime(0.1, ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
      osc.connect(g).connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + duration)
    } catch (e) {}
  }, [settings.soundFx])

  const vibrate = useCallback((p = 10) => { if (!settings.haptic) return; try { navigator.vibrate && navigator.vibrate(p) } catch (e) {} }, [settings.haptic])

  // Boot
  useEffect(() => {
    if (!isBooting) return
    const title = "CYPHER4X"; const credit = "Created by Hackers Hub led by Crypty"
    let ti = 0, ci = 0, phase = 'title'
    const interval = setInterval(() => {
      if (phase === 'title') {
        if (ti <= title.length) { setBootTypedText(title.slice(0, ti)); ti++ }
        else { phase = 'pause'; setTimeout(() => { phase = 'credit' }, 500) }
      } else if (phase === 'credit') {
        if (ci <= credit.length) { setBootTypedCredit(credit.slice(0, ci)); ci++ }
        else {
          clearInterval(interval)
          setTimeout(() => {
            setIsBooting(false)
            const auth = getAuth()
            if (auth && userExists(auth.email, auth.pin)) { setEmail(auth.email); setPin(auth.pin); loginUser(auth.email, auth.pin) }
            else {
              setUserMode('guest'); setGuestMessageCount(0)
              const sp = localStorage.getItem('cypher4x_personality')
              if (!sp) setShowPersonalityModal(true); else setAiPersonality(sp)
              if (settings.welcomeEnabled) {
                const today = new Date().toDateString(); const lw = localStorage.getItem('cypher4x_welcome_date')
                if (lw !== today) {
                  localStorage.setItem('cypher4x_welcome_date', today); setShowWelcomeOverlay(true)
                  const msg = "Hello! I'm CYPHER4X, your AI assistant. Welcome!"; setWelcomeMessage(msg); speakText(msg)
                }
              }
            }
          }, 800)
        }
      }
    }, 100)
    return () => clearInterval(interval)
  }, [isBooting, settings.welcomeEnabled])

  useEffect(() => { if (settings.autoScroll && showChatOverview) chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [conversation, showChatOverview, settings.autoScroll])
  useEffect(() => { cyberEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [cyberLines])

  const handleAuthSubmit = () => {
    if (!email || !pin || pin.length !== 4 || !/^\d{4}$/.test(pin)) { setAuthError("Valid email and 4-digit PIN required."); return }
    if (showLogin) {
      if (userExists(email, pin)) { loginUser(email, pin); setShowAuthModal(false) }
      else setAuthError("No account found.")
    } else {
      if (userExists(email, pin)) { setAuthError("Account exists."); return }
      addUser(email, pin)
      const empty = { profile: null, conversation: [], commandHistory: [], events: [], reminders: [], faceRecognition: false, biometricAuth: false, voiceGender: 'female', viewMode: 'android', personality: 'polite', backgroundImage: null, customStyle: null, settings }
      saveUserData(email, pin, empty); loginUser(email, pin); setShowAuthModal(false)
    }
  }
  const loginUser = (email, pin) => { saveAuth(email, pin); setUserMode('loggedin'); loadUserDataByEmail(email, pin); setAuthError(''); setGuestMessageCount(0) }
  const loadUserDataByEmail = (email, pin) => {
    const d = loadUserData(email, pin)
    if (d) {
      setProfile(d.profile || null); setConversation(d.conversation || []); setCommandHistory(d.commandHistory || [])
      setVoiceGender(d.voiceGender || 'female'); setViewMode(d.viewMode || 'android')
      setAiPersonality(d.personality || 'polite'); setBackgroundImage(d.backgroundImage || null)
      if (d.customStyle) setCustomStyle(d.customStyle)
      if (d.settings) setSettings({ ...settings, ...d.settings })
      msgCounter.current = (d.conversation || []).length + 1
    }
  }
  const saveCurrentUserData = () => {
    if (userMode !== 'loggedin') return
    saveUserData(email, pin, { profile, conversation, commandHistory, faceRecognition, biometricAuth, voiceGender, viewMode, personality: aiPersonality, backgroundImage, customStyle, settings })
  }
  useEffect(() => { if (userMode === 'loggedin') saveCurrentUserData() }, [profile, conversation, commandHistory, faceRecognition, biometricAuth, voiceGender, viewMode, aiPersonality, backgroundImage, customStyle, settings])
  useEffect(() => { if (aiPersonality === 'custom' && conversation.length > 3) { const s = analyzeUserStyle(conversation); if (s) setCustomStyle(s) } }, [conversation, aiPersonality])

  const handleLogout = () => {
    if (!confirm("Logout?")) return
    clearAuth(); setUserMode('guest'); setProfile(null); setConversation([]); setCommandHistory([])
    setVoiceGender('female'); setViewMode('android'); setSidebarOpen(false); setGuestMessageCount(0)
    setShowWelcomeOverlay(false); setShowAuthModal(false); msgCounter.current = 0
  }
  const incrementGuestMessage = () => { if (userMode !== 'guest') return; const n = guestMessageCount + 1; setGuestMessageCount(n); if (n >= 5) setShowGuestLimit(true) }

  const setupSpeechRecognition = useCallback((isOneOff = false, onFinal = null) => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) { alert("Speech not supported."); return null }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    const r = new SR(); r.continuous = !isOneOff; r.interimResults = true; r.lang = 'en-US'
    r.onstart = () => { setIsListening(true); setInterimTranscript('') }
    r.onend = () => { setIsListening(false); setInterimTranscript(''); if (!isOneOff && isFullscreenCall) try { r.start() } catch (e) {} }
    r.onerror = (event) => { if (event.error === 'not-allowed') { alert('Allow mic.'); setIsFullscreenCall(false); setIsCallActive(false); setRecordingMode(false); setIsListening(false); return } if (!isOneOff && isFullscreenCall) setTimeout(() => { try { r.start() } catch (e) {} }, 500) }
    r.onresult = async (e) => {
      let f = '', i = ''
      for (let k = e.resultIndex; k < e.results.length; k++) { const res = e.results[k]; if (res.isFinal) f += res[0].transcript; else i += res[0].transcript }
      if (f) { setInterimTranscript(''); setRecordingMode(false); if (onFinal) onFinal(f); else await processUserQuery(f) }
      else if (i) setInterimTranscript(i)
    }
    return r
  }, [isFullscreenCall])

  const speakText = useCallback((text, onEnd = null) => {
    if (!text || !synthRef.current) return
    try {
      synthRef.current.cancel()
      const u = new SpeechSynthesisUtterance(text)
      u.rate = settings.voiceSpeed || 1; u.pitch = voiceGender === 'female' ? 1.3 : 1.0
      u.onstart = () => setIsAISpeaking(true)
      u.onend = () => { setIsAISpeaking(false); if (onEnd) onEnd() }
      u.onerror = () => { setIsAISpeaking(false); if (onEnd) onEnd() }
      synthRef.current.speak(u)
    } catch (e) { setIsAISpeaking(false); if (onEnd) onEnd() }
  }, [voiceGender, settings.voiceSpeed])

  const executeCommand = (query) => {
    const lower = query.toLowerCase().trim()
    if (lower.includes('whatsapp business')) { const g = query.match(/group(?:\s+named)?\s+(.+)/i); if (g) return { response: openWhatsAppGroup(g[1].trim()) }; return { response: openApp('whatsappbusiness') } }
    const waGrp = lower.match(/(?:open\s+)?(?:my\s+)?whatsapp.*group(?:\s+named)?\s+(.+)/i); if (waGrp) return { response: openWhatsAppGroup(waGrp[1].trim()) }
    const appMatch = lower.match(/^open\s+(?:my\s+)?(whatsapp|instagram|facebook|telegram|youtube|spotify|gmail|maps|github)(?:\s+(?:on\s+my\s+device)?)?(?:\s+and\s+open\s+my\s+group\s+named\s+(.+))?$/i)
    if (appMatch) { const k = appMatch[1], g = appMatch[2]; if (k === 'whatsapp' && g) return { response: openWhatsAppGroup(g) }; return { response: openApp(k) } }
    if ((lower.startsWith('secret ') || lower.startsWith('anonymous ')) && settings.secretMode) { const t = query.replace(/^(secret|anonymous)\s+/i, ''); openAnonymous(t); return { response: `Anonymous search: "${t}" 🔒` } }
    if (lower.startsWith('web ') || lower.startsWith('search web ')) { const t = query.replace(/^(web|search web)\s+/i, ''); openAnonymous(t); return { response: `Searching "${t}"...` } }
    if (lower.startsWith('play ')) { const s = lower.replace('play ', '').trim(); window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(s)}`, '_blank'); return { response: `Playing "${s}"! 🎵` } }
    if (lower === 'time' || lower.includes('what time')) return { response: `Time: ${new Date().toLocaleTimeString()} ⏰` }
    if (lower === 'date' || lower.includes('what date') || lower === 'today') return { response: `Today is ${new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} 📅` }
    if (lower.startsWith('calc ') || lower.includes('calculate')) { try { const e = lower.replace('calculate','').replace('calc','').trim(); const r = Function(`"use strict"; return (${e})`)(); if (typeof r === 'number') return { response: `Answer: ${r} 🧮` } } catch (err) {} }
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
        const styled = applyPersonality(code, aiPersonality, customStyle)
        const m = { id: ++msgCounter.current, role: 'assistant', content: styled, time: Date.now() }
        setConversation(prev => [...prev, m]); setPendingCode(null)
        if (settings.codeAutoOverview) setShowChatOverview(true)
      } else {
        const nk = ['language','purpose','detail'][idx]
        setPendingCode({ step: nk, answers: next })
        const qs = { language: "What programming language? (JavaScript, Python, React, etc.)", purpose: "What should the code do?", detail: "Any extra details? (e.g., dark theme, localStorage)" }
        const q = qs[nk]; setConversation(prev => [...prev, { id: ++msgCounter.current, role: 'assistant', content: q, time: Date.now() }])
        if (settings.readAloud || settings.autoStartVoice) speakText(q)
      }
      setIsProcessing(false); return
    }

    if (isCodeRequest(query)) {
      const lang = detectLanguage(query)
      const purpose = query.replace(/^(write|create|generate|make|build)\s+(me\s+)?(an?\s+)?/i, '').replace(/\bcode\b/gi, '').trim() || 'a general application'
      const m = { id: ++msgCounter.current, role: 'assistant', content: `I'll write code for you! 🎨 3 quick questions:\n\n**Q1 — What programming language? (JavaScript, Python, React, etc.)**\n\n_Detected: ${lang}. Reply "auto" to use it._`, time: Date.now() }
      setConversation(prev => [...prev, m])
      setPendingCode({ step: 'language', answers: { language: null }, detected: { language: lang, purpose } })
      if (settings.readAloud || settings.autoStartVoice) speakText('Three questions to generate your code.')
      setIsProcessing(false); return
    }

    const cmd = executeCommand(query)
    if (cmd) {
      const styled = applyPersonality(cmd.response, aiPersonality, customStyle)
      const m = { id: ++msgCounter.current, role: 'assistant', content: styled, time: Date.now() }
      setConversation(prev => [...prev, m]); if (settings.readAloud) speakText(styled)
      setIsProcessing(false); return
    }

    const lower = query.toLowerCase()
    const casual = ['hello','hi','hey','good morning','good afternoon','good evening',"what's up",'sup','yo']
    if (casual.some(p => lower.includes(p))) {
      const reps = ["Hey there!","Hi!","Hello!","Hey!","Hi there!"]
      const r = applyPersonality(reps[Math.floor(Math.random()*reps.length)], aiPersonality, customStyle)
      const m = { id: ++msgCounter.current, role: 'assistant', content: r, time: Date.now() }
      setConversation(prev => [...prev, m]); if (settings.readAloud) speakText(r)
      setIsProcessing(false); return
    }
    if (lower.includes('how are you') || lower.includes('feeling')) {
      const reps = ["I'm fantastic!","Doing great!","In top shape!","Wonderful!"]
      const r = applyPersonality(reps[Math.floor(Math.random()*reps.length)], aiPersonality, customStyle)
      const m = { id: ++msgCounter.current, role: 'assistant', content: r, time: Date.now() }
      setConversation(prev => [...prev, m]); if (settings.readAloud) speakText(r)
      setIsProcessing(false); return
    }

    const result = await searchWeb(query)
    let reply = result.error ? `Search error: ${result.error}` : (result.answer || "No answer found.")
    if (!result.error && result.safestUrl && settings.safeLinks) reply += `\n\n🔗 Recommended source: ${result.safestUrl}`
    reply = applyPersonality(reply, aiPersonality, customStyle)
    const m = { id: ++msgCounter.current, role: 'assistant', content: reply, time: Date.now() }
    setConversation(prev => [...prev, m])
    if (settings.readAloud) speakText(reply.replace(/🔗.*$/s, ''))
    playBeep(500, 0.08); vibrate(10)
    setIsProcessing(false)
  }, [isProcessing, userMode, aiPersonality, customStyle, settings, pendingCode, replyingTo, vibrate, playBeep])

  // Overview voice
  const setupOverviewRecognition = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) { alert("Speech not supported."); return null }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    const r = new SR(); r.continuous = false; r.interimResults = true; r.lang = 'en-US'
    r.onstart = () => { setChatOverviewListening(true); setIsRecordingVoice(true); setVoicePaused(false); setVoiceTranscript('') }
    r.onend = () => { setChatOverviewListening(false); setIsRecordingVoice(false) }
    r.onerror = () => { setChatOverviewListening(false); setIsRecordingVoice(false) }
    r.onresult = (e) => { let f = '', i = ''; for (let k = e.resultIndex; k < e.results.length; k++) { const r2 = e.results[k]; if (r2.isFinal) f += r2[0].transcript; else i += r2[0].transcript } if (f) setVoiceTranscript(f); else if (i) setVoiceTranscript(i) }
    return r
  }, [])
  const startVoiceRecording = useCallback(() => { if (isRecordingVoice || chatOverviewListening) return; if (!chatOverviewRecognitionRef.current) chatOverviewRecognitionRef.current = setupOverviewRecognition(); if (chatOverviewRecognitionRef.current) { try { chatOverviewRecognitionRef.current.start(); setVoiceTranscript('') } catch (e) {} } }, [isRecordingVoice, chatOverviewListening, setupOverviewRecognition])
  const pauseVoiceRecording = useCallback(() => { if (chatOverviewRecognitionRef.current && chatOverviewListening) { try { chatOverviewRecognitionRef.current.stop(); setVoicePaused(true); setChatOverviewListening(false); setIsRecordingVoice(false) } catch (e) {} } }, [chatOverviewListening])
  const resumeVoiceRecording = useCallback(() => { if (voicePaused && chatOverviewRecognitionRef.current) { try { chatOverviewRecognitionRef.current.start(); setVoicePaused(false); setChatOverviewListening(true); setIsRecordingVoice(true) } catch (e) {} } }, [voicePaused])
  const deleteVoiceRecording = useCallback(() => { if (chatOverviewRecognitionRef.current) { try { chatOverviewRecognitionRef.current.stop() } catch (e) {} } setVoiceTranscript(''); setChatOverviewListening(false); setIsRecordingVoice(false); setVoicePaused(false) }, [])
  const sendVoiceRecording = useCallback(() => { const t = voiceTranscript.trim(); if (!t || isProcessing) return; setVoiceTranscript(''); setChatOverviewListening(false); setIsRecordingVoice(false); setVoicePaused(false); if (chatOverviewRecognitionRef.current) { try { chatOverviewRecognitionRef.current.stop() } catch (e) {} } processUserQuery(t) }, [voiceTranscript, isProcessing, processUserQuery])
  useEffect(() => { if (voiceTranscript && !chatOverviewListening) setChatOverviewInput(voiceTranscript) }, [voiceTranscript, chatOverviewListening])
  const sendOverviewText = useCallback(() => { const t = chatOverviewInput.trim(); if (!t || isProcessing) return; setChatOverviewInput(''); processUserQuery(t) }, [chatOverviewInput, isProcessing, processUserQuery])

  const handleOverviewFileShare = useCallback((e) => {
    const files = e.target.files; if (!files || files.length === 0) return
    const f = files[0]; if (f.size > 20 * 1024 * 1024) { alert("File too large! Max 20MB."); return }
    const rd = new FileReader()
    rd.onloadend = () => {
      const fd = { id: ++msgCounter.current, role: 'user', content: `📎 ${f.name}`, time: Date.now(), file: { name: f.name, type: f.type, data: rd.result, size: f.size } }
      setConversation(prev => [...prev, fd])
      setCommandHistory(prev => [...prev, { command: `📎 ${f.name}`, timestamp: Date.now() }])
      const reply = `Received your file: ${f.name} (${(f.size/1024).toFixed(1)} KB).`
      const am = { id: ++msgCounter.current, role: 'assistant', content: reply, time: Date.now() }
      setConversation(prev => [...prev, am]); if (chatOverviewVoiceEnabled) speakText(reply)
    }
    rd.readAsDataURL(f); e.target.value = ''
  }, [speakText, chatOverviewVoiceEnabled])

  const handleEditMessage = useCallback((id) => {
    const msg = conversation.find(m => m.id === id); if (!msg || msg.role !== 'user') return
    const nc = prompt("Edit:", msg.content)
    if (nc !== null && nc.trim()) setConversation(prev => prev.map(m => m.id === id ? { ...m, content: nc.trim() } : m))
  }, [conversation])
  const handleDeleteMessage = useCallback((id) => { if (settings.confirmDelete && !confirm("Delete?")) return; setConversation(prev => prev.filter(m => m.id !== id)) }, [settings.confirmDelete])
  const handleShareMessage = useCallback(async (msg) => {
    const c = msg.content
    if (navigator.share) { try { await navigator.share({ title: 'CYPHER4X', text: c }) } catch (e) {} }
    else { try { await navigator.clipboard.writeText(c); alert('Copied!') } catch (e) {} }
  }, [])
  const copyCode = async (code, id) => { try { await navigator.clipboard.writeText(code); setCopiedId(id); setTimeout(() => setCopiedId(null), 1500); vibrate(20) } catch (e) {} }

  const handleReply = (msg) => { setReplyingTo({ id: msg.id, content: msg.content }); setShowChatOverview(true) }

  const renderMessageContent = (msg) => {
    const content = msg.content
    const regex = /```(\w+)?\n([\s\S]*?)```/g
    const parts = []; let last = 0; let m; let idx = 0
    while ((m = regex.exec(content)) !== null) {
      if (m.index > last) parts.push({ type: 'text', value: content.slice(last, m.index) })
      parts.push({ type: 'code', lang: m[1] || 'text', value: m[2], key: `${msg.id}-${idx++}` })
      last = m.index + m[0].length
    }
    if (last < content.length) parts.push({ type: 'text', value: content.slice(last) })
    if (parts.length === 0) parts.push({ type: 'text', value: content })

    return parts.map((p, i) => p.type === 'code' ? (
      <div key={p.key || i} style={styles.codeBlockWrap}>
        <div style={styles.codeBlockHeader}>
          <span style={styles.codeLang}>{p.lang}</span>
          <button onClick={() => copyCode(p.value, p.key)} style={styles.codeCopyBtn}>
            <Icon name={copiedId === p.key ? 'check' : 'copy'} size={14} color="#fff" />
            <span>{copiedId === p.key ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
        <pre style={styles.codeBlock}>{p.value}</pre>
      </div>
    ) : (
      <span key={i} style={styles.chatOverviewMsgText}>{p.value}</span>
    ))
  }

  const toggleFullscreenCall = useCallback(() => {
    if (isFullscreenCall) {
      setIsFullscreenCall(false); setIsCallActive(false)
      if (recognitionRef.current) try { recognitionRef.current.stop() } catch (e) {}
      setIsListening(false); setInterimTranscript(''); synthRef.current?.cancel(); setIsAISpeaking(false)
    } else {
      setIsFullscreenCall(true); setIsCallActive(true)
      if (!recognitionRef.current) recognitionRef.current = setupSpeechRecognition(false, (t) => processUserQuery(t))
      if (recognitionRef.current) { try { recognitionRef.current.start(); const g = "I'm listening."; speakText(g) } catch (e) {} }
    }
  }, [isFullscreenCall, setupSpeechRecognition, speakText, processUserQuery])

  const interruptAndListen = useCallback(() => { if (synthRef.current) synthRef.current.cancel(); setIsAISpeaking(false); if (recognitionRef.current) try { recognitionRef.current.start() } catch (e) {} }, [])

  const startRecording = useCallback(() => {
    if (isRecording || isProcessing || isFullscreenCall) return
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) { alert("Speech not supported."); return }
    setRecordingMode(true); vibrate(30)
    const r = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
    r.continuous = false; r.interimResults = true; r.lang = 'en-US'
    r.onstart = () => { setIsRecording(true); setIsListening(true); setInterimTranscript('') }
    r.onend = () => { setIsRecording(false); setIsListening(false) }
    r.onerror = (event) => { setIsRecording(false); setRecordingMode(false); setIsListening(false); if (event.error === 'not-allowed') alert('Allow mic.'); else alert('Error: ' + event.error) }
    r.onresult = async (event) => { let f = '', i = ''; for (let k = event.resultIndex; k < event.results.length; k++) { const res = event.results[k]; if (res.isFinal) f += res[0].transcript; else i += res[0].transcript } if (f) { setInterimTranscript(''); setRecordingMode(false); await processUserQuery(f) } else if (i) setInterimTranscript(i) }
    recognitionRef.current = r
    try { r.start() } catch (e) { alert('Failed: ' + e.message); setRecordingMode(false) }
  }, [isRecording, isProcessing, isFullscreenCall, processUserQuery, vibrate])

  const sendInterim = useCallback(() => { if (!interimTranscript.trim() || isProcessing) return; const t = interimTranscript.trim(); setInterimTranscript(''); setRecordingMode(false); if (recognitionRef.current) try { recognitionRef.current.stop() } catch (e) {}; processUserQuery(t) }, [interimTranscript, isProcessing, processUserQuery])
  const cancelRecording = useCallback(() => { setInterimTranscript(''); setRecordingMode(false); setIsRecording(false); setIsListening(false); if (recognitionRef.current) try { recognitionRef.current.stop() } catch (e) {} }, [])
  const sendTextMessage = useCallback(() => { const t = inputText.trim(); if (!t || isProcessing) return; setInputText(''); processUserQuery(t) }, [inputText, isProcessing, processUserQuery])

  const handlePersonalitySelect = (id) => {
    setAiPersonality(id); setSettings({ ...settings, personality: id }); localStorage.setItem('cypher4x_personality', id); setShowPersonalityModal(false)
    if (settings.welcomeEnabled) { const today = new Date().toDateString(); const lw = localStorage.getItem('cypher4x_welcome_date'); if (lw !== today) { localStorage.setItem('cypher4x_welcome_date', today); setShowWelcomeOverlay(true); const msg = "Hello! I'm CYPHER4X."; setWelcomeMessage(msg); speakText(msg) } }
  }

  const handleBackgroundChange = (e) => {
    const f = e.target.files[0]; if (!f) return
    if (!f.type.startsWith('image/')) { alert("Select an image!"); return }
    if (f.size > 5 * 1024 * 1024) { alert("Too large! Max 5MB"); return }
    const rd = new FileReader(); rd.onloadend = () => setBackgroundImage(rd.result); rd.readAsDataURL(f)
  }
  const resetBackground = () => { setBackgroundImage(null); if (bgInputRef.current) bgInputRef.current.value = '' }
  const toggleView = useCallback(() => { setViewMode(prev => { const n = prev === 'android' ? 'pc' : 'android'; if (n === 'pc') setShowRotateOverlay(true); return n }); setSidebarOpen(false) }, [])

  const toggleOverlay = () => {
    const s = !overlayActive; setOverlayActive(s)
    if (s) {
      if (!overlayRecognitionRef.current) {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) { alert("Not supported"); setOverlayActive(false); return }
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition
        const rec = new SR(); rec.continuous = false; rec.interimResults = false; rec.lang = 'en-US'
        rec.onstart = () => setOverlayListening(true); rec.onend = () => setOverlayListening(false); rec.onerror = () => setOverlayListening(false)
        rec.onresult = (event) => { const t = event.results[0][0].transcript; setOverlayActive(false); processUserQuery(t) }
        overlayRecognitionRef.current = rec
      }
      try { overlayRecognitionRef.current.start() } catch (e) {}
    } else { try { overlayRecognitionRef.current?.stop() } catch (e) {}; setOverlayListening(false) }
  }

  useEffect(() => {
    const t = setInterval(() => {
      setStats(prev => ({ ...prev, uptime: Math.floor((Date.now() - APP_START_TIME)/1000), cpuUsage: Math.floor(Math.random()*30)+10, cpuTemp: Math.floor(Math.random()*20)+55, ramUsage: Math.floor(Math.random()*4)+3.5, storageUsed: Math.floor(Math.random()*50)+120, networkSpeed: (Math.random()*5+0.5).toFixed(2), messages: conversation.filter(m => m.role === 'user').length }))
    }, 3000)
    return () => clearInterval(t)
  }, [conversation])

  // Music handler
  const handleGenerateMusic = () => {
    try {
      setMusicPlaying(true)
      const style = guessMusicStyle(musicDesc)
      const bars = Math.round(musicDuration * style.bpm / 60 / 4)
      setMusicInfo(`Style: ${style.name} • Mood: ${style.mood} • ${style.bpm} BPM • ${bars} bars`)
      const notes = generateRichMelody(style.bpm, style.scale, Math.max(2, bars), musicQuality)
      const { ctx, duration } = playRichMelody(notes, musicQuality)
      setTimeout(() => { setMusicPlaying(false); try { ctx.close() } catch (e) {} }, (duration + 1) * 1000)
    } catch (e) { alert('Music error: ' + e.message); setMusicPlaying(false) }
  }

  // Video handler
  const handleStartVideo = async () => {
    if (!canvasRef.current) return
    const style = guessVideoStyle(videoDesc)
    setVideoInfo(`Style: ${style.label} • ${videoDuration}s • ${videoQuality} quality`)
    setVideoRecording(true)
    const rec = startCanvasVideo(canvasRef.current, style, (t) => setVideoProgress(Math.floor(t * 10) % 100))
    videoRecorderRef.current = rec
    setTimeout(async () => {
      if (!videoRecorderRef.current) return
      const blob = await videoRecorderRef.current.stop()
      videoRecorderRef.current = null; setVideoRecording(false)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a'); a.href = url; a.download = `cypher4x_video_${Date.now()}.webm`; a.click()
      URL.revokeObjectURL(url)
    }, videoDuration * 1000)
  }

  // Cyber terminal
  const runCyberCommand = async (cmd) => {
    const parts = cmd.trim().split(/\s+/)
    const base = parts[0]?.toLowerCase()
    const args = parts.slice(1).join(' ')
    let out = ''
    try {
      switch (base) {
        case 'help': out = CYBER_TERMINAL_COMMANDS.help; break
        case 'about': out = CYBER_TERMINAL_COMMANDS.about; break
        case 'ethics': out = CYBER_TERMINAL_COMMANDS.ethics; break
        case 'clear': setCyberLines([{ type: 'info', text: 'Cleared.' }]); return
        case 'hash': out = await CYBER_TOOLS.hash(args); break
        case 'base64': out = CYBER_TOOLS.base64(args); break
        case 'unbase64': out = CYBER_TOOLS.unbase64(args); break
        case 'hex': out = CYBER_TOOLS.hex(args); break
        case 'rot13': out = CYBER_TOOLS.rot13(args); break
        case 'dns': out = await CYBER_TOOLS.dns(args); break
        case 'ip': out = await CYBER_TOOLS.ip(args); break
        case 'whois': out = await CYBER_TOOLS.whois(args); break
        case 'portscan': out = CYBER_TOOLS.portScan(args); break
        case 'passcheck': out = CYBER_TOOLS.passwordStrength(args); break
        case 'ctf': { const ch = CTF_CHALLENGES[Math.floor(Math.random() * CTF_CHALLENGES.length)]; setCtfChallenge(ch); out = `🎯 CTF Challenge:\n${ch.q}\n\nType "ctfcheck <answer>" to verify.`; break }
        case 'ctfcheck': {
          if (!ctfChallenge) { out = 'No active CTF. Type "ctf" to start.'; break }
          out = args.toLowerCase().trim() === ctfChallenge.a.toLowerCase() ? '✅ Correct!' : `❌ Wrong. Answer: ${ctfChallenge.a}`
          setCtfChallenge(null)
          break
        }
        default: out = `Unknown: ${base}. Type "help" for commands.`
      }
    } catch (e) { out = 'Error: ' + e.message }
    setCyberLines(prev => [...prev, { type: 'cmd', text: `$ ${cmd}` }, { type: 'out', text: out }])
  }

  const handleCyberSubmit = (e) => { e.preventDefault(); if (!cyberInput.trim()) return; runCyberCommand(cyberInput); setCyberInput('') }

  // Cyber tool
  const runCyberTool = async () => {
    let out = ''
    try {
      switch (cyberTool) {
        case 'passcheck': out = CYBER_TOOLS.passwordStrength(cyberToolInput); break
        case 'hash': out = await CYBER_TOOLS.hash(cyberToolInput); break
        case 'base64': out = CYBER_TOOLS.base64(cyberToolInput); break
        case 'unbase64': out = CYBER_TOOLS.unbase64(cyberToolInput); break
        case 'hex': out = CYBER_TOOLS.hex(cyberToolInput); break
        case 'rot13': out = CYBER_TOOLS.rot13(cyberToolInput); break
        case 'dns': out = await CYBER_TOOLS.dns(cyberToolInput); break
        case 'ip': out = await CYBER_TOOLS.ip(cyberToolInput); break
        case 'portscan': out = CYBER_TOOLS.portScan(cyberToolInput); break
        case 'whois': out = await CYBER_TOOLS.whois(cyberToolInput); break
        default: out = 'Unknown tool'
      }
    } catch (e) { out = 'Error: ' + e.message }
    setCyberToolOutput(out)
  }

  const handleAvatarChange = useCallback((e) => { const f = e.target.files[0]; if (!f) return; if (!f.type.startsWith('image/')) { alert("Select image!"); return }; const rd = new FileReader(); rd.onloadend = () => setProfileForm(p => ({ ...p, avatar: rd.result })); rd.readAsDataURL(f) }, [])
  const saveProfile = useCallback(() => { if (!profileForm.name.trim() || !profileForm.username.trim()) { alert("Name & Username required!"); return } const np = { ...profileForm, username: profileForm.username.toLowerCase().replace(/[^a-z0-9_]/g,''), updatedAt: new Date().toISOString() }; setProfile(np); setEditingProfile(false); speakText(`Updated, ${np.name}!`) }, [profileForm, speakText])
  const openEditProfile = useCallback(() => { setProfileForm({ name: profile?.name || "", username: profile?.username || "", avatar: profile?.avatar || "", bio: profile?.bio || "" }); setEditingProfile(true); setSidebarOpen(false) }, [profile])
  const resetAllData = useCallback(() => { if (!confirm("Reset ALL data?")) return; if (userMode === 'loggedin') saveUserData(email, pin, { profile: null, conversation: [], commandHistory: [], faceRecognition: false, biometricAuth: false, voiceGender: 'female', viewMode: 'android', personality: 'polite', backgroundImage: null, customStyle: null, settings }); setProfile(null); setConversation([]); setCommandHistory([]); setFaceRecognition(false); setBiometricAuth(false); setVoiceGender('female'); setViewMode('android'); setBackgroundImage(null); setAiPersonality('polite'); setCustomStyle(null); setSidebarOpen(false) }, [userMode, email, pin, settings])

  const clearConversation = useCallback(() => setConversation([]), [])
  const clearCommands = useCallback(() => setCommandHistory([]), [])
  const exportChat = useCallback(() => {
    const data = { conversation, commandHistory, profile, exportedAt: new Date().toISOString() }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `cypher4x_export_${Date.now()}.json`; a.click(); URL.revokeObjectURL(url)
  }, [conversation, commandHistory, profile])

  const formatUptime = (s) => `${Math.floor(s/3600).toString().padStart(2,'0')}:${Math.floor((s%3600)/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`
  const formatTime = (ts) => new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  // ============ RENDER ============
  if (isBooting) {
    return (
      <div style={styles.bootContainer}>
        <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
        <div style={styles.bootBackground} />
        <div style={styles.bootContent}>
          <h1 style={styles.bootTitle}>{bootTypedText}<span style={styles.bootCursor}>|</span></h1>
          <p style={styles.bootSubtitle}>Advanced AI System</p>
          <div style={styles.bootCredit}>{bootTypedCredit}{bootTypedCredit.length > 0 && bootTypedCredit.length < 38 && <span style={styles.bootCursor}>|</span>}</div>
        </div>
      </div>
    )
  }

  if (showPersonalityModal) {
    return (
      <div style={styles.personalityOverlay}>
        <div style={styles.personalityCard}>
          <h1 style={styles.personalityTitle}>CYPHER4X</h1>
          <p style={styles.personalitySubtitle}>Choose your AI personality</p>
          <div style={styles.personalityGrid}>
            {PERSONALITIES.map(p => (
              <button key={p.id} onClick={() => handlePersonalitySelect(p.id)} style={{ ...styles.personalityOption, borderColor: aiPersonality === p.id ? '#ff003c' : '#333', backgroundColor: aiPersonality === p.id ? 'rgba(255,0,60,0.15)' : '#1a1a1a' }}>
                <span style={styles.personalityIcon}>{p.icon}</span>
                <span style={styles.personalityLabel}>{p.label}</span>
                <span style={styles.personalityDesc}>{p.desc}</span>
              </button>
            ))}
          </div>
          <p style={styles.personalityHint}>Change anytime in Settings</p>
        </div>
      </div>
    )
  }

  if (showGuestLimit) {
    return (
      <div style={styles.guestLimitOverlay}>
        <div style={styles.guestLimitCard}>
          <h2 style={styles.guestLimitTitle}>Free Trial Limit Reached</h2>
          <p style={styles.guestLimitText}>You've used all 5 free messages. Login or sign up to continue.</p>
          <div style={styles.guestLimitButtons}>
            <button onClick={() => { setShowGuestLimit(false); setShowLogin(true); setShowAuthModal(true) }} style={styles.guestLimitLoginBtn}>Login</button>
            <button onClick={() => { setShowGuestLimit(false); setShowLogin(false); setShowAuthModal(true) }} style={styles.guestLimitSignupBtn}>Sign Up</button>
          </div>
        </div>
      </div>
    )
  }

  if (showWelcomeOverlay) {
    return (
      <div style={styles.welcomeOverlay}>
        <div style={styles.welcomeCard}>
          <div style={styles.welcomeBall}><RedBall isSpeaking={isAISpeaking} /></div>
          <div style={styles.welcomeMessageText}>{welcomeMessage}</div>
        </div>
      </div>
    )
  }

  if (showAuthModal) {
    return (
      <div style={styles.authModalOverlay}>
        <div style={styles.authModalCard}>
          <button onClick={() => setShowAuthModal(false)} style={styles.authModalClose}>✕</button>
          <h1 style={styles.authTitle}>CYPHER4X</h1>
          <p style={styles.authSubtitle}>{showLogin ? 'Login' : 'Sign Up'}</p>
          <div style={styles.authError}>{authError}</div>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.authInput} />
          <input type="password" placeholder="4-digit PIN" value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g,'').slice(0,4))} style={styles.authInput} maxLength="4" />
          <button onClick={handleAuthSubmit} style={styles.authBtn}>{showLogin ? 'Login' : 'Create Account'}</button>
          <div style={styles.authSwitch}>
            <span>{showLogin ? "No account?" : "Have account?"}</span>
            <button onClick={() => { setShowLogin(!showLogin); setAuthError('') }} style={styles.authSwitchBtn}>{showLogin ? 'Sign Up' : 'Login'}</button>
          </div>
        </div>
      </div>
    )
  }

  // ============ SETTINGS ============
  if (showSettings) {
    return (
      <div style={styles.settingsFullscreen}>
        <style>{`
          .toggle-switch { position: relative; display: inline-block; width: 46px; height: 24px; flex-shrink: 0; }
          .toggle-switch input { opacity: 0; width: 0; height: 0; }
          .toggle-slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #333; transition: .3s; border-radius: 24px; }
          .toggle-slider:before { content: ""; position: absolute; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: #fff; transition: .3s; border-radius: 50%; }
          .toggle-switch input:checked + .toggle-slider { background-color: #ff003c; }
          .toggle-switch input:checked + .toggle-slider:before { transform: translateX(22px); }
        `}</style>
        <div style={styles.settingsHeaderFull}>
          <h1 style={styles.settingsTitleFull}>Settings</h1>
          <button onClick={() => setShowSettings(false)} style={styles.settingsCloseFull}><Icon name="close" size={28} color="#fff" /></button>
        </div>
        <div style={styles.settingsBodyFull}>
          <div style={styles.settingsSection}>
            <h3 style={styles.settingsSectionTitle}>General</h3>
            <div style={styles.settingItem}><span>Welcome Messages</span><label className="toggle-switch"><input type="checkbox" checked={settings.welcomeEnabled} onChange={(e) => setSettings({ ...settings, welcomeEnabled: e.target.checked })} /><span className="toggle-slider"></span></label></div>
            <div style={styles.settingItem}><span>Auto-start Voice</span><label className="toggle-switch"><input type="checkbox" checked={settings.autoStartVoice} onChange={(e) => setSettings({ ...settings, autoStartVoice: e.target.checked })} /><span className="toggle-slider"></span></label></div>
            <div style={styles.settingItem}><span>Read Aloud Responses</span><label className="toggle-switch"><input type="checkbox" checked={settings.readAloud} onChange={(e) => setSettings({ ...settings, readAloud: e.target.checked })} /><span className="toggle-slider"></span></label></div>
            <div style={styles.settingItem}><span>Safe Links</span><label className="toggle-switch"><input type="checkbox" checked={settings.safeLinks} onChange={(e) => setSettings({ ...settings, safeLinks: e.target.checked })} /><span className="toggle-slider"></span></label></div>
            <div style={styles.settingItem}><span>Secret Mode</span><label className="toggle-switch"><input type="checkbox" checked={settings.secretMode} onChange={(e) => setSettings({ ...settings, secretMode: e.target.checked })} /><span className="toggle-slider"></span></label></div>
          </div>
          <div style={styles.settingsSection}>
            <h3 style={styles.settingsSectionTitle}>Interface</h3>
            <div style={styles.settingItem}><span>Auto-scroll Chat</span><label className="toggle-switch"><input type="checkbox" checked={settings.autoScroll} onChange={(e) => setSettings({ ...settings, autoScroll: e.target.checked })} /><span className="toggle-slider"></span></label></div>
            <div style={styles.settingItem}><span>Show Timestamps</span><label className="toggle-switch"><input type="checkbox" checked={settings.showTimestamps} onChange={(e) => setSettings({ ...settings, showTimestamps: e.target.checked })} /><span className="toggle-slider"></span></label></div>
            <div style={styles.settingItem}><span>Typing Indicator</span><label className="toggle-switch"><input type="checkbox" checked={settings.typingIndicator} onChange={(e) => setSettings({ ...settings, typingIndicator: e.target.checked })} /><span className="toggle-slider"></span></label></div>
            <div style={styles.settingItem}><span>Compact Mode</span><label className="toggle-switch"><input type="checkbox" checked={settings.compactMode} onChange={(e) => setSettings({ ...settings, compactMode: e.target.checked })} /><span className="toggle-slider"></span></label></div>
            <div style={styles.settingItem}><span>High Contrast</span><label className="toggle-switch"><input type="checkbox" checked={settings.highContrast} onChange={(e) => setSettings({ ...settings, highContrast: e.target.checked })} /><span className="toggle-slider"></span></label></div>
          </div>
          <div style={styles.settingsSection}>
            <h3 style={styles.settingsSectionTitle}>Feedback</h3>
            <div style={styles.settingItem}><span>Haptic Feedback</span><label className="toggle-switch"><input type="checkbox" checked={settings.haptic} onChange={(e) => setSettings({ ...settings, haptic: e.target.checked })} /><span className="toggle-slider"></span></label></div>
            <div style={styles.settingItem}><span>Sound Effects</span><label className="toggle-switch"><input type="checkbox" checked={settings.soundFx} onChange={(e) => setSettings({ ...settings, soundFx: e.target.checked })} /><span className="toggle-slider"></span></label></div>
            <div style={styles.settingItem}><span>Confirm Before Delete</span><label className="toggle-switch"><input type="checkbox" checked={settings.confirmDelete} onChange={(e) => setSettings({ ...settings, confirmDelete: e.target.checked })} /><span className="toggle-slider"></span></label></div>
          </div>
          <div style={styles.settingsSection}>
            <h3 style={styles.settingsSectionTitle}>AI Behavior</h3>
            <div style={styles.settingItem}><span>Code: Auto-open Overview</span><label className="toggle-switch"><input type="checkbox" checked={settings.codeAutoOverview} onChange={(e) => setSettings({ ...settings, codeAutoOverview: e.target.checked })} /><span className="toggle-slider"></span></label></div>
            <div style={styles.settingItem}><span>Floating Assistant</span><label className="toggle-switch"><input type="checkbox" checked={settings.overlayButton} onChange={(e) => setSettings({ ...settings, overlayButton: e.target.checked })} /><span className="toggle-slider"></span></label></div>
          </div>
          <div style={styles.settingsSection}>
            <h3 style={styles.settingsSectionTitle}>Voice</h3>
            <div style={styles.settingItem}><span>Voice Speed</span><input type="range" min="0.5" max="2" step="0.1" value={settings.voiceSpeed} onChange={(e) => setSettings({ ...settings, voiceSpeed: parseFloat(e.target.value) })} style={styles.settingsRange} /><span style={styles.settingsValue}>{settings.voiceSpeed}x</span></div>
            <div style={styles.settingItem}><span>Voice Gender</span><select value={voiceGender} onChange={(e) => setVoiceGender(e.target.value)} style={styles.settingsSelect}><option value="male">Male</option><option value="female">Female</option></select></div>
          </div>
          <div style={styles.settingsSection}>
            <h3 style={styles.settingsSectionTitle}>AI Personality</h3>
            <div style={styles.personalityGridSettings}>
              {PERSONALITIES.map(p => (
                <button key={p.id} onClick={() => { setAiPersonality(p.id); setSettings({ ...settings, personality: p.id }); localStorage.setItem('cypher4x_personality', p.id) }} style={{ ...styles.personalityOptionSmall, borderColor: aiPersonality === p.id ? '#ff003c' : '#333', backgroundColor: aiPersonality === p.id ? 'rgba(255,0,60,0.15)' : '#1a1a1a' }}>
                  <span style={{ fontSize: '20px' }}>{p.icon}</span>
                  <span style={{ fontSize: '12px', color: '#fff', fontWeight: 'bold' }}>{p.label}</span>
                </button>
              ))}
            </div>
            {aiPersonality === 'custom' && customStyle && <p style={styles.bgHint}>Learned — Short: {customStyle.short ? 'yes' : 'no'}, Formal: {customStyle.formal ? 'yes' : 'no'}, Emoji: {customStyle.emoji ? 'yes' : 'no'}, Excited: {customStyle.excited ? 'yes' : 'no'} (from {customStyle.count} msgs)</p>}
          </div>
          <div style={styles.settingsSection}>
            <h3 style={styles.settingsSectionTitle}>Background</h3>
            <div style={styles.backgroundControls}>
              <label style={styles.uploadBtn}><Icon name="image" size={18} color="#fff" /><span>Choose Image</span><input ref={bgInputRef} type="file" accept="image/*" onChange={handleBackgroundChange} style={{ display: 'none' }} /></label>
              {backgroundImage && <button onClick={resetBackground} style={styles.resetBtn}><Icon name="refresh" size={18} color="#fff" /><span>Reset</span></button>}
            </div>
            {backgroundImage && <div style={styles.bgPreview}><img src={backgroundImage} alt="Preview" style={styles.bgPreviewImg} /></div>}
            <p style={styles.bgHint}>The Red Ball remains on top.</p>
          </div>
          <div style={styles.settingsSection}>
            <h3 style={styles.settingsSectionTitle}>About Overlay</h3>
            <p style={styles.bgHint}>Download the App for the overlay Feature to work.</p>
          </div>
        </div>
        <button onClick={() => setShowSettings(false)} style={styles.settingsDoneFull}>Done</button>
      </div>
    )
  }

  // ============ MUSIC ============
  if (showMusicPanel) {
    return (
      <div style={styles.settingsFullscreen}>
        <div style={styles.settingsHeaderFull}>
          <h1 style={styles.settingsTitleFull}>🎵 Music Generator</h1>
          <button onClick={() => setShowMusicPanel(false)} style={styles.settingsCloseFull}><Icon name="close" size={28} color="#fff" /></button>
        </div>
        <div style={styles.settingsBodyFull}>
          <div style={styles.settingsSection}>
            <h3 style={styles.settingsSectionTitle}>Describe Your Music</h3>
            <input value={musicDesc} onChange={(e) => setMusicDesc(e.target.value)} placeholder="e.g. love song, sad piano, happy pop, epic orchestral..." style={styles.settingsSelect} />
            <p style={styles.bgHint}>Try: love, pink, sad, happy, chill, epic</p>
          </div>
          <div style={styles.settingsSection}>
            <h3 style={styles.settingsSectionTitle}>Duration</h3>
            <div style={styles.settingItem}><span>{musicDuration} seconds</span><input type="range" min="4" max="60" step="2" value={musicDuration} onChange={(e) => setMusicDuration(parseInt(e.target.value))} style={styles.settingsRange} /></div>
          </div>
          <div style={styles.settingsSection}>
            <h3 style={styles.settingsSectionTitle}>Quality</h3>
            <select value={musicQuality} onChange={(e) => setMusicQuality(e.target.value)} style={styles.settingsSelect}>
              <option value="low">Low — single layer</option>
              <option value="medium">Medium — melody + bass</option>
              <option value="high">High — melody + bass + rich tone</option>
            </select>
          </div>
          {musicInfo && <p style={{ color: '#4f8', textAlign: 'center', fontSize: 12 }}>{musicInfo}</p>}
        </div>
        <button onClick={handleGenerateMusic} disabled={musicPlaying} style={styles.settingsDoneFull}>{musicPlaying ? 'Playing...' : 'Generate & Play'}</button>
      </div>
    )
  }

  // ============ VIDEO ============
  if (showVideoPanel) {
    return (
      <div style={styles.settingsFullscreen}>
        <div style={styles.settingsHeaderFull}>
          <h1 style={styles.settingsTitleFull}>🎬 Video Generator</h1>
          <button onClick={() => setShowVideoPanel(false)} style={styles.settingsCloseFull}><Icon name="close" size={28} color="#fff" /></button>
        </div>
        <div style={styles.settingsBodyFull}>
          <div style={styles.settingsSection}>
            <h3 style={styles.settingsSectionTitle}>Describe Your Video</h3>
            <input value={videoDesc} onChange={(e) => setVideoDesc(e.target.value)} placeholder="e.g. anime sakura, cyberpunk, cartoon, space..." style={styles.settingsSelect} />
            <p style={styles.bgHint}>Try: anime, movie, cartoon, cyber, nature, space, abstract</p>
          </div>
          <div style={styles.settingsSection}>
            <h3 style={styles.settingsSectionTitle}>Duration</h3>
            <div style={styles.settingItem}><span>{videoDuration} seconds</span><input type="range" min="3" max="30" step="1" value={videoDuration} onChange={(e) => setVideoDuration(parseInt(e.target.value))} style={styles.settingsRange} /></div>
          </div>
          <div style={styles.settingsSection}>
            <h3 style={styles.settingsSectionTitle}>Quality</h3>
            <select value={videoQuality} onChange={(e) => setVideoQuality(e.target.value)} style={styles.settingsSelect}>
              <option value="low">Low (240p)</option>
              <option value="medium">Medium (480p)</option>
              <option value="high">High (720p)</option>
            </select>
          </div>
          <canvas ref={canvasRef} width={videoQuality === 'high' ? 720 : videoQuality === 'medium' ? 480 : 320} height={videoQuality === 'high' ? 480 : videoQuality === 'medium' ? 320 : 240} style={{ width: '100%', borderRadius: 12, background: '#000', marginTop: 8 }} />
          {videoInfo && <p style={{ color: '#4f8', textAlign: 'center', fontSize: 12 }}>{videoInfo}</p>}
          {videoRecording && <p style={{ color: '#ff6688', textAlign: 'center' }}>● Recording... {videoProgress}%</p>}
        </div>
        {!videoRecording ? (
          <button onClick={handleStartVideo} style={styles.settingsDoneFull}>Start & Record ({videoDuration}s)</button>
        ) : (
          <button onClick={() => { videoRecorderRef.current = null; setVideoRecording(false) }} style={styles.settingsDoneFull}>Stop</button>
        )}
      </div>
    )
  }

  // ============ CYBER LAB ============
  if (showCyberLab) {
    const tools = [
      { id: 'passcheck', label: 'Password' }, { id: 'hash', label: 'Hash' }, { id: 'base64', label: 'B64 Enc' }, { id: 'unbase64', label: 'B64 Dec' },
      { id: 'hex', label: 'Hex' }, { id: 'rot13', label: 'ROT13' }, { id: 'dns', label: 'DNS' }, { id: 'ip', label: 'IP' }, { id: 'whois', label: 'WHOIS' }, { id: 'portscan', label: 'PortSim' },
    ]
    return (
      <div style={styles.settingsFullscreen}>
        <div style={styles.settingsHeaderFull}>
          <h1 style={styles.settingsTitleFull}>🔒 Cyber Lab</h1>
          <button onClick={() => setShowCyberLab(false)} style={styles.settingsCloseFull}><Icon name="close" size={28} color="#fff" /></button>
        </div>
        <div style={{ display: 'flex', padding: '8px 16px', gap: 8, flexShrink: 0, background: '#111', borderBottom: '1px solid #333' }}>
          <button onClick={() => setCyberTab('terminal')} style={{ flex: 1, padding: 10, background: cyberTab === 'terminal' ? '#ff003c' : '#1a1a1a', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 'bold', cursor: 'pointer' }}>Terminal</button>
          <button onClick={() => setCyberTab('tools')} style={{ flex: 1, padding: 10, background: cyberTab === 'tools' ? '#ff003c' : '#1a1a1a', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 'bold', cursor: 'pointer' }}>Tools</button>
        </div>
        {cyberTab === 'terminal' && (
          <>
            <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: 16, background: '#000', fontFamily: "'Courier New', monospace", fontSize: 13, color: '#ddd', WebkitOverflowScrolling: 'touch' }}>
              {cyberLines.map((l, i) => (
                <pre key={i} style={{ margin: '2px 0', whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: l.type === 'cmd' ? '#4f8' : l.type === 'info' ? '#ff6688' : '#ddd', fontWeight: l.type === 'cmd' ? 'bold' : 'normal' }}>{l.text}</pre>
              ))}
              <div ref={cyberEndRef} />
            </div>
            <form onSubmit={handleCyberSubmit} style={{ display: 'flex', gap: 8, padding: 12, paddingBottom: 'max(12px, env(safe-area-inset-bottom, 12px))', background: '#111', borderTop: '1px solid #333', flexShrink: 0 }}>
              <span style={{ color: '#4f8', fontWeight: 'bold', fontFamily: "'Courier New', monospace" }}>$</span>
              <input value={cyberInput} onChange={(e) => setCyberInput(e.target.value)} placeholder="Type a command (help)" style={{ flex: 1, padding: 10, background: '#000', border: '1px solid #333', color: '#fff', borderRadius: 4, fontFamily: "'Courier New', monospace", outline: 'none' }} autoComplete="off" autoCapitalize="off" spellCheck="false" />
              <button type="submit" style={{ padding: '8px 14px', background: '#ff003c', border: 'none', borderRadius: 4, color: '#fff', cursor: 'pointer' }}><Icon name="send" size={16} color="#fff" /></button>
            </form>
          </>
        )}
        {cyberTab === 'tools' && (
          <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: 16, WebkitOverflowScrolling: 'touch' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
              {tools.map(t => (
                <button key={t.id} onClick={() => { setCyberTool(t.id); setCyberToolOutput('') }} style={{ padding: '6px 12px', borderRadius: 20, border: cyberTool === t.id ? '1px solid #ff003c' : '1px solid #333', background: cyberTool === t.id ? 'rgba(255,0,60,0.15)' : '#1a1a1a', color: '#fff', fontSize: 12, cursor: 'pointer' }}>{t.label}</button>
              ))}
            </div>
            <input value={cyberToolInput} onChange={(e) => setCyberToolInput(e.target.value)} placeholder="Input..." style={styles.settingsSelect} />
            <button onClick={runCyberTool} style={{ ...styles.uploadBtn, marginTop: 12, width: '100%', justifyContent: 'center' }}><Icon name="zap" size={16} color="#fff" /><span>Run</span></button>
            {cyberToolOutput && (
              <div style={{ marginTop: 16 }}>
                <pre style={{ background: '#000', border: '1px solid #333', borderRadius: 8, padding: 12, color: '#4f8', fontFamily: "'Courier New', monospace", fontSize: 12, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{cyberToolOutput}</pre>
                <button onClick={() => navigator.clipboard.writeText(cyberToolOutput)} style={{ ...styles.uploadBtn, marginTop: 8, width: '100%', justifyContent: 'center' }}><Icon name="copy" size={16} color="#fff" /><span>Copy</span></button>
              </div>
            )}
            <p style={{ color: '#888', fontSize: 11, marginTop: 16, fontStyle: 'italic' }}>⚠️ Educational use only. Only test systems you own or have written permission to test.</p>
          </div>
        )}
      </div>
    )
  }

  if (isFullscreenCall) {
    return (
      <div style={styles.fullscreenCallOverlay}>
        <button onClick={toggleFullscreenCall} style={styles.returnBtn}><Icon name="arrowLeft" size={28} color="#fff" /> Return</button>
        <div style={styles.fullscreenCallContentNoBall}>
          <div style={styles.fullscreenListeningStatus}>
            {isListening ? <div style={styles.fullscreenListeningDot} /> : isAISpeaking ? <div style={styles.fullscreenSpeakingDot} /> : null}
            <span style={styles.fullscreenStatusText}>{isListening ? 'Listening...' : isAISpeaking ? 'Speaking...' : 'Tap mic to talk'}</span>
          </div>
          {interimTranscript && <div style={styles.fullscreenTranscript}>{interimTranscript}</div>}
          <button onClick={interruptAndListen} style={styles.fullscreenMicBtn} disabled={isProcessing}><Icon name="mic" size={48} color="#fff" /></button>
        </div>
      </div>
    )
  }

  if (showRotateOverlay) {
    return (
      <div style={styles.rotateOverlay}>
        <div style={styles.rotateCard}>
          <Icon name="rotate" size={48} color="#ff003c" />
          <div style={styles.rotateText}>Pls Rotate device if you are using Android</div>
          <button onClick={() => setShowRotateOverlay(false)} style={styles.rotateOkBtn}>OK</button>
        </div>
      </div>
    )
  }

  // ============ CHAT OVERVIEW (with reply-to, larger log) ============
  if (showChatOverview) {
    return (
      <div style={styles.chatOverviewContainer}>
        <div style={styles.chatOverviewHeader}>
          <button onClick={() => setShowChatOverview(false)} style={styles.chatOverviewBackBtn}><Icon name="arrowLeft" size={24} color="#fff" /> Back</button>
          <span style={styles.chatOverviewTitle}>Chat with AI</span>
          <button onClick={() => setChatOverviewVoiceEnabled(!chatOverviewVoiceEnabled)} style={styles.chatOverviewVoiceToggle}><Icon name={chatOverviewVoiceEnabled ? 'volume2' : 'volumeX'} size={20} color="#fff" /></button>
        </div>
        <div style={styles.chatOverviewMessages}>
          {conversation.length === 0 && <div style={styles.chatOverviewEmpty}>Start chatting!</div>}
          {conversation.map(msg => (
            <div key={msg.id} style={{ ...styles.chatOverviewMsg, alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', backgroundColor: msg.role === 'user' ? '#ff003c' : '#1a1a1a' }}>
              {msg.replyToText && (
                <div style={styles.replyQuote}>
                  <Icon name="reply" size={12} color="#ff6688" />
                  <span style={styles.replyQuoteText}>{msg.replyToText}...</span>
                </div>
              )}
              {renderMessageContent(msg)}
              {msg.file && (
                <div style={styles.filePreviewPC}>
                  {msg.file.type.startsWith('image/') && <img src={msg.file.data} alt="" style={{ maxWidth: '100%', maxHeight: '120px', borderRadius: '4px', marginTop: '4px' }} />}
                  {msg.file.type.startsWith('video/') && <video controls style={{ maxWidth: '100%', maxHeight: '120px', borderRadius: '4px', marginTop: '4px' }}><source src={msg.file.data} type={msg.file.type} /></video>}
                  {!msg.file.type.startsWith('image/') && !msg.file.type.startsWith('video/') && <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>📎 {msg.file.name}</div>}
                </div>
              )}
              {settings.showTimestamps && <span style={styles.chatOverviewMsgTime}>{formatTime(msg.time)}</span>}
              <div style={styles.msgActions}>
                <button onClick={() => handleReply(msg)} style={styles.msgActionBtn} title="Reply"><Icon name="reply" size={14} color="#888" /></button>
                {msg.role === 'user' && <button onClick={() => handleEditMessage(msg.id)} style={styles.msgActionBtn} title="Edit"><Icon name="edit" size={14} color="#888" /></button>}
                <button onClick={() => handleDeleteMessage(msg.id)} style={styles.msgActionBtn} title="Delete"><Icon name="trash" size={14} color="#888" /></button>
                <button onClick={() => handleShareMessage(msg)} style={styles.msgActionBtn} title="Share"><Icon name="copy" size={14} color="#888" /></button>
              </div>
            </div>
          ))}
          {isProcessing && settings.typingIndicator && <div style={{ ...styles.chatOverviewMsg, alignSelf: 'flex-start', backgroundColor: '#1a1a1a' }}><span style={styles.chatOverviewMsgText}>● ● ●</span></div>}
          <div ref={chatEndRef} />
        </div>
        {replyingTo && (
          <div style={styles.replyBar}>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ color: '#ff6688', fontSize: 11, fontWeight: 'bold', marginBottom: 2 }}>Replying to:</div>
              <div style={{ color: '#ddd', fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{replyingTo.content.slice(0, 60)}...</div>
            </div>
            <button onClick={() => setReplyingTo(null)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', padding: 4 }}><Icon name="x" size={18} color="#888" /></button>
          </div>
        )}
        <div style={styles.chatOverviewInputRowRaised}>
          <input type="text" value={chatOverviewInput} onChange={(e) => setChatOverviewInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendOverviewText()} placeholder={pendingCode ? "Answer the question..." : replyingTo ? "Reply..." : "Type a message..."} style={styles.chatOverviewInput} disabled={isProcessing} />
          <div style={styles.voiceControls}>
            {!isRecordingVoice && !voicePaused ? (
              <button onClick={startVoiceRecording} style={styles.chatOverviewMicBtn}><Icon name="mic" size={20} color="#fff" /></button>
            ) : (
              <>
                {voicePaused ? <button onClick={resumeVoiceRecording} style={styles.chatOverviewMicBtn}><Icon name="play" size={20} color="#4f8" /></button> : <button onClick={pauseVoiceRecording} style={styles.chatOverviewMicBtn}><Icon name="pause" size={20} color="#ff003c" /></button>}
                <button onClick={deleteVoiceRecording} style={styles.chatOverviewMicBtn}><Icon name="trash" size={20} color="#ff003c" /></button>
                <button onClick={sendVoiceRecording} style={styles.chatOverviewSendBtn} disabled={isProcessing || !voiceTranscript.trim()}><Icon name="send" size={20} color="#fff" /></button>
              </>
            )}
          </div>
          <label style={styles.chatOverviewAttachBtn}><Icon name="file" size={20} color="#fff" /><input type="file" accept="image/*,video/*,.pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx" onChange={handleOverviewFileShare} style={{ display: 'none' }} /></label>
          <button onClick={sendOverviewText} style={styles.chatOverviewSendBtn} disabled={isProcessing}><Icon name="send" size={20} color="#fff" /></button>
        </div>
        {voiceTranscript && !chatOverviewListening && <div style={styles.voiceTranscriptPreview}>"{voiceTranscript}"</div>}
      </div>
    )
  }

  if (editingProfile) {
    return (
      <div style={styles.profileContainer}>
        <div style={styles.profileCard}>
          <h1 style={styles.profileTitle}>EDIT PROFILE</h1>
          <div style={styles.avatarUploadArea} onClick={() => fileInputRef.current?.click()}>
            {profileForm.avatar ? <img src={profileForm.avatar} alt="" style={styles.avatarPreview} /> : <span style={styles.avatarIcon}><Icon name="camera" size={32} color="#ff003c" /><br />Tap to select</span>}
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
          <div style={styles.inputGroup}><label style={styles.label}><Icon name="user" size={14} color="#ff003c" /> Name *</label><input type="text" value={profileForm.name} onChange={(e) => setProfileForm(p => ({ ...p, name: e.target.value }))} style={styles.textInput} /></div>
          <div style={styles.inputGroup}><label style={styles.label}><Icon name="atSign" size={14} color="#ff003c" /> Username *</label><input type="text" value={profileForm.username} onChange={(e) => setProfileForm(p => ({ ...p, username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g,'') }))} style={styles.textInput} /></div>
          <div style={styles.inputGroup}><label style={styles.label}><Icon name="pencil" size={14} color="#ff003c" /> Bio</label><textarea value={profileForm.bio} onChange={(e) => setProfileForm(p => ({ ...p, bio: e.target.value }))} style={styles.bioInput} /></div>
          <div style={styles.profileBtnRow}>
            <button onClick={() => setEditingProfile(false)} style={styles.cancelBtn}>Cancel</button>
            <button onClick={saveProfile} style={styles.createBtn}>SAVE</button>
          </div>
        </div>
      </div>
    )
  }

  // ============ ANDROID VIEW ============
  if (viewMode === 'android') {
    return (
      <div style={{ ...styles.appAndroid, ...(settings.highContrast ? { filter: 'contrast(1.3)' } : {}) }}>
        {sidebarOpen && (
          <>
            <div style={styles.sidebarOverlay} onClick={() => setSidebarOpen(false)} />
            <div style={styles.sidebar}>
              <div style={styles.sidebarHeader}>
                <h2 style={styles.sidebarTitle}><Icon name="settings" size={20} color="#ff003c" /> CONTROL PANEL</h2>
                <button onClick={() => setSidebarOpen(false)} style={styles.closeBtn}><Icon name="x" size={20} color="#888" /></button>
              </div>
              <div style={styles.sidebarSection}>
                <h3 style={styles.sectionTitle}><Icon name="desktop" size={16} color="#ff003c" /> VIEW MODE</h3>
                <div style={styles.settingRow}><span style={styles.settingLabel}>Android</span><button onClick={toggleView} style={styles.toggleBtn}>PC</button></div>
              </div>
              <div style={styles.sidebarSection}>
                <h3 style={styles.sectionTitle}><Icon name="sparkles" size={16} color="#ff003c" /> QUICK TOOLS</h3>
                <button onClick={() => { setSidebarOpen(false); setShowCyberLab(true) }} style={styles.toolBtn}><Icon name="shield" size={16} color="#fff" /> Cyber Lab</button>
                <button onClick={() => { setSidebarOpen(false); setShowMusicPanel(true) }} style={styles.toolBtn}><Icon name="music" size={16} color="#fff" /> Music Generator</button>
                <button onClick={() => { setSidebarOpen(false); setShowVideoPanel(true) }} style={styles.toolBtn}><Icon name="video" size={16} color="#fff" /> Video Generator</button>
                <button onClick={() => { setSidebarOpen(false); setShowSettings(true) }} style={styles.toolBtn}><Icon name="cog" size={16} color="#fff" /> Settings</button>
              </div>
              <div style={styles.sidebarSection}>
                <h3 style={styles.sectionTitle}><Icon name="chart" size={16} color="#ff003c" /> SYSTEM STATS</h3>
                <div style={styles.statsCard}>
                  <div style={styles.statRow}><span style={styles.statLabel}><Icon name="hourglass" size={14} color="#888" /> Uptime</span><span style={styles.statValue}>{formatUptime(stats.uptime)}</span></div>
                  <div style={styles.statRow}><span style={styles.statLabel}><Icon name="cpu" size={14} color="#888" /> CPU</span><span style={styles.statValue}>{stats.cpuUsage}%</span></div>
                  <div style={styles.statRow}><span style={styles.statLabel}><Icon name="memory" size={14} color="#888" /> RAM</span><span style={styles.statValue}>{stats.ramUsage.toFixed(1)} GB</span></div>
                </div>
              </div>
              <div style={styles.sidebarSection}>
                <h3 style={styles.sectionTitle}><Icon name="settings" size={16} color="#ff003c" /> AI CONFIG</h3>
                <div style={styles.settingRow}><span style={styles.settingLabel}>Personality</span><span style={styles.settingValue}>{PERSONALITIES.find(p => p.id === aiPersonality)?.label}</span></div>
                <div style={styles.settingRow}><span style={styles.settingLabel}>Secret Mode</span><span style={styles.settingValue}>{settings.secretMode ? 'ON' : 'OFF'}</span></div>
              </div>
              <div style={styles.sidebarSection}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <h3 style={styles.sectionTitle}><Icon name="chat" size={16} color="#ff003c" /> CONVERSATION</h3>
                  <button onClick={() => setShowChatOverview(true)} style={styles.overviewBtn}><Icon name="desktop" size={14} color="#fff" /> Overview</button>
                </div>
                <div style={{ maxHeight: 300, overflowY: 'auto', marginBottom: 8, border: '1px solid #1a1a1a', borderRadius: 6, padding: 6, backgroundColor: '#050505' }}>
                  {conversation.length === 0 && <p style={styles.dashEmptyPC}>No messages yet</p>}
                  {conversation.slice(-30).map(msg => (
                    <div key={msg.id} style={{ padding: '6px 8px', borderBottom: '1px solid #111', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                        <span style={{ fontWeight: 'bold', color: msg.role === 'user' ? '#ddd' : '#ff003c', fontSize: 11 }}>{msg.role === 'user' ? profile?.name || 'You' : 'CYPHER4X'}</span>
                        <span style={{ fontSize: 9, color: '#666' }}>{formatTime(msg.time)}</span>
                      </div>
                      <span style={{ color: '#ddd', fontSize: 12, wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>{msg.content.length > 120 ? msg.content.slice(0, 120) + '…' : msg.content}</span>
                    </div>
                  ))}
                </div>
                <div style={styles.inputRow}>
                  <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendTextMessage()} placeholder="Type..." style={styles.textInputSmall} />
                  <button onClick={sendTextMessage} style={styles.sendBtnSmall} disabled={isProcessing}><Icon name="send" size={16} color="#fff" /></button>
                </div>
                <div style={styles.commandActionsPC}>
                  <button onClick={clearConversation} style={styles.dashBtnPC}><Icon name="trash" size={14} color="#fff" /> Clear</button>
                  <button onClick={exportChat} style={styles.dashBtnPC}><Icon name="save" size={14} color="#fff" /> Export</button>
                  <label style={styles.attachBtnPC}><Icon name="file" size={14} color="#fff" /> Attach<input type="file" accept="image/*,video/*,.pdf,.doc,.docx,.txt" onChange={handleOverviewFileShare} style={{ display: 'none' }} /></label>
                </div>
              </div>
              <div style={styles.sidebarSection}>
                <h3 style={styles.sectionTitle}><Icon name="user" size={16} color="#ff003c" /> PROFILE</h3>
                <div style={styles.profileCardSidebar}>
                  <div style={styles.profileAvatarWrapper}>{profile?.avatar ? <img src={profile.avatar} alt="" style={styles.profileAvatar} /> : <div style={styles.profileAvatarPlaceholder}>{profile?.name?.charAt(0) || "?"}</div>}</div>
                  <div style={styles.profileInfo}><div style={styles.profileName}>{profile?.name || "User"}</div><div style={styles.profileHandle}><Icon name="atSign" size={12} color="#888" />{profile?.username || "anonymous"}</div></div>
                </div>
                <button onClick={openEditProfile} style={styles.sidebarBtn}><Icon name="edit" size={14} color="#fff" /> Edit Profile</button>
                {userMode === 'loggedin' ? <button onClick={handleLogout} style={styles.logoutBtn}><Icon name="close" size={14} color="#fff" /> Logout</button> : <button onClick={() => { setShowAuthModal(true); setShowLogin(true) }} style={styles.sidebarBtn}><Icon name="settings" size={14} color="#fff" /> Login</button>}
              </div>
              <div style={styles.sidebarSection}>
                <h3 style={styles.sectionTitle}><Icon name="alertTriangle" size={16} color="#ff003c" /> DANGER ZONE</h3>
                <button onClick={resetAllData} style={styles.dangerBtn}><Icon name="trash" size={14} color="#fff" /> Reset All</button>
              </div>
            </div>
          </>
        )}

        <div style={{ ...styles.mainContentAndroid, backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div style={styles.backgroundAndroid}>
            <RedBall isSpeaking={isAISpeaking} />
            <div style={styles.faceTitleAndroid}>CYPHER4X</div>
          </div>

          <div style={styles.topBarAndroid}>
            <div style={{ width: '80px' }} />
            <div style={styles.topRightButtons}>
              <button onClick={toggleFullscreenCall} style={styles.callButtonTopRight}>
                <Icon name="phone" size={24} color={isCallActive ? "#4f8" : "#ff003c"} />
                <span style={styles.callLabelTop}>{isFullscreenCall ? 'ACTIVE' : 'CALL'}</span>
              </button>
              <button onClick={() => setShowSettings(true)} style={styles.settingsButtonTop}><Icon name="cog" size={20} color="#fff" /></button>
            </div>
          </div>

          <div style={styles.listeningContainer}>
            {isListening ? (
              <><div style={styles.listeningDot} /><span style={styles.listeningText}>Listening...</span>
                {interimTranscript && <span style={styles.interimText}>"{interimTranscript}"</span>}
                {interimTranscript && <button onClick={sendInterim} style={styles.sendInterimBtn} disabled={isProcessing}><Icon name="send" size={16} color="#fff" /><span>Send</span></button>}
              </>
            ) : isProcessing ? <span style={styles.listeningText}>Processing...</span>
              : isRecording ? (
                <><div style={{ ...styles.listeningDot, backgroundColor: '#ff003c', boxShadow: '0 0 20px #ff003c' }} /><span style={styles.listeningText}>Recording...</span>
                  {interimTranscript && <span style={styles.interimText}>"{interimTranscript}"</span>}
                </>
              ) : null}
          </div>

          <div style={styles.voiceButtonContainer}>
            <button onClick={startRecording} disabled={isRecording || isProcessing || isFullscreenCall} style={{ ...styles.voiceButton, ...(isRecording ? styles.voiceButtonActive : {}) }}>
              <Icon name="mic" size={40} color="#fff" />
              <span style={styles.voiceLabel}>{isRecording ? 'Recording...' : isProcessing ? 'Processing...' : 'Tap to Speak'}</span>
            </button>
          </div>

          <button onClick={() => setSidebarOpen(true)} style={{ ...styles.hamburgerBtn, zIndex: 15 }}><Icon name="menu" size={28} color="#ff003c" /></button>

          {settings.overlayButton && (
            <button onClick={toggleOverlay} style={{ ...styles.floatingBtn, backgroundColor: overlayActive ? '#ff003c' : 'rgba(0,0,0,0.7)', borderColor: overlayActive ? '#ff003c' : '#333' }}>
              <Icon name={overlayListening ? 'mic' : 'sparkles'} size={22} color={overlayActive ? '#fff' : '#ff003c'} />
            </button>
          )}
        </div>
      </div>
    )
  }

  // ============ PC VIEW ============
  return (
    <div style={{ ...styles.appPC, ...(settings.highContrast ? { filter: 'contrast(1.3)' } : {}) }}>
      <header style={styles.headerPC}>
        <div style={styles.headerLeft}>
          <h1 style={styles.titlePC}>CYPHER4X</h1>
          <span style={styles.versionBadgePC}>{VERSION}</span>
        </div>
        <div style={styles.headerRight}>
          <button onClick={toggleFullscreenCall} style={styles.callBtnPC}><Icon name="phone" size={18} color="#ff003c" /><span>CALL</span></button>
          <button onClick={() => setShowCyberLab(true)} style={styles.settingsBtnPC}><Icon name="shield" size={20} color="#fff" /></button>
          <button onClick={() => setShowMusicPanel(true)} style={styles.settingsBtnPC}><Icon name="music" size={20} color="#fff" /></button>
          <button onClick={() => setShowVideoPanel(true)} style={styles.settingsBtnPC}><Icon name="video" size={20} color="#fff" /></button>
          <button onClick={() => setShowSettings(true)} style={styles.settingsBtnPC}><Icon name="cog" size={20} color="#fff" /></button>
          <button onClick={startRecording} disabled={isRecording || isProcessing} style={styles.voiceBtnPC}><Icon name="mic" size={20} color="#ff003c" /><span>Speak</span></button>
        </div>
      </header>
      <div style={styles.pcLayout}>
        <div style={styles.pcSidebar}>
          <div style={styles.pcSidebarSection}>
            <h3 style={styles.pcSidebarTitle}><Icon name="chart" size={16} color="#ff003c" /> STATS</h3>
            <div style={styles.pcSidebarRow}><span>CPU</span><span>{stats.cpuUsage}%</span></div>
            <div style={styles.pcSidebarRow}><span>RAM</span><span>{stats.ramUsage.toFixed(1)} GB</span></div>
            <div style={styles.pcSidebarRow}><span>Uptime</span><span>{formatUptime(stats.uptime)}</span></div>
          </div>
          <div style={styles.pcSidebarSection}>
            <h3 style={styles.pcSidebarTitle}><Icon name="chat" size={16} color="#ff003c" /> CONVERSATION</h3>
            <button onClick={() => setShowChatOverview(true)} style={styles.overviewBtn}><Icon name="desktop" size={14} color="#fff" /> Overview</button>
          </div>
          <div style={styles.pcSidebarSection}>
            <h3 style={styles.pcSidebarTitle}><Icon name="user" size={16} color="#ff003c" /> PROFILE</h3>
            <button onClick={openEditProfile} style={styles.sidebarBtnPC}><Icon name="edit" size={14} color="#fff" /> Edit Profile</button>
            {userMode === 'loggedin' ? <button onClick={handleLogout} style={styles.logoutBtnPC}><Icon name="close" size={14} color="#fff" /> Logout</button> : <button onClick={() => { setShowAuthModal(true); setShowLogin(true) }} style={styles.sidebarBtnPC}><Icon name="settings" size={14} color="#fff" /> Login</button>}
          </div>
        </div>
        <div style={{ ...styles.pcMain, backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div style={styles.pcBallContainer}><RedBall isSpeaking={isAISpeaking} /></div>
          <div style={styles.pcListeningContainer}>
            {isListening ? <><div style={styles.listeningDot} /><span style={styles.listeningText}>Listening...</span>{interimTranscript && <span style={styles.interimText}>"{interimTranscript}"</span>}</>
              : isProcessing ? <span style={styles.listeningText}>Processing...</span>
                : isRecording ? <><div style={{ ...styles.listeningDot, backgroundColor: '#ff003c' }} /><span style={styles.listeningText}>Recording...</span></> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  appAndroid: { minHeight: '100vh', height: '100dvh', backgroundColor: '#000', color: '#e0e0e0', fontFamily: "'Segoe UI', 'Courier New', monospace", overflow: 'hidden', margin: 0, padding: 0 },
  bootContainer: { backgroundColor: '#000', minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', fontFamily: "'Courier New', monospace" },
  bootBackground: { position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, #1a0000 0%, #000 70%)' },
  bootContent: { position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '500px', padding: '20px' },
  bootTitle: { fontSize: 'clamp(48px, 12vw, 72px)', fontWeight: 'bold', color: '#ff003c', textShadow: '0 0 40px #ff003c, 0 0 80px #ff003c44', letterSpacing: '8px', margin: '0 0 10px', fontFamily: "'Courier New', monospace", minHeight: '80px' },
  bootCursor: { display: 'inline-block', animation: 'blink 0.7s step-end infinite', color: '#ff003c' },
  bootSubtitle: { fontSize: 'clamp(14px, 2vw, 20px)', color: '#ff6688', letterSpacing: '4px', marginBottom: '40px', opacity: 0.8 },
  bootCredit: { color: '#ff6688', fontSize: '14px', marginTop: '20px', opacity: 0.7, borderTop: '1px solid rgba(255,0,60,0.2)', paddingTop: '16px', minHeight: '30px' },

  personalityOverlay: { position: 'fixed', inset: 0, backgroundColor: '#000', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', overflowY: 'auto' },
  personalityCard: { width: '100%', maxWidth: '700px', backgroundColor: '#111', border: '2px solid #ff003c', borderRadius: '16px', padding: '30px', textAlign: 'center' },
  personalityTitle: { color: '#ff003c', fontSize: '36px', letterSpacing: '6px', margin: '0 0 8px' },
  personalitySubtitle: { color: '#ff6688', fontSize: '16px', marginBottom: '24px' },
  personalityGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '20px' },
  personalityOption: { padding: '16px 12px', border: '2px solid #333', borderRadius: '12px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' },
  personalityIcon: { fontSize: '28px' },
  personalityLabel: { color: '#fff', fontWeight: 'bold', fontSize: '15px' },
  personalityDesc: { color: '#888', fontSize: '11px', textAlign: 'center' },
  personalityHint: { color: '#666', fontSize: '12px', marginTop: '12px', fontStyle: 'italic' },

  authModalOverlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  authModalCard: { width: '100%', maxWidth: '400px', backgroundColor: '#111', border: '2px solid #ff003c', borderRadius: '12px', padding: '30px', textAlign: 'center', position: 'relative' },
  authModalClose: { position: 'absolute', top: 10, right: 15, background: 'none', border: 'none', color: '#888', fontSize: '24px', cursor: 'pointer' },
  authTitle: { color: '#ff003c', fontSize: '32px', letterSpacing: '4px', marginBottom: '4px' },
  authSubtitle: { color: '#ff6688', fontSize: '18px', marginBottom: '20px' },
  authError: { color: '#ff003c', fontSize: '14px', minHeight: '24px', marginBottom: '12px' },
  authInput: { width: '100%', padding: '12px', marginBottom: '12px', backgroundColor: '#000', border: '1px solid #333', color: '#fff', borderRadius: '6px', fontSize: '16px', outline: 'none', boxSizing: 'border-box' },
  authBtn: { width: '100%', padding: '14px', backgroundColor: '#ff003c', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px' },
  authSwitch: { marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '8px', color: '#888', fontSize: '14px' },
  authSwitchBtn: { background: 'none', border: 'none', color: '#ff003c', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', textDecoration: 'underline' },

  guestLimitOverlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.92)', zIndex: 99998, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  guestLimitCard: { backgroundColor: '#111', border: '2px solid #ff003c', borderRadius: '20px', padding: '40px 30px', maxWidth: '420px', width: '100%', textAlign: 'center' },
  guestLimitTitle: { color: '#ff003c', fontSize: '24px', marginBottom: '16px' },
  guestLimitText: { color: '#ddd', fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' },
  guestLimitButtons: { display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' },
  guestLimitLoginBtn: { padding: '12px 30px', backgroundColor: '#ff003c', color: '#fff', border: 'none', borderRadius: '30px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', flex: 1, minWidth: '100px' },
  guestLimitSignupBtn: { padding: '12px 30px', backgroundColor: '#1a3a3a', color: '#fff', border: '1px solid #2a5a5a', borderRadius: '30px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', flex: 1, minWidth: '100px' },

  welcomeOverlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.92)', zIndex: 99997, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  welcomeCard: { backgroundColor: '#111', border: '2px solid #ff003c', borderRadius: '20px', padding: '40px 30px', maxWidth: '500px', width: '100%', textAlign: 'center' },
  welcomeBall: { width: '120px', height: '120px', margin: '0 auto 20px', position: 'relative' },
  welcomeMessageText: { color: '#fff', fontSize: '20px', lineHeight: '1.6', marginBottom: '24px', fontFamily: "'Courier New', monospace" },

  settingsFullscreen: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, height: '100dvh', backgroundColor: '#000', zIndex: 100000, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  settingsHeaderFull: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #333', backgroundColor: '#0a0000', flexShrink: 0 },
  settingsTitleFull: { color: '#ff003c', fontSize: '22px', margin: 0, letterSpacing: '2px' },
  settingsCloseFull: { background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex' },
  settingsBodyFull: { flex: 1, minHeight: 0, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', WebkitOverflowScrolling: 'touch' },
  settingsSection: { borderBottom: '1px solid #1a1a1a', paddingBottom: '20px' },
  settingsSectionTitle: { color: '#ff003c', fontSize: '14px', margin: '0 0 16px 0', letterSpacing: '1px', textTransform: 'uppercase' },
  settingsDoneFull: { padding: '16px', backgroundColor: '#ff003c', color: '#fff', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', flexShrink: 0, paddingBottom: 'max(16px, env(safe-area-inset-bottom, 16px))' },
  personalityGridSettings: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '8px' },
  personalityOptionSmall: { padding: '12px 8px', border: '2px solid #333', borderRadius: '8px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' },
  backgroundControls: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  uploadBtn: { padding: '10px 16px', backgroundColor: '#ff003c', color: '#fff', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 'bold', border: 'none' },
  resetBtn: { padding: '10px 16px', backgroundColor: '#333', color: '#fff', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 'bold', border: 'none' },
  bgPreview: { marginTop: '12px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #333' },
  bgPreviewImg: { width: '100%', maxHeight: '150px', objectFit: 'cover', display: 'block' },
  bgHint: { color: '#888', fontSize: '12px', marginTop: '8px', fontStyle: 'italic', lineHeight: '1.5' },
  settingItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff', fontSize: '15px', marginBottom: '14px', gap: '10px' },
  settingsSelect: { padding: '10px 12px', backgroundColor: '#000', border: '1px solid #444', color: '#fff', borderRadius: '6px', fontSize: '14px', width: '100%', boxSizing: 'border-box' },
  settingsRange: { width: '140px', accentColor: '#ff003c' },
  settingsValue: { color: '#ff6688', minWidth: '40px', textAlign: 'right', fontWeight: 'bold' },

  rotateOverlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 99996, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  rotateCard: { backgroundColor: '#111', border: '2px solid #ff003c', borderRadius: '20px', padding: '40px 30px', maxWidth: '400px', width: '100%', textAlign: 'center' },
  rotateText: { color: '#fff', fontSize: '18px', margin: '20px 0', lineHeight: '1.6' },
  rotateOkBtn: { padding: '12px 40px', backgroundColor: '#ff003c', color: '#fff', border: 'none', borderRadius: '30px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' },

  fullscreenCallOverlay: { position: 'fixed', inset: 0, backgroundColor: '#000', zIndex: 99995, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  returnBtn: { position: 'absolute', top: '20px', left: '20px', backgroundColor: 'rgba(255,0,60,0.3)', border: '1px solid #ff003c', borderRadius: '30px', padding: '10px 20px', color: '#fff', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' },
  fullscreenCallContentNoBall: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '30px', width: '100%', maxWidth: '500px', flex: 1 },
  fullscreenListeningStatus: { display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'rgba(255,255,255,0.05)', padding: '8px 20px', borderRadius: '30px', border: '1px solid rgba(255,0,60,0.2)' },
  fullscreenListeningDot: { width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#4f8', boxShadow: '0 0 20px #4f8', animation: 'pulseText 0.8s ease-in-out infinite' },
  fullscreenSpeakingDot: { width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff003c', boxShadow: '0 0 20px #ff003c', animation: 'pulseText 0.8s ease-in-out infinite' },
  fullscreenStatusText: { color: '#fff', fontSize: '18px', fontWeight: 'bold' },
  fullscreenTranscript: { color: '#ff6688', fontSize: '16px', fontStyle: 'italic', padding: '8px 20px', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '12px', maxWidth: '90%', textAlign: 'center', border: '1px solid rgba(255,0,60,0.2)', minHeight: '40px' },
  fullscreenMicBtn: { width: 'clamp(70px, 14vw, 100px)', height: 'clamp(70px, 14vw, 100px)', borderRadius: '50%', backgroundColor: '#ff003c', border: '3px solid #ff003c', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 60px rgba(255,0,60,0.4)' },

  chatOverviewContainer: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, height: '100dvh', backgroundColor: '#000', zIndex: 99994, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  chatOverviewHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: '#111', borderBottom: '1px solid #333', flexShrink: 0 },
  chatOverviewBackBtn: { background: 'none', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', cursor: 'pointer' },
  chatOverviewTitle: { color: '#ff003c', fontSize: '18px', fontWeight: 'bold' },
  chatOverviewVoiceToggle: { background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px' },
  chatOverviewMessages: { flex: 1, minHeight: 0, overflowY: 'auto', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '8px', WebkitOverflowScrolling: 'touch' },
  chatOverviewEmpty: { color: '#666', textAlign: 'center', fontSize: '16px', marginTop: '40px' },
  chatOverviewMsg: { maxWidth: '88%', padding: '10px 14px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '4px', position: 'relative' },
  chatOverviewMsgText: { color: '#fff', fontSize: '14px', wordBreak: 'break-word', whiteSpace: 'pre-wrap' },
  chatOverviewMsgTime: { fontSize: '10px', color: '#888', alignSelf: 'flex-end' },
  replyQuote: { display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', backgroundColor: 'rgba(255,255,255,0.08)', borderLeft: '3px solid #ff6688', borderRadius: 4, marginBottom: 4 },
  replyQuoteText: { color: '#ff6688', fontSize: 11, fontStyle: 'italic', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  replyBar: { display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', backgroundColor: '#1a1a1a', borderTop: '2px solid #ff003c' },
  chatOverviewInputRowRaised: { display: 'flex', gap: '8px', padding: '12px 16px', paddingBottom: 'max(30px, env(safe-area-inset-bottom, 50px))', backgroundColor: '#111', borderTop: '1px solid #333', flexShrink: 0, alignItems: 'center' },
  chatOverviewInput: { flex: 1, padding: '10px 14px', backgroundColor: '#000', border: '1px solid #333', color: '#fff', borderRadius: '20px', fontSize: '14px', outline: 'none' },
  chatOverviewMicBtn: { background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '8px', borderRadius: '50%', backgroundColor: 'rgba(255,0,60,0.2)' },
  chatOverviewAttachBtn: { background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '8px', borderRadius: '50%', backgroundColor: 'rgba(255,0,60,0.2)', display: 'flex', alignItems: 'center' },
  chatOverviewSendBtn: { background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '8px', borderRadius: '50%', backgroundColor: '#ff003c', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  overviewBtn: { padding: '4px 12px', backgroundColor: '#1a3a3a', border: '1px solid #2a5a5a', borderRadius: '4px', color: '#fff', cursor: 'pointer', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' },
  voiceControls: { display: 'flex', gap: '6px', alignItems: 'center' },
  voiceTranscriptPreview: { position: 'absolute', bottom: '80px', left: '16px', right: '16px', backgroundColor: 'rgba(0,0,0,0.8)', padding: '8px 16px', borderRadius: '12px', color: '#ff6688', fontSize: '14px', fontStyle: 'italic', border: '1px solid rgba(255,0,60,0.3)', textAlign: 'center' },
  msgActions: { display: 'flex', gap: '4px', justifyContent: 'flex-end', marginTop: '4px', opacity: 0.7 },
  msgActionBtn: { background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px', borderRadius: '4px' },

  codeBlockWrap: { marginTop: 8, marginBottom: 8, borderRadius: 8, overflow: 'hidden', border: '1px solid #333', backgroundColor: '#0a0a0a', alignSelf: 'stretch' },
  codeBlockHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', backgroundColor: '#1a1a1a', borderBottom: '1px solid #333' },
  codeLang: { color: '#ff6688', fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  codeCopyBtn: { display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', backgroundColor: '#ff003c', color: '#fff', border: 'none', borderRadius: 4, fontSize: 11, fontWeight: 'bold', cursor: 'pointer' },
  codeBlock: { margin: 0, padding: 12, color: '#e0e0e0', fontSize: 12, fontFamily: "'Courier New', monospace", whiteSpace: 'pre', overflowX: 'auto', lineHeight: 1.5 },

  profileContainer: { backgroundColor: '#000', minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  profileCard: { width: '100%', maxWidth: '420px', backgroundColor: '#111', border: '2px solid #ff003c', borderRadius: '12px', padding: '28px' },
  profileTitle: { color: '#ff003c', textAlign: 'center', marginBottom: '24px', fontSize: '22px' },
  avatarUploadArea: { width: '130px', height: '130px', borderRadius: '50%', border: '3px dashed #ff003c', margin: '0 auto 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: '#1a1a1a' },
  avatarPreview: { width: '100%', height: '100%', objectFit: 'cover' },
  avatarIcon: { fontSize: '14px', color: '#ff003c', textAlign: 'center' },
  inputGroup: { marginBottom: '18px' },
  label: { color: '#ff003c', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' },
  textInput: { width: '100%', padding: '14px', backgroundColor: '#000', border: '1px solid #ff003c', color: '#fff', borderRadius: '8px', fontSize: '15px', outline: 'none', boxSizing: 'border-box' },
  bioInput: { width: '100%', minHeight: '80px', padding: '14px', backgroundColor: '#000', border: '1px solid #ff003c', color: '#fff', borderRadius: '8px', fontSize: '15px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' },
  profileBtnRow: { display: 'flex', gap: '12px', marginTop: '12px' },
  createBtn: { flex: 1, padding: '14px', backgroundColor: '#ff003c', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' },
  cancelBtn: { padding: '14px 20px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', cursor: 'pointer' },

  sidebarOverlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 998 },
  sidebar: { position: 'fixed', top: 0, left: 0, bottom: 0, width: '380px', maxWidth: '90vw', backgroundColor: '#0a0000', borderRight: '2px solid #ff003c', zIndex: 999, overflowY: 'auto', padding: '16px' },
  sidebarHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #333' },
  sidebarTitle: { color: '#ff003c', fontSize: '18px', fontWeight: 'bold', margin: 0, fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '8px' },
  closeBtn: { backgroundColor: 'transparent', border: 'none', color: '#888', fontSize: '20px', cursor: 'pointer', padding: '4px', display: 'flex' },
  sidebarSection: { marginBottom: '12px' },
  sectionTitle: { color: '#ff003c', fontSize: '14px', margin: '0 0 8px 0', paddingBottom: '4px', borderBottom: '1px solid #333', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px' },
  settingRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' },
  settingLabel: { fontSize: '13px', color: '#ddd' },
  settingValue: { fontSize: '13px', color: '#ff6688' },
  toggleBtn: { padding: '4px 12px', borderRadius: '3px', border: 'none', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: '#333', color: '#fff' },
  toolBtn: { padding: '8px 12px', backgroundColor: '#1a1a1a', color: '#fff', border: '1px solid #333', borderRadius: '6px', cursor: 'pointer', width: '100%', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 'bold' },
  statsCard: { border: '1px solid #ff003c40', borderRadius: '6px', padding: '10px 12px', backgroundColor: '#0a0a0a' },
  statRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2px 0', fontSize: '12px' },
  statLabel: { color: '#aaa', display: 'flex', alignItems: 'center', gap: '4px' },
  statValue: { color: '#ff6688', fontWeight: '500' },
  profileCardSidebar: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' },
  profileAvatarWrapper: { flexShrink: 0 },
  profileAvatar: { width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ff003c' },
  profileAvatarPlaceholder: { width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ff003c', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '18px', fontWeight: 'bold' },
  profileInfo: { display: 'flex', flexDirection: 'column' },
  profileName: { color: '#fff', fontWeight: 'bold', fontSize: '14px' },
  profileHandle: { color: '#888', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '2px' },
  sidebarBtn: { padding: '6px 12px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '13px' },
  dangerBtn: { padding: '6px 12px', backgroundColor: '#880000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '13px' },
  logoutBtn: { padding: '6px 12px', backgroundColor: '#880000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '13px' },

  topRightButtons: { display: 'flex', gap: '8px', alignItems: 'center' },
  settingsButtonTop: { backgroundColor: 'rgba(0,0,0,0.6)', border: '2px solid #333', borderRadius: '30px', padding: '6px 12px', display: 'flex', alignItems: 'center', cursor: 'pointer', color: '#fff' },
  settingsBtnPC: { backgroundColor: 'rgba(0,0,0,0.6)', border: '1px solid #333', borderRadius: '16px', padding: '4px 10px', display: 'flex', alignItems: 'center', cursor: 'pointer', color: '#fff', marginLeft: 6 },
  floatingBtn: { position: 'absolute', bottom: '150px', right: '25px', width: '56px', height: '56px', borderRadius: '50%', border: '2px solid', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.5)', transition: 'all 0.3s ease' },

  mainContentAndroid: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', height: '100dvh', margin: 0, padding: 0 },
  backgroundAndroid: { position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 0, background: 'radial-gradient(ellipse at center, #0a0000 0%, #000 100%)' },
  ballContainer: { position: 'relative', width: '300px', height: '300px', pointerEvents: 'none', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  ball3DContainer: { perspective: '800px', transformStyle: 'preserve-3d' },
  ball3D: { width: '180px', height: '180px', borderRadius: '50%', position: 'relative', transformStyle: 'preserve-3d', background: `radial-gradient(circle at 30% 25%, rgba(255, 200, 220, 0.9) 0%, transparent 45%), radial-gradient(circle at 40% 35%, #ff6688 0%, #ff3355 25%, #ff003c 50%, #990022 75%, #550011 100%)`, boxShadow: `inset -20px -20px 40px rgba(80, 0, 20, 0.8), inset 15px 15px 30px rgba(255, 180, 200, 0.4), 0 0 50px rgba(255, 0, 60, 0.5), 0 0 100px rgba(255, 0, 60, 0.3), 0 0 150px rgba(255, 0, 60, 0.15)`, animation: 'rotateGlobe 25s linear infinite' },
  ball3DSpeaking: { boxShadow: `inset -20px -20px 40px rgba(80, 0, 20, 0.8), inset 15px 15px 30px rgba(255, 180, 200, 0.5), 0 0 80px rgba(255, 0, 60, 0.8), 0 0 150px rgba(255, 0, 60, 0.5), 0 0 220px rgba(255, 0, 60, 0.25)`, animation: 'rotateGlobe 25s linear infinite, ballPulse 1.2s ease-in-out infinite' },
  ballHighlight: { position: 'absolute', top: '18%', left: '22%', width: '35%', height: '25%', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,255,255,0.6) 0%, transparent 70%)', filter: 'blur(4px)', pointerEvents: 'none' },
  ballInnerGlow: { position: 'absolute', top: '15%', left: '15%', width: '70%', height: '70%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,100,140,0.2) 0%, transparent 60%)', pointerEvents: 'none' },
  ring1: { position: 'absolute', top: '50%', left: '50%', width: '240px', height: '240px', marginLeft: '-120px', marginTop: '-120px', borderRadius: '50%', border: '2px solid rgba(255,0,60,0.25)', animation: 'spinRing 12s linear infinite' },
  ring2: { position: 'absolute', top: '50%', left: '50%', width: '280px', height: '280px', marginLeft: '-140px', marginTop: '-140px', borderRadius: '50%', border: '1px solid rgba(255,0,60,0.12)', animation: 'spinRing 18s linear infinite reverse' },
  ring3: { position: 'absolute', top: '50%', left: '50%', width: '200px', height: '200px', marginLeft: '-100px', marginTop: '-100px', borderRadius: '50%', border: '1px dashed rgba(255,0,60,0.15)', animation: 'spinRing 8s linear infinite' },
  faceTitleAndroid: { position: 'absolute', bottom: '35%', fontSize: 'clamp(42px, 6vw, 68px)', fontWeight: 'bold', color: '#ff003c', textShadow: '0 0 40px #ff003c, 0 0 80px #ff003c66, 0 0 120px #ff003c33', letterSpacing: '10px', textAlign: 'center', width: '100%', zIndex: 2, animation: 'pulseText 2.5s ease-in-out infinite', fontFamily: "'Courier New', monospace" },
  topBarAndroid: { position: 'absolute', top: '20px', left: '20px', right: '20px', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  callButtonTopRight: { backgroundColor: 'rgba(0,0,0,0.6)', border: '2px solid #ff003c', borderRadius: '30px', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#ff003c', fontSize: '14px', fontWeight: 'bold', letterSpacing: '1px' },
  callLabelTop: { fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', color: '#fff' },
  listeningContainer: { position: 'absolute', top: '90px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'rgba(0,0,0,0.5)', padding: '8px 20px', borderRadius: '30px', border: '1px solid rgba(255,0,60,0.2)', backdropFilter: 'blur(10px)', flexWrap: 'wrap', justifyContent: 'center' },
  listeningDot: { width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#4f8', boxShadow: '0 0 20px #4f8', animation: 'pulseText 0.8s ease-in-out infinite' },
  listeningText: { color: '#fff', fontSize: '16px', fontWeight: 'bold', letterSpacing: '2px', fontFamily: "'Courier New', monospace" },
  interimText: { color: '#ff6688', fontSize: '14px', fontStyle: 'italic', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', borderLeft: '1px solid rgba(255,0,60,0.3)', paddingLeft: '12px' },
  sendInterimBtn: { backgroundColor: '#ff003c', border: 'none', borderRadius: '20px', padding: '4px 14px', display: 'flex', alignItems: 'center', gap: '6px', color: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' },
  voiceButtonContainer: { position: 'absolute', bottom: '50px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' },
  voiceButton: { width: '90px', height: '90px', borderRadius: '50%', backgroundColor: '#1a1a1a', border: '3px solid #ff003c', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', boxShadow: '0 0 40px rgba(255,0,60,0.2)' },
  voiceButtonActive: { backgroundColor: '#ff003c', borderColor: '#ff003c', boxShadow: '0 0 80px rgba(255,0,60,0.7)', animation: 'pulseGlow 1s ease-in-out infinite' },
  voiceLabel: { color: '#fff', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', marginTop: '4px' },
  hamburgerBtn: { position: 'absolute', top: '25px', left: '25px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', zIndex: 15, padding: '8px', borderRadius: '4px' },

  appPC: { minHeight: '100vh', height: '100dvh', backgroundColor: '#000', color: '#e0e0e0', fontFamily: "'Segoe UI', 'Courier New', monospace", overflow: 'hidden', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '100vw' },
  headerPC: { padding: '6px 12px', borderBottom: '1px solid rgba(255,0,60,0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0, backgroundColor: '#0a0000', flexWrap: 'wrap', gap: '4px', minHeight: '44px' },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' },
  titlePC: { color: '#ff003c', margin: 0, fontSize: 'clamp(16px, 4vw, 22px)', fontWeight: 'bold', letterSpacing: '2px' },
  versionBadgePC: { fontSize: '10px', color: '#ff6688', backgroundColor: '#ff003c20', padding: '2px 8px', borderRadius: '10px' },
  headerRight: { display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' },
  callBtnPC: { backgroundColor: 'rgba(0,0,0,0.6)', border: '1px solid #ff003c', borderRadius: '16px', padding: '3px 10px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', color: '#ff003c', fontSize: '11px', fontWeight: 'bold' },
  voiceBtnPC: { backgroundColor: 'rgba(0,0,0,0.6)', border: '1px solid #ff003c', borderRadius: '16px', padding: '3px 10px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', color: '#ff003c', fontSize: '11px', fontWeight: 'bold' },
  pcLayout: { flex: 1, display: 'flex', flexDirection: 'row', overflow: 'hidden', width: '100%', height: '100%' },
  pcSidebar: { width: 'clamp(180px, 30%, 280px)', backgroundColor: '#0a0a0a', overflowY: 'auto', padding: '8px 10px', flexShrink: 0, borderRight: '1px solid #333', height: '100%', boxSizing: 'border-box' },
  pcSidebarSection: { marginBottom: '12px', borderBottom: '1px solid #1a1a1a', paddingBottom: '8px' },
  pcSidebarTitle: { color: '#ff003c', fontSize: '12px', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold' },
  pcSidebarRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2px 0', fontSize: '11px', color: '#ccc' },
  pcMain: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', backgroundColor: '#050505', overflow: 'hidden', height: '100%', padding: '10px' },
  pcBallContainer: { position: 'relative', width: 'clamp(160px, 25vw, 300px)', height: 'clamp(160px, 25vw, 300px)', pointerEvents: 'none', marginBottom: '10px' },
  pcListeningContainer: { display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(0,0,0,0.5)', padding: '4px 16px', borderRadius: '30px', border: '1px solid rgba(255,0,60,0.2)', backdropFilter: 'blur(10px)', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '90%' },
  dashBtnPC: { padding: '3px 10px', backgroundColor: '#222', color: '#fff', border: '1px solid #333', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' },
  dashEmptyPC: { color: '#666', fontSize: '12px', textAlign: 'center', padding: '6px 0' },
  inputRow: { display: 'flex', gap: '6px', marginTop: '4px', marginBottom: '6px' },
  textInputSmall: { flex: 1, padding: '6px 10px', backgroundColor: '#000', border: '1px solid #333', color: '#fff', borderRadius: '4px', fontSize: '13px', outline: 'none' },
  sendBtnSmall: { padding: '6px 12px', backgroundColor: '#ff003c', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  commandActionsPC: { display: 'flex', gap: '6px', marginTop: '4px', flexWrap: 'wrap' },
  attachBtnPC: { padding: '3px 10px', backgroundColor: '#1a3a3a', color: '#fff', border: '1px solid #2a5a5a', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' },
  sidebarBtnPC: { padding: '5px 10px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '12px' },
  logoutBtnPC: { padding: '5px 10px', backgroundColor: '#880000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '12px' },
  filePreviewPC: { marginTop: '4px' },
}
