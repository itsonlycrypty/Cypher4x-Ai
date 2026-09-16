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
    mobile: 'M12 2C8 2 4 4 4 8v12c0 4 4 6 8 6s8-2 8-6V8c0-4-4-6-8-6zm0 4c2 0 4 1 4 3s-2 3-4 3-4-1-4-3 2-3 4-3zm0 14c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z',
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
    plus: 'M12 5v14M5 12h14',
    terminal: 'M4 17l6-6-6-6M12 19h8',
    globe: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20',
    sun: 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42',
    calendar: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
    palette: 'M12 22a10 10 0 1 1 0-20c5.5 0 10 4.5 10 10 0 1.7-1.3 3-3 3h-1.5a1.5 1.5 0 0 0-1.5 1.5c0 .4.1.7.4 1 .3.3.6.6.6 1.2A1.8 1.8 0 0 1 12 22zM7.5 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm5-3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm5 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-5 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
    paperclip: 'M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48',
    lock: 'M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4',
    playCircle: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM10 8l6 4-6 4V8z',
    layers: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  }
  if (!p[name]) return null
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display:'inline-block', verticalAlign:'middle', flexShrink:0 }}><path d={p[name]} /></svg>
}

// ==================================================
// CONFIG
// ==================================================
const TAVILY_API_KEY = "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"
const TAVILY_URL = "https://api.tavily.com/search"
const VERSION = "v27"
const VERSION_FULL = "CYPHER4X v27.0.0"
const APP_START_TIME = Date.now()
const TOOLS_ENABLED = true 

