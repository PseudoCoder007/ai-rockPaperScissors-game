# Rock Paper Scissors AI — Project Rules for Claude

## Project Overview

AI-powered Rock Paper Scissors game built with React + Vite. Uses Google Teachable Machine (loaded via CDN) for gesture recognition through the webcam.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 with Vite 4 |
| Language | JavaScript (ES modules, JSX) |
| AI/ML | Google Teachable Machine + TensorFlow.js 1.3.1 (CDN only) |
| Webcam | `navigator.mediaDevices.getUserMedia` |
| TTS | `window.speechSynthesis` (Web Speech API) |
| Styling | Pure CSS with custom properties — NO external UI libraries |
| State | `useReducer` in `useGameLogic.js` |

---

## Critical Rules

### Never install @teachablemachine/image or @tensorflow/tfjs as npm packages
They conflict with React 18 peer dependencies. Both are loaded via CDN `<script>` tags in `index.html`. Access via `window.tmImage` in `useTeachableMachine.js`.

### No external UI libraries
No Bootstrap, Tailwind, MUI, Chakra, etc. All styling is pure CSS using the custom properties defined in `src/styles/variables.css`.

### Theme via CSS custom properties only
All colors must reference variables like `var(--color-primary)`, `var(--color-bg)`, etc. Never hardcode hex values in component CSS. Theme switching is done by setting `data-theme="dark"` or `data-theme="light"` on the root element — CSS variables switch automatically.

### One active game state at a time
Game state is an enum: `'idle' | 'countdown' | 'result'`. All UI rendering decisions must key off `state.gameState` from `useGameLogic`. Never use local boolean flags to track game phase.

---

## File Structure

```
src/
  main.jsx                    # Entry point — imports variables.css then App
  App.jsx                     # Root — owns videoRef, wires all hooks + components

  components/
    Header.jsx                # Title + theme toggle
    WebcamView.jsx            # Video element (uses forwardRef), loading overlays
    CountdownTimer.jsx        # 3-2-1 display, "Show Your Move" prompt
    MoveDisplay.jsx           # User + Computer gesture display with emoji
    ResultBanner.jsx          # Animated win/lose/draw announcement
    Scoreboard.jsx            # Scores + streak grid
    Controls.jsx              # Start/Play Again/Reset buttons

  hooks/
    useTeachableMachine.js    # Loads tmImage from window, manages webcam stream
    useCountdown.js           # 3→2→1→0 timer, calls onComplete callback
    useGameLogic.js           # useReducer — all scores, streaks, game state
    useSpeech.js              # Wrapper for window.speechSynthesis

  utils/
    constants.js              # MODEL_URL, GESTURES, GAME_STATES, RESULT_TYPES, etc.
    gameRules.js              # determineWinner(), getComputerMove()
    streakUtils.js            # updateStreaks() pure function

  styles/
    variables.css             # All CSS custom properties (light + dark)
    App.css                   # Layout grid, .card, responsive
    *.css                     # One file per component
```

---

## Teachable Machine Model

- **Model URL:** `https://teachablemachine.withgoogle.com/models/JfhfXGxkFl/`
- **Location in code:** `src/utils/constants.js` → `MODEL_URL`
- **Class names (case-sensitive):** `Rock`, `Paper`, `Scissors`, `No Gesture`
- **Confidence threshold:** `0.7` (constant `PREDICTION_THRESHOLD`)
- To replace the model: update `MODEL_URL` in `constants.js` and ensure new model has the same 4 class names

---

## State Shape (useGameLogic reducer)

```js
{
  // Scores
  userScore: number,
  computerScore: number,
  drawCount: number,

  // Streaks
  currentUserStreak: number,
  longestUserStreak: number,
  currentComputerStreak: number,
  longestComputerStreak: number,

  // Round
  gameState: 'idle' | 'countdown' | 'result',
  userGesture: 'Rock' | 'Paper' | 'Scissors' | null,
  computerMove: 'Rock' | 'Paper' | 'Scissors' | null,
  roundResult: 'user_win' | 'computer_win' | 'draw' | null,
}
```

### Reducer Actions
- `START_GAME` — transition to countdown, clear round data
- `CAPTURE_GESTURE { gesture }` — resolve round, update scores + streaks
- `NO_GESTURE` — transition to result with null gesture/result (retry prompt)
- `PLAY_AGAIN` — transition back to countdown, clear round data
- `RESET_SCORES` — reset entire state to initialState

---

## Streak Rules

- User wins → `currentUserStreak++`, `longestUserStreak = max(current, longest)`, `currentComputerStreak = 0`
- Computer wins → `currentComputerStreak++`, `longestComputerStreak = max(current, longest)`, `currentUserStreak = 0`
- Draw → both `currentStreak` reset to 0, longest streaks unchanged
- Pure function in `src/utils/streakUtils.js` — no side effects

---

## Game Flow

```
idle
  └─[Start Game]─→ countdown (3-2-1)
                       └─[count=0]─→ predictGesture()
                                         ├─ gesture found ─→ CAPTURE_GESTURE ─→ result
                                         └─ no gesture   ─→ NO_GESTURE ─→ result
result
  ├─[Play Again] ─→ countdown
  └─[Reset]      ─→ idle
```

---

## Component Conventions

- All components are default exports
- File name matches component name (PascalCase), extension `.jsx`
- Each component imports only its own CSS file
- Props must be clearly named — no passing raw `state` objects down; destructure at the call site in App.jsx
- `WebcamView` uses `forwardRef` — the video element ref is owned by App.jsx

---

## CSS Conventions

- Import order in `main.jsx`: `variables.css` first, then `App.css` is imported by `App.jsx`
- Component CSS is imported inside the component file
- Use CSS custom properties for all colors and shadows
- Animations use `@keyframes` defined in the component's CSS file
- Responsive breakpoint: `768px` (mobile-first not required, just handle the breakpoint)

---

## Running the App

```bash
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Production build
npm run preview  # Preview production build
```

**Requirements to play:**
1. Allow camera access when prompted
2. Internet connection (loads TF.js and Teachable Machine from CDN, plus fonts)
3. Use Chrome, Edge, or Firefox (Safari may have TTS restrictions)
