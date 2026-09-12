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
    toolbox: 'M2 8h20v13H2zM2 8V6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v2M9 12v3M15 12v3',
    wand: 'M15 4V2m0 20v-2m8-8h-2M3 12H1m17.07-7.07l-1.41 1.41M6.34 17.66l-1.41 1.41m0-14.14l1.41 1.41m11.32 11.32l1.41 1.41M12 8l4 4-4 4M8 8l4 4-4 4',
    key: 'M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4',
    hash: 'M4 9h16M4 15h16M10 3L8 21M16 3l-2 18',
    type: 'M4 7V4h16v3M9 20h6M12 4v16',
    download: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3',
    dice: 'M4 4h16v16H4zM8 8h.01M16 8h.01M12 12h.01M8 16h.01M16 16h.01',
    palette: 'M12 22a10 10 0 1 1 0-20c5.5 0 10 4.5 10 10 0 1.7-1.3 3-3 3h-1.5a1.5 1.5 0 0 0-1.5 1.5c0 .4.1.7.4 1 .3.3.6.6.6 1.2A1.8 1.8 0 0 1 12 22zM7.5 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm5-3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm5 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-5 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
    zap: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
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
const VERSION = "Version 23.0.0"
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
  twitter: { name: 'Twitter', pkg: 'com.twitter.android', scheme: 'twitter', universal: 'https://twitter.com/', web: 'https://twitter.com' },
  telegram: { name: 'Telegram', pkg: 'org.telegram.messenger', scheme: 'tg', universal: 'https://t.me/', web: 'https://web.telegram.org' },
  youtube: { name: 'YouTube', pkg: 'com.google.android.youtube', scheme: 'vnd.youtube', universal: 'https://youtube.com/', web: 'https://youtube.com' },
  spotify: { name: 'Spotify', pkg: 'com.spotify.music', scheme: 'spotify', universal: 'https://open.spotify.com/', web: 'https://open.spotify.com' },
  gmail: { name: 'Gmail', pkg: 'com.google.android.gm', scheme: 'googlegmail', universal: 'https://mail.google.com/', web: 'https://mail.google.com' },
  maps: { name: 'Maps', pkg: 'com.google.android.apps.maps', scheme: 'geo', universal: 'https://maps.google.com/', web: 'https://maps.google.com' },
  netflix: { name: 'Netflix', pkg: 'com.netflix.mediaclient', scheme: 'nflx', universal: 'https://netflix.com/', web: 'https://netflix.com' },
  linkedin: { name: 'LinkedIn', pkg: 'com.linkedin.android', scheme: 'linkedin', universal: 'https://linkedin.com/', web: 'https://linkedin.com' },
  reddit: { name: 'Reddit', pkg: 'com.reddit.frontpage', scheme: 'reddit', universal: 'https://reddit.com/', web: 'https://reddit.com' },
  tiktok: { name: 'TikTok', pkg: 'com.zhiliaoapp.musically', scheme: 'snssdk1233', universal: 'https://tiktok.com/', web: 'https://tiktok.com' },
  amazon: { name: 'Amazon', pkg: 'com.amazon.mShop.android.shopping', scheme: null, universal: 'https://amazon.com/', web: 'https://amazon.com' },
  wikipedia: { name: 'Wikipedia', pkg: null, scheme: null, universal: 'https://wikipedia.org/', web: 'https://wikipedia.org' },
  github: { name: 'GitHub', pkg: null, scheme: null, universal: 'https://github.com/', web: 'https://github.com' },
}

const openApp = (appKey, extraPath = '') => {
  const app = APP_MAP[appKey]
  if (!app) return `I don't have "${appKey}" registered.`
  if (isAndroid() && app.pkg) {
    const intentUrl = `intent://${extraPath || ''}#Intent;scheme=${app.scheme};package=${app.pkg};S.browser_fallback_url=${encodeURIComponent(app.universal)};end`
    try { window.location.href = intentUrl; return `Opening ${app.name}...` } catch (e) {}
  }
  if (isMobileDevice()) {
    const url = app.universal + extraPath
    window.open(url, '_blank', 'noopener,noreferrer')
    return `Opening ${app.name}...`
  }
  window.open(app.web, '_blank', 'noopener,noreferrer')
  return `Opening ${app.name} in your browser...`
}

const openWhatsAppGroup = (groupName) => {
  const text = `Looking for group: ${groupName}`
  if (isAndroid()) {
    window.location.href = `intent://send?text=${encodeURIComponent(text)}#Intent;scheme=whatsapp;package=com.whatsapp;end`
    return `Opening WhatsApp. Tap search and type "${groupName}".`
  }
  if (isMobileDevice()) {
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
    return `Opening WhatsApp. Search "${groupName}".`
  }
  window.open('https://web.whatsapp.com', '_blank', 'noopener,noreferrer')
  return `WhatsApp Web opened. Search "${groupName}".`
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
  const userMsgs = messages.filter(m => m.role === 'user').map(m => m.content).filter(m => m.length > 0)
  if (userMsgs.length < 3) return null
  const avgLen = userMsgs.reduce((a, m) => a + m.length, 0) / userMsgs.length
  const emojiCount = userMsgs.filter(m => /[\u{1F300}-\u{1F9FF}\u{2600}-\u{27BF}]/u.test(m)).length
  const formalCount = userMsgs.filter(m => /\b(please|thank you|kindly|could you|would you|may i)\b/i.test(m)).length
  const excitedCount = userMsgs.filter(m => /!/.test(m)).length
  return { short: avgLen < 40, long: avgLen > 120, emoji: emojiCount / userMsgs.length > 0.3, formal: formalCount / userMsgs.length > 0.3, excited: excitedCount / userMsgs.length > 0.4, count: userMsgs.length }
}

