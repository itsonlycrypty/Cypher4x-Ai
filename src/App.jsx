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
    microphone: 'M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zm-7 9v1a7 7 0 0 0 14 0v-1M12 22v-3',
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
    externalLink: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3',
    refresh: 'M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15',
    terminal: 'M4 17l6-6-6-6M12 19h8',
    code: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
    shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    search: 'M21 21l-4.35-4.35M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0z',
    sparkles: 'M12 3l1.9 5.8L20 10l-6.1 1.2L12 17l-1.9-5.8L4 10l6.1-1.2L12 3z',
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
const VERSION = "Version 21.0.0"
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
const getLastWelcomeDate = () => { try { return localStorage.getItem('cypher4x_welcome_date') } catch { return null } }
const setLastWelcomeDate = (date) => { try { localStorage.setItem('cypher4x_welcome_date', date) } catch {} }

// ============================================================
// WEB SEARCH — picks the safest, most relevant site from the internet
// ============================================================
const TRUSTED_DOMAINS = [
  'wikipedia.org', 'britannica.com', 'gov', 'edu', 'who.int', 'un.org',
  'nature.com', 'science.org', 'nasa.gov', 'nih.gov', 'cdc.gov',
  'bbc.com', 'reuters.com', 'apnews.com', 'nytimes.com', 'theguardian.com',
  'github.com', 'stackoverflow.com', 'mozilla.org', 'w3.org', 'ietf.org',
  'developer.mozilla.org', 'python.org', 'reactjs.org', 'nodejs.org',
]

const isTrustedDomain = (url) => {
  if (!url) return false
  try {
    const host = new URL(url).hostname.toLowerCase()
    return TRUSTED_DOMAINS.some(d => host.includes(d))
  } catch { return false }
}

