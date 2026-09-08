import { useState, useRef, useEffect, useCallback } from 'react'

// ==================================================
// ICON SYSTEM (same as before – abbreviated)
// ==================================================
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
const APP_START_TIME = Date.now()

// ==================================================
// STORAGE HELPERS (same)
// ==================================================
const getStorageKey = (email, pin) => `cypher4x_${email}_${pin}`
const saveUserData = (email, pin, data) => {
  try { localStorage.setItem(getStorageKey(email, pin), JSON.stringify(data)) } catch {}
}
const loadUserData = (email, pin) => {
  try {
    const raw = localStorage.getItem(getStorageKey(email, pin))
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}
const getAllUsers = () => {
  try {
    const list = localStorage.getItem('cypher4x_users')
    return list ? JSON.parse(list) : []
  } catch { return [] }
}
const addUser = (email, pin) => {
  const list = getAllUsers()
  if (!list.some(u => u.email === email)) {
    list.push({ email, pin })
    localStorage.setItem('cypher4x_users', JSON.stringify(list))
  }
}
const userExists = (email, pin) => {
  const list = getAllUsers()
  return list.some(u => u.email === email && u.pin === pin)
}
const saveAuth = (email, pin) => {
  try { localStorage.setItem('cypher4x_auth', JSON.stringify({ email, pin })) } catch {}
}
const getAuth = () => {
  try {
    const raw = localStorage.getItem('cypher4x_auth')
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}
const clearAuth = () => {
  try { localStorage.removeItem('cypher4x_auth') } catch {}
}
const getLastWelcomeDate = () => {
  try { return localStorage.getItem('cypher4x_welcome_date') } catch { return null }
}
const setLastWelcomeDate = (date) => {
  try { localStorage.setItem('cypher4x_welcome_date', date) } catch {}
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
// RED BALL (unchanged – centered)
// ==================================================
const RedBall = ({ isSpeaking = false }) => (
  <div style={styles.ballContainer}>
    <div style={styles.ring1} />
    <div style={styles.ring2} />
    <div style={styles.ring3} />
    <div style={styles.ball3DContainer}>
      <div style={{
        ...styles.ball3D,
        ...(isSpeaking ? styles.ball3DSpeaking : {})
      }}>
        <div style={styles.ballHighlight} />
        <div style={styles.ballInnerGlow} />
      </div>
    </div>
  </div>
)

// ==================================================
// MAIN APP
// ==================================================
export default function App() {
  // ------ AUTH STATE ------
  const [userMode, setUserMode] = useState('guest')
  const [email, setEmail] = useState('')
  const [pin, setPin] = useState('')
  const [showLogin, setShowLogin] = useState(true)
  const [authError, setAuthError] = useState('')
  const [guestMessageCount, setGuestMessageCount] = useState(0)
  const [showGuestLimit, setShowGuestLimit] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)

  // ------ PROFILE & DATA ------
  const [profile, setProfile] = useState(null)
  const [profileForm, setProfileForm] = useState({ name: "", username: "", avatar: "", bio: "" })
  const [editingProfile, setEditingProfile] = useState(false)

  // ------ APP STATE ------
  const [isBooting, setIsBooting] = useState(true)
  const [bootTypedText, setBootTypedText] = useState('')
  const [bootCredit] = useState('Created by Hackers hub led by Crypty')
  const [viewMode, setViewMode] = useState('android')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // ------ WELCOME OVERLAY ------
  const [showWelcomeOverlay, setShowWelcomeOverlay] = useState(false)
  const [welcomeStep, setWelcomeStep] = useState('greeting')
  const [welcomeMessage, setWelcomeMessage] = useState('')
  const [welcomeEnabled, setWelcomeEnabled] = useState(true) // new setting

  // ------ SETTINGS ------
  const [showSettings, setShowSettings] = useState(false)
  const [settings, setSettings] = useState({
    welcomeEnabled: true,
    autoStartVoice: true,
    darkMode: false,
    language: 'en',
    voiceSpeed: 1,
  })

  // ------ CHAT OVERVIEW ------
  const [showChatOverview, setShowChatOverview] = useState(false)
  const [chatOverviewInput, setChatOverviewInput] = useState('')
  const [chatOverviewListening, setChatOverviewListening] = useState(false)
  const [chatOverviewInterim, setChatOverviewInterim] = useState('')
  const [chatOverviewVoiceEnabled, setChatOverviewVoiceEnabled] = useState(true)
  const [isRecordingVoice, setIsRecordingVoice] = useState(false)
  const [voicePaused, setVoicePaused] = useState(false)
  const [voiceTranscript, setVoiceTranscript] = useState('')
  const chatOverviewRecognitionRef = useRef(null)

  // ------ PC ROTATE OVERLAY ------
  const [showRotateOverlay, setShowRotateOverlay] = useState(false)

  // ------ MAIN APP STATE ------
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

  const synthRef = useRef(typeof window !== "undefined" ? window.speechSynthesis : null)
  const recognitionRef = useRef(null)
  const msgCounter = useRef(0)
  const fileInputRef = useRef(null)

  // ==================================================
  // BOOT TYPEWRITER EFFECT
  // ==================================================
  useEffect(() => {
    if (!isBooting) return
    const title = "CYPHER4X"
    let index = 0
    const interval = setInterval(() => {
      if (index <= title.length) {
        setBootTypedText(title.slice(0, index))
        index++
      } else {
        clearInterval(interval)
        // After typing, wait a bit then finish boot
        setTimeout(() => {
          setIsBooting(false)
          // auto-login or guest
          const auth = getAuth()
          if (auth && userExists(auth.email, auth.pin)) {
            setEmail(auth.email)
            setPin(auth.pin)
            loginUser(auth.email, auth.pin)
          } else {
            setUserMode('guest')
            setGuestMessageCount(0)
            const today = new Date().toDateString()
            const lastWelcome = getLastWelcomeDate()
            if (lastWelcome !== today && welcomeEnabled) {
              setLastWelcomeDate(today)
              setShowWelcomeOverlay(true)
              setWelcomeStep('greeting')
              const msg = "Hello User! I'm CYPHER4X, your friendly AI assistant. How are you feeling today?"
              setWelcomeMessage(msg)
              speakText(msg)
            }
          }
        }, 800)
      }
    }, 120)
    return () => clearInterval(interval)
  }, [isBooting, welcomeEnabled])

  // ==================================================
  // AUTH HANDLERS (same as before)
  // ==================================================
  const handleAuthSubmit = () => {
    if (!email || !pin || pin.length !== 4 || !/^\d{4}$/.test(pin)) {
      setAuthError("Please enter a valid email and 4‑digit PIN.")
      return
    }
    if (showLogin) {
      if (userExists(email, pin)) {
        loginUser(email, pin)
        setShowAuthModal(false)
      } else {
        setAuthError("No account found. Please sign up.")
      }
    } else {
      if (userExists(email, pin)) {
        setAuthError("Account already exists. Please log in.")
        return
      }
      addUser(email, pin)
      const emptyData = {
        profile: null,
        conversation: [],
        commandHistory: [],
        events: [],
        reminders: [],
        faceRecognition: false,
        biometricAuth: false,
        voiceGender: 'female',
        viewMode: 'android',
        settings: { welcomeEnabled: true, autoStartVoice: true, darkMode: false, language: 'en', voiceSpeed: 1 }
      }
      saveUserData(email, pin, emptyData)
      loginUser(email, pin)
      setShowAuthModal(false)
    }
  }

  const loginUser = (email, pin) => {
    saveAuth(email, pin)
    setUserMode('loggedin')
    loadUserDataByEmail(email, pin)
    setAuthError('')
    setGuestMessageCount(0)
  }

  const loadUserDataByEmail = (email, pin) => {
    const data = loadUserData(email, pin)
    if (data) {
      setProfile(data.profile || null)
      setConversation(data.conversation || [])
      setCommandHistory(data.commandHistory || [])
      setEvents(data.events || [])
      setReminders(data.reminders || [])
      setFaceRecognition(data.faceRecognition || false)
      setBiometricAuth(data.biometricAuth || false)
      setVoiceGender(data.voiceGender || 'female')
      setViewMode(data.viewMode || 'android')
      if (data.settings) setSettings(data.settings)
      msgCounter.current = (data.conversation || []).length + 1

      const today = new Date().toDateString()
      const lastWelcome = getLastWelcomeDate()
      if (lastWelcome !== today && settings.welcomeEnabled) {
        setLastWelcomeDate(today)
        setShowWelcomeOverlay(true)
        setWelcomeStep('greeting')
        const name = data.profile?.name || 'User'
        const msg = `Hello ${name}! I'm CYPHER4X, your friendly AI assistant. How are you feeling today?`
        setWelcomeMessage(msg)
        speakText(msg)
      } else {
        const name = data.profile?.name || 'User'
        const greet = `Welcome back, ${name}! I'm CYPHER4X. How can I help you today? ✨`
        const assistantMsg = { id: ++msgCounter.current, role: 'assistant', content: greet, time: Date.now() }
        setConversation(prev => [...prev, assistantMsg])
        speakText(greet.replace(/[✨]/g, ''))
      }
    }
  }

  const saveCurrentUserData = () => {
    if (userMode !== 'loggedin') return
    const data = {
      profile,
      conversation,
      commandHistory,
      events,
      reminders,
      faceRecognition,
      biometricAuth,
      voiceGender,
      viewMode,
      settings
    }
    saveUserData(email, pin, data)
  }

  useEffect(() => {
    if (userMode === 'loggedin') saveCurrentUserData()
  }, [profile, conversation, commandHistory, events, reminders, faceRecognition, biometricAuth, voiceGender, viewMode, settings])

  // ==================================================
  // LOGOUT
  // ==================================================
  const handleLogout = () => {
    if (!confirm("Logout from this account?")) return
    clearAuth()
    setUserMode('guest')
    setProfile(null)
    setConversation([])
    setCommandHistory([])
    setEvents([])
    setReminders([])
    setFaceRecognition(false)
    setBiometricAuth(false)
    setVoiceGender('female')
    setViewMode('android')
    setSidebarOpen(false)
    setGuestMessageCount(0)
    setShowWelcomeOverlay(false)
    setShowAuthModal(false)
    msgCounter.current = 0
  }

  // ==================================================
  // GUEST MESSAGE LIMIT
  // ==================================================
  const incrementGuestMessage = () => {
    if (userMode !== 'guest') return
    const newCount = guestMessageCount + 1
    setGuestMessageCount(newCount)
    if (newCount >= 5) {
      setShowGuestLimit(true)
    }
  }

  // ==================================================
  // SPEECH RECOGNITION
  // ==================================================
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

    recognition.onstart = () => {
      setIsListening(true)
      setInterimTranscript('')
    }
    recognition.onend = () => {
      setIsListening(false)
      setInterimTranscript('')
      if (!isOneOff && isFullscreenCall) {
        try { recognition.start() } catch (e) {}
      }
    }
    recognition.onerror = (event) => {
      console.warn('Speech recognition error', event.error)
      if (event.error === 'not-allowed') {
        alert('Please allow microphone access in your browser settings.')
        setIsFullscreenCall(false)
        setIsCallActive(false)
        setRecordingMode(false)
        setIsListening(false)
        return
      }
      if (!isOneOff && isFullscreenCall) {
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
      if (final) {
        setInterimTranscript('')
        setRecordingMode(false)
        if (onFinal) {
          onFinal(final)
        } else {
          await processUserQuery(final)
        }
      } else if (interim) {
        setInterimTranscript(interim)
      }
    }
    return recognition
  }, [isFullscreenCall])

  // ==================================================
  // TEXT-TO-SPEECH
  // ==================================================
  const speakText = useCallback((text, onEnd = null) => {
    if (!text || !synthRef.current) return
    try {
      synthRef.current.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = settings.voiceSpeed || 1
      utterance.pitch = voiceGender === 'female' ? 1.3 : 1.0
      utterance.volume = 1
      utterance.onstart = () => setIsAISpeaking(true)
      utterance.onend = () => {
        setIsAISpeaking(false)
        if (onEnd) onEnd()
      }
      utterance.onerror = () => {
        setIsAISpeaking(false)
        if (onEnd) onEnd()
      }
      synthRef.current.speak(utterance)
    } catch (e) {
      setIsAISpeaking(false)
      if (onEnd) onEnd()
    }
  }, [voiceGender, settings.voiceSpeed])

  // ==================================================
  // PROCESS USER QUERY
  // ==================================================
  const processUserQuery = useCallback(async (query) => {
    if (!query || isProcessing) return
    if (userMode === 'guest') {
      incrementGuestMessage()
    }
    setIsProcessing(true)
    setInterimTranscript('')
    setRecordingMode(false)

    const userMsg = { id: ++msgCounter.current, role: 'user', content: query, time: Date.now() }
    setConversation(prev => [...prev, userMsg])
    setCommandHistory(prev => [...prev, { command: query, timestamp: Date.now() }])

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
  }, [isProcessing, speakText, userMode])

  // ==================================================
  // OVERVIEW CHAT – with voice recording controls
  // ==================================================
  const setupOverviewRecognition = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Your browser doesn't support speech recognition.")
      return null
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.continuous = false // manual start/stop
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onstart = () => {
      setChatOverviewListening(true)
      setIsRecordingVoice(true)
      setVoicePaused(false)
      setVoiceTranscript('')
    }
    recognition.onend = () => {
      setChatOverviewListening(false)
      setIsRecordingVoice(false)
    }
    recognition.onerror = () => {
      setChatOverviewListening(false)
      setIsRecordingVoice(false)
    }
    recognition.onresult = (event) => {
      let final = '', interim = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        if (result.isFinal) final += result[0].transcript
        else interim += result[0].transcript
      }
      if (final) {
        setVoiceTranscript(final)
        // Optionally auto-send or let user send
      } else if (interim) {
        setVoiceTranscript(interim)
      }
    }
    return recognition
  }, [])

  const startVoiceRecording = useCallback(() => {
    if (isRecordingVoice || chatOverviewListening) return
    if (!chatOverviewRecognitionRef.current) {
      chatOverviewRecognitionRef.current = setupOverviewRecognition()
    }
    if (chatOverviewRecognitionRef.current) {
      try {
        chatOverviewRecognitionRef.current.start()
        setVoiceTranscript('')
      } catch (e) {
        console.warn('Failed to start voice recording', e)
      }
    }
  }, [isRecordingVoice, chatOverviewListening, setupOverviewRecognition])

  const pauseVoiceRecording = useCallback(() => {
    if (chatOverviewRecognitionRef.current && chatOverviewListening) {
      try {
        chatOverviewRecognitionRef.current.stop()
        setVoicePaused(true)
        setChatOverviewListening(false)
        setIsRecordingVoice(false)
      } catch (e) {}
    }
  }, [chatOverviewListening])

  const resumeVoiceRecording = useCallback(() => {
    if (voicePaused && chatOverviewRecognitionRef.current) {
      try {
        chatOverviewRecognitionRef.current.start()
        setVoicePaused(false)
        setChatOverviewListening(true)
        setIsRecordingVoice(true)
      } catch (e) {}
    }
  }, [voicePaused])

  const deleteVoiceRecording = useCallback(() => {
    if (chatOverviewRecognitionRef.current) {
      try { chatOverviewRecognitionRef.current.stop() } catch (e) {}
    }
    setVoiceTranscript('')
    setChatOverviewListening(false)
    setIsRecordingVoice(false)
    setVoicePaused(false)
  }, [])

  const sendVoiceRecording = useCallback(() => {
    const text = voiceTranscript.trim()
    if (!text || isProcessing) return
    setVoiceTranscript('')
    setChatOverviewListening(false)
    setIsRecordingVoice(false)
    setVoicePaused(false)
    if (chatOverviewRecognitionRef.current) {
      try { chatOverviewRecognitionRef.current.stop() } catch (e) {}
    }
    processUserQuery(text)
  }, [voiceTranscript, isProcessing, processUserQuery])

  // Update input field when voice transcript changes
  useEffect(() => {
    if (voiceTranscript && !chatOverviewListening) {
      // Allow user to edit before sending
      setChatOverviewInput(voiceTranscript)
    }
  }, [voiceTranscript, chatOverviewListening])

  // Overview send text (manual)
  const sendOverviewText = useCallback(() => {
    const text = chatOverviewInput.trim()
    if (!text || isProcessing) return
    setChatOverviewInput('')
    processUserQuery(text)
  }, [chatOverviewInput, isProcessing, processUserQuery])

  const handleOverviewFileShare = useCallback((e) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    const file = files[0]
    const maxSize = 20 * 1024 * 1024
    if (file.size > maxSize) { alert("File too large! Max 20MB."); return }
    const reader = new FileReader()
    reader.onloadend = () => {
      const fileData = {
        id: ++msgCounter.current,
        role: 'user',
        content: `📎 ${file.name}`,
        time: Date.now(),
        file: {
          name: file.name,
          type: file.type,
          data: reader.result,
          size: file.size
        }
      }
      setConversation(prev => [...prev, fileData])
      setCommandHistory(prev => [...prev, { command: `📎 ${file.name}`, timestamp: Date.now() }])
      const reply = `Received your file: **${file.name}** (${(file.size / 1024).toFixed(1)} KB). I can't process it directly, but I'm happy to help! 🤖`
      const assistantMsg = { id: ++msgCounter.current, role: 'assistant', content: reply, time: Date.now() }
      setConversation(prev => [...prev, assistantMsg])
      if (chatOverviewVoiceEnabled) speakText(reply.replace(/[🤖]/g, ''))
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }, [speakText, chatOverviewVoiceEnabled])

  // ------ MESSAGE ACTIONS (edit, delete, share) ------
  const handleEditMessage = useCallback((msgId) => {
    const msg = conversation.find(m => m.id === msgId)
    if (!msg || msg.role !== 'user') return
    const newContent = prompt("Edit your message:", msg.content)
    if (newContent !== null && newContent.trim()) {
      setConversation(prev => prev.map(m => m.id === msgId ? { ...m, content: newContent.trim() } : m))
    }
  }, [conversation])

  const handleDeleteMessage = useCallback((msgId) => {
    if (!confirm("Delete this message?")) return
    setConversation(prev => prev.filter(m => m.id !== msgId))
  }, [])

  const handleShareMessage = useCallback(async (msg) => {
    const content = msg.content
    if (navigator.share) {
      try {
        await navigator.share({ title: 'CYPHER4X Message', text: content })
      } catch (e) { /* user cancelled */ }
    } else {
      try {
        await navigator.clipboard.writeText(content)
        alert('Message copied to clipboard!')
      } catch (e) {
        alert('Could not share/copy message.')
      }
    }
  }, [])

  // ==================================================
  // FILE SHARE HANDLER (main sidebar)
  // ==================================================
  const handleFileShare = useCallback((e) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    const file = files[0]
    const maxSize = 20 * 1024 * 1024
    if (file.size > maxSize) { alert("File too large! Max 20MB."); return }
    const reader = new FileReader()
    reader.onloadend = () => {
      const fileData = {
        id: ++msgCounter.current,
        role: 'user',
        content: `📎 ${file.name}`,
        time: Date.now(),
        file: {
          name: file.name,
          type: file.type,
          data: reader.result,
          size: file.size
        }
      }
      setConversation(prev => [...prev, fileData])
      setCommandHistory(prev => [...prev, { command: `📎 ${file.name}`, timestamp: Date.now() }])
      const reply = `I received your file: **${file.name}** (${(file.size / 1024).toFixed(1)} KB). I can't process the content directly, but I'm happy to help if you have questions about it! 🤖`
      const assistantMsg = { id: ++msgCounter.current, role: 'assistant', content: reply, time: Date.now() }
      setConversation(prev => [...prev, assistantMsg])
      speakText(reply.replace(/[🤖]/g, ''))
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }, [speakText])

  // ==================================================
  // FULL‑SCREEN CALL (unchanged)
  // ==================================================
  const toggleFullscreenCall = useCallback(() => {
    if (isFullscreenCall) {
      setIsFullscreenCall(false)
      setIsCallActive(false)
      if (recognitionRef.current) {
        try { recognitionRef.current.stop() } catch (e) {}
      }
      setIsListening(false)
      setInterimTranscript('')
      synthRef.current?.cancel()
      setIsAISpeaking(false)
    } else {
      setIsFullscreenCall(true)
      setIsCallActive(true)
      if (!recognitionRef.current) {
        recognitionRef.current = setupSpeechRecognition(false, (finalTranscript) => {
          processUserQuery(finalTranscript)
        })
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
        setIsFullscreenCall(false)
        setIsCallActive(false)
      }
    }
  }, [isFullscreenCall, setupSpeechRecognition, speakText, processUserQuery])

  const interruptAndListen = useCallback(() => {
    if (synthRef.current) synthRef.current.cancel()
    setIsAISpeaking(false)
    if (recognitionRef.current) {
      try { recognitionRef.current.start() } catch (e) {}
    }
  }, [])

  // ==================================================
  // TAP TO SPEAK (main)
  // ==================================================
  const startRecording = useCallback(() => {
    if (isRecording || isProcessing || isFullscreenCall) return
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Your browser doesn't support speech recognition.")
      return
    }
    setRecordingMode(true)
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onstart = () => {
      setIsRecording(true)
      setIsListening(true)
      setInterimTranscript('')
    }
    recognition.onend = () => {
      setIsRecording(false)
      setIsListening(false)
    }
    recognition.onerror = (event) => {
      setIsRecording(false)
      setRecordingMode(false)
      setIsListening(false)
      if (event.error === 'not-allowed') {
        alert('Please allow microphone access in your browser settings.')
      } else {
        alert('Speech recognition error: ' + event.error)
      }
    }
    recognition.onresult = async (event) => {
      let final = '', interim = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        if (result.isFinal) final += result[0].transcript
        else interim += result[0].transcript
      }
      if (final) {
        setInterimTranscript('')
        setRecordingMode(false)
        await processUserQuery(final)
      } else if (interim) {
        setInterimTranscript(interim)
      }
    }
    recognitionRef.current = recognition
    try {
      recognition.start()
    } catch (e) {
      alert('Failed to start recording: ' + e.message)
      setRecordingMode(false)
    }
  }, [isRecording, isProcessing, isFullscreenCall, processUserQuery])

  // ==================================================
  // SEND / CANCEL
  // ==================================================
  const sendInterim = useCallback(() => {
    if (!interimTranscript.trim() || isProcessing) return
    const text = interimTranscript.trim()
    setInterimTranscript('')
    setRecordingMode(false)
    if (recognitionRef.current) {
      try { recognitionRef.current.stop() } catch (e) {}
    }
    processUserQuery(text)
  }, [interimTranscript, isProcessing, processUserQuery])

  const cancelRecording = useCallback(() => {
    setInterimTranscript('')
    setRecordingMode(false)
    setIsRecording(false)
    setIsListening(false)
    if (recognitionRef.current) {
      try { recognitionRef.current.stop() } catch (e) {}
    }
  }, [])

  // ==================================================
  // SEND TEXT (main)
  // ==================================================
  const sendTextMessage = useCallback(() => {
    const text = inputText.trim()
    if (!text || isProcessing) return
    setInputText('')
    processUserQuery(text)
  }, [inputText, isProcessing, processUserQuery])

  // ==================================================
  // WELCOME OVERLAY
  // ==================================================
  const handleWelcomeDecision = useCallback((choice) => {
    setWelcomeStep('decision')
    let reply = ''
    if (choice === 'fine') {
      reply = "That's great to hear! 😄 I'm so happy you're feeling well. How can I make your day even better today?"
    } else {
      reply = "I'm sorry to hear that. 😔 I'm here for you. Would you like to talk about it or maybe I can help you with something to cheer you up?"
    }
    const assistantMsg = { id: ++msgCounter.current, role: 'assistant', content: reply, time: Date.now() }
    setConversation(prev => [...prev, assistantMsg])
    speakText(reply.replace(/[😄😔]/g, ''))
    setTimeout(() => {
      setShowWelcomeOverlay(false)
    }, 3000)
  }, [speakText])

  // ==================================================
  // VIEW TOGGLE (with rotate overlay)
  // ==================================================
  const toggleView = useCallback(() => {
    setViewMode(prev => {
      const newMode = prev === 'android' ? 'pc' : 'android'
      if (newMode === 'pc') {
        setShowRotateOverlay(true)
      }
      return newMode
    })
    setSidebarOpen(false)
  }, [])

  // ==================================================
  // STATS (unchanged)
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
  // PROFILE HANDLERS (unchanged)
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
    setProfile(newProfile)
    setEditingProfile(false)
    const welcome = `Profile updated, ${newProfile.name}!`
    speakText(welcome)
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
    if (!confirm("Reset ALL data for this account?")) return
    if (userMode === 'loggedin') {
      const emptyData = {
        profile: null,
        conversation: [],
        commandHistory: [],
        events: [],
        reminders: [],
        faceRecognition: false,
        biometricAuth: false,
        voiceGender: 'female',
        viewMode: 'android',
        settings: { welcomeEnabled: true, autoStartVoice: true, darkMode: false, language: 'en', voiceSpeed: 1 }
      }
      saveUserData(email, pin, emptyData)
    }
    setProfile(null)
    setConversation([])
    setCommandHistory([])
    setEvents([])
    setReminders([])
    setFaceRecognition(false)
    setBiometricAuth(false)
    setVoiceGender('female')
    setViewMode('android')
    setSidebarOpen(false)
  }, [userMode, email, pin])

  const clearConversation = useCallback(() => setConversation([]), [])
  const clearCommands = useCallback(() => setCommandHistory([]), [])
  const exportChat = useCallback(() => {
    const data = { conversation, commandHistory, events, reminders, profile, exportedAt: new Date().toISOString() }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `cypher4x_export_${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [conversation, commandHistory, events, reminders, profile])

  const formatUptime = (seconds) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }
  const formatTime = (ts) => new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  // ============================================================
  // RENDER: BOOT SCREEN (typewriter)
  // ============================================================
  if (isBooting) {
    return (
      <div style={styles.bootContainer}>
        <div style={styles.bootBackground} />
        <div style={styles.bootContent}>
          <h1 style={styles.bootTitle}>
            {bootTypedText}
            <span style={styles.bootCursor}>|</span>
          </h1>
          <p style={styles.bootSubtitle}>Advanced AI System</p>
          <div style={styles.bootCredit}>{bootCredit}</div>
        </div>
      </div>
    )
  }

  // ============================================================
  // RENDER: GUEST LIMIT OVERLAY
  // ============================================================
  if (showGuestLimit) {
    return (
      <div style={styles.guestLimitOverlay}>
        <div style={styles.guestLimitCard}>
          <h2 style={styles.guestLimitTitle}>⏳ Free Trial Limit Reached</h2>
          <p style={styles.guestLimitText}>
            You've used all 5 free messages. Please login or sign up to continue chatting with CYPHER4X.
          </p>
          <div style={styles.guestLimitButtons}>
            <button onClick={() => { setShowGuestLimit(false); setShowLogin(true); setShowAuthModal(true); }} style={styles.guestLimitLoginBtn}>
              Login
            </button>
            <button onClick={() => { setShowGuestLimit(false); setShowLogin(false); setShowAuthModal(true); }} style={styles.guestLimitSignupBtn}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ============================================================
  // RENDER: WELCOME OVERLAY
  // ============================================================
  if (showWelcomeOverlay) {
    return (
      <div style={styles.welcomeOverlay}>
        <div style={styles.welcomeCard}>
          <div style={styles.welcomeBall}>
            <RedBall isSpeaking={isAISpeaking} />
          </div>
          <div style={styles.welcomeMessageText}>{welcomeMessage}</div>
          {welcomeStep === 'greeting' && (
            <div style={styles.welcomeButtons}>
              <button onClick={() => handleWelcomeDecision('notfine')} style={styles.welcomeBtnNotFine}>
                I'm not fine
              </button>
              <button onClick={() => handleWelcomeDecision('fine')} style={styles.welcomeBtnFine}>
                I'm fine
              </button>
            </div>
          )}
          {welcomeStep === 'decision' && (
            <div style={styles.welcomeDecisionText}>Thank you for sharing. I'm here to help you. 💙</div>
          )}
        </div>
      </div>
    )
  }

  // ============================================================
  // RENDER: AUTH MODAL
  // ============================================================
  if (showAuthModal) {
    return (
      <div style={styles.authModalOverlay}>
        <div style={styles.authModalCard}>
          <button onClick={() => setShowAuthModal(false)} style={styles.authModalClose}>✕</button>
          <h1 style={styles.authTitle}>CYPHER4X</h1>
          <p style={styles.authSubtitle}>{showLogin ? 'Login' : 'Sign Up'}</p>
          <div style={styles.authError}>{authError}</div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.authInput}
          />
          <input
            type="password"
            placeholder="4‑digit PIN"
            value={pin}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '').slice(0, 4)
              setPin(val)
            }}
            style={styles.authInput}
            maxLength="4"
            pattern="\d{4}"
          />
          <button onClick={() => {
            handleAuthSubmit();
            if (userMode === 'loggedin') setShowAuthModal(false);
          }} style={styles.authBtn}>
            {showLogin ? 'Login' : 'Create Account'}
          </button>
          <div style={styles.authSwitch}>
            <span>{showLogin ? "Don't have an account?" : "Already have an account?"}</span>
            <button onClick={() => { setShowLogin(!showLogin); setAuthError('') }} style={styles.authSwitchBtn}>
              {showLogin ? 'Sign Up' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ============================================================
  // RENDER: SETTINGS MODAL
  // ============================================================
  if (showSettings) {
    return (
      <div style={styles.settingsOverlay}>
        <div style={styles.settingsCard}>
          <div style={styles.settingsHeader}>
            <h2 style={styles.settingsTitle}>⚙️ Settings</h2>
            <button onClick={() => setShowSettings(false)} style={styles.settingsClose}>✕</button>
          </div>
          <div style={styles.settingsGroup}>
            <div style={styles.settingItem}>
              <span>Welcome Messages</span>
              <label style={styles.toggleSwitch}>
                <input type="checkbox" checked={settings.welcomeEnabled} onChange={(e) => setSettings({ ...settings, welcomeEnabled: e.target.checked })} />
                <span style={styles.toggleSlider} />
              </label>
            </div>
            <div style={styles.settingItem}>
              <span>Auto‑start Voice</span>
              <label style={styles.toggleSwitch}>
                <input type="checkbox" checked={settings.autoStartVoice} onChange={(e) => setSettings({ ...settings, autoStartVoice: e.target.checked })} />
                <span style={styles.toggleSlider} />
              </label>
            </div>
            <div style={styles.settingItem}>
              <span>Dark Mode</span>
              <label style={styles.toggleSwitch}>
                <input type="checkbox" checked={settings.darkMode} onChange={(e) => setSettings({ ...settings, darkMode: e.target.checked })} />
                <span style={styles.toggleSlider} />
              </label>
            </div>
            <div style={styles.settingItem}>
              <span>Language</span>
              <select value={settings.language} onChange={(e) => setSettings({ ...settings, language: e.target.value })} style={styles.settingsSelect}>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
            <div style={styles.settingItem}>
              <span>Voice Speed</span>
              <input type="range" min="0.5" max="2" step="0.1" value={settings.voiceSpeed} onChange={(e) => setSettings({ ...settings, voiceSpeed: parseFloat(e.target.value) })} style={styles.settingsRange} />
              <span style={styles.settingsValue}>{settings.voiceSpeed}x</span>
            </div>
            <div style={styles.settingItem}>
              <span>Voice Gender</span>
              <select value={voiceGender} onChange={(e) => setVoiceGender(e.target.value)} style={styles.settingsSelect}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <button onClick={() => setShowSettings(false)} style={styles.settingsDoneBtn}>Done</button>
        </div>
      </div>
    )
  }

  // ============================================================
  // RENDER: FULL‑SCREEN CALL
  // ============================================================
  if (isFullscreenCall) {
    return (
      <div style={styles.fullscreenCallOverlay}>
        <button onClick={toggleFullscreenCall} style={styles.returnBtn}>
          <Icon name="arrowLeft" size={28} color="#fff" /> Return
        </button>
        <div style={styles.fullscreenCallContentNoBall}>
          <div style={styles.fullscreenListeningStatus}>
            {isListening ? (
              <div style={styles.fullscreenListeningDot} />
            ) : isAISpeaking ? (
              <div style={styles.fullscreenSpeakingDot} />
            ) : null}
            <span style={styles.fullscreenStatusText}>
              {isListening ? 'Listening...' : isAISpeaking ? 'Speaking...' : 'Tap mic to talk'}
            </span>
          </div>
          {interimTranscript && (
            <div style={styles.fullscreenTranscript}>{interimTranscript}</div>
          )}
          <button
            onClick={interruptAndListen}
            style={styles.fullscreenMicBtn}
            disabled={isProcessing}
          >
            <Icon name="mic" size={48} color="#fff" />
          </button>
        </div>
      </div>
    )
  }

  // ============================================================
  // RENDER: ROTATE OVERLAY
  // ============================================================
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

  // ============================================================
  // RENDER: CHAT OVERVIEW (with voice controls & message actions)
  // ============================================================
  if (showChatOverview) {
    return (
      <div style={styles.chatOverviewContainer}>
        <div style={styles.chatOverviewHeader}>
          <button onClick={() => setShowChatOverview(false)} style={styles.chatOverviewBackBtn}>
            <Icon name="arrowLeft" size={24} color="#fff" /> Back
          </button>
          <span style={styles.chatOverviewTitle}>Chat with AI</span>
          <button onClick={() => setChatOverviewVoiceEnabled(!chatOverviewVoiceEnabled)} style={styles.chatOverviewVoiceToggle}>
            <Icon name={chatOverviewVoiceEnabled ? 'volume2' : 'volumeX'} size={20} color="#fff" />
          </button>
        </div>
        <div style={styles.chatOverviewMessages}>
          {conversation.length === 0 && (
            <div style={styles.chatOverviewEmpty}>Start chatting with AI! 💬</div>
          )}
          {conversation.map(msg => (
            <div key={msg.id} style={{
              ...styles.chatOverviewMsg,
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.role === 'user' ? '#ff003c' : '#1a1a1a',
              position: 'relative',
            }}>
              <span style={styles.chatOverviewMsgText}>{msg.content}</span>
              {msg.file && (
                <div style={styles.filePreviewPC}>
                  {msg.file.type.startsWith('image/') && <img src={msg.file.data} alt={msg.file.name} style={{ maxWidth: '100%', maxHeight: '80px', borderRadius: '4px', marginTop: '4px' }} />}
                  {msg.file.type.startsWith('video/') && <video controls style={{ maxWidth: '100%', maxHeight: '80px', borderRadius: '4px', marginTop: '4px' }}><source src={msg.file.data} type={msg.file.type} /></video>}
                  {!msg.file.type.startsWith('image/') && !msg.file.type.startsWith('video/') && (
                    <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>📎 {msg.file.name}</div>
                  )}
                </div>
              )}
              <span style={styles.chatOverviewMsgTime}>{formatTime(msg.time)}</span>
              {/* Message actions */}
              <div style={styles.msgActions}>
                {msg.role === 'user' && (
                  <button onClick={() => handleEditMessage(msg.id)} style={styles.msgActionBtn} title="Edit">
                    <Icon name="edit" size={14} color="#888" />
                  </button>
                )}
                <button onClick={() => handleDeleteMessage(msg.id)} style={styles.msgActionBtn} title="Delete">
                  <Icon name="trash" size={14} color="#888" />
                </button>
                <button onClick={() => handleShareMessage(msg)} style={styles.msgActionBtn} title="Share">
                  <Icon name="copy" size={14} color="#888" />
                </button>
              </div>
            </div>
          ))}
          {isProcessing && (
            <div style={{ ...styles.chatOverviewMsg, alignSelf: 'flex-start', backgroundColor: '#1a1a1a' }}>
              <span style={styles.chatOverviewMsgText}>⏳ Thinking...</span>
            </div>
          )}
        </div>
        <div style={styles.chatOverviewInputRowRaised}>
          <input
            type="text"
            value={chatOverviewInput}
            onChange={(e) => setChatOverviewInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendOverviewText()}
            placeholder="Type a message..."
            style={styles.chatOverviewInput}
            disabled={isProcessing}
          />
          {/* Voice recording controls */}
          <div style={styles.voiceControls}>
            {!isRecordingVoice && !voicePaused ? (
              <button onClick={startVoiceRecording} style={styles.chatOverviewMicBtn} title="Record voice">
                <Icon name="mic" size={20} color="#fff" />
              </button>
            ) : (
              <>
                {voicePaused ? (
                  <button onClick={resumeVoiceRecording} style={styles.chatOverviewMicBtn} title="Resume">
                    <Icon name="play" size={20} color="#4f8" />
                  </button>
                ) : (
                  <button onClick={pauseVoiceRecording} style={styles.chatOverviewMicBtn} title="Pause">
                    <Icon name="pause" size={20} color="#ff003c" />
                  </button>
                )}
                <button onClick={deleteVoiceRecording} style={styles.chatOverviewMicBtn} title="Delete recording">
                  <Icon name="trash" size={20} color="#ff003c" />
                </button>
                <button onClick={sendVoiceRecording} style={styles.chatOverviewSendBtn} title="Send recording" disabled={isProcessing || !voiceTranscript.trim()}>
                  <Icon name="send" size={20} color="#fff" />
                </button>
              </>
            )}
          </div>
          <label style={styles.chatOverviewAttachBtn}>
            <Icon name="file" size={20} color="#fff" />
            <input type="file" accept="image/*,video/*,.pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx" onChange={handleOverviewFileShare} style={{ display: 'none' }} />
          </label>
          <button onClick={sendOverviewText} style={styles.chatOverviewSendBtn} disabled={isProcessing}>
            <Icon name="send" size={20} color="#fff" />
          </button>
        </div>
        {voiceTranscript && !chatOverviewListening && (
          <div style={styles.voiceTranscriptPreview}>"{voiceTranscript}"</div>
        )}
      </div>
    )
  }

  // ============================================================
  // RENDER: PROFILE EDIT (unchanged)
  // ============================================================
  if (editingProfile) {
    return (
      <div style={styles.profileContainer}>
        <div style={styles.profileCard}>
          <h1 style={styles.profileTitle}>EDIT PROFILE</h1>
          <div style={styles.avatarUploadArea} onClick={() => fileInputRef.current?.click()}>
            {profileForm.avatar ? (
              <img src={profileForm.avatar} alt="Avatar" style={styles.avatarPreview} />
            ) : (
              <span style={styles.avatarIcon}><Icon name="camera" size={32} color="#ff003c" /><br />Tap to select</span>
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
            <button onClick={() => setEditingProfile(false)} style={styles.cancelBtn}>Cancel</button>
            <button onClick={saveProfile} style={styles.createBtn}>SAVE CHANGES</button>
          </div>
        </div>
      </div>
    )
  }

  // ============================================================
  // RENDER: ANDROID VIEW (with settings button)
  // ============================================================
  if (viewMode === 'android') {
    return (
      <div style={styles.appAndroid}>
        {sidebarOpen && (
          <>
            <div style={styles.sidebarOverlay} onClick={() => setSidebarOpen(false)} />
            <div style={styles.sidebar}>
              {/* ... sidebar content same as before ... */}
              <div style={styles.sidebarHeader}>
                <h2 style={styles.sidebarTitle}><Icon name="settings" size={20} color="#ff003c" /> CONTROL PANEL</h2>
                <button onClick={() => setSidebarOpen(false)} style={styles.closeBtn}><Icon name="x" size={20} color="#888" /></button>
              </div>
              {/* ... rest of sidebar ... */}
            </div>
          </>
        )}

        <div style={styles.mainContentAndroid}>
          <div style={styles.backgroundAndroid}>
            <RedBall isSpeaking={isAISpeaking} />
            <div style={styles.faceTitleAndroid}>CYPHER4X</div>
          </div>

          <div style={styles.topBarAndroid}>
            <div style={{ width: '80px' }} />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setShowSettings(true)} style={styles.settingsButtonTop}>
                <Icon name="cog" size={20} color="#fff" />
              </button>
              <button onClick={toggleFullscreenCall} style={styles.callButtonTopRight}>
                <Icon name="phone" size={24} color={isCallActive ? "#4f8" : "#ff003c"} />
                <span style={styles.callLabelTop}>{isFullscreenCall ? 'ACTIVE' : 'CALL'}</span>
              </button>
            </div>
          </div>

          <div style={styles.listeningContainer}>
            {isListening ? (
              <>
                <div style={styles.listeningDot} />
                <span style={styles.listeningText}>Listening...</span>
                {interimTranscript && <span style={styles.interimText}>"{interimTranscript}"</span>}
                {interimTranscript && (
                  <button onClick={sendInterim} style={styles.sendInterimBtn} disabled={isProcessing}>
                    <Icon name="send" size={16} color="#fff" /><span>Send</span>
                  </button>
                )}
              </>
            ) : isProcessing ? (
              <span style={styles.listeningText}>Processing...</span>
            ) : isRecording ? (
              <>
                <div style={{ ...styles.listeningDot, backgroundColor: '#ff003c', boxShadow: '0 0 20px #ff003c' }} />
                <span style={styles.listeningText}>Recording...</span>
                {interimTranscript && <span style={styles.interimText}>"{interimTranscript}"</span>}
                {interimTranscript && (
                  <>
                    <button onClick={sendInterim} style={styles.sendInterimBtn} disabled={isProcessing}>
                      <Icon name="send" size={16} color="#fff" /><span>Send</span>
                    </button>
                    <button onClick={cancelRecording} style={styles.cancelInterimBtn}>
                      <Icon name="close" size={18} color="#ff003c" />
                    </button>
                  </>
                )}
              </>
            ) : null}
          </div>

          <div style={styles.voiceButtonContainer}>
            <button
              onClick={startRecording}
              disabled={isRecording || isProcessing || isFullscreenCall}
              style={{ ...styles.voiceButton, ...(isRecording ? styles.voiceButtonActive : {}) }}
            >
              <Icon name="mic" size={40} color="#fff" />
              <span style={styles.voiceLabel}>
                {isRecording ? 'Recording...' : isProcessing ? 'Processing...' : 'Tap to Speak'}
              </span>
            </button>
          </div>

          <button onClick={() => setSidebarOpen(true)} style={{ ...styles.hamburgerBtn, zIndex: 15 }}>
            <Icon name="menu" size={28} color="#ff003c" />
          </button>
        </div>
      </div>
    )
  }

  // ============================================================
  // RENDER: PC VIEW (with settings button)
  // ============================================================
  return (
    <div style={styles.appPC}>
      <header style={styles.headerPC}>
        <div style={styles.headerLeft}>
          <h1 style={styles.titlePC}>CYPHER4X</h1>
          <span style={styles.versionBadgePC}>{VERSION}</span>
          <button onClick={toggleFullscreenCall} style={{ ...styles.callBtnPC, ...(isFullscreenCall ? styles.callBtnPCActive : {}) }}>
            <Icon name="phone" size={18} color={isFullscreenCall ? "#4f8" : "#ff003c"} />
            <span>{isFullscreenCall ? 'ACTIVE' : 'CALL'}</span>
          </button>
        </div>
        <div style={styles.headerRight}>
          <button onClick={() => setShowSettings(true)} style={styles.settingsBtnPC}>
            <Icon name="cog" size={20} color="#fff" />
          </button>
          <button
            onClick={startRecording}
            disabled={isRecording || isProcessing || isFullscreenCall}
            style={{ ...styles.voiceBtnPC, ...(isRecording ? styles.voiceBtnPCActive : {}) }}
          >
            <Icon name="mic" size={20} color={isRecording ? "#fff" : "#ff003c"} />
            <span>{isRecording ? 'Recording...' : isProcessing ? 'Processing...' : 'Tap to Speak'}</span>
          </button>
          <button onClick={() => setSidebarOpen(true)} style={styles.menuBtnPC}>
            <Icon name="menu" size={24} color="#ff003c" />
          </button>
        </div>
      </header>

      <div style={styles.pcLayout}>
        <div style={styles.pcSidebar}>
          {/* ... sidebar content same as before ... */}
        </div>

        <div style={styles.pcMain}>
          <div style={styles.pcBallContainer}>
            <RedBall isSpeaking={isAISpeaking} />
          </div>
          <div style={styles.pcListeningContainer}>
            {isListening ? (
              <>
                <div style={styles.listeningDot} />
                <span style={styles.listeningText}>Listening...</span>
                {interimTranscript && <span style={styles.interimText}>"{interimTranscript}"</span>}
                {interimTranscript && (
                  <button onClick={sendInterim} style={styles.sendInterimBtn} disabled={isProcessing}>
                    <Icon name="send" size={16} color="#fff" /><span>Send</span>
                  </button>
                )}
              </>
            ) : isProcessing ? (
              <span style={styles.listeningText}>Processing...</span>
            ) : isRecording ? (
              <>
                <div style={{ ...styles.listeningDot, backgroundColor: '#ff003c', boxShadow: '0 0 20px #ff003c' }} />
                <span style={styles.listeningText}>Recording...</span>
                {interimTranscript && <span style={styles.interimText}>"{interimTranscript}"</span>}
                {interimTranscript && (
                  <>
                    <button onClick={sendInterim} style={styles.sendInterimBtn} disabled={isProcessing}>
                      <Icon name="send" size={16} color="#fff" /><span>Send</span>
                    </button>
                    <button onClick={cancelRecording} style={styles.cancelInterimBtn}>
                      <Icon name="close" size={18} color="#ff003c" />
                    </button>
                  </>
                )}
              </>
            ) : null}
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <>
          <div style={styles.sidebarOverlayPC} onClick={() => setSidebarOpen(false)} />
          <div style={styles.sidebarPC}>
            {/* ... sidebar content same as before ... */}
          </div>
        </>
      )}
    </div>
  )
}

// ============================================================
// STYLES – with new additions for boot, settings, voice controls
// ============================================================
const styles = {
  // ... (all previous styles remain exactly the same) ...
  // Additions and overrides:

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
  bootTitle: {
    fontSize: 'clamp(48px, 12vw, 72px)',
    fontWeight: 'bold',
    color: '#ff003c',
    textShadow: '0 0 40px #ff003c, 0 0 80px #ff003c44',
    letterSpacing: '8px',
    margin: '0 0 10px',
    fontFamily: "'Courier New', monospace",
    minHeight: '80px',
  },
  bootCursor: {
    display: 'inline-block',
    animation: 'blink 0.7s step-end infinite',
    color: '#ff003c',
  },
  bootSubtitle: {
    fontSize: 'clamp(14px, 2vw, 20px)',
    color: '#ff6688',
    letterSpacing: '4px',
    marginBottom: '40px',
    opacity: 0.8,
  },
  bootCredit: {
    color: '#ff6688',
    fontSize: '14px',
    marginTop: '20px',
    opacity: 0.7,
    letterSpacing: '1px',
    fontFamily: "'Courier New', monospace",
    borderTop: '1px solid rgba(255,0,60,0.2)',
    paddingTop: '16px',
  },

  // Settings Modal
  settingsOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.9)',
    zIndex: 99999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  settingsCard: {
    width: '100%',
    maxWidth: '420px',
    backgroundColor: '#111',
    border: '2px solid #ff003c',
    borderRadius: '12px',
    padding: '24px',
  },
  settingsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  settingsTitle: {
    color: '#ff003c',
    fontSize: '24px',
    margin: 0,
  },
  settingsClose: {
    background: 'none',
    border: 'none',
    color: '#888',
    fontSize: '24px',
    cursor: 'pointer',
  },
  settingsGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  settingItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff',
    fontSize: '15px',
  },
  toggleSwitch: {
    position: 'relative',
    width: '44px',
    height: '24px',
    display: 'inline-block',
  },
  toggleSwitch input: {
    opacity: 0,
    width: 0,
    height: 0,
  },
  toggleSlider: {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#333',
    transition: '.3s',
    borderRadius: '24px',
  },
  toggleSlider: {
    '&:before': {
      content: '""',
      position: 'absolute',
      height: '18px',
      width: '18px',
      left: '3px',
      bottom: '3px',
      backgroundColor: '#fff',
      transition: '.3s',
      borderRadius: '50%',
    },
  },
  // We'll apply the slider effect using pseudo-classes in a style tag
  settingsSelect: {
    padding: '4px 8px',
    backgroundColor: '#000',
    border: '1px solid #444',
    color: '#fff',
    borderRadius: '4px',
  },
  settingsRange: {
    width: '120px',
    backgroundColor: '#333',
    accentColor: '#ff003c',
  },
  settingsValue: {
    color: '#ff6688',
    minWidth: '30px',
    textAlign: 'right',
  },
  settingsDoneBtn: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#ff003c',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '20px',
  },

  // Voice controls in overview
  voiceControls: {
    display: 'flex',
    gap: '6px',
    alignItems: 'center',
  },
  voiceTranscriptPreview: {
    position: 'absolute',
    bottom: '80px',
    left: '16px',
    right: '16px',
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: '8px 16px',
    borderRadius: '12px',
    color: '#ff6688',
    fontSize: '14px',
    fontStyle: 'italic',
    border: '1px solid rgba(255,0,60,0.3)',
    textAlign: 'center',
  },

  // Message actions
  msgActions: {
    display: 'flex',
    gap: '4px',
    justifyContent: 'flex-end',
    marginTop: '4px',
    opacity: 0.6,
    transition: 'opacity 0.2s',
  },
  msgActionBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '2px 6px',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.1)',
    },
  },

  // Settings button top right
  settingsButtonTop: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    border: '2px solid #333',
    borderRadius: '30px',
    padding: '6px 12px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: '#fff',
    transition: 'all 0.3s ease',
  },
  settingsBtnPC: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    border: '1px solid #333',
    borderRadius: '16px',
    padding: '4px 10px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: '#fff',
  },

  // Override chatOverviewInputRowRaised to accommodate voice controls
  chatOverviewInputRowRaised: {
    display: 'flex',
    gap: '8px',
    padding: '12px 16px',
    paddingBottom: 'max(30px, env(safe-area-inset-bottom, 50px))',
    backgroundColor: '#111',
    borderTop: '1px solid #333',
    flexShrink: 0,
    alignItems: 'center',
    marginTop: '10px',
    position: 'relative',
  },
}

// ============================================================
// KEYFRAMES (add to index.css)
// ============================================================
/*
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
@keyframes pulseText {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
@keyframes rotateGlobe {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes ballPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
@keyframes spinRing {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 80px rgba(255,0,60,0.7); }
  50% { box-shadow: 0 0 120px rgba(255,0,60,0.9); }
}
*/
