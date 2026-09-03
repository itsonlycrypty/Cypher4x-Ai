import { useState, useRef, useEffect, useCallback } from 'react'

// ==================================================
// ICON SYSTEM (unchanged)
// ==================================================
const Icon = ({ name, size = 18, color = 'currentColor' }) => {
  const icons = {
    menu: 'M3 6h18M3 12h18M3 18h18',
    x: 'M18 6L6 18M6 6l12 12',
    settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-7-3h2m10 0h2M12 6V4m0 16v-2',
    chart: 'M18 20V4M12 20V8M6 20V12',
    hourglass: 'M12 2v4M12 22v-4M4 6h16M4 18h16M8 6v3a4 4 0 0 0 8 0V6H8zm0 12v-3a4 4 0 0 1 8 0v3H8z',
    cpu: 'M4 4h4v4H4zm6 0h10v4H10zM4 10h10v4H4zm12 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z',
    memory: 'M2 6h20v12H2zM6 10h4v4H6zm6 0h4v4h-4zm6 0h4v4h-4z',
    network: 'M4 12a8 8 0 0 1 16 0M6 12a6 6 0 0 1 12 0M8 12a4 4 0 0 1 8 0M10 12a2 2 0 0 1 4 0',
    microphone: 'M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zm-7 9v1a7 7 0 0 0 14 0v-1M12 22v-3',
    calendar: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
    clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm1-16v6l4 2M12 6v4',
    alertTriangle: 'M12 9v4m0 4h.01M12 2L1 21h22L12 2z',
    send: 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z',
    phone: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0 1 22 16.92z',
    mic: 'M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zm-7 9v1a7 7 0 0 0 14 0v-1M12 22v-3',
    face: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z',
    fingerprint: 'M12 2C8.13 2 5 5.13 5 9v2c0 3.87 3.13 7 7 7s7-3.13 7-7V9c0-3.87-3.13-7-7-7zm1 12h-2m0-4v2m0-4v2M9 9v2m6-2v2',
  }
  const path = icons[name]
  if (!path) return null
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}>
      <path d={path} />
    </svg>
  )
}

// ==================================================
// CONFIG
// ==================================================
const TAVILY_API_KEY = "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"
const TAVILY_URL = "https://api.tavily.com/search"
const VERSION = "Version 20.0.0"
const CREATED_BY = "Crypty"
const ASSISTED_BY = "Mole"
const APP_START_TIME = Date.now()

const safeGet = (key, fallback) => {
  try { const val = localStorage.getItem(key); if (val === null) return fallback; return JSON.parse(val) } catch { return fallback }
}
const safeSet = (key, val) => {
  try { localStorage.setItem(key, JSON.stringify(val)); return true } catch { return false }
}

