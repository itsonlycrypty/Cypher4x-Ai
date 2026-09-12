import { useState, useRef, useEffect, useCallback } from 'react'

// ==================================================
// ICON SYSTEM
// ==================================================
const Icon = ({ name, size = 18, color = 'currentColor' }) => {
  const p = {
    menu: 'M3 6h18M3 12h18M3 18h18', x: 'M18 6L6 18M6 6l12 12',
    settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-7-3h2m10 0h2M12 6V4m0 16v-2',
    chart: 'M18 20V4M12 20V8M6 20V12',
    hourglass: 'M12 2v4M12 22v-4M4 6h16M4 18h16M8 6v3a4 4 0 0 0 8 0V6H8zm0 12v-3a4 4 0 0 1 8 0v3H8z',
    cpu: 'M4 4h4v4H4zm6 0h10v4H10zM4 10h10v4H4zm12 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z',
    memory: 'M2 6h20v12H2zM6 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z',
    network: 'M4 12a8 8 0 0 1 16 0M6 12a6 6 0 0 1 12 0M8 12a4 4 0 0 1 8 0M10 12a2 2 0 0 1 4 0',
    clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm1-16v6l4 2M12 6v4',
    alertTriangle: 'M12 9v4m0 4h.01M12 2L1 21h22L12 2z',
    send: 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z',
    phone: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0 1 22 16.92z',
    mic: 'M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zm-7 9v1a7 7 0 0 0 14 0v-1M12 22v-3',
    close: 'M18 6L6 18M6 6l12 12', desktop: 'M4 4h16v12H4zM8 20h8M12 16v4',
    file: 'M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM13 2v7h7',
    image: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l3-3 3 3 3-3 3 3',
    video: 'M23 7l-5 5 5 5V7zM1 5h15v14H1z',
    arrowLeft: 'M19 12H5M12 19l-7-7 7-7',
    volume2: 'M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07',
    volumeX: 'M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6',
    atSign: 'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM16 12h4',
    pencil: 'M17 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10zm-6 5l-4 4v3h3l4-4-3-3z',
    save: 'M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2zM17 21v-8H7v8M7 3v5h8',
    trash: 'M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6',
    user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    edit: 'M17 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10zm-5 7l-3 3v3h3l3-3-3-3z',
    chat: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z',
    rotate: 'M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9',
    camera: 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2v11zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
    cog: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-7-3h2m10 0h2M12 6V4m0 16v-2',
    copy: 'M8 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1M8 5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2V5zm4 2h4m-4 4h4',
    pause: 'M6 4h4v16H6V4zm8 0h4v16h-4V4z', play: 'M5 3l14 9-14 9V3z',
    sparkles: 'M12 3l1.9 5.8L20 10l-6.1 1.2L12 17l-1.9-5.8L4 10l6.1-1.2L12 3z',
    refresh: 'M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15',
    music: 'M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z',
    zap: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
    shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    reply: 'M9 17l-6-6 6-6M3 11h10a6 6 0 0 1 6 6v2',
    download: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3',
    check: 'M20 6L9 17l-5-5',
    globe: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20',
  }
  if (!p[name]) return null
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display:'inline-block', verticalAlign:'middle', flexShrink:0 }}><path d={p[name]} /></svg>
}

// ==================================================
// CONFIG & STORAGE
// ==================================================
const TAVILY_API_KEY = "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"
const TAVILY_URL = "https://api.tavily.com/search"
const VERSION = "Version 25.0.0"
const APP_START_TIME = Date.now()

const getStorageKey = (e, p) => `cypher4x_${e}_${p}`
const saveUserData = (e, p, d) => { try { localStorage.setItem(getStorageKey(e, p), JSON.stringify(d)) } catch {} }
const loadUserData = (e, p) => { try { const r = localStorage.getItem(getStorageKey(e, p)); return r ? JSON.parse(r) : null } catch { return null } }
const getAllUsers = () => { try { const l = localStorage.getItem('cypher4x_users'); return l ? JSON.parse(l) : [] } catch { return [] } }
const addUser = (e, p) => { const l = getAllUsers(); if (!l.some(u => u.email === e)) { l.push({ email: e, pin: p }); localStorage.setItem('cypher4x_users', JSON.stringify(l)) } }
const userExists = (e, p) => getAllUsers().some(u => u.email === e && u.pin === p)
const saveAuth = (e, p) => { try { localStorage.setItem('cypher4x_auth', JSON.stringify({ email: e, pin: p })) } catch {} }
const getAuth = () => { try { const r = localStorage.getItem('cypher4x_auth'); return r ? JSON.parse(r) : null } catch { return null } }
const clearAuth = () => { try { localStorage.removeItem('cypher4x_auth') } catch {} }

const isMobileDevice = () => /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
const isAndroid = () => /Android/i.test(navigator.userAgent)