// ==================================================
// STORAGE
// ==================================================
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
// SMART GREETING
// ==================================================
const isPureGreeting = (text) => {
  const t = text.toLowerCase().trim()
  const words = t.split(/\s+/)
  if (words.length > 4) return false
  if (/\?/.test(t)) return false
  if (/\b(teach|explain|what|how|why|when|where|who|tell|show|help)\b/.test(t)) return false
  const first = words[0].replace(/[^a-z']/g, '')
  const greetings = ['hello', 'hi', 'hey', 'yo', 'sup', 'howdy', 'hiya', 'greetings']
  if (greetings.includes(first)) return true
  if (/^(good (morning|afternoon|evening|day))$/.test(t)) return true
  if (/^(what'?s up|whats up)$/.test(t)) return true
  return false
}

// ==================================================
// KNOWLEDGE
// ==================================================
const KNOWLEDGE = [
  { match: /ethical hacking|penetration test|white ?hat|cyber ?security|cybersecurity|learn hacking/i, answer: `**Ethical Hacking — Learning Path**\n\nEthical hacking = finding vulnerabilities **legally and with permission**.\n\n**📚 Roadmap**\n1. Networking — TCP/IP, DNS, HTTP (TryHackMe Pre-Security)\n2. Linux — bash, permissions (OverTheWire Bandit)\n3. Web — HTML/CSS/JS, HTTP, cookies\n4. Programming — Python + Bash\n5. Core security — OWASP Top 10, crypto, auth\n6. Labs — TryHackMe, HackTheBox, PortSwigger\n7. Certs — Security+ → CEH → OSCP\n\n**⚠️ Rules** — Only test systems you OWN or have permission for.\n\n💡 Open **🔒 Cyber Lab** to practice.` },
  { match: /(what is|explain|define) (javascript|js)\b/i, answer: `**JavaScript**\n\nHigh-level, interpreted. Runs in browsers and on servers (Node.js).\n\n\`\`\`javascript\nconst greet = (name) => \`Hello, \${name}!\`\nconsole.log(greet('World'))\n\`\`\`` },
  { match: /(what is|explain|define) python\b/i, answer: `**Python**\n\nReadable, high-level. #1 for AI/ML, data science, automation.\n\n\`\`\`python\nfrom dataclasses import dataclass\n\n@dataclass\nclass User:\n    id: int\n    name: str\n\nfor u in [User(1, "Alice")]:\n    print(f"Hello, {u.name}!")\n\`\`\`` },
  { match: /(what is|explain) (react|react\.?js)/i, answer: `**React**\n\nJS library by Meta for UI. Component-based.\n\n\`\`\`jsx\nimport { useState } from 'react'\nexport default function Counter() {\n  const [n, setN] = useState(0)\n  return <button onClick={() => setN(n + 1)}>{n}</button>\n}\n\`\`\`` },
  { match: /(what is|explain) (ai|artificial intelligence)\b/i, answer: `**AI** — ML, Deep Learning, NLP, CV, RL, Generative AI.\n\nModern: GPT, Claude, Gemini, Llama.` },
  { match: /^(hi|hello|hey|yo|sup|howdy)\b/i, answer: `Hey there! 👋 How can I help?` },
]

// ==================================================
// APP DEEP-LINK
// ==================================================
const APP_MAP = {
  whatsapp: { name:'WhatsApp', pkg:'com.whatsapp', scheme:'whatsapp', universal:'https://wa.me/', web:'https://web.whatsapp.com' },
  whatsappbusiness: { name:'WhatsApp Business', pkg:'com.whatsapp.w4b', scheme:'whatsapp', universal:'https://wa.me/', web:'https://web.whatsapp.com' },
  instagram: { name:'Instagram', pkg:'com.instagram.android', scheme:'instagram', universal:'https://instagram.com/', web:'https://instagram.com' },
  youtube: { name:'YouTube', pkg:'com.google.android.youtube', scheme:'vnd.youtube', universal:'https://youtube.com/', web:'https://youtube.com' },
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
// DEEPSEEK-LEVEL CODE GENERATION
// ==================================================
const generateLongCode = (lang, purpose, detail) => {
  const L = lang.toLowerCase()
  
  if (L.includes('python')) {
    return `# ${purpose} - Comprehensive Implementation
# Author: Cypher4X AI
# Version: 1.0.0
# Description: A fully featured Python application designed for ${purpose}.
# Features: Error handling, logging, data persistence, CLI interface, and modular design.

import os
import sys
import json
import logging
import argparse
from datetime import datetime
from dataclasses import dataclass, asdict, field
from typing import List, Optional, Dict, Any
from enum import Enum

# ==================================================
# CONFIGURATION & LOGGING
# ==================================================
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("app.log"),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger("Cypher4XApp")

class AppConfig:
    """Centralized configuration management."""
    DATA_DIR = os.path.join(os.path.expanduser("~"), ".cypher4x_app")
    DATA_FILE = os.path.join(DATA_DIR, "data.json")
    
    @classmethod
    def ensure_dirs(cls):
        if not os.path.exists(cls.DATA_DIR):
            os.makedirs(cls.DATA_DIR)
            logger.info(f"Created data directory: {cls.DATA_DIR}")

# ==================================================
# DATA MODELS
# ==================================================
class Status(Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"

@dataclass
class Item:
    """Represents a single item in the system."""
    id: int
    title: str
    description: str = ""
    status: Status = Status.PENDING
    created_at: str = field(default_factory=lambda: datetime.now().isoformat())
    updated_at: str = field(default_factory=lambda: datetime.now().isoformat())

    def to_dict(self) -> Dict[str, Any]:
        data = asdict(self)
        data['status'] = self.status.value
        return data

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'Item':
        data['status'] = Status(data['status'])
        return cls(**data)

# ==================================================
# CORE LOGIC
# ==================================================
class AppManager:
    """Main application manager handling business logic and data persistence."""
    
    def __init__(self):
        AppConfig.ensure_dirs()
        self.items: List[Item] = []
        self.load_data()

    def load_data(self):
        """Load data from JSON file."""
        try:
            if os.path.exists(AppConfig.DATA_FILE):
                with open(AppConfig.DATA_FILE, 'r') as f:
                    data = json.load(f)
                    self.items = [Item.from_dict(i) for i in data]
                logger.info(f"Loaded {len(self.items)} items.")
            else:
                logger.info("No data file found. Starting fresh.")
        except Exception as e:
            logger.error(f"Failed to load data: {e}")
            self.items = []

    def save_data(self):
        """Save data to JSON file."""
        try:
            with open(AppConfig.DATA_FILE, 'w') as f:
                json.dump([i.to_dict() for i in self.items], f, indent=4)
            logger.info("Data saved successfully.")
        except Exception as e:
            logger.error(f"Failed to save data: {e}")

    def add_item(self, title: str, description: str = "") -> Item:
        """Add a new item to the system."""
        item_id = max([i.id for i in self.items], default=0) + 1
        new_item = Item(id=item_id, title=title, description=description)
        self.items.append(new_item)
        self.save_data()
        logger.info(f"Added item: {new_item.title}")
        return new_item

    def get_item(self, item_id: int) -> Optional[Item]:
        """Retrieve an item by ID."""
        for item in self.items:
            if item.id == item_id:
                return item
        return None

    def update_item_status(self, item_id: int, status: Status) -> bool:
        """Update the status of an item."""
        item = self.get_item(item_id)
        if item:
            item.status = status
            item.updated_at = datetime.now().isoformat()
            self.save_data()
            logger.info(f"Updated item {item_id} status to {status.value}")
            return True
        logger.warning(f"Item {item_id} not found.")
        return False

    def list_items(self, status_filter: Optional[Status] = None) -> List[Item]:
        """List all items, optionally filtered by status."""
        if status_filter:
            return [i for i in self.items if i.status == status_filter]
        return self.items

# ==================================================
# CLI INTERFACE
# ==================================================
def main():
    parser = argparse.ArgumentParser(description=f"${purpose} - A comprehensive CLI tool.")
    subparsers = parser.add_subparsers(dest="command", help="Available commands")

    # Command: add
    parser_add = subparsers.add_parser("add", help="Add a new item")
    parser_add.add_argument("title", type=str, help="Title of the item")
    parser_add.add_argument("-d", "--description", type=str, default="", help="Description of the item")

    # Command: list
    parser_list = subparsers.add_parser("list", help="List items")
    parser_list.add_argument("-s", "--status", type=str, choices=[s.value for s in Status], help="Filter by status")

    # Command: update
    parser_update = subparsers.add_parser("update", help="Update item status")
    parser_update.add_argument("id", type=int, help="ID of the item")
    parser_update.add_argument("status", type=str, choices=[s.value for s in Status], help="New status")

    args = parser.parse_args()
    manager = AppManager()

    if args.command == "add":
        item = manager.add_item(args.title, args.description)
        print(f"✅ Added item: [{item.id}] {item.title}")
    elif args.command == "list":
        status_filter = Status(args.status) if args.status else None
        items = manager.list_items(status_filter)
        if not items:
            print("No items found.")
        else:
            print(f"{'ID':<5} {'Status':<15} {'Title':<30}")
            print("-" * 50)
            for item in items:
                print(f"{item.id:<5} {item.status.value:<15} {item.title:<30}")
    elif args.command == "update":
        success = manager.update_item_status(args.id, Status(args.status))
        if success:
            print(f"✅ Updated item {args.id} to {args.status}")
        else:
            print(f"❌ Item {args.id} not found.")
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
`
  }

  if (L.includes('react') || L.includes('jsx')) {
    return `// ${purpose} - Comprehensive React Application
// Author: Cypher4X AI
// Version: 1.0.0
// Description: A fully featured React app designed for ${purpose}.
// Features: State management, API integration, Error boundaries, Loading states, Responsive design.

import React, { useState, useEffect, useReducer, useCallback, useMemo } from 'react';

// ==================================================
// API SERVICE LAYER
// ==================================================
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.example.com';

const apiService = {
  async fetchItems() {
    try {
      const response = await fetch(\`\${API_BASE_URL}/items\`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  },
  
  async createItem(itemData) {
    try {
      const response = await fetch(\`\${API_BASE_URL}/items\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData)
      });
      if (!response.ok) throw new Error('Failed to create item');
      return await response.json();
    } catch (error) {
      console.error('Error creating item:', error);
      throw error;
    }
  },
  
  async deleteItem(id) {
    try {
      const response = await fetch(\`\${API_BASE_URL}/items/\${id}\`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete item');
      return true;
    } catch (error) {
      console.error('Error deleting item:', error);
      throw error;
    }
  }
};

// ==================================================
// STATE MANAGEMENT (useReducer)
// ==================================================
const initialState = {
  items: [],
  isLoading: false,
  error: null,
  filter: 'all'
};

function appReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, items: action.payload };
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'DELETE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

// ==================================================
// CUSTOM HOOKS
// ==================================================
function useItems() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const loadItems = useCallback(async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const data = await apiService.fetchItems();
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  }, []);

  const addItem = useCallback(async (itemData) => {
    try {
      const newItem = await apiService.createItem(itemData);
      dispatch({ type: 'ADD_ITEM', payload: newItem });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  }, []);

  const deleteItem = useCallback(async (id) => {
    try {
      await apiService.deleteItem(id);
      dispatch({ type: 'DELETE_ITEM', payload: id });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  return { ...state, addItem, deleteItem, loadItems };
}

// ==================================================
// COMPONENTS
// ==================================================
function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);
  
  if (hasError) {
    return (
      <div className="error-boundary">
        <h2>Something went wrong.</h2>
        <button onClick={() => window.location.reload()}>Reload Page</button>
      </div>
    );
  }
  return children;
}

function ItemCard({ item, onDelete }) {
  return (
    <div className="item-card">
      <div className="item-header">
        <h3>{item.title}</h3>
        <span className={\`status \${item.status}\`}>{item.status}</span>
      </div>
      <p>{item.description}</p>
      <button className="delete-btn" onClick={() => onDelete(item.id)}>Delete</button>
    </div>
  );
}

function AddItemForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title, description, status: 'pending' });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <input 
        type="text" 
        placeholder="Item Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required 
      />
      <textarea 
        placeholder="Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
      />
      <button type="submit">Add Item</button>
    </form>
  );
}

// ==================================================
// MAIN APP COMPONENT
// ==================================================
export default function App() {
  const { items, isLoading, error, filter, addItem, deleteItem, loadItems } = useItems();

  const filteredItems = useMemo(() => {
    if (filter === 'all') return items;
    return items.filter(item => item.status === filter);
  }, [items, filter]);

  return (
    <ErrorBoundary>
      <div className="app-container">
        <header className="app-header">
          <h1>${purpose}</h1>
          <p>Powered by Cypher4X AI</p>
        </header>

        <main className="app-main">
          <AddItemForm onAdd={addItem} />
          
          <div className="controls">
            <button onClick={loadItems} disabled={isLoading}>
              {isLoading ? 'Refreshing...' : 'Refresh'}
            </button>
            <select value={filter} onChange={(e) => dispatch({ type: 'SET_FILTER', payload: e.target.value })}>
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {error && <div className="error-message">{error}</div>}

          {isLoading && items.length === 0 ? (
            <div className="loading">Loading items...</div>
          ) : (
            <div className="items-grid">
              {filteredItems.map(item => (
                <ItemCard key={item.id} item={item} onDelete={deleteItem} />
              ))}
              {filteredItems.length === 0 && <p>No items found.</p>}
            </div>
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
}
`
  }

  // Default fallback for JavaScript
  return `// ${purpose} - Comprehensive JavaScript Implementation
// Author: Cypher4X AI
// Version: 1.0.0
// Description: A fully featured JavaScript application designed for ${purpose}.
// Features: Modular design, Event handling, DOM manipulation, LocalStorage persistence.

'use strict';

// ==================================================
// UTILITY FUNCTIONS
// ==================================================
const Utils = {
  generateId: () => \`id_\${Math.random().toString(36).substr(2, 9)}_\${Date.now()}\`,
  
  formatDate: (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).format(new Date(date));
  },
  
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => { clearTimeout(timeout); func(...args); };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
};

// ==================================================
// STATE MANAGEMENT
// ==================================================
class StateManager {
  constructor(initialState = {}) {
    this.state = initialState;
    this.listeners = [];
  }

  getState() { return this.state; }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => { this.listeners = this.listeners.filter(l => l !== listener); };
  }

  notify() { this.listeners.forEach(listener => listener(this.state)); }
}

// ==================================================
// STORAGE LAYER
// ==================================================
class StorageService {
  static save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('Storage save failed:', e);
      return false;
    }
  }

  static load(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error('Storage load failed:', e);
      return defaultValue;
    }
  }
}

// ==================================================
// CORE APPLICATION LOGIC
// ==================================================
class AppController {
  constructor() {
    this.storageKey = 'cypher4x_app_data';
    this.stateManager = new StateManager({
      items: StorageService.load(this.storageKey, []),
      isProcessing: false,
      error: null
    });

    this.init();
  }

  init() {
    console.log('Initializing ${purpose}...');
    this.render();
    this.attachEventListeners();
  }

  addItem(itemData) {
    const newItem = {
      id: Utils.generateId(),
      ...itemData,
      createdAt: new Date().toISOString()
    };
    
    const currentItems = this.stateManager.getState().items;
    const updatedItems = [...currentItems, newItem];
    
    this.stateManager.setState({ items: updatedItems });
    StorageService.save(this.storageKey, updatedItems);
    
    console.log('Added item:', newItem);
    this.render();
  }

  removeItem(id) {
    const currentItems = this.stateManager.getState().items;
    const updatedItems = currentItems.filter(item => item.id !== id);
    
    this.stateManager.setState({ items: updatedItems });
    StorageService.save(this.storageKey, updatedItems);
    
    console.log('Removed item:', id);
    this.render();
  }

  render() {
    const container = document.getElementById('app-root') || document.body;
    const { items } = this.stateManager.getState();

    container.innerHTML = \`
      <div class="app-wrapper">
        <header>
          <h1>${purpose}</h1>
        </header>
        <main>
          <button id="add-btn">Add New Item</button>
          <div id="items-list">
            \${items.length === 0 ? '<p>No items yet.</p>' : items.map(item => \`
              <div class="item">
                <span>\${item.title}</span>
                <small>\${Utils.formatDate(item.createdAt)}</small>
                <button class="delete-btn" data-id="\${item.id}">X</button>
              </div>
            \`).join('')}
          </div>
        </main>
      </div>
    \`;
  }

  attachEventListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.id === 'add-btn') {
        const title = prompt('Enter item title:');
        if (title) this.addItem({ title });
      }
      
      if (e.target.classList.contains('delete-btn')) {
        const id = e.target.getAttribute('data-id');
        if (confirm('Delete this item?')) this.removeItem(id);
      }
    });
  }
}

// ==================================================
// BOOTSTRAP
// ==================================================
document.addEventListener('DOMContentLoaded', () => {
  window.app = new AppController();
});
`
}

const isCodeRequest = (q) => {
  const x = q.toLowerCase()
  return ['generate code','write code','create code','make code','build code','code for','code to','function in','write me a'].some(k => x.includes(k))
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
// WEATHER (Open-Meteo, free no key)
// ==================================================
const fetchWeather = async (lat, lon) => {
  try {
    const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`)
    const d = await r.json()
    return { temp: d.current?.temperature_2m, code: d.current?.weather_code }
  } catch (e) { return null }
}

// ==================================================
// LOCAL MUSIC SYNTH
// ==================================================
const MUSIC_STYLES = {
  love: { scale: 'major', bpm: 78, root: 60, prog: [[0,4,7],[5,9,12],[7,11,14],[5,9,12]] },
  pink: { scale: 'major', bpm: 100, root: 62, prog: [[0,4,7],[9,12,16],[5,9,12],[7,11,14]] },
  sad: { scale: 'minor', bpm: 68, root: 57, prog: [[0,3,7],[5,8,12],[7,10,14],[3,7,10]] },
  happy: { scale: 'major', bpm: 128, root: 60, prog: [[0,4,7],[7,11,14],[9,12,16],[5,9,12]] },
  chill: { scale: 'pentatonic', bpm: 88, root: 60, prog: [[0,4,7],[5,9,12],[7,11,14],[5,9,12]] },
  epic: { scale: 'minor', bpm: 140, root: 55, prog: [[0,3,7],[5,8,12],[8,12,15],[7,10,14]] },
  default: { scale: 'major', bpm: 118, root: 60, prog: [[0,4,7],[5,9,12],[7,11,14],[5,9,12]] },
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
const leadNote = (c, t, dur, f, dst) => { const o = c.createOscillator(); o.type = 'triangle'; o.frequency.value = f; const v = c.createOscillator(); v.frequency.value = 5; const vg = c.createGain(); vg.gain.value = 3; v.connect(vg).connect(o.frequency); const g = c.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.28, t + 0.03); g.gain.exponentialRampToValueAtTime(0.001, t + dur); o.connect(g).connect(dst); o.start(t); v.start(t); o.stop(t + dur + 0.1); v.stop(t + dur + 0.1) }
function generateRichMelody(bpm, scale, bars) {
  const scales = { major: [0,2,4,5,7,9,11], minor: [0,2,3,5,7,8,10], pentatonic: [0,2,4,7,9] }
  const s = scales[scale] || scales.major
  const beat = 60 / bpm
  const notes = []
  for (let b = 0; b < bars * 4; b++) {
    if (Math.random() < 0.15) { notes.push({ t: b * beat, freq: 0, dur: beat * 0.5 }); continue }
    const deg = s[Math.floor(Math.random() * s.length)]
    const oct = Math.random() < 0.3 ? 12 : 0
    notes.push({ t: b * beat, freq: m2hz(60 + deg + oct), dur: beat * (Math.random() < 0.3 ? 1 : 0.5) })
  }
  return notes
}
function playRichMelody(notes, quality = 'medium', bpm = 120) {
  const Ctx = window.AudioContext || window.webkitAudioContext
  if (!Ctx) throw new Error('Web Audio not supported')
  const ctx = new Ctx()
  const master = ctx.createGain(); master.gain.value = 0.7; master.connect(ctx.destination)
  const dbus = ctx.createGain(); dbus.gain.value = quality === 'low' ? 0.4 : 0.7; dbus.connect(master)
  const mbus = ctx.createGain(); mbus.gain.value = 0.8; mbus.connect(master)
  const beat = 60 / bpm
  const start = ctx.currentTime + 0.05
  const totalBars = Math.ceil(notes.length / 4)
  for (let b = 0; b < totalBars * 4; b++) {
    const t = start + b * beat
    if (b % 4 === 0 || b % 4 === 2) kick(ctx, t, dbus)
    if (b % 4 === 1 || b % 4 === 3) snare(ctx, t, dbus)
    hihat(ctx, t, dbus, b % 4 === 3)
    hihat(ctx, t + beat / 2, dbus, false)
  }
  notes.forEach(n => {
    if (!n.freq) return
    const t = start + n.t
    leadNote(ctx, t, n.dur, n.freq, mbus)
    if (quality !== 'low' && Math.random() < 0.4) bassNote(ctx, t, beat * 0.9, n.freq / 2, mbus)
  })
  const totalDur = notes.reduce((m, n) => Math.max(m, n.t + n.dur), 0) + 1
  return { ctx, duration: totalDur }
}

// ==================================================
// LOCAL VIDEO ENGINE
// ==================================================
const VIDEO_STYLES = {
  anime: { palette: ['#ffb6d5','#ff4f9a','#ffffff','#ffd1e8'], label: 'Anime', scene: 'sakura' },
  movie: { palette: ['#0b0b0b','#1a1a2e','#ffcc00','#e94560'], label: 'Cinematic', scene: 'movie' },
  cartoon: { palette: ['#ffe066','#ff6b6b','#4ecdc4','#a8e6cf'], label: 'Cartoon', scene: 'cartoon' },
  cyber: { palette: ['#00ff41','#008f11','#0d0208','#ff003c'], label: 'Cyberpunk', scene: 'matrix' },
  nature: { palette: ['#2ecc71','#27ae60','#f39c12','#a8e6cf'], label: 'Nature', scene: 'nature' },
  space: { palette: ['#000','#1a0033','#ff00ff','#00ffff'], label: 'Space', scene: 'space' },
  abstract: { palette: ['#ff003c','#ff69b4','#ffa500','#00ffff'], label: 'Abstract', scene: 'blobs' },
  default: { palette: ['#ff003c','#ff6688','#ffa500','#ffff00'], label: 'Default', scene: 'particles' },
}
const guessVideoStyle = (d) => {
  const x = (d || '').toLowerCase()
  for (const k of Object.keys(VIDEO_STYLES)) if (x.includes(k)) return VIDEO_STYLES[k]
  return VIDEO_STYLES.default
}
function drawWatermark(ctx, W, H, text) {
  ctx.save(); ctx.font = 'bold 14px monospace'; ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.textAlign = 'right'; ctx.fillText(text, W - 12, H - 12)
  ctx.font = '11px monospace'; ctx.fillStyle = 'rgba(255,0,60,0.75)'; ctx.fillText(VERSION, W - 12, H - 28); ctx.restore()
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
    else if (scene === 'space') { const g = ctx.createRadialGradient(W/2,H/2,20,W/2,H/2,W); g.addColorStop(0,'#1a0033'); g.addColorStop(1,'#000'); ctx.fillStyle = g; ctx.fillRect(0,0,W,H); stars.forEach(s => { ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fillStyle = `rgba(255,255,255,${0.3+Math.random()*0.7})`; ctx.fill(); s.x -= 0.15; if (s.x < 0) s.x = W }); const px = W/2 + Math.sin(t)*30, py = H/2; const pg = ctx.createRadialGradient(px-15,py-15,5,px,py,60); pg.addColorStop(0,'#ff00ff'); pg.addColorStop(1,'#330033'); ctx.beginPath(); ctx.arc(px,py,55,0,Math.PI*2); ctx.fillStyle = pg; ctx.fill() }
    else if (scene === 'movie') { ctx.fillStyle = '#0b0b0b'; ctx.fillRect(0,0,W,H); ctx.fillStyle = '#000'; ctx.fillRect(0,0,W,H*0.12); ctx.fillRect(0,H*0.88,W,H*0.12); const creds = ['CYPHER4X PRODUCTIONS','directed by You','cinematography · AI','starring · Characters','music · Synth Engine','A CYPHER4X FILM']; ctx.font = '14px monospace'; ctx.textAlign = 'center'; creds.forEach((l, i) => { const y = (t*40+i*40)%H; if (y > H*0.15 && y < H*0.85) { ctx.fillStyle = i === 0 ? '#ffcc00' : 'rgba(255,255,255,0.8)'; ctx.fillText(l, W/2, y) } }) }
    else if (scene === 'sakura') { const g = ctx.createLinearGradient(0,0,0,H); g.addColorStop(0,'#ffb6d5'); g.addColorStop(1,'#ff4f9a'); ctx.fillStyle = g; ctx.fillRect(0,0,W,H); ctx.beginPath(); ctx.arc(W*0.78,H*0.22,40,0,Math.PI*2); ctx.fillStyle = '#fff8d6'; ctx.fill(); parts.forEach(p => { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.beginPath(); ctx.ellipse(0,0,p.r*2.5,p.r,0,0,Math.PI*2); ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.fill(); ctx.restore(); p.y += 1.2; p.x += Math.sin(t + p.y * 0.05) * 0.8; p.rot += 0.02; if (p.y > H) { p.y = -10; p.x = Math.random() * W } }) }
    else if (scene === 'nature') { const g = ctx.createLinearGradient(0,0,0,H); g.addColorStop(0,'#87ceeb'); g.addColorStop(1,'#2ecc71'); ctx.fillStyle = g; ctx.fillRect(0,0,W,H); ctx.beginPath(); ctx.arc(W*0.2,H*0.18,30,0,Math.PI*2); ctx.fillStyle = '#f39c12'; ctx.fill(); ctx.beginPath(); ctx.moveTo(0,H*0.7); for (let x = 0; x <= W; x += 20) ctx.lineTo(x, H*0.7 + Math.sin(x*0.02+t)*20); ctx.lineTo(W,H); ctx.lineTo(0,H); ctx.closePath(); ctx.fillStyle = '#27ae60'; ctx.fill(); parts.forEach(p => { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.beginPath(); ctx.ellipse(0,0,p.r*2,p.r*0.8,0,0,Math.PI*2); ctx.fillStyle = 'rgba(46,204,113,0.9)'; ctx.fill(); ctx.restore(); p.y += 0.8; p.x += Math.sin(t + p.x * 0.05) * 0.6; p.rot += 0.02; if (p.y > H) { p.y = -10; p.x = Math.random() * W } }) }
    else if (scene === 'cartoon') { const g = ctx.createLinearGradient(0,0,W,H); g.addColorStop(0,'#ffe066'); g.addColorStop(1,'#ff6b6b'); ctx.fillStyle = g; ctx.fillRect(0,0,W,H); parts.slice(0,20).forEach((p, i) => { const x = (i*W/20 + t*20)%W; const y = H*0.5 + Math.sin(t*3+i)*60; ctx.beginPath(); if (i%3===0) ctx.arc(x,y,20,0,Math.PI*2); else if (i%3===1) ctx.rect(x-15,y-15,30,30); else { ctx.moveTo(x,y-20); ctx.lineTo(x+20,y+15); ctx.lineTo(x-20,y+15); ctx.closePath() } ctx.fillStyle = ['#4ecdc4','#a8e6cf','#ffffff'][i%3]; ctx.fill() }) }
    else if (scene === 'blobs') { ctx.fillStyle = '#000'; ctx.fillRect(0,0,W,H); parts.forEach(p => { ctx.beginPath(); ctx.arc(p.x,p.y,p.r*5,0,Math.PI*2); const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*5); g.addColorStop(0, p.c + 'cc'); g.addColorStop(1, p.c + '00'); ctx.fillStyle = g; ctx.fill(); p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1 }) }
    else { const g = ctx.createLinearGradient(0,0,W,H); g.addColorStop(0, pal[0]); g.addColorStop(1, pal[1] || pal[0]); ctx.fillStyle = g; ctx.fillRect(0,0,W,H); parts.forEach(p => { ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle = p.c; ctx.fill(); p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1 }) }
    ctx.save(); ctx.textAlign = 'center'; ctx.font = 'bold 42px sans-serif'; ctx.fillStyle = 'rgba(255,255,255,0.95)'; ctx.shadowColor = 'rgba(0,0,0,0.7)'; ctx.shadowBlur = 12; ctx.fillText('CYPHER4X', W/2, H/2 - 8); ctx.font = '16px sans-serif'; ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.fillText(style.label + ' Style', W/2, H/2 + 22); if (userDesc) { ctx.font = 'italic 13px sans-serif'; ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.fillText('"' + userDesc.slice(0, 40) + '"', W/2, H/2 + 50) } ctx.restore()
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
// RED BALL — colors from theme
// ==================================================
const RedBall = ({ isSpeaking = false, theme = {}, size = 180 }) => {
  const c = theme.ballColor || '#ff003c'
  const c2 = theme.ballColorLight || lightenColor(c)
  const c3 = theme.ballColorDark || darkenColor(c)
  const scale = size / 180
  return (
    <div style={{...styles.ballContainer, width: 300 * scale, height: 300 * scale}}>
      <div style={{ ...styles.ring1, width: 240*scale, height: 240*scale, marginLeft: -120*scale, marginTop: -120*scale, borderColor: hexA(c, 0.25) }} />
      <div style={{ ...styles.ring2, width: 280*scale, height: 280*scale, marginLeft: -140*scale, marginTop: -140*scale, borderColor: hexA(c, 0.12) }} />
      <div style={{ ...styles.ring3, width: 200*scale, height: 200*scale, marginLeft: -100*scale, marginTop: -100*scale, borderColor: hexA(c, 0.15) }} />
      <div style={styles.ball3DContainer}>
        <div style={{
          ...styles.ball3D,
          width: size, height: size,
          background: `radial-gradient(circle at 30% 25%, ${hexA(c2, 0.9)} 0%, transparent 45%), radial-gradient(circle at 40% 35%, ${c2} 0%, ${c} 25%, ${c} 50%, ${c3} 75%, ${darkenColor(c3)} 100%)`,
          boxShadow: `inset -20px -20px 40px ${hexA(c3, 0.8)}, inset 15px 15px 30px ${hexA(c2, 0.4)}, 0 0 50px ${hexA(c, 0.5)}, 0 0 100px ${hexA(c, 0.3)}, 0 0 150px ${hexA(c, 0.15)}`,
          ...(isSpeaking ? {
            boxShadow: `inset -20px -20px 40px ${hexA(c3, 0.8)}, inset 15px 15px 30px ${hexA(c2, 0.5)}, 0 0 80px ${hexA(c, 0.8)}, 0 0 150px ${hexA(c, 0.5)}, 0 0 220px ${hexA(c, 0.25)}`,
            animation: 'ballShake 0.35s ease-in-out infinite'
          } : {})
        }}>
          <div style={styles.ballHighlight} />
          <div style={styles.ballInnerGlow} />
        </div>
      </div>
    </div>
  )
}

// color helpers
function hexA(hex, a) {
  if (!hex || !hex.startsWith('#')) return hex
  const r = parseInt(hex.slice(1,3), 16), g = parseInt(hex.slice(3,5), 16), b = parseInt(hex.slice(5,7), 16)
  return `rgba(${r},${g},${b},${a})`
}
function lightenColor(hex) {
  if (!hex || !hex.startsWith('#')) return hex
  const r = Math.min(255, parseInt(hex.slice(1,3),16) + 70)
  const g = Math.min(255, parseInt(hex.slice(3,5),16) + 70)
  const b = Math.min(255, parseInt(hex.slice(5,7),16) + 70)
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`
}
function darkenColor(hex) {
  if (!hex || !hex.startsWith('#')) return hex
  const r = Math.max(0, parseInt(hex.slice(1,3),16) - 60)
  const g = Math.max(0, parseInt(hex.slice(3,5),16) - 60)
  const b = Math.max(0, parseInt(hex.slice(5,7),16) - 60)
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`
}

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

  // --- INTRO SEQUENCE ---
  const [showIntro, setShowIntro] = useState(true)
  const [introStep, setIntroStep] = useState(0)
  
  // --- BOOT & LOADING SEQUENCE ---
  const [isBooting, setIsBooting] = useState(false) 
  const [isEnteringAI, setIsEnteringAI] = useState(false)
  const [enterProgress, setEnterProgress] = useState(0)
  const [enterMessage, setEnterMessage] = useState('Updating...')

  const [viewMode, setViewMode] = useState('android'); const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [backgroundImage, setBackgroundImage] = useState(null)
  const [showChatMenu, setShowChatMenu] = useState(false)

  // --- WORKSPACE MODE ---
  const [showWorkspace, setShowWorkspace] = useState(false)
  const [workspaceTasks, setWorkspaceTasks] = useState([])
  const [workspaceActiveTab, setWorkspaceActiveTab] = useState('canvas') 
  const [workspaceContent, setWorkspaceContent] = useState(null) 
  const [workspaceCommand, setWorkspaceCommand] = useState('')
  const [workspaceProcessing, setWorkspaceProcessing] = useState(false)
  const [workspaceLogs, setWorkspaceLogs] = useState([{ type: 'system', text: 'Workspace initialized. Awaiting command...' }])

  // ----- THEME -----
  const [theme, setTheme] = useState({
    primary: '#ff003c',
    secondary: '#000000',
    ballColor: '#ff003c',
    ballColorLight: '#ff6688',
    ballColorDark: '#990022',
    backgroundImage: null,
  })

  const [settings, setSettings] = useState({
    welcomeEnabled: true, autoStartVoice: true, voiceSpeed: 1,
    secretMode: false, overlayButton: false, safeLinks: true, autoScroll: true, haptic: true,
    soundFx: false, showTimestamps: true, typingIndicator: true, readAloud: false,
    highContrast: false, compactMode: false, codeAutoOverview: true, confirmDelete: true,
    restrictTools: true,       
    locationEnabled: false,    
  })

  // ----- DASHBOARD (date/time/day/temp) -----
  const [now, setNow] = useState(new Date())
  const [weather, setWeather] = useState(null)

  // MULTI-CHAT
  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem('cypher4x_chats')
    return saved ? JSON.parse(saved) : [{ id: 'default-' + Date.now(), title: 'Chat 1', messages: [], createdAt: Date.now() }]
  })
  const [activeChatId, setActiveChatId] = useState(() => localStorage.getItem('cypher4x_active_chat') || null)
  const conversation = chats.find(c => c.id === activeChatId)?.messages || []
  const setConversation = (updater) => {
    setChats(prev => prev.map(c => {
      if (c.id !== activeChatId) return c
      const newMessages = typeof updater === 'function' ? updater(c.messages) : updater
      return { ...c, messages: newMessages }
    }))
  }

  const [showChatOverview, setShowChatOverview] = useState(false)
  const [chatOverviewInput, setChatOverviewInput] = useState(''); const [chatOverviewListening, setChatOverviewListening] = useState(false)
  const [chatOverviewVoiceEnabled, setChatOverviewVoiceEnabled] = useState(true)
  const [isRecordingVoice, setIsRecordingVoice] = useState(false); const [voicePaused, setVoicePaused] = useState(false)
  const [voiceTranscript, setVoiceTranscript] = useState(''); const chatOverviewRecognitionRef = useRef(null)
  const [showRotateOverlay, setShowRotateOverlay] = useState(false)
  const [inputText, setInputText] = useState('')
  const [commandHistory, setCommandHistory] = useState([])
  const [isCallActive, setIsCallActive] = useState(false); const [isFullscreenCall, setIsFullscreenCall] = useState(false)
  const [isListening, setIsListening] = useState(false); const [isProcessing, setIsProcessing] = useState(false)
  const [isRecording, setIsRecording] = useState(false); const [isAISpeaking, setIsAISpeaking] = useState(false)
  const [interimTranscript, setInterimTranscript] = useState(''); const [recordingMode, setRecordingMode] = useState(false)
  const [voiceGender, setVoiceGender] = useState('female')
  const [stats, setStats] = useState({ uptime: 0, cpuUsage: 0, cpuTemp: 0, ramUsage: 0, storageUsed: 0, networkSpeed: 0 })
  const [overlayActive, setOverlayActive] = useState(false); const [overlayListening, setOverlayListening] = useState(false)
  const overlayRecognitionRef = useRef(null)
  const [pendingCode, setPendingCode] = useState(null); const [copiedId, setCopiedId] = useState(null)
  const [replyingTo, setReplyingTo] = useState(null)

  // MUSIC
  const [showMusicPanel, setShowMusicPanel] = useState(false)
  const [musicDesc, setMusicDesc] = useState(''); const [musicDuration, setMusicDuration] = useState(30)
  const [musicQuality, setMusicQuality] = useState('high'); const [musicPlaying, setMusicPlaying] = useState(false)
  const [musicInfo, setMusicInfo] = useState(''); const [musicDownloadUrl, setMusicDownloadUrl] = useState(null)
  const [musicGenerating, setMusicGenerating] = useState(false); const [musicAudioRef, setMusicAudioRef] = useState(null)

  // VIDEO
  const [showVideoPanel, setShowVideoPanel] = useState(false)
  const [videoDesc, setVideoDesc] = useState(''); const [videoDuration, setVideoDuration] = useState(5)
  const [videoQuality, setVideoQuality] = useState('medium'); const [videoGenerating, setVideoGenerating] = useState(false)
  const [videoTaskId, setVideoTaskId] = useState(null); const [videoResultUrl, setVideoResultUrl] = useState(null)
  const [videoInfo, setVideoInfo] = useState(''); const [videoPolling, setVideoPolling] = useState(false)
  const [videoRecording, setVideoRecording] = useState(false)
  const [videoProgress, setVideoProgress] = useState(0)
  const canvasRef = useRef(null); const videoRecorderRef = useRef(null)

  // CYBER LAB
  const [showCyberLab, setShowCyberLab] = useState(false); const [cyberTab, setCyberTab] = useState('terminal')
  const [cyberInput, setCyberInput] = useState(''); const [cyberLines, setCyberLines] = useState([
    { type: 'info', text: `${VERSION_FULL} Terminal — type "help" for commands` },
    { type: 'info', text: '⚠️ Simulated shell. Educational use only.' },
  ])
  const [cyberToolOutput, setCyberToolOutput] = useState(''); const [cyberTool, setCyberTool] = useState('passcheck')
  const [cyberToolInput, setCyberToolInput] = useState(''); const [ctfChallenge, setCtfChallenge] = useState(null)
  const cyberEndRef = useRef(null)

  const synthRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null)
  const recognitionRef = useRef(null); const msgCounter = useRef(0)
  const fileInputRef = useRef(null); const bgInputRef = useRef(null); const chatEndRef = useRef(null)
  const workspaceEndRef = useRef(null)

  const hasGreeted = useRef(false)

  const playBeep = useCallback((f = 800, d = 0.08) => {
    if (!settings.soundFx) return
    try { const C = window.AudioContext || window.webkitAudioContext; if (!C) return; const c = new C(); const o = c.createOscillator(); const g = c.createGain(); o.frequency.value = f; o.type = 'sine'; g.gain.setValueAtTime(0.1, c.currentTime); g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + d); o.connect(g).connect(c.destination); o.start(); o.stop(c.currentTime + d) } catch {}
  }, [settings.soundFx])
  const vibrate = useCallback((p = 10) => { if (!settings.haptic) return; try { navigator.vibrate && navigator.vibrate(p) } catch {} }, [settings.haptic])

  // ==================================================
  // INTRO & BOOT SEQUENCE
  // ==================================================
  useEffect(() => {
    if (!showIntro) return
    const t1 = setTimeout(() => setIntroStep(1), 1000)
    const t2 = setTimeout(() => setIntroStep(2), 3500)
    const t3 = setTimeout(() => { setShowIntro(false); setIsBooting(false); setIsEnteringAI(true) }, 6000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [showIntro])

  // ENTRY LOADING SCREEN (12s)
  useEffect(() => {
    if (!isEnteringAI) return
    setEnterProgress(0); setEnterMessage('Updating...')
    const messages = [
      { at: 0, text: 'Updating...' }, { at: 25, text: 'Loading engine...' },
      { at: 50, text: 'Syncing data...' }, { at: 75, text: 'Almost ready...' }, { at: 95, text: 'Welcome!' },
    ]
    const start = Date.now(), duration = 12000
    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      const pct = Math.min((elapsed / duration) * 100, 100)
      setEnterProgress(pct)
      let cur = messages[0].text
      for (const m of messages) { if (pct >= m.at) cur = m.text }
      setEnterMessage(cur)
      if (pct >= 100) { clearInterval(interval); setIsEnteringAI(false) }
    }, 100)
    return () => clearInterval(interval)
  }, [isEnteringAI])

  // Clock — updates every 30s
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(t)
  }, [])

  // Weather — if enabled
  useEffect(() => {
    if (!settings.locationEnabled) return
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const w = await fetchWeather(pos.coords.latitude, pos.coords.longitude)
        if (w) setWeather(w)
      },
      () => {},
      { timeout: 5000 }
    )
    const refresh = setInterval(() => {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const w = await fetchWeather(pos.coords.latitude, pos.coords.longitude)
        if (w) setWeather(w)
      }, () => {}, { timeout: 5000 })
    }, 600000) // 10 min
    return () => clearInterval(refresh)
  }, [settings.locationEnabled])

  // PERSIST
  useEffect(() => { try { localStorage.setItem('cypher4x_chats', JSON.stringify(chats)) } catch {} }, [chats])
  useEffect(() => { if (activeChatId) try { localStorage.setItem('cypher4x_active_chat', activeChatId) } catch {} }, [activeChatId])
  useEffect(() => { if (!activeChatId && chats.length > 0) setActiveChatId(chats[0].id) }, [chats, activeChatId])
  useEffect(() => { if (settings.autoScroll && showChatOverview) chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [conversation, showChatOverview, settings.autoScroll])
  useEffect(() => { cyberEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [cyberLines])
  useEffect(() => { workspaceEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [workspaceLogs, workspaceTasks])

  // AUTH
  const handleAuthSubmit = () => {
    if (!email || !pin || pin.length !== 4 || !/^\d{4}$/.test(pin)) { setAuthError('Valid email + 4-digit PIN required.'); return }
    if (showLogin) { if (userExists(email, pin)) { loginUser(email, pin); setShowAuthModal(false) } else setAuthError('No account found.') }
    else {
      if (userExists(email, pin)) { setAuthError('Account exists.'); return }
      addUser(email, pin)
      saveUserData(email, pin, { profile: null, chats: [{ id: 'chat-' + Date.now(), title: 'Chat 1', messages: [], createdAt: Date.now() }], commandHistory: [], personality: 'polite', backgroundImage: null, customStyle: null, theme, settings })
      loginUser(email, pin); setShowAuthModal(false)
    }
  }
  const loginUser = (e, p) => { saveAuth(e, p); setUserMode('loggedin'); loadUserDataByEmail(e, p); setAuthError(''); setGuestMessageCount(0); hasGreeted.current = false }
  const loadUserDataByEmail = (e, p) => {
    const d = loadUserData(e, p)
    if (d) {
      setProfile(d.profile || null); setCommandHistory(d.commandHistory || [])
      setBackgroundImage(d.backgroundImage || null)
      if (d.theme) setTheme(d.theme)
      if (d.settings) setSettings({ ...settings, ...d.settings })
      if (d.chats && d.chats.length) { setChats(d.chats); setActiveChatId(d.activeChatId || d.chats[0].id) }
    }
  }
  const saveCurrentUserData = () => {
    if (userMode !== 'loggedin') return
    saveUserData(email, pin, { profile, chats, activeChatId, commandHistory, backgroundImage, theme, settings })
  }
  useEffect(() => { if (userMode === 'loggedin') saveCurrentUserData() }, [profile, chats, activeChatId, commandHistory, backgroundImage, theme, settings])

  const handleLogout = () => {
    if (!confirm('Logout?')) return
    clearAuth(); setUserMode('guest'); setProfile(null); setChats([{ id: 'default-' + Date.now(), title: 'Chat 1', messages: [], createdAt: Date.now() }])
    setCommandHistory([]); setSidebarOpen(false); setGuestMessageCount(0); setShowAuthModal(false); msgCounter.current = 0
    hasGreeted.current = false
  }
  const incrementGuestMessage = () => { if (userMode !== 'guest') return; const n = guestMessageCount + 1; setGuestMessageCount(n); if (n >= 5) setShowGuestLimit(true) }

  const requireLogin = (featureName) => {
    if (!TOOLS_ENABLED) {
      alert(`🔒 ${featureName} is not yet available.`)
      return false
    }
    if (settings.restrictTools && userMode !== 'loggedin') {
      alert(`🔒 ${featureName} is restricted.\n\nPlease login or sign up to access this feature.`)
      return false
    }
    return true
  }

  // AI GREETING LOGIC
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!isBooting && !isEnteringAI && !hasGreeted.current && activeChatId && !showIntro) {
      hasGreeted.current = true
      const name = profile?.name || (userMode === 'guest' ? 'Guest' : 'there')
      const greeting = `Hello ${name}! 👋 I am CYPHER4X, your advanced AI assistant. How can I help you today?`
      
      setConversation(prev => {
        if (prev.length === 0) {
          return [{ id: ++msgCounter.current, role: 'assistant', content: greeting, time: Date.now() }]
        }
        return prev
      })

      if (settings.readAloud || settings.autoStartVoice) {
        speakText(greeting)
      }
    }
  }, [isBooting, isEnteringAI, activeChatId, showIntro])
  /* eslint-enable react-hooks/exhaustive-deps */

  // CHAT MANAGEMENT
  const createNewChat = () => {
    const newChat = { id: 'chat-' + Date.now(), title: 'Chat ' + (chats.length + 1), messages: [], createdAt: Date.now() }
    setChats(prev => [newChat, ...prev]); setActiveChatId(newChat.id)
    setChatOverviewInput(''); setReplyingTo(null); setShowChatMenu(false)
  }
  const switchChat = (chatId) => { setActiveChatId(chatId); setChatOverviewInput(''); setReplyingTo(null); setShowChatMenu(false) }
  const renameChat = (chatId) => {
    const chat = chats.find(c => c.id === chatId)
    if (!chat) return
    const newTitle = prompt('Rename chat:', chat.title)
    if (newTitle && newTitle.trim()) {
      setChats(prev => prev.map(c => c.id === chatId ? { ...c, title: newTitle.trim() } : c))
    }
    setShowChatMenu(false)
  }
  const deleteChat = (chatId) => {
    if (chats.length <= 1) { alert('You need at least one chat.'); return }
    if (!confirm('Delete this chat?')) return
    const remaining = chats.filter(c => c.id !== chatId)
    setChats(remaining)
    if (activeChatId === chatId) setActiveChatId(remaining[0].id)
    setShowChatMenu(false)
  }
  const clearConversation = useCallback(() => setConversation([]), [activeChatId])
  const clearCommands = useCallback(() => setCommandHistory([]), [])

  // SPEECH
  const speakText = useCallback((text, onEnd = null) => {
    if (!text || !synthRef.current) return
    try {
      synthRef.current.cancel()
      const u = new SpeechSynthesisUtterance(text.replace(/[*_`#]/g, ''))
      // JARVIS-like voice tuning
      u.rate = 0.95; 
      u.pitch = 0.9; 
      
      const voices = synthRef.current.getVoices()
      // Try to find a deep, clear voice
      const preferredVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Microsoft David')) || voices.find(v => v.lang === 'en-US')
      if (preferredVoice) u.voice = preferredVoice

      u.onstart = () => setIsAISpeaking(true)
      u.onend = () => { setIsAISpeaking(false); if (onEnd) onEnd() }
      u.onerror = () => { setIsAISpeaking(false); if (onEnd) onEnd() }
      synthRef.current.speak(u)
    } catch { setIsAISpeaking(false); if (onEnd) onEnd() }
  }, [])

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

  const getDashboardInfo = () => {
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
    return {
      date: `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`,
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      day: days[now.getDay()],
      temp: weather?.temp != null ? `${weather.temp}°C` : null,
    }
  }

  // ==================================================
  // WORKSPACE LOGIC (JARVIS-like Agentic Behavior)
  // ==================================================
  const addWorkspaceTask = (text) => {
    const id = Date.now() + Math.random()
    setWorkspaceTasks(prev => [...prev, { id, text, status: 'pending', progress: 0 }])
    return id
  }

  const updateWorkspaceTask = (id, updates) => {
    setWorkspaceTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t))
  }

  const removeWorkspaceTask = (id) => {
    setTimeout(() => setWorkspaceTasks(prev => prev.filter(t => t.id !== id)), 2000)
  }

  const processWorkspaceCommand = async (cmdText) => {
    if (!cmdText.trim() || workspaceProcessing) return
    setWorkspaceProcessing(true)
    setWorkspaceLogs(prev => [...prev, { type: 'user', text: cmdText }])
    setWorkspaceCommand('')

    const l = cmdText.toLowerCase()

    // 1. Direct App / Link Opening
    if (l.includes('open ') || l.includes('visit ') || l.includes('search web ') || l.includes('google ')) {
      const t1 = addWorkspaceTask('Executing external command...')
      await new Promise(r => setTimeout(r, 500))
      
      let responseMsg = ""
      if (l.includes('whatsapp')) responseMsg = openApp('whatsapp')
      else if (l.includes('instagram')) responseMsg = openApp('instagram')
      else if (l.includes('youtube')) responseMsg = openApp('youtube')
      else if (l.includes('github')) responseMsg = openApp('github')
      else if (l.includes('web ') || l.includes('search web ') || l.includes('google ')) {
        const q = cmdText.replace(/^(open|visit|search web|google)\s+/i, '')
        openAnonymous(q)
        responseMsg = `Searching the web for: "${q}"...`
      } else {
        responseMsg = `I cannot directly open "${cmdText}" as an app. I will search for it instead.`
        openAnonymous(cmdText)
      }
      
      updateWorkspaceTask(t1, { status: 'done', progress: 100 })
      removeWorkspaceTask(t1)
      
      setWorkspaceLogs(prev => [...prev, { type: 'ai', text: responseMsg }])
      speakText(responseMsg)
      setWorkspaceProcessing(false)
      return
    }

    // 2. 3D Modeling / Graphic Task
    if (l.includes('3d') || l.includes('rocket') || l.includes('draw') || l.includes('model') || l.includes('image') || l.includes('picture') || l.includes('shape')) {
      const t1 = addWorkspaceTask('Analyzing visual request...')
      await new Promise(r => setTimeout(r, 800))
      updateWorkspaceTask(t1, { status: 'done', progress: 100 })
      
      const t2 = addWorkspaceTask('Fetching reference assets from web...')
      await new Promise(r => setTimeout(r, 1500))
      updateWorkspaceTask(t2, { status: 'done', progress: 100 })

      const t3 = addWorkspaceTask('Generating 3D mesh and rendering...')
      setWorkspaceActiveTab('canvas')
      const imageUrl = 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=600&q=80'
      setWorkspaceContent({ 
        type: '3d', 
        data: { 
          title: '3D Render: ' + cmdText.slice(0, 30), 
          image: imageUrl,
          colors: ['#ff003c', '#00ffff', '#ffffff']
        } 
      })
      await new Promise(r => setTimeout(r, 2000))
      updateWorkspaceTask(t3, { status: 'done', progress: 100 })
      removeWorkspaceTask(t3)
      
      setWorkspaceLogs(prev => [...prev, { type: 'ai', text: `I've generated the 3D render for "${cmdText}". Here is the direct link to the visual output:\n\n🔗 [View Render](${imageUrl})\n\nI have also placed it on your Canvas tab.` }])
      speakText("Task completed. The 3D render is ready on your workspace canvas and the link has been posted in the chat.")
    } 
    // 3. Coding / Game Task
    else if (l.includes('game') || l.includes('code') || l.includes('script') || l.includes('program') || l.includes('website') || l.includes('app')) {
      const t1 = addWorkspaceTask('Initializing development environment...')
      await new Promise(r => setTimeout(r, 800))
      updateWorkspaceTask(t1, { status: 'done', progress: 100 })
      
      const t2 = addWorkspaceTask('Writing comprehensive code...')
      const code = generateLongCode('javascript', cmdText, 'Fully autonomous generation')
      setWorkspaceContent({ type: 'code', data: { lang: 'javascript', code } })
      setWorkspaceActiveTab('code')
      await new Promise(r => setTimeout(r, 2000))
      updateWorkspaceTask(t2, { status: 'done', progress: 100 })

      const t3 = addWorkspaceTask('Compiling and optimizing...')
      await new Promise(r => setTimeout(r, 1500))
      updateWorkspaceTask(t3, { status: 'done', progress: 100 })
      removeWorkspaceTask(t3)

      setWorkspaceLogs(prev => [...prev, { type: 'ai', text: `I've written the code for your project. Here is the complete, comprehensive script directly:\n\n\`\`\`javascript\n${code}\n\`\`\`\n\nI've also placed it in the Code tab for easier viewing. You can download it using the export button.` }])
      speakText("I have written and compiled the comprehensive code for your project. The code has been posted directly in the chat.")
    }
    // 4. Web Search / Data gathering
    else if (l.includes('search') || l.includes('find') || l.includes('fetch')) {
      const t1 = addWorkspaceTask('Connecting to global network...')
      await new Promise(r => setTimeout(r, 500))
      updateWorkspaceTask(t1, { status: 'done', progress: 100 })
      
      const t2 = addWorkspaceTask('Querying Tavily API...')
      const result = await searchWeb(cmdText)
      setWorkspaceActiveTab('web')
      setWorkspaceContent({ type: 'web', data: { query: cmdText, results: result } })
      await new Promise(r => setTimeout(r, 1500))
      updateWorkspaceTask(t2, { status: 'done', progress: 100 })
      removeWorkspaceTask(t2)
      
      const answerText = result.error ? `Search error: ${result.error}` : result.answer
      setWorkspaceLogs(prev => [...prev, { type: 'ai', text: `Search complete. Here are the direct results for "${cmdText}":\n\n${answerText}\n\n${result.safestUrl ? `🔗 Source: ${result.safestUrl}` : ''}` }])
      speakText("Search complete. Displaying results directly in the chat.")
    }
    else {
      // General fallback
      const t1 = addWorkspaceTask('Processing command...')
      await new Promise(r => setTimeout(r, 1000))
      updateWorkspaceTask(t1, { status: 'done', progress: 100 })
      removeWorkspaceTask(t1)
      
      const reply = `I received your command: "${cmdText}". I am ready to execute it in the workspace. How can I assist further?`
      setWorkspaceLogs(prev => [...prev, { type: 'ai', text: reply }])
      speakText("Command received. How can I assist further?")
    }

    setWorkspaceProcessing(false)
  }

  const handleWorkspaceSubmit = (e) => {
    if (e) e.preventDefault()
    processWorkspaceCommand(workspaceCommand)
  }

  const handleWorkspaceVoice = () => {
    if (isRecording) return
    const r = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
    r.continuous = false; r.interimResults = false; r.lang = 'en-US'
    r.onstart = () => { setIsRecording(true); setWorkspaceLogs(prev => [...prev, { type: 'system', text: 'Listening for voice command...' }]) }
    r.onend = () => setIsRecording(false)
    r.onerror = (e) => { setIsRecording(false); setWorkspaceLogs(prev => [...prev, { type: 'system', text: 'Voice error: ' + e.error }]) }
    r.onresult = (e) => {
      const t = e.results[0][0].transcript
      processWorkspaceCommand(t)
    }
    r.start()
  }

  const handleWorkspaceExport = () => {
    if (!workspaceContent) return
    if (workspaceContent.type === 'code') {
      const blob = new Blob([workspaceContent.data.code], { type: 'text/javascript' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `cypher4x_export_${Date.now()}.js`
      a.click()
      URL.revokeObjectURL(url)
      setWorkspaceLogs(prev => [...prev, { type: 'system', text: 'Code exported successfully.' }])
    } else if (workspaceContent.type === '3d') {
      window.open(workspaceContent.data.image, '_blank')
      setWorkspaceLogs(prev => [...prev, { type: 'system', text: 'Opening render in new tab...' }])
    } else if (workspaceContent.type === 'web') {
      if (workspaceContent.data.results?.safestUrl) {
        window.open(workspaceContent.data.results.safestUrl, '_blank')
      } else {
        openAnonymous(workspaceContent.data.query)
      }
      setWorkspaceLogs(prev => [...prev, { type: 'system', text: 'Opening source link...' }])
    }
  }

  // ==================================================
  // MAIN CHAT LOGIC
  // ==================================================
  const executeCommand = (q) => {
    const l = q.toLowerCase().trim()
    if (l.includes('whatsapp business')) { const g = q.match(/group(?:\s+named)?\s+(.+)/i); if (g) return { response: openWhatsAppGroup(g[1].trim()) }; return { response: openApp('whatsappbusiness') } }
    const wg = l.match(/(?:open\s+)?(?:my\s+)?whatsapp.*group(?:\s+named)?\s+(.+)/i); if (wg) return { response: openWhatsAppGroup(wg[1].trim()) }
    const am = l.match(/^open\s+(?:my\s+)?(whatsapp|instagram|facebook|telegram|youtube|spotify|gmail|maps|github)(?:\s+(?:on\s+my\s+device)?)?(?:\s+and\s+open\s+my\s+group\s+named\s+(.+))?$/i)
    if (am) { const k = am[1], g = am[2]; if (k === 'whatsapp' && g) return { response: openWhatsAppGroup(g) }; return { response: openApp(k) } }
    if ((l.startsWith('secret ') || l.startsWith('anonymous ')) && settings.secretMode) { const t = q.replace(/^(secret|anonymous)\s+/i, ''); openAnonymous(t); return { response: `Anonymous search: "${t}" 🔒` } }
    if (l.startsWith('web ') || l.startsWith('search web ')) { const t = q.replace(/^(web|search web)\s+/i, ''); openAnonymous(t); return { response: `Searching "${t}"...` } }
    if (l.startsWith('play ')) { const s = l.replace('play ', '').trim(); window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(s)}`, '_blank'); return { response: `Playing "${s}"! 🎵` } }

    const dash = getDashboardInfo()
    if (l === 'time' || l.includes('what time') || l.includes('current time')) return { response: `🕒 Current time: **${dash.time}**\n📅 ${dash.day}, ${dash.date}` }
    if (l === 'date' || l.includes('what date') || l === 'today') return { response: `📅 Today is **${dash.day}**, ${dash.date}\n🕒 Time: ${dash.time}` }
    if (l.includes('what day') || l === 'day') return { response: `📆 Today is **${dash.day}**` }
    if (l.includes('temperature') || l.includes('how hot') || l.includes('how cold') || l.includes('weather')) {
      if (!settings.locationEnabled) return { response: `⚠️ Location is disabled. Enable it in Settings to get weather.` }
      if (!weather) return { response: `⏳ Fetching weather...` }
      return { response: `🌡️ Current temperature: **${dash.temp}**` }
    }

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
        setConversation(prev => [...prev, { id: ++msgCounter.current, role: 'assistant', content: code, time: Date.now() }])
        setPendingCode(null)
        if (settings.codeAutoOverview) setShowChatOverview(true)
      } else {
        const nk = ['language','purpose','detail'][idx]
        setPendingCode({ step: nk, answers: next })
        const qs = { language: 'What programming language? (JavaScript, Python, React, etc.)', purpose: 'What should the code do?', detail: 'Any extra details?' }
        const q = qs[nk]
        setConversation(prev => [...prev, { id: ++msgCounter.current, role: 'assistant', content: q, time: Date.now() }])
        if (settings.readAloud || settings.autoStartVoice) speakText(q)
      }
      setIsProcessing(false); return
    }

    if (isCodeRequest(query)) {
      const lang = detectLanguage(query)
      setConversation(prev => [...prev, { id: ++msgCounter.current, role: 'assistant', content: `I'll write code for you! 🎨\n\n**Q1 — What programming language?**\n\n_Detected: **${lang}**_`, time: Date.now() }])
      setPendingCode({ step: 'language', answers: { language: null }, detected: { language: lang } })
      if (settings.readAloud || settings.autoStartVoice) speakText('I will ask three questions to generate your code.')
      setIsProcessing(false); return
    }

    const cmd = executeCommand(query)
    if (cmd) {
      setConversation(prev => [...prev, { id: ++msgCounter.current, role: 'assistant', content: cmd.response, time: Date.now() }])
      if (settings.readAloud) speakText(cmd.response)
      setIsProcessing(false); return
    }

    for (const k of KNOWLEDGE) {
      if (k.match.test(query)) {
        setConversation(prev => [...prev, { id: ++msgCounter.current, role: 'assistant', content: k.answer, time: Date.now() }])
        if (settings.readAloud) speakText(k.answer.slice(0, 300))
        playBeep(500, 0.08); vibrate(10)
        setIsProcessing(false); return
      }
    }

    if (isPureGreeting(query)) {
      const g = 'Hey there! 👋 How can I help?'
      setConversation(prev => [...prev, { id: ++msgCounter.current, role: 'assistant', content: g, time: Date.now() }])
      if (settings.readAloud) speakText(g)
      setIsProcessing(false); return
    }

    const result = await searchWeb(query)
    let reply = result.error ? `Search error: ${result.error}` : (result.answer || "I couldn't find a clear answer.")
    const wantsLink = /\b(link|url|website|source|reference|open|visit|goto|go to|show me)\b/i.test(query)
    if (!result.error && result.safestUrl && settings.safeLinks && wantsLink) reply += `\n\n🔗 Source: ${result.safestUrl}`
    setConversation(prev => [...prev, { id: ++msgCounter.current, role: 'assistant', content: reply, time: Date.now() }])
    if (settings.readAloud) speakText(reply.replace(/🔗.*$/s, ''))
    playBeep(500, 0.08); vibrate(10)
    setIsProcessing(false)
  }, [isProcessing, userMode, settings, pendingCode, replyingTo, activeChatId, weather, now, vibrate, playBeep])

  // OVERVIEW VOICE
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

  // FILES & MESSAGES
  const handleOverviewFileShare = useCallback((e) => {
    const files = e.target.files; if (!files || !files[0]) return
    const f = files[0]; if (f.size > 20 * 1024 * 1024) { alert('Max 20MB'); return }
    const rd = new FileReader()
    rd.onloadend = () => {
      setConversation(prev => [...prev, { id: ++msgCounter.current, role: 'user', content: `📎 ${f.name}`, time: Date.now(), file: { name: f.name, type: f.type, data: rd.result, size: f.size } }])
      setConversation(prev => [...prev, { id: ++msgCounter.current, role: 'assistant', content: `Received: **${f.name}** (${(f.size/1024).toFixed(1)} KB).`, time: Date.now() }])
    }
    rd.readAsDataURL(f); e.target.value = ''
  }, [activeChatId])
  const handleEditMessage = useCallback((id) => { const msg = conversation.find(m => m.id === id); if (!msg || msg.role !== 'user') return; const nc = prompt('Edit:', msg.content); if (nc !== null && nc.trim()) setConversation(prev => prev.map(m => m.id === id ? { ...m, content: nc.trim() } : m)) }, [conversation, activeChatId])
  const handleDeleteMessage = useCallback((id) => { if (settings.confirmDelete && !confirm('Delete?')) return; setConversation(prev => prev.filter(m => m.id !== id)) }, [settings.confirmDelete, activeChatId])
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
      <div key={p.key || i} style={{ ...styles.codeBlockWrap, borderColor: hexA(theme.primary, 0.5) }}>
        <div style={{ ...styles.codeBlockHeader, borderBottom: `1px solid ${hexA(theme.primary, 0.3)}` }}>
          <span style={{ ...styles.codeLang, color: theme.primary }}>{p.lang}</span>
          <button onClick={() => copyCode(p.value, p.key)} style={{ ...styles.codeCopyBtn, backgroundColor: theme.primary }}>
            <Icon name={copiedId === p.key ? 'check' : 'copy'} size={14} color="#fff" /><span>{copiedId === p.key ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
        <pre style={styles.codeBlock}>{p.value}</pre>
      </div>
    ) : <span key={i} style={styles.chatOverviewMsgText}>{p.value}</span>)
  }

  // CALL
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

  // SETTINGS / PROFILE
  const handleBackgroundChange = (e) => {
    const f = e.target.files[0]; if (!f) return
    if (!f.type.startsWith('image/')) { alert('Image only'); return }
    if (f.size > 5 * 1024 * 1024) { alert('Max 5MB'); return }
    const rd = new FileReader(); rd.onloadend = () => setBackgroundImage(rd.result); rd.readAsDataURL(f)
  }
  const resetBackground = () => { setBackgroundImage(null); if (bgInputRef.current) bgInputRef.current.value = '' }
  const toggleView = useCallback(() => {
    setViewMode(p => {
      const n = p === 'android' ? 'pc' : 'android'
      if (n === 'pc') setShowRotateOverlay(true)
      return n
    })
    setSidebarOpen(false)
  }, [])
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
      setStats(p => ({ ...p, uptime: Math.floor((Date.now() - APP_START_TIME)/1000), cpuUsage: Math.floor(Math.random()*30)+10, cpuTemp: Math.floor(Math.random()*20)+55, ramUsage: Math.floor(Math.random()*4)+3.5, storageUsed: Math.floor(Math.random()*50)+120, networkSpeed: (Math.random()*5+0.5).toFixed(2) }))
    }, 3000)
    return () => clearInterval(t)
  }, [])

  // MUSIC
  const handleGenerateMusic = async () => {
    if (!requireLogin('Music Generator')) return
    if (!musicDesc.trim()) { alert('Describe the music you want first.'); return }
    setMusicGenerating(true); setMusicInfo('📡 Trying Tunova API...'); setMusicDownloadUrl(null)
    const fallbackLocalMusic = () => {
      try {
        const style = guessMusicStyle(musicDesc)
        const bars = Math.max(2, Math.round(musicDuration * style.bpm / 60 / 4))
        setMusicInfo(`🎵 Built-in synth — ${style.name} • ${style.bpm} BPM • ${bars} bars`)
        const notes = generateRichMelody(style.bpm, style.scale, bars)
        const { ctx, duration } = playRichMelody(notes, musicQuality, style.bpm)
        setMusicPlaying(true)
        setTimeout(() => { setMusicPlaying(false); try { ctx.close() } catch {} }, (duration + 1) * 1000)
      } catch (e) { setMusicInfo('❌ Synth error: ' + e.message) }
      setMusicGenerating(false)
    }
    try {
      const res = await fetch('/api/music', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: musicDesc, duration: musicDuration }) })
      const data = await res.json()
      if (!res.ok || data.error) { setMusicInfo('⚠️ Tunova unavailable — using built-in synth...'); return fallbackLocalMusic() }
      const taskId = data.id || data.task_id || data.data?.id || data.result?.id
      if (!taskId) { setMusicInfo('⚠️ No task ID — using built-in synth...'); return fallbackLocalMusic() }
      setMusicInfo('✓ Tunova task created. Polling...')
      let attempts = 0
      const poll = setInterval(async () => {
        attempts++
        try {
          const check = await fetch(`/api/music-status?task_id=${taskId}`)
          const status = await check.json()
          const url = status.audio_url || status.url || status.data?.audio_url || status.result?.audio_url
          if (url) { clearInterval(poll); setMusicDownloadUrl(url); setMusicInfo('✓ Tunova music ready!'); const audio = new Audio(url); audio.volume = 0.9; audio.play().catch(()=>{}); setMusicAudioRef(audio); setMusicPlaying(true); audio.onended = () => setMusicPlaying(false); setMusicGenerating(false) }
          else if (status.status === 'failed' || status.error) { clearInterval(poll); setMusicInfo('⚠️ Tunova failed — using built-in synth...'); fallbackLocalMusic() }
          else { setMusicInfo(`⏳ Tunova generating... (${attempts * 3}s)`) }
        } catch (e) { if (attempts >= 20) { clearInterval(poll); fallbackLocalMusic() } }
        if (attempts >= 20) { clearInterval(poll); fallbackLocalMusic() }
      }, 3000)
    } catch (e) { fallbackLocalMusic() }
  }

  // VIDEO
  const handleGenerateVideo = async () => {
    if (!requireLogin('Video Generator')) return
    if (!videoDesc.trim()) { alert('Describe the video you want first.'); return }
    setVideoGenerating(true); setVideoInfo('📡 Trying Agnes AI...'); setVideoResultUrl(null); setVideoTaskId(null)
    const fallbackLocal = () => {
      const style = guessVideoStyle(videoDesc)
      setVideoInfo(`🎬 Built-in engine — ${style.label} style • ${videoDuration}s. Rendering...`)
      setVideoGenerating(false)
      setTimeout(() => {
        if (!canvasRef.current) return
        setVideoRecording(true)
        const rec = startCanvasVideo(canvasRef.current, style, videoDesc, profile?.name || 'CYPHER4X', (t) => setVideoProgress(Math.floor((t % 1) * 100)))
        videoRecorderRef.current = rec
        setTimeout(async () => {
          if (!videoRecorderRef.current) return
          const blob = await videoRecorderRef.current.stop()
          videoRecorderRef.current = null; setVideoRecording(false)
          const url = URL.createObjectURL(blob)
          setVideoResultUrl(url)
          setVideoInfo('✓ Video ready! Tap download.')
        }, videoDuration * 1000)
      }, 100)
    }
    try {
      const res = await fetch('/api/video', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: videoDesc, duration: videoDuration, quality: videoQuality }) })
      const data = await res.json()
      if (!res.ok || data.error) { setVideoInfo('⚠️ Agnes unavailable — using built-in engine...'); return fallbackLocal() }
      const vId = data.video_id || data.id || data.task_id || data.data?.id
      if (!vId) { setVideoInfo('⚠️ No task ID — using built-in engine...'); return fallbackLocal() }
      setVideoTaskId(vId); setVideoInfo('✓ Agnes task created. Polling...'); setVideoPolling(true); setVideoGenerating(false)
      let attempts = 0
      const poll = setInterval(async () => {
        attempts++
        try {
          const check = await fetch(`/api/video-status?video_id=${vId}`)
          const status = await check.json()
          const url = status.video_url || status.url || status.output?.url || status.data?.video_url
          if (url) { clearInterval(poll); setVideoResultUrl(url); setVideoInfo('✓ Agnes video ready!'); setVideoPolling(false) }
          else if (status.status === 'failed' || status.error) { clearInterval(poll); setVideoInfo('⚠️ Agnes failed — using built-in engine...'); setVideoPolling(false); fallbackLocal() }
          else { setVideoInfo(`⏳ Agnes generating... (${attempts * 5}s)`) }
        } catch (e) { if (attempts >= 15) { clearInterval(poll); setVideoPolling(false); fallbackLocal() } }
        if (attempts >= 15) { clearInterval(poll); setVideoPolling(false); fallbackLocal() }
      }, 5000)
    } catch (e) { fallbackLocal() }
  }
  const handleStopLocalVideo = async () => { if (!videoRecorderRef.current) return; const blob = await videoRecorderRef.current.stop(); videoRecorderRef.current = null; setVideoRecording(false); const url = URL.createObjectURL(blob); setVideoResultUrl(url); setVideoInfo('✓ Video ready! Tap download.') }

  // CYBER TERMINAL
  const runCyberCommand = async (cmd) => {
    if (!requireLogin('Terminal')) return
    const parts = cmd.trim().split(/\s+/); const base = parts[0]?.toLowerCase()
    const args = parts.slice(1).join(' '); const arg1 = parts[1], arg2 = parts[2]
    let out = ''
    const helpText = `CYPHER4X Terminal ${VERSION} — commands:\n\nFiles:    pwd, ls, cd, cat, mkdir, touch, rm\nSystem:   whoami, uname, uptime, date, df, free, ps, neofetch\nNetwork:  ping, ifconfig, curl, dns, ip, portscan\nSecurity: hash, base64, unbase64, hex, rot13, passcheck, ctf\nUtility:  echo, calc, clear, help, about, ethics\nPkg:      pkg (simulated)`
    try {
      switch (base) {
        case 'pwd': out = '/data/data/com.termux/files/home'; break
        case 'ls': out = 'Documents/  Downloads/  Pictures/  Projects/  README.md  notes.txt'; break
        case 'whoami': out = userMode === 'loggedin' ? email : 'guest@cypher4x'; break
        case 'uname': out = arg1 === '-a' ? `Linux localhost 5.15.0-cypher4x #1 aarch64 GNU/Linux` : 'Linux'; break
        case 'uptime': out = ` ${new Date().toLocaleTimeString()} up ${fmtU(stats.uptime)}`; break
        case 'date': out = new Date().toString(); break
        case 'neofetch': out = `    ██████╗██╗   ██╗██████╗ ██╗  ██╗███████╗██████╗ ██╗  ██╗\n   ██╔════╝╚██╗ ██╔╝██╔══██╗██║  ██║██╔════╝██╔══██╗╚██╗██╔╝\n   ██║      ╚████╔╝ ██████╔╝███████║█████╗  ██████╔╝ ╚███╔╝\n   ██║       ╚██╔╝  ██╔═══╝ ██╔══██║██╔══╝  ██╔══██╗ ██╔██╗\n   ╚██████╗   ██║   ██║     ██║  ██║███████╗██║  ██║██╔╝ ██╗\n    ╚═════╝   ╚═╝   ╚═╝     ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝\n\n  OS: ${VERSION_FULL}\n  Shell: csh 1.0\n  Uptime: ${fmtU(stats.uptime)}`; break
        case 'ping': out = arg1 ? `PING ${arg1} (127.0.0.1): 4 packets transmitted, 4 received, 0% packet loss` : 'Usage: ping <host>'; break
        case 'ifconfig': out = `wlan0: inet 192.168.1.${Math.floor(Math.random() * 200) + 10}  netmask 255.255.255.0`; break
        case 'curl': { if (!arg1) { out = 'Usage: curl <url>'; break } setCyberLines(prev => [...prev, { type: 'cmd', text: `$ ${cmd}` }, { type: 'out', text: `Fetching...` }]); try { const r = await fetch(arg1); const text = await r.text(); out = `HTTP ${r.status}\n\n${text.slice(0, 800)}` } catch (e) { out = 'curl: ' + e.message } setCyberLines(prev => [...prev, { type: 'out', text: out }]); return }
        case 'dns': { if (!arg1) { out = 'Usage: dns <domain>'; break } try { const r = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(arg1)}&type=A`); const d = await r.json(); out = d.Answer ? d.Answer.map(a => `${arg1}\t${a.TTL}\tA\t${a.data}`).join('\n') : 'No records' } catch (e) { out = 'Error: ' + e.message } break }
        case 'ip': { if (!arg1) { out = 'Usage: ip <address>'; break } try { const r = await fetch(`https://ipapi.co/${encodeURIComponent(arg1)}/json/`); const d = await r.json(); out = `IP: ${d.ip}\nCity: ${d.city}\nCountry: ${d.country_name}\nISP: ${d.org}` } catch (e) { out = 'Error: ' + e.message } break }
        case 'portscan': { if (!arg1) { out = 'Usage: portscan <host>'; break } out = `⚠️ SIMULATION ONLY\nTarget: ${arg1}\n`; [21,22,80,443,3306,8080].forEach(p => { out += `  ${p}: ${Math.random() > 0.75 ? 'open' : 'closed'}\n` }); break }
        case 'hash': { if (!args) { out = 'Usage: hash <text>'; break } const buf = new TextEncoder().encode(args); const h = await crypto.subtle.digest('SHA-256', buf); out = Array.from(new Uint8Array(h)).map(b => b.toString(16).padStart(2, '0')).join(''); break }
        case 'base64': out = (() => { try { return btoa(args) } catch { return 'Invalid' } })(); break
        case 'unbase64': out = (() => { try { return atob(args) } catch { return 'Invalid' } })(); break
        case 'hex': out = Array.from(new TextEncoder().encode(args)).map(b => b.toString(16).padStart(2, '0')).join(' '); break
        case 'rot13': out = args.replace(/[a-zA-Z]/g, c => String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26)); break
        case 'passcheck': { if (!args) { out = 'Usage: passcheck <password>'; break } let s = 0; const c = { len: args.length >= 12, low: /[a-z]/.test(args), up: /[A-Z]/.test(args), dig: /\d/.test(args), sp: /[^A-Za-z0-9]/.test(args), ok: !/^(password|123456)/i.test(args) }; s = Object.values(c).filter(Boolean).length; out = `Score ${s}/6 — ${s >= 5 ? '🟢 Strong' : s >= 3 ? '🟡 Medium' : '🔴 Weak'}`; break }
        case 'ctf': { const ch = [{ q: 'ROT13 of "Uryyb"?', a: 'hello' }, { q: 'HTTPS port?', a: '443' }][Math.floor(Math.random() * 2)]; setCtfChallenge(ch); out = `🎯 ${ch.q}\n\nType "ctfcheck <answer>"`; break }
        case 'ctfcheck': if (!ctfChallenge) { out = 'No CTF.'; break } out = args.toLowerCase().trim() === ctfChallenge.a.toLowerCase() ? '✅ Correct!' : `❌ Answer: ${ctfChallenge.a}`; setCtfChallenge(null); break
        case 'echo': out = args; break
        case 'calc': { try { out = String(Function(`"use strict"; return (${args})`)()) } catch { out = 'Invalid' } break }
        case 'clear': setCyberLines([{ type: 'info', text: 'Terminal cleared.' }]); return
        case 'pkg': out = `pkg - SIMULATED\nUsage: pkg [search|install|list|update]`; break
        case 'help': out = helpText; break
        case 'about': out = `CYPHER4X Terminal ${VERSION}\nSimulated Linux shell.\nRestricted: only logged-in users.`; break
        case 'ethics': out = `🔒 Educational use only. Only test systems you own.`; break
        default: out = `csh: command not found: ${base}\nType "help"`
      }
    } catch (e) { out = 'Error: ' + e.message }
    setCyberLines(prev => [...prev, { type: 'cmd', text: `$ ${cmd}` }, { type: 'out', text: out }])
  }
  const handleCyberSubmit = (e) => { e.preventDefault(); if (!cyberInput.trim()) return; runCyberCommand(cyberInput); setCyberInput('') }

  const runCyberTool = async () => {
    if (!requireLogin('Cyber Tools')) return
    let out = ''
    try {
      switch (cyberTool) {
        case 'passcheck': { const pw = cyberToolInput; if (!pw) { out = 'Enter a password'; break } let s = 0; const c = { len: pw.length >= 12, low: /[a-z]/.test(pw), up: /[A-Z]/.test(pw), dig: /\d/.test(pw), sp: /[^A-Za-z0-9]/.test(pw), ok: !/^(password|123456)/i.test(pw) }; s = Object.values(c).filter(Boolean).length; out = `Score ${s}/6\n${s >= 5 ? '🟢 Strong' : s >= 3 ? '🟡 Medium' : '🔴 Weak'}`; break }
        case 'hash': { const b = new TextEncoder().encode(cyberToolInput); const h = await crypto.subtle.digest('SHA-256', b); out = Array.from(new Uint8Array(h)).map(x => x.toString(16).padStart(2, '0')).join(''); break }
        case 'base64': out = (() => { try { return btoa(cyberToolInput) } catch { return 'Invalid' } })(); break
        case 'unbase64': out = (() => { try { return atob(cyberToolInput) } catch { return 'Invalid' } })(); break
        case 'hex': out = Array.from(new TextEncoder().encode(cyberToolInput)).map(b => b.toString(16).padStart(2, '0')).join(' '); break
        case 'rot13': out = cyberToolInput.replace(/[a-zA-Z]/g, c => String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26)); break
        case 'dns': { const r = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(cyberToolInput)}&type=A`); const d = await r.json(); out = d.Answer ? d.Answer.map(a => `A  ${a.data}  TTL ${a.TTL}`).join('\n') : 'No records'; break }
        case 'ip': { const r = await fetch(`https://ipapi.co/${encodeURIComponent(cyberToolInput)}/json/`); const d = await r.json(); out = `IP: ${d.ip}\nCity: ${d.city}\nCountry: ${d.country_name}`; break }
        case 'portscan': { const open = [80, 443].filter(() => Math.random() > 0.3); out = `⚠️ SIM\nOPEN: ${open.join(', ') || 'none'}`; break }
        default: out = 'Unknown tool'
      }
    } catch (e) { out = 'Error: ' + e.message }
    setCyberToolOutput(out)
  }

  // PROFILE
  const handleAvatarChange = useCallback((e) => { const f = e.target.files[0]; if (!f) return; if (!f.type.startsWith('image/')) return alert('Image only'); const rd = new FileReader(); rd.onloadend = () => setProfileForm(p => ({ ...p, avatar: rd.result })); rd.readAsDataURL(f) }, [])
  const saveProfile = useCallback(() => { if (!profileForm.name.trim() || !profileForm.username.trim()) { alert('Name & Username required'); return } const np = { ...profileForm, username: profileForm.username.toLowerCase().replace(/[^a-z0-9_]/g, ''), updatedAt: new Date().toISOString() }; setProfile(np); setEditingProfile(false); speakText(`Updated, ${np.name}!`) }, [profileForm, speakText])
  const openEditProfile = useCallback(() => { setProfileForm({ name: profile?.name || '', username: profile?.username || '', avatar: profile?.avatar || '', bio: profile?.bio || '' }); setEditingProfile(true); setSidebarOpen(false) }, [profile])
  const resetAllData = useCallback(() => {
    if (!confirm('Reset ALL data?')) return
    if (userMode === 'loggedin') saveUserData(email, pin, { profile: null, chats: [{ id: 'chat-' + Date.now(), title: 'Chat 1', messages: [], createdAt: Date.now() }], commandHistory: [], backgroundImage: null, theme, settings })
    setProfile(null); setChats([{ id: 'default-' + Date.now(), title: 'Chat 1', messages: [], createdAt: Date.now() }]); setCommandHistory([])
    setBackgroundImage(null); setSidebarOpen(false)
  }, [userMode, email, pin, theme, settings])
  const exportChat = useCallback(() => { const d = { chats, commandHistory, profile, exportedAt: new Date().toISOString() }; const b = new Blob([JSON.stringify(d, null, 2)], { type: 'application/json' }); const u = URL.createObjectURL(b); const a = document.createElement('a'); a.href = u; a.download = `cypher4x_${Date.now()}.json`; a.click(); URL.revokeObjectURL(u) }, [chats, commandHistory, profile])

  const fmtU = (s) => `${Math.floor(s/3600).toString().padStart(2,'0')}:${Math.floor((s%3600)/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`
  const fmtT = (ts) => new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  const dash = getDashboardInfo()

  // ============ RENDER ============
  
  // 1. INTRO SEQUENCE
  if (showIntro) return (
    <div style={styles.introContainer}>
      <div style={styles.introBackground} />
      <div style={styles.introContent}>
        {introStep === 0 && <h1 style={{...styles.introText, animation: 'fadeUp 1s ease'}}>INITIALIZING SYSTEM</h1>}
        {introStep === 1 && <h1 style={{...styles.introText, animation: 'fadeUp 1s ease'}}>HACKERS HUB <span style={{color: theme.primary}}>PRESENTS</span></h1>}
        {introStep === 2 && <h1 style={{...styles.introText, color: theme.primary, animation: 'pulse3 1s ease'}}>CYPHER4X</h1>}
      </div>
    </div>
  )

  // 2. ENTRY LOADING SCREEN (12s)
  if (isEnteringAI) return (
    <div style={styles.enterOverlay}>
      <div style={styles.enterBackground} />
      <div style={styles.enterContent}>
        <h1 style={{ ...styles.enterTitle, color: theme.primary, textShadow: `0 0 20px ${theme.primary}, 0 0 40px ${hexA(theme.primary, 0.27)}`, animation: 'pulse3 1.8s ease-in-out infinite' }}>CYPHER4X</h1>
        <p style={styles.enterSubtitleSmall}>{VERSION_FULL}</p>
        <div style={styles.enterUpdatingWrap}>
          <div style={{...styles.enterUpdatingLabel, color: theme.primary}}>Updating</div>
          <div style={{...styles.enterUpdatingDots, color: theme.primary}}>
            <span style={{ animation: 'pulse3 1s 0s ease-in-out infinite' }}>.</span>
            <span style={{ animation: 'pulse3 1s 0.2s ease-in-out infinite' }}>.</span>
            <span style={{ animation: 'pulse3 1s 0.4s ease-in-out infinite' }}>.</span>
          </div>
        </div>
        <div style={styles.enterProgressBarWrap}><div style={{ ...styles.enterProgressBar, width: `${enterProgress}%`, backgroundColor: theme.primary, boxShadow: `0 0 20px ${theme.primary}` }} /></div>
        <span style={{...styles.enterPercent, color: theme.primary}}>{Math.round(enterProgress)}%</span>
        <p style={styles.enterMessageSmall}>{enterMessage}</p>
      </div>
    </div>
  )

  if (showGuestLimit) return (
    <div style={{ ...styles.guestLimitOverlay, background: theme.secondary }}>
      <div style={{ ...styles.guestLimitCard, borderColor: theme.primary }}>
        <h2 style={{ ...styles.guestLimitTitle, color: theme.primary }}>Free Trial Limit Reached</h2>
        <p style={styles.guestLimitText}>You've used all 5 free messages. Login to continue.</p>
        <div style={styles.guestLimitButtons}>
          <button onClick={() => { setShowGuestLimit(false); setShowLogin(true); setShowAuthModal(true) }} style={{ ...styles.guestLimitLoginBtn, backgroundColor: theme.primary }}>Login</button>
          <button onClick={() => { setShowGuestLimit(false); setShowLogin(false); setShowAuthModal(true) }} style={styles.guestLimitSignupBtn}>Sign Up</button>
        </div>
      </div>
    </div>
  )

  if (showAuthModal) return (
    <div style={styles.authModalOverlay}>
      <div style={{ ...styles.authModalCard, borderColor: theme.primary }}>
        <button onClick={() => setShowAuthModal(false)} style={styles.authModalClose}>✕</button>
        <h1 style={{ ...styles.authTitle, color: theme.primary }}>CYPHER4X</h1>
        <p style={{ color: theme.primary, fontSize: 12, marginBottom: 12 }}>{VERSION_FULL}</p>
        <p style={{ ...styles.authSubtitle, color: theme.primary }}>{showLogin ? 'Login' : 'Sign Up'}</p>
        <div style={{ ...styles.authError, color: theme.primary }}>{authError}</div>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.authInput} />
        <input type="password" placeholder="4-digit PIN" value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))} style={styles.authInput} maxLength="4" />
        <button onClick={handleAuthSubmit} style={{ ...styles.authBtn, backgroundColor: theme.primary }}>{showLogin ? 'Login' : 'Create Account'}</button>
        <div style={styles.authSwitch}>
          <span>{showLogin ? 'No account?' : 'Have account?'}</span>
          <button onClick={() => { setShowLogin(!showLogin); setAuthError('') }} style={{ ...styles.authSwitchBtn, color: theme.primary }}>{showLogin ? 'Sign Up' : 'Login'}</button>
        </div>
      </div>
    </div>
  )

  // ==================== WORKSPACE MODE ====================
  if (showWorkspace) return (
    <div style={styles.workspaceContainer}>
      <div style={styles.workspaceHeader}>
        <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
          <button onClick={() => setShowWorkspace(false)} style={{...styles.workspaceExitBtn, borderColor: theme.primary}}><Icon name="arrowLeft" size={20} color={theme.primary} /> EXIT</button>
          <h1 style={{...styles.workspaceTitle, color: theme.primary}}>CYPHER4X WORKSPACE</h1>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 15}}>
          <button onClick={handleWorkspaceExport} style={{...styles.workspaceExportBtn, borderColor: '#00ff41', color: '#00ff41'}}><Icon name="download" size={16} color="#00ff41" /> EXPORT</button>
          <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
            <span style={{width: 8, height: 8, borderRadius: '50%', backgroundColor: workspaceProcessing ? '#ffcc00' : '#00ff41', boxShadow: `0 0 10px ${workspaceProcessing ? '#ffcc00' : '#00ff41'}`}} />
            <span style={{color: '#888', fontSize: 12}}>{workspaceProcessing ? 'AGENT ACTIVE' : 'AGENT IDLE'}</span>
          </div>
          <RedBall isSpeaking={isAISpeaking} theme={theme} size={40} />
        </div>
      </div>

      <div style={styles.workspaceBody}>
        <div style={styles.workspaceLeftPanel}>
          <div style={styles.workspacePanelHeader}>
            <Icon name="layers" size={16} color={theme.primary} /> ACTIVE TASKS ({workspaceTasks.length})
          </div>
          <div style={styles.workspaceTaskList}>
            {workspaceTasks.length === 0 && <span style={{color: '#555', fontSize: 12, fontStyle: 'italic'}}>No active tasks. Give a command...</span>}
            {workspaceTasks.map(t => (
              <div key={t.id} style={styles.workspaceTaskItem}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 4}}>
                  <span style={{color: '#ddd', fontSize: 12}}>{t.text}</span>
                  <span style={{color: t.status === 'done' ? '#00ff41' : '#ffcc00', fontSize: 10}}>{t.status.toUpperCase()}</span>
                </div>
                <div style={{width: '100%', height: 4, backgroundColor: '#111', borderRadius: 2, overflow: 'hidden'}}>
                  <div style={{width: `${t.progress}%`, height: '100%', backgroundColor: t.status === 'done' ? '#00ff41' : theme.primary, transition: 'width 0.3s ease'}} />
                </div>
              </div>
            ))}
          </div>
          
          <div style={{...styles.workspacePanelHeader, marginTop: 15}}>
            <Icon name="terminal" size={16} color={theme.primary} /> AGENT LOGS
          </div>
          <div style={styles.workspaceLogList}>
            {workspaceLogs.map((log, i) => (
              <div key={i} style={{marginBottom: 6, fontSize: 11, fontFamily: 'monospace'}}>
                <span style={{color: log.type === 'user' ? theme.primary : log.type === 'ai' ? '#4f8' : '#888'}}>
                  [{log.type.toUpperCase()}] 
                </span>
                <span style={{color: '#ccc'}}> {log.text}</span>
              </div>
            ))}
            <div ref={workspaceEndRef} />
          </div>
        </div>

        <div style={styles.workspaceCenterPanel}>
          <div style={styles.workspaceTabs}>
            <button onClick={() => setWorkspaceActiveTab('canvas')} style={{...styles.workspaceTabBtn, borderBottomColor: workspaceActiveTab === 'canvas' ? theme.primary : 'transparent', color: workspaceActiveTab === 'canvas' ? theme.primary : '#888'}}>CANVAS</button>
            <button onClick={() => setWorkspaceActiveTab('code')} style={{...styles.workspaceTabBtn, borderBottomColor: workspaceActiveTab === 'code' ? theme.primary : 'transparent', color: workspaceActiveTab === 'code' ? theme.primary : '#888'}}>CODE</button>
            <button onClick={() => setWorkspaceActiveTab('web')} style={{...styles.workspaceTabBtn, borderBottomColor: workspaceActiveTab === 'web' ? theme.primary : 'transparent', color: workspaceActiveTab === 'web' ? theme.primary : '#888'}}>WEB</button>
          </div>
          
          <div style={styles.workspaceCanvasArea}>
            {workspaceActiveTab === 'canvas' && (
              workspaceContent?.type === '3d' ? (
                <div style={{textAlign: 'center'}}>
                  <h3 style={{color: theme.primary, marginBottom: 20}}>{workspaceContent.data.title}</h3>
                  <img src={workspaceContent.data.image} alt="Generated 3D" style={{maxWidth: '100%', maxHeight: '60vh', borderRadius: 12, border: `1px solid ${hexA(theme.primary, 0.3)}`}} />
                  <p style={{color: '#888', marginTop: 15}}>Rendered by Cypher4x Engine</p>
                </div>
              ) : (
                <div style={{textAlign: 'center', color: '#555'}}>
                  <Icon name="image" size={64} color="#333" />
                  <p style={{marginTop: 15}}>No visual output yet. Ask AI to create something.</p>
                </div>
              )
            )}
            
            {workspaceActiveTab === 'code' && (
              workspaceContent?.type === 'code' ? (
                <div style={{width: '100%', height: '100%', overflow: 'auto', backgroundColor: '#0a0a0a', padding: 20, borderRadius: 8, border: '1px solid #333'}}>
                  <pre style={{margin: 0, color: '#e0e0e0', fontFamily: 'monospace', fontSize: 13, whiteSpace: 'pre-wrap'}}>{workspaceContent.data.code}</pre>
                </div>
              ) : (
                <div style={{textAlign: 'center', color: '#555'}}>
                  <Icon name="file" size={64} color="#333" />
                  <p style={{marginTop: 15}}>No code generated yet. Ask AI to build a script.</p>
                </div>
              )
            )}
            
            {workspaceActiveTab === 'web' && (
              workspaceContent?.type === 'web' ? (
                <div style={{width: '100%', height: '100%', overflow: 'auto', padding: 20}}>
                  <h3 style={{color: theme.primary, marginBottom: 15}}>Search Results: {workspaceContent.data.query}</h3>
                  {workspaceContent.data.results.error ? (
                    <p style={{color: '#ff6688'}}>Error: {workspaceContent.data.results.error}</p>
                  ) : (
                    <div style={{backgroundColor: '#1a1a1a', padding: 15, borderRadius: 8, border: '1px solid #333'}}>
                      <p style={{color: '#ccc', lineHeight: 1.6}}>{workspaceContent.data.results.answer}</p>
                      {workspaceContent.data.results.safestUrl && (
                        <a href={workspaceContent.data.results.safestUrl} target="_blank" rel="noopener noreferrer" style={{color: theme.primary, display: 'block', marginTop: 15}}>🔗 Source Link</a>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div style={{textAlign: 'center', color: '#555'}}>
                  <Icon name="globe" size={64} color="#333" />
                  <p style={{marginTop: 15}}>No web data fetched yet. Ask AI to search.</p>
                </div>
              )
            )}
          </div>
        </div>

        <div style={styles.workspaceRightPanel}>
          <div style={styles.workspacePanelHeader}>
            <Icon name="sparkles" size={16} color={theme.primary} /> AGENT COMMAND
          </div>
          <div style={{...styles.workspaceChatArea, overflowX: 'auto', whiteSpace: 'nowrap'}}>
             {workspaceLogs.filter(l => l.type === 'ai' || l.type === 'user').slice(-5).map((log, i) => (
               <div key={i} style={{padding: 8, marginBottom: 8, borderRadius: 6, backgroundColor: log.type === 'user' ? hexA(theme.primary, 0.2) : 'rgba(255,255,255,0.05)', borderLeft: log.type === 'user' ? `3px solid ${theme.primary}` : '3px solid #4f8', minWidth: '100%', boxSizing: 'border-box'}}>
                  <div style={{color: '#888', fontSize: 9, marginBottom: 2}}>{log.type === 'user' ? 'YOU' : 'CYPHER4X'}</div>
                  <div style={{color: '#ddd', fontSize: 12, whiteSpace: 'pre-wrap'}}>{renderMessageContent({ id: i, content: log.text })}</div>
               </div>
             ))}
          </div>
          <form onSubmit={handleWorkspaceSubmit} style={styles.workspaceInputRow}>
            <input 
              type="text" 
              value={workspaceCommand} 
              onChange={(e) => setWorkspaceCommand(e.target.value)} 
              placeholder="Command AI agent..." 
              style={styles.workspaceInput}
              disabled={workspaceProcessing}
            />
            <button type="button" onClick={handleWorkspaceVoice} style={{...styles.workspaceMicBtn, backgroundColor: isRecording ? theme.primary : '#1a1a1a'}}>
              <Icon name="mic" size={18} color="#fff" />
            </button>
            <button type="submit" style={{...styles.workspaceSendBtn, backgroundColor: theme.primary}} disabled={workspaceProcessing}>
              <Icon name="send" size={18} color="#fff" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )

  // ==================== SETTINGS ====================
  if (showSettings) return (
    <div style={styles.settingsFullscreen}>
      <style>{`.toggle-switch{position:relative;display:inline-block;width:46px;height:24px;flex-shrink:0}.toggle-switch input{opacity:0;width:0;height:0}.toggle-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background:#333;transition:.3s;border-radius:24px}.toggle-slider:before{content:"";position:absolute;height:18px;width:18px;left:3px;bottom:3px;background:#fff;transition:.3s;border-radius:50%}.toggle-switch input:checked+.toggle-slider{background:${theme.primary}}.toggle-switch input:checked+.toggle-slider:before{transform:translateX(22px)}`}</style>
      <div style={styles.settingsHeaderFull}>
        <h1 style={{ ...styles.settingsTitleFull, color: theme.primary }}>Settings · {VERSION}</h1>
        <button onClick={() => setShowSettings(false)} style={styles.settingsCloseFull}><Icon name="close" size={28} color="#fff" /></button>
      </div>
      <div style={styles.settingsBodyFull}>
        
        <div style={styles.settingsSection}>
          <h3 style={{ ...styles.settingsSectionTitle, color: theme.primary }}>Location Services</h3>
          <div style={styles.settingItem}><span>Enable Location (Weather)</span><label className="toggle-switch"><input type="checkbox" checked={settings.locationEnabled} onChange={(e) => setSettings({ ...settings, locationEnabled: e.target.checked })} /><span className="toggle-slider"></span></label></div>
          <p style={styles.bgHint}>Allows the AI to fetch local weather and display it on the Home screen.</p>
        </div>

        <div style={styles.settingsSection}>
          <h3 style={{ ...styles.settingsSectionTitle, color: theme.primary }}>Theme & Colors</h3>
          <div style={styles.settingItem}><span>Primary color</span><input type="color" value={theme.primary} onChange={(e) => setTheme({ ...theme, primary: e.target.value })} style={styles.colorPicker} /></div>
          <div style={styles.settingItem}><span>Secondary color (background)</span><input type="color" value={theme.secondary} onChange={(e) => setTheme({ ...theme, secondary: e.target.value })} style={styles.colorPicker} /></div>
          <div style={styles.settingItem}><span>Ball color</span><input type="color" value={theme.ballColor} onChange={(e) => setTheme({ ...theme, ballColor: e.target.value, ballColorLight: lightenColor(e.target.value), ballColorDark: darkenColor(e.target.value) })} style={styles.colorPicker} /></div>
          <div style={styles.presetRow}>
            <button onClick={() => setTheme({ ...theme, primary: '#ff003c', ballColor: '#ff003c', ballColorLight: '#ff6688', ballColorDark: '#990022' })} style={{ ...styles.presetBtn, backgroundColor: '#ff003c' }}>Red</button>
            <button onClick={() => setTheme({ ...theme, primary: '#00c8ff', ballColor: '#00c8ff', ballColorLight: '#66ddff', ballColorDark: '#006699' })} style={{ ...styles.presetBtn, backgroundColor: '#00c8ff' }}>Cyan</button>
            <button onClick={() => setTheme({ ...theme, primary: '#00ff41', ballColor: '#00ff41', ballColorLight: '#66ff88', ballColorDark: '#008822' })} style={{ ...styles.presetBtn, backgroundColor: '#00ff41' }}>Green</button>
            <button onClick={() => setTheme({ ...theme, primary: '#ffcc00', ballColor: '#ffcc00', ballColorLight: '#ffe066', ballColorDark: '#996600' })} style={{ ...styles.presetBtn, backgroundColor: '#ffcc00' }}>Gold</button>
            <button onClick={() => setTheme({ ...theme, primary: '#c800ff', ballColor: '#c800ff', ballColorLight: '#dd66ff', ballColorDark: '#660088' })} style={{ ...styles.presetBtn, backgroundColor: '#c800ff' }}>Purple</button>
          </div>
        </div>

        <div style={styles.settingsSection}>
          <h3 style={{ ...styles.settingsSectionTitle, color: theme.primary }}>General</h3>
          <div style={styles.settingItem}><span>Welcome Messages</span><label className="toggle-switch"><input type="checkbox" checked={settings.welcomeEnabled} onChange={(e) => setSettings({ ...settings, welcomeEnabled: e.target.checked })} /><span className="toggle-slider"></span></label></div>
          <div style={styles.settingItem}><span>Auto-start Voice</span><label className="toggle-switch"><input type="checkbox" checked={settings.autoStartVoice} onChange={(e) => setSettings({ ...settings, autoStartVoice: e.target.checked })} /><span className="toggle-slider"></span></label></div>
          <div style={styles.settingItem}><span>Read Aloud</span><label className="toggle-switch"><input type="checkbox" checked={settings.readAloud} onChange={(e) => setSettings({ ...settings, readAloud: e.target.checked })} /><span className="toggle-slider"></span></label></div>
          <div style={styles.settingItem}><span>Safe Links</span><label className="toggle-switch"><input type="checkbox" checked={settings.safeLinks} onChange={(e) => setSettings({ ...settings, safeLinks: e.target.checked })} /><span className="toggle-slider"></span></label></div>
          <div style={styles.settingItem}><span>🔒 Restrict Tools (Login required)</span><label className="toggle-switch"><input type="checkbox" checked={settings.restrictTools} onChange={(e) => setSettings({ ...settings, restrictTools: e.target.checked })} /><span className="toggle-slider"></span></label></div>
        </div>

        <div style={styles.settingsSection}>
          <h3 style={{ ...styles.settingsSectionTitle, color: theme.primary }}>Interface</h3>
          <div style={styles.settingItem}><span>Auto-scroll</span><label className="toggle-switch"><input type="checkbox" checked={settings.autoScroll} onChange={(e) => setSettings({ ...settings, autoScroll: e.target.checked })} /><span className="toggle-slider"></span></label></div>
          <div style={styles.settingItem}><span>Show Timestamps</span><label className="toggle-switch"><input type="checkbox" checked={settings.showTimestamps} onChange={(e) => setSettings({ ...settings, showTimestamps: e.target.checked })} /><span className="toggle-slider"></span></label></div>
          <div style={styles.settingItem}><span>Typing Indicator</span><label className="toggle-switch"><input type="checkbox" checked={settings.typingIndicator} onChange={(e) => setSettings({ ...settings, typingIndicator: e.target.checked })} /><span className="toggle-slider"></span></label></div>
          <div style={styles.settingItem}><span>Haptic</span><label className="toggle-switch"><input type="checkbox" checked={settings.haptic} onChange={(e) => setSettings({ ...settings, haptic: e.target.checked })} /><span className="toggle-slider"></span></label></div>
          <div style={styles.settingItem}><span>Sound Effects</span><label className="toggle-switch"><input type="checkbox" checked={settings.soundFx} onChange={(e) => setSettings({ ...settings, soundFx: e.target.checked })} /><span className="toggle-slider"></span></label></div>
        </div>

        <div style={styles.settingsSection}>
          <h3 style={{ ...styles.settingsSectionTitle, color: theme.primary }}>Voice</h3>
          <div style={styles.settingItem}><span>Speed</span><input type="range" min="0.5" max="2" step="0.1" value={settings.voiceSpeed} onChange={(e) => setSettings({ ...settings, voiceSpeed: parseFloat(e.target.value) })} style={{ ...styles.settingsRange, accentColor: theme.primary }} /><span style={styles.settingsValue}>{settings.voiceSpeed}x</span></div>
          <div style={styles.settingItem}><span>Gender</span><select value={voiceGender} onChange={(e) => setVoiceGender(e.target.value)} style={styles.settingsSelect}><option value="male">Male</option><option value="female">Female</option></select></div>
        </div>

        <div style={styles.settingsSection}>
          <h3 style={{ ...styles.settingsSectionTitle, color: theme.primary }}>Background Image (chat only)</h3>
          <div style={styles.backgroundControls}>
            <label style={{ ...styles.uploadBtn, backgroundColor: theme.primary }}><Icon name="image" size={18} color="#fff" /><span>Choose Image</span><input ref={bgInputRef} type="file" accept="image/*" onChange={handleBackgroundChange} style={{ display: 'none' }} /></label>
            {backgroundImage && <button onClick={resetBackground} style={styles.resetBtn}><Icon name="refresh" size={18} color="#fff" /><span>Reset</span></button>}
          </div>
          {backgroundImage && <div style={styles.bgPreview}><img src={backgroundImage} alt="Preview" style={styles.bgPreviewImg} /></div>}
        </div>
      </div>
      <button onClick={() => setShowSettings(false)} style={{ ...styles.settingsDoneFull, backgroundColor: theme.primary }}>Done</button>
    </div>
  )

  // MUSIC PANEL
  if (showMusicPanel) return (
    <div style={styles.settingsFullscreen}>
      <div style={styles.settingsHeaderFull}><h1 style={{ ...styles.settingsTitleFull, color: theme.primary }}>🎵 Music Generator</h1><button onClick={() => setShowMusicPanel(false)} style={styles.settingsCloseFull}><Icon name="close" size={28} color="#fff" /></button></div>
      <div style={styles.settingsBodyFull}>
        <div style={styles.settingsSection}><h3 style={{ ...styles.settingsSectionTitle, color: theme.primary }}>Describe Your Music</h3><input value={musicDesc} onChange={(e) => setMusicDesc(e.target.value)} placeholder="e.g. romantic piano with soft vocals..." style={styles.settingsSelect} /><p style={styles.bgHint}>Tries Tunova API → falls back to built-in synth.</p></div>
        <div style={styles.settingsSection}><h3 style={{ ...styles.settingsSectionTitle, color: theme.primary }}>Duration</h3><div style={styles.settingItem}><span>{musicDuration}s</span><input type="range" min="15" max="180" step="5" value={musicDuration} onChange={(e) => setMusicDuration(parseInt(e.target.value))} style={{ ...styles.settingsRange, accentColor: theme.primary }} /></div></div>
        <div style={styles.settingsSection}><h3 style={{ ...styles.settingsSectionTitle, color: theme.primary }}>Quality</h3><select value={musicQuality} onChange={(e) => setMusicQuality(e.target.value)} style={styles.settingsSelect}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select></div>
        {musicInfo && <pre style={{ color: musicInfo.startsWith('❌') ? '#ff6688' : musicInfo.startsWith('⚠️') ? '#ffcc00' : '#4f8', textAlign: 'center', fontSize: 12, fontWeight: 'bold', whiteSpace: 'pre-wrap', fontFamily: 'monospace', padding: 12, background: '#0a0a0a', borderRadius: 8, border: '1px solid #333' }}>{musicInfo}</pre>}
        {musicDownloadUrl && <a href={musicDownloadUrl} download={`cypher4x_music_${Date.now()}.mp3`} style={{ ...styles.uploadBtn, backgroundColor: theme.primary, justifyContent: 'center', textDecoration: 'none', marginTop: 12 }}><Icon name="download" size={16} color="#fff" /><span>Download</span></a>}
      </div>
      <button onClick={handleGenerateMusic} disabled={musicGenerating} style={{ ...styles.settingsDoneFull, backgroundColor: theme.primary }}>{musicGenerating ? 'Submitting...' : musicPlaying ? 'Playing...' : 'Generate Music'}</button>
    </div>
  )

  // VIDEO PANEL
  if (showVideoPanel) return (
    <div style={styles.settingsFullscreen}>
      <div style={styles.settingsHeaderFull}><h1 style={{ ...styles.settingsTitleFull, color: theme.primary }}>🎬 Video Generator</h1><button onClick={() => setShowVideoPanel(false)} style={styles.settingsCloseFull}><Icon name="close" size={28} color="#fff" /></button></div>
      <div style={styles.settingsBodyFull}>
        <div style={styles.settingsSection}><h3 style={{ ...styles.settingsSectionTitle, color: theme.primary }}>Describe Your Video</h3><input value={videoDesc} onChange={(e) => setVideoDesc(e.target.value)} placeholder="e.g. anime sakura, cinematic drone..." style={styles.settingsSelect} /><p style={styles.bgHint}>Tries Agnes AI → falls back to built-in engine.</p></div>
        <div style={styles.settingsSection}><h3 style={{ ...styles.settingsSectionTitle, color: theme.primary }}>Duration</h3><div style={styles.settingItem}><span>{videoDuration}s</span><input type="range" min="3" max="30" step="1" value={videoDuration} onChange={(e) => setVideoDuration(parseInt(e.target.value))} style={{ ...styles.settingsRange, accentColor: theme.primary }} /></div></div>
        <div style={styles.settingsSection}><h3 style={{ ...styles.settingsSectionTitle, color: theme.primary }}>Quality</h3><select value={videoQuality} onChange={(e) => setVideoQuality(e.target.value)} style={styles.settingsSelect}><option value="low">480p</option><option value="medium">720p</option><option value="high">1080p</option></select></div>
        <canvas ref={canvasRef} width={videoQuality === 'high' ? 720 : videoQuality === 'medium' ? 480 : 320} height={videoQuality === 'high' ? 480 : videoQuality === 'medium' ? 320 : 240} style={{ width: '100%', borderRadius: 12, background: '#000', marginTop: 8, display: videoRecording || videoResultUrl ? 'block' : 'none' }} />
        {videoInfo && <pre style={{ color: videoInfo.startsWith('❌') ? '#ff6688' : videoInfo.startsWith('⚠️') ? '#ffcc00' : '#4f8', textAlign: 'center', fontSize: 12, fontWeight: 'bold', whiteSpace: 'pre-wrap', fontFamily: 'monospace', padding: 12, background: '#0a0a0a', borderRadius: 8, border: '1px solid #333' }}>{videoInfo}</pre>}
        {videoRecording && <p style={{ color: theme.primary, textAlign: 'center', marginTop: 8 }}>● Recording... {videoProgress}%</p>}
        {videoResultUrl && <video src={videoResultUrl} controls style={{ width: '100%', borderRadius: 12, marginTop: 12 }} />}
        {videoResultUrl && <a href={videoResultUrl} download={`cypher4x_video_${Date.now()}.webm`} style={{ ...styles.uploadBtn, backgroundColor: theme.primary, justifyContent: 'center', textDecoration: 'none', marginTop: 12 }}><Icon name="download" size={16} color="#fff" /><span>Download</span></a>}
      </div>
      {videoRecording ? (
        <button onClick={handleStopLocalVideo} style={{ ...styles.settingsDoneFull, backgroundColor: theme.primary }}>Stop & Save</button>
      ) : (
        <button onClick={handleGenerateVideo} disabled={videoGenerating || videoPolling} style={{ ...styles.settingsDoneFull, backgroundColor: theme.primary }}>{videoGenerating ? 'Submitting...' : videoPolling ? 'Generating...' : 'Generate Video'}</button>
      )}
    </div>
  )

  // CYBER LAB
  if (showCyberLab) {
    const tools = [{id:'passcheck',label:'Password'},{id:'hash',label:'Hash'},{id:'base64',label:'B64 Enc'},{id:'unbase64',label:'B64 Dec'},{id:'hex',label:'Hex'},{id:'rot13',label:'ROT13'},{id:'dns',label:'DNS'},{id:'ip',label:'IP'},{id:'portscan',label:'PortSim'}]
    return (
      <div style={styles.settingsFullscreen}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: '#000', borderBottom: '1px solid #1a1a1a', flexShrink: 0 }}>
          <button onClick={() => setShowCyberLab(false)} style={{ background: 'none', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 14 }}>
            <Icon name="arrowLeft" size={20} color="#fff" /> exit
          </button>
          <span style={{ color: theme.primary, fontSize: 12, fontFamily: "'Courier New', monospace" }}>csh@cypher4x:~$</span>
          <button onClick={() => setCyberLines([{ type: 'info', text: `${VERSION_FULL} — type "help"` }])} style={{ background: 'none', border: '1px solid #333', color: '#888', padding: '3px 10px', borderRadius: 4, cursor: 'pointer', fontSize: 11 }}>clear</button>
        </div>
        <div style={{ display: 'flex', padding: '8px 16px', gap: 8, flexShrink: 0, background: '#111', borderBottom: '1px solid #333' }}>
          <button onClick={() => setCyberTab('terminal')} style={{ flex: 1, padding: 10, background: cyberTab === 'terminal' ? theme.primary : '#1a1a1a', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 'bold', cursor: 'pointer', fontSize: 12 }}>Terminal</button>
          <button onClick={() => setCyberTab('tools')} style={{ flex: 1, padding: 10, background: cyberTab === 'tools' ? theme.primary : '#1a1a1a', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 'bold', cursor: 'pointer', fontSize: 12 }}>Tools</button>
        </div>
        {cyberTab === 'terminal' && (<>
          <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: 16, background: '#000', fontFamily: "'Courier New', monospace", fontSize: 13, color: '#ddd' }}>
            {cyberLines.map((l, i) => <pre key={i} style={{ margin: '2px 0', whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: l.type === 'cmd' ? '#4f8' : l.type === 'info' ? theme.primary : '#ddd', fontWeight: l.type === 'cmd' ? 'bold' : 'normal' }}>{l.text}</pre>)}
            <div ref={cyberEndRef} />
          </div>
          <form onSubmit={handleCyberSubmit} style={{ display: 'flex', gap: 8, padding: 12, paddingBottom: 'max(12px, env(safe-area-inset-bottom, 12px))', background: '#111', borderTop: '1px solid #333' }}>
            <span style={{ color: '#4f8', fontWeight: 'bold', alignSelf: 'center' }}>~ $</span>
            <input value={cyberInput} onChange={(e) => setCyberInput(e.target.value)} placeholder='Type a command (help)' style={{ flex: 1, padding: 10, background: '#000', border: '1px solid #333', color: '#fff', borderRadius: 4, fontFamily: "'Courier New', monospace", outline: 'none' }} autoComplete="off" autoCapitalize="off" spellCheck="false" />
            <button type="submit" style={{ padding: '8px 14px', background: theme.primary, border: 'none', borderRadius: 4, color: '#fff', cursor: 'pointer' }}><Icon name="send" size={16} color="#fff" /></button>
          </form>
        </>)}
        {cyberTab === 'tools' && (
          <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: 16 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
              {tools.map(t => <button key={t.id} onClick={() => { setCyberTool(t.id); setCyberToolOutput('') }} style={{ padding: '6px 12px', borderRadius: 20, border: cyberTool === t.id ? `1px solid ${theme.primary}` : '1px solid #333', background: cyberTool === t.id ? hexA(theme.primary, 0.15) : '#1a1a1a', color: '#fff', fontSize: 12, cursor: 'pointer' }}>{t.label}</button>)}
            </div>
            <input value={cyberToolInput} onChange={(e) => setCyberToolInput(e.target.value)} placeholder="Input..." style={styles.settingsSelect} />
            <button onClick={runCyberTool} style={{ ...styles.uploadBtn, backgroundColor: theme.primary, marginTop: 12, width: '100%', justifyContent: 'center' }}><Icon name="zap" size={16} color="#fff" /><span>Run</span></button>
            {cyberToolOutput && (<div style={{ marginTop: 16 }}><pre style={{ background: '#000', border: '1px solid #333', borderRadius: 8, padding: 12, color: '#4f8', fontFamily: "'Courier New', monospace", fontSize: 12, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{cyberToolOutput}</pre><button onClick={() => navigator.clipboard.writeText(cyberToolOutput)} style={{ ...styles.uploadBtn, backgroundColor: theme.primary, marginTop: 8, width: '100%', justifyContent: 'center' }}><Icon name="copy" size={16} color="#fff" /><span>Copy</span></button></div>)}
          </div>
        )}
      </div>
    )
  }

  if (isFullscreenCall) return (
    <div style={styles.fullscreenCallOverlay}>
      <button onClick={toggleFullscreenCall} style={styles.returnBtn}><Icon name="arrowLeft" size={28} color="#fff" /> Return</button>
      <div style={styles.fullscreenCallContentNoBall}>
        <div style={styles.fullscreenListeningStatus}>{isListening ? <div style={{...styles.fullscreenListeningDot, backgroundColor: theme.primary, boxShadow: `0 0 20px ${theme.primary}`}} /> : isAISpeaking ? <div style={{...styles.fullscreenSpeakingDot, backgroundColor: theme.primary, boxShadow: `0 0 20px ${theme.primary}`}} /> : null}<span style={styles.fullscreenStatusText}>{isListening ? 'Listening...' : isAISpeaking ? 'Speaking...' : 'Tap mic to talk'}</span></div>
        {interimTranscript && <div style={styles.fullscreenTranscript}>{interimTranscript}</div>}
        <button onClick={interruptAndListen} style={{...styles.fullscreenMicBtn, backgroundColor: theme.primary, borderColor: theme.primary, boxShadow: `0 0 60px ${hexA(theme.primary, 0.4)}`}} disabled={isProcessing}><Icon name="mic" size={48} color="#fff" /></button>
      </div>
    </div>
  )

  if (showRotateOverlay) return (
    <div style={styles.rotateOverlay}>
      <div style={{...styles.rotateCard, borderColor: theme.primary}}>
        <Icon name="rotate" size={48} color={theme.primary} />
        <div style={styles.rotateText}>Pls Rotate device if you are using Android</div>
        <button onClick={() => setShowRotateOverlay(false)} style={{...styles.rotateOkBtn, backgroundColor: theme.primary}}>OK</button>
      </div>
    </div>
  )

  // CHAT OVERVIEW
  if (showChatOverview) return (
    <div style={{...styles.chatOverviewContainer, backgroundColor: theme.secondary, backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center'}}>
      
      {/* REVISED TOP BAR: Only Voice toggle and Menu button */}
      <div style={styles.chatOverviewHeader}>
        <div style={{flex: 1}}></div>
        <button onClick={() => setChatOverviewVoiceEnabled(!chatOverviewVoiceEnabled)} style={styles.chatOverviewVoiceToggle}>
          <Icon name={chatOverviewVoiceEnabled ? 'volume2' : 'volumeX'} size={22} color="#fff" />
        </button>
        <button onClick={() => setShowChatMenu(!showChatMenu)} style={styles.chatOverviewVoiceToggle}>
          <Icon name="menu" size={22} color="#fff" />
        </button>
      </div>

      {/* CHAT MANAGEMENT MENU DROPDOWN */}
      {showChatMenu && (
        <div style={styles.chatMenuDropdown}>
          <div style={{padding: 10, borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <span style={{color: theme.primary, fontSize: 12, fontWeight: 'bold'}}>CHAT SECTIONS</span>
            <button onClick={createNewChat} style={{background: theme.primary, border: 'none', borderRadius: 4, padding: '4px 8px', color: '#fff', fontSize: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4}}><Icon name="plus" size={12} color="#fff"/> NEW</button>
          </div>
          <div style={{maxHeight: 300, overflowY: 'auto'}}>
            {chats.map(c => (
              <div key={c.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', borderBottom: '1px solid #1a1a1a', backgroundColor: activeChatId === c.id ? hexA(theme.primary, 0.1) : 'transparent'}}>
                <span onClick={() => switchChat(c.id)} style={{color: activeChatId === c.id ? theme.primary : '#ccc', fontSize: 13, cursor: 'pointer', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{c.title}</span>
                <div style={{display: 'flex', gap: 6}}>
                  <button onClick={() => renameChat(c.id)} style={{background: 'none', border: 'none', cursor: 'pointer', padding: 4}}><Icon name="edit" size={14} color="#888"/></button>
                  <button onClick={() => deleteChat(c.id)} style={{background: 'none', border: 'none', cursor: 'pointer', padding: 4}}><Icon name="trash" size={14} color="#888"/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={styles.chatOverviewMessages}>
        {conversation.length === 0 && <div style={styles.chatOverviewEmpty}><p>Start a conversation! Tap "New" to create a fresh chat.</p></div>}
        {conversation.map(msg => (
          <div key={msg.id} style={{ ...styles.chatOverviewMsg, alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', backgroundColor: msg.role === 'user' ? theme.primary : 'rgba(26,26,26,0.9)', ...(settings.compactMode ? { padding: '6px 10px' } : {}) }}>
            {msg.replyToText && <div style={{...styles.replyQuote, borderLeftColor: theme.primary}}><Icon name="reply" size={12} color={theme.primary} /><span style={{...styles.replyQuoteText, color: theme.primary}}>{msg.replyToText}...</span></div>}
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
        {isProcessing && settings.typingIndicator && <div style={{ ...styles.chatOverviewMsg, alignSelf: 'flex-start', backgroundColor: 'rgba(26,26,26,0.9)' }}><span style={styles.chatOverviewMsgText}>● ● ●</span></div>}
        <div ref={chatEndRef} />
      </div>
      {replyingTo && <div style={{...styles.replyBar, borderTopColor: theme.primary}}><div style={{ flex: 1, overflow: 'hidden' }}><div style={{ color: theme.primary, fontSize: 11, fontWeight: 'bold', marginBottom: 2 }}>Replying to:</div><div style={{ color: '#ddd', fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{replyingTo.content.slice(0, 60)}...</div></div><button onClick={() => setReplyingTo(null)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', padding: 4 }}><Icon name="x" size={18} color="#888" /></button></div>}
      <div style={styles.chatOverviewInputRowRaised}>
        <input type="text" value={chatOverviewInput} onChange={(e) => setChatOverviewInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendOverviewText()} placeholder={pendingCode ? 'Answer the question...' : replyingTo ? 'Reply...' : 'Type a message...'} style={styles.chatOverviewInput} disabled={isProcessing} />
        <div style={styles.voiceControls}>
          {!isRecordingVoice && !voicePaused ? <button onClick={startVoiceRecording} style={styles.chatOverviewMicBtn}><Icon name="mic" size={20} color="#fff" /></button> : (<>{voicePaused ? <button onClick={resumeVoiceRecording} style={styles.chatOverviewMicBtn}><Icon name="play" size={20} color="#4f8" /></button> : <button onClick={pauseVoiceRecording} style={styles.chatOverviewMicBtn}><Icon name="pause" size={20} color={theme.primary} /></button>}<button onClick={deleteVoiceRecording} style={styles.chatOverviewMicBtn}><Icon name="trash" size={20} color={theme.primary} /></button><button onClick={sendVoiceRecording} style={{...styles.chatOverviewSendBtn, backgroundColor: theme.primary}} disabled={isProcessing || !voiceTranscript.trim()}><Icon name="send" size={20} color="#fff" /></button></>)}
        </div>
        <label style={styles.chatOverviewAttachBtn}><Icon name="file" size={20} color="#fff" /><input type="file" accept="image/*,video/*,.pdf,.doc,.docx,.txt" onChange={handleOverviewFileShare} style={{ display: 'none' }} /></label>
        <button onClick={sendOverviewText} style={{...styles.chatOverviewSendBtn, backgroundColor: theme.primary}} disabled={isProcessing}><Icon name="send" size={20} color="#fff" /></button>
      </div>
      {voiceTranscript && !chatOverviewListening && <div style={styles.voiceTranscriptPreview}>"{voiceTranscript}"</div>}
    </div>
  )

  if (editingProfile) return (
    <div style={styles.profileContainer}><div style={{...styles.profileCard, borderColor: theme.primary}}><h1 style={{...styles.profileTitle, color: theme.primary}}>EDIT PROFILE</h1><div style={styles.avatarUploadArea} onClick={() => fileInputRef.current?.click()}>{profileForm.avatar ? <img src={profileForm.avatar} alt="" style={styles.avatarPreview} /> : <span style={{...styles.avatarIcon, color: theme.primary}}><Icon name="camera" size={32} color={theme.primary} /><br />Tap to select</span>}</div><input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} /><div style={styles.inputGroup}><label style={{...styles.label, color: theme.primary}}><Icon name="user" size={14} color={theme.primary} /> Name *</label><input type="text" value={profileForm.name} onChange={(e) => setProfileForm(p => ({ ...p, name: e.target.value }))} style={{...styles.textInput, borderColor: theme.primary}} /></div><div style={styles.inputGroup}><label style={{...styles.label, color: theme.primary}}><Icon name="atSign" size={14} color={theme.primary} /> Username *</label><input type="text" value={profileForm.username} onChange={(e) => setProfileForm(p => ({ ...p, username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '') }))} style={{...styles.textInput, borderColor: theme.primary}} /></div><div style={styles.inputGroup}><label style={{...styles.label, color: theme.primary}}><Icon name="pencil" size={14} color={theme.primary} /> Bio</label><textarea value={profileForm.bio} onChange={(e) => setProfileForm(p => ({ ...p, bio: e.target.value }))} style={{...styles.bioInput, borderColor: theme.primary}} /></div><div style={styles.profileBtnRow}><button onClick={() => setEditingProfile(false)} style={styles.cancelBtn}>Cancel</button><button onClick={saveProfile} style={{...styles.createBtn, backgroundColor: theme.primary}}>SAVE</button></div></div></div>
  )

  // ==================== ANDROID VIEW ====================
  if (viewMode === 'android') return (
    <div style={{ ...styles.appAndroid, backgroundColor: theme.secondary, ...(settings.highContrast ? { filter: 'contrast(1.3)' } : {}) }}>
      {sidebarOpen && (<>
        <div style={styles.sidebarOverlay} onClick={() => setSidebarOpen(false)} />
        <div style={styles.sidebar}>
          <div style={styles.sidebarHeader}>
            <h2 style={{...styles.sidebarTitle, color: theme.primary}}><Icon name="settings" size={20} color={theme.primary} /> CONTROL PANEL</h2>
            <button onClick={() => setSidebarOpen(false)} style={styles.closeBtn}><Icon name="x" size={20} color="#888" /></button>
          </div>

          <div style={styles.sidebarSection}>
            <h3 style={{...styles.sectionTitle, color: theme.primary, borderBottomColor: '#333'}}><Icon name="calendar" size={16} color={theme.primary} /> AI DASHBOARD</h3>
            <div style={{...styles.statsCard, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6}}>
              <span style={{fontSize: 11, color: '#ccc'}}>{dash.date}</span>
              <span style={{fontSize: 11, color: theme.primary, fontWeight: 'bold'}}>{dash.time}</span>
              <span style={{fontSize: 11, color: '#ccc'}}>{dash.day}</span>
              {dash.temp && <span style={{fontSize: 11, color: theme.primary}}>{dash.temp}</span>}
            </div>
          </div>

          <div style={styles.sidebarSection}>
            <h3 style={{...styles.sectionTitle, color: theme.primary, borderBottomColor: '#333'}}><Icon name="desktop" size={16} color={theme.primary} /> VIEW MODE</h3>
            <div style={styles.settingRow}><span style={styles.settingLabel}>Android</span><button onClick={toggleView} style={styles.toggleBtn}>PC</button></div>
          </div>

          <div style={styles.sidebarSection}>
            <h3 style={{...styles.sectionTitle, color: theme.primary, borderBottomColor: '#333'}}><Icon name="sparkles" size={16} color={theme.primary} /> QUICK TOOLS {settings.restrictTools && userMode !== 'loggedin' && <Icon name="lock" size={12} color="#888" />}</h3>
            <button onClick={() => { setSidebarOpen(false); setShowWorkspace(true) }} style={{...styles.toolBtn, backgroundColor: hexA(theme.primary, 0.2), border: `1px solid ${theme.primary}`}}><Icon name="layers" size={16} color={theme.primary} /> AI WORKSPACE</button>
            <button onClick={() => { if (requireLogin('Cyber Lab')) { setSidebarOpen(false); setShowCyberLab(true) } }} style={styles.toolBtn}><Icon name="shield" size={16} color="#fff" /> Cyber Lab / Terminal</button>
            <button onClick={() => { if (requireLogin('Music Generator')) { setSidebarOpen(false); setShowMusicPanel(true) } }} style={styles.toolBtn}><Icon name="music" size={16} color="#fff" /> Music Generator</button>
            <button onClick={() => { if (requireLogin('Video Generator')) { setSidebarOpen(false); setShowVideoPanel(true) } }} style={styles.toolBtn}><Icon name="video" size={16} color="#fff" /> Video Generator</button>
            <button onClick={() => { setSidebarOpen(false); setShowSettings(true) }} style={styles.toolBtn}><Icon name="cog" size={16} color="#fff" /> Settings</button>
          </div>

          <div style={styles.sidebarSection}>
            <h3 style={{...styles.sectionTitle, color: theme.primary, borderBottomColor: '#333'}}><Icon name="chart" size={16} color={theme.primary} /> SYSTEM</h3>
            <div style={styles.statsCard}>
              <div style={styles.statRow}><span style={styles.statLabel}><Icon name="hourglass" size={14} color="#888" /> Uptime</span><span style={{...styles.statValue, color: theme.primary}}>{fmtU(stats.uptime)}</span></div>
              <div style={styles.statRow}><span style={styles.statLabel}><Icon name="cpu" size={14} color="#888" /> CPU</span><span style={{...styles.statValue, color: theme.primary}}>{stats.cpuUsage}%</span></div>
              <div style={styles.statRow}><span style={styles.statLabel}><Icon name="memory" size={14} color="#888" /> RAM</span><span style={{...styles.statValue, color: theme.primary}}>{stats.ramUsage.toFixed(1)} GB</span></div>
            </div>
          </div>

          <div style={styles.sidebarSection}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <h3 style={{...styles.sectionTitle, color: theme.primary, borderBottomColor: '#333'}}><Icon name="chat" size={16} color={theme.primary} /> CHAT ({chats.length})</h3>
              <button onClick={() => { setSidebarOpen(false); setShowChatOverview(true) }} style={styles.overviewBtn}><Icon name="desktop" size={14} color="#fff" /> Overview</button>
            </div>
            <select value={activeChatId || ''} onChange={(e) => switchChat(e.target.value)} style={{ width: '100%', padding: 8, background: '#1a1a1a', color: '#fff', border: '1px solid #333', borderRadius: 6, marginBottom: 8, fontSize: 12, boxSizing: 'border-box' }}>
              {chats.map(c => <option key={c.id} value={c.id}>{c.title} ({c.messages.length})</option>)}
            </select>
            <button onClick={createNewChat} style={{ ...styles.toolBtn, marginBottom: 8 }}><Icon name="plus" size={16} color="#fff" /> New Chat</button>

            <div style={{ maxHeight: 220, overflowY: 'auto', marginBottom: 8, border: '1px solid #1a1a1a', borderRadius: 6, padding: 6, backgroundColor: '#050505' }}>
              {conversation.length === 0 && <p style={styles.dashEmptyPC}>No messages yet</p>}
              {conversation.slice(-30).map(msg => (
                <div key={msg.id} style={{ padding: '6px 8px', marginBottom: 4, borderRadius: 4, background: msg.role === 'user' ? hexA(theme.primary, 0.15) : 'rgba(255,255,255,0.04)', borderLeft: msg.role === 'user' ? `3px solid ${theme.primary}` : '3px solid #ff6688' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                    <span style={{ fontWeight: 'bold', color: msg.role === 'user' ? theme.primary : '#fff', fontSize: 10, letterSpacing: 1 }}>{msg.role === 'user' ? (profile?.name || 'YOU') : 'CYPHER4X'}</span>
                    <span style={{ fontSize: 9, color: '#666' }}>{fmtT(msg.time)}</span>
                  </div>
                  <div style={{ color: '#ddd', fontSize: 12, wordBreak: 'break-word', whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>
                    {msg.content.length > 200 ? msg.content.slice(0, 200) + '…' : msg.content}
                  </div>
                </div>
              ))}
              {isProcessing && <div style={{ padding: '6px 8px', color: theme.primary, fontSize: 11, fontStyle: 'italic' }}>● CYPHER4X is typing...</div>}
            </div>

            <div style={styles.inputRow}>
              <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') sendTextMessage() }} placeholder="Send message..." style={styles.textInputSmall} />
              <label style={styles.sendBtnSmall} title="Attach file">
                <Icon name="paperclip" size={16} color="#fff" />
                <input type="file" accept="image/*,video/*,.pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx" onChange={handleOverviewFileShare} style={{ display: 'none' }} />
              </label>
              <button onClick={sendTextMessage} style={{...styles.sendBtnSmall, backgroundColor: theme.primary}} disabled={isProcessing}><Icon name="send" size={16} color="#fff" /></button>
            </div>

            <button onClick={() => { setSidebarOpen(false); startRecording() }} style={{ ...styles.toolBtn, marginTop: 4 }}><Icon name="mic" size={16} color="#fff" /> Tap to Speak</button>
            <div style={styles.commandActionsPC}>
              <button onClick={clearConversation} style={styles.dashBtnPC}><Icon name="trash" size={14} color="#fff" /> Clear</button>
              <button onClick={exportChat} style={styles.dashBtnPC}><Icon name="save" size={14} color="#fff" /> Export</button>
            </div>
          </div>

          <div style={styles.sidebarSection}>
            <h3 style={{...styles.sectionTitle, color: theme.primary, borderBottomColor: '#333'}}><Icon name="user" size={16} color={theme.primary} /> PROFILE</h3>
            <div style={styles.profileCardSidebar}>
              <div style={styles.profileAvatarWrapper}>{profile?.avatar ? <img src={profile.avatar} alt="" style={styles.profileAvatar} /> : <div style={{...styles.profileAvatarPlaceholder, backgroundColor: theme.primary}}>{profile?.name?.charAt(0) || '?'}</div>}</div>
              <div style={styles.profileInfo}><div style={styles.profileName}>{profile?.name || 'User'}</div><div style={styles.profileHandle}><Icon name="atSign" size={12} color="#888" />{profile?.username || 'anonymous'}</div></div>
            </div>
            <button onClick={openEditProfile} style={styles.sidebarBtn}><Icon name="edit" size={14} color="#fff" /> Edit Profile</button>
            {userMode === 'loggedin' ? <button onClick={handleLogout} style={styles.logoutBtn}><Icon name="close" size={14} color="#fff" /> Logout</button> : <button onClick={() => { setShowAuthModal(true); setShowLogin(true) }} style={styles.sidebarBtn}><Icon name="settings" size={14} color="#fff" /> Login</button>}
          </div>

          <div style={styles.sidebarSection}>
            <h3 style={{...styles.sectionTitle, color: theme.primary, borderBottomColor: '#333'}}><Icon name="alertTriangle" size={16} color={theme.primary} /> DANGER ZONE</h3>
            <button onClick={resetAllData} style={styles.dangerBtn}><Icon name="trash" size={14} color="#fff" /> Reset All</button>
          </div>
          <div style={{ textAlign: 'center', color: '#666', fontSize: 10, padding: '12px 0', borderTop: '1px solid #1a1a1a', marginTop: 12 }}>{VERSION_FULL}</div>
        </div>
      </>)}

      <div style={{ ...styles.mainContentAndroid, backgroundColor: theme.secondary, backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div style={{...styles.backgroundAndroid, background: backgroundImage ? 'none' : `radial-gradient(ellipse at center, ${hexA(theme.primary, 0.06)} 0%, ${theme.secondary} 100%)`}}>
          <RedBall isSpeaking={isAISpeaking} theme={theme} />
          <div style={{...styles.faceTitleAndroid, color: theme.primary, textShadow: `0 0 40px ${theme.primary}, 0 0 80px ${hexA(theme.primary, 0.4)}, 0 0 120px ${hexA(theme.primary, 0.2)}`}}>CYPHER4X</div>
        </div>
        <div style={{ position: 'absolute', top: 22, left: '50%', transform: 'translateX(-50%)', color: theme.primary, fontSize: 10, letterSpacing: 2, fontWeight: 'bold', zIndex: 10 }}>{VERSION}</div>
        <div style={styles.topBarAndroid}>
          <button onClick={() => setSidebarOpen(true)} style={{ ...styles.hamburgerBtn, position: 'static' }}><Icon name="menu" size={28} color={theme.primary} /></button>
          <div style={styles.topRightButtons}>
            <button onClick={toggleFullscreenCall} style={{...styles.callButtonTopRight, borderColor: theme.primary, color: theme.primary, padding: '6px 10px'}}><Icon name="phone" size={18} color={isCallActive ? '#4f8' : theme.primary} /><span style={styles.callLabelTop}>{isFullscreenCall ? 'ACTIVE' : 'CALL'}</span></button>
            <button onClick={() => setShowSettings(true)} style={styles.settingsButtonTop}><Icon name="cog" size={20} color="#fff" /></button>
          </div>
        </div>

        <div style={{ position: 'absolute', top: 70, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 12, backgroundColor: 'rgba(0,0,0,0.6)', padding: '6px 16px', borderRadius: 20, border: `1px solid ${hexA(theme.primary, 0.3)}`, zIndex: 10, backdropFilter: 'blur(5px)' }}>
          <span style={{ color: theme.primary, fontSize: 11, fontWeight: 'bold' }}>{dash.date}</span>
          <span style={{ color: '#fff', fontSize: 11 }}>{dash.time}</span>
          <span style={{ color: '#ccc', fontSize: 11 }}>{dash.day}</span>
          {dash.temp && <span style={{ color: theme.primary, fontSize: 11 }}>{dash.temp}</span>}
        </div>

        <div style={styles.listeningContainer}>
          {isListening ? (<><div style={styles.listeningDot} /><span style={styles.listeningText}>Listening...</span>{interimTranscript && <span style={styles.interimText}>"{interimTranscript}"</span>}{interimTranscript && <button onClick={sendInterim} style={{...styles.sendInterimBtn, backgroundColor: theme.primary}} disabled={isProcessing}><Icon name="send" size={16} color="#fff" /><span>Send</span></button>}</>) : isProcessing ? <span style={styles.listeningText}>Processing...</span> : isRecording ? (<><div style={{ ...styles.listeningDot, backgroundColor: theme.primary, boxShadow: `0 0 20px ${theme.primary}` }} /><span style={styles.listeningText}>Recording...</span>{interimTranscript && <span style={styles.interimText}>"{interimTranscript}"</span>}</>) : null}
        </div>
        <div style={styles.voiceButtonContainer}>
          <button onClick={startRecording} disabled={isRecording || isProcessing || isFullscreenCall} style={{ ...styles.voiceButton, borderColor: theme.primary, ...(isRecording ? { ...styles.voiceButtonActive, backgroundColor: theme.primary, borderColor: theme.primary, boxShadow: `0 0 80px ${hexA(theme.primary, 0.7)}` } : {}) }}>
            <Icon name="mic" size={40} color="#fff" />
            <span style={styles.voiceLabel}>{isRecording ? 'Recording...' : isProcessing ? 'Processing...' : 'Tap to Speak'}</span>
          </button>
        </div>
        {settings.overlayButton && <button onClick={toggleOverlay} style={{ ...styles.floatingBtn, backgroundColor: overlayActive ? theme.primary : 'rgba(0,0,0,0.7)', borderColor: overlayActive ? theme.primary : '#333' }}><Icon name={overlayListening ? 'mic' : 'sparkles'} size={22} color={overlayActive ? '#fff' : theme.primary} /></button>}
      </div>
    </div>
  )

  // ==================== PC VIEW ====================
  return (
    <div style={{ ...styles.appPC, backgroundColor: theme.secondary, ...(settings.highContrast ? { filter: 'contrast(1.3)' } : {}) }}>
      <header style={{...styles.headerPC, borderBottomColor: hexA(theme.primary, 0.3)}}>
        <div style={styles.headerLeft}>
          <h1 style={{...styles.titlePC, color: theme.primary}}>CYPHER4X</h1>
          <span style={{...styles.versionBadgePC, color: theme.primary, backgroundColor: hexA(theme.primary, 0.13)}}>{VERSION}</span>
        </div>
        <div style={styles.headerRight}>
          <button onClick={toggleFullscreenCall} style={{...styles.callBtnPC, borderColor: theme.primary, color: theme.primary, padding: '4px 8px'}}><Icon name="phone" size={16} color={theme.primary} /><span>CALL</span></button>
          <button onClick={() => { if (requireLogin('Cyber Lab')) setShowCyberLab(true) }} style={styles.settingsBtnPC} title="Terminal (Login required)"><Icon name="shield" size={20} color="#fff" /></button>
          <button onClick={() => { if (requireLogin('Music Generator')) setShowMusicPanel(true) }} style={styles.settingsBtnPC} title="Music (Login required)"><Icon name="music" size={20} color="#fff" /></button>
          <button onClick={() => { if (requireLogin('Video Generator')) setShowVideoPanel(true) }} style={styles.settingsBtnPC} title="Video (Login required)"><Icon name="video" size={20} color="#fff" /></button>
          <button onClick={() => setShowSettings(true)} style={styles.settingsBtnPC} title="Settings"><Icon name="cog" size={20} color="#fff" /></button>
          <button onClick={toggleView} style={styles.settingsBtnPC} title="Switch to Android view"><Icon name="mobile" size={20} color="#fff" /></button>
          <button onClick={startRecording} disabled={isRecording || isProcessing} style={{...styles.voiceBtnPC, borderColor: theme.primary, color: theme.primary}}><Icon name="mic" size={20} color={theme.primary} /><span>Speak</span></button>
        </div>
      </header>
      <div style={styles.pcLayout}>
        <div style={styles.pcSidebar}>
          <div style={styles.pcSidebarSection}>
            <h3 style={{...styles.pcSidebarTitle, color: theme.primary}}><Icon name="chart" size={16} color={theme.primary} /> STATS</h3>
            <div style={styles.pcSidebarRow}><span>CPU</span><span>{stats.cpuUsage}%</span></div>
            <div style={styles.pcSidebarRow}><span>RAM</span><span>{stats.ramUsage.toFixed(1)} GB</span></div>
            <div style={styles.pcSidebarRow}><span>Uptime</span><span>{fmtU(stats.uptime)}</span></div>
          </div>
          
          <div style={styles.pcSidebarSection}>
            <h3 style={{...styles.pcSidebarTitle, color: theme.primary}}><Icon name="calendar" size={16} color={theme.primary} /> DASHBOARD</h3>
            <div style={styles.pcSidebarRow}><span>Date</span><span>{dash.date}</span></div>
            <div style={styles.pcSidebarRow}><span>Time</span><span>{dash.time}</span></div>
            <div style={styles.pcSidebarRow}><span>Day</span><span>{dash.day}</span></div>
            {dash.temp && <div style={styles.pcSidebarRow}><span>Temp</span><span>{dash.temp}</span></div>}
          </div>

          <div style={styles.pcSidebarSection}>
            <h3 style={{...styles.pcSidebarTitle, color: theme.primary}}><Icon name="chat" size={16} color={theme.primary} /> CHATS</h3>
            <button onClick={createNewChat} style={styles.sidebarBtnPC}><Icon name="plus" size={14} color="#fff" /> New Chat</button>
            <button onClick={() => setShowChatOverview(true)} style={styles.sidebarBtnPC}><Icon name="chat" size={14} color="#fff" /> Open Chat</button>
          </div>
          <div style={styles.pcSidebarSection}>
            <h3 style={{...styles.pcSidebarTitle, color: theme.primary}}><Icon name="user" size={16} color={theme.primary} /> PROFILE</h3>
            <button onClick={openEditProfile} style={styles.sidebarBtnPC}><Icon name="edit" size={14} color="#fff" /> Edit Profile</button>
            {userMode === 'loggedin' ? <button onClick={handleLogout} style={styles.logoutBtnPC}><Icon name="close" size={14} color="#fff" /> Logout</button> : <button onClick={() => { setShowAuthModal(true); setShowLogin(true) }} style={styles.sidebarBtnPC}><Icon name="settings" size={14} color="#fff" /> Login</button>}
          </div>
          <div style={{ textAlign: 'center', color: '#666', fontSize: 10, padding: '12px 0', borderTop: '1px solid #1a1a1a', marginTop: 12 }}>{VERSION_FULL}</div>
        </div>
        <div style={{ ...styles.pcMain, backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div style={styles.pcBallContainer}><RedBall isSpeaking={isAISpeaking} theme={theme} /></div>
          <div style={styles.pcListeningContainer}>
            {isListening ? <><div style={styles.listeningDot} /><span style={styles.listeningText}>Listening...</span>{interimTranscript && <span style={styles.interimText}>"{interimTranscript}"</span>}</> : isProcessing ? <span style={styles.listeningText}>Processing...</span> : isRecording ? <><div style={{ ...styles.listeningDot, backgroundColor: theme.primary }} /><span style={styles.listeningText}>Recording...</span></> : null}
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
  // INTRO SEQUENCE
  introContainer: { position: 'fixed', inset: 0, backgroundColor: '#000', zIndex: 999999, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' },
  introBackground: { position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, #111 0%, #000 100%)' },
  introContent: { position: 'relative', zIndex: 1, textAlign: 'center' },
  introText: { color: '#fff', fontSize: 'clamp(20px, 5vw, 48px)', fontWeight: 'bold', letterSpacing: 6, fontFamily: "'Courier New', monospace", textTransform: 'uppercase' },

  // ENTRY LOADING SCREEN
  enterOverlay: { position: 'fixed', inset: 0, backgroundColor: '#000', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', fontFamily: "'Courier New',monospace" },
  enterBackground: { position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, #1a0000 0%, #000 70%)' },
  enterContent: { position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 420, padding: 20, animation: 'fadeUp 0.6s ease' },
  enterTitle: { fontSize: 38, letterSpacing: 10, margin: '0 0 8px', fontWeight: 'bold' },
  enterSubtitleSmall: { color: '#ff6688', fontSize: 12, letterSpacing: 3, marginBottom: 50, opacity: 0.7 },
  enterUpdatingWrap: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 24 },
  enterUpdatingLabel: { fontSize: 22, fontWeight: 'bold', letterSpacing: 4, fontFamily: "'Courier New', monospace" },
  enterUpdatingDots: { display: 'flex', alignItems: 'center', gap: 0, fontSize: 22, fontWeight: 'bold' },
  enterProgressBarWrap: { width: '100%', height: 4, backgroundColor: '#1a1a1a', borderRadius: 4, overflow: 'hidden', marginBottom: 8, boxShadow: 'inset 0 0 6px #000' },
  enterProgressBar: { height: '100%', transition: 'width 0.1s linear' },
  enterPercent: { fontSize: 12, letterSpacing: 2, fontFamily: "'Courier New',monospace" },
  enterMessageSmall: { color: '#888', fontSize: 11, letterSpacing: 2, marginTop: 16, fontFamily: "'Courier New', monospace", minHeight: 16 },

  appAndroid: { minHeight: '100vh', height: '100vh', color: '#e0e0e0', fontFamily: "'Segoe UI','Courier New',monospace", overflow: 'hidden', margin: 0, padding: 0 },
  bootContainer: { backgroundColor: '#000', minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }, 
  bootBackground: { position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center,#1a0000 0%,#000 70%)' },
  bootContent: { position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 500, padding: 20 },
  bootTitle: { fontSize: 'clamp(48px,12vw,72px)', fontWeight: 'bold', letterSpacing: 8, margin: '0 0 10px', minHeight: 80, fontFamily: "'Courier New',monospace" },
  bootCursor: { display: 'inline-block', animation: 'blink 0.7s step-end infinite' },
  bootSubtitle: { fontSize: 'clamp(14px,2vw,20px)', letterSpacing: 4, marginBottom: 40, opacity: 0.8 },
  bootCredit: { fontSize: 14, marginTop: 20, opacity: 0.7, paddingTop: 16, minHeight: 30, fontFamily: "'Courier New',monospace" },

  // WORKSPACE STYLES
  workspaceContainer: { position: 'fixed', inset: 0, backgroundColor: '#050505', zIndex: 99998, display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: "'Segoe UI', 'Courier New', monospace" },
  workspaceHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#0a0a0a', borderBottom: '1px solid #222', flexShrink: 0 },
  workspaceExitBtn: { display: 'flex', alignItems: 'center', gap: 6, backgroundColor: 'transparent', border: '1px solid', borderRadius: 6, padding: '6px 12px', cursor: 'pointer', fontSize: 12, fontWeight: 'bold' },
  workspaceExportBtn: { display: 'flex', alignItems: 'center', gap: 6, backgroundColor: 'transparent', border: '1px solid', borderRadius: 6, padding: '6px 12px', cursor: 'pointer', fontSize: 12, fontWeight: 'bold' },
  workspaceTitle: { margin: 0, fontSize: 16, letterSpacing: 2, fontWeight: 'bold' },
  workspaceBody: { flex: 1, display: 'flex', flexDirection: 'row', overflow: 'hidden' },
  
  // Workspace Left Panel
  workspaceLeftPanel: { width: 'clamp(250px, 25%, 350px)', backgroundColor: '#0a0a0a', borderRight: '1px solid #222', display: 'flex', flexDirection: 'column', padding: 15, overflow: 'hidden' },
  workspacePanelHeader: { color: '#fff', fontSize: 11, fontWeight: 'bold', letterSpacing: 1, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 },
  workspaceTaskList: { flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, paddingRight: 5 },
  workspaceTaskItem: { backgroundColor: '#111', padding: 10, borderRadius: 6, border: '1px solid #222' },
  workspaceLogList: { flex: 1, overflowY: 'auto', backgroundColor: '#000', borderRadius: 6, padding: 10, border: '1px solid #222' },
  
  // Workspace Center Panel
  workspaceCenterPanel: { flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#111', overflow: 'hidden' },
  workspaceTabs: { display: 'flex', borderBottom: '1px solid #222', backgroundColor: '#0a0a0a', flexShrink: 0 },
  workspaceTabBtn: { flex: 1, padding: '12px 0', backgroundColor: 'transparent', border: 'none', borderBottom: '2px solid transparent', cursor: 'pointer', fontSize: 12, fontWeight: 'bold', letterSpacing: 1, transition: 'all 0.2s' },
  workspaceCanvasArea: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20, overflow: 'auto', position: 'relative' },
  
  // Workspace Right Panel
  workspaceRightPanel: { width: 'clamp(300px, 30%, 400px)', backgroundColor: '#0a0a0a', borderLeft: '1px solid #222', display: 'flex', flexDirection: 'column', padding: 15, overflow: 'hidden' },
  workspaceChatArea: { flex: 1, overflowY: 'auto', overflowX: 'auto', display: 'flex', flexDirection: 'column', gap: 8, paddingRight: 5, marginBottom: 10, whiteSpace: 'nowrap' },
  workspaceInputRow: { display: 'flex', gap: 8, alignItems: 'center', backgroundColor: '#111', padding: 8, borderRadius: 8, border: '1px solid #333' },
  workspaceInput: { flex: 1, padding: '10px 12px', backgroundColor: 'transparent', border: 'none', color: '#fff', fontSize: 13, outline: 'none' },
  workspaceMicBtn: { padding: 10, borderRadius: 6, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  workspaceSendBtn: { padding: 10, borderRadius: 6, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },

  // BASE APP STYLES
  authModalOverlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 },
  authModalCard: { width: '100%', maxWidth: 400, backgroundColor: '#111', border: '2px solid', borderRadius: 12, padding: 30, textAlign: 'center', position: 'relative' },
  authModalClose: { position: 'absolute', top: 10, right: 15, background: 'none', border: 'none', color: '#888', fontSize: 24, cursor: 'pointer' },
  authTitle: { fontSize: 32, letterSpacing: 4, marginBottom: 4 },
  authSubtitle: { fontSize: 18, marginBottom: 20 },
  authError: { fontSize: 14, minHeight: 24, marginBottom: 12 },
  authInput: { width: '100%', padding: 12, marginBottom: 12, backgroundColor: '#000', border: '1px solid #333', color: '#fff', borderRadius: 6, fontSize: 16, outline: 'none', boxSizing: 'border-box' },
  authBtn: { width: '100%', padding: 14, color: '#fff', border: 'none', borderRadius: 6, fontSize: 18, fontWeight: 'bold', cursor: 'pointer', marginTop: 8 },
  authSwitch: { marginTop: 16, display: 'flex', justifyContent: 'center', gap: 8, color: '#888', fontSize: 14 },
  authSwitchBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 'bold', textDecoration: 'underline' },
  guestLimitOverlay: { position: 'fixed', inset: 0, zIndex: 99998, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 },
  guestLimitCard: { backgroundColor: '#111', border: '2px solid', borderRadius: 20, padding: '40px 30px', maxWidth: 420, width: '100%', textAlign: 'center' },
  guestLimitTitle: { fontSize: 24, marginBottom: 16 },
  guestLimitText: { color: '#ddd', fontSize: 16, lineHeight: 1.6, marginBottom: 24 },
  guestLimitButtons: { display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' },
  guestLimitLoginBtn: { padding: '12px 30px', color: '#fff', border: 'none', borderRadius: 30, fontSize: 16, fontWeight: 'bold', cursor: 'pointer', flex: 1, minWidth: 100 },
  guestLimitSignupBtn: { padding: '12px 30px', backgroundColor: '#1a3a3a', color: '#fff', border: '1px solid #2a5a5a', borderRadius: 30, fontSize: 16, fontWeight: 'bold', cursor: 'pointer', flex: 1, minWidth: 100 },
  settingsFullscreen: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, height: '100dvh', backgroundColor: '#000', zIndex: 100000, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  settingsHeaderFull: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #333', backgroundColor: '#0a0000', flexShrink: 0 },
  settingsTitleFull: { fontSize: 20, margin: 0, letterSpacing: 2 },
  settingsCloseFull: { background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'flex' },
  settingsBodyFull: { flex: 1, minHeight: 0, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 20, WebkitOverflowScrolling: 'touch' },
  settingsSection: { borderBottom: '1px solid #1a1a1a', paddingBottom: 20 },
  settingsSectionTitle: { fontSize: 14, margin: '0 0 16px', letterSpacing: 1, textTransform: 'uppercase' },
  settingsDoneFull: { padding: 16, color: '#fff', border: 'none', fontSize: 16, fontWeight: 'bold', cursor: 'pointer', flexShrink: 0, paddingBottom: 'max(16px, env(safe-area-inset-bottom, 16px))' },
  backgroundControls: { display: 'flex', gap: 10, flexWrap: 'wrap' },
  uploadBtn: { padding: '10px 16px', color: '#fff', borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 'bold', border: 'none' },
  resetBtn: { padding: '10px 16px', backgroundColor: '#333', color: '#fff', borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 'bold', border: 'none' },
  bgPreview: { marginTop: 12, borderRadius: 8, overflow: 'hidden', border: '1px solid #333' },
  bgPreviewImg: { width: '100%', maxHeight: 150, objectFit: 'cover', display: 'block' },
  bgHint: { color: '#888', fontSize: 12, marginTop: 8, fontStyle: 'italic', lineHeight: 1.5 },
  settingItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff', fontSize: 15, marginBottom: 14, gap: 10 },
  settingsSelect: { padding: '10px 12px', backgroundColor: '#000', border: '1px solid #444', color: '#fff', borderRadius: 6, fontSize: 14, width: '100%', boxSizing: 'border-box' },
  settingsRange: { width: 140 },
  settingsValue: { color: '#ff6688', minWidth: 40, textAlign: 'right', fontWeight: 'bold' },
  colorPicker: { width: 60, height: 32, border: '1px solid #333', borderRadius: 6, background: '#000', cursor: 'pointer' },
  presetRow: { display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 },
  presetBtn: { padding: '6px 14px', border: '1px solid #333', borderRadius: 20, color: '#fff', fontSize: 12, fontWeight: 'bold', cursor: 'pointer', textShadow: '0 1px 2px rgba(0,0,0,0.6)' },
  dashGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 10, marginBottom: 16 },
  dashTile: { padding: 14, backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 10, textAlign: 'center' },
  dashTileLabel: { color: '#888', fontSize: 10, letterSpacing: 1, marginTop: 6, textTransform: 'uppercase' },
  dashTileValue: { color: '#fff', fontSize: 13, fontWeight: 'bold', marginTop: 2 },
  rotateOverlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 99996, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 },
  rotateCard: { backgroundColor: '#111', border: '2px solid', borderRadius: 20, padding: '40px 30px', maxWidth: 400, width: '100%', textAlign: 'center' },
  rotateText: { color: '#fff', fontSize: 18, margin: '20px 0', lineHeight: 1.6 },
  rotateOkBtn: { padding: '12px 40px', color: '#fff', border: 'none', borderRadius: 30, fontSize: 16, fontWeight: 'bold', cursor: 'pointer' },
  fullscreenCallOverlay: { position: 'fixed', inset: 0, backgroundColor: '#000', zIndex: 99995, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20 },
  returnBtn: { position: 'absolute', top: 20, left: 20, backgroundColor: 'rgba(255,0,60,0.3)', border: '1px solid #ff003c', borderRadius: 30, padding: '10px 20px', color: '#fff', fontSize: 16, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' },
  fullscreenCallContentNoBall: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30, width: '100%', maxWidth: 500, flex: 1 },
  fullscreenListeningStatus: { display: 'flex', alignItems: 'center', gap: 12, backgroundColor: 'rgba(255,255,255,0.05)', padding: '8px 20px', borderRadius: 30, border: '1px solid rgba(255,0,60,0.2)' },
  fullscreenListeningDot: { width: 12, height: 12, borderRadius: '50%', animation: 'pulseText 0.8s ease-in-out infinite' },
  fullscreenSpeakingDot: { width: 12, height: 12, borderRadius: '50%', animation: 'pulseText 0.8s ease-in-out infinite' },
  fullscreenStatusText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  fullscreenTranscript: { color: '#ff6688', fontSize: 16, fontStyle: 'italic', padding: '8px 20px', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 12, maxWidth: '90%', textAlign: 'center', border: '1px solid rgba(255,0,60,0.2)', minHeight: 40 },
  fullscreenMicBtn: { width: 'clamp(70px,14vw,100px)', height: 'clamp(70px,14vw,100px)', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  
  // REVISED CHAT OVERVIEW STYLES
  chatOverviewContainer: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, height: '100dvh', backgroundColor: '#000', zIndex: 99994, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  chatOverviewHeader: { display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '12px 16px', backgroundColor: '#111', borderBottom: '1px solid #333', flexShrink: 0, gap: 12 },
  chatOverviewVoiceToggle: { background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 6, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)' },
  chatMenuDropdown: { position: 'absolute', top: 60, right: 20, width: 'clamp(250px, 80vw, 350px)', backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: 8, zIndex: 99999, boxShadow: '0 4px 20px rgba(0,0,0,0.8)', overflow: 'hidden' },
  chatOverviewMessages: { flex: 1, minHeight: 0, overflowY: 'auto', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8, WebkitOverflowScrolling: 'touch' },
  chatOverviewEmpty: { color: '#666', textAlign: 'center', fontSize: 16, marginTop: 40 },
  chatOverviewMsg: { maxWidth: '88%', padding: '10px 14px', borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 4, position: 'relative' },
  chatOverviewMsgText: { color: '#fff', fontSize: 14, wordBreak: 'break-word', whiteSpace: 'pre-wrap' },
  chatOverviewMsgTime: { fontSize: 10, color: '#888', alignSelf: 'flex-end' },
  replyQuote: { display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', backgroundColor: 'rgba(255,255,255,0.08)', borderLeft: '3px solid', borderRadius: 4, marginBottom: 4 },
  replyQuoteText: { fontSize: 11, fontStyle: 'italic', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  replyBar: { display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', backgroundColor: '#1a1a1a', borderTop: '2px solid' },
  chatOverviewInputRowRaised: { display: 'flex', gap: 8, padding: '12px 16px', paddingBottom: 'max(30px, env(safe-area-inset-bottom, 50px))', backgroundColor: '#111', borderTop: '1px solid #333', flexShrink: 0, alignItems: 'center' },
  chatOverviewInput: { flex: 1, padding: '10px 14px', backgroundColor: '#000', border: '1px solid #333', color: '#fff', borderRadius: 20, fontSize: 14, outline: 'none' },
  chatOverviewMicBtn: { background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 8, borderRadius: '50%', backgroundColor: 'rgba(255,0,60,0.2)' },
  chatOverviewAttachBtn: { background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 8, borderRadius: '50%', backgroundColor: 'rgba(255,0,60,0.2)', display: 'flex', alignItems: 'center' },
  chatOverviewSendBtn: { background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 8, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  voiceControls: { display: 'flex', gap: 6, alignItems: 'center' },
  voiceTranscriptPreview: { position: 'absolute', bottom: 80, left: 16, right: 16, backgroundColor: 'rgba(0,0,0,0.8)', padding: '8px 16px', borderRadius: 12, color: '#ff6688', fontSize: 14, fontStyle: 'italic', border: '1px solid rgba(255,0,60,0.3)', textAlign: 'center' },
  msgActions: { display: 'flex', gap: 4, justifyContent: 'flex-end', marginTop: 4, opacity: 0.7 },
  msgActionBtn: { background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px', borderRadius: 4 },
  codeBlockWrap: { marginTop: 8, marginBottom: 8, borderRadius: 8, overflow: 'hidden', border: '1px solid #333', backgroundColor: '#0a0a0a', alignSelf: 'stretch' },
  codeBlockHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', backgroundColor: '#1a1a1a' },
  codeLang: { fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  codeCopyBtn: { display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', color: '#fff', border: 'none', borderRadius: 4, fontSize: 11, fontWeight: 'bold', cursor: 'pointer' },
  codeBlock: { margin: 0, padding: 12, color: '#e0e0e0', fontSize: 12, fontFamily: "'Courier New',monospace", whiteSpace: 'pre', overflowX: 'auto', lineHeight: 1.5 },
  profileContainer: { backgroundColor: '#000', minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 },
  profileCard: { width: '100%', maxWidth: 420, backgroundColor: '#111', border: '2px solid', borderRadius: 12, padding: 28 },
  profileTitle: { textAlign: 'center', marginBottom: 24, fontSize: 22 },
  avatarUploadArea: { width: 130, height: 130, borderRadius: '50%', border: '3px dashed', margin: '0 auto 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: '#1a1a1a' },
  avatarPreview: { width: '100%', height: '100%', objectFit: 'cover' },
  avatarIcon: { fontSize: 14, textAlign: 'center' },
  inputGroup: { marginBottom: 18 },
  label: { fontSize: 14, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 },
  textInput: { width: '100%', padding: 14, backgroundColor: '#000', border: '1px solid', color: '#fff', borderRadius: 8, fontSize: 15, outline: 'none', boxSizing: 'border-box' },
  bioInput: { width: '100%', minHeight: 80, padding: 14, backgroundColor: '#000', border: '1px solid', color: '#fff', borderRadius: 8, fontSize: 15, outline: 'none', resize: 'vertical', boxSizing: 'border-box' },
  profileBtnRow: { display: 'flex', gap: 12, marginTop: 12 },
  createBtn: { flex: 1, padding: 14, color: '#fff', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 'bold', cursor: 'pointer' },
  cancelBtn: { padding: '14px 20px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: 8, fontSize: 15, cursor: 'pointer' },
  sidebarOverlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 998 },
  sidebar: { position: 'fixed', top: 0, left: 0, bottom: 0, width: 380, maxWidth: '90vw', backgroundColor: '#0a0000', borderRight: '2px solid #ff003c', zIndex: 999, overflowY: 'auto', padding: 16 },
  sidebarHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, paddingBottom: 10, borderBottom: '1px solid #333' },
  sidebarTitle: { fontSize: 18, fontWeight: 'bold', margin: 0, fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: 8 },
  closeBtn: { backgroundColor: 'transparent', border: 'none', color: '#888', fontSize: 20, cursor: 'pointer', padding: 4, display: 'flex' },
  sidebarSection: { marginBottom: 12 },
  sectionTitle: { fontSize: 14, margin: '0 0 8px', paddingBottom: 4, borderBottom: '1px solid #333', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: 6 },
  settingRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  settingLabel: { fontSize: 13, color: '#ddd' },
  settingValue: { fontSize: 13, color: '#ff6688' },
  toggleBtn: { padding: '4px 12px', borderRadius: 3, border: 'none', fontSize: 11, fontWeight: 'bold', cursor: 'pointer', backgroundColor: '#333', color: '#fff' },
  toolBtn: { padding: '8px 12px', backgroundColor: '#1a1a1a', color: '#fff', border: '1px solid #333', borderRadius: 6, cursor: 'pointer', width: '100%', marginTop: 4, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 'bold' },
  statsCard: { border: '1px solid #ff003c40', borderRadius: 6, padding: '10px 12px', backgroundColor: '#0a0a0a' },
  statRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2px 0', fontSize: 12 },
  statLabel: { color: '#aaa', display: 'flex', alignItems: 'center', gap: 4 },
  statValue: { fontWeight: 500 },
  profileCardSidebar: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 },
  profileAvatarWrapper: { flexShrink: 0 },
  profileAvatar: { width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', border: '2px solid #ff003c' },
  profileAvatarPlaceholder: { width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18, fontWeight: 'bold' },
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
  mainContentAndroid: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', height: '100vh', margin: 0, padding: 0 },
  backgroundAndroid: { position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 0 },
  ballContainer: { position: 'relative', width: 300, height: 300, pointerEvents: 'none', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  ball3DContainer: { perspective: 800, transformStyle: 'preserve-3d' },
  ball3D: { width: 180, height: 180, borderRadius: '50%', position: 'relative', transformStyle: 'preserve-3d' },
  ball3DSpeaking: {},
  ballHighlight: { position: 'absolute', top: '18%', left: '22%', width: '35%', height: '25%', borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(255,255,255,0.6) 0%,transparent 70%)', filter: 'blur(4px)', pointerEvents: 'none' },
  ballInnerGlow: { position: 'absolute', top: '15%', left: '15%', width: '70%', height: '70%', borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,100,140,0.2) 0%,transparent 60%)', pointerEvents: 'none' },
  ring1: { position: 'absolute', top: '50%', left: '50%', width: 240, height: 240, marginLeft: -120, marginTop: -120, borderRadius: '50%', border: '2px solid', animation: 'spinRing 12s linear infinite' },
  ring2: { position: 'absolute', top: '50%', left: '50%', width: 280, height: 280, marginLeft: -140, marginTop: -140, borderRadius: '50%', border: '1px solid', animation: 'spinRing 18s linear infinite reverse' },
  ring3: { position: 'absolute', top: '50%', left: '50%', width: 200, height: 200, marginLeft: -100, marginTop: -100, borderRadius: '50%', border: '1px dashed', animation: 'spinRing 8s linear infinite' },
  faceTitleAndroid: { position: 'absolute', bottom: '35%', fontSize: 'clamp(42px,6vw,68px)', fontWeight: 'bold', letterSpacing: 10, textAlign: 'center', width: '100%', zIndex: 2, animation: 'pulseText 2.5s ease-in-out infinite', fontFamily: "'Courier New',monospace" },
  topBarAndroid: { position: 'absolute', top: 20, left: 20, right: 20, zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  callButtonTopRight: { backgroundColor: 'rgba(0,0,0,0.6)', border: '2px solid', borderRadius: 30, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, fontWeight: 'bold', letterSpacing: 1 },
  callLabelTop: { fontSize: 12, fontWeight: 'bold', letterSpacing: 1, color: '#fff' },
  listeningContainer: { position: 'absolute', top: 90, left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', alignItems: 'center', gap: 12, backgroundColor: 'rgba(0,0,0,0.5)', padding: '8px 20px', borderRadius: 30, border: '1px solid rgba(255,0,60,0.2)', backdropFilter: 'blur(10px)', flexWrap: 'wrap', justifyContent: 'center' },
  listeningDot: { width: 10, height: 10, borderRadius: '50%', backgroundColor: '#4f8', boxShadow: '0 0 20px #4f8', animation: 'pulseText 0.8s ease-in-out infinite' },
  listeningText: { color: '#fff', fontSize: 16, fontWeight: 'bold', letterSpacing: 2, fontFamily: "'Courier New',monospace" },
  interimText: { color: '#ff6688', fontSize: 14, fontStyle: 'italic', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', borderLeft: '1px solid rgba(255,0,60,0.3)', paddingLeft: 12 },
  sendInterimBtn: { border: 'none', borderRadius: 20, padding: '4px 14px', display: 'flex', alignItems: 'center', gap: 6, color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 'bold' },
  voiceButtonContainer: { position: 'absolute', bottom: 50, left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 },
  voiceButton: { width: 90, height: 90, borderRadius: '50%', backgroundColor: '#1a1a1a', border: '3px solid', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, boxShadow: '0 0 40px rgba(255,0,60,0.2)' },
  voiceButtonActive: {},
  voiceLabel: { color: '#fff', fontSize: 12, fontWeight: 'bold', letterSpacing: 1, marginTop: 4 },
  hamburgerBtn: { backgroundColor: 'transparent', border: 'none', cursor: 'pointer', zIndex: 15, padding: 8, borderRadius: 4 },
  appPC: { minHeight: '100vh', height: '100vh', color: '#e0e0e0', fontFamily: "'Segoe UI','Courier New',monospace", overflow: 'hidden', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '100vw' },
  headerPC: { padding: '6px 12px', borderBottom: '1px solid', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0, backgroundColor: '#0a0000', flexWrap: 'wrap', gap: 4, minHeight: 44 },
  headerLeft: { display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  titlePC: { margin: 0, fontSize: 'clamp(16px,4vw,22px)', fontWeight: 'bold', letterSpacing: 2 },
  versionBadgePC: { fontSize: 10, padding: '2px 8px', borderRadius: 10 },
  headerRight: { display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  callBtnPC: { backgroundColor: 'rgba(0,0,0,0.6)', border: '1px solid', borderRadius: 16, padding: '3px 10px', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', fontSize: 11, fontWeight: 'bold' },
  voiceBtnPC: { backgroundColor: 'rgba(0,0,0,0.6)', border: '1px solid', borderRadius: 16, padding: '3px 10px', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', fontSize: 11, fontWeight: 'bold' },
  pcLayout: { flex: 1, display: 'flex', flexDirection: 'row', overflow: 'hidden', width: '100%', height: '100%' },
  pcSidebar: { width: 'clamp(180px,30%,280px)', backgroundColor: '#0a0a0a', overflowY: 'auto', padding: '8px 10px', flexShrink: 0, borderRight: '1px solid #333', height: '100%', boxSizing: 'border-box' },
  pcSidebarSection: { marginBottom: 12, borderBottom: '1px solid #1a1a1a', paddingBottom: 8 },
  pcSidebarTitle: { fontSize: 12, margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 'bold' },
  pcSidebarRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2px 0', fontSize: 11, color: '#ccc' },
  pcMain: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', backgroundColor: '#050505', overflow: 'hidden', height: '100%', padding: 10 },
  pcBallContainer: { position: 'relative', width: 'clamp(160px,25vw,300px)', height: 'clamp(160px,25vw,300px)', pointerEvents: 'none', marginBottom: 10 },
  pcListeningContainer: { display: 'flex', alignItems: 'center', gap: 8, backgroundColor: 'rgba(0,0,0,0.5)', padding: '4px 16px', borderRadius: 30, border: '1px solid rgba(255,0,60,0.2)', backdropFilter: 'blur(10px)', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '90%' },
  filePreviewPC: { marginTop: 4 },
  dashBtnPC: { padding: '3px 10px', backgroundColor: '#222', color: '#fff', border: '1px solid #333', borderRadius: 4, cursor: 'pointer', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 },
  dashEmptyPC: { color: '#666', fontSize: 12, textAlign: 'center', padding: '6px 0' },
  inputRow: { display: 'flex', gap: 6, marginTop: 4, marginBottom: 6 },
  textInputSmall: { flex: 1, padding: '6px 10px', backgroundColor: '#000', border: '1px solid #333', color: '#fff', borderRadius: 4, fontSize: 13, outline: 'none', minWidth: 0 },
  sendBtnSmall: { padding: '6px 12px', backgroundColor: '#333', border: 'none', borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#fff' },
  commandActionsPC: { display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap' },
  sidebarBtnPC: { padding: '5px 10px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', width: '100%', marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, fontSize: 12 },
  logoutBtnPC: { padding: '5px 10px', backgroundColor: '#880000', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', width: '100%', marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, fontSize: 12 },
}