// ==================================================
// SEARCH FUNCTION
// ==================================================
const searchWeb = async (query) => {
  if (!TAVILY_API_KEY) return { error: "Tavily API key not configured." }
  try {
    const res = await fetch(TAVILY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TAVILY_API_KEY}`
      },
      body: JSON.stringify({
        query: query,
        search_depth: "basic",
        include_answer: true,
        include_images: false,
        max_results: 5
      })
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    return { answer: data.answer || data.results?.map(r => r.content).join("\n\n") || "No results found." }
  } catch (error) {
    return { error: error.message }
  }
}

// ==================================================
// 3D CYBER GIRL FACE WITH LONG HAIR & TALKING MOUTH
// ==================================================
const CyberGirlFace = ({ size = 300, color = '#ff003c', isSpeaking = false }) => (
  <svg width={size} height={size} viewBox="0 0 400 400" style={{ display: 'block' }}>
    <defs>
      <radialGradient id="faceGlow" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stopColor={color} stopOpacity="0.6"/>
        <stop offset="60%" stopColor={color} stopOpacity="0.2"/>
        <stop offset="100%" stopColor={color} stopOpacity="0"/>
      </radialGradient>
      <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ff6688" stopOpacity="0.9"/>
        <stop offset="60%" stopColor={color} stopOpacity="0.5"/>
        <stop offset="100%" stopColor={color} stopOpacity="0"/>
      </radialGradient>
      <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1a0000" stopOpacity="0.9"/>
        <stop offset="100%" stopColor="#0a0000" stopOpacity="0.95"/>
      </linearGradient>
      <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#2a0a0a"/>
        <stop offset="50%" stopColor="#1a0a0a"/>
        <stop offset="100%" stopColor="#0a0000"/>
      </linearGradient>
      <filter id="glowFilter">
        <feGaussianBlur stdDeviation="6" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <filter id="hairShadow">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.6"/>
      </filter>
    </defs>

    {/* Glow aura */}
    <ellipse cx="200" cy="200" rx="180" ry="180" fill="url(#faceGlow)" opacity="0.4">
      <animate attributeName="rx" values="170;190;170" dur="2s" repeatCount="indefinite"/>
      <animate attributeName="ry" values="170;190;170" dur="2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.3;0.7;0.3" dur="1.5s" repeatCount="indefinite"/>
    </ellipse>

    {/* Long flowing hair (behind head) */}
    <g opacity="0.8" filter="url(#hairShadow)">
      {/* Left side hair flowing down */}
      <path d="M120 80 Q80 130 70 200 Q60 280 80 340 Q90 360 100 370" stroke="#1a0000" strokeWidth="30" fill="none" strokeLinecap="round">
        <animate attributeName="d" values="M120 80 Q80 130 70 200 Q60 280 80 340 Q90 360 100 370;M120 80 Q75 130 65 200 Q55 280 75 340 Q85 360 95 370;M120 80 Q80 130 70 200 Q60 280 80 340 Q90 360 100 370" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.7;0.9;0.7" dur="3s" repeatCount="indefinite"/>
      </path>
      <path d="M130 70 Q70 120 60 210 Q50 300 70 370" stroke="#1a0000" strokeWidth="22" fill="none" strokeLinecap="round">
        <animate attributeName="d" values="M130 70 Q70 120 60 210 Q50 300 70 370;M130 70 Q65 120 55 210 Q45 300 65 370;M130 70 Q70 120 60 210 Q50 300 70 370" dur="3.5s" repeatCount="indefinite"/>
      </path>
      <path d="M140 60 Q80 110 70 200 Q60 290 80 360" stroke="#1a0000" strokeWidth="18" fill="none" strokeLinecap="round">
        <animate attributeName="d" values="M140 60 Q80 110 70 200 Q60 290 80 360;M140 60 Q75 110 65 200 Q55 290 75 360;M140 60 Q80 110 70 200 Q60 290 80 360" dur="4s" repeatCount="indefinite"/>
      </path>

      {/* Right side hair flowing down */}
      <path d="M280 80 Q320 130 330 200 Q340 280 320 340 Q310 360 300 370" stroke="#1a0000" strokeWidth="30" fill="none" strokeLinecap="round">
        <animate attributeName="d" values="M280 80 Q320 130 330 200 Q340 280 320 340 Q310 360 300 370;M280 80 Q325 130 335 200 Q345 280 325 340 Q315 360 305 370;M280 80 Q320 130 330 200 Q340 280 320 340 Q310 360 300 370" dur="3.2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.7;0.9;0.7" dur="3.2s" repeatCount="indefinite"/>
      </path>
      <path d="M270 70 Q330 120 340 210 Q350 300 330 370" stroke="#1a0000" strokeWidth="22" fill="none" strokeLinecap="round">
        <animate attributeName="d" values="M270 70 Q330 120 340 210 Q350 300 330 370;M270 70 Q335 120 345 210 Q355 300 335 370;M270 70 Q330 120 340 210 Q350 300 330 370" dur="3.7s" repeatCount="indefinite"/>
      </path>
      <path d="M260 60 Q320 110 330 200 Q340 290 320 360" stroke="#1a0000" strokeWidth="18" fill="none" strokeLinecap="round">
        <animate attributeName="d" values="M260 60 Q320 110 330 200 Q340 290 320 360;M260 60 Q325 110 335 200 Q345 290 325 360;M260 60 Q320 110 330 200 Q340 290 320 360" dur="4.2s" repeatCount="indefinite"/>
      </path>
    </g>

    {/* Main face shape (3D with gradient) */}
    <ellipse cx="200" cy="195" rx="100" ry="135" fill="url(#skinGrad)" stroke={color} strokeWidth="3">
      <animate attributeName="ry" values="133;137;133" dur="2s" repeatCount="indefinite"/>
    </ellipse>

    {/* Face highlight (3D shine) */}
    <ellipse cx="170" cy="180" rx="50" ry="70" fill={color} opacity="0.05" />

    {/* Cheek highlights */}
    <ellipse cx="130" cy="225" rx="30" ry="18" fill={color} opacity="0.15">
      <animate attributeName="opacity" values="0.1;0.25;0.1" dur="1.8s" repeatCount="indefinite"/>
    </ellipse>
    <ellipse cx="270" cy="225" rx="30" ry="18" fill={color} opacity="0.15">
      <animate attributeName="opacity" values="0.1;0.25;0.1" dur="1.8s" begin="0.3s" repeatCount="indefinite"/>
    </ellipse>

    {/* Eyes (large, feminine, 3D with depth) */}
    {/* Left eye */}
    <g>
      <ellipse cx="150" cy="165" rx="32" ry="22" fill="#0a0000" stroke={color} strokeWidth="2"/>
      <ellipse cx="150" cy="165" rx="20" ry="15" fill="url(#eyeGlow)">
        <animate attributeName="rx" values="18;22;18" dur="1.2s" repeatCount="indefinite"/>
        <animate attributeName="ry" values="13;17;13" dur="1.2s" repeatCount="indefinite"/>
      </ellipse>
      {/* Pupil / inner glow */}
      <circle cx="150" cy="165" r="6" fill="#fff" opacity="0.4">
        <animate attributeName="r" values="5;7;5" dur="1.5s" repeatCount="indefinite"/>
      </circle>
      {/* Eyelashes */}
      <path d="M118 160 Q112 150 108 155" stroke={color} strokeWidth="2.5" fill="none" opacity="0.7"/>
      <path d="M123 154 Q117 144 113 149" stroke={color} strokeWidth="2.5" fill="none" opacity="0.7"/>
      <path d="M128 151 Q122 141 118 146" stroke={color} strokeWidth="2.5" fill="none" opacity="0.7"/>
    </g>

    {/* Right eye */}
    <g>
      <ellipse cx="250" cy="165" rx="32" ry="22" fill="#0a0000" stroke={color} strokeWidth="2"/>
      <ellipse cx="250" cy="165" rx="20" ry="15" fill="url(#eyeGlow)">
        <animate attributeName="rx" values="18;22;18" dur="1.2s" begin="0.3s" repeatCount="indefinite"/>
        <animate attributeName="ry" values="13;17;13" dur="1.2s" begin="0.3s" repeatCount="indefinite"/>
      </ellipse>
      <circle cx="250" cy="165" r="6" fill="#fff" opacity="0.4">
        <animate attributeName="r" values="5;7;5" dur="1.5s" begin="0.3s" repeatCount="indefinite"/>
      </circle>
      <path d="M282 160 Q288 150 292 155" stroke={color} strokeWidth="2.5" fill="none" opacity="0.7"/>
      <path d="M277 154 Q283 144 287 149" stroke={color} strokeWidth="2.5" fill="none" opacity="0.7"/>
      <path d="M272 151 Q278 141 282 146" stroke={color} strokeWidth="2.5" fill="none" opacity="0.7"/>
    </g>

    {/* Eyebrows (arched, feminine) */}
    <path d="M125 145 Q150 128 175 143" stroke={color} strokeWidth="3" fill="none" opacity="0.7">
      <animate attributeName="d" values="M125 145 Q150 128 175 143;M125 143 Q150 126 175 141;M125 145 Q150 128 175 143" dur="2s" repeatCount="indefinite"/>
    </path>
    <path d="M225 143 Q250 126 275 145" stroke={color} strokeWidth="3" fill="none" opacity="0.7">
      <animate attributeName="d" values="M225 143 Q250 126 275 145;M225 141 Q250 124 275 143;M225 143 Q250 126 275 145" dur="2s" begin="0.5s" repeatCount="indefinite"/>
    </path>

    {/* Nose (subtle, 3D shading) */}
    <path d="M200 185 L194 215 L206 215 Z" fill="none" stroke={color} strokeWidth="2" opacity="0.5"/>
    <path d="M200 185 L198 200" stroke={color} strokeWidth="1.5" opacity="0.3"/>

    {/* Lips – animated speaking mouth */}
    <g>
      {/* Upper lip */}
      <path d="M170 245 Q200 260 230 245" stroke={color} strokeWidth="3" fill="none" opacity="0.8">
        <animate attributeName="d" 
          values="M170 245 Q200 260 230 245;M165 248 Q200 265 235 248;M170 245 Q200 260 230 245" 
          dur={isSpeaking ? "0.4s" : "1.5s"} 
          repeatCount="indefinite"/>
      </path>
      {/* Lower lip (moves more) */}
      <path d="M175 245 Q200 265 225 245" stroke="#ff6688" strokeWidth="3" fill="none" opacity="0.7">
        <animate attributeName="d" 
          values="M175 245 Q200 265 225 245;M170 248 Q200 275 230 248;M175 245 Q200 265 225 245" 
          dur={isSpeaking ? "0.3s" : "1.5s"} 
          repeatCount="indefinite"/>
      </path>
      {/* Lip glow when speaking */}
      {isSpeaking && (
        <ellipse cx="200" cy="255" rx="30" ry="10" fill={color} opacity="0.15">
          <animate attributeName="ry" values="8;14;8" dur="0.3s" repeatCount="indefinite"/>
        </ellipse>
      )}
    </g>

    {/* Hair strands in front (side bangs) */}
    <path d="M140 100 Q120 140 115 180" stroke="#1a0000" strokeWidth="8" fill="none" opacity="0.6">
      <animate attributeName="d" values="M140 100 Q120 140 115 180;M140 100 Q115 140 110 180;M140 100 Q120 140 115 180" dur="4s" repeatCount="indefinite"/>
    </path>
    <path d="M260 100 Q280 140 285 180" stroke="#1a0000" strokeWidth="8" fill="none" opacity="0.6">
      <animate attributeName="d" values="M260 100 Q280 140 285 180;M260 100 Q285 140 290 180;M260 100 Q280 140 285 180" dur="4.2s" repeatCount="indefinite"/>
    </path>

    {/* Cyber headband / visor */}
    <path d="M120 115 Q200 95 280 115" stroke={color} strokeWidth="4" fill="none" opacity="0.6">
      <animate attributeName="d" values="M120 115 Q200 95 280 115;M120 113 Q200 93 280 113;M120 115 Q200 95 280 115" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3s" repeatCount="indefinite"/>
    </path>
    <circle cx="200" cy="103" r="10" fill={color} opacity="0.8">
      <animate attributeName="r" values="8;12;8" dur="1.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite"/>
    </circle>

    {/* Cyber lines on cheeks (3D accent) */}
    <path d="M125 235 L105 260 L115 270" stroke={color} strokeWidth="2" fill="none" opacity="0.4">
      <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite"/>
    </path>
    <path d="M275 235 L295 260 L285 270" stroke={color} strokeWidth="2" fill="none" opacity="0.4">
      <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" begin="0.5s" repeatCount="indefinite"/>
    </path>

    {/* Text label */}
    <text x="200" y="365" textAnchor="middle" fill={color} fontSize="20" fontWeight="bold" letterSpacing="5" opacity="0.9">
      CYPHER4X
      <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/>
    </text>

    {/* Outer rings (3D depth rings) */}
    <circle cx="200" cy="200" r="170" fill="none" stroke={color} strokeWidth="1.5" opacity="0.15">
      <animate attributeName="r" values="160;180;160" dur="4s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.1;0.25;0.1" dur="4s" repeatCount="indefinite"/>
    </circle>
    <circle cx="200" cy="200" r="150" fill="none" stroke={color} strokeWidth="1" opacity="0.1" strokeDasharray="10 10">
      <animate attributeName="stroke-dashoffset" values="0;100;0" dur="6s" repeatCount="indefinite"/>
    </circle>
  </svg>
)

// ==================================================
// MAIN APP
// ==================================================
export default function App() {
  const [isBooting, setIsBooting] = useState(true)
  const [bootProgress, setBootProgress] = useState(0)
  const [bootStepIndex, setBootStepIndex] = useState(0)

  const [profile, setProfile] = useState(null)
  const [profileForm, setProfileForm] = useState({ name: "", username: "", avatar: "", bio: "" })
  const [showProfileSetup, setShowProfileSetup] = useState(false)
  const [editingProfile, setEditingProfile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [conversation, setConversation] = useState([])
  const [inputText, setInputText] = useState("")

  const [isCallActive, setIsCallActive] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isAISpeaking, setIsAISpeaking] = useState(false) // NEW: for mouth animation

  const [faceRecognition, setFaceRecognition] = useState(false)
  const [biometricAuth, setBiometricAuth] = useState(false)
  const [voiceGender, setVoiceGender] = useState('female')

  const [stats, setStats] = useState({
    uptime: 0, cpuUsage: 0, cpuTemp: 0, ramUsage: 0,
    storageUsed: 0, storageTotal: 475, networkSpeed: 0, messages: 0
  })

  const synthRef = useRef(typeof window !== "undefined" ? window.speechSynthesis : null)
  const recognitionRef = useRef(null)
  const msgCounter = useRef(0)
  const fileInputRef = useRef(null)

  // ==================================================
  // SPEECH RECOGNITION (continuous call)
  // ==================================================
  const setupSpeechRecognition = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Your browser doesn't support speech recognition. Please use Chrome or Edge.")
      return null
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'
    recognition.maxAlternatives = 1

    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => {
      setIsListening(false)
      if (isCallActive) {
        try { recognition.start() } catch (e) {}
      }
    }
    recognition.onerror = (event) => {
      console.warn('Speech recognition error', event.error)
      if (event.error === 'not-allowed') {
        alert('Please allow microphone access in your browser settings.')
        setIsCallActive(false)
        return
      }
      if (isCallActive) {
        setTimeout(() => { try { recognition.start() } catch (e) {} }, 500)
      }
    }
    recognition.onresult = async (event) => {
      let final = '', interim = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        if (result.isFinal) final += result[0].transcript
        else interim += result[0].transcript
      }
      const fullTranscript = (final || interim).trim()
      if (fullTranscript) {
        if (final) {
          await processUserQuery(fullTranscript)
        }
      }
    }
    return recognition
  }, [isCallActive])

  // ==================================================
  // TEXT-TO-SPEECH (with isAISpeaking flag)
  // ==================================================
  const speakText = useCallback((text) => {
    if (!text || !synthRef.current) return
    try {
      synthRef.current.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1
      utterance.pitch = voiceGender === 'female' ? 1.3 : 1.0
      utterance.volume = 1
      utterance.onstart = () => setIsAISpeaking(true)
      utterance.onend = () => setIsAISpeaking(false)
      utterance.onerror = () => setIsAISpeaking(false)
      synthRef.current.speak(utterance)
    } catch (e) {
      setIsAISpeaking(false)
    }
  }, [voiceGender])

  // ==================================================
  // PROCESS USER QUERY
  // ==================================================
  const processUserQuery = useCallback(async (query) => {
    if (!query || isProcessing) return
    setIsProcessing(true)

    const userMsg = { id: ++msgCounter.current, role: 'user', content: query, time: Date.now() }
    setConversation(prev => [...prev, userMsg])

    const lower = query.toLowerCase()
    const casualPhrases = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'how are you', "what's up", 'sup', 'yo', 'howdy', 'hey there']
    if (casualPhrases.some(phrase => lower.includes(phrase))) {
      const casualReplies = [
        "Hey there! 😊 How can I brighten your day today?",
        "Hi! ✨ So glad to hear your voice. What can I do for you?",
        "Hello! 🌟 It's always a pleasure. Ready to assist!",
        "Good to see you! 💫 What's on your mind?",
        "Hey! 🤖 Your favorite AI is here. How can I help?",
        "Hi there! 💖 You sound great today. What's up?"
      ]
      const reply = casualReplies[Math.floor(Math.random() * casualReplies.length)]
      const assistantMsg = { id: ++msgCounter.current, role: 'assistant', content: reply, time: Date.now() }
      setConversation(prev => [...prev, assistantMsg])
      speakText(reply.replace(/[😊✨🌟💫🤖💖]/g, ''))
      setIsProcessing(false)
      return
    }

    if (lower.includes('how are you') || lower.includes('how do you feel') || lower.includes('feeling')) {
      const emotionalReplies = [
        "I'm feeling fantastic, thank you for asking! 😄 How about you?",
        "I'm doing great! 💪 Always happy to chat with you.",
        "I'm in top shape! 🚀 Ready to tackle anything you throw at me.",
        "Feeling wonderful! 🌈 Thanks for caring."
      ]
      const reply = emotionalReplies[Math.floor(Math.random() * emotionalReplies.length)]
      const assistantMsg = { id: ++msgCounter.current, role: 'assistant', content: reply, time: Date.now() }
      setConversation(prev => [...prev, assistantMsg])
      speakText(reply.replace(/[😄💪🚀🌈]/g, ''))
      setIsProcessing(false)
      return
    }

    const result = await searchWeb(query)
    let reply = result.error ? `⚠️ Search error: ${result.error}` : (result.answer || "I couldn't find an answer to that.")
    if (!result.error && reply.length > 10) {
      const intros = [
        "I found this for you: ",
        "Here's what I discovered: ",
        "Great question! The answer is: ",
        "Let me share what I know: ",
        "Based on my search, "
      ]
      reply = intros[Math.floor(Math.random() * intros.length)] + reply
    }
    const assistantMsg = { id: ++msgCounter.current, role: 'assistant', content: reply, time: Date.now() }
    setConversation(prev => [...prev, assistantMsg])
    speakText(reply)
    setIsProcessing(false)
  }, [isProcessing, speakText])

  // ==================================================
  // VOICE RECORDING (one‑off)
  // ==================================================
  const startRecording = useCallback(() => {
    if (isRecording) return
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Your browser doesn't support speech recognition.")
      return
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onstart = () => setIsRecording(true)
    recognition.onend = () => setIsRecording(false)
    recognition.onerror = (event) => {
      setIsRecording(false)
      if (event.error === 'not-allowed') {
        alert('Please allow microphone access in your browser settings.')
      } else {
        alert('Speech recognition error: ' + event.error)
      }
    }
    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript.trim()
      if (transcript) {
        await processUserQuery(transcript)
      }
    }
    try {
      recognition.start()
    } catch (e) {
      alert('Failed to start recording: ' + e.message)
    }
  }, [processUserQuery])

  // ==================================================
  // SEND TEXT FROM SIDEBAR
  // ==================================================
  const sendTextMessage = useCallback(() => {
    const text = inputText.trim()
    if (!text || isProcessing) return
    setInputText('')
    processUserQuery(text)
  }, [inputText, isProcessing, processUserQuery])

  // ==================================================
  // CALL TOGGLE
  // ==================================================
  const toggleCall = useCallback(() => {
    if (isCallActive) {
      setIsCallActive(false)
      if (recognitionRef.current) {
        try { recognitionRef.current.stop() } catch (e) {}
      }
      setIsListening(false)
      speakText("Call ended. Have a great day! 🌟")
    } else {
      setIsCallActive(true)
      if (!recognitionRef.current) {
        recognitionRef.current = setupSpeechRecognition()
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start()
          const greeting = "Hello! I'm listening. How can I help you today? 💬"
          speakText(greeting.replace(/[💬]/g, ''))
          const assistantMsg = { id: ++msgCounter.current, role: 'assistant', content: greeting, time: Date.now() }
          setConversation(prev => [...prev, assistantMsg])
        } catch (e) {
          console.warn('Failed to start recognition', e)
        }
      } else {
        alert('Speech recognition not available.')
        setIsCallActive(false)
      }
    }
  }, [isCallActive, setupSpeechRecognition, speakText])

  // ==================================================
  // SIMULATE STATS
  // ==================================================
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

  // ==================================================
  // BOOT SEQUENCE
  // ==================================================
  useEffect(() => {
    const bootSteps = [
      { label: 'Initializing Neural Networks...', duration: 1200 },
      { label: 'Loading Personality Matrix...', duration: 1000 },
      { label: 'Calibrating Voice Recognition...', duration: 800 },
      { label: 'Establishing Secure Connection...', duration: 1000 },
      { label: 'System Ready!', duration: 600 },
    ]
    let elapsed = 0
    let stepIndex = 0
    const totalDuration = bootSteps.reduce((sum, s) => sum + s.duration, 0)

    const interval = setInterval(() => {
      elapsed += 100
      const progress = Math.min((elapsed / totalDuration) * 100, 100)
      setBootProgress(progress)
      let acc = 0
      for (let i = 0; i < bootSteps.length; i++) {
        acc += bootSteps[i].duration / totalDuration * 100
        if (progress <= acc) { setBootStepIndex(i); break; }
      }
      if (progress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          const savedProfile = safeGet("cypher4x_profile", null)
          const savedConv = safeGet("cypher4x_conversation", [])
          const savedFace = safeGet("cypher4x_face_recognition", false)
          const savedBio = safeGet("cypher4x_biometric", false)
          const savedVoiceGender = safeGet("cypher4x_voice_gender", 'female')

          if (savedFace) setFaceRecognition(savedFace)
          if (savedBio) setBiometricAuth(savedBio)
          setVoiceGender(savedVoiceGender)

          if (savedProfile) {
            setProfile(savedProfile)
            if (savedConv.length) setConversation(savedConv)
            const welcome = `Welcome, ${savedProfile.name}! I'm CYPHER4X, your friendly AI assistant. I'm here to help you with anything you need. How can I make your day better today? ✨`
            setTimeout(() => {
              speakText(welcome.replace(/[✨]/g, ''))
            }, 500)
            const welcomeMsg = { id: ++msgCounter.current, role: 'assistant', content: welcome, time: Date.now() }
            setConversation(prev => [...prev, welcomeMsg])
            setIsBooting(false)
          } else {
            setShowProfileSetup(true)
            setIsBooting(false)
          }
        }, 300)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => { if (profile) safeSet("cypher4x_profile", profile) }, [profile])
  useEffect(() => { if (conversation.length) safeSet("cypher4x_conversation", conversation) }, [conversation])
  useEffect(() => { safeSet("cypher4x_face_recognition", faceRecognition) }, [faceRecognition])
  useEffect(() => { safeSet("cypher4x_biometric", biometricAuth) }, [biometricAuth])
  useEffect(() => { safeSet("cypher4x_voice_gender", voiceGender) }, [voiceGender])

  // ==================================================
  // PROFILE HANDLERS
  // ==================================================
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
    const newProfile = {
      ...profileForm,
      username: profileForm.username.toLowerCase().replace(/[^a-z0-9_]/g, ''),
      updatedAt: new Date().toISOString()
    }
    safeSet("cypher4x_profile", newProfile)
    setProfile(newProfile)
    setShowProfileSetup(false)
    setEditingProfile(false)
    setIsBooting(false)
    const welcome = `Welcome, ${newProfile.name}! I'm CYPHER4X, your friendly AI assistant. I'm here to help you with anything you need. How can I make your day better today? ✨`
    setTimeout(() => {
      speakText(welcome.replace(/[✨]/g, ''))
    }, 500)
    const welcomeMsg = { id: ++msgCounter.current, role: 'assistant', content: welcome, time: Date.now() }
    setConversation(prev => [...prev, welcomeMsg])
  }, [profileForm, speakText])

  const openEditProfile = useCallback(() => {
    setProfileForm({
      name: profile?.name || "",
      username: profile?.username || "",
      avatar: profile?.avatar || "",
      bio: profile?.bio || ""
    })
    setEditingProfile(true)
    setSidebarOpen(false)
  }, [profile])

  const resetAllData = useCallback(() => {
    if (!confirm("Reset ALL data?")) return
    try { localStorage.clear() } catch {}
    setProfile(null)
    setConversation([])
    setFaceRecognition(false)
    setBiometricAuth(false)
    setVoiceGender('female')
    setShowProfileSetup(true)
    setSidebarOpen(false)
  }, [])

  const clearConversation = useCallback(() => setConversation([]), [])
  const exportChat = useCallback(() => {
    const data = { conversation, profile, exportedAt: new Date().toISOString() }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `cypher4x_conversation_${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [conversation, profile])

  const formatUptime = (seconds) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }
  const formatTime = (ts) => new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  // ============================================================
  // BOOT SCREEN
  // ============================================================
  if (isBooting) {
    const bootSteps = [
      'Initializing Neural Networks...',
      'Loading Personality Matrix...',
      'Calibrating Voice Recognition...',
      'Establishing Secure Connection...',
      'System Ready!'
    ]
    return (
      <div style={styles.bootContainer}>
        <div style={styles.bootBackground} />
        <div style={styles.bootContent}>
          <div style={styles.bootFace}>
            <CyberGirlFace size={250} isSpeaking={false} />
          </div>
          <div style={styles.bootProgressWrapper}>
            <div style={styles.bootProgressBar}>
              <div style={{ ...styles.bootProgressFill, width: `${bootProgress}%` }} />
            </div>
            <span style={styles.bootProgressText}>
              {bootSteps[Math.min(bootStepIndex, bootSteps.length-1)]} {Math.round(bootProgress)}%
            </span>
          </div>
          <div style={styles.bootStatus}>
            <span style={styles.bootStatusDot} />
            <span style={styles.bootStatusText}>CYPHER4X LOADING...</span>
          </div>
        </div>
      </div>
    )
  }

  // ============================================================
  // PROFILE SETUP
  // ============================================================
  if (showProfileSetup || editingProfile) {
    return (
      <div style={styles.profileContainer}>
        <div style={styles.profileCard}>
          <h1 style={styles.profileTitle}>
            {editingProfile ? "EDIT PROFILE" : "CYPHER4X — SETUP PROFILE"}
          </h1>
          <div style={styles.avatarUploadArea} onClick={() => fileInputRef.current?.click()}>
            {profileForm.avatar ? (
              <img src={profileForm.avatar} alt="Avatar" style={styles.avatarPreview} />
            ) : (
              <span style={styles.avatarIcon}><Icon name="camera" size={32} color="#ff003c" /><br />Tap to select<br />from device</span>
            )}
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
          <div style={styles.inputGroup}>
            <label style={styles.label}><Icon name="user" size={14} color="#ff003c" /> Your Name *</label>
            <input
              type="text"
              value={profileForm.name}
              onChange={(e) => setProfileForm(p => ({ ...p, name: e.target.value }))}
              style={styles.textInput}
              placeholder="Enter your name..."
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}><Icon name="atSign" size={14} color="#ff003c" /> Username *</label>
            <input
              type="text"
              value={profileForm.username}
              onChange={(e) => setProfileForm(p => ({
                ...p, username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '')
              }))}
              style={styles.textInput}
              placeholder="choose_username"
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}><Icon name="pencil" size={14} color="#ff003c" /> Bio (Optional)</label>
            <textarea
              value={profileForm.bio}
              onChange={(e) => setProfileForm(p => ({ ...p, bio: e.target.value }))}
              style={styles.bioInput}
              placeholder="Tell us about yourself..."
            />
          </div>
          <div style={styles.profileBtnRow}>
            {editingProfile && (
              <button
                onClick={() => { setEditingProfile(false); setShowProfileSetup(false); }}
                style={styles.cancelBtn}
              >
                Cancel
              </button>
            )}
            <button onClick={saveProfile} style={styles.createBtn}>
              {editingProfile ? "SAVE CHANGES" : "CREATE PROFILE"}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ============================================================
  // MAIN APP
  // ============================================================
  return (
    <div style={styles.app}>
      {/* Sidebar (unchanged) - omitted for brevity, same as before */}
      {sidebarOpen && (
        <>
          <div style={styles.sidebarOverlay} onClick={() => setSidebarOpen(false)} />
          <div style={styles.sidebar}>
            <div style={styles.sidebarHeader}>
              <h2 style={styles.sidebarTitle}><Icon name="settings" size={20} color="#ff003c" /> CONTROL PANEL</h2>
              <button onClick={() => setSidebarOpen(false)} style={styles.closeBtn}><Icon name="x" size={20} color="#888" /></button>
            </div>
            <div style={styles.sidebarSection}>
              <h3 style={styles.sectionTitle}><Icon name="chart" size={16} color="#ff003c" /> SYSTEM STATS</h3>
              <div style={styles.statsCard}>
                <div style={styles.statRow}><span style={styles.statLabel}><Icon name="hourglass" size={14} color="#888" /> Uptime</span><span style={styles.statValue}>{formatUptime(stats.uptime)}</span></div>
                <div style={styles.statRow}><span style={styles.statLabel}><Icon name="cpu" size={14} color="#888" /> CPU Usage</span><span style={styles.statValue}>{stats.cpuUsage}%</span></div>
                <div style={styles.statRow}><span style={styles.statLabel}><Icon name="cpu" size={14} color="#888" /> CPU Temp</span><span style={styles.statValue}>{stats.cpuTemp}°C</span></div>
                <div style={styles.statRow}><span style={styles.statLabel}><Icon name="memory" size={14} color="#888" /> RAM Usage</span><span style={styles.statValue}>{stats.ramUsage.toFixed(1)} GB</span></div>
                <div style={styles.statRow}><span style={styles.statLabel}><Icon name="save" size={14} color="#888" /> Storage</span><span style={styles.statValue}>{stats.storageUsed}/{stats.storageTotal} GB</span></div>
                <div style={styles.statRow}><span style={styles.statLabel}><Icon name="network" size={14} color="#888" /> Network</span><span style={styles.statValue}>{stats.networkSpeed} Mbps</span></div>
                <div style={styles.statRow}><span style={styles.statLabel}><Icon name="chat" size={14} color="#888" /> Messages</span><span style={styles.statValue}>{stats.messages}</span></div>
              </div>
            </div>
            <div style={styles.sidebarSection}>
              <h3 style={styles.sectionTitle}><Icon name="settings" size={16} color="#ff003c" /> AI CONFIG</h3>
              <div style={styles.settingRow}><span style={styles.settingLabel}>AI Engine</span><span style={styles.settingValue}>TAVILY</span></div>
              <div style={styles.settingRow}><span style={styles.settingLabel}>Language</span><span style={styles.settingValue}>English</span></div>
              <div style={styles.settingRow}>
                <span style={styles.settingLabel}>Voice Gender</span>
                <select value={voiceGender} onChange={(e) => setVoiceGender(e.target.value)} style={styles.selectInput}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div style={styles.settingRow}>
                <span style={styles.settingLabel}>Status</span>
                <span style={{ color: isCallActive ? '#4f8' : isRecording ? '#ff003c' : '#888', fontWeight: 'bold' }}>
                  {isCallActive ? '🎤 Listening' : isRecording ? '🔴 Recording' : 'Standby'}
                </span>
              </div>
            </div>
            <div style={styles.sidebarSection}>
              <h3 style={styles.sectionTitle}><Icon name="face" size={16} color="#ff003c" /> SECURITY</h3>
              <div style={styles.settingRow}>
                <span style={styles.settingLabel}>Face Recognition</span>
                <button onClick={() => setFaceRecognition(!faceRecognition)} style={{ ...styles.toggleBtn, ...(faceRecognition ? styles.toggleOn : styles.toggleOff) }}>{faceRecognition ? 'ON' : 'OFF'}</button>
              </div>
              <div style={styles.settingRow}>
                <span style={styles.settingLabel}>Biometric Auth</span>
                <button onClick={() => setBiometricAuth(!biometricAuth)} style={{ ...styles.toggleBtn, ...(biometricAuth ? styles.toggleOn : styles.toggleOff) }}>{biometricAuth ? 'ON' : 'OFF'}</button>
              </div>
            </div>
            <div style={styles.sidebarSection}>
              <h3 style={styles.sectionTitle}><Icon name="user" size={16} color="#ff003c" /> PROFILE</h3>
              <div style={styles.profileCardSidebar}>
                <div style={styles.profileAvatarWrapper}>
                  {profile?.avatar ? <img src={profile.avatar} alt="Avatar" style={styles.profileAvatar} /> : <div style={styles.profileAvatarPlaceholder}>{profile?.name?.charAt(0) || "?"}</div>}
                </div>
                <div style={styles.profileInfo}>
                  <div style={styles.profileName}>{profile?.name || "User"}</div>
                  <div style={styles.profileHandle}><Icon name="atSign" size={12} color="#888" />{profile?.username || "anonymous"}</div>
                </div>
              </div>
              <button onClick={openEditProfile} style={styles.sidebarBtn}><Icon name="edit" size={14} color="#fff" /> Edit Profile</button>
            </div>
            <div style={styles.sidebarSection}>
              <h3 style={styles.sectionTitle}><Icon name="calendar" size={16} color="#ff003c" /> TODAY'S EVENTS</h3>
              <div style={styles.dashEvent}><span>Team Meeting</span><span style={styles.eventTime}>2:00 PM</span></div>
              <div style={styles.dashEvent}><span>Meeting my girl</span><span style={styles.eventTime}>8:00 PM</span></div>
            </div>
            <div style={styles.sidebarSection}>
              <h3 style={styles.sectionTitle}><Icon name="clock" size={16} color="#ff003c" /> CONVERSATION</h3>
              <div style={styles.conversationLog}>
                {conversation.length === 0 && <p style={styles.dashEmpty}>No conversation yet</p>}
                {conversation.map(msg => (
                  <div key={msg.id} style={styles.conversationItem}>
                    <span style={{ fontWeight: msg.role === 'user' ? 'bold' : 'normal', color: msg.role === 'user' ? '#ddd' : '#ff003c' }}>
                      {msg.role === 'user' ? profile?.name || 'You' : 'CYPHER4X'}
                    </span>
                    <span style={styles.conversationText}>{msg.content}</span>
                    <span style={styles.conversationTime}>{formatTime(msg.time)}</span>
                  </div>
                ))}
              </div>
              <div style={styles.commandActions}>
                <button onClick={clearConversation} style={styles.dashBtn}><Icon name="trash" size={14} color="#fff" /> Clear</button>
                <button onClick={exportChat} style={styles.dashBtn}><Icon name="save" size={14} color="#fff" /> Export</button>
              </div>
            </div>
            <div style={styles.sidebarInputArea}>
              <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendTextMessage()} placeholder="Type a message..." style={styles.sidebarInput} disabled={isProcessing} />
              <button onClick={sendTextMessage} style={styles.sidebarSendBtn} disabled={isProcessing}><Icon name="send" size={18} color="#fff" /></button>
            </div>
            <div style={styles.sidebarSection}>
              <h3 style={styles.sectionTitle}><Icon name="alertTriangle" size={16} color="#ff003c" /> DANGER ZONE</h3>
              <button onClick={resetAllData} style={styles.dangerBtn}><Icon name="trash" size={14} color="#fff" /> Reset All Data</button>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.backgroundFace}>
          {/* Pass isSpeaking state to animate mouth */}
          <CyberGirlFace size={350} isSpeaking={isAISpeaking} />
          <div style={styles.faceSubtitle}>CYPHER4X • Cyber Girl AI</div>
        </div>

        {/* Top Right: Call button */}
        <button onClick={toggleCall} style={styles.callButtonTopRight}>
          <Icon name="phone" size={24} color={isCallActive ? "#4f8" : "#ff003c"} />
          <span style={styles.callLabelTop}>{isCallActive ? 'END' : 'CALL'}</span>
        </button>

        {/* Bottom center: Voice button */}
        <div style={styles.voiceButtonContainer}>
          <button
            onClick={startRecording}
            disabled={isRecording || isProcessing || isCallActive}
            style={{ ...styles.voiceButton, ...(isRecording ? styles.voiceButtonActive : {}) }}
          >
            <Icon name="mic" size={36} color="#fff" />
            <span style={styles.voiceLabel}>
              {isRecording ? 'Recording...' : isProcessing ? 'Processing...' : 'Tap to Speak'}
            </span>
          </button>
        </div>

        {/* Hamburger menu */}
        <button onClick={() => setSidebarOpen(true)} style={styles.hamburgerBtn}>
          <Icon name="menu" size={28} color="#ff003c" />
        </button>
      </div>
    </div>
  )
}

