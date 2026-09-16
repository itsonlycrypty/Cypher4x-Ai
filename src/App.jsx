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
          const url = status.video_url || status.url || status.output?.url || status
