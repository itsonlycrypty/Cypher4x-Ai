export default async function handler(req, res) {
  const { task_id } = req.query
  const TUNOVA_API_KEY = process.env.TUNOVA_API_KEY
  if (!task_id) return res.status(400).json({ error: 'task_id required' })
  if (!TUNOVA_API_KEY) return res.status(500).json({ error: 'TUNOVA_API_KEY not set' })
  try {
    const r = await fetch(`https://api.tunova.ai/v1/music/status/${task_id}`, {
      headers: { 'X-API-Key': TUNOVA_API_KEY, 'Authorization': `Bearer ${TUNOVA_API_KEY}` },
    })
    const rawText = await r.text()
    console.log('[Tunova-status]', r.status, rawText)
    if (!r.ok) return res.status(r.status).json({ error: `HTTP ${r.status}`, detail: rawText.slice(0, 500) })
    let data; try { data = JSON.parse(rawText) } catch { data = { raw: rawText } }
    return res.status(200).json(data)
  } catch (e) { return res.status(500).json({ error: e.message }) }
    }
