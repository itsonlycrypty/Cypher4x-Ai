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
// RED BALL COMPONENT
// ==================================================
const RedBall = ({ isSpeaking = false }) => (
  <div style={styles.ballContainer}>
    <div style={styles.ball}>
      <div style={styles.ballGlow} />
      <div style={styles.ballInner} />
    </div>
    <div style={styles.ring1} />
    <div style={styles.ring2} />
    <div style={styles.ring3} />
  </div>
)

// ==================================================
// MAIN APP
// ==================================================
export default function App() {
  const [isBooting, setIsBooting] = useState(true)
  const [bootProgress, setBootProgress] = useState(0)
  const [bootStepIndex, setBootStepIndex] = useState(0)
  const [viewMode, setViewMode] = useState('android')

  const [profile, setProfile] = useState(null)
  const [profileForm, setProfileForm] = useState({ name: "", username: "", avatar: "", bio: "" })
  const [showProfileSetup, setShowProfileSetup] = useState(false)
  const [editingProfile, setEditingProfile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [conversation, setConversation] = useState([])
  const [inputText, setInputText] = useState("")
  const [commandHistory, setCommandHistory] = useState([])

  const [isCallActive, setIsCallActive] = useState(false)
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

  const [events, setEvents] = useState([
    { title: "Team Meeting", time: "2:00 PM" },
    { title: "Meeting my girl", time: "8:00 PM" }
  ])
  const [reminders, setReminders] = useState([])

  const synthRef = useRef(typeof window !== "undefined" ? window.speechSynthesis : null)
  const recognitionRef = useRef(null)
  const msgCounter = useRef(0)
  const fileInputRef = useRef(null)

  // ==================================================
  // FILE SHARING HANDLER
  // ==================================================
  const handleFileShare = useCallback((e) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    const file = files[0]
    const maxSize = 20 * 1024 * 1024 // 20MB
    if (file.size > maxSize) {
      alert("File too large! Max 20MB.")
      return
    }
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

      // AI response
      const reply = `I received your file: **${file.name}** (${(file.size / 1024).toFixed(1)} KB). I can't process the content directly, but I'm happy to help if you have questions about it! 🤖`
      const assistantMsg = { id: ++msgCounter.current, role: 'assistant', content: reply, time: Date.now() }
      setConversation(prev => [...prev, assistantMsg])
      speakText(reply.replace(/[🤖]/g, ''))
    }
    reader.readAsDataURL(file)
    e.target.value = '' // reset input
  }, [speakText])

  // ==================================================
  // SPEECH RECOGNITION
  // ==================================================
  const setupSpeechRecognition = useCallback((isOneOff = false) => {
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
      if (!isOneOff && isCallActive) {
        try { recognition.start() } catch (e) {}
      }
    }
    recognition.onerror = (event) => {
      console.warn('Speech recognition error', event.error)
      if (event.error === 'not-allowed') {
        alert('Please allow microphone access in your browser settings.')
        setIsCallActive(false)
        setRecordingMode(false)
        setIsListening(false)
        return
      }
      if (!isOneOff && isCallActive) {
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
        await processUserQuery(final)
      } else if (interim) {
        setInterimTranscript(interim)
      }
    }
    return recognition
  }, [isCallActive])

  // ==================================================
  // TEXT-TO-SPEECH
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
  }, [isProcessing, speakText])

  // ==================================================
  // TAP TO SPEAK
  // ==================================================
  const startRecording = useCallback(() => {
    if (isRecording || isProcessing || isCallActive) return
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
  }, [isRecording, isProcessing, isCallActive, processUserQuery])

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
  // SEND TEXT
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
      setInterimTranscript('')
      speakText("Call ended. Have a great day! 🌟")
    } else {
      setIsCallActive(true)
      if (!recognitionRef.current) {
        recognitionRef.current = setupSpeechRecognition(false)
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
  // VIEW TOGGLE
  // ==================================================
  const toggleView = useCallback(() => {
    setViewMode(prev => prev === 'android' ? 'pc' : 'android')
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
  // BOOT SEQUENCE
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
          const savedProfile = safeGet("cypher4x_profile", null)
          const savedConv = safeGet("cypher4x_conversation", [])
          const savedCommands = safeGet("cypher4x_commands", [])
          const savedEvents = safeGet("cypher4x_events", [
            { title: "Team Meeting", time: "2:00 PM" },
            { title: "Meeting my girl", time: "8:00 PM" }
          ])
          const savedReminders = safeGet("cypher4x_reminders", [])
          const savedFace = safeGet("cypher4x_face_recognition", false)
          const savedBio = safeGet("cypher4x_biometric", false)
          const savedVoiceGender = safeGet("cypher4x_voice_gender", 'female')
          const savedView = safeGet("cypher4x_view_mode", 'android')

          if (savedFace) setFaceRecognition(savedFace)
          if (savedBio) setBiometricAuth(savedBio)
          setVoiceGender(savedVoiceGender)
          setViewMode(savedView)
          if (savedCommands) setCommandHistory(savedCommands)
          if (savedEvents) setEvents(savedEvents)
          if (savedReminders) setReminders(savedReminders)

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

  // ==================================================
  // PERSISTENCE
  // ==================================================
  useEffect(() => { if (profile) safeSet("cypher4x_profile", profile) }, [profile])
  useEffect(() => { if (conversation.length) safeSet("cypher4x_conversation", conversation) }, [conversation])
  useEffect(() => { safeSet("cypher4x_commands", commandHistory) }, [commandHistory])
  useEffect(() => { safeSet("cypher4x_events", events) }, [events])
  useEffect(() => { safeSet("cypher4x_reminders", reminders) }, [reminders])
  useEffect(() => { safeSet("cypher4x_face_recognition", faceRecognition) }, [faceRecognition])
  useEffect(() => { safeSet("cypher4x_biometric", biometricAuth) }, [biometricAuth])
  useEffect(() => { safeSet("cypher4x_voice_gender", voiceGender) }, [voiceGender])
  useEffect(() => { safeSet("cypher4x_view_mode", viewMode) }, [viewMode])

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
    setCommandHistory([])
    setEvents([])
    setReminders([])
    setFaceRecognition(false)
    setBiometricAuth(false)
    setVoiceGender('female')
    setShowProfileSetup(true)
    setSidebarOpen(false)
  }, [])

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
  // BOOT SCREEN
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
                <h3 style={styles.sectionTitle}><Icon name="alertTriangle" size={16} color="#ff003c" /> DANGER ZONE</h3>
                <button onClick={resetAllData} style={styles.dangerBtn}><Icon name="trash" size={14} color="#fff" /> Reset All Data</button>
              </div>
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
            <button onClick={toggleCall} style={styles.callButtonTopRight}>
              <Icon name="phone" size={24} color={isCallActive ? "#4f8" : "#ff003c"} />
              <span style={styles.callLabelTop}>{isCallActive ? 'END' : 'CALL'}</span>
            </button>
          </div>

          <div style={styles.listeningContainer}>
            {isListening ? (
              <>
                <div style={styles.listeningDot} />
                <span style={styles.listeningText}>Listening...</span>
                {interimTranscript && (
                  <span style={styles.interimText}>"{interimTranscript}"</span>
                )}
                {interimTranscript && (
                  <button onClick={sendInterim} style={styles.sendInterimBtn} disabled={isProcessing}>
                    <Icon name="send" size={16} color="#fff" />
                    <span>Send</span>
                  </button>
                )}
              </>
            ) : isProcessing ? (
              <span style={styles.listeningText}>Processing...</span>
            ) : isRecording ? (
              <>
                <div style={{ ...styles.listeningDot, backgroundColor: '#ff003c', boxShadow: '0 0 20px #ff003c' }} />
                <span style={styles.listeningText}>Recording...</span>
                {interimTranscript && (
                  <span style={styles.interimText}>"{interimTranscript}"</span>
                )}
                {interimTranscript && (
                  <>
                    <button onClick={sendInterim} style={styles.sendInterimBtn} disabled={isProcessing}>
                      <Icon name="send" size={16} color="#fff" />
                      <span>Send</span>
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
              disabled={isRecording || isProcessing || isCallActive}
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
  // PC VIEW
  // ============================================================
  return (
    <div style={styles.appPC}>
      <header style={styles.headerPC}>
        <div style={styles.headerLeft}>
          <h1 style={styles.titlePC}>CYPHER4X</h1>
          <span style={styles.versionBadgePC}>{VERSION}</span>
          <button onClick={toggleCall} style={{ ...styles.callBtnPC, ...(isCallActive ? styles.callBtnPCActive : {}) }}>
            <Icon name="phone" size={18} color={isCallActive ? "#4f8" : "#ff003c"} />
            <span>{isCallActive ? 'END CALL' : 'CALL'}</span>
          </button>
        </div>
        <div style={styles.headerRight}>
          <button
            onClick={startRecording}
            disabled={isRecording || isProcessing || isCallActive}
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
          {/* SYSTEM STATS */}
          <div style={styles.pcSidebarSection}>
            <h3 style={styles.pcSidebarTitle}><Icon name="chart" size={16} color="#ff003c" /> SYSTEM STATS</h3>
            <div style={styles.pcSidebarRow}><span>CPU Usage</span><span style={{ color: stats.cpuUsage > 80 ? '#ff003c' : '#4f8' }}>{stats.cpuUsage}%</span></div>
            <div style={styles.pcSidebarRow}><span>CPU Temp</span><span style={{ color: stats.cpuTemp > 80 ? '#ff003c' : '#ff6688' }}>{stats.cpuTemp}°C</span></div>
            <div style={styles.pcSidebarRow}><span>RAM Usage</span><span style={{ color: stats.ramUsage > 8 ? '#ff003c' : '#ff6688' }}>{stats.ramUsage.toFixed(1)} GB</span></div>
            <div style={styles.pcSidebarRow}><span>Storage</span><span>{stats.storageUsed}/{stats.storageTotal} GB</span></div>
            <div style={styles.pcSidebarRow}><span>Network</span><span style={{ color: parseFloat(stats.networkSpeed) < 1 ? '#ff003c' : '#4f8' }}>{stats.networkSpeed} Mbps</span></div>
            <div style={styles.pcSidebarRow}><span>Uptime</span><span>{formatUptime(stats.uptime)}</span></div>
          </div>

          {/* AI CONFIG */}
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

          {/* SECURITY */}
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

          {/* EVENTS */}
          <div style={styles.pcSidebarSection}>
            <h3 style={styles.pcSidebarTitle}><Icon name="calendar" size={16} color="#ff003c" /> TODAY'S EVENTS</h3>
            {events.length === 0 ? <p style={styles.dashEmptyPC}>No events scheduled</p> : events.map((evt, i) => (
              <div key={i} style={styles.pcSidebarRow}><span>{evt.title}</span><span style={styles.eventTimePC}>{evt.time}</span></div>
            ))}
          </div>

          {/* REMINDERS */}
          <div style={styles.pcSidebarSection}>
            <h3 style={styles.pcSidebarTitle}><Icon name="clock" size={16} color="#ff003c" /> REMINDERS</h3>
            {reminders.length === 0 ? <p style={styles.dashEmptyPC}>No reminders set</p> : reminders.map((rem, i) => (
              <div key={i} style={styles.pcSidebarRow}><span>{rem.text}</span><span style={styles.eventTimePC}>{rem.time}</span></div>
            ))}
          </div>

          {/* CONVERSATION + FILE SHARE */}
          <div style={styles.pcSidebarSection}>
            <h3 style={styles.pcSidebarTitle}><Icon name="chat" size={16} color="#ff003c" /> CONVERSATION</h3>
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
                      {msg.file.type.startsWith('image/') && (
                        <img src={msg.file.data} alt={msg.file.name} style={{ maxWidth: '100%', maxHeight: '100px', borderRadius: '4px', marginTop: '4px' }} />
                      )}
                      {msg.file.type.startsWith('video/') && (
                        <video controls style={{ maxWidth: '100%', maxHeight: '100px', borderRadius: '4px', marginTop: '4px' }}>
                          <source src={msg.file.data} type={msg.file.type} />
                        </video>
                      )}
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
            <div style={styles.commandActionsPC}>
              <button onClick={clearConversation} style={styles.dashBtnPC}><Icon name="trash" size={14} color="#fff" /> Clear</button>
              <button onClick={exportChat} style={styles.dashBtnPC}><Icon name="save" size={14} color="#fff" /> Export</button>
              {/* New Attach File button */}
              <label style={styles.attachBtnPC}>
                <Icon name="file" size={14} color="#fff" /> Attach
                <input type="file" accept="image/*,video/*,.pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx" onChange={handleFileShare} style={{ display: 'none' }} />
              </label>
            </div>
          </div>

          {/* COMMAND HISTORY */}
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

          {/* VIEW TOGGLE */}
          <div style={styles.pcSidebarSection}>
            <h3 style={styles.pcSidebarTitle}><Icon name="desktop" size={16} color="#ff003c" /> VIEW MODE</h3>
            <button onClick={toggleView} style={styles.toggleBtnPC2}>Switch to Android</button>
          </div>

          {/* PROFILE */}
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
          </div>

          {/* DANGER ZONE */}
          <div style={styles.pcSidebarSection}>
            <h3 style={styles.pcSidebarTitle}><Icon name="alertTriangle" size={16} color="#ff003c" /> DANGER ZONE</h3>
            <button onClick={resetAllData} style={styles.dangerBtnPC}><Icon name="trash" size={14} color="#fff" /> Reset All Data</button>
          </div>
        </div>

        {/* PC MAIN – Red Ball only (no mic button) */}
        <div style={styles.pcMain}>
          <div style={styles.pcBallContainer}>
            <RedBall isSpeaking={isAISpeaking} />
            <div style={styles.pcFaceTitle}>CYPHER4X</div>
          </div>
          <div style={styles.pcListeningContainer}>
            {isListening ? (
              <>
                <div style={styles.listeningDot} />
                <span style={styles.listeningText}>Listening...</span>
                {interimTranscript && (
                  <span style={styles.interimText}>"{interimTranscript}"</span>
                )}
                {interimTranscript && (
                  <button onClick={sendInterim} style={styles.sendInterimBtn} disabled={isProcessing}>
                    <Icon name="send" size={16} color="#fff" />
                    <span>Send</span>
                  </button>
                )}
              </>
            ) : isProcessing ? (
              <span style={styles.listeningText}>Processing...</span>
            ) : isRecording ? (
              <>
                <div style={{ ...styles.listeningDot, backgroundColor: '#ff003c', boxShadow: '0 0 20px #ff003c' }} />
                <span style={styles.listeningText}>Recording...</span>
                {interimTranscript && (
                  <span style={styles.interimText}>"{interimTranscript}"</span>
                )}
                {interimTranscript && (
                  <>
                    <button onClick={sendInterim} style={styles.sendInterimBtn} disabled={isProcessing}>
                      <Icon name="send" size={16} color="#fff" />
                      <span>Send</span>
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

      {/* Sidebar overlay (hamburger) */}
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
// STYLES (full – includes all fixes + new attach button style)
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
  ballContainer: {
    position: 'relative',
    width: '300px',
    height: '300px',
    pointerEvents: 'none',
    zIndex: 1,
  },
  ball: {
    width: '180px',
    height: '180px',
    borderRadius: '50%',
    background: 'radial-gradient(circle at 35% 35%, #ff6688, #ff003c, #990022)',
    boxShadow: '0 0 60px rgba(255,0,60,0.8), inset 0 -20px 30px rgba(0,0,0,0.5)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    animation: 'rotateGlobe 20s linear infinite',
    transformStyle: 'preserve-3d',
  },
  ballGlow: {
    position: 'absolute',
    top: '-20px',
    left: '-20px',
    right: '-20px',
    bottom: '-20px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255,0,60,0.2) 0%, transparent 70%)',
    animation: 'glowPulse 2s ease-in-out infinite',
  },
  ballInner: {
    position: 'absolute',
    top: '20%',
    left: '20%',
    width: '60%',
    height: '60%',
    borderRadius: '50%',
    background: 'radial-gradient(circle at 60% 60%, rgba(255,255,255,0.3), transparent 70%)',
  },
  ring1: {
    position: 'absolute',
    top: '0%',
    left: '0%',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    border: '2px solid rgba(255,0,60,0.25)',
    animation: 'spinRing 12s linear infinite',
    boxShadow: '0 0 40px rgba(255,0,60,0.05)',
  },
  ring2: {
    position: 'absolute',
    top: '-10%',
    left: '-10%',
    width: '120%',
    height: '120%',
    borderRadius: '50%',
    border: '1px solid rgba(255,0,60,0.12)',
    animation: 'spinRing 18s linear infinite reverse',
  },
  ring3: {
    position: 'absolute',
    top: '5%',
    left: '5%',
    width: '90%',
    height: '90%',
    borderRadius: '50%',
    border: '1px dashed rgba(255,0,60,0.15)',
    animation: 'spinRing 8s linear infinite',
  },
  faceTitleAndroid: {
    position: 'absolute',
    bottom: '35%',
    fontSize: 'clamp(42px, 6vw, 68px)',
    fontWeight: 'bold',
    color: '#ff003c',
    textShadow: '0 0 40px #ff003c, 0 0 80px #ff003c66, 0 0 120px #ff003c33',
    letterSpacing: '10px',
    textAlign: 'center',
    width: '100%',
    zIndex: 2,
    animation: 'pulseText 2.5s ease-in-out infinite',
    fontFamily: "'Courier New', monospace",
  },
  topBarAndroid: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    right: '20px',
    zIndex: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  callButtonTopRight: {
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
  },
  callLabelTop: {
    fontSize: '12px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    color: '#fff',
  },
  listeningContainer: {
    position: 'absolute',
    top: '90px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: '8px 20px',
    borderRadius: '30px',
    border: '1px solid rgba(255,0,60,0.2)',
    backdropFilter: 'blur(10px)',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  listeningDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#4f8',
    boxShadow: '0 0 20px #4f8',
    animation: 'pulseText 0.8s ease-in-out infinite',
  },
  listeningText: {
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    letterSpacing: '2px',
    fontFamily: "'Courier New', monospace",
  },
  interimText: {
    color: '#ff6688',
    fontSize: '14px',
    fontStyle: 'italic',
    maxWidth: '200px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    borderLeft: '1px solid rgba(255,0,60,0.3)',
    paddingLeft: '12px',
  },
  sendInterimBtn: {
    backgroundColor: '#ff003c',
    border: 'none',
    borderRadius: '20px',
    padding: '4px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 'bold',
    transition: 'all 0.2s',
  },
  cancelInterimBtn: {
    backgroundColor: 'transparent',
    border: '1px solid #ff003c',
    borderRadius: '20px',
    padding: '4px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    color: '#ff003c',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 'bold',
    transition: 'all 0.2s',
  },
  voiceButtonContainer: {
    position: 'absolute',
    bottom: '50px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  voiceButton: {
    width: '90px',
    height: '90px',
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
    boxShadow: '0 0 40px rgba(255,0,60,0.2)',
  },
  voiceButtonActive: {
    backgroundColor: '#ff003c',
    borderColor: '#ff003c',
    boxShadow: '0 0 80px rgba(255,0,60,0.7)',
    animation: 'pulseGlow 1s ease-in-out infinite',
  },
  voiceLabel: {
    color: '#fff',
    fontSize: '12px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    marginTop: '4px',
  },
  hamburgerBtn: {
    position: 'absolute',
    top: '25px',
    left: '25px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    zIndex: 15,
    padding: '8px',
    borderRadius: '4px',
  },
  // PC styles
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
  pcFaceTitle: {
    position: 'absolute',
    bottom: '-10%',
    fontSize: 'clamp(24px, 4vw, 36px)',
    fontWeight: 'bold',
    color: '#ff003c',
    textShadow: '0 0 40px #ff003c, 0 0 80px #ff003c66, 0 0 120px #ff003c33',
    letterSpacing: '4px',
    textAlign: 'center',
    width: '100%',
    animation: 'pulseText 2.5s ease-in-out infinite',
    fontFamily: "'Courier New', monospace",
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
  // Reused Android styles for PC
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
      }
