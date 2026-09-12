export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { prompt, duration, quality } = req.body
  const AGNES_API_KEY = process.env.AGNES_API_KEY

  if (!AGNES_API_KEY) return res.status(500).json({ error: 'AGNES_API_KEY not set in Vercel env' })

  try {
    // Agnes AI Video V2.0 — OpenAI Videos compatible endpoint
    // Actual create endpoint: POST https://apihub.agnes-ai.com/v1/videos
    const body = {
      model: 'agnes-video-v2.0',
      prompt: prompt || 'cinematic scene',
      size: quality === 'high' ? '1920x1080' : quality === 'medium' ? '1280x720' : '854x480',
      seconds: String(duration || 5),
      // Agnes accepts: seconds OR num_frames+frame_rate. Let's use seconds.
    }

    console.log('[Agnes] Sending:', JSON.stringify(body))

    const r = await fetch('https://apihub.agnes-ai.com/v1/videos', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AGNES_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const rawText = await r.text()
    console.log('[Agnes] Status:', r.status, 'Body:', rawText)

    if (!r.ok) {
      // Return the actual error to frontend for debugging
      return res.status(r.status).json({
        error: `Agnes HTTP ${r.status}`,
        detail: rawText.slice(0, 500),
        hint: 'Check that your API key is correct and the model name is "agnes-video-v2.0"',
      })
    }

    let data
    try { data = JSON.parse(rawText) } catch { data = { raw: rawText } }

    return res.status(200).json(data)
  } catch (e) {
    console.error('[Agnes] Exception:', e)
    return res.status(500).json({ error: e.message })
  }
      }