const applyPersonality = (reply, personality, customStyle) => {
  if (!reply) return reply
  const clean = reply.replace(/^(I found this for you:|Here's what I discovered:|Great question! The answer is:|Let me share what I know:|Based on my search,|Certainly!|\[Short\]|\[Detailed\])\s*/i, '').trim()
  switch (personality) {
    case 'concise': { const s = clean.split(/(?<=[.!?])\s+/).filter(Boolean); return s.slice(0, 2).join(' ') || clean }
    case 'polite': return `Certainly! ${clean}`
    case 'clear': return `Here's a clear answer:\n\n${clean}`
    case 'comprehensive': return `Let me give you a thorough answer:\n\n${clean}\n\nWould you like me to go deeper on any part?`
    case 'custom': {
      if (!customStyle || !customStyle.count) return clean
      let out = clean
      if (customStyle.short) { const s = clean.split(/(?<=[.!?])\s+/).filter(Boolean); out = s.slice(0, 2).join(' ') || clean }
      if (customStyle.formal && !/^Regarding/i.test(out)) out = `Regarding your query: ${out}`
      if (customStyle.emoji) out = `✨ ${out} 😊`
      if (customStyle.excited && !/[!?]$/.test(out)) out = out + '!'
      return out
    }
    default: return clean
  }
}

// ============ CODE GENERATOR (INTERACTIVE) ============
const CODE_QUESTIONS = [
  { key: 'language', q: "What programming language? (JavaScript, Python, React, HTML/CSS, Java, C++, etc.)" },
  { key: 'purpose', q: "What should the code do? (e.g., 'a todo app', 'a login form', 'fibonacci', 'an AI classifier')" },
  { key: 'detail', q: "Any extra details? (e.g., 'with dark theme', 'using localStorage', 'with comments')" },
]

const detectLanguage = (text) => {
  const t = text.toLowerCase()
  const map = [
    ['javascript', ['javascript','js','node','nodejs','vanilla js']],
    ['typescript', ['typescript','ts']],
    ['python', ['python','py','django','flask']],
    ['react', ['react','reactjs','jsx','hooks']],
    ['html', ['html','htm']],
    ['css', ['css','styling','scss','sass']],
    ['java', ['java']],
    ['c++', ['c++','cpp']],
    ['c#', ['c#','csharp','.net']],
    ['go', ['go','golang']],
    ['rust', ['rust']],
    ['php', ['php','laravel']],
    ['sql', ['sql','mysql','postgres']],
    ['bash', ['bash','shell','sh']],
  ]
  for (const [lang, kws] of map) if (kws.some(k => t.includes(k))) return lang
  return 'javascript'
}

const generateLongCode = (language, purpose, detail) => {
  const lang = language.toLowerCase()
  const p = purpose.toLowerCase()

  // Big, real, multi-part code samples per language
  if (lang.includes('react')) {
    return `Here's a complete React application for: **${purpose}**${detail ? ` (${detail})` : ''}

\`\`\`jsx
// ============================================
// ${purpose.toUpperCase()} — React App
// Features: state, effects, localStorage, API,
// error boundaries, responsive UI
// ============================================
import { useState, useEffect, useCallback, useRef } from 'react'

// ---------- Custom Hook: persistent state ----------
function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : initial }
    catch { return initial }
  })
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
  }, [key, value])
  return [value, setValue]
}

// ---------- Custom Hook: debounce ----------
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

// ---------- Main Component ----------
export default function App() {
  const [items, setItems] = useLocalStorage('app_items', [])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const inputRef = useRef(null)
  const debouncedQuery = useDebounce(query, 300)

  // Fetch on mount
  useEffect(() => {
    async function load() {
      setLoading(true)
      setError(null)
      try {
        // Replace with your API
        // const res = await fetch('/api/items')
        // const data = await res.json()
        // setItems(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const addItem = useCallback((text) => {
    if (!text.trim()) return
    setItems(prev => [{ id: Date.now(), text, done: false }, ...prev])
  }, [setItems])

  const toggleItem = useCallback((id) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, done: !i.done } : i))
  }, [setItems])

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [setItems])

  const filtered = items.filter(i =>
    i.text.toLowerCase().includes(debouncedQuery.toLowerCase())
  )

  return (
    <div style={{ padding: 20, fontFamily: 'system-ui', maxWidth: 600, margin: '0 auto' }}>
      <h1>${purpose}</h1>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { addItem(query); setQuery('') } }}
          placeholder="Type and press Enter..."
          style={{ flex: 1, padding: 12, borderRadius: 8, border: '1px solid #ccc' }}
        />
        <button onClick={() => { addItem(query); setQuery('') }} style={{ padding: '12px 20px', background: '#ff003c', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
          Add
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filtered.map(item => (
          <li key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderBottom: '1px solid #eee' }}>
            <input type="checkbox" checked={item.done} onChange={() => toggleItem(item.id)} />
            <span style={{ flex: 1, textDecoration: item.done ? 'line-through' : 'none' }}>{item.text}</span>
            <button onClick={() => removeItem(item.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#999' }}>✕</button>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && !loading && <p style={{ color: '#999', textAlign: 'center' }}>No items</p>}
    </div>
  )
}
\`\`\`

**What's included:**
- Custom hooks for localStorage + debounce
- Full CRUD operations
- Error boundary and loading states
- Filtering and search
- Responsive layout

Want me to add authentication, routing, or a backend for this?`
  }

  if (lang.includes('python')) {
    return `Here's a complete Python program for: **${purpose}**${detail ? ` (${detail})` : ''}

\`\`\`python
# ============================================
# ${purpose.upper()} — Python Program
# Features: OOP, error handling, logging,
# CLI parsing, file I/O, unit tests
# ============================================
import os
import sys
import json
import logging
import argparse
from dataclasses import dataclass, asdict
from typing import List, Optional
from datetime import datetime

# ---------- Logging ----------
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s'
)
log = logging.getLogger(__name__)

# ---------- Data model ----------
@dataclass
class Item:
    id: int
    title: str
    description: str = ""
    done: bool = False
    created_at: str = ""

    def __post_init__(self):
        if not self.created_at:
            self.created_at = datetime.utcnow().isoformat()

# ---------- Storage ----------
class Store:
    def __init__(self, path: str = "items.json"):
        self.path = path
        self.items: List[Item] = []
        self._load()

    def _load(self):
        if not os.path.exists(self.path):
            return
        try:
            with open(self.path, "r") as f:
                data = json.load(f)
            self.items = [Item(**d) for d in data]
            log.info(f"Loaded {len(self.items)} items")
        except Exception as e:
            log.error(f"Failed to load: {e}")

    def save(self):
        try:
            with open(self.path, "w") as f:
                json.dump([asdict(i) for i in self.items], f, indent=2)
            log.info("Saved")
        except Exception as e:
            log.error(f"Failed to save: {e}")

    def add(self, title: str, description: str = "") -> Item:
        new_id = max((i.id for i in self.items), default=0) + 1
        item = Item(id=new_id, title=title, description=description)
        self.items.append(item)
        self.save()
        return item

    def list(self) -> List[Item]:
        return sorted(self.items, key=lambda x: x.created_at, reverse=True)

    def complete(self, item_id: int) -> bool:
        for i in self.items:
            if i.id == item_id:
                i.done = True
                self.save()
                return True
        return False

    def delete(self, item_id: int) -> bool:
        before = len(self.items)
        self.items = [i for i in self.items if i.id != item_id]
        if len(self.items) < before:
            self.save()
            return True
        return False

# ---------- CLI ----------
def main():
    parser = argparse.ArgumentParser(description="${purpose}")
    sub = parser.add_subparsers(dest="cmd")

    add_p = sub.add_parser("add", help="Add a new item")
    add_p.add_argument("title", help="Item title")
    add_p.add_argument("-d", "--description", default="")

    sub.add_parser("list", help="List all items")

    done_p = sub.add_parser("done", help="Mark as done")
    done_p.add_argument("id", type=int)

    del_p = sub.add_parser("delete", help="Delete an item")
    del_p.add_argument("id", type=int)

    args = parser.parse_args()
    store = Store()

    if args.cmd == "add":
        item = store.add(args.title, args.description)
        print(f"✓ Added: #{item.id} {item.title}")
    elif args.cmd == "list":
        items = store.list()
        if not items:
            print("No items.")
            return
        for i in items:
            mark = "✓" if i.done else "○"
            print(f"{mark} #{i.id} {i.title}")
    elif args.cmd == "done":
        print("✓ Marked" if store.complete(args.id) else "✗ Not found")
    elif args.cmd == "delete":
        print("✓ Deleted" if store.delete(args.id) else "✗ Not found")
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
\`\`\`

**Run it with:**
\`\`\`bash
python app.py add "Buy milk"
python app.py list
python app.py done 1
\`\`\`

**What's included:**
- Dataclasses, type hints, logging
- JSON persistence, error handling
- Full CLI with sub-commands

Want tests or a REST API version?`
  }

  // Generic fallback for any other language
  return `Here's a complete **${language}** solution for: **${purpose}**${detail ? ` (${detail})` : ''}

\`\`\`${lang}
// ============================================
// ${purpose.toUpperCase()} — ${language}
// ============================================

'use strict';

/**
 * Configuration
 */
const CONFIG = {
  name: '${purpose.replace(/'/g, "\\'")}',
  version: '1.0.0',
  debug: true,
};

/**
 * Logger — simple leveled logger
 */
const log = {
  info: (...args) => console.log('[INFO]', ...args),
  warn: (...args) => console.warn('[WARN]', ...args),
  error: (...args) => console.error('[ERROR]', ...args),
};

/**
 * Core class
 */
class App {
  constructor(options = {}) {
    this.options = { ...CONFIG, ...options };
    this.state = { items: [], ready: false };
    log.info('Initializing', this.options.name);
  }

  async init() {
    try {
      await this.load();
      this.state.ready = true;
      log.info('Ready. Items:', this.state.items.length);
      return this;
    } catch (err) {
      log.error('Init failed:', err);
      throw err;
    }
  }

  async load() {
    // Simulated async load — replace with fetch/localStorage
    await new Promise(r => setTimeout(r, 10));
    this.state.items = [];
  }

  add(text) {
    if (!text) throw new Error('Text required');
    const item = { id: Date.now(), text, created: new Date().toISOString() };
    this.state.items.push(item);
    log.info('Added:', item.id);
    return item;
  }

  list() { return [...this.state.items] }

  remove(id) {
    const before = this.state.items.length;
    this.state.items = this.state.items.filter(i => i.id !== id);
    return this.state.items.length < before;
  }

  find(predicate) { return this.state.items.find(predicate) }

  filter(predicate) { return this.state.items.filter(predicate) }
}

/**
 * Bootstrap
 */
(async () => {
  const app = await new App().init();
  app.add('Sample item #1');
  app.add('Sample item #2');
  console.log('All items:', app.list());
})();

// Export for module use
// export default App;
\`\`\`

**What's included:**
- Configuration object
- Leveled logger
- Class-based structure with async init
- CRUD operations
- Error handling

Want me to extend this — add tests, a UI, or convert it to a framework?`
}

const isCodeRequest = (query) => {
  const q = query.toLowerCase()
  const kws = ['generate code','write code','create code','make code','build code','code for','code to','function in','javascript','python','react','html','css','java','c++','sql','node','bash','shell','code snippet','program','script','algorithm','write an ai code','ai code','write me a']
  return kws.some(k => q.includes(k))
}

// ============ MUSIC GENERATOR (Web Audio) ============
const generateMelody = (bpm = 120, scale = 'major', bars = 4) => {
  const scales = {
    major: [0, 2, 4, 5, 7, 9, 11, 12],
    minor: [0, 2, 3, 5, 7, 8, 10, 12],
    pentatonic: [0, 2, 4, 7, 9, 12],
  }
  const s = scales[scale] || scales.major
  const root = 60 // C4
  const beatDur = 60 / bpm
  const notes = []
  for (let b = 0; b < bars * 4; b++) {
    if (Math.random() < 0.25) { notes.push({ t: b * beatDur, freq: 0, dur: beatDur * 0.5 }); continue }
    const degree = s[Math.floor(Math.random() * s.length)]
    const octave = Math.random() < 0.3 ? 12 : 0
    const midi = root + degree + octave
    const freq = 440 * Math.pow(2, (midi - 69) / 12)
    notes.push({ t: b * beatDur, freq, dur: beatDur * (Math.random() < 0.3 ? 1 : 0.5) })
  }
  return notes
}

const playMelody = (notes, bpm = 120) => {
  const Ctx = window.AudioContext || window.webkitAudioContext
  if (!Ctx) throw new Error('Web Audio not supported')
  const ctx = new Ctx()
  const master = ctx.createGain()
  master.gain.value = 0.15
  master.connect(ctx.destination)
  const start = ctx.currentTime + 0.05
  const totalDur = notes.reduce((m, n) => Math.max(m, n.t + n.dur), 0)

  notes.forEach(n => {
    if (!n.freq) return
    const osc = ctx.createOscillator()
    osc.type = 'triangle'
    osc.frequency.value = n.freq
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0, start + n.t)
    gain.gain.linearRampToValueAtTime(1, start + n.t + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.001, start + n.t + n.dur)
    osc.connect(gain).connect(master)
    osc.start(start + n.t)
    osc.stop(start + n.t + n.dur + 0.05)
  })

  // Bass line
  const bassNotes = notes.filter((_, i) => i % 4 === 0)
  bassNotes.forEach(n => {
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = (n.freq || 130) / 2
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0, start + n.t)
    gain.gain.linearRampToValueAtTime(0.6, start + n.t + 0.03)
    gain.gain.exponentialRampToValueAtTime(0.001, start + n.t + n.dur * 2)
    osc.connect(gain).connect(master)
    osc.start(start + n.t)
    osc.stop(start + n.t + n.dur * 2 + 0.1)
  })

  return { ctx, duration: totalDur + 0.5 }
}

