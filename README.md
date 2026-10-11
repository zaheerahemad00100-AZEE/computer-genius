# TechVerse: The Talking Computer Adventure
### Computer Genius Challenge — Become a Computer Master!

[![CI](https://github.com/sayyedzaheer/techverse-talking-computer-adventure/actions/workflows/ci.yml/badge.svg)](https://github.com/sayyedzaheer/techverse-talking-computer-adventure)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff.svg)](https://vitejs.dev/)

**TechVerse: The Talking Computer Adventure** is an interactive, voice-narrated educational web quiz game crafted specifically for **Class 5 students (ages 10–11)** to help them master computer hardware components in a fun, positive, and game-show-inspired environment.

---

## 🎮 Key Features

- **🎙️ Expressive English Voice Host (Byte the Robot)**
  - Powered by the browser's native **Web Speech API** (`SpeechSynthesis` & `SpeechSynthesisUtterance`).
  - Spoken English feedback with non-repeating praises, transitions, encouraging retry hints, and final victory celebrations.
  - Automatic pacing and optional speech controls (mute/unmute, test voice).

- **🤖 15 Custom Vector Hardware Illustrations**
  - Crisp, scalable SVG illustrations crafted with child-friendly details (QWERTY layout, optical mouse sensors, RGB tower chassis, RAM golden contacts, motherboard circuit pathways, webcam privacy indicators).
  - Components covered:
    1. Monitor
    2. Keyboard
    3. Mouse
    4. CPU / System Unit
    5. Printer
    6. Speakers
    7. Microphone
    8. Webcam
    9. Headphones
    10. Scanner
    11. USB Flash Drive
    12. RAM
    13. Hard Disk / SSD
    14. Motherboard
    15. UPS (Uninterruptible Power Supply)

- **💡 Pedagogical Design & No Negative Reinforcement**
  - **First Try**: 10 Points + praise + celebratory confetti + streak counter.
  - **First Mistake**: Gentle encouraging audio boing + motivating voice line ("*Oops! No worries, champion. Give it another try!*") + 1 free retry for 5 points.
  - **Second Mistake**: Warm revelation of the correct answer and a kid-friendly hardware explanation without shaming or penalty.
  - **Byte's Riddle Clues**: Optional riddles for each device to stimulate reading and lateral thinking.

- **🏆 Badges & Achievement System**
  - *Beginner Explorer*: First correct answer.
  - *Keyboard Ninja*: 3-in-a-row correct streak.
  - *Hardware Hero*: Identifying core internal components (CPU, RAM, Motherboard).
  - *Computer Champion*: 80+ points in a single session.
  - *Future Engineer*: 120+ points in a single session.

- **👨‍🏫 Teacher & Classroom Controls**
  - Configurable quiz lengths: **5 Questions** (warm-up), **10 Questions** (standard class), or **15 Questions** (full challenge).
  - Toggles for sound FX, voice host, and riddle clues.
  - Quick test buttons for audio chimes and voice host.
  - One-click **Reset Student Data** button to clear records between student rotations.

- **💾 Safe Local Persistence**
  - Resilient storage manager defending against private browsing restrictions, storage quota limits, and corrupted JSON.
  - Tracks high scores, best streaks, category mastery (Input, Output, Processing, Storage, Power), and unlocked badges.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Dev Server**: Vite 8
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations & Effects**: Canvas Confetti, SVG Keyframe Animations
- **Synthesized Audio**: Web Audio API (zero external media downloads needed)
- **Voice Host**: Browser Web Speech API (`SpeechSynthesisUtterance`)
- **Testing**: Vitest 5

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (Node.js 20+ recommended)
- npm or yarn or bun

### Installation
```bash
# Clone the repository
git clone https://github.com/sayyedzaheer/techverse-talking-computer-adventure.git

# Navigate into the project directory
cd techverse-talking-computer-adventure

# Install dependencies
npm install
```

### Running Locally
```bash
# Start the development server
npm run dev
```
Open `http://localhost:3000` in your web browser.

---

## 🧪 Testing & Verification

The project includes an automated test suite covering question integrity, speech text formatting, storage persistence, defensive validation, scoring rules, and audio playback:

```bash
# Run the test suite with Vitest
npm test

# Type-check and lint
npm run lint

# Build for production
npm run build
```

---

## 🔒 Security & Privacy Audit

- **Zero External Tracking**: No third-party tracking scripts, cookies, or telemetry.
- **Zero Credentials**: No hardcoded API keys, tokens, or backend credentials.
- **Client-Side Isolated**: Sound synthesis and speech narration run entirely client-side using browser APIs.
- **Defensive Storage**: User inputs and storage are parsed with defensive type checks to prevent unexpected execution.
- **Safe HTML**: No `dangerouslySetInnerHTML` or `eval()`.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
