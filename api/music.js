export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { prompt, duration, quality, make_instrumental } = req.body
  const TUNOVA_API_KEY = process.env.TUNOVA_API_KEY

  try {
    // Tunova is MCP-based. Their primary endpoint:
    // POST https://api.tunova.ai/mcp  (streamable-http, JSON-RPC)
    // Header: X-API-Key: sk_live_...
    // Tool: generate_song
    const response = await fetch('https://api.tunova.ai/mcp', {
      method: 'POST',
      headers: {
        'X-API-Key': TUNOVA_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/event-stream',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: Date.now(),
        method: 'tools/call',
        params: {
          name: 'generate_song',
          arguments: {
            prompt: prompt || 'cinematic music',
            make_instrumental: make_instrumental || false,
            duration: duration || 30,
            quality: quality || 'high',
          },
        },
      }),
    })

    if (!response.ok) throw new Error(`Tunova HTTP ${response.status}`)
    const data = await response.json()
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
    }
