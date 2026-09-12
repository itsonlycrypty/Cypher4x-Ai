export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { prompt, duration, quality, image } = req.body
  const AGNES_API_KEY = process.env.AGNES_API_KEY

  try {
    // Agnes AI Video V2.0 — async, OpenAI Videos-compatible
    // Base: https://apihub.agnes-ai.com/v1
    // 1. Create task
    const frameRate = quality === 'high' ? 24 : 16
    const numFrames = Math.min(441, Math.max(9, Math.floor((duration || 5) * frameRate / 1)))

    const createRes = await fetch('https://apihub.agnes-ai.com/v1/videos', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AGNES_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'agnes-video-v2.0',
        prompt,
        image: image || undefined,
        height: quality === 'high' ? 1080 : quality === 'medium' ? 720 : 480,
        width: quality === 'high' ? 1920 : quality === 'medium' ? 1280 : 854,
        num_frames: numFrames,
        frame_rate: frameRate,
      }),
    })

    if (!createRes.ok) throw new Error(`Agnes create HTTP ${createRes.status}`)
    const created = await createRes.json()

    const videoId = created.video_id || created.id || created.task_id
    if (!videoId) throw new Error('No video_id returned')

    return res.status(200).json({ video_id: videoId, status: 'created' })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
          }
