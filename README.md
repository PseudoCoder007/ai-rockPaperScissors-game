# Rock Paper Scissors AI

> **Show Your Hand. Beat the Machine.**

> **Live Demo:** [ai-rock-paper-scissors-game-three.vercel.app](https://ai-rock-paper-scissors-game-three.vercel.app/)

> **Project Report:** [View Full Report](https://pseudocoder007.github.io/ai-rockPaperScissors-game/PROJECT_REPORT.html)

An AI-powered Rock Paper Scissors game that uses your webcam and a custom-trained [Google Teachable Machine](https://teachablemachine.withgoogle.com/) model to recognize hand gestures in real time. Play against the computer, track your score, watch your win streak grow, and hear the results announced by voice.

Built with **React.js + Vite** — no backend required.

---

## Screenshots

**Game Interface**

![Game Interface](game_screenshot/game%20page.png)

**Footer**

![Footer](game_screenshot/game%20footer.png)

---

## Features

- **Real-time gesture recognition** via webcam and TensorFlow.js
- **Voice announcements** — browser Text-to-Speech calls out every result
- **3-2-1 countdown** with animated display before each round
- **Scoreboard** — tracks User score, Computer score, and Draws
- **Win streak tracker** — current streak and longest ever streak for both sides
- **Day / Night mode** — theme persists across sessions via localStorage
- **No server needed** — runs entirely in the browser

---

## How to Play

1. **Open the app** in Chrome, Edge, or Firefox
2. **Allow camera access** when the browser asks
3. Wait for both status indicators (`Camera` and `AI Model`) to turn **green**
4. Click **Start Game**
5. Watch the **3 → 2 → 1** countdown
6. When it says **"Show Your Move!"** — hold up ✊ Rock, ✋ Paper, or ✌️ Scissors in front of your webcam
7. The AI detects your gesture, the computer picks its move, and the winner is announced **visually + by voice**
8. Hit **Play Again** to go another round, or **Reset Scores** to start fresh

### Gesture Guide

| Gesture | Show this to the camera |
|---------|------------------------|
| ✊ Rock | Closed fist |
| ✋ Paper | Open flat hand |
| ✌️ Scissors | Two fingers in a V shape |

### Rules

- Rock beats Scissors
- Scissors beats Paper
- Paper beats Rock
- Same gesture = Draw (both current streaks reset)

### Streak System

| Event | Effect |
|-------|--------|
| You win | Your current streak +1, longest updated if new record, computer streak resets to 0 |
| Computer wins | Computer current streak +1, longest updated if new record, your streak resets to 0 |
| Draw | Both current streaks reset to 0, longest streaks are unchanged |

---

## Project Structure

```
rockPaperScissorGameAI/
│
├── index.html                  # App entry — loads TF.js + Teachable Machine via CDN
├── vite.config.js              # Vite + React plugin config
├── package.json                # Dependencies (React 18, Vite 4)
├── CLAUDE.md                   # Rules for AI-assisted development on this project
├── README.md                   # This file
│
└── src/
    ├── main.jsx                # ReactDOM entry point
    ├── App.jsx                 # Root component — wires all hooks and components
    │
    ├── components/             # UI components (one file per component)
    │   ├── Header.jsx          # App title + Day/Night mode toggle
    │   ├── WebcamView.jsx      # Live webcam feed with loading overlays
    │   ├── CountdownTimer.jsx  # Animated 3-2-1 countdown + "Show Your Move!"
    │   ├── MoveDisplay.jsx     # Shows user and computer gestures with emoji
    │   ├── ResultBanner.jsx    # Animated win / lose / draw announcement
    │   ├── Scoreboard.jsx      # Score grid with streak rows
    │   ├── Controls.jsx        # Start Game / Play Again / Reset Scores buttons
    │   └── Footer.jsx          # Developer info, portfolio and GitHub links
    │
    ├── hooks/                  # Custom React hooks
    │   ├── useTeachableMachine.js  # Loads the AI model, runs gesture prediction
    │   ├── useCountdown.js         # 3→2→1→0 interval timer
    │   ├── useGameLogic.js         # useReducer — all scores, streaks, game state
    │   └── useSpeech.js            # window.speechSynthesis wrapper
    │
    ├── utils/                  # Pure utility functions and constants
    │   ├── constants.js        # MODEL_URL, GESTURES, GAME_STATES, emoji map, TTS messages
    │   ├── gameRules.js        # determineWinner(), getComputerMove()
    │   └── streakUtils.js      # updateStreaks() — pure streak calculation
    │
    └── styles/                 # CSS (one file per component + shared base)
        ├── variables.css       # All CSS custom properties for light and dark themes
        ├── App.css             # Layout grid, .card base style, responsive breakpoint
        ├── Header.css
        ├── Webcam.css
        ├── CountdownTimer.css
        ├── MoveDisplay.css
        ├── ResultBanner.css
        ├── Scoreboard.css
        ├── Controls.css
        └── Footer.css
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) **v18 or higher**
- npm (comes with Node.js)
- A modern browser with webcam access (Chrome recommended)
- Internet connection (loads TensorFlow.js and Teachable Machine from CDN)

---

### Option 1 — Clone and Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/PseudoCoder007/ai-rockPaperScissors-game.git

# 2. Move into the project directory
cd rockPaperScissorGameAI

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open **http://localhost:5173** in your browser.

---

### Option 2 — Download ZIP

1. Click the green **Code** button on this repository
2. Select **Download ZIP**
3. Extract the folder
4. Open a terminal inside the extracted folder
5. Run:

```bash
npm install
npm run dev
```

---

### Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder. You can deploy it to GitHub Pages, Netlify, Vercel, or any static hosting service.

```bash
# Preview the production build locally
npm run preview
```

---

## AI Model Details

This project uses a custom image classification model trained on [Google Teachable Machine](https://teachablemachine.withgoogle.com/).

| Property | Value |
|----------|-------|
| Model URL | `https://teachablemachine.withgoogle.com/models/JfhfXGxkFl/` |
| Classes | Rock, Paper, Scissors, No Gesture |
| Confidence threshold | 70% (gesture accepted only if confidence ≥ 0.7) |
| Library | `@teachablemachine/image` + `@tensorflow/tfjs` via CDN |

### Train Your Own Model (optional)

1. Go to [teachablemachine.withgoogle.com](https://teachablemachine.withgoogle.com/)
2. Choose **Image Project → Standard image model**
3. Create 4 classes with **exact names**: `Rock`, `Paper`, `Scissors`, `No Gesture`
4. Record ~100–200 webcam samples per class
5. Click **Train Model**, then **Export Model → Upload (shareable link)**
6. Copy the URL and replace `MODEL_URL` in `src/utils/constants.js`

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 18 | UI framework |
| Vite 4 | Build tool and dev server |
| Google Teachable Machine | Custom gesture recognition model |
| TensorFlow.js 1.3.1 | ML inference in the browser |
| Web Speech API | Voice announcements (Text-to-Speech) |
| MediaDevices API | Webcam access |
| CSS Custom Properties | Theming (light / dark mode) |

---

## Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome | Full support (recommended) |
| Edge | Full support |
| Firefox | Full support |
| Safari | TTS may require a user gesture before speaking |

---

## Developer

**MOHD SAIF**
*Building the Digital World, Line by Line*


- Portfolio: [pseudocoder007.github.io/my-portfolio](https://pseudocoder007.github.io/my-portfolio/)
- GitHub: [github.com/PseudoCoder007](https://github.com/PseudoCoder007)

---

## License

This project is open source. Feel free to fork, modify, and build on it.
