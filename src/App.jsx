import { useState, useRef, useEffect, useCallback } from 'react'

// ==================================================
// ICON SYSTEM (reduced to essentials)
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
    send: 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z',
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

// ==================================================
// SAFE STORAGE
// ==================================================
const safeGet = (key, fallback) => {
  try { const val = localStorage.getItem(key); if (val === null) return fallback; return JSON.parse(val) } catch { return fallback }
}
const safeSet = (key, val) => {
  try { localStorage.setItem(key, JSON.stringify(val)); return true } catch { return false }
}

// ==================================================
// SEARCH FUNCTION (Tavily only)
// ==================================================
const searchWeb = async (query) => {
  if (!TAVILY_API_KEY) {
    return { error: "Tavily API key not configured." }
  }
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
// MAIN APP
// ==================================================
export default function App() {
  const [isBooting, setIsBooting] = useState(true)
  const [bootProgress, setBootProgress] = useState(0)

  // Profile
  const [profile, setProfile] = useState(null)
  const [profileForm, setProfileForm] = useState({ name: "", username: "", avatar: "", bio: "" })
  const [showProfileSetup, setShowProfileSetup] = useState(false)
  const [editingProfile, setEditingProfile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Conversation (transcript)
  const [conversation, setConversation] = useState([]) // [{role: 'user'|'assistant', content, time}]
  const [inputText, setInputText] = useState("")

  // Voice state
  const [isCallActive, setIsCallActive] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transcript, setTranscript] = useState("")

  // Stats (simulated)
  const [stats, setStats] = useState({
    uptime: 0,
    cpuUsage: 0,
    cpuTemp: 0,
    ramUsage: 0,
    storageUsed: 0,
    storageTotal: 475,
    networkSpeed: 0,
    messages: 0,
  })

  // Refs
  const synthRef = useRef(typeof window !== "undefined" ? window.speechSynthesis : null)
  const recognitionRef = useRef(null)
  const msgCounter = useRef(0)
  const fileInputRef = useRef(null)

  // ==================================================
  // SPEECH RECOGNITION SETUP
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

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onend = () => {
      setIsListening(false)
      // If call is still active, restart recognition
      if (isCallActive) {
        try {
          recognition.start()
        } catch (e) {}
      }
    }

    recognition.onerror = (event) => {
      console.warn('Speech recognition error', event.error)
      if (event.error === 'not-allowed') {
        alert('Please allow microphone access.')
        setIsCallActive(false)
        return
      }
      // Restart on error if call active
      if (isCallActive) {
        setTimeout(() => {
          try { recognition.start() } catch (e) {}
        }, 500)
      }
    }

    recognition.onresult = async (event) => {
      let final = ''
      let interim = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        if (result.isFinal) {
          final += result[0].transcript
        } else {
          interim += result[0].transcript
        }
      }
      const fullTranscript = (final || interim).trim()
      if (fullTranscript) {
        setTranscript(fullTranscript)
        // If final, process the query
        if (final) {
          setTranscript('')
          await processUserQuery(final)
        }
      }
    }

    return recognition
  }, [isCallActive])

  // ==================================================
  // PROCESS QUERY (Tavily search)
  // ==================================================
  const processUserQuery = useCallback(async (query) => {
    if (!query || isProcessing) return
    setIsProcessing(true)

    // Add user message to conversation
    const userMsg = {
      id: ++msgCounter.current,
      role: 'user',
      content: query,
      time: Date.now()
    }
    setConversation(prev => [...prev, userMsg])

    // Search the web
    const result = await searchWeb(query)
    let reply = ''
    if (result.error) {
      reply = `⚠️ Search error: ${result.error}`
    } else {
      reply = result.answer || "I couldn't find an answer to that."
    }

    // Add assistant reply to conversation
    const assistantMsg = {
      id: ++msgCounter.current,
      role: 'assistant',
      content: reply,
      time: Date.now()
    }
    setConversation(prev => [...prev, assistantMsg])

    // Speak the reply
    speakText(reply)

    setIsProcessing(false)
  }, [isProcessing])

  // ==================================================
  // TEXT-TO-SPEECH
  // ==================================================
  const speakText = useCallback((text) => {
    if (!text || !synthRef.current) return
    try {
      synthRef.current.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1
      utterance.pitch = 1
      utterance.volume = 1
      synthRef.current.speak(utterance)
    } catch (e) {
      console.warn('TTS error', e)
    }
  }, [])

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
  // VOICE CALL TOGGLE
  // ==================================================
  const toggleCall = useCallback(() => {
    if (isCallActive) {
      // End call
      setIsCallActive(false)
      if (recognitionRef.current) {
        try { recognitionRef.current.stop() } catch (e) {}
      }
      setIsListening(false)
      // Optionally speak a goodbye
      speakText("Call ended.")
    } else {
      // Start call
      setIsCallActive(true)
      if (!recognitionRef.current) {
        recognitionRef.current = setupSpeechRecognition()
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start()
          speakText("Hello, I'm listening. How can I help you?")
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
  // SIMULATE SYSTEM STATS
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
  // BOOT SEQUENCE (System Initialization)
  // ==================================================
  useEffect(() => {
    const steps = [
      { label: 'Initializing Neural Networks...', duration: 1500 },
      { label: 'Loading Knowledge Base...', duration: 1200 },
      { label: 'Establishing Secure Connection...', duration: 1000 },
      { label: 'Calibrating Voice Recognition...', duration: 800 },
      { label: 'System Ready.', duration: 600 },
    ]
    let totalDuration = steps.reduce((sum, s) => sum + s.duration, 0)
    let elapsed = 0
    const interval = setInterval(() => {
      elapsed += 100
      const progress = Math.min((elapsed / totalDuration) * 100, 100)
      setBootProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        // Load profile
        setTimeout(() => {
          const savedProfile = safeGet("cypher4x_profile", null)
          const savedConv = safeGet("cypher4x_conversation", [])
          if (savedProfile) {
            setProfile(savedProfile)
            if (savedConv.length) setConversation(savedConv)
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

  // Persistence
  useEffect(() => {
    if (profile) safeSet("cypher4x_profile", profile)
  }, [profile])
  useEffect(() => {
    if (conversation.length) safeSet("cypher4x_conversation", conversation)
  }, [conversation])

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
  }, [profileForm])

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
    setShowProfileSetup(true)
    setSidebarOpen(false)
  }, [])

  const clearConversation = useCallback(() => {
    setConversation([])
  }, [])

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
  // BOOT SCREEN — System Initialization
  // ============================================================
  if (isBooting) {
    return (
      <div style={styles.bootContainer}>
        <div style={styles.bootBackground} />
        <div style={styles.bootContent}>
          <h1 style={styles.bootTitle}>J.A.R.V.I.S</h1>
          <p style={styles.bootSubtitle}>Just A Rather Very Intelligent System</p>
          <div style={styles.bootProgressWrapper}>
            <div style={styles.bootProgressBar}>
              <div style={{ ...styles.bootProgressFill, width: `${bootProgress}%` }} />
            </div>
            <span style={styles.bootProgressText}>Initializing Neural Networks... {Math.round(bootProgress)}%</span>
          </div>
          <div style={styles.bootStatus}>
            <span style={styles.bootStatusDot} />
            <span style={styles.bootStatusText}>System Initialization in progress...</span>
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
  // MAIN APP — Full screen with 3D logo, call button, sidebar
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

            {/* System Stats */}
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

            {/* AI Config (simplified) */}
            <div style={styles.sidebarSection}>
              <h3 style={styles.sectionTitle}><Icon name="settings" size={16} color="#ff003c" /> AI CONFIG</h3>
              <div style={styles.settingRow}><span style={styles.settingLabel}>AI Engine</span><span style={styles.settingValue}>TAVILY</span></div>
              <div style={styles.settingRow}><span style={styles.settingLabel}>Language</span><span style={styles.settingValue}>English</span></div>
              <div style={styles.settingRow}>
                <span style={styles.settingLabel}>Voice</span>
                <span style={styles.settingValue}>Male</span>
              </div>
              <div style={styles.settingRow}>
                <span style={styles.settingLabel}>Status</span>
                <span style={{ color: isCallActive ? '#4f8' : '#888', fontWeight: 'bold' }}>{isCallActive ? '🎤 Listening' : 'Standby'}</span>
              </div>
            </div>

            {/* Profile */}
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

            {/* Today's Events (static example) */}
            <div style={styles.sidebarSection}>
              <h3 style={styles.sectionTitle}><Icon name="calendar" size={16} color="#ff003c" /> TODAY'S EVENTS</h3>
              <div style={styles.dashEvent}><span>Team Meeting</span><span style={styles.eventTime}>2:00 PM</span></div>
              <div style={styles.dashEvent}><span>Meeting my girl</span><span style={styles.eventTime}>8:00 PM</span></div>
            </div>

            {/* Conversation Transcript */}
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

            {/* Text Input in Sidebar */}
            <div style={styles.sidebarInputArea}>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendTextMessage()}
                placeholder="Type a message..."
                style={styles.sidebarInput}
                disabled={isProcessing}
              />
              <button onClick={sendTextMessage} style={styles.sidebarSendBtn} disabled={isProcessing}>
                <Icon name="send" size={18} color="#fff" />
              </button>
            </div>

            {/* Danger Zone */}
            <div style={styles.sidebarSection}>
              <h3 style={styles.sectionTitle}><Icon name="alertTriangle" size={16} color="#ff003c" /> DANGER ZONE</h3>
              <button onClick={resetAllData} style={styles.dangerBtn}><Icon name="trash" size={14} color="#fff" /> Reset All Data</button>
            </div>
          </div>
        </>
      )}

      {/* Main Content — Full Screen 3D Logo + Call Button */}
      <div style={styles.mainContent}>
        {/* 3D Background Animation */}
        <div style={styles.background3D}>
          <div style={styles.globe} />
          <div style={styles.ring1} />
          <div style={styles.ring2} />
          <div style={styles.ring3} />
          <div style={styles.logoText}>CYPHER4X</div>
          <div style={styles.logoSub}>J.A.R.V.I.S Level AI</div>
        </div>

        {/* Call Button */}
        <div style={styles.callContainer}>
          <button
            onClick={toggleCall}
            style={{ ...styles.callButton, ...(isCallActive ? styles.callButtonActive : {}) }}
          >
            {isCallActive ? <Icon name="phone" size={48} color="#fff" /> : <Icon name="mic" size={48} color="#fff" />}
            <span style={styles.callLabel}>{isCallActive ? 'END CALL' : 'START CALL'}</span>
          </button>
          {isCallActive && (
            <div style={styles.listeningIndicator}>
              <span style={styles.listeningDot} />
              <span style={styles.listeningText}>{isListening ? 'Listening...' : 'Processing...'}</span>
            </div>
          )}
        </div>

        {/* Hamburger Menu to open sidebar */}
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
  },
  // Boot
  bootContainer: {
    backgroundColor: '#000',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Courier New', monospace",
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
  bootProgressWrapper: {
    margin: '20px 0',
  },
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
  // Profile
  profileContainer: {
    backgroundColor: '#000',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    border: 'none',
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
  // Sidebar
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

  // Main Content — Full Screen
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
  },
  background3D: {
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
  globe: {
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle at 30% 30%, #ff003c, #66001a)',
    boxShadow: '0 0 80px rgba(255,0,60,0.5), inset 0 -40px 60px rgba(0,0,0,0.7)',
    position: 'relative',
    animation: 'rotateGlobe 20s linear infinite',
    transformStyle: 'preserve-3d',
  },
  ring1: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    border: '2px solid rgba(255,0,60,0.15)',
    animation: 'spinRing 12s linear infinite',
    boxShadow: '0 0 40px rgba(255,0,60,0.05)',
  },
  ring2: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    border: '1px solid rgba(255,0,60,0.08)',
    animation: 'spinRing 18s linear infinite reverse',
    boxShadow: '0 0 40px rgba(255,0,60,0.03)',
  },
  ring3: {
    position: 'absolute',
    width: '350px',
    height: '350px',
    borderRadius: '50%',
    border: '1px dashed rgba(255,0,60,0.12)',
    animation: 'spinRing 8s linear infinite',
  },
  logoText: {
    position: 'absolute',
    fontSize: 'clamp(42px, 8vw, 72px)',
    fontWeight: 'bold',
    color: '#ff003c',
    textShadow: '0 0 40px #ff003c, 0 0 80px #ff003c44',
    letterSpacing: '8px',
    bottom: '20%',
    textAlign: 'center',
    width: '100%',
    animation: 'pulseText 2s ease-in-out infinite',
  },
  logoSub: {
    position: 'absolute',
    fontSize: 'clamp(14px, 2vw, 22px)',
    color: '#ff6688',
    letterSpacing: '4px',
    bottom: '12%',
    textAlign: 'center',
    width: '100%',
    opacity: 0.8,
  },
  callContainer: {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  callButton: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    backgroundColor: '#1a1a1a',
    border: '3px solid #ff003c',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    boxShadow: '0 0 40px rgba(255,0,60,0.2)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 0 60px rgba(255,0,60,0.4)',
    },
  },
  callButtonActive: {
    backgroundColor: '#ff003c',
    borderColor: '#ff003c',
    boxShadow: '0 0 80px rgba(255,0,60,0.6)',
    animation: 'pulseGlow 1s ease-in-out infinite',
  },
  callLabel: {
    color: '#fff',
    fontSize: '11px',
    fontWeight: 'bold',
    letterSpacing: '2px',
    marginTop: '4px',
  },
  listeningIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#ff6688',
    fontSize: '14px',
    fontWeight: 'bold',
    letterSpacing: '2px',
  },
  listeningDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#4f8',
    animation: 'pulseText 0.8s infinite',
    boxShadow: '0 0 20px #4f8',
  },
  listeningText: {
    color: '#ff6688',
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
