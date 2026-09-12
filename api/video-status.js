export default async function handler(req, res) {
  const { video_id } = req.query
  const AGNES_API_KEY = process.env.AGNES_API_KEY

  try {
    const r = await fetch(`https://apihub.agnes-ai.com/agnesapi?video_id=${video_id}&model_name=agnes-video-v2.0`, {
      headers: { 'Authorization': `Bearer ${AGNES_API_KEY}` },
    })
    const data = await r.json()
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