// ============ VIDEO GENERATOR (Canvas) ============
const startCanvasVideo = (canvas, onProgress) => {
  const ctx = canvas.getContext('2d')
  const W = canvas.width, H = canvas.height
  let t = 0
  let raf
  const stream = canvas.captureStream(30)

  const particles = Array.from({ length: 80 }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2,
    r: Math.random() * 3 + 1,
  }))

  const draw = () => {
    t += 0.02
    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, W, H)
    grad.addColorStop(0, `hsl(${(t * 30) % 360}, 70%, 15%)`)
    grad.addColorStop(1, `hsl(${(t * 30 + 120) % 360}, 70%, 10%)`)
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, W, H)

    // Particles
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy
      if (p.x < 0 || p.x > W) p.vx *= -1
      if (p.y < 0 || p.y > H) p.vy *= -1
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `hsla(${(t * 50 + p.x) % 360}, 80%, 60%, 0.7)`
      ctx.fill()
    })

    // Text
    ctx.fillStyle = 'rgba(255,255,255,0.9)'
    ctx.font = 'bold 48px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('CYPHER4X', W / 2, H / 2 - 20)
    ctx.font = '16px sans-serif'
    ctx.fillStyle = 'rgba(255,100,150,0.9)'
    ctx.fillText('AI Video Generator', W / 2, H / 2 + 20)

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
      cancelAnimationFrame(raf)
      recorder.stop()
    }),
  }
}

// ============ WEB SEARCH ============
const TRUSTED_DOMAINS = ['wikipedia.org','britannica.com','gov','edu','who.int','un.org','nature.com','science.org','nasa.gov','nih.gov','cdc.gov','bbc.com','reuters.com','apnews.com','nytimes.com','theguardian.com','github.com','stackoverflow.com','mozilla.org','w3.org','ietf.org','developer.mozilla.org','python.org','reactjs.org','nodejs.org']
const isTrustedDomain = (url) => { if (!url) return false; try { const h = new URL(url).hostname.toLowerCase(); return TRUSTED_DOMAINS.some(d => h.includes(d)) } catch { return false } }