// ==================================================
// SMART GREETING (fixed)
// ==================================================
const isPureGreeting = (text) => {
  const t = text.toLowerCase().trim()
  const words = t.split(/\s+/)
  if (words.length > 4) return false
  if (/[?]/.test(t)) return false
  if (/\b(teach|explain|what|how|why|when|where|who|tell|show|help)\b/.test(t)) return false
  const first = words[0].replace(/[^a-z']/g, '')
  const greetings = ['hello', 'hi', 'hey', 'yo', 'sup', 'howdy', 'hiya', 'greetings']
  if (greetings.includes(first)) return true
  if (/^(good (morning|afternoon|evening|day))$/.test(t)) return true
  if (/^(what'?s up|whats up)$/.test(t)) return true
  return false
}

// ==================================================
// KNOWLEDGE BASE
// ==================================================
const KNOWLEDGE = [
  { match: /ethical hacking|penetration test|white ?hat|cyber ?security|cybersecurity|learn hacking/i, answer: `**Ethical Hacking — Learning Path**\n\nEthical hacking (white-hat security) = finding vulnerabilities **legally and with permission**.\n\n**📚 Roadmap**\n1. **Networking** — TCP/IP, DNS, HTTP, subnets. Free: TryHackMe Pre-Security, Professor Messer Network+\n2. **Linux** — bash, permissions. Free: OverTheWire Bandit\n3. **Web** — HTML/CSS/JS, HTTP, cookies, sessions\n4. **Programming** — Python + Bash for automation\n5. **Core security** — OWASP Top 10, cryptography, auth, firewalls\n6. **Hands-on labs** — TryHackMe, HackTheBox, PortSwigger Web Security Academy (all legal, all free)\n7. **Certifications** — CompTIA Security+ → CEH → OSCP\n\n**⚠️ Golden rules**\n• Only test systems you OWN or have written permission to test\n• Unauthorized access is illegal (CFAA / Computer Misuse Act / GDPR)\n• Report vulnerabilities responsibly\n• Bug bounties: HackerOne, Bugcrowd, YesWeHack\n\n**🧰 Tools to learn**\nNmap • Wireshark • Burp Suite • Metasploit • John the Ripper • Hashcat • sqlmap\n\n💡 Open the **🔒 Cyber Lab** in the sidebar to practice safely.` },
  { match: /what is (a )?(penetration|pen) ?test|how (does|do) (a )?pentest/i, answer: `**Penetration Testing**\n\nAn authorized simulated cyberattack to find vulnerabilities *before* real attackers.\n\n**Phases:**\n1. Reconnaissance — OSINT, DNS, subdomains\n2. Scanning — Nmap, ports, services\n3. Enumeration — users, shares, endpoints\n4. Exploitation — with written permission only\n5. Post-exploitation — privilege escalation, lateral movement\n6. Reporting — finding, severity (CVSS), proof, remediation\n\n**Types:** Black-box (outsider), White-box (insider), Grey-box (partial)\n\n**Frameworks:** PTES, OWASP Testing Guide, MITRE ATT&CK, NIST SP 800-115.` },
  { match: /(what is|explain|define) (javascript|js)\b/i, answer: `**JavaScript (JS)**\n\nHigh-level, interpreted language — the **only** one browsers natively run. Also runs on servers via **Node.js**.\n\n**Core concepts:**\n• Variables: \`let\`, \`const\` (avoid \`var\`)\n• Types: string, number, boolean, null, undefined, object, symbol, bigint\n• Functions: regular, arrow \`() => {}\`, async\n• Async: Promises + \`async/await\`\n• DOM: \`document\` API\n\n\`\`\`javascript\nconst greet = (name) => \`Hello, \${name}!\`\nconsole.log(greet('World'))\n\nasync function loadUser(id) {\n  const res = await fetch('/api/users/' + id)\n  if (!res.ok) throw new Error('HTTP ' + res.status)\n  return res.json()\n}\n\`\`\`\n\n**Ecosystem:** React, Vue, Svelte, Angular, Next.js, Express, NestJS.\n\n**Learn:** MDN Web Docs, javascript.info, freeCodeCamp.` },
  { match: /(what is|explain|define) (python)\b/i, answer: `**Python**\n\nA high-level, readable language. #1 for **AI/ML, data science, scripting, automation**, and increasingly backend web.\n\n**Concepts:**\n• Indentation defines blocks (no braces)\n• Dynamically typed, garbage-collected\n• Huge standard library\n• **PEP 8** = official style guide\n\n\`\`\`python\nfrom dataclasses import dataclass\nfrom typing import List\n\n@dataclass\nclass User:\n    id: int\n    name: str\n    email: str = ""\n\ndef greet(users: List[User]) -> None:\n    for u in users:\n        print(f"Hello, {u.name}!")\n\ngreet([User(1, "Alice"), User(2, "Bob")])\n\`\`\`\n\n**Popular packages:**\n• Web: Django, Flask, FastAPI\n• AI/ML: PyTorch, TensorFlow, scikit-learn, transformers\n• Data: pandas, numpy, matplotlib\n\n**Learn:** python.org tutorial, "Automate the Boring Stuff", Real Python.` },
  { match: /(what is|explain) (react|react\.?js)/i, answer: `**React**\n\nA JavaScript library by Meta for building **user interfaces** from reusable **components**.\n\n**Key ideas:**\n• **Components** — functions returning JSX\n• **Props** — read-only inputs\n• **State** — \`useState\`\n• **Effects** — \`useEffect\`\n• **Hooks** — useState, useEffect, useRef, useMemo, useCallback, useContext\n\n\`\`\`jsx\nimport { useState, useEffect } from 'react'\n\nexport default function Counter() {\n  const [n, setN] = useState(0)\n  useEffect(() => { document.title = \`Count: \${n}\` }, [n])\n  return (\n    <div>\n      <p>{n}</p>\n      <button onClick={() => setN(n + 1)}>+1</button>\n    </div>\n  )\n}\n\`\`\`\n\n**Ecosystem:** Next.js, React Router, Redux, Zustand, TanStack Query, Tailwind.\n\n**Learn:** react.dev (official).` },
  { match: /(how (to|do i) )?(learn|study|start) (programming|coding|to code)/i, answer: `**How to Learn Programming**\n\n**1. Pick ONE language** — Python (easiest), JavaScript (web), or Go (systems).\n\n**2. Fundamentals (2-4 weeks)**\nVariables • conditionals • loops • functions • arrays/dicts • strings • file I/O • errors\n\n**3. Practice daily**\n• freeCodeCamp.org\n• Exercism.io\n• Codewars\n• LeetCode Easy (after month 1)\n\n**4. Build small projects** (this is where it clicks)\nCalculator → Todo → Weather app → URL shortener → Chat\n\n**5. Learn tools**\nGit + GitHub • CLI • VS Code • debugging\n\n**6. Go deeper**\nData structures • algorithms • SQL • HTTP/REST • testing\n\n**⏱️ Timeline**\n• Basics: 1 month\n• Junior-ready: 6-12 months daily\n• Confident: 2+ years\n\n**Golden rules**\n• Code every day (even 30 min)\n• Read others' code on GitHub\n• Build things — don't chase tutorials\n\nWant starter code? Say "write me a python calculator".` },
  { match: /(what is|explain) (ai|artificial intelligence)\b/i, answer: `**Artificial Intelligence (AI)**\n\nThe field of building systems that perform tasks requiring human intelligence.\n\n**Branches:**\n• **ML** — learn from data\n• **Deep Learning** — neural nets\n• **NLP** — language (GPT, BERT)\n• **Computer Vision** — images\n• **RL** — rewards (AlphaGo)\n• **Generative AI** — LLMs, diffusion\n\n**Modern stack:**\n• LLMs: GPT-4/5, Claude, Gemini, Llama\n• Diffusion: Stable Diffusion, DALL-E, Midjourney\n• Frameworks: PyTorch, TensorFlow, JAX, Hugging Face\n\n**How LLMs work (short):**\n1. Tokenize text\n2. Transformer layers (attention)\n3. Predict next token, repeat\n4. Fine-tune with RLHF\n\n**Learn:** Andrew Ng's ML Specialization, fast.ai, Hugging Face Course.` },
  { match: /(what is|explain) (blockchain|bitcoin|crypto)\b/i, answer: `**Blockchain / Bitcoin / Crypto**\n\n**Blockchain** — distributed append-only ledger. Each block holds transactions + hash of previous block. Immutable.\n\n**Bitcoin** — first crypto (2009). **Proof of Work** mining.\n**Ethereum** — programmable, smart contracts, **Proof of Stake**.\n\n**Key concepts:**\n• Wallet = private key + public address\n• Gas — computation fee\n• Consensus — PoW / PoS / DPoS\n• DeFi, NFT\n\n**⚠️ Safety**\n• Never share private key/seed\n• "Guaranteed returns" = scam\n• Verify contract addresses\n• Only invest what you can lose\n\n**Learn:** "Mastering Bitcoin", ethereum.org.` },
  { match: /(what is|explain) (machine learning|ml)\b/i, answer: `**Machine Learning**\n\nSystems that learn patterns from data.\n\n**3 types:**\n1. **Supervised** — labeled → predict\n2. **Unsupervised** — unlabeled → find structure\n3. **Reinforcement** — agent + rewards\n\n**Common algorithms:**\nLinear/Logistic Regression • Decision Trees • Random Forest • XGBoost • SVM • KNN • Neural Nets • K-Means • PCA\n\n**Workflow:**\nCollect → Clean → Feature engineer → Split → Train → Evaluate → Tune → Deploy\n\n**Tools:** scikit-learn, PyTorch, TensorFlow, pandas, numpy, Jupyter.\n\n**Learn:** Andrew Ng ML Specialization, "Hands-On ML with Scikit-Learn/Keras/TF", Kaggle.` },
  { match: /(how (to|do i) )?(make|build|create) (a )?(website|web ?site|web app)/i, answer: `**How to Build a Website**\n\n**1. Choose level**\n• Static → HTML + CSS + JS\n• Interactive → React/Vue + backend\n• Blog → Next.js + MDX or WordPress\n• E-commerce → Shopify or Next.js + Stripe\n\n**2. Fundamentals**\nHTML (structure) • CSS (styling) • JavaScript (interactivity) • HTTP (methods, status)\n\n**3. Pick stack**\n• Beginner: HTML/CSS/JS + Netlify\n• React: Next.js + Tailwind + Vercel\n• Full stack: Next.js + Prisma + PostgreSQL\n• Python: Flask/FastAPI + Render\n\n**4. First site (30 min)**\n\`\`\`html\n<!DOCTYPE html>\n<html>\n<head><title>My Site</title>\n<style>\nbody { font-family: system-ui; background: #111; color: #eee; padding: 40px; }\nh1 { color: #ff003c; }\n</style></head>\n<body><h1>Hello, World!</h1></body>\n</html>\n\`\`\`\nSave as \`index.html\`. Done.\n\n**5. Deploy free**\nVercel • Netlify • GitHub Pages\n\n**Learn:** MDN, freeCodeCamp, Frontend Masters.` },
  { match: /(what is|explain) (api|rest|restful)/i, answer: `**API / REST**\n\n**API** = contract for one program to talk to another.\n**REST** = most common style. HTTP methods on resources.\n\n**Verbs:** GET (read) • POST (create) • PUT (replace) • PATCH (partial) • DELETE (remove)\n\n**Status codes:**\n• 2xx success (200, 201, 204)\n• 3xx redirect\n• 4xx client error (400, 401, 403, 404, 429)\n• 5xx server error\n\n\`\`\`bash\ncurl -X POST https://api.example.com/users \\\\\n  -H "Content-Type: application/json" \\\\\n  -H "Authorization: Bearer TOKEN" \\\\\n  -d '{"name":"Alice"}'\n\`\`\`\n\n**Best practices:**\n• Nouns not verbs in URLs (\`/users/42\`)\n• Version APIs (\`/v1/\`)\n• Paginate long lists\n• Proper status codes\n• Document with OpenAPI\n\n**Alternatives:** GraphQL, gRPC, WebSockets.` },
  { match: /(what is|explain) (html|css)\b/i, answer: `**HTML & CSS**\n\n**HTML** = structure of a page.\n\`\`\`html\n<header><h1>Title</h1></header>\n<main>\n  <p>Paragraph with <a href="/link">link</a>.</p>\n  <img src="cat.jpg" alt="A cat" />\n</main>\n\`\`\`\n\n**CSS** = appearance.\n\`\`\`css\nbody { font-family: system-ui; background: #111; color: #eee; }\nh1 { color: #ff003c; font-size: 2rem; }\n.row { display: flex; gap: 12px; align-items: center; }\n.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }\n@media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }\n\`\`\`\n\n**Modern CSS:**\n• Flexbox + Grid\n• CSS Variables (\`--color: red\`)\n• Media queries\n• Transitions/animations\n• Container queries\n• \`clamp()\` for fluid type\n\n**Learn:** MDN, freeCodeCamp, Kevin Powell (YouTube).` },
  { match: /(how (to|do i) )?(get|find) (a )?(job|work) (as|in) (a )?(developer|programmer|software)/i, answer: `**Landing a Developer Job**\n\n**1. Pick a niche**\nFrontend (React/Vue) • Backend (Node/Python/Go/Java) • Full stack • Mobile • DevOps/Cloud • Data/ML\n\n**2. Build a portfolio (5-8 projects)**\nEach: live URL + GitHub repo + README + 1-2 sentence "what & why"\n\n**3. Master interview loop**\n• Coding — LeetCode Easy/Medium, NeetCode 150\n• System design — "Designing Data-Intensive Applications"\n• Behavioral — STAR method\n\n**4. Resume + LinkedIn**\n• 1 page, metrics ("Reduced load time 40%")\n• LinkedIn headline + open-to-work\n\n**5. Apply broadly**\nLinkedIn • Indeed • Wellfound • Otta • RemoteOK\nReferrals beat cold apps 10:1\nYC Work at a Startup\n\n**6. Negotiate**\nNever accept first offer. Research on levels.fyi.\n\n**Timeline:** 6-18 months focused.\n\n**Free:** freeCodeCamp, The Odin Project, Full Stack Open, CS50.` },
  { match: /(what is|explain) (docker|kubernetes|k8s)\b/i, answer: `**Docker & Kubernetes**\n\n**Docker** — packages app + deps into a **container**.\n\n\`\`\`dockerfile\nFROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --omit=dev\nCOPY . .\nEXPOSE 3000\nCMD ["node", "server.js"]\n\`\`\`\n\n\`\`\`bash\ndocker build -t myapp .\ndocker run -p 3000:3000 myapp\n\`\`\`\n\n**Kubernetes** — orchestrates many containers across many machines.\n\n**Core objects:** Pod • Deployment • Service • Ingress • ConfigMap/Secret • PersistentVolume\n\n**When:**\n• 1 container → Docker\n• Many services → K8s\n• Small team → managed PaaS (Vercel, Render, Fly.io)\n\n**Learn:** Docker Get Started, KodeKloud, "Kubernetes Up & Running".` },
  { match: /(what is|explain) (git|github)\b/i, answer: `**Git & GitHub**\n\n**Git** — distributed version control. Tracks every change.\n\n\`\`\`bash\ngit init\ngit status\ngit add .\ngit commit -m "message"\ngit log --oneline --graph\ngit branch feature\ngit checkout feature\ngit merge feature\ngit pull\ngit push\n\`\`\`\n\n**Branch workflow:**\n1. \`git checkout -b feature/login\`\n2. Commits\n3. \`git push -u origin feature/login\`\n4. Open **Pull Request**\n5. Review → merge → delete\n\n**GitHub adds:**\nPull requests • Issues • Actions (CI/CD) • Pages (free hosting) • Copilot\n\n**Golden rules:**\n• Commit often\n• Meaningful messages (imperative)\n• Never commit secrets\n• \`.gitignore\` node_modules, dist\n• Pull before push\n\n**Learn:** git-scm.com book, GitHub Skills.` },
  { match: /(what is|explain) (linux|unix)\b/i, answer: `**Linux**\n\nFree, open-source OS. Powers servers, Android, supercomputers.\n\n\`\`\`bash\npwd                    # where am I\nls -la                 # list all\ncd /var/log            # change dir\ncat file.txt\nless file.txt\nhead -n 20 f.txt\ntail -f log.txt\ngrep -r "error" .\nfind . -name "*.js"\nchmod 755 script.sh\nchown user:group f\nps aux                 # processes\ntop / htop\nkill -9 PID\ndf -h / du -sh\nfree -h\nsystemctl status nginx\n\`\`\`\n\n**Permissions:** \`rwx\` = read(4) write(2) execute(1). \`chmod 755\` = rwx r-x r-x.\n\n**Package managers:** apt (Ubuntu) • dnf (Fedora) • pacman (Arch) • apk (Alpine)\n\n**Learn:** "The Linux Command Line" (free PDF), OverTheWire Bandit, Linux Journey.` },
  { match: /^(hi|hello|hey|yo|sup|howdy)\b/i, answer: `Hey there! 👋 I'm CYPHER4X. What can I help you with today?` },
  { match: /how are you|how'?s it going|what'?s up/i, answer: `I'm running great, thanks for asking! Ready to help with coding, learning, security topics, or anything else you need.` },
]

// ==================================================
// APP DEEP-LINK
// ==================================================
const APP_MAP = {
  whatsapp: { name:'WhatsApp', pkg:'com.whatsapp', scheme:'whatsapp', universal:'https://wa.me/', web:'https://web.whatsapp.com' },
  whatsappbusiness: { name:'WhatsApp Business', pkg:'com.whatsapp.w4b', scheme:'whatsapp', universal:'https://wa.me/', web:'https://web.whatsapp.com' },
  instagram: { name:'Instagram', pkg:'com.instagram.android', scheme:'instagram', universal:'https://instagram.com/', web:'https://instagram.com' },
  facebook: { name:'Facebook', pkg:'com.facebook.katana', scheme:'fb', universal:'https://facebook.com/', web:'https://facebook.com' },
  telegram: { name:'Telegram', pkg:'org.telegram.messenger', scheme:'tg', universal:'https://t.me/', web:'https://web.telegram.org' },
  youtube: { name:'YouTube', pkg:'com.google.android.youtube', scheme:'vnd.youtube', universal:'https://youtube.com/', web:'https://youtube.com' },
  spotify: { name:'Spotify', pkg:'com.spotify.music', scheme:'spotify', universal:'https://open.spotify.com/', web:'https://open.spotify.com' },
  gmail: { name:'Gmail', pkg:'com.google.android.gm', scheme:'googlegmail', universal:'https://mail.google.com/', web:'https://mail.google.com' },
  maps: { name:'Maps', pkg:'com.google.android.apps.maps', scheme:'geo', universal:'https://maps.google.com/', web:'https://maps.google.com' },
  github: { name:'GitHub', pkg:null, scheme:null, universal:'https://github.com/', web:'https://github.com' },
}
const openApp = (k, x = '') => {
  const a = APP_MAP[k]; if (!a) return `Unknown: ${k}`
  if (isAndroid() && a.pkg) { try { window.location.href = `intent://${x}#Intent;scheme=${a.scheme};package=${a.pkg};S.browser_fallback_url=${encodeURIComponent(a.universal)};end`; return `Opening ${a.name}...` } catch {} }
  if (isMobileDevice()) { window.open(a.universal + x, '_blank', 'noopener,noreferrer'); return `Opening ${a.name}...` }
  window.open(a.web, '_blank', 'noopener,noreferrer'); return `Opening ${a.name}...`
}
const openWhatsAppGroup = (n) => {
  const t = `Looking for group: ${n}`
  if (isAndroid()) { window.location.href = `intent://send?text=${encodeURIComponent(t)}#Intent;scheme=whatsapp;package=com.whatsapp;end`; return `Opening WhatsApp. Search "${n}".` }
  if (isMobileDevice()) { window.open(`https://wa.me/?text=${encodeURIComponent(t)}`, '_blank'); return `Opening WhatsApp. Search "${n}".` }
  window.open('https://web.whatsapp.com', '_blank'); return `WhatsApp Web opened.`
}

// ==================================================
// PERSONALITY
// ==================================================
const PERSONALITIES = [
  { id:'polite', label:'Polite', desc:'Respectful', icon:'🤝' },
  { id:'concise', label:'Concise', desc:'Short', icon:'⚡' },
  { id:'clear', label:'Clear', desc:'Simple', icon:'💡' },
  { id:'comprehensive', label:'Comprehensive', desc:'Detailed', icon:'📚' },
  { id:'custom', label:'Custom', desc:'Learns you', icon:'🎨' },
]
const analyzeUserStyle = (msgs) => {
  const u = msgs.filter(m => m.role === 'user').map(m => m.content)
  if (u.length < 3) return null
  const avg = u.reduce((a, m) => a + m.length, 0) / u.length
  return { short: avg < 40, long: avg > 120, emoji: u.filter(m => /[\u{1F300}-\u{1F9FF}]/u.test(m)).length / u.length > 0.3, formal: u.filter(m => /\b(please|thank you)\b/i.test(m)).length / u.length > 0.3, excited: u.filter(m => /!/.test(m)).length / u.length > 0.4, count: u.length }
}
const applyPersonality = (reply, p, cs) => {
  if (!reply) return reply
  const clean = reply.replace(/^(I found this for you:|Great question!|Based on my search,|Certainly!)\s*/i, '').trim()
  if (p === 'concise') { const s = clean.split(/(?<=[.!?])\s+/); return s.slice(0, 2).join(' ') || clean }
  if (p === 'polite') return `Certainly! ${clean}`
  if (p === 'clear') return `Here's a clear answer:\n\n${clean}`
  if (p === 'comprehensive') return `Let me give you a thorough answer:\n\n${clean}`
  if (p === 'custom' && cs && cs.count) {
    let out = clean
    if (cs.short) { const s = clean.split(/(?<=[.!?])\s+/); out = s.slice(0, 2).join(' ') || clean }
    if (cs.formal && !/^Regarding/i.test(out)) out = `Regarding your query: ${out}`
    if (cs.emoji) out = `✨ ${out} 😊`
    if (cs.excited && !/[!?]$/.test(out)) out += '!'
    return out
  }
  return clean
}

// ==================================================
// CODE GENERATION
// ==================================================
const detectLanguage = (t) => {
  const x = t.toLowerCase()
  const m = [['javascript',['javascript','js','node']],['python',['python','py']],['react',['react','jsx']],['typescript',['typescript','ts']],['html',['html']],['css',['css']],['java',['java']],['c++',['c++','cpp']],['go',['golang']],['rust',['rust']],['php',['php']],['sql',['sql']]]
  for (const [l, k] of m) if (k.some(v => x.includes(v))) return l
  return 'javascript'
}
const generateLongCode = (lang, purpose, detail) => {
  const L = lang.toLowerCase()
  if (L.includes('react')) return `Here's a complete React application for: **${purpose}**${detail ? ` (${detail})` : ''}\n\n\`\`\`jsx\n// ${purpose} — React\nimport { useState, useEffect, useCallback } from 'react'\n\nfunction useLocalStorage(key, initial) {\n  const [v, setV] = useState(() => {\n    try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : initial } catch { return initial }\n  })\n  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)) } catch {} }, [key, v])\n  return [v, setV]\n}\n\nexport default function App() {\n  const [items, setItems] = useLocalStorage('items', [])\n  const [input, setInput] = useState('')\n  const add = useCallback(() => { if (!input.trim()) return; setItems(p => [{ id: Date.now(), text: input, done: false }, ...p]); setInput('') }, [input, setItems])\n  const toggle = (id) => setItems(p => p.map(i => i.id === id ? { ...i, done: !i.done } : i))\n  const remove = (id) => setItems(p => p.filter(i => i.id !== id))\n  return (\n    <div style={{ padding: 20, fontFamily: 'system-ui', maxWidth: 600, margin: '0 auto' }}>\n      <h1>${purpose}</h1>\n      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>\n        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && add()} placeholder="Type..." style={{ flex: 1, padding: 12, borderRadius: 8, border: '1px solid #ccc' }} />\n        <button onClick={add} style={{ padding: '12px 20px', background: '#ff003c', color: '#fff', border: 'none', borderRadius: 8 }}>Add</button>\n      </div>\n      <ul style={{ listStyle: 'none', padding: 0 }}>\n        {items.map(i => (\n          <li key={i.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderBottom: '1px solid #eee' }}>\n            <input type="checkbox" checked={i.done} onChange={() => toggle(i.id)} />\n            <span style={{ flex: 1, textDecoration: i.done ? 'line-through' : 'none' }}>{i.text}</span>\n            <button onClick={() => remove(i.id)}>✕</button>\n          </li>\n        ))}\n      </ul>\n    </div>\n  )\n}\n\`\`\`\n\n**Includes:** custom hook, CRUD, responsive layout. Want auth or a backend?`
  if (L.includes('python')) return `Here's a complete Python program for: **${purpose}**${detail ? ` (${detail})` : ''}\n\n\`\`\`python\n# ${purpose} — Python\nimport json, logging, argparse\nfrom dataclasses import dataclass, asdict\nfrom typing import List\nfrom datetime import datetime\n\nlogging.basicConfig(level=logging.INFO)\nlog = logging.getLogger(__name__)\n\n@dataclass\nclass Item:\n    id: int\n    title: str\n    done: bool = False\n    created_at: str = ""\n    def __post_init__(self):\n        if not self.created_at:\n            self.created_at = datetime.utcnow().isoformat()\n\nclass Store:\n    def __init__(self, path="items.json"):\n        self.path = path\n        self.items: List[Item] = []\n        self._load()\n    def _load(self):\n        try:\n            with open(self.path) as f: self.items = [Item(**d) for d in json.load(f)]\n        except FileNotFoundError: pass\n    def save(self):\n        with open(self.path, "w") as f: json.dump([asdict(i) for i in self.items], f, indent=2)\n    def add(self, title):\n        nid = max((i.id for i in self.items), default=0) + 1\n        item = Item(id=nid, title=title)\n        self.items.append(item); self.save(); return item\n\ndef main():\n    p = argparse.ArgumentParser()\n    p.add_argument("cmd", choices=["add", "list"])\n    p.add_argument("title", nargs="?")\n    args = p.parse_args()\n    s = Store()\n    if args.cmd == "add" and args.title:\n        item = s.add(args.title); print(f"Added #{item.id}")\n    else:\n        for i in s.items: print(f"{'✓' if i.done else '○'} #{i.id} {i.title}")\n\nif __name__ == "__main__": main()\n\`\`\`\n\n**Run:** \`python app.py add "Task"\` then \`python app.py list\``
  return `Here's a complete **${lang}** solution for: **${purpose}**${detail ? ` (${detail})` : ''}\n\n\`\`\`javascript\n// ${purpose} — ${lang}\n'use strict';\n\nconst CONFIG = { name: '${purpose.replace(/'/g,"\\'")}', version: '1.0.0' };\nconst log = { info: (...a) => console.log('[INFO]', ...a), error: (...a) => console.error('[ERROR]', ...a) };\n\nclass App {\n  constructor(o = {}) { this.options = { ...CONFIG, ...o }; this.state = { items: [], ready: false }; log.info('Init:', this.options.name) }\n  async init() { await this.load(); this.state.ready = true; log.info('Ready'); return this }\n  async load() { await new Promise(r => setTimeout(r, 10)) }\n  add(text) { if (!text) throw new Error('Text required'); const item = { id: Date.now(), text, created: new Date().toISOString() }; this.state.items.push(item); return item }\n  list() { return [...this.state.items] }\n  remove(id) { const b = this.state.items.length; this.state.items = this.state.items.filter(i => i.id !== id); return this.state.items.length < b }\n}\n\n(async () => {\n  const app = await new App().init();\n  app.add('Sample #1'); app.add('Sample #2');\n  console.log('Items:', app.list());\n})();\n\`\`\`\n\n**Includes:** config, logger, class with async init, CRUD. Want a specific framework?`
}
const isCodeRequest = (q) => {
  const x = q.toLowerCase()
  return ['generate code','write code','create code','make code','build code','code for','code to','function in','write me a','write an ai code'].some(k => x.includes(k))
}

// ==================================================
// WEB SEARCH
// ==================================================
const searchWeb = async (query) => {
  try {
    const r = await fetch(TAVILY_URL, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${TAVILY_API_KEY}` }, body: JSON.stringify({ query, search_depth: 'advanced', include_answer: true, max_results: 6 }) })
    if (!r.ok) throw new Error(`HTTP ${r.status}`)
    const d = await r.json()
    const results = d.results || []
    const safe = results.find(x => { try { const h = new URL(x.url).hostname; return /wikipedia|britannica|github|stackoverflow|mozilla|python|reactjs|gov|edu/.test(h) } catch { return false } }) || results[0]
    return { answer: d.answer || results.map(x => x.content).join('\n\n') || 'No results.', safestUrl: safe?.url }
  } catch (e) { return { error: e.message } }
}
const openAnonymous = (q) => window.open(`https://duckduckgo.com/?q=${encodeURIComponent(q)}&kae=d`, '_blank', 'noopener,noreferrer')

// ==================================================
// MUSIC ENGINE
// ==================================================
const MUSIC_STYLES = {
  love:    { scale: 'major',      bpm: 78,  mood: 'romantic',    root: 60, prog: [[0,4,7],[5,9,12],[7,11,14],[5,9,12]] },
  pink:    { scale: 'major',      bpm: 100, mood: 'dreamy',      root: 62, prog: [[0,4,7],[9,12,16],[5,9,12],[7,11,14]] },
  sad:     { scale: 'minor',      bpm: 68,  mood: 'melancholic', root: 57, prog: [[0,3,7],[5,8,12],[7,10,14],[3,7,10]] },
  happy:   { scale: 'major',      bpm: 128, mood: 'upbeat',      root: 60, prog: [[0,4,7],[7,11,14],[9,12,16],[5,9,12]] },
  chill:   { scale: 'pentatonic', bpm: 88,  mood: 'relaxed',     root: 60, prog: [[0,4,7],[5,9,12],[7,11,14],[5,9,12]] },
  epic:    { scale: 'minor',      bpm: 140, mood: 'intense',     root: 55, prog: [[0,3,7],[5,8,12],[8,12,15],[7,10,14]] },
  default: { scale: 'major',      bpm: 118, mood: 'balanced',    root: 60, prog: [[0,4,7],[5,9,12],[7,11,14],[5,9,12]] },
}
const guessMusicStyle = (d) => {
  const x = (d || '').toLowerCase()
  for (const k of Object.keys(MUSIC_STYLES)) if (x.includes(k)) return { ...MUSIC_STYLES[k], name: k }
  return { ...MUSIC_STYLES.default, name: 'balanced' }
}
const m2hz = (m) => 440 * Math.pow(2, (m - 69) / 12)
const kick = (c, t, dst) => { const o = c.createOscillator(), g = c.createGain(); o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(40, t + 0.15); g.gain.setValueAtTime(0.9, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.25); o.connect(g).connect(dst); o.start(t); o.stop(t + 0.3) }
const snare = (c, t, dst) => { const b = c.createBuffer(1, c.sampleRate * 0.2, c.sampleRate); const d = b.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 2); const s = c.createBufferSource(); s.buffer = b; const hp = c.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 1000; const g = c.createGain(); g.gain.value = 0.6; s.connect(hp).connect(g).connect(dst); s.start(t) }
const hihat = (c, t, dst, open = false) => { const b = c.createBuffer(1, c.sampleRate * (open ? 0.3 : 0.06), c.sampleRate); const d = b.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; const s = c.createBufferSource(); s.buffer = b; const hp = c.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 7000; const g = c.createGain(); g.gain.setValueAtTime(0.3, t); g.gain.exponentialRampToValueAtTime(0.001, t + (open ? 0.25 : 0.05)); s.connect(hp).connect(g).connect(dst); s.start(t) }
const bassNote = (c, t, dur, f, dst) => { const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f; const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 500; const g = c.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.5, t + 0.02); g.gain.exponentialRampToValueAtTime(0.001, t + dur); o.connect(lp).connect(g).connect(dst); o.start(t); o.stop(t + dur + 0.05) }
const padChord = (c, t, dur, fs, dst) => fs.forEach((f, i) => { const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f * (1 + (i - 1) * 0.003); const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1800; const g = c.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.12, t + 0.3); g.gain.setValueAtTime(0.12, t + dur - 0.3); g.gain.linearRampToValueAtTime(0, t + dur); o.connect(lp).connect(g).connect(dst); o.start(t); o.stop(t + dur + 0.05) })
const leadNote = (c, t, dur, f, dst) => { const o = c.createOscillator(); o.type = 'triangle'; o.frequency.value = f; const v = c.createOscillator(); v.frequency.value = 5; const vg = c.createGain(); vg.gain.value = 3; v.connect(vg).connect(o.frequency); const g = c.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.28, t + 0.03); g.gain.exponentialRampToValueAtTime(0.001, t + dur); o.connect(g).connect(dst); o.start(t); v.start(t); o.stop(t + dur + 0.1); v.stop(t + dur + 0.1) }
const robotVoice = (c, t, dur, f, dst) => {
  const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f
  const master = c.createGain(); master.gain.setValueAtTime(0, t); master.gain.linearRampToValueAtTime(0.4, t + 0.05); master.gain.setValueAtTime(0.4, t + dur - 0.05); master.gain.linearRampToValueAtTime(0, t + dur)
  o.connect(master).connect(dst)
  const formants = [800, 1150, 2900], gains = [1.0, 0.5, 0.2]
  formants.forEach((fr, i) => { const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = fr; bp.Q.value = 8; const g = c.createGain(); g.gain.value = gains[i] * 0.15; o.connect(bp).connect(g).connect(dst) })
  o.start(t); o.stop(t + dur + 0.05)
}
async function renderSong(style, dur, quality) {
  const sr = 44100
  const ctx = new OfflineAudioContext(2, sr * dur, sr)
  const master = ctx.createGain(); master.gain.value = 0.7; master.connect(ctx.destination)
  const dbus = ctx.createGain(); dbus.gain.value = quality === 'low' ? 0.4 : 0.7; dbus.connect(master)
  const mbus = ctx.createGain(); mbus.gain.value = 0.8; mbus.connect(master)
  const beat = 60 / style.bpm, barDur = beat * 4, bars = Math.ceil(dur / barDur) + 1
  const sc = { major: [0,2,4,5,7,9,11], minor: [0,2,3,5,7,8,10], pentatonic: [0,2,4,7,9] }[style.scale]
  const base = style.root, prog = style.prog
  for (let bar = 0; bar < bars; bar++) {
    const bt = bar * barDur
    for (let b = 0; b < 4; b++) { const t = bt + b * beat; if (b === 0 || b === 2) kick(ctx, t, dbus); if (b === 1 || b === 3) snare(ctx, t, dbus); hihat(ctx, t, dbus, b === 3); hihat(ctx, t + beat / 2, dbus, false) }
    const chord = prog[bar % prog.length]
    padChord(ctx, bt, barDur, chord.map(c => m2hz(base + c)), mbus)
    chord.forEach((c, i) => bassNote(ctx, bt + i * beat, beat * 0.9, m2hz(base + c - 24), mbus))
    if (quality !== 'low') for (let n = 0; n < 8; n++) { if (Math.random() < 0.15) continue; const d = sc[Math.floor(Math.random() * sc.length)]; leadNote(ctx, bt + n * (beat / 2), beat / 2 * 0.9, m2hz(base + 12 + d), mbus) }
    if (quality === 'high') chord.forEach((c, i) => { for (let a = 0; a < 4; a++) { const o = ctx.createOscillator(); o.type = 'square'; o.frequency.value = m2hz(base + c + 24); const g = ctx.createGain(); const t = bt + a * beat + i * (beat / 4); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.06, t + 0.01); g.gain.exponentialRampToValueAtTime(0.001, t + 0.15); o.connect(g).connect(mbus); o.start(t); o.stop(t + 0.2) } })
    if (quality !== 'low') { const vd = sc[Math.floor(Math.random() * sc.length)]; robotVoice(ctx, bt + beat, beat * 1.8, m2hz(base + 12 + vd), mbus) }
  }
  return await ctx.startRendering()
}
function audioBufferToWav(buffer) {
  const nCh = buffer.numberOfChannels, sr = buffer.sampleRate, bd = 16, bp = bd / 8, ba = nCh * bp
  const data = []; for (let i = 0; i < nCh; i++) data.push(buffer.getChannelData(i))
  const len = buffer.length * ba
  const ab = new ArrayBuffer(44 + len); const v = new DataView(ab)
  const ws = (o, s) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)) }
  ws(0, 'RIFF'); v.setUint32(4, 36 + len, true); ws(8, 'WAVE'); ws(12, 'fmt ')
  v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, nCh, true)
  v.setUint32(24, sr, true); v.setUint32(28, sr * ba, true)
  v.setUint16(32, ba, true); v.setUint16(34, bd, true); ws(36, 'data'); v.setUint32(40, len, true)
  let off = 44
  for (let i = 0; i < buffer.length; i++) for (let ch = 0; ch < nCh; ch++) { let s = Math.max(-1, Math.min(1, data[ch][i])); s = s < 0 ? s * 0x8000 : s * 0x7FFF; v.setInt16(off, s, true); off += 2 }
  return new Blob([ab], { type: 'audio/wav' })
}
async function generateAndPlayMusic(style, dur, quality, onReady) {
  const buf = await renderSong(style, dur, quality)
  const wav = audioBufferToWav(buf)
  const url = URL.createObjectURL(wav)
  const audio = new Audio(url); audio.volume = 0.9; audio.play()
  onReady && onReady({ audio, url, blob: wav, duration: dur })
}