// General web search — returns best answer + safest related link
const searchWeb = async (query) => {
  if (!TAVILY_API_KEY) return { error: "Tavily API key not configured." }
  try {
    const res = await fetch(TAVILY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${TAVILY_API_KEY}` },
      body: JSON.stringify({
        query: query,
        search_depth: "advanced",
        include_answer: true,
        include_images: false,
        include_raw_content: false,
        max_results: 6,
      })
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    const results = data.results || []
    // Pick safest result
    const safest = results.find(r => isTrustedDomain(r.url)) || results[0]
    return {
      answer: data.answer || results.map(r => r.content).join("\n\n") || "No results found.",
      safestUrl: safest?.url || null,
      safestTitle: safest?.title || null,
      allResults: results.slice(0, 4).map(r => ({ title: r.title, url: r.url })),
    }
  } catch (error) {
    return { error: error.message }
  }
}

// Privacy-first anonymous search (no tracking)
const openAnonymousSearch = (query) => {
  const url = `https://duckduckgo.com/?q=${encodeURIComponent(query)}&kae=d&kp=-2`
  window.open(url, '_blank', 'noopener,noreferrer')
}

// Secret/Anonymous mode — opens DuckDuckGo in a new tab
const openSecretSearch = (query) => {
  const url = `https://duckduckgo.com/?q=${encodeURIComponent(query)}&kae=d`
  const win = window.open(url, '_blank', 'noopener,noreferrer,width=1000,height=700')
  if (win) win.focus()
}

// ============================================================
// APP DEEP-LINK SYSTEM — opens native apps on user's device
// ============================================================
const APP_MAP = {
  whatsapp: { scheme: 'whatsapp://', web: 'https://web.whatsapp.com', name: 'WhatsApp' },
  instagram: { scheme: 'instagram://', web: 'https://instagram.com', name: 'Instagram' },
  facebook: { scheme: 'fb://', web: 'https://facebook.com', name: 'Facebook' },
  twitter: { scheme: 'twitter://', web: 'https://twitter.com', name: 'Twitter' },
  telegram: { scheme: 'tg://', web: 'https://web.telegram.org', name: 'Telegram' },
  youtube: { scheme: 'vnd.youtube://', web: 'https://youtube.com', name: 'YouTube' },
  spotify: { scheme: 'spotify://', web: 'https://open.spotify.com', name: 'Spotify' },
  gmail: { scheme: 'googlegmail://', web: 'https://mail.google.com', name: 'Gmail' },
  maps: { scheme: 'geo:', web: 'https://maps.google.com', name: 'Maps' },
  camera: { scheme: 'camera://', web: null, name: 'Camera' },
  phone: { scheme: 'tel:', web: null, name: 'Phone' },
  sms: { scheme: 'sms:', web: null, name: 'Messages' },
  music: { scheme: 'music://', web: null, name: 'Music' },
  calendar: { scheme: 'calshow://', web: 'https://calendar.google.com', name: 'Calendar' },
  settings: { scheme: 'app-settings:', web: null, name: 'Settings' },
}

const openApp = (appKey, extra = '') => {
  const app = APP_MAP[appKey]
  if (!app) return { ok: false, message: `I don't have an app registered for "${appKey}".` }
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
  if (isMobile && app.scheme) {
    // Try deep link first — browser will fall back if not installed
    const deepLink = app.scheme + extra
    try {
      window.location.href = deepLink
      return { ok: true, message: `Opening ${app.name}...` }
    } catch (e) {}
  }
  if (app.web) {
    window.open(app.web + extra, '_blank', 'noopener,noreferrer')
    return { ok: true, message: `Opening ${app.name} in browser...` }
  }
  return { ok: false, message: `${app.name} can only be opened from a mobile device with the app installed.` }
}

// WhatsApp-specific helper (group / chat / send)
const openWhatsAppGroup = (groupName) => {
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
  if (isMobile) {
    window.location.href = `whatsapp://send?text=`
    setTimeout(() => { window.location.href = `https://wa.me/?text=${encodeURIComponent('Group: ' + groupName)}` }, 800)
    return `Opening WhatsApp. Search for the group "${groupName}" — I can't deep-link to a specific group chat directly (privacy).`
  }
  window.open('https://web.whatsapp.com', '_blank', 'noopener,noreferrer')
  return `WhatsApp Web opened. Please search for "${groupName}" in your chats.`
}

// ============================================================
// CODE GENERATION DETECTION
// ============================================================
const isCodeRequest = (query) => {
  const q = query.toLowerCase()
  const codeKeywords = ['generate code', 'write code', 'create code', 'make code', 'build code',
    'code for', 'code to', 'function in', 'javascript', 'python', 'react', 'html', 'css', 'java', 'c++',
    'sql', 'node', 'bash', 'shell', 'code snippet', 'program', 'script', 'algorithm']
  return codeKeywords.some(k => q.includes(k))
}

// ============================================================
// TERMINAL COMMAND PARSER (safe, simulated)
// ============================================================
const runTerminalCommand = (cmd) => {
  const parts = cmd.trim().split(/\s+/)
  const base = parts[0]?.toLowerCase()
  const args = parts.slice(1)

  switch (base) {
    case 'help':
      return `CYPHER4X Terminal — Available commands:
  help              Show this help
  clear             Clear terminal
  date              Show current date & time
  whoami            Show current user
  echo <text>       Print text
  calc <expr>       Calculate expression (e.g. calc 2+2*3)
  ls                List files (simulated)
  pwd               Print working directory
  open <site>       Open a website
  search <term>     Web search
  fortune           Random fortune
  neofetch          System info
  ping <host>       Simulated ping
  weather           Open weather in browser
  matrix            Fun animation hint`
    case 'clear': return '__CLEAR__'
    case 'date': return new Date().toString()
    case 'whoami': return profile?.username || 'guest@cypher4x'
    case 'echo': return args.join(' ')
    case 'pwd': return '/home/cypher4x'
    case 'ls': return 'Documents  Downloads  Pictures  Projects  README.md  cypher4x.config'
    case 'calc':
      try { return String(Function(`"use strict"; return (${args.join(' ')})`)()) }
      catch { return 'Error: invalid expression' }
    case 'open':
      if (args[0]) { window.open(`https://${args[0]}`, '_blank', 'noopener,noreferrer'); return `Opening https://${args[0]}...` }
      return 'Usage: open <site>'
    case 'search':
      if (args.length) { openAnonymousSearch(args.join(' ')); return `Searching: ${args.join(' ')}` }
      return 'Usage: search <term>'
    case 'fortune': {
      const fortunes = ['You will write excellent code today.', 'A bug is just a feature in disguise.', 'The best way to predict the future is to invent it.', 'Simplicity is the ultimate sophistication.', 'Talk is cheap. Show me the code.']
      return fortunes[Math.floor(Math.random() * fortunes.length)]
    }
    case 'neofetch':
      return `    ██████╗██╗   ██╗██████╗ ██╗  ██╗███████╗██████╗ ██╗  ██╗
   ██╔════╝╚██╗ ██╔╝██╔══██╗██║  ██║██╔════╝██╔══██╗╚██╗██╔╝
   ██║      ╚████╔╝ ██████╔╝███████║█████╗  ██████╔╝ ╚███╔╝ 
   ██║       ╚██╔╝  ██╔═══╝ ██╔══██║██╔══╝  ██╔══██╗ ██╔██╗ 
   ╚██████╗   ██║   ██║     ██║  ██║███████╗██║  ██║██╔╝ ██╗
    ╚═════╝   ╚═╝   ╚═╝     ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝
   OS: CYPHER4X Web v${VERSION}
   Shell: csh 1.0
   Terminal: Web-TTY
   Uptime: ${formatUptimeStr(stats.uptime)}`
    case 'ping': {
      if (!args[0]) return 'Usage: ping <host>'
      return `PING ${args[0]} (simulated): 4 packets transmitted, 4 received, 0% loss`
    }
    case 'weather':
      window.open('https://www.google.com/search?q=weather', '_blank', 'noopener,noreferrer')
      return 'Opening weather...'
    case 'matrix':
      return 'Wake up, Neo... 🟢 (fun mode — try installing cmatrix on a real Linux shell)'
    default:
      return `csh: command not found: ${base}. Type 'help' for available commands.`
  }
}

const formatUptimeStr = (seconds) => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return `${h}h ${m}m ${s}s`
}

// ============================================================
// AI ABILITIES (display list)
// ============================================================
const AI_ABILITIES = [
  { icon: '🌐', title: 'Web Search', desc: 'Search the internet for any information' },
  { icon: '🔒', title: 'Anonymous Search', desc: 'Privacy-first search via DuckDuckGo' },
  { icon: '📱', title: 'Open Apps', desc: 'Launch WhatsApp, Instagram, YouTube & more' },
  { icon: '💬', title: 'WhatsApp Groups', desc: 'Open WhatsApp and reach your groups' },
  { icon: '🧮', title: 'Calculations', desc: 'Compute math expressions' },
  { icon: '⏰', title: 'Time & Date', desc: 'Get current time and date' },
  { icon: '💻', title: 'Code Generation', desc: 'Generate JavaScript, Python, and more' },
  { icon: '⌨️', title: 'Terminal', desc: 'Run simulated shell commands' },
  { icon: '🎵', title: 'Play Media', desc: 'Open YouTube or Spotify with your query' },
  { icon: '🗣️', title: 'Voice Control', desc: 'Speak to CYPHER4X hands-free' },
  { icon: '🖼️', title: 'File Upload', desc: 'Share images, videos, and docs' },
  { icon: '🎨', title: 'Custom Background', desc: 'Personalise your CYPHER4X screen' },
  { icon: '🧠', title: 'Personality', desc: 'Polite, Concise, Clear, Comprehensive, Custom' },
  { icon: '🛡️', title: 'Safe Links', desc: 'Prefers trusted domains (Wikipedia, gov, edu...)' },
]

// ============================================================
// RED BALL
// ============================================================
const RedBall = ({ isSpeaking = false }) => (
  <div style={styles.ballContainer}>
    <div style={styles.ring1} />
    <div style={styles.ring2} />
    <div style={styles.ring3} />
    <div style={styles.ball3DContainer}>
      <div style={{ ...styles.ball3D, ...(isSpeaking ? styles.ball3DSpeaking : {}) }}>
        <div style={styles.ballHighlight} />
        <div style={styles.ballInnerGlow} />
      </div>
    </div>
  </div>
)

const PERSONALITIES = [
  { id: 'polite', label: 'Polite', desc: 'Always respectful and courteous', icon: '🤝' },
  { id: 'concise', label: 'Concise', desc: 'Short, direct, to the point', icon: '⚡' },
  { id: 'clear', label: 'Clear', desc: 'Simple, easy to understand', icon: '💡' },
  { id: 'comprehensive', label: 'Comprehensive', desc: 'Detailed, thorough answers', icon: '📚' },
  { id: 'custom', label: 'Custom', desc: 'AI learns your communication style', icon: '🎨' },
]

export default function App() {
  const [userMode, setUserMode] = useState('guest')
  const [email, setEmail] = useState('')
  const [pin, setPin] = useState('')
  const [showLogin, setShowLogin] = useState(true)
  const [authError, setAuthError] = useState('')
  const [guestMessageCount, setGuestMessageCount] = useState(0)
  const [showGuestLimit, setShowGuestLimit] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [profile, setProfile] = useState(null)
  const [profileForm, setProfileForm] = useState({ name: "", username: "", avatar: "", bio: "" })
  const [editingProfile, setEditingProfile] = useState(false)
  const [isBooting, setIsBooting] = useState(true)
  const [bootTypedText, setBootTypedText] = useState('')
  const [bootTypedCredit, setBootTypedCredit] = useState('')
  const [viewMode, setViewMode] = useState('android')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showWelcomeOverlay, setShowWelcomeOverlay] = useState(false)
  const [welcomeStep, setWelcomeStep] = useState('greeting')
  const [welcomeMessage, setWelcomeMessage] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [showPersonalityModal, setShowPersonalityModal] = useState(false)
  const [aiPersonality, setAiPersonality] = useState('polite')
  const [customPersonality, setCustomPersonality] = useState('')
  const [backgroundImage, setBackgroundImage] = useState(null)
  const [settings, setSettings] = useState({
    welcomeEnabled: true,
    autoStartVoice: true,
    language: 'en',
    voiceSpeed: 1,
    personality: 'polite',
    secretMode: false,
    overlayButton: false,
    safeLinks: true,
  })
  const [showChatOverview, setShowChatOverview] = useState(false)
  const [chatOverviewInput, setChatOverviewInput] = useState('')
  const [chatOverviewListening, setChatOverviewListening] = useState(false)
  const [chatOverviewVoiceEnabled, setChatOverviewVoiceEnabled] = useState(true)
  const [isRecordingVoice, setIsRecordingVoice] = useState(false)
  const [voicePaused, setVoicePaused] = useState(false)
  const [voiceTranscript, setVoiceTranscript] = useState('')
  const chatOverviewRecognitionRef = useRef(null)
  const [showRotateOverlay, setShowRotateOverlay] = useState(false)
  const [conversation, setConversation] = useState([])
  const [inputText, setInputText] = useState("")
  const [commandHistory, setCommandHistory] = useState([])
  const [isCallActive, setIsCallActive] = useState(false)
  const [isFullscreenCall, setIsFullscreenCall] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isAISpeaking, setIsAISpeaking] = useState(false)
  const [interimTranscript, setInterimTranscript] = useState('')
  const [recordingMode, setRecordingMode] = useState(false)
  const [faceRecognition, setFaceRecognition] = useState(false)
  const [biometricAuth, setBiometricAuth] = useState(false)
  const [voiceGender, setVoiceGender] = useState('female')
  const [stats, setStats] = useState({
    uptime: 0, cpuUsage: 0, cpuTemp: 0, ramUsage: 0,
    storageUsed: 0, storageTotal: 475, networkSpeed: 0, messages: 0
  })
  const [events, setEvents] = useState([])
  const [reminders, setReminders] = useState([])

  // New feature states
  const [showTerminal, setShowTerminal] = useState(false)
  const [terminalLines, setTerminalLines] = useState([
    { type: 'info', text: 'CYPHER4X Terminal v1.0 — type "help" for commands' },
  ])
  const [terminalInput, setTerminalInput] = useState('')
  const [showAbilities, setShowAbilities] = useState(false)
  const [overlayActive, setOverlayActive] = useState(false)
  const [overlayListening, setOverlayListening] = useState(false)
  const overlayRecognitionRef = useRef(null)

  const synthRef = useRef(typeof window !== "undefined" ? window.speechSynthesis : null)
  const recognitionRef = useRef(null)
  const msgCounter = useRef(0)
  const fileInputRef = useRef(null)
  const bgInputRef = useRef(null)
  const terminalEndRef = useRef(null)

  // BOOT TYPEWRITER
  useEffect(() => {
    if (!isBooting) return
    const title = "CYPHER4X"
    const credit = "Created by Hackers Hub led by Crypty"
    let titleIndex = 0
    let creditIndex = 0
    let phase = 'title'

    const interval = setInterval(() => {
      if (phase === 'title') {
        if (titleIndex <= title.length) { setBootTypedText(title.slice(0, titleIndex)); titleIndex++ }
        else { phase = 'pause'; setTimeout(() => { phase = 'credit' }, 500) }
      } else if (phase === 'credit') {
        if (creditIndex <= credit.length) { setBootTypedCredit(credit.slice(0, creditIndex)); creditIndex++ }
        else {
          clearInterval(interval)
          setTimeout(() => {
            setIsBooting(false)
            const auth = getAuth()
            if (auth && userExists(auth.email, auth.pin)) {
              setEmail(auth.email); setPin(auth.pin); loginUser(auth.email, auth.pin)
            } else {
              setUserMode('guest'); setGuestMessageCount(0)
              const savedPersonality = localStorage.getItem('cypher4x_personality')
              if (!savedPersonality) setShowPersonalityModal(true)
              else setAiPersonality(savedPersonality)
              const today = new Date().toDateString()
              const lastWelcome = getLastWelcomeDate()
              if (lastWelcome !== today && settings.welcomeEnabled && savedPersonality) {
                setLastWelcomeDate(today)
                setShowWelcomeOverlay(true); setWelcomeStep('greeting')
                const msg = "Hello User! I'm CYPHER4X, your friendly AI assistant. How are you feeling today?"
                setWelcomeMessage(msg); speakText(msg)
              }
            }
          }, 800)
        }
      }
    }, 100)
    return () => clearInterval(interval)
  }, [isBooting, settings.welcomeEnabled])

  // Terminal autoscroll
  useEffect(() => { terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [terminalLines])

  const handleAuthSubmit = () => {
    if (!email || !pin || pin.length !== 4 || !/^\d{4}$/.test(pin)) { setAuthError("Please enter a valid email and 4-digit PIN."); return }
    if (showLogin) {
      if (userExists(email, pin)) { loginUser(email, pin); setShowAuthModal(false) }
      else setAuthError("No account found. Please sign up.")
    } else {
      if (userExists(email, pin)) { setAuthError("Account already exists. Please log in."); return }
      addUser(email, pin)
      const emptyData = {
        profile: null, conversation: [], commandHistory: [], events: [], reminders: [],
        faceRecognition: false, biometricAuth: false, voiceGender: 'female', viewMode: 'android',
        personality: 'polite', backgroundImage: null,
        settings: { welcomeEnabled: true, autoStartVoice: true, language: 'en', voiceSpeed: 1, personality: 'polite', secretMode: false, overlayButton: false, safeLinks: true }
      }
      saveUserData(email, pin, emptyData); loginUser(email, pin); setShowAuthModal(false)
    }
  }

  const loginUser = (email, pin) => {
    saveAuth(email, pin); setUserMode('loggedin'); loadUserDataByEmail(email, pin)
    setAuthError(''); setGuestMessageCount(0)
  }

  const loadUserDataByEmail = (email, pin) => {
    const data = loadUserData(email, pin)
    if (data) {
      setProfile(data.profile || null); setConversation(data.conversation || [])
      setCommandHistory(data.commandHistory || []); setEvents(data.events || [])
      setReminders(data.reminders || []); setFaceRecognition(data.faceRecognition || false)
      setBiometricAuth(data.biometricAuth || false); setVoiceGender(data.voiceGender || 'female')
      setViewMode(data.viewMode || 'android'); setAiPersonality(data.personality || 'polite')
      setBackgroundImage(data.backgroundImage || null)
      if (data.settings) setSettings(data.settings)
      msgCounter.current = (data.conversation || []).length + 1
      const today = new Date().toDateString()
      const lastWelcome = getLastWelcomeDate()
      if (lastWelcome !== today && settings.welcomeEnabled) {
        setLastWelcomeDate(today); setShowWelcomeOverlay(true); setWelcomeStep('greeting')
        const name = data.profile?.name || 'User'
        const msg = `Hello ${name}! I'm CYPHER4X, your friendly AI assistant. How are you feeling today?`
        setWelcomeMessage(msg); speakText(msg)
      } else {
        const name = data.profile?.name || 'User'
        const greet = `Welcome back, ${name}! I'm CYPHER4X. How can I help you today?`
        const assistantMsg = { id: ++msgCounter.current, role: 'assistant', content: greet, time: Date.now() }
        setConversation(prev => [...prev, assistantMsg]); speakText(greet)
      }
    }
  }

  const saveCurrentUserData = () => {
    if (userMode !== 'loggedin') return
    const data = { profile, conversation, commandHistory, events, reminders, faceRecognition, biometricAuth, voiceGender, viewMode, personality: aiPersonality, backgroundImage, settings }
    saveUserData(email, pin, data)
  }

  useEffect(() => { if (userMode === 'loggedin') saveCurrentUserData() }, [profile, conversation, commandHistory, events, reminders, faceRecognition, biometricAuth, voiceGender, viewMode, aiPersonality, backgroundImage, settings])

  const handleLogout = () => {
    if (!confirm("Logout from this account?")) return
    clearAuth(); setUserMode('guest'); setProfile(null); setConversation([])
    setCommandHistory([]); setEvents([]); setReminders([]); setFaceRecognition(false)
    setBiometricAuth(false); setVoiceGender('female'); setViewMode('android')
    setSidebarOpen(false); setGuestMessageCount(0); setShowWelcomeOverlay(false)
    setShowAuthModal(false); msgCounter.current = 0
  }

  const incrementGuestMessage = () => {
    if (userMode !== 'guest') return
    const newCount = guestMessageCount + 1
    setGuestMessageCount(newCount)
    if (newCount >= 5) setShowGuestLimit(true)
  }

  const setupSpeechRecognition = useCallback((isOneOff = false, onFinal = null) => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Your browser doesn't support speech recognition. Please use Chrome or Edge.")
      return null
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.continuous = !isOneOff
    recognition.interimResults = true
    recognition.lang = 'en-US'
    recognition.maxAlternatives = 1
    recognition.onstart = () => { setIsListening(true); setInterimTranscript('') }
    recognition.onend = () => {
      setIsListening(false); setInterimTranscript('')
      if (!isOneOff && isFullscreenCall) { try { recognition.start() } catch (e) {} }
    }
    recognition.onerror = (event) => {
      console.warn('Speech recognition error', event.error)
      if (event.error === 'not-allowed') {
        alert('Please allow microphone access in your browser settings.')
        setIsFullscreenCall(false); setIsCallActive(false); setRecordingMode(false); setIsListening(false); return
      }
      if (!isOneOff && isFullscreenCall) setTimeout(() => { try { recognition.start() } catch (e) {} }, 500)
    }
    recognition.onresult = async (event) => {
      let final = '', interim = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        if (result.isFinal) final += result[0].transcript
        else interim += result[0].transcript
      }
      if (final) { setInterimTranscript(''); setRecordingMode(false); if (onFinal) onFinal(final); else await processUserQuery(final) }
      else if (interim) setInterimTranscript(interim)
    }
    return recognition
  }, [isFullscreenCall])

  const speakText = useCallback((text, onEnd = null) => {
    if (!text || !synthRef.current) return
    try {
      synthRef.current.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = settings.voiceSpeed || 1
      utterance.pitch = voiceGender === 'female' ? 1.3 : 1.0
      utterance.volume = 1
      utterance.onstart = () => setIsAISpeaking(true)
      utterance.onend = () => { setIsAISpeaking(false); if (onEnd) onEnd() }
      utterance.onerror = () => { setIsAISpeaking(false); if (onEnd) onEnd() }
      synthRef.current.speak(utterance)
    } catch (e) { setIsAISpeaking(false); if (onEnd) onEnd() }
  }, [voiceGender, settings.voiceSpeed])

  const getPersonalityPrefix = () => {
    switch (aiPersonality) {
      case 'concise': return '[Short] '
      case 'comprehensive': return '[Detailed] '
      default: return ''
    }
  }

  // ============================================================
  // COMMAND EXECUTION (general web + apps + secret)
  // ============================================================
  const executeCommand = (query) => {
    const lower = query.toLowerCase().trim()

    // --- App open commands ---
    const appMatch = lower.match(/^open (?:my )?(whatsapp|instagram|facebook|twitter|telegram|youtube|spotify|gmail|maps|camera|phone|sms|calendar|settings)(?:\s+(?:and\s+open\s+my\s+group\s+named\s+)?(.+))?$/)
    if (appMatch) {
      const appKey = appMatch[1]
      const extra = appMatch[2]
      if (appKey === 'whatsapp' && extra) return { response: openWhatsAppGroup(extra) }
      const r = openApp(appKey)
      return { response: r.message }
    }

    // --- WhatsApp group direct ---
    if (lower.includes('whatsapp') && lower.includes('group')) {
      const g = query.match(/group\s+named\s+([^\n,.]+)/i) || query.match(/group\s+([^\n,.]+)/i)
      const groupName = g ? g[1].trim() : 'your group'
      return { response: openWhatsAppGroup(groupName) }
    }

    // --- Secret / anonymous mode ---
    if ((lower.startsWith('secret ') || lower.startsWith('anonymous ')) && settings.secretMode) {
      const term = query.replace(/^(secret|anonymous)\s+/i, '')
      openSecretSearch(term)
      return { response: `Anonymous search opened for "${term}". Your query stays private. 🔒` }
    }

    // --- General web search with safe link pick ---
    if (lower.startsWith('web ') || lower.startsWith('search web ')) {
      const term = query.replace(/^(web|search web)\s+/i, '')
      openAnonymousSearch(term)
      return { response: `Searching the web (privacy mode) for "${term}"...` }
    }

    if (lower.startsWith('open website ')) {
      const domain = query.replace(/^open website\s+/i, '').trim()
      const url = domain.includes('.') ? `https://${domain}` : `https://www.${domain}.com`
      window.open(url, '_blank', 'noopener,noreferrer')
      return { response: `Opening ${domain}...` }
    }

    if (lower.startsWith('open ')) {
      const target = lower.replace('open ', '').trim()
      const siteMap = {
        youtube: 'https://youtube.com', google: 'https://google.com',
        facebook: 'https://facebook.com', twitter: 'https://twitter.com', x: 'https://x.com',
        instagram: 'https://instagram.com', gmail: 'https://mail.google.com',
        maps: 'https://maps.google.com', news: 'https://news.google.com',
        github: 'https://github.com', reddit: 'https://reddit.com',
        linkedin: 'https://linkedin.com', netflix: 'https://netflix.com',
        spotify: 'https://open.spotify.com', wikipedia: 'https://wikipedia.org',
        duckduckgo: 'https://duckduckgo.com', brave: 'https://search.brave.com',
      }
      let url
      if (siteMap[target]) url = siteMap[target]
      else if (target.includes('.') && !target.includes(' ')) url = `https://${target}`
      else url = settings.secretMode ? `https://duckduckgo.com/?q=${encodeURIComponent(target)}` : `https://www.google.com/search?q=${encodeURIComponent(target)}`
      window.open(url, '_blank', 'noopener,noreferrer')
      return { response: `Opening ${target}...` }
    }

    if (lower.startsWith('play ')) {
      const song = lower.replace('play ', '').trim()
      const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(song)}`
      window.open(url, '_blank', 'noopener,noreferrer')
      return { response: `Playing "${song}" on YouTube! 🎵` }
    }

    if (lower === 'time' || lower.includes('what time')) return { response: `The current time is ${new Date().toLocaleTimeString()}. ⏰` }
    if (lower === 'date' || lower.includes('what date') || lower === 'today') return { response: `Today is ${new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}. 📅` }

    if (lower.startsWith('calc ') || lower.includes('calculate')) {
      try {
        const expr = lower.replace('calculate', '').replace('calc', '').trim()
        const result = Function(`"use strict"; return (${expr})`)()
        if (typeof result === 'number') return { response: `The answer is ${result}. 🧮` }
      } catch (e) {}
    }

    return null
  }

  // ============================================================
  // MAIN QUERY PROCESSOR
  // ============================================================
  const processUserQuery = useCallback(async (query) => {
    if (!query || isProcessing) return
    if (userMode === 'guest') incrementGuestMessage()
    setIsProcessing(true); setInterimTranscript(''); setRecordingMode(false)

    const userMsg = { id: ++msgCounter.current, role: 'user', content: query, time: Date.now() }
    setConversation(prev => [...prev, userMsg])
    setCommandHistory(prev => [...prev, { command: query, timestamp: Date.now() }])

    // If code request → auto switch to overview chat
    if (isCodeRequest(query)) {
      setShowChatOverview(true)
    }

    // Command execution
    const cmdResult = executeCommand(query)
    if (cmdResult) {
      const assistantMsg = { id: ++msgCounter.current, role: 'assistant', content: cmdResult.response, time: Date.now() }
      setConversation(prev => [...prev, assistantMsg])
      speakText(cmdResult.response)
      setIsProcessing(false); return
    }

    const lower = query.toLowerCase()
    const casualPhrases = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', "what's up", 'sup', 'yo', 'howdy', 'hey there']
    if (casualPhrases.some(p => lower.includes(p))) {
      const casualReplies = [
        "Hey there! How can I brighten your day today?",
        "Hi! So glad to hear your voice. What can I do for you?",
        "Hello! It's always a pleasure. Ready to assist!",
        "Good to see you! What's on your mind?",
        "Hey! Your favorite AI is here. How can I help?",
        "Hi there! You sound great today. What's up?"
      ]
      const reply = casualReplies[Math.floor(Math.random() * casualReplies.length)]
      const assistantMsg = { id: ++msgCounter.current, role: 'assistant', content: reply, time: Date.now() }
      setConversation(prev => [...prev, assistantMsg]); speakText(reply)
      setIsProcessing(false); return
    }

    if (lower.includes('how are you') || lower.includes('how do you feel') || lower.includes('feeling')) {
      const emotionalReplies = [
        "I'm feeling fantastic, thank you for asking! How about you?",
        "I'm doing great! Always happy to chat with you.",
        "I'm in top shape! Ready to tackle anything you throw at me.",
        "Feeling wonderful! Thanks for caring."
      ]
      const reply = emotionalReplies[Math.floor(Math.random() * emotionalReplies.length)]
      const assistantMsg = { id: ++msgCounter.current, role: 'assistant', content: reply, time: Date.now() }
      setConversation(prev => [...prev, assistantMsg]); speakText(reply)
      setIsProcessing(false); return
    }

    // General web search — picks safest result
    const result = await searchWeb(query)
    let reply = ''
    if (result.error) {
      reply = `Search error: ${result.error}`
    } else {
      reply = result.answer || "I couldn't find an answer to that."
      if (result.safestUrl && settings.safeLinks) {
        reply += `\n\n🔗 Recommended source: ${result.safestUrl}`
      }
      reply = getPersonalityPrefix() + reply
    }
    const assistantMsg = { id: ++msgCounter.current, role: 'assistant', content: reply, time: Date.now() }
    setConversation(prev => [...prev, assistantMsg])
    speakText(reply.replace(/🔗.*$/, ''))
    setIsProcessing(false)
  }, [isProcessing, speakText, userMode, aiPersonality, settings.safeLinks, settings.secretMode])

  // ============================================================
  // OVERVIEW CHAT VOICE
  // ============================================================
  const setupOverviewRecognition = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) { alert("Speech recognition not supported."); return null }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SR()
    recognition.continuous = false; recognition.interimResults = true; recognition.lang = 'en-US'
    recognition.onstart = () => { setChatOverviewListening(true); setIsRecordingVoice(true); setVoicePaused(false); setVoiceTranscript('') }
    recognition.onend = () => { setChatOverviewListening(false); setIsRecordingVoice(false) }
    recognition.onerror = () => { setChatOverviewListening(false); setIsRecordingVoice(false) }
    recognition.onresult = (event) => {
      let final = '', interim = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const r = event.results[i]
        if (r.isFinal) final += r[0].transcript; else interim += r[0].transcript
      }
      if (final) setVoiceTranscript(final); else if (interim) setVoiceTranscript(interim)
    }
    return recognition
  }, [])

  const startVoiceRecording = useCallback(() => {
    if (isRecordingVoice || chatOverviewListening) return
    if (!chatOverviewRecognitionRef.current) chatOverviewRecognitionRef.current = setupOverviewRecognition()
    if (chatOverviewRecognitionRef.current) { try { chatOverviewRecognitionRef.current.start(); setVoiceTranscript('') } catch (e) {} }
  }, [isRecordingVoice, chatOverviewListening, setupOverviewRecognition])

  const pauseVoiceRecording = useCallback(() => {
    if (chatOverviewRecognitionRef.current && chatOverviewListening) {
      try { chatOverviewRecognitionRef.current.stop(); setVoicePaused(true); setChatOverviewListening(false); setIsRecordingVoice(false) } catch (e) {}
    }
  }, [chatOverviewListening])

  const resumeVoiceRecording = useCallback(() => {
    if (voicePaused && chatOverviewRecognitionRef.current) {
      try { chatOverviewRecognitionRef.current.start(); setVoicePaused(false); setChatOverviewListening(true); setIsRecordingVoice(true) } catch (e) {}
    }
  }, [voicePaused])

  const deleteVoiceRecording = useCallback(() => {
    if (chatOverviewRecognitionRef.current) { try { chatOverviewRecognitionRef.current.stop() } catch (e) {} }
    setVoiceTranscript(''); setChatOverviewListening(false); setIsRecordingVoice(false); setVoicePaused(false)
  }, [])

  const sendVoiceRecording = useCallback(() => {
    const text = voiceTranscript.trim()
    if (!text || isProcessing) return
    setVoiceTranscript(''); setChatOverviewListening(false); setIsRecordingVoice(false); setVoicePaused(false)
    if (chatOverviewRecognitionRef.current) { try { chatOverviewRecognitionRef.current.stop() } catch (e) {} }
    processUserQuery(text)
  }, [voiceTranscript, isProcessing, processUserQuery])

  useEffect(() => { if (voiceTranscript && !chatOverviewListening) setChatOverviewInput(voiceTranscript) }, [voiceTranscript, chatOverviewListening])

  const sendOverviewText = useCallback(() => {
    const text = chatOverviewInput.trim()
    if (!text || isProcessing) return
    setChatOverviewInput(''); processUserQuery(text)
  }, [chatOverviewInput, isProcessing, processUserQuery])

  const handleOverviewFileShare = useCallback((e) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    const file = files[0]
    if (file.size > 20 * 1024 * 1024) { alert("File too large! Max 20MB."); return }
    const reader = new FileReader()
    reader.onloadend = () => {
      const fileData = { id: ++msgCounter.current, role: 'user', content: `📎 ${file.name}`, time: Date.now(), file: { name: file.name, type: file.type, data: reader.result, size: file.size } }
      setConversation(prev => [...prev, fileData])
      setCommandHistory(prev => [...prev, { command: `📎 ${file.name}`, timestamp: Date.now() }])
      const reply = `Received your file: ${file.name} (${(file.size / 1024).toFixed(1)} KB). I can't process it directly, but I'm happy to help!`
      const assistantMsg = { id: ++msgCounter.current, role: 'assistant', content: reply, time: Date.now() }
      setConversation(prev => [...prev, assistantMsg])
      if (chatOverviewVoiceEnabled) speakText(reply)
    }
    reader.readAsDataURL(file); e.target.value = ''
  }, [speakText, chatOverviewVoiceEnabled])

  const handleEditMessage = useCallback((msgId) => {
    const msg = conversation.find(m => m.id === msgId)
    if (!msg || msg.role !== 'user') return
    const newContent = prompt("Edit your message:", msg.content)
    if (newContent !== null && newContent.trim()) setConversation(prev => prev.map(m => m.id === msgId ? { ...m, content: newContent.trim() } : m))
  }, [conversation])

  const handleDeleteMessage = useCallback((msgId) => { if (!confirm("Delete this message?")) return; setConversation(prev => prev.filter(m => m.id !== msgId)) }, [])

  const handleShareMessage = useCallback(async (msg) => {
    const content = msg.content
    if (navigator.share) { try { await navigator.share({ title: 'CYPHER4X Message', text: content }) } catch (e) {} }
    else { try { await navigator.clipboard.writeText(content); alert('Message copied to clipboard!') } catch (e) { alert('Could not share/copy message.') } }
  }, [])

  const handleFileShare = useCallback((e) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    const file = files[0]
    if (file.size > 20 * 1024 * 1024) { alert("File too large! Max 20MB."); return }
    const reader = new FileReader()
    reader.onloadend = () => {
      const fileData = { id: ++msgCounter.current, role: 'user', content: `📎 ${file.name}`, time: Date.now(), file: { name: file.name, type: file.type, data: reader.result, size: file.size } }
      setConversation(prev => [...prev, fileData])
      setCommandHistory(prev => [...prev, { command: `📎 ${file.name}`, timestamp: Date.now() }])
      const reply = `I received your file: ${file.name} (${(file.size / 1024).toFixed(1)} KB). I can't process the content directly, but I'm happy to help!`
      const assistantMsg = { id: ++msgCounter.current, role: 'assistant', content: reply, time: Date.now() }
      setConversation(prev => [...prev, assistantMsg]); speakText(reply)
    }
    reader.readAsDataURL(file); e.target.value = ''
  }, [speakText])

  const toggleFullscreenCall = useCallback(() => {
    if (isFullscreenCall) {
      setIsFullscreenCall(false); setIsCallActive(false)
      if (recognitionRef.current) { try { recognitionRef.current.stop() } catch (e) {} }
      setIsListening(false); setInterimTranscript('')
      synthRef.current?.cancel(); setIsAISpeaking(false)
    } else {
      setIsFullscreenCall(true); setIsCallActive(true)
      if (!recognitionRef.current) recognitionRef.current = setupSpeechRecognition(false, (t) => processUserQuery(t))
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start()
          const greeting = "Hello! I'm listening. How can I help you today?"
          speakText(greeting)
          const assistantMsg = { id: ++msgCounter.current, role: 'assistant', content: greeting, time: Date.now() }
          setConversation(prev => [...prev, assistantMsg])
        } catch (e) {}
      } else { alert('Speech recognition not available.'); setIsFullscreenCall(false); setIsCallActive(false) }
    }
  }, [isFullscreenCall, setupSpeechRecognition, speakText, processUserQuery])

  const interruptAndListen = useCallback(() => {
    if (synthRef.current) synthRef.current.cancel()
    setIsAISpeaking(false)
    if (recognitionRef.current) { try { recognitionRef.current.start() } catch (e) {} }
  }, [])

  const startRecording = useCallback(() => {
    if (isRecording || isProcessing || isFullscreenCall) return
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) { alert("Speech recognition not supported."); return }
    setRecordingMode(true)
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
    recognition.continuous = false; recognition.interimResults = true; recognition.lang = 'en-US'
    recognition.onstart = () => { setIsRecording(true); setIsListening(true); setInterimTranscript('') }
    recognition.onend = () => { setIsRecording(false); setIsListening(false) }
    recognition.onerror = (event) => {
      setIsRecording(false); setRecordingMode(false); setIsListening(false)
      if (event.error === 'not-allowed') alert('Please allow microphone access.')
      else alert('Speech recognition error: ' + event.error)
    }
    recognition.onresult = async (event) => {
      let final = '', interim = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const r = event.results[i]
        if (r.isFinal) final += r[0].transcript; else interim += r[0].transcript
      }
      if (final) { setInterimTranscript(''); setRecordingMode(false); await processUserQuery(final) }
      else if (interim) setInterimTranscript(interim)
    }
    recognitionRef.current = recognition
    try { recognition.start() } catch (e) { alert('Failed: ' + e.message); setRecordingMode(false) }
  }, [isRecording, isProcessing, isFullscreenCall, processUserQuery])

  const sendInterim = useCallback(() => {
    if (!interimTranscript.trim() || isProcessing) return
    const text = interimTranscript.trim()
    setInterimTranscript(''); setRecordingMode(false)
    if (recognitionRef.current) { try { recognitionRef.current.stop() } catch (e) {} }
    processUserQuery(text)
  }, [interimTranscript, isProcessing, processUserQuery])

  const cancelRecording = useCallback(() => {
    setInterimTranscript(''); setRecordingMode(false); setIsRecording(false); setIsListening(false)
    if (recognitionRef.current) { try { recognitionRef.current.stop() } catch (e) {} }
  }, [])

  const sendTextMessage = useCallback(() => {
    const text = inputText.trim()
    if (!text || isProcessing) return
    setInputText(''); processUserQuery(text)
  }, [inputText, isProcessing, processUserQuery])

  const handleWelcomeDecision = useCallback((choice) => {
    setWelcomeStep('decision')
    let reply = choice === 'fine'
      ? "That's great to hear! I'm so happy you're feeling well. How can I make your day even better today?"
      : "I'm sorry to hear that. I'm here for you. Would you like to talk about it or maybe I can help you with something to cheer you up?"
    const assistantMsg = { id: ++msgCounter.current, role: 'assistant', content: reply, time: Date.now() }
    setConversation(prev => [...prev, assistantMsg]); speakText(reply)
    setTimeout(() => setShowWelcomeOverlay(false), 3000)
  }, [speakText])

  const handlePersonalitySelect = (personalityId) => {
    setAiPersonality(personalityId)
    setSettings({ ...settings, personality: personalityId })
    localStorage.setItem('cypher4x_personality', personalityId)
    setShowPersonalityModal(false)
    const today = new Date().toDateString()
    const lastWelcome = getLastWelcomeDate()
    if (lastWelcome !== today && settings.welcomeEnabled) {
      setLastWelcomeDate(today); setShowWelcomeOverlay(true); setWelcomeStep('greeting')
      const msg = "Hello User! I'm CYPHER4X, your friendly AI assistant. How are you feeling today?"
      setWelcomeMessage(msg); speakText(msg)
    }
  }

  const handleBackgroundChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (!file.type.startsWith('image/')) { alert("Select an image file!"); return }
    if (file.size > 5 * 1024 * 1024) { alert("Image too large! Max 5MB"); return }
    const reader = new FileReader()
    reader.onloadend = () => setBackgroundImage(reader.result)
    reader.readAsDataURL(file)
  }

  const resetBackground = () => { setBackgroundImage(null); if (bgInputRef.current) bgInputRef.current.value = '' }

  const toggleView = useCallback(() => {
    setViewMode(prev => { const n = prev === 'android' ? 'pc' : 'android'; if (n === 'pc') setShowRotateOverlay(true); return n })
    setSidebarOpen(false)
  }, [])

  // Terminal submit
  const submitTerminal = (e) => {
    e.preventDefault()
    if (!terminalInput.trim()) return
    const cmd = terminalInput.trim()
    const output = runTerminalCommand(cmd)
    if (output === '__CLEAR__') { setTerminalLines([{ type: 'info', text: 'Terminal cleared.' }]) }
    else {
      setTerminalLines(prev => [...prev, { type: 'cmd', text: `$ ${cmd}` }, { type: 'out', text: output }])
    }
    setTerminalInput('')
  }

  // ============================================================
  // IN-APP OVERLAY (browser-side simulation of a floating assistant)
  // ============================================================
  const toggleOverlay = () => {
    const newState = !overlayActive
    setOverlayActive(newState)
    if (newState) {
      // Start listening
      if (!overlayRecognitionRef.current) {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) { alert("Speech not supported."); setOverlayActive(false); return }
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition
        const rec = new SR()
        rec.continuous = false; rec.interimResults = false; rec.lang = 'en-US'
        rec.onstart = () => setOverlayListening(true)
        rec.onend = () => setOverlayListening(false)
        rec.onerror = () => setOverlayListening(false)
        rec.onresult = (event) => {
          const transcript = event.results[0][0].transcript
          setOverlayActive(false)
          processUserQuery(transcript)
        }
        overlayRecognitionRef.current = rec
      }
      try { overlayRecognitionRef.current.start() } catch (e) {}
    } else {
      try { overlayRecognitionRef.current?.stop() } catch (e) {}
      setOverlayListening(false)
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setStats(prev => ({
        ...prev,
        uptime: Math.floor((Date.now() - APP_START_TIME) / 1000),
        cpuUsage: Math.floor(Math.random() * 30) + 10,
        cpuTemp: Math.floor(Math.random() * 20) + 55,
        ramUsage: Math.floor(Math.random() * 4) + 3.5,
        storageUsed: Math.floor(Math.random() * 50) + 120,
        networkSpeed: (Math.random() * 5 + 0.5).toFixed(2),
        messages: conversation.filter(m => m.role === 'user').length,
      }))
    }, 3000)
    return () => clearInterval(timer)
  }, [conversation])

  const handleAvatarChange = useCallback((e) => {
    const file = e.target.files[0]
    if (!file) return
    if (!file.type.startsWith('image/')) { alert("Select an image file!"); return }
    if (file.size > 5 * 1024 * 1024) { alert("Image too large! Max 5MB"); return }
    const reader = new FileReader()
    reader.onloadend = () => setProfileForm(p => ({ ...p, avatar: reader.result }))
    reader.readAsDataURL(file)
  }, [])

  const saveProfile = useCallback(() => {
    if (!profileForm.name.trim() || !profileForm.username.trim()) { alert("Name & Username required!"); return }
    const newProfile = { ...profileForm, username: profileForm.username.toLowerCase().replace(/[^a-z0-9_]/g, ''), updatedAt: new Date().toISOString() }
    setProfile(newProfile); setEditingProfile(false); speakText(`Profile updated, ${newProfile.name}!`)
  }, [profileForm, speakText])

  const openEditProfile = useCallback(() => {
    setProfileForm({ name: profile?.name || "", username: profile?.username || "", avatar: profile?.avatar || "", bio: profile?.bio || "" })
    setEditingProfile(true); setSidebarOpen(false)
  }, [profile])

  const resetAllData = useCallback(() => {
    if (!confirm("Reset ALL data for this account?")) return
    if (userMode === 'loggedin') {
      const emptyData = { profile: null, conversation: [], commandHistory: [], events: [], reminders: [], faceRecognition: false, biometricAuth: false, voiceGender: 'female', viewMode: 'android', personality: 'polite', backgroundImage: null, settings: { welcomeEnabled: true, autoStartVoice: true, language: 'en', voiceSpeed: 1, personality: 'polite', secretMode: false, overlayButton: false, safeLinks: true } }
      saveUserData(email, pin, emptyData)
    }
    setProfile(null); setConversation([]); setCommandHistory([]); setEvents([]); setReminders([])
    setFaceRecognition(false); setBiometricAuth(false); setVoiceGender('female'); setViewMode('android')
    setBackgroundImage(null); setAiPersonality('polite'); setSidebarOpen(false)
  }, [userMode, email, pin])

  const clearConversation = useCallback(() => setConversation([]), [])
  const clearCommands = useCallback(() => setCommandHistory([]), [])
  const exportChat = useCallback(() => {
    const data = { conversation, commandHistory, events, reminders, profile, exportedAt: new Date().toISOString() }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = `cypher4x_export_${Date.now()}.json`; a.click()
    URL.revokeObjectURL(url)
  }, [conversation, commandHistory, events, reminders, profile])

  const formatUptime = (seconds) => {
    const h = Math.floor(seconds / 3600), m = Math.floor((seconds % 3600) / 60), s = seconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }
  const formatTime = (ts) => new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  // ============================================================
  // RENDER: BOOT SCREEN
  // ============================================================
  if (isBooting) {
    return (
      <div style={styles.bootContainer}>
        <style>{`@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`}</style>
        <div style={styles.bootBackground} />
        <div style={styles.bootContent}>
          <h1 style={styles.bootTitle}>{bootTypedText}<span style={styles.bootCursor}>|</span></h1>
          <p style={styles.bootSubtitle}>Advanced AI System</p>
          <div style={styles.bootCredit}>{bootTypedCredit}{bootTypedCredit.length > 0 && bootTypedCredit.length < 38 && <span style={styles.bootCursor}>|</span>}</div>
        </div>
      </div>
    )
  }

  // PERSONALITY SELECTION
  if (showPersonalityModal) {
    return (
      <div style={styles.personalityOverlay}>
        <div style={styles.personalityCard}>
          <h1 style={styles.personalityTitle}>CYPHER4X</h1>
          <p style={styles.personalitySubtitle}>Choose your AI personality</p>
          <div style={styles.personalityGrid}>
            {PERSONALITIES.map(p => (
              <button key={p.id} onClick={() => handlePersonalitySelect(p.id)}
                style={{ ...styles.personalityOption, borderColor: aiPersonality === p.id ? '#ff003c' : '#333', backgroundColor: aiPersonality === p.id ? 'rgba(255,0,60,0.15)' : '#1a1a1a' }}>
                <span style={styles.personalityIcon}>{p.icon}</span>
                <span style={styles.personalityLabel}>{p.label}</span>
                <span style={styles.personalityDesc}>{p.desc}</span>
              </button>
            ))}
          </div>
          {aiPersonality === 'custom' && (
            <input type="text" placeholder="Describe how you want me to talk..." value={customPersonality} onChange={(e) => setCustomPersonality(e.target.value)} style={styles.personalityInput} />
          )}
          <p style={styles.personalityHint}>You can change this anytime in Settings</p>
        </div>
      </div>
    )
  }

  if (showGuestLimit) {
    return (
      <div style={styles.guestLimitOverlay}>
        <div style={styles.guestLimitCard}>
          <h2 style={styles.guestLimitTitle}>Free Trial Limit Reached</h2>
          <p style={styles.guestLimitText}>You've used all 5 free messages. Please login or sign up to continue chatting with CYPHER4X.</p>
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
          {welcomeStep === 'greeting' && <div style={styles.welcomeBall}><RedBall isSpeaking={isAISpeaking} /></div>}
          <div style={styles.welcomeMessageText}>{welcomeMessage}</div>
          {welcomeStep === 'greeting' && (
            <div style={styles.welcomeButtons}>
              <button onClick={() => handleWelcomeDecision('notfine')} style={styles.welcomeBtnNotFine}>I'm not fine</button>
              <button onClick={() => handleWelcomeDecision('fine')} style={styles.welcomeBtnFine}>I'm fine</button>
            </div>
          )}
          {welcomeStep === 'decision' && <div style={styles.welcomeDecisionText}>Thank you for sharing. I'm here to help you.</div>}
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
          <input type="password" placeholder="4-digit PIN" value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))} style={styles.authInput} maxLength="4" />
          <button onClick={handleAuthSubmit} style={styles.authBtn}>{showLogin ? 'Login' : 'Create Account'}</button>
          <div style={styles.authSwitch}>
            <span>{showLogin ? "Don't have an account?" : "Already have an account?"}</span>
            <button onClick={() => { setShowLogin(!showLogin); setAuthError('') }} style={styles.authSwitchBtn}>{showLogin ? 'Sign Up' : 'Login'}</button>
          </div>
        </div>
      </div>
    )
  }

  // FULL SCREEN SETTINGS
  if (showSettings) {
    return (
      <div style={styles.settingsFullscreen}>
        <style>{`
          .toggle-switch { position: relative; display: inline-block; width: 46px; height: 24px; }
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
            <div style={styles.settingItem}>
              <span>Welcome Messages</span>
              <label className="toggle-switch"><input type="checkbox" checked={settings.welcomeEnabled} onChange={(e) => setSettings({ ...settings, welcomeEnabled: e.target.checked })} /><span className="toggle-slider"></span></label>
            </div>
            <div style={styles.settingItem}>
              <span>Auto-start Voice</span>
              <label className="toggle-switch"><input type="checkbox" checked={settings.autoStartVoice} onChange={(e) => setSettings({ ...settings, autoStartVoice: e.target.checked })} /><span className="toggle-slider"></span></label>
            </div>
            <div style={styles.settingItem}>
              <span>Safe Links (prefer trusted sites)</span>
              <label className="toggle-switch"><input type="checkbox" checked={settings.safeLinks} onChange={(e) => setSettings({ ...settings, safeLinks: e.target.checked })} /><span className="toggle-slider"></span></label>
            </div>
            <div style={styles.settingItem}>
              <span>Secret Mode (DuckDuckGo default)</span>
              <label className="toggle-switch"><input type="checkbox" checked={settings.secretMode} onChange={(e) => setSettings({ ...settings, secretMode: e.target.checked })} /><span className="toggle-slider"></span></label>
            </div>
            <div style={styles.settingItem}>
              <span>Floating Assistant Button</span>
              <label className="toggle-switch"><input type="checkbox" checked={settings.overlayButton} onChange={(e) => setSettings({ ...settings, overlayButton: e.target.checked })} /><span className="toggle-slider"></span></label>
            </div>
            <div style={styles.settingItem}>
              <span>Language</span>
              <select value={settings.language} onChange={(e) => setSettings({ ...settings, language: e.target.value })} style={styles.settingsSelect}>
                <option value="en">English</option><option value="es">Spanish</option><option value="fr">French</option><option value="de">German</option>
              </select>
            </div>
          </div>

          <div style={styles.settingsSection}>
            <h3 style={styles.settingsSectionTitle}>Voice</h3>
            <div style={styles.settingItem}>
              <span>Voice Speed</span>
              <input type="range" min="0.5" max="2" step="0.1" value={settings.voiceSpeed} onChange={(e) => setSettings({ ...settings, voiceSpeed: parseFloat(e.target.value) })} style={styles.settingsRange} />
              <span style={styles.settingsValue}>{settings.voiceSpeed}x</span>
            </div>
            <div style={styles.settingItem}>
              <span>Voice Gender</span>
              <select value={voiceGender} onChange={(e) => setVoiceGender(e.target.value)} style={styles.settingsSelect}>
                <option value="male">Male</option><option value="female">Female</option>
              </select>
            </div>
          </div>

          <div style={styles.settingsSection}>
            <h3 style={styles.settingsSectionTitle}>AI Personality</h3>
            <div style={styles.personalityGridSettings}>
              {PERSONALITIES.map(p => (
                <button key={p.id} onClick={() => { setAiPersonality(p.id); setSettings({ ...settings, personality: p.id }); localStorage.setItem('cypher4x_personality', p.id) }}
                  style={{ ...styles.personalityOptionSmall, borderColor: aiPersonality === p.id ? '#ff003c' : '#333', backgroundColor: aiPersonality === p.id ? 'rgba(255,0,60,0.15)' : '#1a1a1a' }}>
                  <span style={{ fontSize: '20px' }}>{p.icon}</span>
                  <span style={{ fontSize: '12px', color: '#fff', fontWeight: 'bold' }}>{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div style={styles.settingsSection}>
            <h3 style={styles.settingsSectionTitle}>Background</h3>
            <div style={styles.backgroundControls}>
              <label style={styles.uploadBtn}><Icon name="image" size={18} color="#fff" /><span>Choose Image</span><input ref={bgInputRef} type="file" accept="image/*" onChange={handleBackgroundChange} style={{ display: 'none' }} /></label>
              {backgroundImage && <button onClick={resetBackground} style={styles.resetBtn}><Icon name="refresh" size={18} color="#fff" /><span>Reset</span></button>}
            </div>
            {backgroundImage && <div style={styles.bgPreview}><img src={backgroundImage} alt="Background preview" style={styles.bgPreviewImg} /></div>}
            <p style={styles.bgHint}>The Red Ball remains on top. Background applies to Android & PC views.</p>
          </div>

          <div style={styles.settingsSection}>
            <h3 style={styles.settingsSectionTitle}>Note on AI Overlay</h3>
            <p style={styles.bgHint}>Browser apps cannot float over other apps. For true overlay, build CYPHER4X with React Native / Android Studio using SYSTEM_ALERT_WINDOW permission. The toggle above enables a floating button inside this app.</p>
          </div>
        </div>
        <button onClick={() => setShowSettings(false)} style={styles.settingsDoneFull}>Done</button>
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

  // TERMINAL FULLSCREEN
  if (showTerminal) {
    return (
      <div style={styles.terminalFullscreen}>
        <div style={styles.terminalHeader}>
          <button onClick={() => setShowTerminal(false)} style={styles.terminalBackBtn}><Icon name="arrowLeft" size={22} color="#fff" /> Back</button>
          <span style={styles.terminalTitle}>csh — CYPHER4X Terminal</span>
          <button onClick={() => setTerminalLines([{ type: 'info', text: 'Terminal cleared.' }])} style={styles.terminalClearBtn}>Clear</button>
        </div>
        <div style={styles.terminalBody}>
          {terminalLines.map((line, i) => (
            <pre key={i} style={{
              ...styles.terminalLine,
              color: line.type === 'cmd' ? '#4f8' : line.type === 'info' ? '#ff6688' : '#ddd',
              fontWeight: line.type === 'cmd' ? 'bold' : 'normal',
            }}>{line.text}</pre>
          ))}
          <div ref={terminalEndRef} />
        </div>
        <form onSubmit={submitTerminal} style={styles.terminalInputRow}>
          <span style={styles.terminalPrompt}>$</span>
          <input value={terminalInput} onChange={(e) => setTerminalInput(e.target.value)} placeholder="Type a command (try: help)" style={styles.terminalInput} autoFocus />
          <button type="submit" style={styles.terminalSendBtn}><Icon name="send" size={16} color="#fff" /></button>
        </form>
      </div>
    )
  }

  // ABILITIES FULLSCREEN
  if (showAbilities) {
    return (
      <div style={styles.abilitiesFullscreen}>
        <div style={styles.settingsHeaderFull}>
          <h1 style={styles.settingsTitleFull}>AI Abilities</h1>
          <button onClick={() => setShowAbilities(false)} style={styles.settingsCloseFull}><Icon name="close" size={28} color="#fff" /></button>
        </div>
        <div style={styles.abilitiesBody}>
          {AI_ABILITIES.map((a, i) => (
            <div key={i} style={styles.abilityCard}>
              <span style={styles.abilityIcon}>{a.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={styles.abilityTitle}>{a.title}</div>
                <div style={styles.abilityDesc}>{a.desc}</div>
              </div>
            </div>
          ))}
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
          <button onClick={() => setChatOverviewVoiceEnabled(!chatOverviewVoiceEnabled)} style={styles.chatOverviewVoiceToggle}>
            <Icon name={chatOverviewVoiceEnabled ? 'volume2' : 'volumeX'} size={20} color="#fff" />
          </button>
        </div>
        <div style={styles.chatOverviewMessages}>
          {conversation.length === 0 && <div style={styles.chatOverviewEmpty}>Start chatting with AI!</div>}
          {conversation.map(msg => (
            <div key={msg.id} style={{ ...styles.chatOverviewMsg, alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', backgroundColor: msg.role === 'user' ? '#ff003c' : '#1a1a1a' }}>
              <span style={styles.chatOverviewMsgText}>{msg.content}</span>
              {msg.file && (
                <div style={styles.filePreviewPC}>
                  {msg.file.type.startsWith('image/') && <img src={msg.file.data} alt={msg.file.name} style={{ maxWidth: '100%', maxHeight: '80px', borderRadius: '4px', marginTop: '4px' }} />}
                  {msg.file.type.startsWith('video/') && <video controls style={{ maxWidth: '100%', maxHeight: '80px', borderRadius: '4px', marginTop: '4px' }}><source src={msg.file.data} type={msg.file.type} /></video>}
                  {!msg.file.type.startsWith('image/') && !msg.file.type.startsWith('video/') && <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>📎 {msg.file.name}</div>}
                </div>
              )}
              <span style={styles.chatOverviewMsgTime}>{formatTime(msg.time)}</span>
              <div style={styles.msgActions}>
                {msg.role === 'user' && <button onClick={() => handleEditMessage(msg.id)} style={styles.msgActionBtn} title="Edit"><Icon name="edit" size={14} color="#888" /></button>}
                <button onClick={() => handleDeleteMessage(msg.id)} style={styles.msgActionBtn} title="Delete"><Icon name="trash" size={14} color="#888" /></button>
                <button onClick={() => handleShareMessage(msg)} style={styles.msgActionBtn} title="Share"><Icon name="copy" size={14} color="#888" /></button>
              </div>
            </div>
          ))}
          {isProcessing && <div style={{ ...styles.chatOverviewMsg, alignSelf: 'flex-start', backgroundColor: '#1a1a1a' }}><span style={styles.chatOverviewMsgText}>Thinking...</span></div>}
        </div>
        <div style={styles.chatOverviewInputRowRaised}>
          <input type="text" value={chatOverviewInput} onChange={(e) => setChatOverviewInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendOverviewText()} placeholder="Type a message..." style={styles.chatOverviewInput} disabled={isProcessing} />
          <div style={styles.voiceControls}>
            {!isRecordingVoice && !voicePaused ? (
              <button onClick={startVoiceRecording} style={styles.chatOverviewMicBtn} title="Record voice"><Icon name="mic" size={20} color="#fff" /></button>
            ) : (
              <>
                {voicePaused ? (
                  <button onClick={resumeVoiceRecording} style={styles.chatOverviewMicBtn} title="Resume"><Icon name="play" size={20} color="#4f8" /></button>
                ) : (
                  <button onClick={pauseVoiceRecording} style={styles.chatOverviewMicBtn} title="Pause"><Icon name="pause" size={20} color="#ff003c" /></button>
                )}
                <button onClick={deleteVoiceRecording} style={styles.chatOverviewMicBtn} title="Delete"><Icon name="trash" size={20} color="#ff003c" /></button>
                <button onClick={sendVoiceRecording} style={styles.chatOverviewSendBtn} title="Send" disabled={isProcessing || !voiceTranscript.trim()}><Icon name="send" size={20} color="#fff" /></button>
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
            {profileForm.avatar ? <img src={profileForm.avatar} alt="Avatar" style={styles.avatarPreview} /> : <span style={styles.avatarIcon}><Icon name="camera" size={32} color="#ff003c" /><br />Tap to select</span>}
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
          <div style={styles.inputGroup}>
            <label style={styles.label}><Icon name="user" size={14} color="#ff003c" /> Your Name *</label>
            <input type="text" value={profileForm.name} onChange={(e) => setProfileForm(p => ({ ...p, name: e.target.value }))} style={styles.textInput} placeholder="Enter your name..." />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}><Icon name="atSign" size={14} color="#ff003c" /> Username *</label>
            <input type="text" value={profileForm.username} onChange={(e) => setProfileForm(p => ({ ...p, username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '') }))} style={styles.textInput} placeholder="choose_username" />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}><Icon name="pencil" size={14} color="#ff003c" /> Bio (Optional)</label>
            <textarea value={profileForm.bio} onChange={(e) => setProfileForm(p => ({ ...p, bio: e.target.value }))} style={styles.bioInput} placeholder="Tell us about yourself..." />
          </div>
          <div style={styles.profileBtnRow}>
            <button onClick={() => setEditingProfile(false)} style={styles.cancelBtn}>Cancel</button>
            <button onClick={saveProfile} style={styles.createBtn}>SAVE CHANGES</button>
          </div>
        </div>
      </div>
    )
  }

  // ============================================================
  // ANDROID VIEW
  // ============================================================
  if (viewMode === 'android') {
    return (
      <div style={styles.appAndroid}>
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
                <div style={styles.settingRow}>
                  <span style={styles.settingLabel}>Current: Android</span>
                  <button onClick={toggleView} style={styles.toggleBtn}>Switch to PC</button>
                </div>
              </div>
              <div style={styles.sidebarSection}>
                <h3 style={styles.sectionTitle}><Icon name="sparkles" size={16} color="#ff003c" /> QUICK TOOLS</h3>
                <button onClick={() => { setSidebarOpen(false); setShowAbilities(true) }} style={styles.toolBtn}><Icon name="sparkles" size={16} color="#fff" /> AI Abilities</button>
                <button onClick={() => { setSidebarOpen(false); setShowTerminal(true) }} style={styles.toolBtn}><Icon name="terminal" size={16} color="#fff" /> Terminal</button>
                <button onClick={() => { setSidebarOpen(false); setShowSettings(true) }} style={styles.toolBtn}><Icon name="cog" size={16} color="#fff" /> Settings</button>
              </div>
              <div style={styles.sidebarSection}>
                <h3 style={styles.sectionTitle}><Icon name="chart" size={16} color="#ff003c" /> SYSTEM STATS</h3>
                <div style={styles.statsCard}>
                  <div style={styles.statRow}><span style={styles.statLabel}><Icon name="hourglass" size={14} color="#888" /> Uptime</span><span style={styles.statValue}>{formatUptime(stats.uptime)}</span></div>
                  <div style={styles.statRow}><span style={styles.statLabel}><Icon name="cpu" size={14} color="#888" /> CPU Usage</span><span style={styles.statValue}>{stats.cpuUsage}%</span></div>
                  <div style={styles.statRow}><span style={styles.statLabel}><Icon name="cpu" size={14} color="#888" /> CPU Temp</span><span style={styles.statValue}>{stats.cpuTemp}°C</span></div>
                  <div style={styles.statRow}><span style={styles.statLabel}><Icon name="memory" size={14} color="#888" /> RAM</span><span style={styles.statValue}>{stats.ramUsage.toFixed(1)} GB</span></div>
                  <div style={styles.statRow}><span style={styles.statLabel}><Icon name="save" size={14} color="#888" /> Storage</span><span style={styles.statValue}>{stats.storageUsed}/{stats.storageTotal} GB</span></div>
                  <div style={styles.statRow}><span style={styles.statLabel}><Icon name="network" size={14} color="#888" /> Network</span><span style={styles.statValue}>{stats.networkSpeed} Mbps</span></div>
                </div>
              </div>
              <div style={styles.sidebarSection}>
                <h3 style={styles.sectionTitle}><Icon name="settings" size={16} color="#ff003c" /> AI CONFIG</h3>
                <div style={styles.settingRow}><span style={styles.settingLabel}>Engine</span><span style={styles.settingValue}>TAVILY</span></div>
                <div style={styles.settingRow}><span style={styles.settingLabel}>Personality</span><span style={styles.settingValue}>{PERSONALITIES.find(p => p.id === aiPersonality)?.label}</span></div>
                <div style={styles.settingRow}><span style={styles.settingLabel}>Secret Mode</span><span style={styles.settingValue}>{settings.secretMode ? 'ON' : 'OFF'}</span></div>
                <div style={styles.settingRow}><span style={styles.settingLabel}>Safe Links</span><span style={styles.settingValue}>{settings.safeLinks ? 'ON' : 'OFF'}</span></div>
              </div>
              <div style={styles.sidebarSection}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <h3 style={styles.sectionTitle}><Icon name="chat" size={16} color="#ff003c" /> CONVERSATION</h3>
                  <button onClick={() => setShowChatOverview(true)} style={styles.overviewBtn}><Icon name="desktop" size={14} color="#fff" /> Overview</button>
                </div>
                <div style={styles.conversationLogPC}>
                  {conversation.length === 0 && <p style={styles.dashEmptyPC}>No conversation yet</p>}
                  {conversation.slice(-6).map(msg => (
                    <div key={msg.id} style={styles.convItemPC}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: msg.role === 'user' ? 'bold' : 'normal', color: msg.role === 'user' ? '#ddd' : '#ff003c' }}>{msg.role === 'user' ? profile?.name || 'You' : 'CYPHER4X'}</span>
                        <span style={styles.convTimePC}>{formatTime(msg.time)}</span>
                      </div>
                      <span style={styles.convTextPC}>{msg.content}</span>
                    </div>
                  ))}
                </div>
                <div style={styles.inputRow}>
                  <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendTextMessage()} placeholder="Type a message..." style={styles.textInputSmall} />
                  <button onClick={sendTextMessage} style={styles.sendBtnSmall} disabled={isProcessing}><Icon name="send" size={16} color="#fff" /></button>
                </div>
                <div style={styles.commandActionsPC}>
                  <button onClick={clearConversation} style={styles.dashBtnPC}><Icon name="trash" size={14} color="#fff" /> Clear</button>
                  <button onClick={exportChat} style={styles.dashBtnPC}><Icon name="save" size={14} color="#fff" /> Export</button>
                  <label style={styles.attachBtnPC}><Icon name="file" size={14} color="#fff" /> Attach<input type="file" accept="image/*,video/*,.pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx" onChange={handleFileShare} style={{ display: 'none' }} /></label>
                </div>
              </div>
              <div style={styles.sidebarSection}>
                <h3 style={styles.sectionTitle}><Icon name="clock" size={16} color="#ff003c" /> COMMAND HISTORY</h3>
                <div style={styles.commandHistoryPC}>
                  {commandHistory.length === 0 && <p style={styles.dashEmptyPC}>No commands yet</p>}
                  {commandHistory.slice(-6).reverse().map((cmd, i) => (
                    <div key={i} style={styles.cmdItemPC}><span style={styles.cmdTimePC}>{formatTime(cmd.timestamp)}</span><span style={styles.cmdTextPC}>{cmd.command}</span></div>
                  ))}
                </div>
                <button onClick={clearCommands} style={styles.dashBtnPC}><Icon name="trash" size={14} color="#fff" /> Clear All</button>
              </div>
              <div style={styles.sidebarSection}>
                <h3 style={styles.sectionTitle}><Icon name="user" size={16} color="#ff003c" /> PROFILE</h3>
                <div style={styles.profileCardSidebar}>
                  <div style={styles.profileAvatarWrapper}>{profile?.avatar ? <img src={profile.avatar} alt="Avatar" style={styles.profileAvatar} /> : <div style={styles.profileAvatarPlaceholder}>{profile?.name?.charAt(0) || "?"}</div>}</div>
                  <div style={styles.profileInfo}>
                    <div style={styles.profileName}>{profile?.name || "User"}</div>
                    <div style={styles.profileHandle}><Icon name="atSign" size={12} color="#888" />{profile?.username || "anonymous"}</div>
                  </div>
                </div>
                <button onClick={openEditProfile} style={styles.sidebarBtn}><Icon name="edit" size={14} color="#fff" /> Edit Profile</button>
                {userMode === 'loggedin' ? (
                  <button onClick={handleLogout} style={styles.logoutBtn}><Icon name="close" size={14} color="#fff" /> Logout</button>
                ) : (
                  <button onClick={() => { setShowAuthModal(true); setShowLogin(true) }} style={styles.sidebarBtn}><Icon name="settings" size={14} color="#fff" /> Login</button>
                )}
              </div>
              <div style={styles.sidebarSection}>
                <h3 style={styles.sectionTitle}><Icon name="alertTriangle" size={16} color="#ff003c" /> DANGER ZONE</h3>
                <button onClick={resetAllData} style={styles.dangerBtn}><Icon name="trash" size={14} color="#fff" /> Reset All Data</button>
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
              <>
                <div style={styles.listeningDot} />
                <span style={styles.listeningText}>Listening...</span>
                {interimTranscript && <span style={styles.interimText}>"{interimTranscript}"</span>}
                {interimTranscript && <button onClick={sendInterim} style={styles.sendInterimBtn} disabled={isProcessing}><Icon name="send" size={16} color="#fff" /><span>Send</span></button>}
              </>
            ) : isProcessing ? <span style={styles.listeningText}>Processing...</span>
              : isRecording ? (
                <>
                  <div style={{ ...styles.listeningDot, backgroundColor: '#ff003c', boxShadow: '0 0 20px #ff003c' }} />
                  <span style={styles.listeningText}>Recording...</span>
                  {interimTranscript && <span style={styles.interimText}>"{interimTranscript}"</span>}
                  {interimTranscript && (
                    <>
                      <button onClick={sendInterim} style={styles.sendInterimBtn} disabled={isProcessing}><Icon name="send" size={16} color="#fff" /><span>Send</span></button>
                      <button onClick={cancelRecording} style={styles.cancelInterimBtn}><Icon name="close" size={18} color="#ff003c" /></button>
                    </>
                  )}
                </>
              ) : null}
          </div>

          <div style={styles.voiceButtonContainer}>
            <button onClick={startRecording} disabled={isRecording || isProcessing || isFullscreenCall}
              style={{ ...styles.voiceButton, ...(isRecording ? styles.voiceButtonActive : {}) }}>
              <Icon name="mic" size={40} color="#fff" />
              <span style={styles.voiceLabel}>{isRecording ? 'Recording...' : isProcessing ? 'Processing...' : 'Tap to Speak'}</span>
            </button>
          </div>

          <button onClick={() => setSidebarOpen(true)} style={{ ...styles.hamburgerBtn, zIndex: 15 }}><Icon name="menu" size={28} color="#ff003c" /></button>

          {/* Floating assistant button (in-app) */}
          {settings.overlayButton && (
            <button onClick={toggleOverlay} style={{
              ...styles.floatingBtn,
              backgroundColor: overlayActive ? '#ff003c' : 'rgba(0,0,0,0.7)',
              borderColor: overlayActive ? '#ff003c' : '#333',
            }} title="Floating Assistant">
              <Icon name={overlayListening ? 'mic' : 'sparkles'} size={22} color={overlayActive ? '#fff' : '#ff003c'} />
            </button>
          )}
        </div>
      </div>
    )
  }

  // ============================================================
  // PC VIEW
  // ============================================================
  return (
    <div style={styles.appPC}>
      <header style={styles.headerPC}>
        <div style={styles.headerLeft}>
          <h1 style={styles.titlePC}>CYPHER4X</h1>
          <span style={styles.versionBadgePC}>{VERSION}</span>
        </div>
        <div style={styles.headerRight}>
          <button onClick={toggleFullscreenCall} style={{ ...styles.callBtnPC, ...(isFullscreenCall ? styles.callBtnPCActive : {}) }}>
            <Icon name="phone" size={18} color={isFullscreenCall ? "#4f8" : "#ff003c"} />
            <span>{isFullscreenCall ? 'ACTIVE' : 'CALL'}</span>
          </button>
          <button onClick={() => setShowSettings(true)} style={styles.settingsBtnPC}><Icon name="cog" size={20} color="#fff" /></button>
          <button onClick={() => setShowTerminal(true)} style={styles.settingsBtnPC}><Icon name="terminal" size={20} color="#fff" /></button>
          <button onClick={() => setShowAbilities(true)} style={styles.settingsBtnPC}><Icon name="sparkles" size={20} color="#fff" /></button>
          <button onClick={startRecording} disabled={isRecording || isProcessing || isFullscreenCall} style={{ ...styles.voiceBtnPC, ...(isRecording ? styles.voiceBtnPCActive : {}) }}>
            <Icon name="mic" size={20} color={isRecording ? "#fff" : "#ff003c"} />
            <span>{isRecording ? 'Recording...' : isProcessing ? 'Processing...' : 'Tap to Speak'}</span>
          </button>
          <button onClick={() => setSidebarOpen(true)} style={styles.menuBtnPC}><Icon name="menu" size={24} color="#ff003c" /></button>
        </div>
      </header>

      <div style={styles.pcLayout}>
        <div style={styles.pcSidebar}>
          <div style={styles.pcSidebarSection}>
            <h3 style={styles.pcSidebarTitle}><Icon name="chart" size={16} color="#ff003c" /> SYSTEM STATS</h3>
            <div style={styles.pcSidebarRow}><span>CPU</span><span style={{ color: stats.cpuUsage > 80 ? '#ff003c' : '#4f8' }}>{stats.cpuUsage}%</span></div>
            <div style={styles.pcSidebarRow}><span>Temp</span><span>{stats.cpuTemp}°C</span></div>
            <div style={styles.pcSidebarRow}><span>RAM</span><span>{stats.ramUsage.toFixed(1)} GB</span></div>
            <div style={styles.pcSidebarRow}><span>Storage</span><span>{stats.storageUsed}/{stats.storageTotal} GB</span></div>
            <div style={styles.pcSidebarRow}><span>Network</span><span>{stats.networkSpeed} Mbps</span></div>
            <div style={styles.pcSidebarRow}><span>Uptime</span><span>{formatUptime(stats.uptime)}</span></div>
          </div>
          <div style={styles.pcSidebarSection}>
            <h3 style={styles.pcSidebarTitle}><Icon name="settings" size={16} color="#ff003c" /> AI CONFIG</h3>
            <div style={styles.pcSidebarRow}><span>Engine</span><span>TAVILY</span></div>
            <div style={styles.pcSidebarRow}><span>Personality</span><span>{PERSONALITIES.find(p => p.id === aiPersonality)?.label}</span></div>
            <div style={styles.pcSidebarRow}><span>Secret</span><span>{settings.secretMode ? 'ON' : 'OFF'}</span></div>
            <div style={styles.pcSidebarRow}><span>Safe Links</span><span>{settings.safeLinks ? 'ON' : 'OFF'}</span></div>
          </div>
          <div style={styles.pcSidebarSection}>
            <h3 style={styles.pcSidebarTitle}><Icon name="sparkles" size={16} color="#ff003c" /> TOOLS</h3>
            <button onClick={() => setShowTerminal(true)} style={styles.toolBtnSmall}><Icon name="terminal" size={14} color="#fff" /> Terminal</button>
            <button onClick={() => setShowAbilities(true)} style={styles.toolBtnSmall}><Icon name="sparkles" size={14} color="#fff" /> Abilities</button>
          </div>
          <div style={styles.pcSidebarSection}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <h3 style={styles.pcSidebarTitle}><Icon name="chat" size={16} color="#ff003c" /> CONVERSATION</h3>
              <button onClick={() => setShowChatOverview(true)} style={styles.overviewBtn}><Icon name="desktop" size={14} color="#fff" /> Overview</button>
            </div>
            <div style={styles.conversationLogPC}>
              {conversation.length === 0 && <p style={styles.dashEmptyPC}>No conversation yet</p>}
              {conversation.slice(-6).map(msg => (
                <div key={msg.id} style={styles.convItemPC}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: msg.role === 'user' ? 'bold' : 'normal', color: msg.role === 'user' ? '#ddd' : '#ff003c' }}>{msg.role === 'user' ? profile?.name || 'You' : 'CYPHER4X'}</span>
                    <span style={styles.convTimePC}>{formatTime(msg.time)}</span>
                  </div>
                  <span style={styles.convTextPC}>{msg.content}</span>
                </div>
              ))}
            </div>
            <div style={styles.inputRow}>
              <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendTextMessage()} placeholder="Type a message..." style={styles.textInputSmall} />
              <button onClick={sendTextMessage} style={styles.sendBtnSmall} disabled={isProcessing}><Icon name="send" size={16} color="#fff" /></button>
            </div>
            <div style={styles.commandActionsPC}>
              <button onClick={clearConversation} style={styles.dashBtnPC}><Icon name="trash" size={14} color="#fff" /> Clear</button>
              <button onClick={exportChat} style={styles.dashBtnPC}><Icon name="save" size={14} color="#fff" /> Export</button>
              <label style={styles.attachBtnPC}><Icon name="file" size={14} color="#fff" /> Attach<input type="file" accept="image/*,video/*,.pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx" onChange={handleFileShare} style={{ display: 'none' }} /></label>
            </div>
          </div>
          <div style={styles.pcSidebarSection}>
            <h3 style={styles.pcSidebarTitle}><Icon name="user" size={16} color="#ff003c" /> PROFILE</h3>
            <div style={styles.profileCardSidebarPC}>
              <div style={styles.profileAvatarWrapperPC}>{profile?.avatar ? <img src={profile.avatar} alt="Avatar" style={styles.profileAvatarPC} /> : <div style={styles.profileAvatarPlaceholderPC}>{profile?.name?.charAt(0) || "?"}</div>}</div>
              <div style={styles.profileInfoPC}>
                <div style={styles.profileNamePC}>{profile?.name || "User"}</div>
                <div style={styles.profileHandlePC}><Icon name="atSign" size={12} color="#888" />{profile?.username || "anonymous"}</div>
              </div>
            </div>
            <button onClick={openEditProfile} style={styles.sidebarBtnPC}><Icon name="edit" size={14} color="#fff" /> Edit Profile</button>
            {userMode === 'loggedin' ? (
              <button onClick={handleLogout} style={styles.logoutBtnPC}><Icon name="close" size={14} color="#fff" /> Logout</button>
            ) : (
              <button onClick={() => { setShowAuthModal(true); setShowLogin(true) }} style={styles.sidebarBtnPC}><Icon name="settings" size={14} color="#fff" /> Login</button>
            )}
          </div>
          <div style={styles.pcSidebarSection}>
            <button onClick={resetAllData} style={styles.dangerBtnPC}><Icon name="trash" size={14} color="#fff" /> Reset All Data</button>
          </div>
        </div>

        <div style={{ ...styles.pcMain, backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div style={styles.pcBallContainer}><RedBall isSpeaking={isAISpeaking} /></div>
          <div style={styles.pcListeningContainer}>
            {isListening ? (
              <>
                <div style={styles.listeningDot} />
                <span style={styles.listeningText}>Listening...</span>
                {interimTranscript && <span style={styles.interimText}>"{interimTranscript}"</span>}
                {interimTranscript && <button onClick={sendInterim} style={styles.sendInterimBtn} disabled={isProcessing}><Icon name="send" size={16} color="#fff" /><span>Send</span></button>}
              </>
            ) : isProcessing ? <span style={styles.listeningText}>Processing...</span>
              : isRecording ? (
                <>
                  <div style={{ ...styles.listeningDot, backgroundColor: '#ff003c', boxShadow: '0 0 20px #ff003c' }} />
                  <span style={styles.listeningText}>Recording...</span>
                  {interimTranscript && <span style={styles.interimText}>"{interimTranscript}"</span>}
                </>
              ) : null}
          </div>
          {settings.overlayButton && (
            <button onClick={toggleOverlay} style={{
              ...styles.floatingBtn,
              backgroundColor: overlayActive ? '#ff003c' : 'rgba(0,0,0,0.7)',
              borderColor: overlayActive ? '#ff003c' : '#333',
              bottom: '30px', right: '30px',
            }} title="Floating Assistant">
              <Icon name={overlayListening ? 'mic' : 'sparkles'} size={22} color={overlayActive ? '#fff' : '#ff003c'} />
            </button>
          )}
        </div>
      </div>

      {sidebarOpen && (
        <>
          <div style={styles.sidebarOverlayPC} onClick={() => setSidebarOpen(false)} />
          <div style={styles.sidebarPC}>
            <div style={styles.sidebarHeaderPC}>
              <h2 style={styles.sidebarTitlePC}><Icon name="settings" size={20} color="#ff003c" /> CONTROL PANEL</h2>
              <button onClick={() => setSidebarOpen(false)} style={styles.closeBtnPC}><Icon name="x" size={20} color="#888" /></button>
            </div>
            <div style={styles.sidebarSectionPC}>
              <h3 style={styles.sectionTitlePC}><Icon name="desktop" size={16} color="#ff003c" /> VIEW MODE</h3>
              <div style={styles.settingRowPC}>
                <span style={styles.settingLabelPC}>Current: PC</span>
                <button onClick={toggleView} style={styles.toggleBtnPC2}>Switch to Android</button>
              </div>
            </div>
            <div style={styles.sidebarSectionPC}>
              <h3 style={styles.sectionTitlePC}><Icon name="user" size={16} color="#ff003c" /> PROFILE</h3>
              <div style={styles.profileCardSidebarPC}>
                <div style={styles.profileAvatarWrapperPC}>{profile?.avatar ? <img src={profile.avatar} alt="Avatar" style={styles.profileAvatarPC} /> : <div style={styles.profileAvatarPlaceholderPC}>{profile?.name?.charAt(0) || "?"}</div>}</div>
                <div style={styles.profileInfoPC}>
                  <div style={styles.profileNamePC}>{profile?.name || "User"}</div>
                  <div style={styles.profileHandlePC}><Icon name="atSign" size={12} color="#888" />{profile?.username || "anonymous"}</div>
                </div>
              </div>
              <button onClick={openEditProfile} style={styles.sidebarBtnPC}><Icon name="edit" size={14} color="#fff" /> Edit Profile</button>
            </div>
            <div style={styles.sidebarSectionPC}>
              <h3 style={styles.sectionTitlePC}><Icon name="alertTriangle" size={16} color="#ff003c" /> DANGER ZONE</h3>
              <button onClick={resetAllData} style={styles.dangerBtnPC}><Icon name="trash" size={14} color="#fff" /> Reset All Data</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const styles = {
  appAndroid: { minHeight: '100vh', height: '100vh', backgroundColor: '#000', color: '#e0e0e0', fontFamily: "'Segoe UI', 'Courier New', monospace", overflow: 'hidden', margin: 0, padding: 0 },
  bootContainer: { backgroundColor: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', fontFamily: "'Courier New', monospace" },
  bootBackground: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(ellipse at center, #1a0000 0%, #000 70%)', zIndex: 0 },
  bootContent: { position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '500px', padding: '20px' },
  bootTitle: { fontSize: 'clamp(48px, 12vw, 72px)', fontWeight: 'bold', color: '#ff003c', textShadow: '0 0 40px #ff003c, 0 0 80px #ff003c44', letterSpacing: '8px', margin: '0 0 10px', fontFamily: "'Courier New', monospace", minHeight: '80px' },
  bootCursor: { display: 'inline-block', animation: 'blink 0.7s step-end infinite', color: '#ff003c' },
  bootSubtitle: { fontSize: 'clamp(14px, 2vw, 20px)', color: '#ff6688', letterSpacing: '4px', marginBottom: '40px', opacity: 0.8 },
  bootCredit: { color: '#ff6688', fontSize: '14px', marginTop: '20px', opacity: 0.7, letterSpacing: '1px', borderTop: '1px solid rgba(255,0,60,0.2)', paddingTop: '16px', minHeight: '30px' },

  personalityOverlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#000', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', overflowY: 'auto' },
  personalityCard: { width: '100%', maxWidth: '700px', backgroundColor: '#111', border: '2px solid #ff003c', borderRadius: '16px', padding: '30px', textAlign: 'center' },
  personalityTitle: { color: '#ff003c', fontSize: '36px', letterSpacing: '6px', margin: '0 0 8px', fontFamily: "'Courier New', monospace" },
  personalitySubtitle: { color: '#ff6688', fontSize: '16px', marginBottom: '24px' },
  personalityGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '20px' },
  personalityOption: { padding: '16px 12px', border: '2px solid #333', borderRadius: '12px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' },
  personalityIcon: { fontSize: '28px' },
  personalityLabel: { color: '#fff', fontWeight: 'bold', fontSize: '15px' },
  personalityDesc: { color: '#888', fontSize: '11px', textAlign: 'center' },
  personalityInput: { width: '100%', padding: '12px', backgroundColor: '#000', border: '1px solid #333', color: '#fff', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', marginBottom: '16px' },
  personalityHint: { color: '#666', fontSize: '12px', marginTop: '12px', fontStyle: 'italic' },

  authModalOverlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  authModalCard: { width: '100%', maxWidth: '400px', backgroundColor: '#111', border: '2px solid #ff003c', borderRadius: '12px', padding: '30px', textAlign: 'center', position: 'relative' },
  authModalClose: { position: 'absolute', top: '10px', right: '15px', background: 'none', border: 'none', color: '#888', fontSize: '24px', cursor: 'pointer' },
  authTitle: { color: '#ff003c', fontSize: '32px', letterSpacing: '4px', marginBottom: '4px' },
  authSubtitle: { color: '#ff6688', fontSize: '18px', marginBottom: '20px' },
  authError: { color: '#ff003c', fontSize: '14px', minHeight: '24px', marginBottom: '12px' },
  authInput: { width: '100%', padding: '12px', marginBottom: '12px', backgroundColor: '#000', border: '1px solid #333', color: '#fff', borderRadius: '6px', fontSize: '16px', outline: 'none', boxSizing: 'border-box' },
  authBtn: { width: '100%', padding: '14px', backgroundColor: '#ff003c', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px' },
  authSwitch: { marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '8px', color: '#888', fontSize: '14px' },
  authSwitchBtn: { background: 'none', border: 'none', color: '#ff003c', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', textDecoration: 'underline' },

  guestLimitOverlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.92)', zIndex: 99998, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  guestLimitCard: { backgroundColor: '#111', border: '2px solid #ff003c', borderRadius: '20px', padding: '40px 30px', maxWidth: '420px', width: '100%', textAlign: 'center' },
  guestLimitTitle: { color: '#ff003c', fontSize: '24px', marginBottom: '16px' },
  guestLimitText: { color: '#ddd', fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' },
  guestLimitButtons: { display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' },
  guestLimitLoginBtn: { padding: '12px 30px', backgroundColor: '#ff003c', color: '#fff', border: 'none', borderRadius: '30px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', flex: 1, minWidth: '100px' },
  guestLimitSignupBtn: { padding: '12px 30px', backgroundColor: '#1a3a3a', color: '#fff', border: '1px solid #2a5a5a', borderRadius: '30px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', flex: 1, minWidth: '100px' },

  welcomeOverlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.92)', zIndex: 99997, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  welcomeCard: { backgroundColor: '#111', border: '2px solid #ff003c', borderRadius: '20px', padding: '40px 30px', maxWidth: '500px', width: '100%', textAlign: 'center' },
  welcomeBall: { width: '120px', height: '120px', margin: '0 auto 20px', position: 'relative' },
  welcomeMessageText: { color: '#fff', fontSize: '20px', lineHeight: '1.6', marginBottom: '24px', fontFamily: "'Courier New', monospace" },
  welcomeButtons: { display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' },
  welcomeBtnNotFine: { padding: '12px 24px', backgroundColor: '#880000', color: '#fff', border: '1px solid #ff003c', borderRadius: '30px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', flex: 1, minWidth: '120px' },
  welcomeBtnFine: { padding: '12px 24px', backgroundColor: '#008800', color: '#fff', border: '1px solid #4f8', borderRadius: '30px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', flex: 1, minWidth: '120px' },
  welcomeDecisionText: { color: '#ff6688', fontSize: '18px', fontStyle: 'italic', marginTop: '12px' },

  settingsFullscreen: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#000', zIndex: 100000, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  settingsHeaderFull: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #333', backgroundColor: '#0a0000', flexShrink: 0 },
  settingsTitleFull: { color: '#ff003c', fontSize: '24px', margin: 0, letterSpacing: '2px' },
  settingsCloseFull: { background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex' },
  settingsBodyFull: { flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '24px' },
  settingsSection: { borderBottom: '1px solid #1a1a1a', paddingBottom: '20px' },
  settingsSectionTitle: { color: '#ff003c', fontSize: '14px', margin: '0 0 16px 0', letterSpacing: '1px', textTransform: 'uppercase' },
  settingsDoneFull: { padding: '16px', backgroundColor: '#ff003c', color: '#fff', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', flexShrink: 0 },
  personalityGridSettings: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '8px' },
  personalityOptionSmall: { padding: '12px 8px', border: '2px solid #333', borderRadius: '8px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' },
  backgroundControls: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  uploadBtn: { padding: '10px 16px', backgroundColor: '#ff003c', color: '#fff', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 'bold' },
  resetBtn: { padding: '10px 16px', backgroundColor: '#333', color: '#fff', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 'bold', border: 'none' },
  bgPreview: { marginTop: '12px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #333' },
  bgPreviewImg: { width: '100%', maxHeight: '150px', objectFit: 'cover', display: 'block' },
  bgHint: { color: '#666', fontSize: '12px', marginTop: '8px', fontStyle: 'italic', lineHeight: '1.5' },
  settingItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff', fontSize: '15px', marginBottom: '14px', gap: '10px' },
  settingsSelect: { padding: '6px 12px', backgroundColor: '#000', border: '1px solid #444', color: '#fff', borderRadius: '6px', fontSize: '14px' },
  settingsRange: { width: '140px', accentColor: '#ff003c' },
  settingsValue: { color: '#ff6688', minWidth: '40px', textAlign: 'right', fontWeight: 'bold' },

  rotateOverlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 99996, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  rotateCard: { backgroundColor: '#111', border: '2px solid #ff003c', borderRadius: '20px', padding: '40px 30px', maxWidth: '400px', width: '100%', textAlign: 'center' },
  rotateText: { color: '#fff', fontSize: '18px', margin: '20px 0', lineHeight: '1.6', fontFamily: "'Courier New', monospace" },
  rotateOkBtn: { padding: '12px 40px', backgroundColor: '#ff003c', color: '#fff', border: 'none', borderRadius: '30px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' },

  fullscreenCallOverlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#000', zIndex: 99995, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  returnBtn: { position: 'absolute', top: '20px', left: '20px', backgroundColor: 'rgba(255,0,60,0.3)', border: '1px solid #ff003c', borderRadius: '30px', padding: '10px 20px', color: '#fff', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', zIndex: 10 },
  fullscreenCallContentNoBall: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '30px', width: '100%', maxWidth: '500px', flex: 1 },
  fullscreenListeningStatus: { display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'rgba(255,255,255,0.05)', padding: '8px 20px', borderRadius: '30px', border: '1px solid rgba(255,0,60,0.2)' },
  fullscreenListeningDot: { width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#4f8', boxShadow: '0 0 20px #4f8', animation: 'pulseText 0.8s ease-in-out infinite' },
  fullscreenSpeakingDot: { width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff003c', boxShadow: '0 0 20px #ff003c', animation: 'pulseText 0.8s ease-in-out infinite' },
  fullscreenStatusText: { color: '#fff', fontSize: '18px', fontWeight: 'bold', letterSpacing: '1px' },
  fullscreenTranscript: { color: '#ff6688', fontSize: '16px', fontStyle: 'italic', padding: '8px 20px', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '12px', maxWidth: '90%', textAlign: 'center', border: '1px solid rgba(255,0,60,0.2)', minHeight: '40px' },
  fullscreenMicBtn: { width: 'clamp(70px, 14vw, 100px)', height: 'clamp(70px, 14vw, 100px)', borderRadius: '50%', backgroundColor: '#ff003c', border: '3px solid #ff003c', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 60px rgba(255,0,60,0.4)' },

  terminalFullscreen: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#0a0a0a', zIndex: 100001, display: 'flex', flexDirection: 'column' },
  terminalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', backgroundColor: '#111', borderBottom: '1px solid #333' },
  terminalBackBtn: { background: 'none', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '15px' },
  terminalTitle: { color: '#4f8', fontSize: '15px', fontFamily: "'Courier New', monospace", fontWeight: 'bold' },
  terminalClearBtn: { background: 'none', border: '1px solid #333', color: '#888', padding: '4px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },
  terminalBody: { flex: 1, overflowY: 'auto', padding: '16px', backgroundColor: '#000', fontFamily: "'Courier New', monospace", fontSize: '13px', lineHeight: '1.5' },
  terminalLine: { margin: '2px 0', whiteSpace: 'pre-wrap', wordBreak: 'break-word' },
  terminalInputRow: { display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', backgroundColor: '#111', borderTop: '1px solid #333' },
  terminalPrompt: { color: '#4f8', fontWeight: 'bold', fontSize: '16px', fontFamily: "'Courier New', monospace" },
  terminalInput: { flex: 1, padding: '8px 12px', backgroundColor: '#000', border: '1px solid #333', color: '#fff', borderRadius: '4px', fontSize: '14px', fontFamily: "'Courier New', monospace", outline: 'none' },
  terminalSendBtn: { padding: '8px 14px', backgroundColor: '#ff003c', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' },

  abilitiesFullscreen: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#000', zIndex: 100001, display: 'flex', flexDirection: 'column' },
  abilitiesBody: { flex: 1, overflowY: 'auto', padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' },
  abilityCard: { display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', backgroundColor: '#111', border: '1px solid #333', borderRadius: '10px' },
  abilityIcon: { fontSize: '26px', flexShrink: 0 },
  abilityTitle: { color: '#fff', fontWeight: 'bold', fontSize: '15px', marginBottom: '2px' },
  abilityDesc: { color: '#888', fontSize: '12px', lineHeight: '1.4' },

  chatOverviewContainer: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#000', zIndex: 99994, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  chatOverviewHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: '#111', borderBottom: '1px solid #333', flexShrink: 0 },
  chatOverviewBackBtn: { background: 'none', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', cursor: 'pointer' },
  chatOverviewTitle: { color: '#ff003c', fontSize: '18px', fontWeight: 'bold' },
  chatOverviewVoiceToggle: { background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px' },
  chatOverviewMessages: { flex: 1, overflowY: 'auto', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '8px' },
  chatOverviewEmpty: { color: '#666', textAlign: 'center', fontSize: '16px', marginTop: '40px' },
  chatOverviewMsg: { maxWidth: '80%', padding: '10px 14px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '4px', position: 'relative' },
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

  profileContainer: { backgroundColor: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
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

  sidebarOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 998 },
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
  toolBtnSmall: { padding: '5px 10px', backgroundColor: '#1a1a1a', color: '#fff', border: '1px solid #333', borderRadius: '4px', cursor: 'pointer', width: '100%', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 'bold' },
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
  settingsBtnPC: { backgroundColor: 'rgba(0,0,0,0.6)', border: '1px solid #333', borderRadius: '16px', padding: '4px 10px', display: 'flex', alignItems: 'center', cursor: 'pointer', color: '#fff' },

  floatingBtn: { position: 'absolute', bottom: '150px', right: '25px', width: '56px', height: '56px', borderRadius: '50%', border: '2px solid', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.5)', transition: 'all 0.3s ease' },

  mainContentAndroid: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', height: '100vh', margin: 0, padding: 0 },
  backgroundAndroid: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 0, background: 'radial-gradient(ellipse at center, #0a0000 0%, #000 100%)' },
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

  appPC: { minHeight: '100vh', height: '100vh', backgroundColor: '#000', color: '#e0e0e0', fontFamily: "'Segoe UI', 'Courier New', monospace", overflow: 'hidden', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '100vw' },
  headerPC: { padding: '6px 12px', borderBottom: '1px solid rgba(255,0,60,0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0, backgroundColor: '#0a0000', flexWrap: 'wrap', gap: '4px', minHeight: '44px' },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' },
  titlePC: { color: '#ff003c', margin: 0, fontSize: 'clamp(16px, 4vw, 22px)', fontWeight: 'bold', letterSpacing: '2px' },
  versionBadgePC: { fontSize: '10px', color: '#ff6688', backgroundColor: '#ff003c20', padding: '2px 8px', borderRadius: '10px' },
  headerRight: { display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' },
  callBtnPC: { backgroundColor: 'rgba(0,0,0,0.6)', border: '1px solid #ff003c', borderRadius: '16px', padding: '3px 10px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', color: '#ff003c', fontSize: '11px', fontWeight: 'bold' },
  callBtnPCActive: { borderColor: '#4f8', color: '#4f8' },
  voiceBtnPC: { backgroundColor: 'rgba(0,0,0,0.6)', border: '1px solid #ff003c', borderRadius: '16px', padding: '3px 10px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', color: '#ff003c', fontSize: '11px', fontWeight: 'bold' },
  voiceBtnPCActive: { backgroundColor: '#ff003c', color: '#fff', borderColor: '#ff003c' },
  menuBtnPC: { backgroundColor: 'transparent', border: 'none', cursor: 'pointer', padding: '2px' },
  pcLayout: { flex: 1, display: 'flex', flexDirection: 'row', overflow: 'hidden', width: '100%', height: '100%' },
  pcSidebar: { width: 'clamp(180px, 30%, 280px)', backgroundColor: '#0a0a0a', overflowY: 'auto', padding: '8px 10px', flexShrink: 0, borderRight: '1px solid #333', height: '100%', boxSizing: 'border-box' },
  pcSidebarSection: { marginBottom: '12px', borderBottom: '1px solid #1a1a1a', paddingBottom: '8px' },
  pcSidebarTitle: { color: '#ff003c', fontSize: '12px', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold', letterSpacing: '0.5px' },
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
  eventTimePC: { color: '#ff6688', fontSize: '11px' },
  sidebarOverlayPC: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 998 },
  sidebarPC: { position: 'fixed', top: 0, right: 0, bottom: 0, width: '280px', maxWidth: '85vw', backgroundColor: '#0a0000', borderLeft: '2px solid #ff003c', zIndex: 999, overflowY: 'auto', padding: '16px' },
  sidebarHeaderPC: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '8px', borderBottom: '1px solid #333' },
  sidebarTitlePC: { color: '#ff003c', fontSize: '16px', fontWeight: 'bold', margin: 0, fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px' },
  closeBtnPC: { backgroundColor: 'transparent', border: 'none', color: '#888', fontSize: '20px', cursor: 'pointer', padding: '4px', display: 'flex' },
  sidebarSectionPC: { marginBottom: '16px' },
  sectionTitlePC: { color: '#ff003c', fontSize: '13px', margin: '0 0 8px 0', paddingBottom: '4px', borderBottom: '1px solid #333', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px' },
  settingRowPC: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' },
  settingLabelPC: { fontSize: '12px', color: '#ddd' },
  toggleBtnPC2: { padding: '4px 10px', borderRadius: '4px', border: '1px solid #ff003c', backgroundColor: 'transparent', color: '#ff003c', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' },
  profileCardSidebarPC: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' },
  profileAvatarWrapperPC: { flexShrink: 0 },
  profileAvatarPC: { width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ff003c' },
  profileAvatarPlaceholderPC: { width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#ff003c', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '14px', fontWeight: 'bold' },
  profileInfoPC: { display: 'flex', flexDirection: 'column' },
  profileNamePC: { color: '#fff', fontWeight: 'bold', fontSize: '13px' },
  profileHandlePC: { color: '#888', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '2px' },
  sidebarBtnPC: { padding: '5px 10px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '12px' },
  dangerBtnPC: { padding: '5px 10px', backgroundColor: '#880000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '12px' },
  logoutBtnPC: { padding: '5px 10px', backgroundColor: '#880000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '12px' },
  inputRow: { display: 'flex', gap: '6px', marginTop: '4px', marginBottom: '6px' },
  textInputSmall: { flex: 1, padding: '6px 10px', backgroundColor: '#000', border: '1px solid #333', color: '#fff', borderRadius: '4px', fontSize: '13px', outline: 'none' },
  sendBtnSmall: { padding: '6px 12px', backgroundColor: '#ff003c', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
      }
