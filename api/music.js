export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { prompt, duration } = req.body
  const TUNOVA_API_KEY = process.env.TUNOVA_API_KEY
  if (!TUNOVA_API_KEY) return res.status(500).json({ error: 'TUNOVA_API_KEY not set in Vercel env' })
  try {
    const body = { prompt: prompt || 'cinematic music', make_instrumental: false, duration: duration || 30 }
    console.log('[Tunova] Sending:', JSON.stringify(body))
    const r = await fetch('https://api.tunova.ai/v1/music/generate', {
      method: 'POST',
      headers: { 'X-API-Key': TUNOVA_API_KEY, 'Authorization': `Bearer ${TUNOVA_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const rawText = await r.text()
    console.log('[Tunova] Status:', r.status, 'Body:', rawText)
    if (!r.ok) return res.status(r.status).json({ error: `Tunova HTTP ${r.status}`, detail: rawText.slice(0, 500), hint: 'Verify endpoint at https://api.tunova.ai/docs' })
    let data; try { data = JSON.parse(rawText) } catch { data = { raw: rawText } }
    return res.status(200).json(data)
  } catch (e) { return res.status(500).json({ error: e.message }) }
}