// ==================================================
// VIDEO ENGINE
// ==================================================
const VIDEO_STYLES = {
  anime:   { palette: ['#ffb6d5','#ff4f9a','#ffffff','#ffd1e8'], label: 'Anime',     scene: 'sakura' },
  movie:   { palette: ['#0b0b0b','#1a1a2e','#ffcc00','#e94560'], label: 'Cinematic', scene: 'movie' },
  cartoon: { palette: ['#ffe066','#ff6b6b','#4ecdc4','#a8e6cf'], label: 'Cartoon',   scene: 'cartoon' },
  cyber:   { palette: ['#00ff41','#008f11','#0d0208','#ff003c'], label: 'Cyberpunk', scene: 'matrix' },
  nature:  { palette: ['#2ecc71','#27ae60','#f39c12','#a8e6cf'], label: 'Nature',    scene: 'nature' },
  space:   { palette: ['#000','#1a0033','#ff00ff','#00ffff'],     label: 'Space',     scene: 'space' },
  abstract:{ palette: ['#ff003c','#ff69b4','#ffa500','#00ffff'],  label: 'Abstract',  scene: 'blobs' },
  default: { palette: ['#ff003c','#ff6688','#ffa500','#ffff00'],  label: 'Default',   scene: 'particles' },
}
const guessVideoStyle = (d) => {
  const x = (d || '').toLowerCase()
  for (const k of Object.keys(VIDEO_STYLES)) if (x.includes(k)) return VIDEO_STYLES[k]
  return VIDEO_STYLES.default
}
function drawWatermark(ctx, W, H, text) {
  ctx.save(); ctx.font = 'bold 14px monospace'; ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.textAlign = 'right'; ctx.fillText(text, W - 12, H - 12)
  ctx.font = '11px monospace'; ctx.fillStyle = 'rgba(255,0,60,0.75)'; ctx.fillText('CYPHER4X', W - 12, H - 28); ctx.restore()
}
function startCanvasVideo(canvas, style, userDesc, wm, onProgress) {
  const ctx = canvas.getContext('2d'); const W = canvas.width, H = canvas.height
  let t = 0, raf; const stream = canvas.captureStream(30)
  const pal = style.palette, scene = style.scene
  const parts = Array.from({ length: 120 }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2, r: Math.random() * 4 + 1, rot: Math.random() * Math.PI * 2, c: pal[Math.floor(Math.random() * pal.length)] }))
  const stars = Array.from({ length: 100 }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.6 + 0.3 }))
  const draw = () => {
    t += 0.03
    if (scene === 'matrix') { ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); ctx.font = '14px monospace'; for (let i = 0; i < 40; i++) { const x = i * W / 40, y = ((t * 60 + i * 30) % H); ctx.fillStyle = `rgba(0,255,65,${0.3 + Math.random() * 0.6})`; ctx.fillText(String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96)), x, y) } }
    else if (scene === 'space') { const g = ctx.createRadialGradient(W / 2, H / 2, 20, W / 2, H / 2, W); g.addColorStop(0, '#1a0033'); g.addColorStop(1, '#000'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); stars.forEach(s => { ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(255,255,255,${0.3 + Math.random() * 0.7})`; ctx.fill(); s.x -= 0.15; if (s.x < 0) s.x = W }); const px = W / 2 + Math.sin(t) * 30, py = H / 2; const pg = ctx.createRadialGradient(px - 15, py - 15, 5, px, py, 60); pg.addColorStop(0, '#ff00ff'); pg.addColorStop(1, '#330033'); ctx.beginPath(); ctx.arc(px, py, 55, 0, Math.PI * 2); ctx.fillStyle = pg; ctx.fill() }
    else if (scene === 'movie') { ctx.fillStyle = '#0b0b0b'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H * 0.12); ctx.fillRect(0, H * 0.88, W, H * 0.12); const creds = ['CYPHER4X PRODUCTIONS', 'directed by You', 'cinematography · AI', 'starring · Characters', 'music · Synth Engine', 'A CYPHER4X FILM']; ctx.font = '14px monospace'; ctx.textAlign = 'center'; creds.forEach((l, i) => { const y = (t * 40 + i * 40) % H; if (y > H * 0.15 && y < H * 0.85) { ctx.fillStyle = i === 0 ? '#ffcc00' : 'rgba(255,255,255,0.8)'; ctx.fillText(l, W / 2, y) } }) }
    else if (scene === 'sakura') { const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#ffb6d5'); g.addColorStop(1, '#ff4f9a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.beginPath(); ctx.arc(W * 0.78, H * 0.22, 40, 0, Math.PI * 2); ctx.fillStyle = '#fff8d6'; ctx.fill(); parts.forEach(p => { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.beginPath(); ctx.ellipse(0, 0, p.r * 2.5, p.r, 0, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.fill(); ctx.restore(); p.y += 1.2; p.x += Math.sin(t + p.y * 0.05) * 0.8; p.rot += 0.02; if (p.y > H) { p.y = -10; p.x = Math.random() * W } }) }
    else if (scene === 'nature') { const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#87ceeb'); g.addColorStop(1, '#2ecc71'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.beginPath(); ctx.arc(W * 0.2, H * 0.18, 30, 0, Math.PI * 2); ctx.fillStyle = '#f39c12'; ctx.fill(); ctx.beginPath(); ctx.moveTo(0, H * 0.7); for (let x = 0; x <= W; x += 20) ctx.lineTo(x, H * 0.7 + Math.sin(x * 0.02 + t) * 20); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath(); ctx.fillStyle = '#27ae60'; ctx.fill(); parts.forEach(p => { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.beginPath(); ctx.ellipse(0, 0, p.r * 2, p.r * 0.8, 0, 0, Math.PI * 2); ctx.fillStyle = 'rgba(46,204,113,0.9)'; ctx.fill(); ctx.restore(); p.y += 0.8; p.x += Math.sin(t + p.x * 0.05) * 0.6; p.rot += 0.02; if (p.y > H) { p.y = -10; p.x = Math.random() * W } }) }
    else if (scene === 'cartoon') { const g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, '#ffe066'); g.addColorStop(1, '#ff6b6b'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); parts.slice(0, 20).forEach((p, i) => { const x = (i * W / 20 + t * 20) % W; const y = H * 0.5 + Math.sin(t * 3 + i) * 60; ctx.beginPath(); if (i % 3 === 0) ctx.arc(x, y, 20, 0, Math.PI * 2); else if (i % 3 === 1) ctx.rect(x - 15, y - 15, 30, 30); else { ctx.moveTo(x, y - 20); ctx.lineTo(x + 20, y + 15); ctx.lineTo(x - 20, y + 15); ctx.closePath() } ctx.fillStyle = ['#4ecdc4', '#a8e6cf', '#ffffff'][i % 3]; ctx.fill() }) }
    else if (scene === 'blobs') { ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); parts.forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2); const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5); g.addColorStop(0, p.c + 'cc'); g.addColorStop(1, p.c + '00'); ctx.fillStyle = g; ctx.fill(); p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1 }) }
    else { const g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, pal[0]); g.addColorStop(1, pal[1] || pal[0]); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); parts.forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = p.c; ctx.fill(); p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1 }) }
    ctx.save(); ctx.textAlign = 'center'; ctx.font = 'bold 42px sans-serif'; ctx.fillStyle = 'rgba(255,255,255,0.95)'; ctx.shadowColor = 'rgba(0,0,0,0.7)'; ctx.shadowBlur = 12; ctx.fillText('CYPHER4X', W / 2, H / 2 - 8); ctx.font = '16px sans-serif'; ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.fillText(style.label + ' Style', W / 2, H / 2 + 22); if (userDesc) { ctx.font = 'italic 13px sans-serif'; ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.fillText('"' + userDesc.slice(0, 40) + '"', W / 2, H / 2 + 50) } ctx.restore()
    drawWatermark(ctx, W, H, wm || 'CYPHER4X')
    onProgress && onProgress(t)
    raf = requestAnimationFrame(draw)
  }
  draw()
  const recorder = new MediaRecorder(stream, { mimeType: 'video/webm', videoBitsPerSecond: 2500000 })
  const chunks = []
  recorder.ondataavailable = e => e.data.size > 0 && chunks.push(e.data)
  recorder.start()
  return { stop: () => new Promise(res => { recorder.onstop = () => res(new Blob(chunks, { type: 'video/webm' })); cancelAnimationFrame(raf); recorder.stop() }) }
}

// ==================================================
// RED BALL
// ==================================================
const RedBall = ({ isSpeaking = false }) => (
  <div style={styles.ballContainer}>
    <div style={styles.ring1} /><div style={styles.ring2} /><div style={styles.ring3} />
    <div style={styles.ball3DContainer}>
      <div style={{ ...styles.ball3D, ...(isSpeaking ? styles.ball3DSpeaking : {}) }}>
        <div style={styles.ballHighlight} /><div style={styles.ballInnerGlow} />
      </div>
    </div>
  </div>
)

// ==================================================
// MAIN APP
// ==================================================
export default function App() {
  const [userMode, setUserMode] = useState('guest')
  const [email, setEmail] = useState(''); const [pin, setPin] = useState('')
  const [showLogin, setShowLogin] = useState(true); const [authError, setAuthError] = useState('')
  const [guestMessageCount, setGuestMessageCount] = useState(0); const [showGuestLimit, setShowGuestLimit] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [profile, setProfile] = useState(null)
  const [profileForm, setProfileForm] = useState({ name: '', username: '', avatar: '', bio: '' })
  const [editingProfile, setEditingProfile] = useState(false)
  const [isBooting, setIsBooting] = useState(true)
  const [bootTypedText, setBootTypedText] = useState(''); const [bootTypedCredit, setBootTypedCredit] = useState('')
  const [viewMode, setViewMode] = useState('android'); const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showWelcomeOverlay, setShowWelcomeOverlay] = useState(false); const [welcomeMessage, setWelcomeMessage] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [showPersonalityModal, setShowPersonalityModal] = useState(false)
  const [aiPersonality, setAiPersonality] = useState('polite'); const [customStyle, setCustomStyle] = useState(null)
  const [backgroundImage, setBackgroundImage] = useState(null)
  const [settings, setSettings] = useState({
    welcomeEnabled: true, autoStartVoice: true, voiceSpeed: 1, personality: 'polite',
    secretMode: false, overlayButton: false, safeLinks: true, autoScroll: true, haptic: true,
    soundFx: false, showTimestamps: true, typingIndicator: true, readAloud: false,
    highContrast: false, compactMode: false, codeAutoOverview: true, confirmDelete: true,
  })
  const [showChatOverview, setShowChatOverview] = useState(false)
  const [chatOverviewInput, setChatOverviewInput] = useState(''); const [chatOverviewListening, setChatOverviewListening] = useState(false)
  const [chatOverviewVoiceEnabled, setChatOverviewVoiceEnabled] = useState(true)
  const [isRecordingVoice, setIsRecordingVoice] = useState(false); const [voicePaused, setVoicePaused] = useState(false)
  const [voiceTranscript, setVoiceTranscript] = useState(''); const chatOverviewRecognitionRef = useRef(null)
  const [showRotateOverlay, setShowRotateOverlay] = useState(false)
  const [conversation, setConversation] = useState([]); const [inputText, setInputText] = useState('')
  const [commandHistory, setCommandHistory] = useState([])
  const [isCallActive, setIsCallActive] = useState(false); const [isFullscreenCall, setIsFullscreenCall] = useState(false)
  const [isListening, setIsListening] = useState(false); const [isProcessing, setIsProcessing] = useState(false)
  const [isRecording, setIsRecording] = useState(false); const [isAISpeaking, setIsAISpeaking] = useState(false)
  const [interimTranscript, setInterimTranscript] = useState(''); const [recordingMode, setRecordingMode] = useState(false)
  const [voiceGender, setVoiceGender] = useState('female')
  const [stats, setStats] = useState({ uptime: 0, cpuUsage: 0, cpuTemp: 0, ramUsage: 0, networkSpeed: 0 })
  const [overlayActive, setOverlayActive] = useState(false); const [overlayListening, setOverlayListening] = useState(false)
  const overlayRecognitionRef = useRef(null)
  const [pendingCode, setPendingCode] = useState(null); const [copiedId, setCopiedId] = useState(null)
  const [replyingTo, setReplyingTo] = useState(null)
  const [showMusicPanel, setShowMusicPanel] = useState(false)
  const [musicDesc, setMusicDesc] = useState(''); const [musicDuration, setMusicDuration] = useState(10)
  const [musicQuality, setMusicQuality] = useState('high'); const [musicPlaying, setMusicPlaying] = useState(false)
  const [musicInfo, setMusicInfo] = useState(''); const [musicDownloadUrl, setMusicDownloadUrl] = useState(null)
  const [musicGenerating, setMusicGenerating] = useState(false)
  const [showVideoPanel, setShowVideoPanel] = useState(false)
  const [videoDesc, setVideoDesc] = useState(''); const [videoDuration, setVideoDuration] = useState(5)
  const [videoQuality, setVideoQuality] = useState('high'); const [videoRecording, setVideoRecording] = useState(false)
  const [videoProgress, setVideoProgress] = useState(0); const [videoInfo, setVideoInfo] = useState('')
  const canvasRef = useRef(null); const videoRecorderRef = useRef(null)
  const [showCyberLab, setShowCyberLab] = useState(false); const [cyberTab, setCyberTab] = useState('terminal')
  const [cyberInput, setCyberInput] = useState(''); const [cyberLines, setCyberLines] = useState([
    { type: 'info', text: 'CYPHER4X Cyber Lab — Educational Security Toolkit' },
    { type: 'info', text: '⚠️ For learning only. Only test systems you own.' },
    { type: 'info', text: 'Type "help" for commands.' },
  ])
  const [cyberToolOutput, setCyberToolOutput] = useState(''); const [cyberTool, setCyberTool] = useState('passcheck')
  const [cyberToolInput, setCyberToolInput] = useState(''); const [ctfChallenge, setCtfChallenge] = useState(null)
  const cyberEndRef = useRef(null)
  const synthRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null)
  const recognitionRef = useRef(null); const msgCounter = useRef(0)
  const fileInputRef = useRef(null); const bgInputRef = useRef(null); const chatEndRef = useRef(null)

  const playBeep = useCallback((f = 800, d = 0.08) => {
    if (!settings.soundFx) return
    try { const C = window.AudioContext || window.webkitAudioContext; if (!C) return; const c = new C(); const o = c.createOscillator(); const g = c.createGain(); o.frequency.value = f; o.type = 'sine'; g.gain.setValueAtTime(0.1, c.currentTime); g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + d); o.connect(g).connect(c.destination); o.start(); o.stop(c.currentTime + d) } catch {}
  }, [settings.soundFx])
  const vibrate = useCallback((p = 10) => { if (!settings.haptic) return; try { navigator.vibrate && navigator.vibrate(p) } catch {} }, [settings.haptic])

  useEffect(() => {
    if (!isBooting) return
    const title = 'CYPHER4X', credit = 'Created by Hackers Hub led by Crypty'
    let ti = 0, ci = 0, phase = 'title'
    const iv = setInterval(() => {
      if (phase === 'title') {
        if (ti <= title.length) { setBootTypedText(title.slice(0, ti)); ti++ }
        else { phase = 'pause'; setTimeout(() => { phase = 'credit' }, 500) }
      } else if (phase === 'credit') {
        if (ci <= credit.length) { setBootTypedCredit(credit.slice(0, ci)); ci++ }
        else {
          clearInterval(iv)
          setTimeout(() => {
            setIsBooting(false)
            const a = getAuth()
            if (a && userExists(a.email, a.pin)) { setEmail(a.email); setPin(a.pin); loginUser(a.email, a.pin) }
            else {
              setUserMode('guest'); setGuestMessageCount(0)
              const sp = localStorage.getItem('cypher4x_personality')
              if (!sp) setShowPersonalityModal(true); else setAiPersonality(sp)
              if (settings.welcomeEnabled) {
                const t = new Date().toDateString(), lw = localStorage.getItem('cypher4x_welcome_date')
                if (lw !== t) { localStorage.setItem('cypher4x_welcome_date', t); setShowWelcomeOverlay(true); const m = "Hello! I'm CYPHER4X, your AI assistant."; setWelcomeMessage(m); speakText(m) }
              }
            }
          }, 800)
        }
      }
    }, 100)
    return () => clearInterval(iv)
  }, [isBooting, settings.welcomeEnabled])

  useEffect(() => { if (settings.autoScroll && showChatOverview) chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [conversation, showChatOverview, settings.autoScroll])
  useEffect(() => { cyberEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [cyberLines])

  const handleAuthSubmit = () => {
    if (!email || !pin || pin.length !== 4 || !/^\d{4}$/.test(pin)) { setAuthError('Valid email + 4-digit PIN required.'); return }
    if (showLogin) { if (userExists(email, pin)) { loginUser(email, pin); setShowAuthModal(false) } else setAuthError('No account found.') }
    else {
      if (userExists(email, pin)) { setAuthError('Account exists.'); return }
      addUser(email, pin)
      saveUserData(email, pin, { profile: null, conversation: [], commandHistory: [], personality: 'polite', backgroundImage: null, customStyle: null, settings })
      loginUser(email, pin); setShowAuthModal(false)
    }
  }
  const loginUser = (e, p) => { saveAuth(e, p); setUserMode('loggedin'); loadUserDataByEmail(e, p); setAuthError(''); setGuestMessageCount(0) }
  const loadUserDataByEmail = (e, p) => {
    const d = loadUserData(e, p)
    if (d) {
      setProfile(d.profile || null); setConversation(d.conversation || []); setCommandHistory(d.commandHistory || [])
      setAiPersonality(d.personality || 'polite'); setBackgroundImage(d.backgroundImage || null)
      if (d.customStyle) setCustomStyle(d.customStyle)
      if (d.settings) setSettings({ ...settings, ...d.settings })
      msgCounter.current = (d.conversation || []).length + 1
    }
  }
  const saveCurrentUserData = () => {
    if (userMode !== 'loggedin') return
    saveUserData(email, pin, { profile, conversation, commandHistory, personality: aiPersonality, backgroundImage, customStyle, settings })
  }
  useEffect(() => { if (userMode === 'loggedin') saveCurrentUserData() }, [profile, conversation, commandHistory, aiPersonality, backgroundImage, customStyle, settings])
  useEffect(() => { if (aiPersonality === 'custom' && conversation.length > 3) { const s = analyzeUserStyle(conversation); if (s) setCustomStyle(s) } }, [conversation, aiPersonality])

  const handleLogout = () => {
    if (!confirm('Logout?')) return
    clearAuth(); setUserMode('guest'); setProfile(null); setConversation([]); setCommandHistory([])
    setSidebarOpen(false); setGuestMessageCount(0); setShowWelcomeOverlay(false); setShowAuthModal(false); msgCounter.current = 0
  }
  const incrementGuestMessage = () => { if (userMode !== 'guest') return; const n = guestMessageCount + 1; setGuestMessageCount(n); if (n >= 5) setShowGuestLimit(true) }

  const speakText = useCallback((text, onEnd = null) => {
    if (!text || !synthRef.current) return
    try {
      synthRef.current.cancel()
      const u = new SpeechSynthesisUtterance(text.replace(/[*_`#]/g, ''))
      u.rate = settings.voiceSpeed || 1; u.pitch = voiceGender === 'female' ? 1.3 : 1.0
      u.onstart = () => setIsAISpeaking(true)
      u.onend = () => { setIsAISpeaking(false); if (onEnd) onEnd() }
      u.onerror = () => { setIsAISpeaking(false); if (onEnd) onEnd() }
      synthRef.current.speak(u)
    } catch { setIsAISpeaking(false); if (onEnd) onEnd() }
  }, [voiceGender, settings.voiceSpeed])

  const setupSpeechRecognition = useCallback((isOneOff = false, onFinal = null) => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) { alert('Speech not supported.'); return null }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    const r = new SR(); r.continuous = !isOneOff; r.interimResults = true; r.lang = 'en-US'
    r.onstart = () => { setIsListening(true); setInterimTranscript('') }
    r.onend = () => { setIsListening(false); setInterimTranscript(''); if (!isOneOff && isFullscreenCall) try { r.start() } catch {} }
    r.onerror = (e) => { if (e.error === 'not-allowed') { alert('Allow mic.'); setIsFullscreenCall(false); setIsCallActive(false); setRecordingMode(false); setIsListening(false); return } if (!isOneOff && isFullscreenCall) setTimeout(() => { try { r.start() } catch {} }, 500) }
    r.onresult = async (e) => {
      let f = '', i = ''
      for (let k = e.resultIndex; k < e.results.length; k++) { const res = e.results[k]; if (res.isFinal) f += res[0].transcript; else i += res[0].transcript }
      if (f) { setInterimTranscript(''); setRecordingMode(false); if (onFinal) onFinal(f); else await processUserQuery(f) }
      else if (i) setInterimTranscript(i)
    }
    return r
  }, [isFullscreenCall])

  const executeCommand = (q) => {
    const l = q.toLowerCase().trim()
    if (l.includes('whatsapp business')) { const g = q.match(/group(?:\s+named)?\s+(.+)/i); if (g) return { response: openWhatsAppGroup(g[1].trim()) }; return { response: openApp('whatsappbusiness') } }
    const wg = l.match(/(?:open\s+)?(?:my\s+)?whatsapp.*group(?:\s+named)?\s+(.+)/i); if (wg) return { response: openWhatsAppGroup(wg[1].trim()) }
    const am = l.match(/^open\s+(?:my\s+)?(whatsapp|instagram|facebook|telegram|youtube|spotify|gmail|maps|github)(?:\s+(?:on\s+my\s+device)?)?(?:\s+and\s+open\s+my\s+group\s+named\s+(.+))?$/i)
    if (am) { const k = am[1], g = am[2]; if (k === 'whatsapp' && g) return { response: openWhatsAppGroup(g) }; return { response: openApp(k) } }
    if ((l.startsWith('secret ') || l.startsWith('anonymous ')) && settings.secretMode) { const t = q.replace(/^(secret|anonymous)\s+/i, ''); openAnonymous(t); return { response: `Anonymous search: "${t}" 🔒` } }
    if (l.startsWith('web ') || l.startsWith('search web ')) { const t = q.replace(/^(web|search web)\s+/i, ''); openAnonymous(t); return { response: `Searching "${t}"...` } }
    if (l.startsWith('play ')) { const s = l.replace('play ', '').trim(); window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(s)}`, '_blank'); return { response: `Playing "${s}"! 🎵` } }
    if (l === 'time' || l.includes('what time')) return { response: `Time: ${new Date().toLocaleTimeString()} ⏰` }
    if (l === 'date' || l.includes('what date') || l === 'today') return { response: `Today is ${new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} 📅` }
    if (l.startsWith('calc ') || l.includes('calculate')) { try { const e = l.replace('calculate','').replace('calc','').trim(); const r = Function(`"use strict"; return (${e})`)(); if (typeof r === 'number') return { response: `Answer: ${r} 🧮` } } catch {} }
    return null
  }

  const processUserQuery = useCallback(async (query) => {
    if (!query || isProcessing) return
    if (userMode === 'guest') incrementGuestMessage()
    setIsProcessing(true); setInterimTranscript(''); setRecordingMode(false)
    vibrate(15); playBeep(700, 0.06)

    const userMsg = { id: ++msgCounter.current, role: 'user', content: query, time: Date.now(), replyTo: replyingTo?.id || null, replyToText: replyingTo?.content?.slice(0, 80) || null }
    setConversation(prev => [...prev, userMsg])
    setCommandHistory(prev => [...prev, { command: query, timestamp: Date.now() }])
    setReplyingTo(null)

    if (pendingCode) {
      const next = { ...pendingCode.answers, [pendingCode.step]: query }
      const idx = ['language','purpose','detail'].findIndex(k => !next[k])
      if (idx === -1) {
        const code = generateLongCode(next.language, next.purpose, next.detail)
        const styled = applyPersonality(code, aiPersonality, customStyle)
        setConversation(prev => [...prev, { id: ++msgCounter.current, role: 'assistant', content: styled, time: Date.now() }])
        setPendingCode(null)
        if (settings.codeAutoOverview) setShowChatOverview(true)
      } else {
        const nk = ['language','purpose','detail'][idx]
        setPendingCode({ step: nk, answers: next })
        const qs = { language: 'What programming language? (JavaScript, Python, React, etc.)', purpose: 'What should the code do?', detail: 'Any extra details? (dark theme, localStorage, etc.)' }
        const q = qs[nk]
        setConversation(prev => [...prev, { id: ++msgCounter.current, role: 'assistant', content: q, time: Date.now() }])
        if (settings.readAloud || settings.autoStartVoice) speakText(q)
      }
      setIsProcessing(false); return
    }

    if (isCodeRequest(query)) {
      const lang = detectLanguage(query)
      const m = { id: ++msgCounter.current, role: 'assistant', content: `I'll write code for you! 🎨\n\n**Q1 — What programming language?**\n\n_Detected: **${lang}**. Reply "auto" to use it, or say another._`, time: Date.now() }
      setConversation(prev => [...prev, m])
      setPendingCode({ step: 'language', answers: { language: null }, detected: { language: lang } })
      if (settings.readAloud || settings.autoStartVoice) speakText('I will ask three questions to generate your code.')
      setIsProcessing(false); return
    }

    const cmd = executeCommand(query)
    if (cmd) {
      const styled = applyPersonality(cmd.response, aiPersonality, customStyle)
      setConversation(prev => [...prev, { id: ++msgCounter.current, role: 'assistant', content: styled, time: Date.now() }])
      if (settings.readAloud) speakText(styled)
      setIsProcessing(false); return
    }

    const lower = query.toLowerCase().trim()
    for (const k of KNOWLEDGE) {
      if (k.match.test(query)) {
        const styled = applyPersonality(k.answer, aiPersonality, customStyle)
        setConversation(prev => [...prev, { id: ++msgCounter.current, role: 'assistant', content: styled, time: Date.now() }])
        if (settings.readAloud) speakText(styled.slice(0, 300))
        playBeep(500, 0.08); vibrate(10)
        setIsProcessing(false); return
      }
    }

    if (isPureGreeting(query)) {
      const g = applyPersonality('Hey there! 👋 How can I help you today?', aiPersonality, customStyle)
      setConversation(prev => [...prev, { id: ++msgCounter.current, role: 'assistant', content: g, time: Date.now() }])
      if (settings.readAloud) speakText(g)
      setIsProcessing(false); return
    }

    const result = await searchWeb(query)
    let reply = result.error ? `Search error: ${result.error}` : (result.answer || "I couldn't find a clear answer. Try rephrasing or ask me something specific like 'explain machine learning' or 'how to learn Python'.")
    if (!result.error && result.safestUrl && settings.safeLinks) reply += `\n\n🔗 Source: ${result.safestUrl}`
    reply = applyPersonality(reply, aiPersonality, customStyle)
    setConversation(prev => [...prev, { id: ++msgCounter.current, role: 'assistant', content: reply, time: Date.now() }])
    if (settings.readAloud) speakText(reply.replace(/🔗.*$/s, ''))
    playBeep(500, 0.08); vibrate(10)
    setIsProcessing(false)
  }, [isProcessing, userMode, aiPersonality, customStyle, settings, pendingCode, replyingTo, vibrate, playBeep])

  const setupOverviewRecognition = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) return null
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    const r = new SR(); r.continuous = false; r.interimResults = true; r.lang = 'en-US'
    r.onstart = () => { setChatOverviewListening(true); setIsRecordingVoice(true); setVoicePaused(false); setVoiceTranscript('') }
    r.onend = () => { setChatOverviewListening(false); setIsRecordingVoice(false) }
    r.onerror = () => { setChatOverviewListening(false); setIsRecordingVoice(false) }
    r.onresult = (e) => { let f = '', i = ''; for (let k = e.resultIndex; k < e.results.length; k++) { const r2 = e.results[k]; if (r2.isFinal) f += r2[0].transcript; else i += r2[0].transcript } if (f) setVoiceTranscript(f); else if (i) setVoiceTranscript(i) }
    return r
  }, [])
  const startVoiceRecording = useCallback(() => { if (isRecordingVoice || chatOverviewListening) return; if (!chatOverviewRecognitionRef.current) chatOverviewRecognitionRef.current = setupOverviewRecognition(); if (chatOverviewRecognitionRef.current) { try { chatOverviewRecognitionRef.current.start(); setVoiceTranscript('') } catch {} } }, [isRecordingVoice, chatOverviewListening, setupOverviewRecognition])
  const pauseVoiceRecording = useCallback(() => { if (chatOverviewRecognitionRef.current && chatOverviewListening) { try { chatOverviewRecognitionRef.current.stop(); setVoicePaused(true); setChatOverviewListening(false); setIsRecordingVoice(false) } catch {} } }, [chatOverviewListening])
  const resumeVoiceRecording = useCallback(() => { if (voicePaused && chatOverviewRecognitionRef.current) { try { chatOverviewRecognitionRef.current.start(); setVoicePaused(false); setChatOverviewListening(true); setIsRecordingVoice(true) } catch {} } }, [voicePaused])
  const deleteVoiceRecording = useCallback(() => { if (chatOverviewRecognitionRef.current) { try { chatOverviewRecognitionRef.current.stop() } catch {} } setVoiceTranscript(''); setChatOverviewListening(false); setIsRecordingVoice(false); setVoicePaused(false) }, [])
  const sendVoiceRecording = useCallback(() => { const t = voiceTranscript.trim(); if (!t || isProcessing) return; setVoiceTranscript(''); setChatOverviewListening(false); setIsRecordingVoice(false); setVoicePaused(false); if (chatOverviewRecognitionRef.current) { try { chatOverviewRecognitionRef.current.stop() } catch {} } processUserQuery(t) }, [voiceTranscript, isProcessing, processUserQuery])
  useEffect(() => { if (voiceTranscript && !chatOverviewListening) setChatOverviewInput(voiceTranscript) }, [voiceTranscript, chatOverviewListening])
  const sendOverviewText = useCallback(() => { const t = chatOverviewInput.trim(); if (!t || isProcessing) return; setChatOverviewInput(''); processUserQuery(t) }, [chatOverviewInput, isProcessing, processUserQuery])

  const handleOverviewFileShare = useCallback((e) => {
    const files = e.target.files; if (!files || !files[0]) return
    const f = files[0]; if (f.size > 20 * 1024 * 1024) { alert('Max 20MB'); return }
    const rd = new FileReader()
    rd.onloadend = () => {
      setConversation(prev => [...prev, { id: ++msgCounter.current, role: 'user', content: `📎 ${f.name}`, time: Date.now(), file: { name: f.name, type: f.type, data: rd.result, size: f.size } }])
      setConversation(prev => [...prev, { id: ++msgCounter.current, role: 'assistant', content: `Received: **${f.name}** (${(f.size/1024).toFixed(1)} KB).`, time: Date.now() }])
    }
    rd.readAsDataURL(f); e.target.value = ''
  }, [])
  const handleEditMessage = useCallback((id) => { const msg = conversation.find(m => m.id === id); if (!msg || msg.role !== 'user') return; const nc = prompt('Edit:', msg.content); if (nc !== null && nc.trim()) setConversation(prev => prev.map(m => m.id === id ? { ...m, content: nc.trim() } : m)) }, [conversation])
  const handleDeleteMessage = useCallback((id) => { if (settings.confirmDelete && !confirm('Delete?')) return; setConversation(prev => prev.filter(m => m.id !== id)) }, [settings.confirmDelete])
  const handleShareMessage = useCallback(async (msg) => { const c = msg.content; if (navigator.share) { try { await navigator.share({ title: 'CYPHER4X', text: c }) } catch {} } else { try { await navigator.clipboard.writeText(c); alert('Copied!') } catch {} } }, [])
  const copyCode = async (code, id) => { try { await navigator.clipboard.writeText(code); setCopiedId(id); setTimeout(() => setCopiedId(null), 1500); vibrate(20) } catch {} }
  const handleReply = (msg) => { setReplyingTo({ id: msg.id, content: msg.content }); setShowChatOverview(true) }

  const renderMessageContent = (msg) => {
    const c = msg.content
    const rx = /```(\w+)?\n([\s\S]*?)```/g
    const parts = []; let last = 0, m, idx = 0
    while ((m = rx.exec(c)) !== null) {
      if (m.index > last) parts.push({ type: 'text', value: c.slice(last, m.index) })
      parts.push({ type: 'code', lang: m[1] || 'text', value: m[2], key: `${msg.id}-${idx++}` })
      last = m.index + m[0].length
    }
    if (last < c.length) parts.push({ type: 'text', value: c.slice(last) })
    if (!parts.length) parts.push({ type: 'text', value: c })
    return parts.map((p, i) => p.type === 'code' ? (
      <div key={p.key || i} style={styles.codeBlockWrap}>
        <div style={styles.codeBlockHeader}>
          <span style={styles.codeLang}>{p.lang}</span>
          <button onClick={() => copyCode(p.value, p.key)} style={styles.codeCopyBtn}>
            <Icon name={copiedId === p.key ? 'check' : 'copy'} size={14} color="#fff" /><span>{copiedId === p.key ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
        <pre style={styles.codeBlock}>{p.value}</pre>
      </div>
    ) : <span key={i} style={styles.chatOverviewMsgText}>{p.value}</span>)
  }

  const toggleFullscreenCall = useCallback(() => {
    if (isFullscreenCall) { setIsFullscreenCall(false); setIsCallActive(false); if (recognitionRef.current) try { recognitionRef.current.stop() } catch {}; setIsListening(false); setInterimTranscript(''); synthRef.current?.cancel(); setIsAISpeaking(false) }
    else {
      setIsFullscreenCall(true); setIsCallActive(true)
      if (!recognitionRef.current) recognitionRef.current = setupSpeechRecognition(false, (t) => processUserQuery(t))
      if (recognitionRef.current) { try { recognitionRef.current.start(); speakText("I'm listening.") } catch {} }
    }
  }, [isFullscreenCall, setupSpeechRecognition, speakText, processUserQuery])
  const interruptAndListen = useCallback(() => { synthRef.current?.cancel(); setIsAISpeaking(false); if (recognitionRef.current) try { recognitionRef.current.start() } catch {} }, [])
  const startRecording = useCallback(() => {
    if (isRecording || isProcessing || isFullscreenCall) return
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) { alert('Speech not supported.'); return }
    setRecordingMode(true); vibrate(30)
    const r = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
    r.continuous = false; r.interimResults = true; r.lang = 'en-US'
    r.onstart = () => { setIsRecording(true); setIsListening(true); setInterimTranscript('') }
    r.onend = () => { setIsRecording(false); setIsListening(false) }
    r.onerror = (e) => { setIsRecording(false); setRecordingMode(false); setIsListening(false); if (e.error === 'not-allowed') alert('Allow mic.'); else alert('Error: ' + e.error) }
    r.onresult = async (e) => { let f = '', i = ''; for (let k = e.resultIndex; k < e.results.length; k++) { const res = e.results[k]; if (res.isFinal) f += res[0].transcript; else i += res[0].transcript } if (f) { setInterimTranscript(''); setRecordingMode(false); await processUserQuery(f) } else if (i) setInterimTranscript(i) }
    recognitionRef.current = r
    try { r.start() } catch (e) { alert('Failed: ' + e.message); setRecordingMode(false) }
  }, [isRecording, isProcessing, isFullscreenCall, processUserQuery, vibrate])
  const sendInterim = useCallback(() => { if (!interimTranscript.trim() || isProcessing) return; const t = interimTranscript.trim(); setInterimTranscript(''); setRecordingMode(false); if (recognitionRef.current) try { recognitionRef.current.stop() } catch {}; processUserQuery(t) }, [interimTranscript, isProcessing, processUserQuery])
  const cancelRecording = useCallback(() => { setInterimTranscript(''); setRecordingMode(false); setIsRecording(false); setIsListening(false); if (recognitionRef.current) try { recognitionRef.current.stop() } catch {} }, [])
  const sendTextMessage = useCallback(() => { const t = inputText.trim(); if (!t || isProcessing) return; setInputText(''); processUserQuery(t) }, [inputText, isProcessing, processUserQuery])

  const handlePersonalitySelect = (id) => {
    setAiPersonality(id); setSettings({ ...settings, personality: id }); localStorage.setItem('cypher4x_personality', id); setShowPersonalityModal(false)
    if (settings.welcomeEnabled) { const t = new Date().toDateString(), lw = localStorage.getItem('cypher4x_welcome_date'); if (lw !== t) { localStorage.setItem('cypher4x_welcome_date', t); setShowWelcomeOverlay(true); const m = "Hello! I'm CYPHER4X."; setWelcomeMessage(m); speakText(m) } }
  }

  const handleBackgroundChange = (e) => {
    const f = e.target.files[0]; if (!f) return
    if (!f.type.startsWith('image/')) { alert('Image only'); return }
    if (f.size > 5 * 1024 * 1024) { alert('Max 5MB'); return }
    const rd = new FileReader(); rd.onloadend = () => setBackgroundImage(rd.result); rd.readAsDataURL(f)
  }
  const resetBackground = () => { setBackgroundImage(null); if (bgInputRef.current) bgInputRef.current.value = '' }
  const toggleView = useCallback(() => { setViewMode(p => { const n = p === 'android' ? 'pc' : 'android'; if (n === 'pc') setShowRotateOverlay(true); return n }); setSidebarOpen(false) }, [])
  const toggleOverlay = () => {
    const s = !overlayActive; setOverlayActive(s)
    if (s) {
      if (!overlayRecognitionRef.current) {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) { setOverlayActive(false); return }
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition
        const rec = new SR(); rec.continuous = false; rec.interimResults = false; rec.lang = 'en-US'
        rec.onstart = () => setOverlayListening(true); rec.onend = () => setOverlayListening(false); rec.onerror = () => setOverlayListening(false)
        rec.onresult = (e) => { const t = e.results[0][0].transcript; setOverlayActive(false); processUserQuery(t) }
        overlayRecognitionRef.current = rec
      }
      try { overlayRecognitionRef.current.start() } catch {}
    } else { try { overlayRecognitionRef.current?.stop() } catch {}; setOverlayListening(false) }
  }

  useEffect(() => {
    const t = setInterval(() => {
      setStats(p => ({ ...p, uptime: Math.floor((Date.now() - APP_START_TIME)/1000), cpuUsage: Math.floor(Math.random()*30)+10, cpuTemp: Math.floor(Math.random()*20)+55, ramUsage: Math.floor(Math.random()*4)+3.5, networkSpeed: (Math.random()*5+0.5).toFixed(2) }))
    }, 3000)
    return () => clearInterval(t)
  }, [])

  const handleGenerateMusic = async () => {
    try {
      setMusicGenerating(true); setMusicInfo('Composing...'); setMusicDownloadUrl(null)
      const style = guessMusicStyle(musicDesc)
      setMusicInfo(`Style: ${style.name} • ${style.mood} • ${style.bpm} BPM • ${musicDuration}s`)
      await generateAndPlayMusic(style, musicDuration, musicQuality, ({ url }) => {
        setMusicDownloadUrl(url); setMusicPlaying(true)
        setTimeout(() => setMusicPlaying(false), musicDuration * 1000 + 500)
      })
      setMusicGenerating(false)
    } catch (e) { alert('Music error: ' + e.message); setMusicGenerating(false) }
  }

  const handleStartVideo = async () => {
    if (!canvasRef.current) return
    const style = guessVideoStyle(videoDesc)
    setVideoInfo(`Style: ${style.label} • ${videoDuration}s • ${videoQuality}`)
    setVideoRecording(true)
    const rec = startCanvasVideo(canvasRef.current, style, videoDesc, profile?.name || 'CYPHER4X', (t) => setVideoProgress(Math.floor((t % 1) * 100)))
    videoRecorderRef.current = rec
    setTimeout(async () => {
      if (!videoRecorderRef.current) return
      const blob = await videoRecorderRef.current.stop()
      videoRecorderRef.current = null; setVideoRecording(false)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a'); a.href = url; a.download = `cypher4x_video_${Date.now()}.webm`; a.click()
      URL.revokeObjectURL(url)
    }, videoDuration * 1000)
  }

  const runCyberCommand = async (cmd) => {
    const parts = cmd.trim().split(/\s+/); const base = parts[0]?.toLowerCase(); const args = parts.slice(1).join(' ')
    let out = ''
    try {
      switch (base) {
        case 'help': out = 'Commands: help, about, ethics, clear, hash <text>, base64 <text>, unbase64 <text>, hex <text>, rot13 <text>, dns <domain>, ip <addr>, whois <domain>, portscan <host>, passcheck <pw>, ctf, ctfcheck <answer>'; break
        case 'about': out = 'CYPHER4X Cyber Lab — educational security toolkit. Networking, crypto basics, password security, CTF challenges. NOT real pentesting.'; break
        case 'ethics': out = '🔒 Ethical reminder:\n1. Only test systems you own or have permission for.\n2. Unauthorized access is illegal.\n3. Learn defense. Become white-hat.\n4. Report responsibly.\n5. Education only.'; break
        case 'clear': setCyberLines([{ type: 'info', text: 'Cleared.' }]); return
        case 'hash': {
          if (!args) { out = 'Usage: hash <text>'; break }
          const buf = new TextEncoder().encode(args)
          const h = await crypto.subtle.digest('SHA-256', buf)
          out = Array.from(new Uint8Array(h)).map(b => b.toString(16).padStart(2, '0')).join('')
          break
        }
        case 'base64': out = (() => { try { return btoa(args) } catch { return 'Invalid' } })(); break
        case 'unbase64': out = (() => { try { return atob(args) } catch { return 'Invalid B64' } })(); break
        case 'hex': out = Array.from(new TextEncoder().encode(args)).map(b => b.toString(16).padStart(2, '0')).join(' '); break
        case 'rot13': out = args.replace(/[a-zA-Z]/g, c => String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26)); break
        case 'dns': {
          if (!args) { out = 'Usage: dns <domain>'; break }
          const r = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(args)}&type=A`)
          const d = await r.json()
          out = d.Answer ? d.Answer.map(a => `A  ${a.data}  TTL ${a.TTL}`).join('\n') : 'No records'
          break
        }
        case 'ip': {
          if (!args) { out = 'Usage: ip <address>'; break }
          const r = await fetch(`https://ipapi.co/${encodeURIComponent(args)}/json/`)
          const d = await r.json()
          out = `IP: ${d.ip}\nCity: ${d.city}\nRegion: ${d.region}\nCountry: ${d.country_name}\nISP: ${d.org}\nTZ: ${d.timezone}`
          break
        }
        case 'whois': out = `WHOIS needs a backend. Try:\nhttps://who.is/whois/${encodeURIComponent(args)}`; break
        case 'portscan': {
          if (!args) { out = 'Usage: portscan <host>'; break }
          const open = [80, 443].filter(() => Math.random() > 0.3)
          out = `⚠️ SIMULATION ONLY\n\nTarget: ${args}\nOPEN: ${open.join(', ') || 'none'}\nCLOSED: ${15 - open.length}`
          break
        }
        case 'passcheck': {
          if (!args) { out = 'Usage: passcheck <password>'; break }
          let s = 0
          const c = { len: args.length >= 12, low: /[a-z]/.test(args), up: /[A-Z]/.test(args), dig: /\d/.test(args), sp: /[^A-Za-z0-9]/.test(args), ok: !/^(password|123456|qwerty)/i.test(args) }
          s = Object.values(c).filter(Boolean).length
          out = `Score ${s}/6\nEntropy ~${(args.length * Math.log2(new Set(args).size || 1)).toFixed(1)} bits\n${s >= 5 ? '🟢 Strong' : s >= 3 ? '🟡 Medium' : '🔴 Weak'}`
          break
        }
        case 'ctf': {
          const challenges = [
            { q: 'ROT13 of "Uryyb" is?', a: 'hello' },
            { q: 'Base64 "aGVsbG8=" decodes to?', a: 'hello' },
            { q: 'DNS stands for?', a: 'domain name system' },
            { q: 'HTTPS port?', a: '443' },
            { q: 'XSS stands for?', a: 'cross-site scripting' },
          ]
          const ch = challenges[Math.floor(Math.random() * challenges.length)]
          setCtfChallenge(ch); out = `🎯 ${ch.q}\n\nType "ctfcheck <answer>"`; break
        }
        case 'ctfcheck':
          if (!ctfChallenge) { out = 'No active CTF.'; break }
          out = args.toLowerCase().trim() === ctfChallenge.a.toLowerCase() ? '✅ Correct!' : `❌ Answer: ${ctfChallenge.a}`
          setCtfChallenge(null); break
        default: out = `Unknown: ${base}. Try "help".`
      }
    } catch (e) { out = 'Error: ' + e.message }
    setCyberLines(prev => [...prev, { type: 'cmd', text: `$ ${cmd}` }, { type: 'out', text: out }])
  }
  const handleCyberSubmit = (e) => { e.preventDefault(); if (!cyberInput.trim()) return; runCyberCommand(cyberInput); setCyberInput('') }

  const runCyberTool = async () => {
    let out = ''
    try {
      switch (cyberTool) {
        case 'passcheck': {
          const pw = cyberToolInput; if (!pw) { out = 'Enter a password'; break }
          let s = 0; const c = { len: pw.length >= 12, low: /[a-z]/.test(pw), up: /[A-Z]/.test(pw), dig: /\d/.test(pw), sp: /[^A-Za-z0-9]/.test(pw), ok: !/^(password|123456)/i.test(pw) }
          s = Object.values(c).filter(Boolean).length
          out = `Score ${s}/6\nEntropy ~${(pw.length * Math.log2(new Set(pw).size || 1)).toFixed(1)} bits\n${s >= 5 ? '🟢 Strong' : s >= 3 ? '🟡 Medium' : '🔴 Weak'}`
          break
        }
        case 'hash': {
          const b = new TextEncoder().encode(cyberToolInput); const h = await crypto.subtle.digest('SHA-256', b)
          out = Array.from(new Uint8Array(h)).map(x => x.toString(16).padStart(2, '0')).join(''); break
        }
        case 'base64': out = (() => { try { return btoa(cyberToolInput) } catch { return 'Invalid' } })(); break
        case 'unbase64': out = (() => { try { return atob(cyberToolInput) } catch { return 'Invalid' } })(); break
        case 'hex': out = Array.from(new TextEncoder().encode(cyberToolInput)).map(b => b.toString(16).padStart(2, '0')).join(' '); break
        case 'rot13': out = cyberToolInput.replace(/[a-zA-Z]/g, c => String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26)); break
        case 'dns': {
          const r = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(cyberToolInput)}&type=A`)
          const d = await r.json(); out = d.Answer ? d.Answer.map(a => `A  ${a.data}  TTL ${a.TTL}`).join('\n') : 'No records'; break
        }
        case 'ip': {
          const r = await fetch(`https://ipapi.co/${encodeURIComponent(cyberToolInput)}/json/`)
          const d = await r.json(); out = `IP: ${d.ip}\nCity: ${d.city}\nCountry: ${d.country_name}\nISP: ${d.org}`; break
        }
        case 'portscan': {
          const open = [80, 443].filter(() => Math.random() > 0.3)
          out = `⚠️ SIMULATION\nTarget: ${cyberToolInput}\nOPEN: ${open.join(', ') || 'none'}`
          break
        }
        default: out = 'Unknown tool'
      }
    } catch (e) { out = 'Error: ' + e.message }
    setCyberToolOutput(out)
  }

  const handleAvatarChange = useCallback((e) => { const f = e.target.files[0]; if (!f) return; if (!f.type.startsWith('image/')) return alert('Image only'); const rd = new FileReader(); rd.onloadend = () => setProfileForm(p => ({ ...p, avatar: rd.result })); rd.readAsDataURL(f) }, [])
  const saveProfile = useCallback(() => { if (!profileForm.name.trim() || !profileForm.username.trim()) { alert('Name & Username required'); return } const np = { ...profileForm, username: profileForm.username.toLowerCase().replace(/[^a-z0-9_]/g, ''), updatedAt: new Date().toISOString() }; setProfile(np); setEditingProfile(false); speakText(`Updated, ${np.name}!`) }, [profileForm, speakText])
  const openEditProfile = useCallback(() => { setProfileForm({ name: profile?.name || '', username: profile?.username || '', avatar: profile?.avatar || '', bio: profile?.bio || '' }); setEditingProfile(true); setSidebarOpen(false) }, [profile])
  const resetAllData = useCallback(() => { if (!confirm('Reset ALL data?')) return; if (userMode === 'loggedin') saveUserData(email, pin, { profile: null, conversation: [], commandHistory: [], personality: 'polite', backgroundImage: null, customStyle: null, settings }); setProfile(null); setConversation([]); setCommandHistory([]); setBackgroundImage(null); setAiPersonality('polite'); setCustomStyle(null); setSidebarOpen(false) }, [userMode, email, pin, settings])
  const clearConversation = useCallback(() => setConversation([]), [])
  const clearCommands = useCallback(() => setCommandHistory([]), [])
  const exportChat = useCallback(() => { const d = { conversation, commandHistory, profile, exportedAt: new Date().toISOString() }; const b = new Blob([JSON.stringify(d, null, 2)], { type: 'application/json' }); const u = URL.createObjectURL(b); const a = document.createElement('a'); a.href = u; a.download = `cypher4x_${Date.now()}.json`; a.click(); URL.revokeObjectURL(u) }, [conversation, commandHistory, profile])

  const fmtU = (s) => `${Math.floor(s/3600).toString().padStart(2,'0')}:${Math.floor((s%3600)/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`
  const fmtT = (ts) => new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  // ============ RENDER ============
  if (isBooting) return (
    <div style={styles.bootContainer}><style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style><div style={styles.bootBackground} /><div style={styles.bootContent}><h1 style={styles.bootTitle}>{bootTypedText}<span style={styles.bootCursor}>|</span></h1><p style={styles.bootSubtitle}>Advanced AI System</p><div style={styles.bootCredit}>{bootTypedCredit}{bootTypedCredit.length > 0 && bootTypedCredit.length < 38 && <span style={styles.bootCursor}>|</span>}</div></div></div>
  )

  if (showPersonalityModal) return (
    <div style={styles.personalityOverlay}><div style={styles.personalityCard}><h1 style={styles.personalityTitle}>CYPHER4X</h1><p style={styles.personalitySubtitle}>Choose your AI personality</p><div style={styles.personalityGrid}>{PERSONALITIES.map(p => <button key={p.id} onClick={() => handlePersonalitySelect(p.id)} style={{ ...styles.personalityOption, borderColor: aiPersonality === p.id ? '#ff003c' : '#333', backgroundColor: aiPersonality === p.id ? 'rgba(255,0,60,0.15)' : '#1a1a1a' }}><span style={styles.personalityIcon}>{p.icon}</span><span style={styles.personalityLabel}>{p.label}</span><span style={styles.personalityDesc}>{p.desc}</span></button>)}</div></div></div>
  )

  if (showGuestLimit) return (
    <div style={styles.guestLimitOverlay}><div style={styles.guestLimitCard}><h2 style={styles.guestLimitTitle}>Free Trial Limit Reached</h2><p style={styles.guestLimitText}>You've used all 5 free messages. Login to continue.</p><div style={styles.guestLimitButtons}><button onClick={() => { setShowGuestLimit(false); setShowLogin(true); setShowAuthModal(true) }} style={styles.guestLimitLoginBtn}>Login</button><button onClick={() => { setShowGuestLimit(false); setShowLogin(false); setShowAuthModal(true) }} style={styles.guestLimitSignupBtn}>Sign Up</button></div></div></div>
  )

  if (showWelcomeOverlay) return (
    <div style={styles.welcomeOverlay}><div style={styles.welcomeCard}><div style={styles.welcomeBall}><RedBall isSpeaking={isAISpeaking} /></div><div style={styles.welcomeMessageText}>{welcomeMessage}</div></div></div>
  )

  if (showAuthModal) return (
    <div style={styles.authModalOverlay}><div style={styles.authModalCard}><button onClick={() => setShowAuthModal(false)} style={styles.authModalClose}>✕</button><h1 style={styles.authTitle}>CYPHER4X</h1><p style={styles.authSubtitle}>{showLogin ? 'Login' : 'Sign Up'}</p><div style={styles.authError}>{authError}</div><input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.authInput} /><input type="password" placeholder="4-digit PIN" value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))} style={styles.authInput} maxLength="4" /><button onClick={handleAuthSubmit} style={styles.authBtn}>{showLogin ? 'Login' : 'Create Account'}</button><div style={styles.authSwitch}><span>{showLogin ? 'No account?' : 'Have account?'}</span><button onClick={() => { setShowLogin(!showLogin); setAuthError('') }} style={styles.authSwitchBtn}>{showLogin ? 'Sign Up' : 'Login'}</button></div></div></div>
  )

  if (showSettings) return (
    <div style={styles.settingsFullscreen}>
      <style>{`.toggle-switch{position:relative;display:inline-block;width:46px;height:24px;flex-shrink:0}.toggle-switch input{opacity:0;width:0;height:0}.toggle-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background:#333;transition:.3s;border-radius:24px}.toggle-slider:before{content:"";position:absolute;height:18px;width:18px;left:3px;bottom:3px;background:#fff;transition:.3s;border-radius:50%}.toggle-switch input:checked+.toggle-slider{background:#ff003c}.toggle-switch input:checked+.toggle-slider:before{transform:translateX(22px)}`}</style>
      <div style={styles.settingsHeaderFull}><h1 style={styles.settingsTitleFull}>Settings</h1><button onClick={() => setShowSettings(false)} style={styles.settingsCloseFull}><Icon name="close" size={28} color="#fff" /></button></div>
      <div style={styles.settingsBodyFull}>
        <div style={styles.settingsSection}><h3 style={styles.settingsSectionTitle}>General</h3>
          <div style={styles.settingItem}><span>Welcome Messages</span><label className="toggle-switch"><input type="checkbox" checked={settings.welcomeEnabled} onChange={(e) => setSettings({ ...settings, welcomeEnabled: e.target.checked })} /><span className="toggle-slider"></span></label></div>
          <div style={styles.settingItem}><span>Auto-start Voice</span><label className="toggle-switch"><input type="checkbox" checked={settings.autoStartVoice} onChange={(e) => setSettings({ ...settings, autoStartVoice: e.target.checked })} /><span className="toggle-slider"></span></label></div>
          <div style={styles.settingItem}><span>Read Aloud Responses</span><label className="toggle-switch"><input type="checkbox" checked={settings.readAloud} onChange={(e) => setSettings({ ...settings, readAloud: e.target.checked })} /><span className="toggle-slider"></span></label></div>
          <div style={styles.settingItem}><span>Safe Links</span><label className="toggle-switch"><input type="checkbox" checked={settings.safeLinks} onChange={(e) => setSettings({ ...settings, safeLinks: e.target.checked })} /><span className="toggle-slider"></span></label></div>
          <div style={styles.settingItem}><span>Secret Mode</span><label className="toggle-switch"><input type="checkbox" checked={settings.secretMode} onChange={(e) => setSettings({ ...settings, secretMode: e.target.checked })} /><span className="toggle-slider"></span></label></div>
        </div>
        <div style={styles.settingsSection}><h3 style={styles.settingsSectionTitle}>Interface</h3>
          <div style={styles.settingItem}><span>Auto-scroll</span><label className="toggle-switch"><input type="checkbox" checked={settings.autoScroll} onChange={(e) => setSettings({ ...settings, autoScroll: e.target.checked })} /><span className="toggle-slider"></span></label></div>
          <div style={styles.settingItem}><span>Show Timestamps</span><label className="toggle-switch"><input type="checkbox" checked={settings.showTimestamps} onChange={(e) => setSettings({ ...settings, showTimestamps: e.target.checked })} /><span className="toggle-slider"></span></label></div>
          <div style={styles.settingItem}><span>Typing Indicator</span><label className="toggle-switch"><input type="checkbox" checked={settings.typingIndicator} onChange={(e) => setSettings({ ...settings, typingIndicator: e.target.checked })} /><span className="toggle-slider"></span></label></div>
          <div style={styles.settingItem}><span>Compact Mode</span><label className="toggle-switch"><input type="checkbox" checked={settings.compactMode} onChange={(e) => setSettings({ ...settings, compactMode: e.target.checked })} /><span className="toggle-slider"></span></label></div>
          <div style={styles.settingItem}><span>High Contrast</span><label className="toggle-switch"><input type="checkbox" checked={settings.highContrast} onChange={(e) => setSettings({ ...settings, highContrast: e.target.checked })} /><span className="toggle-slider"></span></label></div>
        </div>
        <div style={styles.settingsSection}><h3 style={styles.settingsSectionTitle}>Feedback</h3>
          <div style={styles.settingItem}><span>Haptic</span><label className="toggle-switch"><input type="checkbox" checked={settings.haptic} onChange={(e) => setSettings({ ...settings, haptic: e.target.checked })} /><span className="toggle-slider"></span></label></div>
          <div style={styles.settingItem}><span>Sound Effects</span><label className="toggle-switch"><input type="checkbox" checked={settings.soundFx} onChange={(e) => setSettings({ ...settings, soundFx: e.target.checked })} /><span className="toggle-slider"></span></label></div>
          <div style={styles.settingItem}><span>Confirm Delete</span><label className="toggle-switch"><input type="checkbox" checked={settings.confirmDelete} onChange={(e) => setSettings({ ...settings, confirmDelete: e.target.checked })} /><span className="toggle-slider"></span></label></div>
        </div>
        <div style={styles.settingsSection}><h3 style={styles.settingsSectionTitle}>AI Behavior</h3>
          <div style={styles.settingItem}><span>Code Auto-Overview</span><label className="toggle-switch"><input type="checkbox" checked={settings.codeAutoOverview} onChange={(e) => setSettings({ ...settings, codeAutoOverview: e.target.checked })} /><span className="toggle-slider"></span></label></div>
          <div style={styles.settingItem}><span>Floating Assistant</span><label className="toggle-switch"><input type="checkbox" checked={settings.overlayButton} onChange={(e) => setSettings({ ...settings, overlayButton: e.target.checked })} /><span className="toggle-slider"></span></label></div>
        </div>
        <div style={styles.settingsSection}><h3 style={styles.settingsSectionTitle}>Voice</h3>
          <div style={styles.settingItem}><span>Speed</span><input type="range" min="0.5" max="2" step="0.1" value={settings.voiceSpeed} onChange={(e) => setSettings({ ...settings, voiceSpeed: parseFloat(e.target.value) })} style={styles.settingsRange} /><span style={styles.settingsValue}>{settings.voiceSpeed}x</span></div>
          <div style={styles.settingItem}><span>Gender</span><select value={voiceGender} onChange={(e) => setVoiceGender(e.target.value)} style={styles.settingsSelect}><option value="male">Male</option><option value="female">Female</option></select></div>
        </div>
        <div style={styles.settingsSection}><h3 style={styles.settingsSectionTitle}>AI Personality</h3>
          <div style={styles.personalityGridSettings}>{PERSONALITIES.map(p => <button key={p.id} onClick={() => { setAiPersonality(p.id); setSettings({ ...settings, personality: p.id }); localStorage.setItem('cypher4x_personality', p.id) }} style={{ ...styles.personalityOptionSmall, borderColor: aiPersonality === p.id ? '#ff003c' : '#333', backgroundColor: aiPersonality === p.id ? 'rgba(255,0,60,0.15)' : '#1a1a1a' }}><span style={{ fontSize: 20 }}>{p.icon}</span><span style={{ fontSize: 12, color: '#fff', fontWeight: 'bold' }}>{p.label}</span></button>)}</div>
          {aiPersonality === 'custom' && customStyle && <p style={styles.bgHint}>Learned: short={customStyle.short?'y':'n'}, formal={customStyle.formal?'y':'n'}, emoji={customStyle.emoji?'y':'n'}, excited={customStyle.excited?'y':'n'} ({customStyle.count} msgs)</p>}
        </div>
        <div style={styles.settingsSection}><h3 style={styles.settingsSectionTitle}>Background</h3>
          <div style={styles.backgroundControls}><label style={styles.uploadBtn}><Icon name="image" size={18} color="#fff" /><span>Choose Image</span><input ref={bgInputRef} type="file" accept="image/*" onChange={handleBackgroundChange} style={{ display: 'none' }} /></label>{backgroundImage && <button onClick={resetBackground} style={styles.resetBtn}><Icon name="refresh" size={18} color="#fff" /><span>Reset</span></button>}</div>
          {backgroundImage && <div style={styles.bgPreview}><img src={backgroundImage} alt="Preview" style={styles.bgPreviewImg} /></div>}
          <p style={styles.bgHint}>Red Ball stays on top.</p>
        </div>
        <div style={styles.settingsSection}><h3 style={styles.settingsSectionTitle}>About Overlay</h3><p style={styles.bgHint}>Download the App for the overlay Feature to work.</p></div>
      </div>
      <button onClick={() => setShowSettings(false)} style={styles.settingsDoneFull}>Done</button>
    </div>
  )

  if (showMusicPanel) return (
    <div style={styles.settingsFullscreen}><div style={styles.settingsHeaderFull}><h1 style={styles.settingsTitleFull}>🎵 Music Generator</h1><button onClick={() => setShowMusicPanel(false)} style={styles.settingsCloseFull}><Icon name="close" size={28} color="#fff" /></button></div>
      <div style={styles.settingsBodyFull}>
        <div style={styles.settingsSection}><h3 style={styles.settingsSectionTitle}>Describe Your Music</h3><input value={musicDesc} onChange={(e) => setMusicDesc(e.target.value)} placeholder="e.g. love song, sad piano, happy pop..." style={styles.settingsSelect} /><p style={styles.bgHint}>Try: love, pink, sad, happy, chill, epic</p></div>
        <div style={styles.settingsSection}><h3 style={styles.settingsSectionTitle}>Duration</h3><div style={styles.settingItem}><span>{musicDuration}s</span><input type="range" min="5" max="60" step="1" value={musicDuration} onChange={(e) => setMusicDuration(parseInt(e.target.value))} style={styles.settingsRange} /></div></div>
        <div style={styles.settingsSection}><h3 style={styles.settingsSectionTitle}>Quality</h3><select value={musicQuality} onChange={(e) => setMusicQuality(e.target.value)} style={styles.settingsSelect}><option value="low">Low — drums + bass + chords</option><option value="medium">Medium — + melody + robot voice</option><option value="high">High — + arpeggio + full mix</option></select></div>
        {musicInfo && <p style={{ color: '#4f8', textAlign: 'center', fontSize: 13, fontWeight: 'bold' }}>{musicInfo}</p>}
        {musicDownloadUrl && <a href={musicDownloadUrl} download={`cypher4x_music_${Date.now()}.wav`} style={{ ...styles.uploadBtn, justifyContent: 'center', textDecoration: 'none', marginTop: 12 }}><Icon name="download" size={16} color="#fff" /><span>Download WAV</span></a>}
      </div>
      <button onClick={handleGenerateMusic} disabled={musicGenerating} style={styles.settingsDoneFull}>{musicGenerating ? 'Composing...' : musicPlaying ? 'Playing...' : 'Generate & Play'}</button>
    </div>
  )

  if (showVideoPanel) return (
    <div style={styles.settingsFullscreen}><div style={styles.settingsHeaderFull}><h1 style={styles.settingsTitleFull}>🎬 Video Generator</h1><button onClick={() => setShowVideoPanel(false)} style={styles.settingsCloseFull}><Icon name="close" size={28} color="#fff" /></button></div>
      <div style={styles.settingsBodyFull}>
        <div style={styles.settingsSection}><h3 style={styles.settingsSectionTitle}>Describe Your Video</h3><input value={videoDesc} onChange={(e) => setVideoDesc(e.target.value)} placeholder="e.g. anime sakura, cyberpunk, cartoon, space..." style={styles.settingsSelect} /><p style={styles.bgHint}>Try: anime, movie, cartoon, cyber, nature, space, abstract</p></div>
        <div style={styles.settingsSection}><h3 style={styles.settingsSectionTitle}>Duration</h3><div style={styles.settingItem}><span>{videoDuration}s</span><input type="range" min="3" max="30" step="1" value={videoDuration} onChange={(e) => setVideoDuration(parseInt(e.target.value))} style={styles.settingsRange} /></div></div>
        <div style={styles.settingsSection}><h3 style={styles.settingsSectionTitle}>Quality</h3><select value={videoQuality} onChange={(e) => setVideoQuality(e.target.value)} style={styles.settingsSelect}><option value="low">Low (240p)</option><option value="medium">Medium (480p)</option><option value="high">High (720p)</option></select></div>
        <canvas ref={canvasRef} width={videoQuality === 'high' ? 720 : videoQuality === 'medium' ? 480 : 320} height={videoQuality === 'high' ? 480 : videoQuality === 'medium' ? 320 : 240} style={{ width: '100%', borderRadius: 12, background: '#000', marginTop: 8 }} />
        {videoInfo && <p style={{ color: '#4f8', textAlign: 'center', fontSize: 13, fontWeight: 'bold' }}>{videoInfo}</p>}
        {videoRecording && <p style={{ color: '#ff6688', textAlign: 'center' }}>● Recording... {videoProgress}%</p>}
      </div>
      {!videoRecording ? <button onClick={handleStartVideo} style={styles.settingsDoneFull}>Start & Record ({videoDuration}s)</button> : <button onClick={async () => { if (!videoRecorderRef.current) return; const b = await videoRecorderRef.current.stop(); videoRecorderRef.current = null; setVideoRecording(false); const u = URL.createObjectURL(b); const a = document.createElement('a'); a.href = u; a.download = `cypher4x_video_${Date.now()}.webm`; a.click(); URL.revokeObjectURL(u) }} style={styles.settingsDoneFull}>Stop & Download</button>}
    </div>
  )

  if (showCyberLab) {
    const tools = [{id:'passcheck',label:'Password'},{id:'hash',label:'Hash'},{id:'base64',label:'B64 Enc'},{id:'unbase64',label:'B64 Dec'},{id:'hex',label:'Hex'},{id:'rot13',label:'ROT13'},{id:'dns',label:'DNS'},{id:'ip',label:'IP'},{id:'portscan',label:'PortSim'}]
    return (
      <div style={styles.settingsFullscreen}>
        <div style={styles.settingsHeaderFull}><h1 style={styles.settingsTitleFull}>🔒 Cyber Lab</h1><button onClick={() => setShowCyberLab(false)} style={styles.settingsCloseFull}><Icon name="close" size={28} color="#fff" /></button></div>
        <div style={{ display: 'flex', padding: '8px 16px', gap: 8, flexShrink: 0, background: '#111', borderBottom: '1px solid #333' }}>
          <button onClick={() => setCyberTab('terminal')} style={{ flex: 1, padding: 10, background: cyberTab === 'terminal' ? '#ff003c' : '#1a1a1a', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 'bold', cursor: 'pointer' }}>Terminal</button>
          <button onClick={() => setCyberTab('tools')} style={{ flex: 1, padding: 10, background: cyberTab === 'tools' ? '#ff003c' : '#1a1a1a', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 'bold', cursor: 'pointer' }}>Tools</button>
        </div>
        {cyberTab === 'terminal' && (<>
          <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: 16, background: '#000', fontFamily: "'Courier New', monospace", fontSize: 13, color: '#ddd' }}>
            {cyberLines.map((l, i) => <pre key={i} style={{ margin: '2px 0', whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: l.type === 'cmd' ? '#4f8' : l.type === 'info' ? '#ff6688' : '#ddd', fontWeight: l.type === 'cmd' ? 'bold' : 'normal' }}>{l.text}</pre>)}
            <div ref={cyberEndRef} />
          </div>
          <form onSubmit={handleCyberSubmit} style={{ display: 'flex', gap: 8, padding: 12, paddingBottom: 'max(12px, env(safe-area-inset-bottom, 12px))', background: '#111', borderTop: '1px solid #333' }}>
            <span style={{ color: '#4f8', fontWeight: 'bold' }}>$</span>
            <input value={cyberInput} onChange={(e) => setCyberInput(e.target.value)} placeholder="Type a command (help)" style={{ flex: 1, padding: 10, background: '#000', border: '1px solid #333', color: '#fff', borderRadius: 4, fontFamily: "'Courier New', monospace", outline: 'none' }} autoComplete="off" autoCapitalize="off" spellCheck="false" />
            <button type="submit" style={{ padding: '8px 14px', background: '#ff003c', border: 'none', borderRadius: 4, color: '#fff', cursor: 'pointer' }}><Icon name="send" size={16} color="#fff" /></button>
          </form>
        </>)}
        {cyberTab === 'tools' && (
          <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: 16 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
              {tools.map(t => <button key={t.id} onClick={() => { setCyberTool(t.id); setCyberToolOutput('') }} style={{ padding: '6px 12px', borderRadius: 20, border: cyberTool === t.id ? '1px solid #ff003c' : '1px solid #333', background: cyberTool === t.id ? 'rgba(255,0,60,0.15)' : '#1a1a1a', color: '#fff', fontSize: 12, cursor: 'pointer' }}>{t.label}</button>)}
            </div>
            <input value={cyberToolInput} onChange={(e) => setCyberToolInput(e.target.value)} placeholder="Input..." style={styles.settingsSelect} />
            <button onClick={runCyberTool} style={{ ...styles.uploadBtn, marginTop: 12, width: '100%', justifyContent: 'center' }}><Icon name="zap" size={16} color="#fff" /><span>Run</span></button>
            {cyberToolOutput && (<div style={{ marginTop: 16 }}><pre style={{ background: '#000', border: '1px solid #333', borderRadius: 8, padding: 12, color: '#4f8', fontFamily: "'Courier New', monospace", fontSize: 12, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{cyberToolOutput}</pre><button onClick={() => navigator.clipboard.writeText(cyberToolOutput)} style={{ ...styles.uploadBtn, marginTop: 8, width: '100%', justifyContent: 'center' }}><Icon name="copy" size={16} color="#fff" /><span>Copy</span></button></div>)}
            <p style={{ color: '#888', fontSize: 11, marginTop: 16, fontStyle: 'italic' }}>⚠️ Educational use only. Only test systems you own or have written permission to test.</p>
          </div>
        )}
      </div>
    )
  }

  if (isFullscreenCall) return (
    <div style={styles.fullscreenCallOverlay}><button onClick={toggleFullscreenCall} style={styles.returnBtn}><Icon name="arrowLeft" size={28} color="#fff" /> Return</button><div style={styles.fullscreenCallContentNoBall}><div style={styles.fullscreenListeningStatus}>{isListening ? <div style={styles.fullscreenListeningDot} /> : isAISpeaking ? <div style={styles.fullscreenSpeakingDot} /> : null}<span style={styles.fullscreenStatusText}>{isListening ? 'Listening...' : isAISpeaking ? 'Speaking...' : 'Tap mic to talk'}</span></div>{interimTranscript && <div style={styles.fullscreenTranscript}>{interimTranscript}</div>}<button onClick={interruptAndListen} style={styles.fullscreenMicBtn} disabled={isProcessing}><Icon name="mic" size={48} color="#fff" /></button></div></div>
  )

  if (showRotateOverlay) return (
    <div style={styles.rotateOverlay}><div style={styles.rotateCard}><Icon name="rotate" size={48} color="#ff003c" /><div style={styles.rotateText}>Pls Rotate device if you are using Android</div><button onClick={() => setShowRotateOverlay(false)} style={styles.rotateOkBtn}>OK</button></div></div>
  )

  if (showChatOverview) return (
    <div style={styles.chatOverviewContainer}>
      <div style={styles.chatOverviewHeader}><button onClick={() => setShowChatOverview(false)} style={styles.chatOverviewBackBtn}><Icon name="arrowLeft" size={24} color="#fff" /> Back</button><span style={styles.chatOverviewTitle}>Chat with AI</span><button onClick={() => setChatOverviewVoiceEnabled(!chatOverviewVoiceEnabled)} style={styles.chatOverviewVoiceToggle}><Icon name={chatOverviewVoiceEnabled ? 'volume2' : 'volumeX'} size={20} color="#fff" /></button></div>
      <div style={styles.chatOverviewMessages}>
        {conversation.length === 0 && <div style={styles.chatOverviewEmpty}>Start chatting!</div>}
        {conversation.map(msg => (
          <div key={msg.id} style={{ ...styles.chatOverviewMsg, alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', backgroundColor: msg.role === 'user' ? '#ff003c' : '#1a1a1a', ...(settings.compactMode ? { padding: '6px 10px' } : {}) }}>
            {msg.replyToText && <div style={styles.replyQuote}><Icon name="reply" size={12} color="#ff6688" /><span style={styles.replyQuoteText}>{msg.replyToText}...</span></div>}
            {renderMessageContent(msg)}
            {msg.file && (<div style={styles.filePreviewPC}>{msg.file.type.startsWith('image/') && <img src={msg.file.data} alt="" style={{ maxWidth: '100%', maxHeight: '120px', borderRadius: 4, marginTop: 4 }} />}{msg.file.type.startsWith('video/') && <video controls style={{ maxWidth: '100%', maxHeight: '120px', borderRadius: 4, marginTop: 4 }}><source src={msg.file.data} type={msg.file.type} /></video>}{!msg.file.type.startsWith('image/') && !msg.file.type.startsWith('video/') && <div style={{ fontSize: 10, color: '#888', marginTop: 2 }}>📎 {msg.file.name}</div>}</div>)}
            {settings.showTimestamps && <span style={styles.chatOverviewMsgTime}>{fmtT(msg.time)}</span>}
            <div style={styles.msgActions}>
              <button onClick={() => handleReply(msg)} style={styles.msgActionBtn}><Icon name="reply" size={14} color="#888" /></button>
              {msg.role === 'user' && <button onClick={() => handleEditMessage(msg.id)} style={styles.msgActionBtn}><Icon name="edit" size={14} color="#888" /></button>}
              <button onClick={() => handleDeleteMessage(msg.id)} style={styles.msgActionBtn}><Icon name="trash" size={14} color="#888" /></button>
              <button onClick={() => handleShareMessage(msg)} style={styles.msgActionBtn}><Icon name="copy" size={14} color="#888" /></button>
            </div>
          </div>
        ))}
        {isProcessing && settings.typingIndicator && <div style={{ ...styles.chatOverviewMsg, alignSelf: 'flex-start', backgroundColor: '#1a1a1a' }}><span style={styles.chatOverviewMsgText}>● ● ●</span></div>}
        <div ref={chatEndRef} />
      </div>
      {replyingTo && <div style={styles.replyBar}><div style={{ flex: 1, overflow: 'hidden' }}><div style={{ color: '#ff6688', fontSize: 11, fontWeight: 'bold', marginBottom: 2 }}>Replying to:</div><div style={{ color: '#ddd', fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{replyingTo.content.slice(0, 60)}...</div></div><button onClick={() => setReplyingTo(null)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', padding: 4 }}><Icon name="x" size={18} color="#888" /></button></div>}
      <div style={styles.chatOverviewInputRowRaised}>
        <input type="text" value={chatOverviewInput} onChange={(e) => setChatOverviewInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendOverviewText()} placeholder={pendingCode ? 'Answer the question...' : replyingTo ? 'Reply...' : 'Type a message...'} style={styles.chatOverviewInput} disabled={isProcessing} />
        <div style={styles.voiceControls}>
          {!isRecordingVoice && !voicePaused ? <button onClick={startVoiceRecording} style={styles.chatOverviewMicBtn}><Icon name="mic" size={20} color="#fff" /></button> : (<>{voicePaused ? <button onClick={resumeVoiceRecording} style={styles.chatOverviewMicBtn}><Icon name="play" size={20} color="#4f8" /></button> : <button onClick={pauseVoiceRecording} style={styles.chatOverviewMicBtn}><Icon name="pause" size={20} color="#ff003c" /></button>}<button onClick={deleteVoiceRecording} style={styles.chatOverviewMicBtn}><Icon name="trash" size={20} color="#ff003c" /></button><button onClick={sendVoiceRecording} style={styles.chatOverviewSendBtn} disabled={isProcessing || !voiceTranscript.trim()}><Icon name="send" size={20} color="#fff" /></button></>)}
        </div>
        <label style={styles.chatOverviewAttachBtn}><Icon name="file" size={20} color="#fff" /><input type="file" accept="image/*,video/*,.pdf,.doc,.docx,.txt" onChange={handleOverviewFileShare} style={{ display: 'none' }} /></label>
        <button onClick={sendOverviewText} style={styles.chatOverviewSendBtn} disabled={isProcessing}><Icon name="send" size={20} color="#fff" /></button>
      </div>
      {voiceTranscript && !chatOverviewListening && <div style={styles.voiceTranscriptPreview}>"{voiceTranscript}"</div>}
    </div>
  )

  if (editingProfile) return (
    <div style={styles.profileContainer}><div style={styles.profileCard}><h1 style={styles.profileTitle}>EDIT PROFILE</h1><div style={styles.avatarUploadArea} onClick={() => fileInputRef.current?.click()}>{profileForm.avatar ? <img src={profileForm.avatar} alt="" style={styles.avatarPreview} /> : <span style={styles.avatarIcon}><Icon name="camera" size={32} color="#ff003c" /><br />Tap to select</span>}</div><input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} /><div style={styles.inputGroup}><label style={styles.label}><Icon name="user" size={14} color="#ff003c" /> Name *</label><input type="text" value={profileForm.name} onChange={(e) => setProfileForm(p => ({ ...p, name: e.target.value }))} style={styles.textInput} /></div><div style={styles.inputGroup}><label style={styles.label}><Icon name="atSign" size={14} color="#ff003c" /> Username *</label><input type="text" value={profileForm.username} onChange={(e) => setProfileForm(p => ({ ...p, username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '') }))} style={styles.textInput} /></div><div style={styles.inputGroup}><label style={styles.label}><Icon name="pencil" size={14} color="#ff003c" /> Bio</label><textarea value={profileForm.bio} onChange={(e) => setProfileForm(p => ({ ...p, bio: e.target.value }))} style={styles.bioInput} /></div><div style={styles.profileBtnRow}><button onClick={() => setEditingProfile(false)} style={styles.cancelBtn}>Cancel</button><button onClick={saveProfile} style={styles.createBtn}>SAVE</button></div></div></div>
  )

  if (viewMode === 'android') return (
    <div style={{ ...styles.appAndroid, ...(settings.highContrast ? { filter: 'contrast(1.3)' } : {}) }}>
      {sidebarOpen && (<>
        <div style={styles.sidebarOverlay} onClick={() => setSidebarOpen(false)} />
        <div style={styles.sidebar}>
          <div style={styles.sidebarHeader}><h2 style={styles.sidebarTitle}><Icon name="settings" size={20} color="#ff003c" /> CONTROL PANEL</h2><button onClick={() => setSidebarOpen(false)} style={styles.closeBtn}><Icon name="x" size={20} color="#888" /></button></div>
          <div style={styles.sidebarSection}><h3 style={styles.sectionTitle}><Icon name="desktop" size={16} color="#ff003c" /> VIEW MODE</h3><div style={styles.settingRow}><span style={styles.settingLabel}>Android</span><button onClick={toggleView} style={styles.toggleBtn}>PC</button></div></div>
          <div style={styles.sidebarSection}><h3 style={styles.sectionTitle}><Icon name="sparkles" size={16} color="#ff003c" /> QUICK TOOLS</h3>
            <button onClick={() => { setSidebarOpen(false); setShowCyberLab(true) }} style={styles.toolBtn}><Icon name="shield" size={16} color="#fff" /> Cyber Lab</button>
            <button onClick={() => { setSidebarOpen(false); setShowMusicPanel(true) }} style={styles.toolBtn}><Icon name="music" size={16} color="#fff" /> Music Generator</button>
            <button onClick={() => { setSidebarOpen(false); setShowVideoPanel(true) }} style={styles.toolBtn}><Icon name="video" size={16} color="#fff" /> Video Generator</button>
            <button onClick={() => { setSidebarOpen(false); setShowSettings(true) }} style={styles.toolBtn}><Icon name="cog" size={16} color="#fff" /> Settings</button>
          </div>
          <div style={styles.sidebarSection}><h3 style={styles.sectionTitle}><Icon name="chart" size={16} color="#ff003c" /> SYSTEM</h3><div style={styles.statsCard}><div style={styles.statRow}><span style={styles.statLabel}><Icon name="hourglass" size={14} color="#888" /> Uptime</span><span style={styles.statValue}>{fmtU(stats.uptime)}</span></div><div style={styles.statRow}><span style={styles.statLabel}><Icon name="cpu" size={14} color="#888" /> CPU</span><span style={styles.statValue}>{stats.cpuUsage}%</span></div><div style={styles.statRow}><span style={styles.statLabel}><Icon name="memory" size={14} color="#888" /> RAM</span><span style={styles.statValue}>{stats.ramUsage.toFixed(1)} GB</span></div></div></div>
          <div style={styles.sidebarSection}><h3 style={styles.sectionTitle}><Icon name="settings" size={16} color="#ff003c" /> AI CONFIG</h3><div style={styles.settingRow}><span style={styles.settingLabel}>Personality</span><span style={styles.settingValue}>{PERSONALITIES.find(p => p.id === aiPersonality)?.label}</span></div><div style={styles.settingRow}><span style={styles.settingLabel}>Secret Mode</span><span style={styles.settingValue}>{settings.secretMode ? 'ON' : 'OFF'}</span></div></div>
          <div style={styles.sidebarSection}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}><h3 style={styles.sectionTitle}><Icon name="chat" size={16} color="#ff003c" /> CONVERSATION</h3><button onClick={() => setShowChatOverview(true)} style={styles.overviewBtn}><Icon name="desktop" size={14} color="#fff" /> Overview</button></div>
            <div style={{ maxHeight: 300, overflowY: 'auto', marginBottom: 8, border: '1px solid #1a1a1a', borderRadius: 6, padding: 6, backgroundColor: '#050505' }}>
              {conversation.length === 0 && <p style={styles.dashEmptyPC}>No messages yet</p>}
              {conversation.slice(-30).map(msg => (
                <div key={msg.id} style={{ padding: '6px 8px', borderBottom: '1px solid #111' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}><span style={{ fontWeight: 'bold', color: msg.role === 'user' ? '#ddd' : '#ff003c', fontSize: 11 }}>{msg.role === 'user' ? profile?.name || 'You' : 'CYPHER4X'}</span><span style={{ fontSize: 9, color: '#666' }}>{fmtT(msg.time)}</span></div>
                  <span style={{ color: '#ddd', fontSize: 12, wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>{msg.content.length > 150 ? msg.content.slice(0, 150) + '…' : msg.content}</span>
                </div>
              ))}
            </div>
            <div style={styles.inputRow}><input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendTextMessage()} placeholder="Type..." style={styles.textInputSmall} /><button onClick={sendTextMessage} style={styles.sendBtnSmall} disabled={isProcessing}><Icon name="send" size={16} color="#fff" /></button></div>
            <div style={styles.commandActionsPC}><button onClick={clearConversation} style={styles.dashBtnPC}><Icon name="trash" size={14} color="#fff" /> Clear</button><button onClick={exportChat} style={styles.dashBtnPC}><Icon name="save" size={14} color="#fff" /> Export</button></div>
          </div>
          <div style={styles.sidebarSection}><h3 style={styles.sectionTitle}><Icon name="user" size={16} color="#ff003c" /> PROFILE</h3><div style={styles.profileCardSidebar}><div style={styles.profileAvatarWrapper}>{profile?.avatar ? <img src={profile.avatar} alt="" style={styles.profileAvatar} /> : <div style={styles.profileAvatarPlaceholder}>{profile?.name?.charAt(0) || '?'}</div>}</div><div style={styles.profileInfo}><div style={styles.profileName}>{profile?.name || 'User'}</div><div style={styles.profileHandle}><Icon name="atSign" size={12} color="#888" />{profile?.username || 'anonymous'}</div></div></div><button onClick={openEditProfile} style={styles.sidebarBtn}><Icon name="edit" size={14} color="#fff" /> Edit Profile</button>{userMode === 'loggedin' ? <button onClick={handleLogout} style={styles.logoutBtn}><Icon name="close" size={14} color="#fff" /> Logout</button> : <button onClick={() => { setShowAuthModal(true); setShowLogin(true) }} style={styles.sidebarBtn}><Icon name="settings" size={14} color="#fff" /> Login</button>}</div>
          <div style={styles.sidebarSection}><h3 style={styles.sectionTitle}><Icon name="alertTriangle" size={16} color="#ff003c" /> DANGER ZONE</h3><button onClick={resetAllData} style={styles.dangerBtn}><Icon name="trash" size={14} color="#fff" /> Reset All</button></div>
        </div>
      </>)}

      <div style={{ ...styles.mainContentAndroid, backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div style={styles.backgroundAndroid}><RedBall isSpeaking={isAISpeaking} /><div style={styles.faceTitleAndroid}>CYPHER4X</div></div>
        <div style={styles.topBarAndroid}><div style={{ width: 80 }} /><div style={styles.topRightButtons}><button onClick={toggleFullscreenCall} style={styles.callButtonTopRight}><Icon name="phone" size={24} color={isCallActive ? '#4f8' : '#ff003c'} /><span style={styles.callLabelTop}>{isFullscreenCall ? 'ACTIVE' : 'CALL'}</span></button><button onClick={() => setShowSettings(true)} style={styles.settingsButtonTop}><Icon name="cog" size={20} color="#fff" /></button></div></div>
        <div style={styles.listeningContainer}>
          {isListening ? (<><div style={styles.listeningDot} /><span style={styles.listeningText}>Listening...</span>{interimTranscript && <span style={styles.interimText}>"{interimTranscript}"</span>}{interimTranscript && <button onClick={sendInterim} style={styles.sendInterimBtn} disabled={isProcessing}><Icon name="send" size={16} color="#fff" /><span>Send</span></button>}</>) : isProcessing ? <span style={styles.listeningText}>Processing...</span> : isRecording ? (<><div style={{ ...styles.listeningDot, backgroundColor: '#ff003c', boxShadow: '0 0 20px #ff003c' }} /><span style={styles.listeningText}>Recording...</span>{interimTranscript && <span style={styles.interimText}>"{interimTranscript}"</span>}</>) : null}
        </div>
        <div style={styles.voiceButtonContainer}><button onClick={startRecording} disabled={isRecording || isProcessing || isFullscreenCall} style={{ ...styles.voiceButton, ...(isRecording ? styles.voiceButtonActive : {}) }}><Icon name="mic" size={40} color="#fff" /><span style={styles.voiceLabel}>{isRecording ? 'Recording...' : isProcessing ? 'Processing...' : 'Tap to Speak'}</span></button></div>
        <button onClick={() => setSidebarOpen(true)} style={{ ...styles.hamburgerBtn, zIndex: 15 }}><Icon name="menu" size={28} color="#ff003c" /></button>
        {settings.overlayButton && <button onClick={toggleOverlay} style={{ ...styles.floatingBtn, backgroundColor: overlayActive ? '#ff003c' : 'rgba(0,0,0,0.7)', borderColor: overlayActive ? '#ff003c' : '#333' }}><Icon name={overlayListening ? 'mic' : 'sparkles'} size={22} color={overlayActive ? '#fff' : '#ff003c'} /></button>}
      </div>
    </div>
  )

  // ============ PC VIEW ============
  return (
    <div style={{ ...styles.appPC, ...(settings.highContrast ? { filter: 'contrast(1.3)' } : {}) }}>
      <header style={styles.headerPC}>
        <div style={styles.headerLeft}><h1 style={styles.titlePC}>CYPHER4X</h1><span style={styles.versionBadgePC}>{VERSION}</span></div>
        <div style={styles.headerRight}>
          <button onClick={toggleFullscreenCall} style={styles.callBtnPC}><Icon name="phone" size={18} color="#ff003c" /><span>CALL</span></button>
          <button onClick={() => setShowCyberLab(true)} style={styles.settingsBtnPC}><Icon name="shield" size={20} color="#fff" /></button>
          <button onClick={() => setShowMusicPanel(true)} style={styles.settingsBtnPC}><Icon name="music" size={20} color="#fff" /></button>
          <button onClick={() => setShowVideoPanel(true)} style={styles.settingsBtnPC}><Icon name="video" size={20} color="#fff" /></button>
          <button onClick={() => setShowSettings(true)} style={styles.settingsBtnPC}><Icon name="cog" size={20} color="#fff" /></button>
          <button onClick={startRecording} disabled={isRecording || isProcessing} style={styles.voiceBtnPC}><Icon name="mic" size={20} color="#ff003c" /><span>Speak</span></button>
        </div>
      </header>
      <div style={styles.pcLayout}>
        <div style={styles.pcSidebar}>
          <div style={styles.pcSidebarSection}><h3 style={styles.pcSidebarTitle}><Icon name="chart" size={16} color="#ff003c" /> STATS</h3><div style={styles.pcSidebarRow}><span>CPU</span><span>{stats.cpuUsage}%</span></div><div style={styles.pcSidebarRow}><span>RAM</span><span>{stats.ramUsage.toFixed(1)} GB</span></div><div style={styles.pcSidebarRow}><span>Uptime</span><span>{fmtU(stats.uptime)}</span></div></div>
          <div style={styles.pcSidebarSection}><h3 style={styles.pcSidebarTitle}><Icon name="chat" size={16} color="#ff003c" /> CONVERSATION</h3><button onClick={() => setShowChatOverview(true)} style={styles.overviewBtn}><Icon name="desktop" size={14} color="#fff" /> Overview</button></div>
          <div style={styles.pcSidebarSection}><h3 style={styles.pcSidebarTitle}><Icon name="user" size={16} color="#ff003c" /> PROFILE</h3><button onClick={openEditProfile} style={styles.sidebarBtnPC}><Icon name="edit" size={14} color="#fff" /> Edit Profile</button>{userMode === 'loggedin' ? <button onClick={handleLogout} style={styles.logoutBtnPC}><Icon name="close" size={14} color="#fff" /> Logout</button> : <button onClick={() => { setShowAuthModal(true); setShowLogin(true) }} style={styles.sidebarBtnPC}><Icon name="settings" size={14} color="#fff" /> Login</button>}</div>
        </div>
        <div style={{ ...styles.pcMain, backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div style={styles.pcBallContainer}><RedBall isSpeaking={isAISpeaking} /></div>
          <div style={styles.pcListeningContainer}>
            {isListening ? <><div style={styles.listeningDot} /><span style={styles.listeningText}>Listening...</span>{interimTranscript && <span style={styles.interimText}>"{interimTranscript}"</span>}</> : isProcessing ? <span style={styles.listeningText}>Processing...</span> : isRecording ? <><div style={{ ...styles.listeningDot, backgroundColor: '#ff003c' }} /><span style={styles.listeningText}>Recording...</span></> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

// ==================================================
// STYLES
// ==================================================
const styles = {
  appAndroid: { minHeight: '100vh', height: '100dvh', backgroundColor: '#000', color: '#e0e0e0', fontFamily: "'Segoe UI','Courier New',monospace", overflow: 'hidden', margin: 0, padding: 0 },
  bootContainer: { backgroundColor: '#000', minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' },
  bootBackground: { position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center,#1a0000 0%,#000 70%)' },
  bootContent: { position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 500, padding: 20 },
  bootTitle: { fontSize: 'clamp(48px,12vw,72px)', fontWeight: 'bold', color: '#ff003c', textShadow: '0 0 40px #ff003c,0 0 80px #ff003c44', letterSpacing: 8, margin: '0 0 10px', minHeight: 80, fontFamily: "'Courier New',monospace" },
  bootCursor: { display: 'inline-block', animation: 'blink 0.7s step-end infinite', color: '#ff003c' },
  bootSubtitle: { fontSize: 'clamp(14px,2vw,20px)', color: '#ff6688', letterSpacing: 4, marginBottom: 40, opacity: 0.8 },
  bootCredit: { color: '#ff6688', fontSize: 14, marginTop: 20, opacity: 0.7, borderTop: '1px solid rgba(255,0,60,0.2)', paddingTop: 16, minHeight: 30, fontFamily: "'Courier New',monospace" },
  personalityOverlay: { position: 'fixed', inset: 0, backgroundColor: '#000', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, overflowY: 'auto' },
  personalityCard: { width: '100%', maxWidth: 700, backgroundColor: '#111', border: '2px solid #ff003c', borderRadius: 16, padding: 30, textAlign: 'center' },
  personalityTitle: { color: '#ff003c', fontSize: 36, letterSpacing: 6, margin: '0 0 8px' },
  personalitySubtitle: { color: '#ff6688', fontSize: 16, marginBottom: 24 },
  personalityGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 12, marginBottom: 20 },
  personalityOption: { padding: '16px 12px', border: '2px solid #333', borderRadius: 12, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: 'transparent' },
  personalityIcon: { fontSize: 28 },
  personalityLabel: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  personalityDesc: { color: '#888', fontSize: 11, textAlign: 'center' },
  authModalOverlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 },
  authModalCard: { width: '100%', maxWidth: 400, backgroundColor: '#111', border: '2px solid #ff003c', borderRadius: 12, padding: 30, textAlign: 'center', position: 'relative' },
  authModalClose: { position: 'absolute', top: 10, right: 15, background: 'none', border: 'none', color: '#888', fontSize: 24, cursor: 'pointer' },
  authTitle: { color: '#ff003c', fontSize: 32, letterSpacing: 4, marginBottom: 4 },
  authSubtitle: { color: '#ff6688', fontSize: 18, marginBottom: 20 },
  authError: { color: '#ff003c', fontSize: 14, minHeight: 24, marginBottom: 12 },
  authInput: { width: '100%', padding: 12, marginBottom: 12, backgroundColor: '#000', border: '1px solid #333', color: '#fff', borderRadius: 6, fontSize: 16, outline: 'none', boxSizing: 'border-box' },
  authBtn: { width: '100%', padding: 14, backgroundColor: '#ff003c', color: '#fff', border: 'none', borderRadius: 6, fontSize: 18, fontWeight: 'bold', cursor: 'pointer', marginTop: 8 },
  authSwitch: { marginTop: 16, display: 'flex', justifyContent: 'center', gap: 8, color: '#888', fontSize: 14 },
  authSwitchBtn: { background: 'none', border: 'none', color: '#ff003c', cursor: 'pointer', fontSize: 14, fontWeight: 'bold', textDecoration: 'underline' },
  guestLimitOverlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.92)', zIndex: 99998, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 },
  guestLimitCard: { backgroundColor: '#111', border: '2px solid #ff003c', borderRadius: 20, padding: '40px 30px', maxWidth: 420, width: '100%', textAlign: 'center' },
  guestLimitTitle: { color: '#ff003c', fontSize: 24, marginBottom: 16 },
  guestLimitText: { color: '#ddd', fontSize: 16, lineHeight: 1.6, marginBottom: 24 },
  guestLimitButtons: { display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' },
  guestLimitLoginBtn: { padding: '12px 30px', backgroundColor: '#ff003c', color: '#fff', border: 'none', borderRadius: 30, fontSize: 16, fontWeight: 'bold', cursor: 'pointer', flex: 1, minWidth: 100 },
  guestLimitSignupBtn: { padding: '12px 30px', backgroundColor: '#1a3a3a', color: '#fff', border: '1px solid #2a5a5a', borderRadius: 30, fontSize: 16, fontWeight: 'bold', cursor: 'pointer', flex: 1, minWidth: 100 },
  welcomeOverlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.92)', zIndex: 99997, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 },
  welcomeCard: { backgroundColor: '#111', border: '2px solid #ff003c', borderRadius: 20, padding: '40px 30px', maxWidth: 500, width: '100%', textAlign: 'center' },
  welcomeBall: { width: 120, height: 120, margin: '0 auto 20px', position: 'relative' },
  welcomeMessageText: { color: '#fff', fontSize: 20, lineHeight: 1.6, marginBottom: 24, fontFamily: "'Courier New',monospace" },
  settingsFullscreen: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, height: '100dvh', backgroundColor: '#000', zIndex: 100000, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  settingsHeaderFull: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #333', backgroundColor: '#0a0000', flexShrink: 0 },
  settingsTitleFull: { color: '#ff003c', fontSize: 22, margin: 0, letterSpacing: 2 },
  settingsCloseFull: { background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'flex' },
  settingsBodyFull: { flex: 1, minHeight: 0, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 20, WebkitOverflowScrolling: 'touch' },
  settingsSection: { borderBottom: '1px solid #1a1a1a', paddingBottom: 20 },
  settingsSectionTitle: { color: '#ff003c', fontSize: 14, margin: '0 0 16px', letterSpacing: 1, textTransform: 'uppercase' },
  settingsDoneFull: { padding: 16, backgroundColor: '#ff003c', color: '#fff', border: 'none', fontSize: 16, fontWeight: 'bold', cursor: 'pointer', flexShrink: 0, paddingBottom: 'max(16px, env(safe-area-inset-bottom, 16px))' },
  personalityGridSettings: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(80px,1fr))', gap: 8 },
  personalityOptionSmall: { padding: '12px 8px', border: '2px solid #333', borderRadius: 8, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: 'transparent' },
  backgroundControls: { display: 'flex', gap: 10, flexWrap: 'wrap' },
  uploadBtn: { padding: '10px 16px', backgroundColor: '#ff003c', color: '#fff', borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 'bold', border: 'none' },
  resetBtn: { padding: '10px 16px', backgroundColor: '#333', color: '#fff', borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 'bold', border: 'none' },
  bgPreview: { marginTop: 12, borderRadius: 8, overflow: 'hidden', border: '1px solid #333' },
  bgPreviewImg: { width: '100%', maxHeight: 150, objectFit: 'cover', display: 'block' },
  bgHint: { color: '#888', fontSize: 12, marginTop: 8, fontStyle: 'italic', lineHeight: 1.5 },
  settingItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff', fontSize: 15, marginBottom: 14, gap: 10 },
  settingsSelect: { padding: '10px 12px', backgroundColor: '#000', border: '1px solid #444', color: '#fff', borderRadius: 6, fontSize: 14, width: '100%', boxSizing: 'border-box' },
  settingsRange: { width: 140, accentColor: '#ff003c' },
  settingsValue: { color: '#ff6688', minWidth: 40, textAlign: 'right', fontWeight: 'bold' },
  rotateOverlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 99996, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 },
  rotateCard: { backgroundColor: '#111', border: '2px solid #ff003c', borderRadius: 20, padding: '40px 30px', maxWidth: 400, width: '100%', textAlign: 'center' },
  rotateText: { color: '#fff', fontSize: 18, margin: '20px 0', lineHeight: 1.6 },
  rotateOkBtn: { padding: '12px 40px', backgroundColor: '#ff003c', color: '#fff', border: 'none', borderRadius: 30, fontSize: 16, fontWeight: 'bold', cursor: 'pointer' },
  fullscreenCallOverlay: { position: 'fixed', inset: 0, backgroundColor: '#000', zIndex: 99995, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20 },
  returnBtn: { position: 'absolute', top: 20, left: 20, backgroundColor: 'rgba(255,0,60,0.3)', border: '1px solid #ff003c', borderRadius: 30, padding: '10px 20px', color: '#fff', fontSize: 16, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' },
  fullscreenCallContentNoBall: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30, width: '100%', maxWidth: 500, flex: 1 },
  fullscreenListeningStatus: { display: 'flex', alignItems: 'center', gap: 12, backgroundColor: 'rgba(255,255,255,0.05)', padding: '8px 20px', borderRadius: 30, border: '1px solid rgba(255,0,60,0.2)' },
  fullscreenListeningDot: { width: 12, height: 12, borderRadius: '50%', backgroundColor: '#4f8', boxShadow: '0 0 20px #4f8', animation: 'pulseText 0.8s ease-in-out infinite' },
  fullscreenSpeakingDot: { width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff003c', boxShadow: '0 0 20px #ff003c', animation: 'pulseText 0.8s ease-in-out infinite' },
  fullscreenStatusText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  fullscreenTranscript: { color: '#ff6688', fontSize: 16, fontStyle: 'italic', padding: '8px 20px', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 12, maxWidth: '90%', textAlign: 'center', border: '1px solid rgba(255,0,60,0.2)', minHeight: 40 },
  fullscreenMicBtn: { width: 'clamp(70px,14vw,100px)', height: 'clamp(70px,14vw,100px)', borderRadius: '50%', backgroundColor: '#ff003c', border: '3px solid #ff003c', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 60px rgba(255,0,60,0.4)' },
  chatOverviewContainer: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, height: '100dvh', backgroundColor: '#000', zIndex: 99994, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  chatOverviewHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: '#111', borderBottom: '1px solid #333', flexShrink: 0 },
  chatOverviewBackBtn: { background: 'none', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', gap: 8, fontSize: 16, cursor: 'pointer' },
  chatOverviewTitle: { color: '#ff003c', fontSize: 18, fontWeight: 'bold' },
  chatOverviewVoiceToggle: { background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 4 },
  chatOverviewMessages: { flex: 1, minHeight: 0, overflowY: 'auto', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8, WebkitOverflowScrolling: 'touch' },
  chatOverviewEmpty: { color: '#666', textAlign: 'center', fontSize: 16, marginTop: 40 },
  chatOverviewMsg: { maxWidth: '88%', padding: '10px 14px', borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 4, position: 'relative' },
  chatOverviewMsgText: { color: '#fff', fontSize: 14, wordBreak: 'break-word', whiteSpace: 'pre-wrap' },
  chatOverviewMsgTime: { fontSize: 10, color: '#888', alignSelf: 'flex-end' },
  replyQuote: { display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', backgroundColor: 'rgba(255,255,255,0.08)', borderLeft: '3px solid #ff6688', borderRadius: 4, marginBottom: 4 },
  replyQuoteText: { color: '#ff6688', fontSize: 11, fontStyle: 'italic', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  replyBar: { display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', backgroundColor: '#1a1a1a', borderTop: '2px solid #ff003c' },
  chatOverviewInputRowRaised: { display: 'flex', gap: 8, padding: '12px 16px', paddingBottom: 'max(30px, env(safe-area-inset-bottom, 50px))', backgroundColor: '#111', borderTop: '1px solid #333', flexShrink: 0, alignItems: 'center' },
  chatOverviewInput: { flex: 1, padding: '10px 14px', backgroundColor: '#000', border: '1px solid #333', color: '#fff', borderRadius: 20, fontSize: 14, outline: 'none' },
  chatOverviewMicBtn: { background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 8, borderRadius: '50%', backgroundColor: 'rgba(255,0,60,0.2)' },
  chatOverviewAttachBtn: { background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 8, borderRadius: '50%', backgroundColor: 'rgba(255,0,60,0.2)', display: 'flex', alignItems: 'center' },
  chatOverviewSendBtn: { background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 8, borderRadius: '50%', backgroundColor: '#ff003c', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  overviewBtn: { padding: '4px 12px', backgroundColor: '#1a3a3a', border: '1px solid #2a5a5a', borderRadius: 4, color: '#fff', cursor: 'pointer', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 },
  voiceControls: { display: 'flex', gap: 6, alignItems: 'center' },
  voiceTranscriptPreview: { position: 'absolute', bottom: 80, left: 16, right: 16, backgroundColor: 'rgba(0,0,0,0.8)', padding: '8px 16px', borderRadius: 12, color: '#ff6688', fontSize: 14, fontStyle: 'italic', border: '1px solid rgba(255,0,60,0.3)', textAlign: 'center' },
  msgActions: { display: 'flex', gap: 4, justifyContent: 'flex-end', marginTop: 4, opacity: 0.7 },
  msgActionBtn: { background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px', borderRadius: 4 },
  codeBlockWrap: { marginTop: 8, marginBottom: 8, borderRadius: 8, overflow: 'hidden', border: '1px solid #333', backgroundColor: '#0a0a0a', alignSelf: 'stretch' },
  codeBlockHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', backgroundColor: '#1a1a1a', borderBottom: '1px solid #333' },
  codeLang: { color: '#ff6688', fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  codeCopyBtn: { display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', backgroundColor: '#ff003c', color: '#fff', border: 'none', borderRadius: 4, fontSize: 11, fontWeight: 'bold', cursor: 'pointer' },
  codeBlock: { margin: 0, padding: 12, color: '#e0e0e0', fontSize: 12, fontFamily: "'Courier New',monospace", whiteSpace: 'pre', overflowX: 'auto', lineHeight: 1.5 },
  profileContainer: { backgroundColor: '#000', minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 },
  profileCard: { width: '100%', maxWidth: 420, backgroundColor: '#111', border: '2px solid #ff003c', borderRadius: 12, padding: 28 },
  profileTitle: { color: '#ff003c', textAlign: 'center', marginBottom: 24, fontSize: 22 },
  avatarUploadArea: { width: 130, height: 130, borderRadius: '50%', border: '3px dashed #ff003c', margin: '0 auto 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: '#1a1a1a' },
  avatarPreview: { width: '100%', height: '100%', objectFit: 'cover' },
  avatarIcon: { fontSize: 14, color: '#ff003c', textAlign: 'center' },
  inputGroup: { marginBottom: 18 },
  label: { color: '#ff003c', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 },
  textInput: { width: '100%', padding: 14, backgroundColor: '#000', border: '1px solid #ff003c', color: '#fff', borderRadius: 8, fontSize: 15, outline: 'none', boxSizing: 'border-box' },
  bioInput: { width: '100%', minHeight: 80, padding: 14, backgroundColor: '#000', border: '1px solid #ff003c', color: '#fff', borderRadius: 8, fontSize: 15, outline: 'none', resize: 'vertical', boxSizing: 'border-box' },
  profileBtnRow: { display: 'flex', gap: 12, marginTop: 12 },
  createBtn: { flex: 1, padding: 14, backgroundColor: '#ff003c', color: '#fff', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 'bold', cursor: 'pointer' },
  cancelBtn: { padding: '14px 20px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: 8, fontSize: 15, cursor: 'pointer' },
  sidebarOverlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 998 },
  sidebar: { position: 'fixed', top: 0, left: 0, bottom: 0, width: 380, maxWidth: '90vw', backgroundColor: '#0a0000', borderRight: '2px solid #ff003c', zIndex: 999, overflowY: 'auto', padding: 16 },
  sidebarHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, paddingBottom: 10, borderBottom: '1px solid #333' },
  sidebarTitle: { color: '#ff003c', fontSize: 18, fontWeight: 'bold', margin: 0, fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: 8 },
  closeBtn: { backgroundColor: 'transparent', border: 'none', color: '#888', fontSize: 20, cursor: 'pointer', padding: 4, display: 'flex' },
  sidebarSection: { marginBottom: 12 },
  sectionTitle: { color: '#ff003c', fontSize: 14, margin: '0 0 8px', paddingBottom: 4, borderBottom: '1px solid #333', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: 6 },
  settingRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  settingLabel: { fontSize: 13, color: '#ddd' },
  settingValue: { fontSize: 13, color: '#ff6688' },
  toggleBtn: { padding: '4px 12px', borderRadius: 3, border: 'none', fontSize: 11, fontWeight: 'bold', cursor: 'pointer', backgroundColor: '#333', color: '#fff' },
  toolBtn: { padding: '8px 12px', backgroundColor: '#1a1a1a', color: '#fff', border: '1px solid #333', borderRadius: 6, cursor: 'pointer', width: '100%', marginTop: 4, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 'bold' },
  statsCard: { border: '1px solid #ff003c40', borderRadius: 6, padding: '10px 12px', backgroundColor: '#0a0a0a' },
  statRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2px 0', fontSize: 12 },
  statLabel: { color: '#aaa', display: 'flex', alignItems: 'center', gap: 4 },
  statValue: { color: '#ff6688', fontWeight: 500 },
  profileCardSidebar: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 },
  profileAvatarWrapper: { flexShrink: 0 },
  profileAvatar: { width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', border: '2px solid #ff003c' },
  profileAvatarPlaceholder: { width: 40, height: 40, borderRadius: '50%', backgroundColor: '#ff003c', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18, fontWeight: 'bold' },
  profileInfo: { display: 'flex', flexDirection: 'column' },
  profileName: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  profileHandle: { color: '#888', fontSize: 12, display: 'flex', alignItems: 'center', gap: 2 },
  sidebarBtn: { padding: '6px 12px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', width: '100%', marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, fontSize: 13 },
  dangerBtn: { padding: '6px 12px', backgroundColor: '#880000', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, fontSize: 13 },
  logoutBtn: { padding: '6px 12px', backgroundColor: '#880000', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', width: '100%', marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, fontSize: 13 },
  topRightButtons: { display: 'flex', gap: 8, alignItems: 'center' },
  settingsButtonTop: { backgroundColor: 'rgba(0,0,0,0.6)', border: '2px solid #333', borderRadius: 30, padding: '6px 12px', display: 'flex', alignItems: 'center', cursor: 'pointer', color: '#fff' },
  settingsBtnPC: { backgroundColor: 'rgba(0,0,0,0.6)', border: '1px solid #333', borderRadius: 16, padding: '4px 10px', display: 'flex', alignItems: 'center', cursor: 'pointer', color: '#fff', marginLeft: 6 },
  floatingBtn: { position: 'absolute', bottom: 150, right: 25, width: 56, height: 56, borderRadius: '50%', border: '2px solid', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.5)', transition: 'all 0.3s ease' },
  mainContentAndroid: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', height: '100dvh', margin: 0, padding: 0 },
  backgroundAndroid: { position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 0, background: 'radial-gradient(ellipse at center,#0a0000 0%,#000 100%)' },
  ballContainer: { position: 'relative', width: 300, height: 300, pointerEvents: 'none', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  ball3DContainer: { perspective: 800, transformStyle: 'preserve-3d' },
  ball3D: { width: 180, height: 180, borderRadius: '50%', position: 'relative', transformStyle: 'preserve-3d', background: `radial-gradient(circle at 30% 25%,rgba(255,200,220,0.9) 0%,transparent 45%),radial-gradient(circle at 40% 35%,#ff6688 0%,#ff3355 25%,#ff003c 50%,#990022 75%,#550011 100%)`, boxShadow: `inset -20px -20px 40px rgba(80,0,20,0.8),inset 15px 15px 30px rgba(255,180,200,0.4),0 0 50px rgba(255,0,60,0.5),0 0 100px rgba(255,0,60,0.3),0 0 150px rgba(255,0,60,0.15)`, animation: 'rotateGlobe 25s linear infinite' },
  ball3DSpeaking: { boxShadow: `inset -20px -20px 40px rgba(80,0,20,0.8),inset 15px 15px 30px rgba(255,180,200,0.5),0 0 80px rgba(255,0,60,0.8),0 0 150px rgba(255,0,60,0.5),0 0 220px rgba(255,0,60,0.25)`, animation: 'rotateGlobe 25s linear infinite, ballPulse 1.2s ease-in-out infinite' },
  ballHighlight: { position: 'absolute', top: '18%', left: '22%', width: '35%', height: '25%', borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(255,255,255,0.6) 0%,transparent 70%)', filter: 'blur(4px)', pointerEvents: 'none' },
  ballInnerGlow: { position: 'absolute', top: '15%', left: '15%', width: '70%', height: '70%', borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,100,140,0.2) 0%,transparent 60%)', pointerEvents: 'none' },
  ring1: { position: 'absolute', top: '50%', left: '50%', width: 240, height: 240, marginLeft: -120, marginTop: -120, borderRadius: '50%', border: '2px solid rgba(255,0,60,0.25)', animation: 'spinRing 12s linear infinite' },
  ring2: { position: 'absolute', top: '50%', left: '50%', width: 280, height: 280, marginLeft: -140, marginTop: -140, borderRadius: '50%', border: '1px solid rgba(255,0,60,0.12)', animation: 'spinRing 18s linear infinite reverse' },
  ring3: { position: 'absolute', top: '50%', left: '50%', width: 200, height: 200, marginLeft: -100, marginTop: -100, borderRadius: '50%', border: '1px dashed rgba(255,0,60,0.15)', animation: 'spinRing 8s linear infinite' },
  faceTitleAndroid: { position: 'absolute', bottom: '35%', fontSize: 'clamp(42px,6vw,68px)', fontWeight: 'bold', color: '#ff003c', textShadow: '0 0 40px #ff003c,0 0 80px #ff003c66,0 0 120px #ff003c33', letterSpacing: 10, textAlign: 'center', width: '100%', zIndex: 2, animation: 'pulseText 2.5s ease-in-out infinite', fontFamily: "'Courier New',monospace" },
  topBarAndroid: { position: 'absolute', top: 20, left: 20, right: 20, zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  callButtonTopRight: { backgroundColor: 'rgba(0,0,0,0.6)', border: '2px solid #ff003c', borderRadius: 30, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: '#ff003c', fontSize: 14, fontWeight: 'bold', letterSpacing: 1 },
  callLabelTop: { fontSize: 12, fontWeight: 'bold', letterSpacing: 1, color: '#fff' },
  listeningContainer: { position: 'absolute', top: 90, left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', alignItems: 'center', gap: 12, backgroundColor: 'rgba(0,0,0,0.5)', padding: '8px 20px', borderRadius: 30, border: '1px solid rgba(255,0,60,0.2)', backdropFilter: 'blur(10px)', flexWrap: 'wrap', justifyContent: 'center' },
  listeningDot: { width: 10, height: 10, borderRadius: '50%', backgroundColor: '#4f8', boxShadow: '0 0 20px #4f8', animation: 'pulseText 0.8s ease-in-out infinite' },
  listeningText: { color: '#fff', fontSize: 16, fontWeight: 'bold', letterSpacing: 2, fontFamily: "'Courier New',monospace" },
  interimText: { color: '#ff6688', fontSize: 14, fontStyle: 'italic', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', borderLeft: '1px solid rgba(255,0,60,0.3)', paddingLeft: 12 },
  sendInterimBtn: { backgroundColor: '#ff003c', border: 'none', borderRadius: 20, padding: '4px 14px', display: 'flex', alignItems: 'center', gap: 6, color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 'bold' },
  voiceButtonContainer: { position: 'absolute', bottom: 50, left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 },
  voiceButton: { width: 90, height: 90, borderRadius: '50%', backgroundColor: '#1a1a1a', border: '3px solid #ff003c', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, boxShadow: '0 0 40px rgba(255,0,60,0.2)' },
  voiceButtonActive: { backgroundColor: '#ff003c', borderColor: '#ff003c', boxShadow: '0 0 80px rgba(255,0,60,0.7)', animation: 'pulseGlow 1s ease-in-out infinite' },
  voiceLabel: { color: '#fff', fontSize: 12, fontWeight: 'bold', letterSpacing: 1, marginTop: 4 },
  hamburgerBtn: { position: 'absolute', top: 25, left: 25, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', zIndex: 15, padding: 8, borderRadius: 4 },
  appPC: { minHeight: '100vh', height: '100dvh', backgroundColor: '#000', color: '#e0e0e0', fontFamily: "'Segoe UI','Courier New',monospace", overflow: 'hidden', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '100vw' },
  headerPC: { padding: '6px 12px', borderBottom: '1px solid rgba(255,0,60,0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0, backgroundColor: '#0a0000', flexWrap: 'wrap', gap: 4, minHeight: 44 },
  headerLeft: { display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  titlePC: { color: '#ff003c', margin: 0, fontSize: 'clamp(16px,4vw,22px)', fontWeight: 'bold', letterSpacing: 2 },
  versionBadgePC: { fontSize: 10, color: '#ff6688', backgroundColor: '#ff003c20', padding: '2px 8px', borderRadius: 10 },
  headerRight: { display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  callBtnPC: { backgroundColor: 'rgba(0,0,0,0.6)', border: '1px solid #ff003c', borderRadius: 16, padding: '3px 10px', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', color: '#ff003c', fontSize: 11, fontWeight: 'bold' },
  voiceBtnPC: { backgroundColor: 'rgba(0,0,0,0.6)', border: '1px solid #ff003c', borderRadius: 16, padding: '3px 10px', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', color: '#ff003c', fontSize: 11, fontWeight: 'bold' },
  pcLayout: { flex: 1, display: 'flex', flexDirection: 'row', overflow: 'hidden', width: '100%', height: '100%' },
  pcSidebar: { width: 'clamp(180px,30%,280px)', backgroundColor: '#0a0a0a', overflowY: 'auto', padding: '8px 10px', flexShrink: 0, borderRight: '1px solid #333', height: '100%', boxSizing: 'border-box' },
  pcSidebarSection: { marginBottom: 12, borderBottom: '1px solid #1a1a1a', paddingBottom: 8 },
  pcSidebarTitle: { color: '#ff003c', fontSize: 12, margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 'bold' },
  pcSidebarRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2px 0', fontSize: 11, color: '#ccc' },
  pcMain: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', backgroundColor: '#050505', overflow: 'hidden', height: '100%', padding: 10 },
  pcBallContainer: { position: 'relative', width: 'clamp(160px,25vw,300px)', height: 'clamp(160px,25vw,300px)', pointerEvents: 'none', marginBottom: 10 },
  pcListeningContainer: { display: 'flex', alignItems: 'center', gap: 8, backgroundColor: 'rgba(0,0,0,0.5)', padding: '4px 16px', borderRadius: 30, border: '1px solid rgba(255,0,60,0.2)', backdropFilter: 'blur(10px)', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '90%' },
  filePreviewPC: { marginTop: 4 },
  dashBtnPC: { padding: '3px 10px', backgroundColor: '#222', color: '#fff', border: '1px solid #333', borderRadius: 4, cursor: 'pointer', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 },
  dashEmptyPC: { color: '#666', fontSize: 12, textAlign: 'center', padding: '6px 0' },
  inputRow: { display: 'flex', gap: 6, marginTop: 4, marginBottom: 6 },
  textInputSmall: { flex: 1, padding: '6px 10px', backgroundColor: '#000', border: '1px solid #333', color: '#fff', borderRadius: 4, fontSize: 13, outline: 'none' },
  sendBtnSmall: { padding: '6px 12px', backgroundColor: '#ff003c', border: 'none', borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  commandActionsPC: { display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap' },
  sidebarBtnPC: { padding: '5px 10px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', width: '100%', marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, fontSize: 12 },
  logoutBtnPC: { padding: '5px 10px', backgroundColor: '#880000', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', width: '100%', marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, fontSize: 12 },
                                                }