const searchWeb = async (query) => {
  if (!TAVILY_API_KEY) return { error: "Tavily API key not configured." }
  try {
    const res = await fetch(TAVILY_URL, { method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${TAVILY_API_KEY}` }, body: JSON.stringify({ query, search_depth: "advanced", include_answer: true, max_results: 6 }) })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    const results = data.results || []
    const safest = results.find(r => isTrustedDomain(r.url)) || results[0]
    return { answer: data.answer || results.map(r => r.content).join("\n\n") || "No results.", safestUrl: safest?.url || null }
  } catch (error) { return { error: error.message } }
}

const openAnonymousSearch = (query) => { window.open(`https://duckduckgo.com/?q=${encodeURIComponent(query)}&kae=d&kp=-2`, '_blank', 'noopener,noreferrer') }

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
  const [events] = useState([]); const [reminders] = useState([])
  const [overlayActive, setOverlayActive] = useState(false); const [overlayListening, setOverlayListening] = useState(false)
  const overlayRecognitionRef = useRef(null)

  // Interactive code gen
  const [pendingCode, setPendingCode] = useState(null) // { step, answers: {} }
  const [copiedId, setCopiedId] = useState(null)

  // Music & Video
  const [showMusicPanel, setShowMusicPanel] = useState(false)
  const [musicBpm, setMusicBpm] = useState(120)
  const [musicScale, setMusicScale] = useState('major')
  const [musicBars, setMusicBars] = useState(4)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [showVideoPanel, setShowVideoPanel] = useState(false)
  const [videoRecording, setVideoRecording] = useState(false)
  const [videoProgress, setVideoProgress] = useState(0)
  const canvasRef = useRef(null)
  const videoRecorderRef = useRef(null)

  // Jarvis Tools
  const [showJarvis, setShowJarvis] = useState(false)
  const [toolTab, setToolTab] = useState('password')
  const [toolInput, setToolInput] = useState('')
  const [toolOutput, setToolOutput] = useState('')
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [timerRunning, setTimerRunning] = useState(false)

  const synthRef = useRef(typeof window !== "undefined" ? window.speechSynthesis : null)
  const recognitionRef = useRef(null); const msgCounter = useRef(0)
  const fileInputRef = useRef(null); const bgInputRef = useRef(null)

  // Sound effect helper
  const playBeep = useCallback((freq = 800, duration = 0.08) => {
    if (!settings.soundFx) return
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext
      if (!Ctx) return
      const ctx = new Ctx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.frequency.value = freq
      osc.type = 'sine'
      gain.gain.setValueAtTime(0.1, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
      osc.connect(gain).connect(ctx.destination)
      osc.start(); osc.stop(ctx.currentTime + duration)
    } catch (e) {}
  }, [settings.soundFx])

  // Haptic helper
  const vibrate = useCallback((pattern = 10) => {
    if (!settings.haptic) return
    try { navigator.vibrate && navigator.vibrate(pattern) } catch (e) {}
  }, [settings.haptic])

  // BOOT
  useEffect(() => {
    if (!isBooting) return
    const title = "CYPHER4X"
    const credit = "Created by Hackers Hub led by Crypty"
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
            if (auth && userExists(auth.email, auth.pin)) {
              setEmail(auth.email); setPin(auth.pin); loginUser(auth.email, auth.pin)
            } else {
              setUserMode('guest'); setGuestMessageCount(0)
              const sp = localStorage.getItem('cypher4x_personality')
              if (!sp) setShowPersonalityModal(true)
              else setAiPersonality(sp)
              if (settings.welcomeEnabled) {
                const today = new Date().toDateString()
                const lw = localStorage.getItem('cypher4x_welcome_date')
                if (lw !== today) {
                  localStorage.setItem('cypher4x_welcome_date', today)
                  setShowWelcomeOverlay(true)
                  const msg = "Hello! I'm CYPHER4X, your AI assistant. Welcome!"
                  setWelcomeMessage(msg); speakText(msg)
                }
              }
            }
          }, 800)
        }
      }
    }, 100)
    return () => clearInterval(interval)
  }, [isBooting, settings.welcomeEnabled])

  const handleAuthSubmit = () => {
    if (!email || !pin || pin.length !== 4 || !/^\d{4}$/.test(pin)) { setAuthError("Please enter a valid email and 4-digit PIN."); return }
    if (showLogin) {
      if (userExists(email, pin)) { loginUser(email, pin); setShowAuthModal(false) }
      else setAuthError("No account found. Please sign up.")
    } else {
      if (userExists(email, pin)) { setAuthError("Account already exists."); return }
      addUser(email, pin)
      const empty = { profile: null, conversation: [], commandHistory: [], events: [], reminders: [], faceRecognition: false, biometricAuth: false, voiceGender: 'female', viewMode: 'android', personality: 'polite', backgroundImage: null, customStyle: null, settings }
      saveUserData(email, pin, empty); loginUser(email, pin); setShowAuthModal(false)
    }
  }
  const loginUser = (email, pin) => { saveAuth(email, pin); setUserMode('loggedin'); loadUserDataByEmail(email, pin); setAuthError(''); setGuestMessageCount(0) }

  const loadUserDataByEmail = (email, pin) => {
    const data = loadUserData(email, pin)
    if (data) {
      setProfile(data.profile || null); setConversation(data.conversation || [])
      setCommandHistory(data.commandHistory || []); setVoiceGender(data.voiceGender || 'female')
      setViewMode(data.viewMode || 'android'); setAiPersonality(data.personality || 'polite')
      setBackgroundImage(data.backgroundImage || null)
      if (data.customStyle) setCustomStyle(data.customStyle)
      if (data.settings) setSettings({ ...settings, ...data.settings })
      msgCounter.current = (data.conversation || []).length + 1
      if (settings.welcomeEnabled) {
        const today = new Date().toDateString(); const lw = localStorage.getItem('cypher4x_welcome_date')
        if (lw !== today) {
          localStorage.setItem('cypher4x_welcome_date', today)
          setShowWelcomeOverlay(true)
          const name = data.profile?.name || 'User'
          const msg = `Welcome back, ${name}! I'm CYPHER4X.`
          setWelcomeMessage(msg); speakText(msg)
        }
      }
    }
  }
  const saveCurrentUserData = () => {
    if (userMode !== 'loggedin') return
    saveUserData(email, pin, { profile, conversation, commandHistory, events, reminders, faceRecognition, biometricAuth, voiceGender, viewMode, personality: aiPersonality, backgroundImage, customStyle, settings })
  }
  useEffect(() => { if (userMode === 'loggedin') saveCurrentUserData() }, [profile, conversation, commandHistory, events, reminders, faceRecognition, biometricAuth, voiceGender, viewMode, aiPersonality, backgroundImage, customStyle, settings])
  useEffect(() => { if (aiPersonality === 'custom' && conversation.length > 3) { const s = analyzeUserStyle(conversation); if (s) setCustomStyle(s) } }, [conversation, aiPersonality])

  const handleLogout = () => {
    if (!confirm("Logout?")) return
    clearAuth(); setUserMode('guest'); setProfile(null); setConversation([]); setCommandHistory([])
    setEvents([]); setReminders([]); setFaceRecognition(false); setBiometricAuth(false)
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
    r.onerror = (event) => { if (event.error === 'not-allowed') { alert('Allow microphone.'); setIsFullscreenCall(false); setIsCallActive(false); setRecordingMode(false); setIsListening(false); return } if (!isOneOff && isFullscreenCall) setTimeout(() => { try { r.start() } catch (e) {} }, 500) }
    r.onresult = async (event) => {
      let f = '', i = ''
      for (let k = event.resultIndex; k < event.results.length; k++) { const res = event.results[k]; if (res.isFinal) f += res[0].transcript; else i += res[0].transcript }
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
      u.rate = settings.voiceSpeed || 1
      u.pitch = voiceGender === 'female' ? 1.3 : 1.0
      u.onstart = () => setIsAISpeaking(true)
      u.onend = () => { setIsAISpeaking(false); if (onEnd) onEnd() }
      u.onerror = () => { setIsAISpeaking(false); if (onEnd) onEnd() }
      synthRef.current.speak(u)
    } catch (e) { setIsAISpeaking(false); if (onEnd) onEnd() }
  }, [voiceGender, settings.voiceSpeed])

  const executeCommand = (query) => {
    const lower = query.toLowerCase().trim()
    if (lower.includes('whatsapp business') || lower.includes('whatsapp bussiness')) {
      const grp = query.match(/group(?:\s+named)?\s+(.+)/i)
      if (grp) return { response: openWhatsAppGroup(grp[1].trim()) }
      return { response: openApp('whatsappbusiness') }
    }
    const waGrp = lower.match(/(?:open\s+)?(?:my\s+)?whatsapp.*group(?:\s+named)?\s+(.+)/i)
    if (waGrp) return { response: openWhatsAppGroup(waGrp[1].trim()) }
    const appMatch = lower.match(/^open\s+(?:my\s+)?(whatsapp|instagram|facebook|twitter|telegram|youtube|spotify|gmail|maps|netflix|linkedin|reddit|tiktok|amazon|wikipedia|github)(?:\s+(?:on\s+my\s+device)?)?(?:\s+and\s+open\s+my\s+group\s+named\s+(.+))?$/i)
    if (appMatch) { const k = appMatch[1]; const g = appMatch[2]; if (k === 'whatsapp' && g) return { response: openWhatsAppGroup(g) }; return { response: openApp(k) } }
    const bare = lower.match(/^(?:open\s+)?(whatsapp|instagram|youtube|telegram|spotify|facebook|twitter|tiktok)$/)
    if (bare) return { response: openApp(bare[1]) }
    if ((lower.startsWith('secret ') || lower.startsWith('anonymous ')) && settings.secretMode) {
      const t = query.replace(/^(secret|anonymous)\s+/i, ''); openAnonymousSearch(t); return { response: `Anonymous search for "${t}". 🔒` }
    }
    if (lower.startsWith('web ') || lower.startsWith('search web ')) { const t = query.replace(/^(web|search web)\s+/i, ''); openAnonymousSearch(t); return { response: `Searching "${t}"...` } }
    if (lower.startsWith('play ')) { const s = lower.replace('play ', '').trim(); window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(s)}`, '_blank', 'noopener,noreferrer'); return { response: `Playing "${s}" on YouTube! 🎵` } }
    if (lower === 'time' || lower.includes('what time')) return { response: `Current time: ${new Date().toLocaleTimeString()}. ⏰` }
    if (lower === 'date' || lower.includes('what date') || lower === 'today') return { response: `Today is ${new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}. 📅` }
    if (lower.startsWith('calc ') || lower.includes('calculate')) {
      try { const e = lower.replace('calculate','').replace('calc','').trim(); const r = Function(`"use strict"; return (${e})`)(); if (typeof r === 'number') return { response: `Answer: ${r}. 🧮` } } catch (err) {}
    }
    return null
  }

  const processUserQuery = useCallback(async (query) => {
    if (!query || isProcessing) return
    if (userMode === 'guest') incrementGuestMessage()
    setIsProcessing(true); setInterimTranscript(''); setRecordingMode(false)
    vibrate(15); playBeep(700, 0.06)

    const userMsg = { id: ++msgCounter.current, role: 'user', content: query, time: Date.now() }
    setConversation(prev => [...prev, userMsg])
    setCommandHistory(prev => [...prev, { command: query, timestamp: Date.now() }])

    // ---- INTERACTIVE CODE GENERATION FLOW ----
    // If pending code request, treat query as an answer
    if (pendingCode) {
      const nextAnswers = { ...pendingCode.answers, [pendingCode.step]: query }
      const nextStepIdx = ['language','purpose','detail'].findIndex(k => !nextAnswers[k])
      if (nextStepIdx === -1) {
        // All questions answered → generate
        const code = generateLongCode(nextAnswers.language, nextAnswers.purpose, nextAnswers.detail)
        const styled = applyPersonality(code, aiPersonality, customStyle)
        const m = { id: ++msgCounter.current, role: 'assistant', content: styled, time: Date.now() }
        setConversation(prev => [...prev, m])
        setPendingCode(null)
        if (settings.codeAutoOverview) setShowChatOverview(true)
        if (settings.readAloud) speakText('Here is your generated code. Tap the copy button to copy it.')
      } else {
        const nextKey = ['language','purpose','detail'][nextStepIdx]
        setPendingCode({ step: nextKey, answers: nextAnswers })
        const q = CODE_QUESTIONS.find(c => c.key === nextKey)
        const m = { id: ++msgCounter.current, role: 'assistant', content: q.q, time: Date.now() }
        setConversation(prev => [...prev, m])
        if (settings.readAloud || settings.autoStartVoice) speakText(q.q)
      }
      setIsProcessing(false); return
    }

    // Detect code request → start flow
    if (isCodeRequest(query)) {
      const detectedLang = detectLanguage(query)
      const detectedPurpose = query.replace(/^(write|create|generate|make|build)\s+(me\s+)?(an?\s+)?/i, '').replace(/\bcode\b/gi, '').trim() || 'a general application'
      const m = {
        id: ++msgCounter.current,
        role: 'assistant',
        content: `I'd love to write code for you! 🎨 Let me ask 3 quick questions so I can tailor it.\n\n**Q1 — ${CODE_QUESTIONS[0].q}**\n\n_Detected: ${detectedLang}. Reply or say "auto" to use this._`,
        time: Date.now()
      }
      setConversation(prev => [...prev, m])
      setPendingCode({ step: 'language', answers: { language: null }, detected: { language: detectedLang, purpose: detectedPurpose } })
      if (settings.readAloud || settings.autoStartVoice) speakText('I will ask you three quick questions to generate your code.')
      setIsProcessing(false); return
    }

    const cmdResult = executeCommand(query)
    if (cmdResult) {
      const styled = applyPersonality(cmdResult.response, aiPersonality, customStyle)
      const m = { id: ++msgCounter.current, role: 'assistant', content: styled, time: Date.now() }
      setConversation(prev => [...prev, m]); if (settings.readAloud) speakText(styled)
      setIsProcessing(false); return
    }

    const lower = query.toLowerCase()
    const casual = ['hello','hi','hey','good morning','good afternoon','good evening',"what's up",'sup','yo','howdy','hey there']
    if (casual.some(p => lower.includes(p))) {
      const replies = ["Hey there! How can I help?","Hi! What can I do for you?","Hello! Ready to assist!","Good to see you!","Hey! How can I help?","Hi there!"]
      const reply = applyPersonality(replies[Math.floor(Math.random()*replies.length)], aiPersonality, customStyle)
      const m = { id: ++msgCounter.current, role: 'assistant', content: reply, time: Date.now() }
      setConversation(prev => [...prev, m]); if (settings.readAloud) speakText(reply)
      setIsProcessing(false); return
    }
    if (lower.includes('how are you') || lower.includes('feeling')) {
      const replies = ["I'm fantastic! How about you?","Doing great!","In top shape!","Feeling wonderful!"]
      const reply = applyPersonality(replies[Math.floor(Math.random()*replies.length)], aiPersonality, customStyle)
      const m = { id: ++msgCounter.current, role: 'assistant', content: reply, time: Date.now() }
      setConversation(prev => [...prev, m]); if (settings.readAloud) speakText(reply)
      setIsProcessing(false); return
    }

    const result = await searchWeb(query)
    let reply = result.error ? `Search error: ${result.error}` : (result.answer || "I couldn't find an answer.")
    if (!result.error && result.safestUrl && settings.safeLinks) reply += `\n\n🔗 Recommended source: ${result.safestUrl}`
    reply = applyPersonality(reply, aiPersonality, customStyle)
    const m = { id: ++msgCounter.current, role: 'assistant', content: reply, time: Date.now() }
    setConversation(prev => [...prev, m])
    if (settings.readAloud) speakText(reply.replace(/🔗.*$/s, ''))
    playBeep(500, 0.08); vibrate(10)
    setIsProcessing(false)
  }, [isProcessing, userMode, aiPersonality, customStyle, settings, pendingCode, vibrate, playBeep])

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
    const nc = prompt("Edit your message:", msg.content)
    if (nc !== null && nc.trim()) setConversation(prev => prev.map(m => m.id === id ? { ...m, content: nc.trim() } : m))
  }, [conversation])
  const handleDeleteMessage = useCallback((id) => { if (settings.confirmDelete && !confirm("Delete this message?")) return; setConversation(prev => prev.filter(m => m.id !== id)) }, [settings.confirmDelete])
  const handleShareMessage = useCallback(async (msg) => {
    const c = msg.content
    if (navigator.share) { try { await navigator.share({ title: 'CYPHER4X', text: c }) } catch (e) {} }
    else { try { await navigator.clipboard.writeText(c); alert('Copied!') } catch (e) {} }
  }, [])
  const copyCode = async (code, id) => {
    try { await navigator.clipboard.writeText(code); setCopiedId(id); setTimeout(() => setCopiedId(null), 1500); vibrate(20) } catch (e) { alert('Copy failed') }
  }

  // Parse assistant messages for code blocks
  const renderMessageContent = (msg) => {
    const content = msg.content
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
    const parts = []
    let lastIndex = 0
    let match
    let idx = 0
    while ((match = codeBlockRegex.exec(content)) !== null) {
      if (match.index > lastIndex) parts.push({ type: 'text', value: content.slice(lastIndex, match.index) })
      parts.push({ type: 'code', lang: match[1] || 'text', value: match[2], key: `${msg.id}-${idx++}` })
      lastIndex = match.index + match[0].length
    }
    if (lastIndex < content.length) parts.push({ type: 'text', value: content.slice(lastIndex) })
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

  const handleFileShare = useCallback((e) => {
    const files = e.target.files; if (!files || files.length === 0) return
    const f = files[0]; if (f.size > 20 * 1024 * 1024) { alert("File too large!"); return }
    const rd = new FileReader()
    rd.onloadend = () => {
      const fd = { id: ++msgCounter.current, role: 'user', content: `📎 ${f.name}`, time: Date.now(), file: { name: f.name, type: f.type, data: rd.result, size: f.size } }
      setConversation(prev => [...prev, fd])
      const am = { id: ++msgCounter.current, role: 'assistant', content: `Received: ${f.name}`, time: Date.now() }
      setConversation(prev => [...prev, am]); speakText(`Received your file.`)
    }
    rd.readAsDataURL(f); e.target.value = ''
  }, [speakText])

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
    r.onresult = async (event) => {
      let f = '', i = ''
      for (let k = event.resultIndex; k < event.results.length; k++) { const res = event.results[k]; if (res.isFinal) f += res[0].transcript; else i += res[0].transcript }
      if (f) { setInterimTranscript(''); setRecordingMode(false); await processUserQuery(f) } else if (i) setInterimTranscript(i)
    }
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

  // Music handlers
  const handleGenerateMusic = () => {
    try {
      setMusicPlaying(true)
      const notes = generateMelody(musicBpm, musicScale, musicBars)
      const { ctx, duration } = playMelody(notes, musicBpm)
      setTimeout(() => { setMusicPlaying(false); try { ctx.close() } catch (e) {} }, (duration + 1) * 1000)
    } catch (e) { alert('Music error: ' + e.message); setMusicPlaying(false) }
  }

  // Video handlers
  const handleStartVideo = async () => {
    if (!canvasRef.current) return
    setVideoRecording(true)
    const rec = startCanvasVideo(canvasRef.current, (t) => setVideoProgress(Math.floor(t * 10) % 100))
    videoRecorderRef.current = rec
    setTimeout(async () => {
      if (!videoRecorderRef.current) return
      const blob = await videoRecorderRef.current.stop()
      videoRecorderRef.current = null
      setVideoRecording(false)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a'); a.href = url; a.download = `cypher4x_video_${Date.now()}.webm`; a.click()
      URL.revokeObjectURL(url)
    }, 5000)
  }
  const handleStopVideo = async () => {
    if (!videoRecorderRef.current) return
    const blob = await videoRecorderRef.current.stop()
    videoRecorderRef.current = null
    setVideoRecording(false)
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = `cypher4x_video_${Date.now()}.webm`; a.click()
    URL.revokeObjectURL(url)
  }

  // Jarvis tools
  const runJarvisTool = () => {
    let out = ''
    try {
      switch (toolTab) {
        case 'password': {
          const len = Math.min(64, Math.max(4, parseInt(toolInput) || 16))
          const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~'
          out = Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
          break
        }
        case 'base64': out = btoa(toolInput); break
        case 'unbase64': try { out = atob(toolInput) } catch (e) { out = 'Invalid Base64' }; break
        case 'upper': out = toolInput.toUpperCase(); break
        case 'lower': out = toolInput.toLowerCase(); break
        case 'reverse': out = toolInput.split('').reverse().join(''); break
        case 'count': out = `Chars: ${toolInput.length}, Words: ${toolInput.split(/\s+/).filter(Boolean).length}`; break
        case 'urlencode': out = encodeURIComponent(toolInput); break
        case 'urldecode': out = decodeURIComponent(toolInput); break
        case 'random': {
          const [min, max] = toolInput.split(',').map(s => parseInt(s.trim()))
          const lo = isNaN(min) ? 1 : min, hi = isNaN(max) ? 100 : max
          out = String(Math.floor(Math.random() * (hi - lo + 1)) + lo)
          break
        }
        case 'dice': { const n = parseInt(toolInput) || 1; out = Array.from({ length: n }, () => Math.floor(Math.random() * 6) + 1).join(', '); break }
        case 'hash': {
          // Simple hash (not crypto secure)
          let h = 0; for (let i = 0; i < toolInput.length; i++) { h = ((h << 5) - h) + toolInput.charCodeAt(i); h |= 0 }
          out = Math.abs(h).toString(16).padStart(8, '0')
          break
        }
        default: out = 'Select a tool'
      }
    } catch (e) { out = 'Error: ' + e.message }
    setToolOutput(out)
    vibrate(15)
  }

  // Timer
  useEffect(() => {
    if (!timerRunning || timerSeconds <= 0) return
    const t = setInterval(() => {
      setTimerSeconds(s => { if (s <= 1) { setTimerRunning(false); playBeep(1000, 0.3); vibrate([200,100,200]); return 0 } return s - 1 })
    }, 1000)
    return () => clearInterval(t)
  }, [timerRunning, timerSeconds, playBeep, vibrate])

  const handleAvatarChange = useCallback((e) => { const f = e.target.files[0]; if (!f) return; if (!f.type.startsWith('image/')) { alert("Select image!"); return }; const rd = new FileReader(); rd.onloadend = () => setProfileForm(p => ({ ...p, avatar: rd.result })); rd.readAsDataURL(f) }, [])
  const saveProfile = useCallback(() => { if (!profileForm.name.trim() || !profileForm.username.trim()) { alert("Name & Username required!"); return } const np = { ...profileForm, username: profileForm.username.toLowerCase().replace(/[^a-z0-9_]/g,''), updatedAt: new Date().toISOString() }; setProfile(np); setEditingProfile(false); speakText(`Profile updated, ${np.name}!`) }, [profileForm, speakText])
  const openEditProfile = useCallback(() => { setProfileForm({ name: profile?.name || "", username: profile?.username || "", avatar: profile?.avatar || "", bio: profile?.bio || "" }); setEditingProfile(true); setSidebarOpen(false) }, [profile])
  const resetAllData = useCallback(() => { if (!confirm("Reset ALL data?")) return; if (userMode === 'loggedin') saveUserData(email, pin, { profile: null, conversation: [], commandHistory: [], events: [], reminders: [], faceRecognition: false, biometricAuth: false, voiceGender: 'female', viewMode: 'android', personality: 'polite', backgroundImage: null, customStyle: null, settings }); setProfile(null); setConversation([]); setCommandHistory([]); setEvents([]); setReminders([]); setFaceRecognition(false); setBiometricAuth(false); setVoiceGender('female'); setViewMode('android'); setBackgroundImage(null); setAiPersonality('polite'); setCustomStyle(null); setSidebarOpen(false) }, [userMode, email, pin, settings])

  const clearConversation = useCallback(() => setConversation([]), [])
  const clearCommands = useCallback(() => setCommandHistory([]), [])
  const exportChat = useCallback(() => {
    const data = { conversation, commandHistory, events, reminders, profile, exportedAt: new Date().toISOString() }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `cypher4x_export_${Date.now()}.json`; a.click(); URL.revokeObjectURL(url)
  }, [conversation, commandHistory, events, reminders, profile])

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
          <p style={styles.guestLimitText}>You've used all 5 free messages. Please login or sign up.</p>
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

  // ============ SETTINGS (many working toggles) ============
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
            <div style={styles.settingItem}><span>Secret Mode (DuckDuckGo)</span><label className="toggle-switch"><input type="checkbox" checked={settings.secretMode} onChange={(e) => setSettings({ ...settings, secretMode: e.target.checked })} /><span className="toggle-slider"></span></label></div>
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
            <div style={styles.settingItem}><span>Haptic Feedback (vibrate)</span><label className="toggle-switch"><input type="checkbox" checked={settings.haptic} onChange={(e) => setSettings({ ...settings, haptic: e.target.checked })} /><span className="toggle-slider"></span></label></div>
            <div style={styles.settingItem}><span>Sound Effects</span><label className="toggle-switch"><input type="checkbox" checked={settings.soundFx} onChange={(e) => setSettings({ ...settings, soundFx: e.target.checked })} /><span className="toggle-slider"></span></label></div>
            <div style={styles.settingItem}><span>Confirm Before Delete</span><label className="toggle-switch"><input type="checkbox" checked={settings.confirmDelete} onChange={(e) => setSettings({ ...settings, confirmDelete: e.target.checked })} /><span className="toggle-slider"></span></label></div>
          </div>

          <div style={styles.settingsSection}>
            <h3 style={styles.settingsSectionTitle}>AI Behavior</h3>
            <div style={styles.settingItem}><span>Code: Auto-open Overview</span><label className="toggle-switch"><input type="checkbox" checked={settings.codeAutoOverview} onChange={(e) => setSettings({ ...settings, codeAutoOverview: e.target.checked })} /><span className="toggle-slider"></span></label></div>
            <div style={styles.settingItem}><span>Floating Assistant Button</span><label className="toggle-switch"><input type="checkbox" checked={settings.overlayButton} onChange={(e) => setSettings({ ...settings, overlayButton: e.target.checked })} /><span className="toggle-slider"></span></label></div>
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

  // ============ MUSIC PANEL ============
  if (showMusicPanel) {
    return (
      <div style={styles.settingsFullscreen}>
        <div style={styles.settingsHeaderFull}>
          <h1 style={styles.settingsTitleFull}>🎵 Music Generator</h1>
          <button onClick={() => setShowMusicPanel(false)} style={styles.settingsCloseFull}><Icon name="close" size={28} color="#fff" /></button>
        </div>
        <div style={styles.settingsBodyFull}>
          <div style={styles.settingsSection}>
            <h3 style={styles.settingsSectionTitle}>Settings</h3>
            <div style={styles.settingItem}><span>Tempo (BPM): {musicBpm}</span><input type="range" min="60" max="200" step="5" value={musicBpm} onChange={(e) => setMusicBpm(parseInt(e.target.value))} style={styles.settingsRange} /></div>
            <div style={styles.settingItem}><span>Scale</span><select value={musicScale} onChange={(e) => setMusicScale(e.target.value)} style={styles.settingsSelect}><option value="major">Major</option><option value="minor">Minor</option><option value="pentatonic">Pentatonic</option></select></div>
            <div style={styles.settingItem}><span>Bars: {musicBars}</span><input type="range" min="2" max="16" step="1" value={musicBars} onChange={(e) => setMusicBars(parseInt(e.target.value))} style={styles.settingsRange} /></div>
          </div>
          <p style={styles.bgHint}>CYPHER4X will compose a random melody using Web Audio API. Each generation is unique.</p>
        </div>
        <button onClick={handleGenerateMusic} disabled={musicPlaying} style={styles.settingsDoneFull}>{musicPlaying ? 'Playing...' : 'Generate & Play'}</button>
      </div>
    )
  }

  // ============ VIDEO PANEL ============
  if (showVideoPanel) {
    return (
      <div style={styles.settingsFullscreen}>
        <div style={styles.settingsHeaderFull}>
          <h1 style={styles.settingsTitleFull}>🎬 Video Generator</h1>
          <button onClick={() => setShowVideoPanel(false)} style={styles.settingsCloseFull}><Icon name="close" size={28} color="#fff" /></button>
        </div>
        <div style={styles.settingsBodyFull}>
          <p style={styles.bgHint}>CYPHER4X generates a particle animation using Canvas and records it as WebM video for download.</p>
          <canvas ref={canvasRef} width={400} height={300} style={{ width: '100%', borderRadius: 12, background: '#000', marginTop: 12 }} />
          {videoRecording && <p style={{ color: '#ff6688', textAlign: 'center', marginTop: 8 }}>● Recording... {videoProgress}%</p>}
        </div>
        <div style={{ display: 'flex', gap: 8, padding: 16 }}>
          {!videoRecording ? (
            <button onClick={handleStartVideo} style={styles.settingsDoneFull}>Start & Record (5s)</button>
          ) : (
            <button onClick={handleStopVideo} style={styles.settingsDoneFull}>Stop & Download</button>
          )}
        </div>
      </div>
    )
  }

  // ============ JARVIS TOOLS ============
  if (showJarvis) {
    const tabs = [
      { id: 'password', label: 'Password' }, { id: 'base64', label: 'Base64 Enc' }, { id: 'unbase64', label: 'Base64 Dec' },
      { id: 'upper', label: 'UPPER' }, { id: 'lower', label: 'lower' }, { id: 'reverse', label: 'Reverse' },
      { id: 'count', label: 'Count' }, { id: 'urlencode', label: 'URL Enc' }, { id: 'urldecode', label: 'URL Dec' },
      { id: 'random', label: 'Random# (min,max)' }, { id: 'dice', label: 'Dice' }, { id: 'hash', label: 'Simple Hash' },
    ]
    return (
      <div style={styles.settingsFullscreen}>
        <div style={styles.settingsHeaderFull}>
          <h1 style={styles.settingsTitleFull}>⚡ Jarvis Tools</h1>
          <button onClick={() => setShowJarvis(false)} style={styles.settingsCloseFull}><Icon name="close" size={28} color="#fff" /></button>
        </div>
        <div style={styles.settingsBodyFull}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => { setToolTab(t.id); setToolOutput('') }} style={{ padding: '6px 12px', borderRadius: 20, border: toolTab === t.id ? '1px solid #ff003c' : '1px solid #333', background: toolTab === t.id ? 'rgba(255,0,60,0.15)' : '#1a1a1a', color: '#fff', fontSize: 12, cursor: 'pointer' }}>{t.label}</button>
            ))}
          </div>
          <div style={styles.settingsSection}>
            <input value={toolInput} onChange={(e) => setToolInput(e.target.value)} placeholder={toolTab === 'random' ? '1,100' : toolTab === 'dice' ? '3' : toolTab === 'password' ? '16' : 'Type input...'} style={styles.settingsSelect} />
            <button onClick={runJarvisTool} style={{ ...styles.uploadBtn, marginTop: 12 }}><Icon name="zap" size={16} color="#fff" /><span>Run</span></button>
          </div>
          {toolOutput && (
            <div style={styles.settingsSection}>
              <h3 style={styles.settingsSectionTitle}>Output</h3>
              <div style={{ background: '#000', border: '1px solid #333', borderRadius: 8, padding: 12, color: '#4f8', fontFamily: 'monospace', wordBreak: 'break-all' }}>{toolOutput}</div>
              <button onClick={() => { navigator.clipboard.writeText(toolOutput); alert('Copied!') }} style={{ ...styles.uploadBtn, marginTop: 12 }}><Icon name="copy" size={16} color="#fff" /><span>Copy</span></button>
            </div>
          )}
          <div style={styles.settingsSection}>
            <h3 style={styles.settingsSectionTitle}>Timer</h3>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input type="number" value={timerSeconds} onChange={(e) => setTimerSeconds(parseInt(e.target.value) || 0)} style={{ ...styles.settingsSelect, width: 100 }} />
              <span style={{ color: '#fff' }}>seconds</span>
              <button onClick={() => setTimerRunning(!timerRunning)} style={{ ...styles.uploadBtn, padding: '8px 16px' }}>{timerRunning ? 'Pause' : 'Start'}</button>
              <button onClick={() => { setTimerRunning(false); setTimerSeconds(0) }} style={{ ...styles.resetBtn, padding: '8px 16px' }}>Reset</button>
            </div>
            {timerRunning && <p style={{ color: '#4f8', textAlign: 'center', marginTop: 12, fontSize: 24, fontWeight: 'bold' }}>{timerSeconds}s</p>}
          </div>
        </div>
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
            <div key={msg.id} style={{ ...styles.chatOverviewMsg, alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', backgroundColor: msg.role === 'user' ? '#ff003c' : '#1a1a1a', ...(settings.compactMode ? { padding: '6px 10px' } : {}) }}>
              {renderMessageContent(msg)}
              {msg.file && (
                <div style={styles.filePreviewPC}>
                  {msg.file.type.startsWith('image/') && <img src={msg.file.data} alt="" style={{ maxWidth: '100%', maxHeight: '80px', borderRadius: '4px', marginTop: '4px' }} />}
                  {msg.file.type.startsWith('video/') && <video controls style={{ maxWidth: '100%', maxHeight: '80px', borderRadius: '4px', marginTop: '4px' }}><source src={msg.file.data} type={msg.file.type} /></video>}
                  {!msg.file.type.startsWith('image/') && !msg.file.type.startsWith('video/') && <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>📎 {msg.file.name}</div>}
                </div>
              )}
              {settings.showTimestamps && <span style={styles.chatOverviewMsgTime}>{formatTime(msg.time)}</span>}
              <div style={styles.msgActions}>
                {msg.role === 'user' && <button onClick={() => handleEditMessage(msg.id)} style={styles.msgActionBtn}><Icon name="edit" size={14} color="#888" /></button>}
                <button onClick={() => handleDeleteMessage(msg.id)} style={styles.msgActionBtn}><Icon name="trash" size={14} color="#888" /></button>
                <button onClick={() => handleShareMessage(msg)} style={styles.msgActionBtn}><Icon name="copy" size={14} color="#888" /></button>
              </div>
            </div>
          ))}
          {isProcessing && settings.typingIndicator && <div style={{ ...styles.chatOverviewMsg, alignSelf: 'flex-start', backgroundColor: '#1a1a1a' }}><span style={styles.chatOverviewMsgText}>● ● ●</span></div>}
        </div>
        <div style={styles.chatOverviewInputRowRaised}>
          <input type="text" value={chatOverviewInput} onChange={(e) => setChatOverviewInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendOverviewText()} placeholder={pendingCode ? "Answer the question..." : "Type a message..."} style={styles.chatOverviewInput} disabled={isProcessing} />
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
                <div style={styles.settingRow}><span style={styles.settingLabel}>Current: Android</span><button onClick={toggleView} style={styles.toggleBtn}>Switch to PC</button></div>
              </div>
              <div style={styles.sidebarSection}>
                <h3 style={styles.sectionTitle}><Icon name="sparkles" size={16} color="#ff003c" /> QUICK TOOLS</h3>
                <button onClick={() => { setSidebarOpen(false); setShowJarvis(true) }} style={styles.toolBtn}><Icon name="zap" size={16} color="#fff" /> Jarvis Tools</button>
                <button onClick={() => { setSidebarOpen(false); setShowMusicPanel(true) }} style={styles.toolBtn}><Icon name="music" size={16} color="#fff" /> Music Generator</button>
                <button onClick={() => { setSidebarOpen(false); setShowVideoPanel(true) }} style={styles.toolBtn}><Icon name="video" size={16} color="#fff" /> Video Generator</button>
                <button onClick={() => { setSidebarOpen(false); setShowSettings(true) }} style={styles.toolBtn}><Icon name="cog" size={16} color="#fff" /> Settings</button>
              </div>
              <div style={styles.sidebarSection}>
                <h3 style={styles.sectionTitle}><Icon name="chart" size={16} color="#ff003c" /> SYSTEM STATS</h3>
                <div style={styles.statsCard}>
                  <div style={styles.statRow}><span style={styles.statLabel}><Icon name="hourglass" size={14} color="#888" /> Uptime</span><span style={styles.statValue}>{formatUptime(stats.uptime)}</span></div>
                  <div style={styles.statRow}><span style={styles.statLabel}><Icon name="cpu" size={14} color="#888" /> CPU</span><span style={styles.statValue}>{stats.cpuUsage}%</span></div>
                  <div style={styles.statRow}><span style={styles.statLabel}><Icon name="cpu" size={14} color="#888" /> Temp</span><span style={styles.statValue}>{stats.cpuTemp}°C</span></div>
                  <div style={styles.statRow}><span style={styles.statLabel}><Icon name="memory" size={14} color="#888" /> RAM</span><span style={styles.statValue}>{stats.ramUsage.toFixed(1)} GB</span></div>
                  <div style={styles.statRow}><span style={styles.statLabel}><Icon name="save" size={14} color="#888" /> Storage</span><span style={styles.statValue}>{stats.storageUsed}/{stats.storageTotal} GB</span></div>
                  <div style={styles.statRow}><span style={styles.statLabel}><Icon name="network" size={14} color="#888" /> Network</span><span style={styles.statValue}>{stats.networkSpeed} Mbps</span></div>
                </div>
              </div>
              <div style={styles.sidebarSection}>
                <h3 style={styles.sectionTitle}><Icon name="settings" size={16} color="#ff003c" /> AI CONFIG</h3>
                <div style={styles.settingRow}><span style={styles.settingLabel}>Personality</span><span style={styles.settingValue}>{PERSONALITIES.find(p => p.id === aiPersonality)?.label}</span></div>
                <div style={styles.settingRow}><span style={styles.settingLabel}>Secret Mode</span><span style={styles.settingValue}>{settings.secretMode ? 'ON' : 'OFF'}</span></div>
                <div style={styles.settingRow}><span style={styles.settingLabel}>Safe Links</span><span style={styles.settingValue}>{settings.safeLinks ? 'ON' : 'OFF'}</span></div>
              </div>
              <div style={styles.sidebarSection}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <h3 style={styles.sectionTitle}><Icon name="chat" size={16} color="#ff003c" /> CONVERSATION</h3>
                  <button onClick={() => setShowChatOverview(true)} style={styles.overviewBtn}><Icon name="desktop" size={14} color="#fff" /> Overview</button>
                </div>
                <div style={styles.inputRow}>
                  <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendTextMessage()} placeholder="Type..." style={styles.textInputSmall} />
                  <button onClick={sendTextMessage} style={styles.sendBtnSmall} disabled={isProcessing}><Icon name="send" size={16} color="#fff" /></button>
                </div>
                <div style={styles.commandActionsPC}>
                  <button onClick={clearConversation} style={styles.dashBtnPC}><Icon name="trash" size={14} color="#fff" /> Clear</button>
                  <button onClick={exportChat} style={styles.dashBtnPC}><Icon name="save" size={14} color="#fff" /> Export</button>
                  <label style={styles.attachBtnPC}><Icon name="file" size={14} color="#fff" /> Attach<input type="file" accept="image/*,video/*,.pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx" onChange={handleFileShare} style={{ display: 'none' }} /></label>
                </div>
              </div>
              <div style={styles.sidebarSection}>
                <h3 style={styles.sectionTitle}><Icon name="clock" size={16} color="#ff003c" /> HISTORY</h3>
                <div style={styles.commandHistoryPC}>
                  {commandHistory.length === 0 && <p style={styles.dashEmptyPC}>Empty</p>}
                  {commandHistory.slice(-6).reverse().map((c, i) => (
                    <div key={i} style={styles.cmdItemPC}><span style={styles.cmdTimePC}>{formatTime(c.timestamp)}</span><span style={styles.cmdTextPC}>{c.command.slice(0, 40)}</span></div>
                  ))}
                </div>
                <button onClick={clearCommands} style={styles.dashBtnPC}><Icon name="trash" size={14} color="#fff" /> Clear</button>
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

  // PC VIEW
  return (
    <div style={{ ...styles.appPC, ...(settings.highContrast ? { filter: 'contrast(1.3)' } : {}) }}>
      <header style={styles.headerPC}>
        <div style={styles.headerLeft}>
          <h1 style={styles.titlePC}>CYPHER4X</h1>
          <span style={styles.versionBadgePC}>{VERSION}</span>
        </div>
        <div style={styles.headerRight}>
          <button onClick={toggleFullscreenCall} style={{ ...styles.callBtnPC }}>
            <Icon name="phone" size={18} color="#ff003c" /><span>CALL</span>
          </button>
          <button onClick={() => setShowJarvis(true)} style={styles.settingsBtnPC}><Icon name="zap" size={20} color="#fff" /></button>
          <button onClick={() => setShowMusicPanel(true)} style={styles.settingsBtnPC}><Icon name="music" size={20} color="#fff" /></button>
          <button onClick={() => setShowVideoPanel(true)} style={styles.settingsBtnPC}><Icon name="video" size={20} color="#fff" /></button>
          <button onClick={() => setShowSettings(true)} style={styles.settingsBtnPC}><Icon name="cog" size={20} color="#fff" /></button>
          <button onClick={startRecording} disabled={isRecording || isProcessing} style={{ ...styles.voiceBtnPC }}>
            <Icon name="mic" size={20} color="#ff003c" /><span>Speak</span>
          </button>
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
  chatOverviewInputRowRaised: { display: 'flex', gap: '8px', padding: '12px 16px', paddingBottom: 'max(30px, env(safe-area-inset-bottom, 50px))', backgroundColor: '#111', borderTop: '1px solid #333', flexShrink: 0, alignItems: 'center' },
  chatOverviewInput: { flex: 1, padding: '10px 14px', backgroundColor: '#000', border: '1px solid #333', color: '#fff', borderRadius: '20px', fontSize: '14px', outline: 'none' },
  chatOverviewMicBtn: { background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '8px', borderRadius: '50%', backgroundColor: 'rgba(255,0,60,0.2)' },
  chatOverviewAttachBtn: { background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '8px', borderRadius: '50%', backgroundColor: 'rgba(255,0,60,0.2)', display: 'flex', alignItems: 'center' },
  chatOverviewSendBtn: { background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '8px', borderRadius: '50%', backgroundColor: '#ff003c', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  overviewBtn: { padding: '4px 12px', backgroundColor: '#1a3a3a', border: '1px solid #2a5a5a', borderRadius: '4px', color: '#fff', cursor: 'pointer', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' },
  voiceControls: { display: 'flex', gap: '6px', alignItems: 'center' },
  voiceTranscriptPreview: { position: 'absolute', bottom: '80px', left: '16px', right: '16px', backgroundColor: 'rgba(0,0,0,0.8)', padding: '8px 16px', borderRadius: '12px', color: '#ff6688', fontSize: '14px', fontStyle: 'italic', border: '1px solid rgba(255,0,60,0.3)', textAlign: 'center' },
  msgActions: { display: 'flex', gap: '4px', justifyContent: 'flex-end', marginTop: '4px', opacity: 0.6 },
  msgActionBtn: { background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px', borderRadius: '4px' },

  // Code block styles
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
  cancelInterimBtn: { backgroundColor: 'transparent', border: '1px solid #ff003c', borderRadius: '20px', padding: '4px 12px', display: 'flex', alignItems: 'center', gap: '4px', color: '#ff003c', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' },
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
  conversationLogPC: { maxHeight: '120px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '6px' },
  convItemPC: { display: 'flex', flexDirection: 'column', padding: '4px 8px', backgroundColor: '#111', borderRadius: '4px', borderLeft: '2px solid #ff003c' },
  convTextPC: { fontSize: '12px', color: '#ddd', wordBreak: 'break-word', marginTop: '2px' },
  convTimePC: { fontSize: '9px', color: '#666', alignSelf: 'flex-end', marginTop: '2px' },
  filePreviewPC: { marginTop: '4px' },
  commandActionsPC: { display: 'flex', gap: '6px', marginTop: '4px', flexWrap: 'wrap' },
  attachBtnPC: { padding: '3px 10px', backgroundColor: '#1a3a3a', color: '#fff', border: '1px solid #2a5a5a', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' },
  commandHistoryPC: { maxHeight: '80px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '6px' },
  cmdItemPC: { display: 'flex', gap: '6px', fontSize: '11px', color: '#aaa', padding: '2px 4px', borderBottom: '1px solid #111' },
  cmdTimePC: { color: '#666', minWidth: '50px', fontSize: '10px' },
  cmdTextPC: { color: '#ddd', wordBreak: 'break-word' },
  dashBtnPC: { padding: '3px 10px', backgroundColor: '#222', color: '#fff', border: '1px solid #333', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' },
  dashEmptyPC: { color: '#666', fontSize: '12px', textAlign: 'center', padding: '6px 0' },
  inputRow: { display: 'flex', gap: '6px', marginTop: '4px', marginBottom: '6px' },
  textInputSmall: { flex: 1, padding: '6px 10px', backgroundColor: '#000', border: '1px solid #333', color: '#fff', borderRadius: '4px', fontSize: '13px', outline: 'none' },
  sendBtnSmall: { padding: '6px 12px', backgroundColor: '#ff003c', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  sidebarBtnPC: { padding: '5px 10px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '12px' },
  logoutBtnPC: { padding: '5px 10px', backgroundColor: '#880000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '12px' },
    }
