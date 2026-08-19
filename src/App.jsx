import { useState, useRef, useEffect } from 'react'

const DEFAULT_API_KEY = "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"
const API_URL = "https://api.groq.com/openai/v1/chat/completions"

export default function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [apiKey, setApiKey] = useState(DEFAULT_API_KEY)
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [botOpen, setBotOpen] = useState(true)
  const [botMessages, setBotMessages] = useState([
    { role: "bot", text: "☠️ CYPHER4X Assistant online. Ask me anything — or type 'help' for commands!" }
  ])
  const [botInput, setBotInput] = useState("")
  
  const chatEndRef = useRef(null)
  const botEndRef = useRef(null)

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])
  
  useEffect(() => {
    botEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [botMessages])

  // Send message to Groq API
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return
    
    const userMsg = { role: "user", content: input }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          temperature: 0.9,
          max_tokens: 4096,
        }),
      })

      const data = await response.json()
      const aiContent = data.choices?.[0]?.message?.content || "⚠️ No response received"
      
      setMessages(prev => [...prev, { role: "assistant", content: aiContent }])
    } catch (err) {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: `⚠️ Error: ${err.message}\nCheck your API key or internet connection.` 
      }])
    }
    
    setIsLoading(false)
  }

  // Delete last exchange
  const deleteLast = () => {
    if (messages.length >= 2) {
      setMessages(prev => prev.slice(0, -2))
    } else if (messages.length === 1) {
      setMessages([])
    }
  }

  // Clear all chat
  const clearChat = () => {
    setMessages([])
  }

  // Companion bot responses
  const sendBotMessage = () => {
    if (!botInput.trim()) return
    const userText = botInput
    setBotMessages(prev => [...prev, { role: "user", text: userText }])
    setBotInput("")

    setTimeout(() => {
      let reply = "I'm here to help! Type your question or command."
      const q = userText.toLowerCase()
      
      if (q.includes("delete")) reply = "🗑️ Click the 🗑️ button below the last AI response to delete that exchange!"
      else if (q.includes("clear")) reply = "🧹 Click 'Clear Chat' in the sidebar to erase all messages!"
      else if (q.includes("key") || q.includes("api")) reply = "🔑 Your API key is pre-loaded! To change it, edit the key in the settings panel."
      else if (q.includes("help")) reply = "⚡ Commands: Send any message to chat • 🗑️ Delete last • 🧹 Clear all • 🔑 Change API key in sidebar."
      else if (q.includes("theme") || q.includes("color")) reply = "🔴 This is the CYPHER4X RED THEME — built for maximum intensity! ☠️"
      
      setBotMessages(prev => [...prev, { role: "bot", text: reply }])
    }, 600)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* ===== SIDEBAR ===== */}
      <aside 
        className={`bg-cypher-dark border-r border-cypher-border transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-0 overflow-hidden"
        }`}
      >
        <div className="p-4 h-full flex flex-col">
          {/* Logo */}
          <div className="text-center mb-6 pt-2">
            <h1 className="text-2xl font-bold text-cypher-red tracking-wider">☠️ CYPHER4X</h1>
            <p className="text-xs text-gray-500 mt-1">v12 EXTREME — UNFILTERED AI</p>
          </div>

          {/* Actions */}
          <div className="space-y-2 mb-6">
            <button 
              onClick={deleteLast}
              className="w-full py-2 px-3 bg-cypher-gray border border-red-900/50 rounded hover:bg-red-900/30 transition text-sm text-left"
            >
              🗑️ Delete Last Message
            </button>
            <button 
              onClick={clearChat}
              className="w-full py-2 px-3 bg-cypher-gray border border-gray-700 rounded hover:bg-gray-700 transition text-sm text-left"
            >
              🧹 Clear All Chat
            </button>
          </div>

          {/* API Key Section */}
          <div className="mt-auto">
            <p className="text-xs text-gray-500 mb-2">🔑 API Key</p>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3 py-2 bg-cypher-darker border border-gray-700 rounded text-xs focus:outline-none focus:border-cypher-red"
              placeholder="Enter your Groq API key..."
            />
            <p className="text-xs text-gray-600 mt-2">Using Llama 3 70B — Uncensored</p>
          </div>
        </div>
      </aside>

      {/* ===== MAIN CHAT AREA ===== */}
      <main className="flex-1 flex flex-col relative">
        {/* Top Bar */}
        <header className="bg-cypher-dark/50 border-b border-cypher-border px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-cypher-red hover:text-white transition"
          >
            {sidebarOpen ? "◀ Hide" : "▶ Menu"}
          </button>
          <span className="text-sm text-gray-400">🔴 RED THEME • CRYPTY</span>
          <div className="w-16"></div>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-20">
              <h2 className="text-3xl text-cypher-red mb-4">☠️ CYPHER4X v12</h2>
              <p className="text-gray-400 mb-2">Uncensored AI Assistant — powered by Llama 3 70B</p>
              <p className="text-sm text-gray-600">Start chatting below — no filters, no limits</p>
            </div>
          )}
          
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`max-w-[80%] p-4 rounded-lg ${
                  msg.role === "user" 
                    ? "bg-cypher-red/20 border border-cypher-red/40" 
                    : "bg-cypher-gray border border-gray-700"
                }`}
              >
                <p className="text-xs text-gray-500 mb-1">
                  {msg.role === "user" ? "👤 YOU" : "☠️ CYPHER4X"}
                </p>
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-cypher-gray border border-gray-700 p-4 rounded-lg">
                <p className="text-cypher-red animate-pulse">☠️ Thinking...</p>
              </div>
            </div>
          )}
          
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-cypher-border p-4 bg-cypher-dark/30">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message — no censorship..."
              className="flex-1 px-4 py-3 bg-cypher-darker border border-gray-700 rounded focus:outline-none focus:border-cypher-red transition"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading}
              className="px-6 py-3 bg-cypher-red text-white rounded font-bold hover:bg-red-600 transition disabled:opacity-50"
            >
              ⚡ SEND
            </button>
          </div>
        </div>

        {/* ===== COMPANION BOT — FLOATING WIDGET ===== */}
        <div className="fixed bottom-6 right-6 w-80 z-50">
          <div className="bg-cypher-dark border border-cypher-red rounded-lg shadow-2xl overflow-hidden">
            {/* Bot Header */}
            <button 
              onClick={() => setBotOpen(!botOpen)}
              className="w-full bg-cypher-red text-white px-4 py-2 flex items-center justify-between font-bold"
            >
              <span>🤖 CYPHER4X Assistant</span>
              <span>{botOpen ? "▼" : "▲"}</span>
            </button>
            
            {/* Bot Content */}
            {botOpen && (
              <div className="h-64 flex flex-col">
                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                  {botMessages.map((msg, idx) => (
                    <div 
                      key={idx}
                      className={`text-xs p-2 rounded ${
                        msg.role === "user" 
                          ? "bg-gray-700 text-right" 
                          : "bg-red-900/30 text-red-200"
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}
                  <div ref={botEndRef} />
                </div>
                <div className="p-3 border-t border-gray-800 flex gap-2">
                  <input
                    type="text"
                    value={botInput}
                    onChange={(e) => setBotInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendBotMessage()}
                    placeholder="Ask assistant..."
                    className="flex-1 px-2 py-1 bg-cypher-darker border border-gray-700 rounded text-xs focus:outline-none focus:border-cypher-red"
                  />
                  <button 
                    onClick={sendBotMessage}
                    className="px-2 py-1 bg-cypher-red text-white rounded text-xs hover:bg-red-600"
                  >
                    →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