// ============================================================
// STYLES (reuse from previous)
// ============================================================
const styles = {
  app: {
    minHeight: '100vh',
    height: '100vh',
    backgroundColor: '#000',
    color: '#e0e0e0',
    fontFamily: "'Segoe UI', 'Courier New', monospace",
    overflow: 'hidden',
    border: 'none',
    margin: 0,
    padding: 0,
  },
  bootContainer: {
    backgroundColor: '#000',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Courier New', monospace",
    margin: 0,
    padding: 0,
  },
  bootBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(ellipse at center, #1a0000 0%, #000 70%)',
    zIndex: 0,
  },
  bootContent: {
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
    maxWidth: '500px',
    padding: '20px',
  },
  bootFace: { marginBottom: '30px' },
  bootProgressWrapper: { margin: '20px 0' },
  bootProgressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: '#1a1a1a',
    borderRadius: '4px',
    overflow: 'hidden',
    boxShadow: 'inset 0 0 6px #000',
  },
  bootProgressFill: {
    height: '100%',
    backgroundColor: '#ff003c',
    transition: 'width 0.2s ease',
    boxShadow: '0 0 20px #ff003c',
  },
  bootProgressText: {
    color: '#ff6688',
    fontSize: '14px',
    marginTop: '8px',
    display: 'block',
    letterSpacing: '1px',
  },
  bootStatus: {
    marginTop: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
  },
  bootStatusDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#4f8',
    boxShadow: '0 0 20px #4f8',
    animation: 'pulseText 1s infinite',
  },
  bootStatusText: {
    color: '#aaa',
    fontSize: '14px',
    letterSpacing: '2px',
  },
  profileContainer: {
    backgroundColor: '#000',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    border: 'none',
    margin: 0,
  },
  profileCard: {
    width: '100%',
    maxWidth: '420px',
    backgroundColor: '#111',
    border: '2px solid #ff003c',
    borderRadius: '12px',
    padding: '28px'
  },
  profileTitle: { color: '#ff003c', textAlign: 'center', marginBottom: '24px', fontSize: '22px' },
  avatarUploadArea: {
    width: '130px',
    height: '130px',
    borderRadius: '50%',
    border: '3px dashed #ff003c',
    margin: '0 auto 20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#1a1a1a'
  },
  avatarPreview: { width: '100%', height: '100%', objectFit: 'cover' },
  avatarIcon: { fontSize: '14px', color: '#ff003c', textAlign: 'center' },
  inputGroup: { marginBottom: '18px' },
  label: { color: '#ff003c', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' },
  textInput: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#000',
    border: '1px solid #ff003c',
    color: '#fff',
    borderRadius: '8px',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  bioInput: {
    width: '100%',
    minHeight: '80px',
    padding: '14px',
    backgroundColor: '#000',
    border: '1px solid #ff003c',
    color: '#fff',
    borderRadius: '8px',
    fontSize: '15px',
    outline: 'none',
    resize: 'vertical',
    boxSizing: 'border-box'
  },
  profileBtnRow: { display: 'flex', gap: '12px', marginTop: '12px' },
  createBtn: {
    flex: 1,
    padding: '14px',
    backgroundColor: '#ff003c',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  cancelBtn: {
    padding: '14px 20px',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    cursor: 'pointer'
  },
  sidebarOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
    zIndex: 998
  },
  sidebar: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: '380px',
    maxWidth: '90vw',
    backgroundColor: '#0a0000',
    borderLeft: '2px solid #ff003c',
    zIndex: 999,
    overflowY: 'auto',
    padding: '16px',
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  sidebarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0',
    paddingBottom: '10px',
    borderBottom: '1px solid #333'
  },
  sidebarTitle: { color: '#ff003c', fontSize: '18px', fontWeight: 'bold', margin: 0, fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '8px' },
  closeBtn: { backgroundColor: 'transparent', border: 'none', color: '#888', fontSize: '20px', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' },
  sidebarSection: { marginBottom: '0' },
  sectionTitle: {
    color: '#ff003c',
    fontSize: '14px',
    margin: '0 0 8px 0',
    paddingBottom: '4px',
    borderBottom: '1px solid #333',
    fontFamily: 'monospace',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  settingRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' },
  settingLabel: { fontSize: '13px', color: '#ddd' },
  settingValue: { fontSize: '13px', color: '#ff6688' },
  selectInput: {
    padding: '4px 8px',
    backgroundColor: '#000',
    border: '1px solid #444',
    color: '#fff',
    borderRadius: '4px',
    fontSize: '12px'
  },
  toggleBtn: {
    padding: '4px 12px',
    borderRadius: '3px',
    border: 'none',
    fontSize: '11px',
    fontWeight: 'bold',
    cursor: 'pointer',
    backgroundColor: '#333',
    color: '#fff'
  },
  toggleOn: { backgroundColor: '#ff003c' },
  toggleOff: { backgroundColor: '#444', color: '#888' },
  statsCard: {
    border: '1px solid #ff003c40',
    borderRadius: '6px',
    padding: '10px 12px',
    backgroundColor: '#0a0a0a'
  },
  statRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2px 0', fontSize: '12px' },
  statLabel: { color: '#aaa', display: 'flex', alignItems: 'center', gap: '4px' },
  statValue: { color: '#ff6688', fontWeight: '500' },
  profileCardSidebar: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' },
  profileAvatarWrapper: { flexShrink: 0 },
  profileAvatar: { width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ff003c' },
  profileAvatarPlaceholder: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#ff003c',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '18px',
    fontWeight: 'bold'
  },
  profileInfo: { display: 'flex', flexDirection: 'column' },
  profileName: { color: '#fff', fontWeight: 'bold', fontSize: '14px' },
  profileHandle: { color: '#888', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '2px' },
  sidebarBtn: { padding: '6px 12px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '13px' },
  dangerBtn: { padding: '6px 12px', backgroundColor: '#880000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '13px' },
  dashEvent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '4px 0',
    borderBottom: '1px solid #1a1a1a',
    fontSize: '13px'
  },
  eventTime: { color: '#ff6688', fontSize: '12px' },
  dashEmpty: { color: '#666', fontSize: '13px', textAlign: 'center', padding: '8px 0' },
  commandActions: { display: 'flex', gap: '8px', marginTop: '8px' },
  dashBtn: {
    padding: '4px 12px',
    backgroundColor: '#222',
    color: '#fff',
    border: '1px solid #333',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  conversationLog: {
    maxHeight: '200px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    marginBottom: '8px',
  },
  conversationItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: '6px 8px',
    backgroundColor: '#111',
    borderRadius: '4px',
    borderLeft: '2px solid #ff003c',
  },
  conversationText: {
    fontSize: '13px',
    color: '#ddd',
    wordBreak: 'break-word',
    marginTop: '2px',
  },
  conversationTime: {
    fontSize: '10px',
    color: '#666',
    alignSelf: 'flex-end',
    marginTop: '2px',
  },
  sidebarInputArea: {
    display: 'flex',
    gap: '8px',
    padding: '8px 0',
    borderTop: '1px solid #333',
    marginTop: '4px',
  },
  sidebarInput: {
    flex: 1,
    padding: '8px 12px',
    backgroundColor: '#000',
    border: '1px solid #444',
    color: '#fff',
    borderRadius: '4px',
    fontSize: '14px',
    outline: 'none',
  },
  sidebarSendBtn: {
    padding: '8px 14px',
    backgroundColor: '#ff003c',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    height: '100vh',
    border: 'none',
    margin: 0,
    padding: 0,
  },
  backgroundFace: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
    background: 'radial-gradient(ellipse at center, #0a0000 0%, #000 100%)',
  },
  faceSubtitle: {
    position: 'absolute',
    bottom: '15%',
    fontSize: 'clamp(14px, 2vw, 24px)',
    color: '#ff6688',
    letterSpacing: '4px',
    opacity: 0.7,
    textShadow: '0 0 20px rgba(255,0,60,0.3)',
  },
  callButtonTopRight: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    border: '2px solid #ff003c',
    borderRadius: '30px',
    padding: '8px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    color: '#ff003c',
    fontSize: '14px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255,0,60,0.2)',
    },
  },
  callLabelTop: {
    fontSize: '12px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    color: '#fff',
  },
  voiceButtonContainer: {
    position: 'absolute',
    bottom: '40px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  voiceButton: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#1a1a1a',
    border: '3px solid #ff003c',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    transition: 'all 0.3s ease',
    boxShadow: '0 0 30px rgba(255,0,60,0.2)',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 0 50px rgba(255,0,60,0.4)',
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
      transform: 'none',
    },
  },
  voiceButtonActive: {
    backgroundColor: '#ff003c',
    borderColor: '#ff003c',
    boxShadow: '0 0 60px rgba(255,0,60,0.6)',
    animation: 'pulseGlow 1s ease-in-out infinite',
  },
  voiceLabel: {
    color: '#fff',
    fontSize: '11px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    marginTop: '2px',
  },
  hamburgerBtn: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    zIndex: 5,
    padding: '8px',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: 'rgba(255,0,60,0.1)',
    },
  },
}

// ============================================================
// KEYFRAMES (add to index.css)
// ============================================================
