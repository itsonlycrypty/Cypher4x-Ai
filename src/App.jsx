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
    memory: 'M2 6h20v12H2zM6 10h4v4H6zm6 0h4v4h-4zm6 0h4v4h-4z',
    network: 'M4 12a8 8 0 0 1 16 0M6 12a6 6 0 0 1 12 0M8 12a4 4 0 0 1 8 0M10 12a2 2 0 0 1 4 0',
    microphone: 'M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zm-7 9v1a7 7 0 0 0 14 0v-1M12 22v-3',
    calendar: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
    clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm1-16v6l4 2M12 6v4',
    alertTriangle: 'M12 9v4m0 4h.01M12 2L1 21h22L12 2z',
    send: 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z',
    phone: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0 1 22 16.92z',
    mic: 'M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zm-7 9v1a7 7 0 0 0 14 0v-1M12 22v-3',
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
// RED BALL COMPONENT (spinning globe with rings)
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
  const [isAISpeaking, setIsAISpeaking] = useState(false)

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
  // SPEECH RECOGNITION
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
  // VOICE RECORDING
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
  // MAIN APP – SPINNING RED BALL
  // ============================================================
  return (
    <div style={styles.app}>
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

      {/* Main Content – Spinning Red Ball */}
      <div style={styles.mainContent}>
        <div style={styles.background}>
          <RedBall isSpeaking={isAISpeaking} />
          <div style={styles.faceTitle}>CYPHER4X</div>
        </div>

        {/* Top Right: Call button */}
        <button onClick={toggleCall} style={styles.callButtonTopRight}>
          <Icon name="phone" size={24} color={isCallActive ? "#4f8" : "#ff003c"} />
          <span style={styles.callLabelTop}>{isCallActive ? 'END' : 'CALL'}</span>
        </button>

        {/* Bottom center: Tap to Speak button */}
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

        {/* Hamburger menu */}
        <button onClick={() => setSidebarOpen(true)} style={styles.hamburgerBtn}>
          <Icon name="menu" size={28} color="#ff003c" />
        </button>
      </div>
    </div>
  )
}

// ============================================================
// STYLES
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
  // Main content
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
  background: {
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
  faceTitle: {
    position: 'absolute',
    bottom: '10%',
    fontSize: 'clamp(28px, 4vw, 42px)',
    fontWeight: 'bold',
    color: '#ff003c',
    textShadow: '0 0 30px #ff003c, 0 0 60px #ff003c44',
    letterSpacing: '8px',
    textAlign: 'center',
    width: '100%',
    animation: 'pulseText 2s ease-in-out infinite',
  },
  callButtonTopRight: {
    position: 'absolute',
    top: '25px',
    right: '25px',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    border: '2px solid #ff003c',
    borderRadius: '30px',
    padding: '10px 20px',
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
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 0 60px rgba(255,0,60,0.4)',
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
