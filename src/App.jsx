import { useState, useRef, useEffect, useCallback } from 'react'

// ==================================================
// ICON SYSTEM
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
    rotate: 'M21 12a9 9 0 1 1-6.219-8.56M15 3h6v6',
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

// ==================================================
// STORAGE HELPERS
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
// 🔴 RED BALL — 3D GLOWING SPHERE
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
  const [bootProgress, setBootProgress] = useState(0)
  const [bootStepIndex, setBootStepIndex] = useState(0)
  const [viewMode, setViewMode] = useState('android')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // ------ WELCOME OVERLAY ------
  const [showWelcomeOverlay, setShowWelcomeOverlay] = useState(false)
  const [welcomeStep, setWelcomeStep] = useState('greeting')
  const [welcomeMessage, setWelcomeMessage] = useState('')

  // ------ CHAT OVERVIEW ------
  const [showChatOverview, setShowChatOverview] = useState(false)
  const [chatOverviewInput, setChatOverviewInput] = useState('')
  const [chatOverviewListening, setChatOverviewListening] = useState(false)
  const [chatOverviewInterim, setChatOverviewInterim] = useState('')
  const [chatOverviewProcessing, setChatOverviewProcessing] = useState(false)
  const [chatOverviewVoiceEnabled, setChatOverviewVoiceEnabled] = useState(true)
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
  // FULLSCREEN ON FIRST INTERACTION
  // ==================================================
  const requestFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen()
        } else if (document.webkitRequestFullscreen) {
          await document.webkitRequestFullscreen()
        }
      }
    } catch (e) {}
  }, [])

  useEffect(() => {
    const handleFirstClick = () => {
      requestFullscreen()
      document.removeEventListener('click', handleFirstClick)
    }
    document.addEventListener('click', handleFirstClick)
    return () => document.removeEventListener('click', handleFirstClick)
  }, [requestFullscreen])

  // ==================================================
  // AI IDENTITY CHECK
  // ==================================================
  const getCreatorGreeting = (name) => {
    if (!name) return null
    const lowerName = name.toLowerCase()
    if (lowerName.includes('crypty') || lowerName === 'crypty') {
      return "🌟 Hello Creator Crypty! It's an honour to speak with you. You built me from scratch, and I'm forever grateful. How can I serve you today, my creator? 🙏"
    }
    if (lowerName.includes('mole') || lowerName === 'mole') {
      return "🔧 Hey Mole! The brilliant assistant developer who helped bring me to life. Your contributions are invaluable! What can I do for you today? 💪"
    }
    return null
  }

  // ==================================================
  // AUTH HANDLERS
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
        viewMode: 'android'
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
      msgCounter.current = (data.conversation || []).length + 1

      const today = new Date().toDateString()
      const lastWelcome = getLastWelcomeDate()
      if (lastWelcome !== today) {
        setLastWelcomeDate(today)
        setShowWelcomeOverlay(true)
        setWelcomeStep('greeting')
        const name = data.profile?.name || 'User'
        const creatorMsg = getCreatorGreeting(name)
        const msg = creatorMsg || `Hello ${name}! I'm CYPHER4X, your friendly AI assistant. How are you feeling today?`
        setWelcomeMessage(msg)
        speakText(msg.replace(/[🌟🔧🙏💪]/g, ''))
      } else {
        const name = data.profile?.name || 'User'
        const creatorMsg = getCreatorGreeting(name)
        const greet = creatorMsg || `Welcome back, ${name}! I'm CYPHER4X. How can I help you today? ✨`
        const assistantMsg = { id: ++msgCounter.current, role: 'assistant', content: greet, time: Date.now() }
        setConversation(prev => [...prev, assistantMsg])
        speakText(greet.replace(/[🌟🔧🙏💪✨]/g, ''))
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
      viewMode
    }
    saveUserData(email, pin, data)
  }

  useEffect(() => {
    if (userMode === 'loggedin') saveCurrentUserData()
  }, [profile, conversation, commandHistory, events, reminders, faceRecognition, biometricAuth, voiceGender, viewMode])

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
      utterance.rate = 1
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
  }, [voiceGender])

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
  // OVERVIEW CHAT
  // ==================================================
  const setupOverviewRecognition = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Your browser doesn't support speech recognition.")
      return null
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onstart = () => setChatOverviewListening(true)
    recognition.onend = () => setChatOverviewListening(false)
    recognition.onerror = () => setChatOverviewListening(false)
    recognition.onresult = async (event) => {
      let final = '', interim = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        if (result.isFinal) final += result[0].transcript
        else interim += result[0].transcript
      }
      if (final) {
        setChatOverviewInterim('')
        await processUserQuery(final)
      } else if (interim) {
        setChatOverviewInterim(interim)
      }
    }
    return recognition
  }, [processUserQuery])

  const toggleOverviewVoice = useCallback(() => {
    if (chatOverviewListening) {
      if (chatOverviewRecognitionRef.current) {
        try { chatOverviewRecognitionRef.current.stop() } catch (e) {}
      }
      setChatOverviewListening(false)
    } else {
      if (!chatOverviewRecognitionRef.current) {
        chatOverviewRecognitionRef.current = setupOverviewRecognition()
      }
      if (chatOverviewRecognitionRef.current) {
        try { chatOverviewRecognitionRef.current.start() } catch (e) {}
      }
    }
  }, [chatOverviewListening, setupOverviewRecognition])

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

  // ==================================================
  // FILE SHARE HANDLER (main)
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
  // FULL‑SCREEN CALL HANDLERS
  // ==================================================
  const toggleFullscreenCall = useCallback(async () => {
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
      if (document.fullscreenElement || document.webkitFullscreenElement) {
        try {
          if (document.exitFullscreen) await document.exitFullscreen()
          else if (document.webkitExitFullscreen) await document.webkitExitFullscreen()
        } catch (e) {}
      }
    } else {
      setIsFullscreenCall(true)
      setIsCallActive(true)
      try {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen()
        } else if (document.webkitRequestFullscreen) {
          await document.webkitRequestFullscreen()
        }
      } catch (e) {}
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
  // STATS
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
  // BOOT SEQUENCE + AUTO-LOGIN + GUEST WELCOME
  // ==================================================
  useEffect(() => {
    const bootSteps = [
      { label: 'Initializing Neural Networks...', duration: 1500 },
      { label: 'Loading Knowledge Base...', duration: 1200 },
      { label: 'Establishing Secure Connection...', duration: 1000 },
      { label: 'Calibrating Voice Recognition...', duration: 800 },
      { label: 'System Ready.', duration: 600 },
    ]
    let totalDuration = bootSteps.reduce((sum, s) => sum + s.duration, 0)
    let elapsed = 0
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
          setIsBooting(false)
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
            if (lastWelcome !== today) {
              setLastWelcomeDate(today)
              setShowWelcomeOverlay(true)
              setWelcomeStep('greeting')
              const msg = "Hello User! I'm CYPHER4X, your friendly AI assistant. How are you feeling today?"
              setWelcomeMessage(msg)
              speakText(msg)
            }
          }
        }, 300)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])

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
        viewMode: 'android'
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
  // RENDER: BOOT SCREEN
  // ============================================================
  if (isBooting) {
    const bootSteps = [
      'Initializing Neural Networks...',
      'Loading Knowledge Base...',
      'Establishing Secure Connection...',
      'Calibrating Voice Recognition...',
      'System Ready!'
    ]
    return (
      <div style={styles.bootContainer}>
        <div style={styles.bootBackground} />
        <div style={styles.bootContent}>
          <h1 style={styles.bootTitle}>CYPHER4X</h1>
          <p style={styles.bootSubtitle}>Advanced AI System</p>
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
          <div style={styles.bootCredit}>
            Created by The Hackers Hub led by {CREATED_BY} & {ASSISTED_BY}
          </div>
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
  // RENDER: ROTATE OVERLAY (PC view)
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
  // RENDER: CHAT OVERVIEW
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
            </div>
          ))}
          {chatOverviewInterim && (
            <div style={{ ...styles.chatOverviewMsg, alignSelf: 'flex-end', backgroundColor: '#333', opacity: 0.7 }}>
              <span style={styles.chatOverviewMsgText}>"{chatOverviewInterim}"</span>
            </div>
          )}
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
          <button onClick={toggleOverviewVoice} style={styles.chatOverviewMicBtn}>
            <Icon name="mic" size={20} color={chatOverviewListening ? "#4f8" : "#fff"} />
          </button>
          <label style={styles.chatOverviewAttachBtn}>
            <Icon name="file" size={20} color="#fff" />
            <input type="file" accept="image/*,video/*,.pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx" onChange={handleOverviewFileShare} style={{ display: 'none' }} />
          </label>
          <button onClick={sendOverviewText} style={styles.chatOverviewSendBtn} disabled={isProcessing}>
            <Icon name="send" size={20} color="#fff" />
          </button>
        </div>
      </div>
    )
  }

  // ============================================================
  // RENDER: PROFILE EDIT
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
  // RENDER: ANDROID VIEW — CORRECT LAYOUT (ball center, call top right, speak bottom)
  // ============================================================
  if (viewMode === 'android') {
    return (
      <div style={styles.appAndroid}>
        {/* Sidebar */}
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
                <h3 style={styles.sectionTitle}><Icon name="chart" size={16} color="#ff003c" /> SYSTEM STATS</h3>
                <div style={styles.statsCard}>
                  <div style={styles.statRow}><span style={styles.statLabel}><Icon name="hourglass" size={14} color="#888" /> Uptime</span><span style={styles.statValue}>{formatUptime(stats.uptime)}</span></div>
                  <div style={styles.statRow}><span style={styles.statLabel}><Icon name="cpu" size={14} color="#888" /> CPU Usage</span><span style={styles.statValue}>{stats.cpuUsage}%</span></div>
                  <div style={styles.statRow}><span style={styles.statLabel}><Icon name="cpu" size={14} color="#888" /> CPU Temp</span><span style={styles.statValue}>{stats.cpuTemp}°C</span></div>
                  <div style={styles.statRow}><span style={styles.statLabel}><Icon name="memory" size={14} color="#888" /> RAM Usage</span><span style={styles.statValue}>{stats.ramUsage.toFixed(1)} GB</span></div>
                  <div style={styles.statRow}><span style={styles.statLabel}><Icon name="save" size={14} color="#888" /> Storage</span><span style={styles.statValue}>{stats.storageUsed}/{stats.storageTotal} GB</span></div>
                  <div style={styles.statRow}><span style={styles.statLabel}><Icon name="network" size={14} color="#888" /> Network</span><span style={styles.statValue}>{stats.networkSpeed} Mbps</span></div>
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
                  <span style={{ color: isListening ? '#4f8' : isRecording ? '#ff003c' : '#888', fontWeight: 'bold' }}>
                    {isListening ? '🎤 Listening' : isRecording ? '🔴 Recording' : 'Standby'}
                  </span>
                </div>
              </div>
              {/* CONVERSATION with Overview button */}
              <div style={styles.sidebarSection}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <h3 style={styles.sectionTitle}><Icon name="chat" size={16} color="#ff003c" /> CONVERSATION</h3>
                  <button onClick={() => setShowChatOverview(true)} style={styles.overviewBtn}>
                    <Icon name="desktop" size={14} color="#fff" /> Overview
                  </button>
                </div>
                <div style={styles.conversationLogPC}>
                  {conversation.length === 0 && <p style={styles.dashEmptyPC}>No conversation yet</p>}
                  {conversation.slice(-6).map(msg => (
                    <div key={msg.id} style={styles.convItemPC}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: msg.role === 'user' ? 'bold' : 'normal', color: msg.role === 'user' ? '#ddd' : '#ff003c' }}>
                          {msg.role === 'user' ? profile?.name || 'You' : 'CYPHER4X'}
                        </span>
                        <span style={styles.convTimePC}>{formatTime(msg.time)}</span>
                      </div>
                      <span style={styles.convTextPC}>{msg.content}</span>
                      {msg.file && (
                        <div style={styles.filePreviewPC}>
                          {msg.file.type.startsWith('image/') && <img src={msg.file.data} alt={msg.file.name} style={{ maxWidth: '100%', maxHeight: '100px', borderRadius: '4px', marginTop: '4px' }} />}
                          {msg.file.type.startsWith('video/') && <video controls style={{ maxWidth: '100%', maxHeight: '100px', borderRadius: '4px', marginTop: '4px' }}><source src={msg.file.data} type={msg.file.type} /></video>}
                          {!msg.file.type.startsWith('image/') && !msg.file.type.startsWith('video/') && (
                            <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
                              <Icon name="file" size={14} color="#ff003c" /> {msg.file.name} ({(msg.file.size / 1024).toFixed(1)} KB)
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div style={styles.inputRow}>
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendTextMessage()}
                    placeholder="Type a message..."
                    style={styles.textInputSmall}
                  />
                  <button onClick={sendTextMessage} style={styles.sendBtnSmall} disabled={isProcessing}>
                    <Icon name="send" size={16} color="#fff" />
                  </button>
                </div>
                <div style={styles.commandActionsPC}>
                  <button onClick={clearConversation} style={styles.dashBtnPC}><Icon name="trash" size={14} color="#fff" /> Clear</button>
                  <button onClick={exportChat} style={styles.dashBtnPC}><Icon name="save" size={14} color="#fff" /> Export</button>
                  <label style={styles.attachBtnPC}>
                    <Icon name="file" size={14} color="#fff" /> Attach
                    <input type="file" accept="image/*,video/*,.pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx" onChange={handleFileShare} style={{ display: 'none' }} />
                  </label>
                </div>
              </div>
              {/* COMMAND HISTORY */}
              <div style={styles.sidebarSection}>
                <h3 style={styles.sectionTitle}><Icon name="clock" size={16} color="#ff003c" /> COMMAND HISTORY</h3>
                <div style={styles.commandHistoryPC}>
                  {commandHistory.length === 0 && <p style={styles.dashEmptyPC}>No commands yet</p>}
                  {commandHistory.slice(-6).reverse().map((cmd, i) => (
                    <div key={i} style={styles.cmdItemPC}>
                      <span style={styles.cmdTimePC}>{formatTime(cmd.timestamp)}</span>
                      <span style={styles.cmdTextPC}>{cmd.command}</span>
                    </div>
                  ))}
                </div>
                <button onClick={clearCommands} style={styles.dashBtnPC}><Icon name="trash" size={14} color="#fff" /> Clear All</button>
              </div>
              {/* PROFILE with Logout */}
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
                {userMode === 'loggedin' ? (
                  <button onClick={handleLogout} style={styles.logoutBtn}><Icon name="close" size={14} color="#fff" /> Logout</button>
                ) : (
                  <button onClick={() => { setShowAuthModal(true); setShowLogin(true); }} style={styles.sidebarBtn}><Icon name="settings" size={14} color="#fff" /> Login</button>
                )}
              </div>
              {/* DANGER ZONE */}
              <div style={styles.sidebarSection}>
                <h3 style={styles.sectionTitle}><Icon name="alertTriangle" size={16} color="#ff003c" /> DANGER ZONE</h3>
                <button onClick={resetAllData} style={styles.dangerBtn}><Icon name="trash" size={14} color="#fff" /> Reset All Data</button>
              </div>
            </div>
          </>
        )}

        {/* Main Content — CORRECT LAYOUT */}
        <div style={styles.mainContentAndroid}>
          <div style={styles.backgroundAndroid}>
            {/* Top Left: Menu button */}
            <button onClick={() => setSidebarOpen(true)} style={styles.menuBtnTopLeft}>
              <Icon name="menu" size={28} color="#ff003c" />
            </button>

            {/* Top Right: CALL button */}
            <button onClick={toggleFullscreenCall} style={styles.callBtnTopRight}>
              <Icon name="phone" size={22} color={isFullscreenCall ? "#4f8" : "#ff003c"} />
              <span style={styles.callBtnTopRightLabel}>{isFullscreenCall ? 'ACTIVE' : 'CALL'}</span>
            </button>

            {/* Center: 3D Red Ball */}
            <div style={styles.centerBallWrapper}>
              <RedBall isSpeaking={isAISpeaking} />
            </div>

            {/* Bottom: Tap to Speak / Mic button */}
            <div style={styles.speakButtonContainer}>
              <button
                onClick={startRecording}
                disabled={isRecording || isProcessing || isFullscreenCall}
                style={{ ...styles.speakButton, ...(isRecording ? styles.speakButtonActive : {}) }}
              >
                <Icon name="mic" size={36} color="#fff" />
                <span style={styles.speakButtonLabel}>
                  {isRecording ? 'Recording...' : isProcessing ? 'Processing...' : 'Tap to Speak'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ============================================================
  // RENDER: PC VIEW
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
          {/* ... sidebar content unchanged ... */}
          <div style={styles.pcSidebarSection}>
            <h3 style={styles.pcSidebarTitle}><Icon name="chart" size={16} color="#ff003c" /> SYSTEM STATS</h3>
            <div style={styles.pcSidebarRow}><span>CPU Usage</span><span style={{ color: stats.cpuUsage > 80 ? '#ff003c' : '#4f8' }}>{stats.cpuUsage}%</span></div>
            <div style={styles.pcSidebarRow}><span>CPU Temp</span><span style={{ color: stats.cpuTemp > 80 ? '#ff003c' : '#ff6688' }}>{stats.cpuTemp}°C</span></div>
            <div style={styles.pcSidebarRow}><span>RAM Usage</span><span style={{ color: stats.ramUsage > 8 ? '#ff003c' : '#ff6688' }}>{stats.ramUsage.toFixed(1)} GB</span></div>
            <div style={styles.pcSidebarRow}><span>Storage</span><span>{stats.storageUsed}/{stats.storageTotal} GB</span></div>
            <div style={styles.pcSidebarRow}><span>Network</span><span style={{ color: parseFloat(stats.networkSpeed) < 1 ? '#ff003c' : '#4f8' }}>{stats.networkSpeed} Mbps</span></div>
            <div style={styles.pcSidebarRow}><span>Uptime</span><span>{formatUptime(stats.uptime)}</span></div>
          </div>
          <div style={styles.pcSidebarSection}>
            <h3 style={styles.pcSidebarTitle}><Icon name="settings" size={16} color="#ff003c" /> AI CONFIGURATION</h3>
            <div style={styles.pcSidebarRow}><span>AI Engine</span><span>TAVILY</span></div>
            <div style={styles.pcSidebarRow}><span>Language</span><span>English</span></div>
            <div style={styles.pcSidebarRow}>
              <span>Voice</span>
              <select value={voiceGender} onChange={(e) => setVoiceGender(e.target.value)} style={styles.selectInputPC}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div style={styles.pcSidebarRow}>
              <span>Status</span>
              <span style={{ color: isListening ? '#4f8' : isRecording ? '#ff003c' : '#888', fontWeight: 'bold' }}>
                {isListening ? '🎤 Listening' : isRecording ? '🔴 Recording' : 'Standby'}
              </span>
            </div>
          </div>
          <div style={styles.pcSidebarSection}>
            <h3 style={styles.pcSidebarTitle}><Icon name="faceId" size={16} color="#ff003c" /> SECURITY</h3>
            <div style={styles.pcSidebarRow}>
              <span>Face Recognition</span>
              <div style={styles.toggleGroupPC}>
                <button onClick={() => setFaceRecognition(true)} style={{ ...styles.toggleBtnPC, ...(faceRecognition ? styles.toggleBtnPCO : {}) }}>Enable</button>
                <button onClick={() => setFaceRecognition(false)} style={{ ...styles.toggleBtnPC, ...(!faceRecognition ? styles.toggleBtnPCF : {}) }}>Disable</button>
              </div>
            </div>
            <div style={styles.pcSidebarRow}>
              <span>Biometric Auth</span>
              <div style={styles.toggleGroupPC}>
                <button onClick={() => setBiometricAuth(true)} style={{ ...styles.toggleBtnPC, ...(biometricAuth ? styles.toggleBtnPCO : {}) }}>Enable</button>
                <button onClick={() => setBiometricAuth(false)} style={{ ...styles.toggleBtnPC, ...(!biometricAuth ? styles.toggleBtnPCF : {}) }}>Disable</button>
              </div>
            </div>
          </div>
          <div style={styles.pcSidebarSection}>
            <h3 style={styles.pcSidebarTitle}><Icon name="calendar" size={16} color="#ff003c" /> TODAY'S EVENTS</h3>
            {events.length === 0 ? <p style={styles.dashEmptyPC}>No events scheduled</p> : events.map((evt, i) => (
              <div key={i} style={styles.pcSidebarRow}><span>{evt.title}</span><span style={styles.eventTimePC}>{evt.time}</span></div>
            ))}
          </div>
          <div style={styles.pcSidebarSection}>
            <h3 style={styles.pcSidebarTitle}><Icon name="clock" size={16} color="#ff003c" /> REMINDERS</h3>
            {reminders.length === 0 ? <p style={styles.dashEmptyPC}>No reminders set</p> : reminders.map((rem, i) => (
              <div key={i} style={styles.pcSidebarRow}><span>{rem.text}</span><span style={styles.eventTimePC}>{rem.time}</span></div>
            ))}
          </div>
          {/* CONVERSATION with Overview button */}
          <div style={styles.pcSidebarSection}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <h3 style={styles.pcSidebarTitle}><Icon name="chat" size={16} color="#ff003c" /> CONVERSATION</h3>
              <button onClick={() => setShowChatOverview(true)} style={styles.overviewBtn}>
                <Icon name="desktop" size={14} color="#fff" /> Overview
              </button>
            </div>
            <div style={styles.conversationLogPC}>
              {conversation.length === 0 && <p style={styles.dashEmptyPC}>No conversation yet</p>}
              {conversation.slice(-6).map(msg => (
                <div key={msg.id} style={styles.convItemPC}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: msg.role === 'user' ? 'bold' : 'normal', color: msg.role === 'user' ? '#ddd' : '#ff003c' }}>
                      {msg.role === 'user' ? profile?.name || 'You' : 'CYPHER4X'}
                    </span>
                    <span style={styles.convTimePC}>{formatTime(msg.time)}</span>
                  </div>
                  <span style={styles.convTextPC}>{msg.content}</span>
                  {msg.file && (
                    <div style={styles.filePreviewPC}>
                      {msg.file.type.startsWith('image/') && <img src={msg.file.data} alt={msg.file.name} style={{ maxWidth: '100%', maxHeight: '100px', borderRadius: '4px', marginTop: '4px' }} />}
                      {msg.file.type.startsWith('video/') && <video controls style={{ maxWidth: '100%', maxHeight: '100px', borderRadius: '4px', marginTop: '4px' }}><source src={msg.file.data} type={msg.file.type} /></video>}
                      {!msg.file.type.startsWith('image/') && !msg.file.type.startsWith('video/') && (
                        <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
                          <Icon name="file" size={14} color="#ff003c" /> {msg.file.name} ({(msg.file.size / 1024).toFixed(1)} KB)
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div style={styles.inputRow}>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendTextMessage()}
                placeholder="Type a message..."
                style={styles.textInputSmall}
              />
              <button onClick={sendTextMessage} style={styles.sendBtnSmall} disabled={isProcessing}>
                <Icon name="send" size={16} color="#fff" />
              </button>
            </div>
            <div style={styles.commandActionsPC}>
              <button onClick={clearConversation} style={styles.dashBtnPC}><Icon name="trash" size={14} color="#fff" /> Clear</button>
              <button onClick={exportChat} style={styles.dashBtnPC}><Icon name="save" size={14} color="#fff" /> Export</button>
              <label style={styles.attachBtnPC}>
                <Icon name="file" size={14} color="#fff" /> Attach
                <input type="file" accept="image/*,video/*,.pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx" onChange={handleFileShare} style={{ display: 'none' }} />
              </label>
            </div>
          </div>
          <div style={styles.pcSidebarSection}>
            <h3 style={styles.pcSidebarTitle}><Icon name="clock" size={16} color="#ff003c" /> COMMAND HISTORY</h3>
            <div style={styles.commandHistoryPC}>
              {commandHistory.length === 0 && <p style={styles.dashEmptyPC}>No commands yet</p>}
              {commandHistory.slice(-6).reverse().map((cmd, i) => (
                <div key={i} style={styles.cmdItemPC}>
                  <span style={styles.cmdTimePC}>{formatTime(cmd.timestamp)}</span>
                  <span style={styles.cmdTextPC}>{cmd.command}</span>
                </div>
              ))}
            </div>
            <button onClick={clearCommands} style={styles.dashBtnPC}><Icon name="trash" size={14} color="#fff" /> Clear All</button>
          </div>
          <div style={styles.pcSidebarSection}>
            <h3 style={styles.pcSidebarTitle}><Icon name="desktop" size={16} color="#ff003c" /> VIEW MODE</h3>
            <button onClick={toggleView} style={styles.toggleBtnPC2}>Switch to Android</button>
          </div>
          <div style={styles.pcSidebarSection}>
            <h3 style={styles.pcSidebarTitle}><Icon name="user" size={16} color="#ff003c" /> PROFILE</h3>
            <div style={styles.profileCardSidebarPC}>
              <div style={styles.profileAvatarWrapperPC}>
                {profile?.avatar ? <img src={profile.avatar} alt="Avatar" style={styles.profileAvatarPC} /> : <div style={styles.profileAvatarPlaceholderPC}>{profile?.name?.charAt(0) || "?"}</div>}
              </div>
              <div style={styles.profileInfoPC}>
                <div style={styles.profileNamePC}>{profile?.name || "User"}</div>
                <div style={styles.profileHandlePC}><Icon name="atSign" size={12} color="#888" />{profile?.username || "anonymous"}</div>
              </div>
            </div>
            <button onClick={openEditProfile} style={styles.sidebarBtnPC}><Icon name="edit" size={14} color="#fff" /> Edit Profile</button>
            {userMode === 'loggedin' ? (
              <button onClick={handleLogout} style={styles.logoutBtn}><Icon name="close" size={14} color="#fff" /> Logout</button>
            ) : (
              <button onClick={() => { setShowAuthModal(true); setShowLogin(true); }} style={styles.sidebarBtnPC}><Icon name="settings" size={14} color="#fff" /> Login</button>
            )}
          </div>
          <div style={styles.pcSidebarSection}>
            <h3 style={styles.pcSidebarTitle}><Icon name="alertTriangle" size={16} color="#ff003c" /> DANGER ZONE</h3>
            <button onClick={resetAllData} style={styles.dangerBtnPC}><Icon name="trash" size={14} color="#fff" /> Reset All Data</button>
          </div>
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
                <div style={styles.profileAvatarWrapperPC}>
                  {profile?.avatar ? <img src={profile.avatar} alt="Avatar" style={styles.profileAvatarPC} /> : <div style={styles.profileAvatarPlaceholderPC}>{profile?.name?.charAt(0) || "?"}</div>}
                </div>
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

// ============================================================
// STYLES — Complete (with correct layout)
// ============================================================
const styles = {
  appAndroid: {
    minHeight: '100vh',
    height: '100vh',
    backgroundColor: '#000',
    color: '#e0e0e0',
    fontFamily: "'Segoe UI', 'Courier New', monospace",
    overflow: 'hidden',
    border: 'none',
    margin: 0,
    padding: 0,
    position: 'relative',
  },
  bootContainer: {
    backgroundColor: '#000',
    minHeight: '100vh',
    height: '100vh',
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
    animation: 'pulseText 1.5s ease-in-out infinite',
  },
  bootSubtitle: {
    fontSize: 'clamp(14px, 2vw, 20px)',
    color: '#ff6688',
    letterSpacing: '4px',
    marginBottom: '40px',
    opacity: 0.8,
  },
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
    backgroundColor: '#ff003c',
    boxShadow: '0 0 20px #ff003c',
    animation: 'pulseText 1s infinite',
  },
  bootStatusText: {
    color: '#ff6688',
    fontSize: '14px',
    letterSpacing: '2px',
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
  // ─── MAIN ANDROID LAYOUT (correct) ───
  mainContentAndroid: {
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
  backgroundAndroid: {
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
  // Top Left: Menu button
  menuBtnTopLeft: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '30px',
    padding: '8px 12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(10px)',
  },
  // Top Right: CALL button
  callBtnTopRight: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    border: '2px solid #ff003c',
    borderRadius: '30px',
    padding: '8px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
  },
  callBtnTopRightLabel: {
    color: '#ff003c',
    fontSize: '12px',
    fontWeight: 'bold',
    letterSpacing: '1px',
  },
  // Center: Red Ball
  centerBallWrapper: {
    position: 'relative',
    width: 'clamp(160px, 35vw, 220px)',
    height: 'clamp(160px, 35vw, 220px)',
    zIndex: 2,
    marginBottom: '20px',
  },
  // Bottom: Speak button
  speakButtonContainer: {
    position: 'absolute',
    bottom: '15%',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  speakButton: {
    width: 'clamp(80px, 16vw, 110px)',
    height: 'clamp(80px, 16vw, 110px)',
    borderRadius: '50%',
    backgroundColor: '#1a1a1a',
    border: '3px solid #ff003c',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2px',
    transition: 'all 0.3s ease',
    boxShadow: '0 0 40px rgba(255,0,60,0.2)',
  },
  speakButtonActive: {
    backgroundColor: '#ff003c',
    borderColor: '#ff003c',
    boxShadow: '0 0 80px rgba(255,0,60,0.7)',
    animation: 'pulseGlow 1s ease-in-out infinite',
  },
  speakButtonLabel: {
    color: '#fff',
    fontSize: '10px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    marginTop: '2px',
  },
  // ─── BALL STYLES (3D) ───
  ballContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ball3DContainer: {
    perspective: '800px',
    transformStyle: 'preserve-3d',
    width: '100%',
    height: '100%',
  },
  ball3D: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    position: 'relative',
    transformStyle: 'preserve-3d',
    background: `
      radial-gradient(circle at 30% 25%, rgba(255, 200, 220, 0.9) 0%, transparent 45%),
      radial-gradient(circle at 40% 35%, #ff6688 0%, #ff3355 25%, #ff003c 50%, #990022 75%, #550011 100%)
    `,
    boxShadow: `
      inset -20px -20px 40px rgba(80, 0, 20, 0.8),
      inset 15px 15px 30px rgba(255, 180, 200, 0.4),
      0 0 50px rgba(255, 0, 60, 0.5),
      0 0 100px rgba(255, 0, 60, 0.3),
      0 0 150px rgba(255, 0, 60, 0.15)
    `,
    animation: 'rotateGlobe 25s linear infinite',
    transition: 'all 0.3s ease',
  },
  ball3DSpeaking: {
    boxShadow: `
      inset -20px -20px 40px rgba(80, 0, 20, 0.8),
      inset 15px 15px 30px rgba(255, 180, 200, 0.5),
      0 0 80px rgba(255, 0, 60, 0.8),
      0 0 150px rgba(255, 0, 60, 0.5),
      0 0 220px rgba(255, 0, 60, 0.25)
    `,
    animation: 'rotateGlobe 25s linear infinite, ballPulse 1.2s ease-in-out infinite',
  },
  ballHighlight: {
    position: 'absolute',
    top: '18%',
    left: '22%',
    width: '35%',
    height: '25%',
    borderRadius: '50%',
    background: 'radial-gradient(ellipse, rgba(255,255,255,0.6) 0%, transparent 70%)',
    filter: 'blur(4px)',
    pointerEvents: 'none',
  },
  ballInnerGlow: {
    position: 'absolute',
    top: '15%',
    left: '15%',
    width: '70%',
    height: '70%',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255,100,140,0.2) 0%, transparent 60%)',
    pointerEvents: 'none',
  },
  ring1: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '140%',
    height: '140%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '50%',
    border: '2px solid rgba(255,0,60,0.25)',
    animation: 'spinRing 12s linear infinite',
    boxShadow: '0 0 30px rgba(255,0,60,0.05)',
    pointerEvents: 'none',
  },
  ring2: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '160%',
    height: '160%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '50%',
    border: '1px solid rgba(255,0,60,0.12)',
    animation: 'spinRing 18s linear infinite reverse',
    pointerEvents: 'none',
  },
  ring3: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '120%',
    height: '120%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '50%',
    border: '1px dashed rgba(255,0,60,0.15)',
    animation: 'spinRing 8s linear infinite',
    pointerEvents: 'none',
  },
  // ─── SIDEBAR (unchanged) ───
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
    left: 0,
    bottom: 0,
    width: '380px',
    maxWidth: '90vw',
    backgroundColor: '#0a0000',
    borderRight: '2px solid #ff003c',
    zIndex: 999,
    overflowY: 'auto',
    padding: '16px',
    border: 'none',
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
  sidebarSection: { marginBottom: '12px' },
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
  logoutBtn: {
    padding: '6px 12px',
    backgroundColor: '#880000',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    fontSize: '13px',
  },
  // ─── AUTH / MODAL STYLES (unchanged) ───
  authModalOverlay: {
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
  authModalCard: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#111',
    border: '2px solid #ff003c',
    borderRadius: '12px',
    padding: '30px',
    textAlign: 'center',
    position: 'relative',
  },
  authModalClose: {
    position: 'absolute',
    top: '10px',
    right: '15px',
    background: 'none',
    border: 'none',
    color: '#888',
    fontSize: '24px',
    cursor: 'pointer',
  },
  authTitle: {
    color: '#ff003c',
    fontSize: '32px',
    letterSpacing: '4px',
    marginBottom: '4px',
  },
  authSubtitle: {
    color: '#ff6688',
    fontSize: '18px',
    marginBottom: '20px',
  },
  authError: {
    color: '#ff003c',
    fontSize: '14px',
    minHeight: '24px',
    marginBottom: '12px',
  },
  authInput: {
    width: '100%',
    padding: '12px',
    marginBottom: '12px',
    backgroundColor: '#000',
    border: '1px solid #333',
    color: '#fff',
    borderRadius: '6px',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  authBtn: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#ff003c',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '8px',
  },
  authSwitch: {
    marginTop: '16px',
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    color: '#888',
    fontSize: '14px',
  },
  authSwitchBtn: {
    background: 'none',
    border: 'none',
    color: '#ff003c',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
  guestLimitOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.92)',
    zIndex: 99998,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  guestLimitCard: {
    backgroundColor: '#111',
    border: '2px solid #ff003c',
    borderRadius: '20px',
    padding: '40px 30px',
    maxWidth: '420px',
    width: '100%',
    textAlign: 'center',
  },
  guestLimitTitle: {
    color: '#ff003c',
    fontSize: '24px',
    marginBottom: '16px',
  },
  guestLimitText: {
    color: '#ddd',
    fontSize: '16px',
    lineHeight: '1.6',
    marginBottom: '24px',
  },
  guestLimitButtons: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  guestLimitLoginBtn: {
    padding: '12px 30px',
    backgroundColor: '#ff003c',
    color: '#fff',
    border: 'none',
    borderRadius: '30px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    flex: 1,
    minWidth: '100px',
  },
  guestLimitSignupBtn: {
    padding: '12px 30px',
    backgroundColor: '#1a3a3a',
    color: '#fff',
    border: '1px solid #2a5a5a',
    borderRadius: '30px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    flex: 1,
    minWidth: '100px',
  },
  welcomeOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.92)',
    zIndex: 99997,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  welcomeCard: {
    backgroundColor: '#111',
    border: '2px solid #ff003c',
    borderRadius: '20px',
    padding: '40px 30px',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
  },
  welcomeBall: {
    width: '120px',
    height: '120px',
    margin: '0 auto 20px',
    position: 'relative',
  },
  welcomeMessageText: {
    color: '#fff',
    fontSize: '20px',
    lineHeight: '1.6',
    marginBottom: '24px',
    fontFamily: "'Courier New', monospace",
  },
  welcomeButtons: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  welcomeBtnNotFine: {
    padding: '12px 24px',
    backgroundColor: '#880000',
    color: '#fff',
    border: '1px solid #ff003c',
    borderRadius: '30px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    flex: 1,
    minWidth: '120px',
  },
  welcomeBtnFine: {
    padding: '12px 24px',
    backgroundColor: '#008800',
    color: '#fff',
    border: '1px solid #4f8',
    borderRadius: '30px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    flex: 1,
    minWidth: '120px',
  },
  welcomeDecisionText: {
    color: '#ff6688',
    fontSize: '18px',
    fontStyle: 'italic',
    marginTop: '12px',
  },
  rotateOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.9)',
    zIndex: 99996,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  rotateCard: {
    backgroundColor: '#111',
    border: '2px solid #ff003c',
    borderRadius: '20px',
    padding: '40px 30px',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  },
  rotateText: {
    color: '#fff',
    fontSize: '18px',
    margin: '20px 0',
    lineHeight: '1.6',
    fontFamily: "'Courier New', monospace",
  },
  rotateOkBtn: {
    padding: '12px 40px',
    backgroundColor: '#ff003c',
    color: '#fff',
    border: 'none',
    borderRadius: '30px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  fullscreenCallOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: '#000',
    zIndex: 99995,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  returnBtn: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    backgroundColor: 'rgba(255,0,60,0.3)',
    border: '1px solid #ff003c',
    borderRadius: '30px',
    padding: '10px 20px',
    color: '#fff',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    zIndex: 10,
  },
  fullscreenCallContentNoBall: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '30px',
    width: '100%',
    maxWidth: '500px',
    flex: 1,
  },
  fullscreenListeningStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: '8px 20px',
    borderRadius: '30px',
    border: '1px solid rgba(255,0,60,0.2)',
  },
  fullscreenListeningDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: '#4f8',
    boxShadow: '0 0 20px #4f8',
    animation: 'pulseText 0.8s ease-in-out infinite',
  },
  fullscreenSpeakingDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: '#ff003c',
    boxShadow: '0 0 20px #ff003c',
    animation: 'pulseText 0.8s ease-in-out infinite',
  },
  fullscreenStatusText: {
    color: '#fff',
    fontSize: '18px',
    fontWeight: 'bold',
    letterSpacing: '1px',
  },
  fullscreenTranscript: {
    color: '#ff6688',
    fontSize: '16px',
    fontStyle: 'italic',
    padding: '8px 20px',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: '12px',
    maxWidth: '90%',
    textAlign: 'center',
    border: '1px solid rgba(255,0,60,0.2)',
    minHeight: '40px',
  },
  fullscreenMicBtn: {
    width: 'clamp(70px, 14vw, 100px)',
    height: 'clamp(70px, 14vw, 100px)',
    borderRadius: '50%',
    backgroundColor: '#ff003c',
    border: '3px solid #ff003c',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 60px rgba(255,0,60,0.4)',
    transition: 'all 0.3s ease',
    '&:hover': { transform: 'scale(1.05)' },
    '&:disabled': { opacity: 0.5, cursor: 'not-allowed' },
  },
  chatOverviewContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: '#000',
    zIndex: 99994,
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 'env(safe-area-inset-bottom, 10px)',
    overflow: 'hidden',
  },
  chatOverviewHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    backgroundColor: '#111',
    borderBottom: '1px solid #333',
    flexShrink: 0,
  },
  chatOverviewBackBtn: {
    background: 'none',
    border: 'none',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  chatOverviewTitle: {
    color: '#ff003c',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  chatOverviewVoiceToggle: {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    padding: '4px',
  },
  chatOverviewMessages: {
    flex: 1,
    overflowY: 'auto',
    padding: '12px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    maxHeight: 'calc(100vh - 160px)',
  },
  chatOverviewEmpty: {
    color: '#666',
    textAlign: 'center',
    fontSize: '16px',
    marginTop: '40px',
  },
  chatOverviewMsg: {
    maxWidth: '80%',
    padding: '10px 14px',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  chatOverviewMsgText: {
    color: '#fff',
    fontSize: '14px',
    wordBreak: 'break-word',
  },
  chatOverviewMsgTime: {
    fontSize: '10px',
    color: '#888',
    alignSelf: 'flex-end',
  },
  chatOverviewInputRowRaised: {
    display: 'flex',
    gap: '8px',
    padding: '14px 16px',
    paddingBottom: 'max(40px, env(safe-area-inset-bottom, 60px))',
    backgroundColor: '#111',
    borderTop: '1px solid #333',
    flexShrink: 0,
    alignItems: 'center',
    marginTop: '8px',
  },
  chatOverviewInput: {
    flex: 1,
    padding: '10px 14px',
    backgroundColor: '#000',
    border: '1px solid #333',
    color: '#fff',
    borderRadius: '20px',
    fontSize: '14px',
    outline: 'none',
  },
  chatOverviewMicBtn: {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,0,60,0.2)',
  },
  chatOverviewAttachBtn: {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,0,60,0.2)',
    display: 'flex',
    alignItems: 'center',
  },
  chatOverviewSendBtn: {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '50%',
    backgroundColor: '#ff003c',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:disabled': { opacity: 0.5, cursor: 'not-allowed' },
  },
  overviewBtn: {
    padding: '4px 12px',
    backgroundColor: '#1a3a3a',
    border: '1px solid #2a5a5a',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '11px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    '&:hover': { backgroundColor: '#2a4a4a' },
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
  // ─── PC STYLES ───
  appPC: {
    minHeight: '100vh',
    height: '100vh',
    backgroundColor: '#000',
    color: '#e0e0e0',
    fontFamily: "'Segoe UI', 'Courier New', monospace",
    overflow: 'hidden',
    border: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '100vw',
  },
  headerPC: {
    padding: '6px 12px',
    borderBottom: '1px solid rgba(255,0,60,0.3)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexShrink: 0,
    backgroundColor: '#0a0000',
    flexWrap: 'wrap',
    gap: '4px',
    minHeight: '44px',
  },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' },
  titlePC: { color: '#ff003c', margin: 0, fontSize: 'clamp(16px, 4vw, 22px)', fontWeight: 'bold', letterSpacing: '2px' },
  versionBadgePC: { fontSize: '10px', color: '#ff6688', backgroundColor: '#ff003c20', padding: '2px 8px', borderRadius: '10px' },
  headerRight: { display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' },
  callBtnPC: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    border: '1px solid #ff003c',
    borderRadius: '16px',
    padding: '3px 10px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    cursor: 'pointer',
    color: '#ff003c',
    fontSize: '11px',
    fontWeight: 'bold',
  },
  callBtnPCActive: { borderColor: '#4f8', color: '#4f8' },
  voiceBtnPC: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    border: '1px solid #ff003c',
    borderRadius: '16px',
    padding: '3px 10px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    cursor: 'pointer',
    color: '#ff003c',
    fontSize: '11px',
    fontWeight: 'bold',
  },
  voiceBtnPCActive: { backgroundColor: '#ff003c', color: '#fff', borderColor: '#ff003c' },
  menuBtnPC: { backgroundColor: 'transparent', border: 'none', cursor: 'pointer', padding: '2px' },
  pcLayout: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  },
  pcSidebar: {
    width: 'clamp(180px, 30%, 280px)',
    backgroundColor: '#0a0a0a',
    overflowY: 'auto',
    padding: '8px 10px',
    flexShrink: 0,
    borderRight: '1px solid #333',
    height: '100%',
    boxSizing: 'border-box',
  },
  pcSidebarSection: {
    marginBottom: '12px',
    borderBottom: '1px solid #1a1a1a',
    paddingBottom: '8px',
  },
  pcSidebarTitle: {
    color: '#ff003c',
    fontSize: '12px',
    margin: '0 0 6px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
  },
  pcSidebarRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2px 0',
    fontSize: '11px',
    color: '#ccc',
  },
  pcMain: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: '#050505',
    overflow: 'hidden',
    height: '100%',
    padding: '10px',
  },
  pcBallContainer: {
    position: 'relative',
    width: 'clamp(150px, 25vw, 220px)',
    height: 'clamp(150px, 25vw, 220px)',
    pointerEvents: 'none',
    marginBottom: '10px',
  },
  pcListeningContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: '4px 16px',
    borderRadius: '30px',
    border: '1px solid rgba(255,0,60,0.2)',
    backdropFilter: 'blur(10px)',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: '90%',
  },
  selectInputPC: {
    padding: '2px 6px',
    backgroundColor: '#000',
    border: '1px solid #444',
    color: '#fff',
    borderRadius: '3px',
    fontSize: '11px',
  },
  toggleGroupPC: { display: 'flex', gap: '4px' },
  toggleBtnPC: {
    padding: '2px 8px',
    border: '1px solid #444',
    borderRadius: '3px',
    backgroundColor: 'transparent',
    color: '#888',
    cursor: 'pointer',
    fontSize: '10px',
  },
  toggleBtnPCO: { borderColor: '#4f8', color: '#4f8', backgroundColor: '#0a2a0a' },
  toggleBtnPCF: { borderColor: '#ff003c', color: '#ff003c', backgroundColor: '#2a0a0a' },
  conversationLogPC: {
    maxHeight: '120px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    marginBottom: '6px',
  },
  convItemPC: {
    display: 'flex',
    flexDirection: 'column',
    padding: '4px 8px',
    backgroundColor: '#111',
    borderRadius: '4px',
    borderLeft: '2px solid #ff003c',
  },
  convTextPC: { fontSize: '12px', color: '#ddd', wordBreak: 'break-word', marginTop: '2px' },
  convTimePC: { fontSize: '9px', color: '#666', alignSelf: 'flex-end', marginTop: '2px' },
  filePreviewPC: { marginTop: '4px' },
  commandActionsPC: { display: 'flex', gap: '6px', marginTop: '4px', flexWrap: 'wrap' },
  attachBtnPC: {
    padding: '3px 10px',
    backgroundColor: '#1a3a3a',
    color: '#fff',
    border: '1px solid #2a5a5a',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '11px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  commandHistoryPC: { maxHeight: '80px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '6px' },
  cmdItemPC: { display: 'flex', gap: '6px', fontSize: '11px', color: '#aaa', padding: '2px 4px', borderBottom: '1px solid #111' },
  cmdTimePC: { color: '#666', minWidth: '50px', fontSize: '10px' },
  cmdTextPC: { color: '#ddd', wordBreak: 'break-word' },
  dashBtnPC: {
    padding: '3px 10px',
    backgroundColor: '#222',
    color: '#fff',
    border: '1px solid #333',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '11px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  dashEmptyPC: { color: '#666', fontSize: '12px', textAlign: 'center', padding: '6px 0' },
  eventTimePC: { color: '#ff6688', fontSize: '11px' },
  sidebarOverlayPC: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
    zIndex: 998
  },
  sidebarPC: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: '280px',
    maxWidth: '85vw',
    backgroundColor: '#0a0000',
    borderLeft: '2px solid #ff003c',
    zIndex: 999,
    overflowY: 'auto',
    padding: '16px',
  },
  sidebarHeaderPC: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    paddingBottom: '8px',
    borderBottom: '1px solid #333'
  },
  sidebarTitlePC: { color: '#ff003c', fontSize: '16px', fontWeight: 'bold', margin: 0, fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px' },
  closeBtnPC: { backgroundColor: 'transparent', border: 'none', color: '#888', fontSize: '20px', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' },
  sidebarSectionPC: { marginBottom: '16px' },
  sectionTitlePC: {
    color: '#ff003c',
    fontSize: '13px',
    margin: '0 0 8px 0',
    paddingBottom: '4px',
    borderBottom: '1px solid #333',
    fontFamily: 'monospace',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  settingRowPC: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' },
  settingLabelPC: { fontSize: '12px', color: '#ddd' },
  toggleBtnPC2: {
    padding: '4px 10px',
    borderRadius: '4px',
    border: '1px solid #ff003c',
    backgroundColor: 'transparent',
    color: '#ff003c',
    cursor: 'pointer',
    fontSize: '11px',
    fontWeight: 'bold',
  },
  profileCardSidebarPC: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' },
  profileAvatarWrapperPC: { flexShrink: 0 },
  profileAvatarPC: { width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ff003c' },
  profileAvatarPlaceholderPC: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#ff003c',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  profileInfoPC: { display: 'flex', flexDirection: 'column' },
  profileNamePC: { color: '#fff', fontWeight: 'bold', fontSize: '13px' },
  profileHandlePC: { color: '#888', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '2px' },
  sidebarBtnPC: { padding: '5px 10px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '12px' },
  dangerBtnPC: { padding: '5px 10px', backgroundColor: '#880000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '12px' },
  inputRow: {
    display: 'flex',
    gap: '6px',
    marginTop: '4px',
    marginBottom: '6px',
  },
  textInputSmall: {
    flex: 1,
    padding: '6px 10px',
    backgroundColor: '#000',
    border: '1px solid #333',
    color: '#fff',
    borderRadius: '4px',
    fontSize: '13px',
    outline: 'none',
  },
  sendBtnSmall: {
    padding: '6px 12px',
    backgroundColor: '#ff003c',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutBtn: {
    padding: '5px 10px',
    backgroundColor: '#880000',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    fontSize: '12px',
  },
}

// ============================================================
// KEYFRAMES (add to index.css)
// ============================================================
