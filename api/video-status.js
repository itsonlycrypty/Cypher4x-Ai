export default async function handler(req, res) {
  const { video_id } = req.query
  const AGNES_API_KEY = process.env.AGNES_API_KEY
  if (!video_id) return res.status(400).json({ error: 'video_id required' })
  if (!AGNES_API_KEY) return res.status(500).json({ error: 'AGNES_API_KEY not set' })
  try {
    const r = await fetch(`https://apihub.agnes-ai.com/v1/videos/${video_id}`, {
      headers: { 'Authorization': `Bearer ${AGNES_API_KEY}` },
    })
    const rawText = await r.text()
    if (!r.ok) return res.status(r.status).json({ error: `HTTP ${r.status}`, detail: rawText.slice(0, 500) })
    let data; try { data = JSON.parse(rawText) } catch { data = { raw: rawText } }
    return res.status(200).json(data)
  } catch (e) { return res.status(500).json({ error: e.message }) }
      }
