import { useRef, useEffect, useState, useCallback } from 'react';
import Header from './components/Header';
import WebcamView from './components/WebcamView';
import CountdownTimer from './components/CountdownTimer';
import MoveDisplay from './components/MoveDisplay';
import ResultBanner from './components/ResultBanner';
import Scoreboard from './components/Scoreboard';
import Controls from './components/Controls';
import Footer from './components/Footer';
import { useGameLogic } from './hooks/useGameLogic';
import { useTeachableMachine } from './hooks/useTeachableMachine';
import { useCountdown } from './hooks/useCountdown';
import { useSpeech } from './hooks/useSpeech';
import { GAME_STATES, TTS_MESSAGES } from './utils/constants';
import './styles/App.css';

export default function App() {
  const videoRef = useRef(null);

  const [isDark, setIsDark] = useState(
    () => localStorage.getItem('theme') === 'dark'
  );

  const { state, startGame, captureGesture, noGesture, playAgain, resetScores } =
    useGameLogic();

  const { modelReady, webcamReady, error, predictGesture } =
    useTeachableMachine(videoRef);

  const { speak } = useSpeech();

  const handleCountdownComplete = useCallback(async () => {
    speak(TTS_MESSAGES.show_move);
    const gesture = await predictGesture();
    if (gesture) {
      captureGesture(gesture);
    } else {
      noGesture();
    }
  }, [predictGesture, captureGesture, noGesture, speak]);

  const { count, isRunning, startCountdown } = useCountdown(handleCountdownComplete);

  const handleStartGame = useCallback(() => {
    startGame();
    startCountdown();
  }, [startGame, startCountdown]);

  const handlePlayAgain = useCallback(() => {
    playAgain();
    startCountdown();
  }, [playAgain, startCountdown]);

  useEffect(() => {
    if (state.gameState !== GAME_STATES.RESULT) return;
    const msg = state.roundResult
      ? TTS_MESSAGES[state.roundResult]
      : TTS_MESSAGES.no_gesture;
    speak(msg);
  }, [state.roundResult, state.gameState, speak]);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      isDark ? 'dark' : 'light'
    );
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = useCallback(() => setIsDark((d) => !d), []);

  return (
    <div data-theme={isDark ? 'dark' : 'light'}>
      {/* Viewport-locked game area — fits in one screen on desktop */}
      <div className="app-viewport">
        <div className="app-wrapper">
          <Header isDark={isDark} onToggleTheme={toggleTheme} />

          <main className="app-main">
            {/* Left column: webcam + countdown + controls */}
            <div className="app-left">
              <div className="card">
                <WebcamView
                  ref={videoRef}
                  modelReady={modelReady}
                  webcamReady={webcamReady}
                  error={error}
                />
              </div>

              <div className="card">
                <CountdownTimer
                  count={count}
                  isRunning={isRunning}
                  gameState={state.gameState}
                />
              </div>

              <div className="card">
                <Controls
                  gameState={state.gameState}
                  modelReady={modelReady}
                  webcamReady={webcamReady}
                  onStartGame={handleStartGame}
                  onPlayAgain={handlePlayAgain}
                  onResetScores={resetScores}
                />
              </div>
            </div>

            {/* Right column: result + moves + scoreboard */}
            <div className="app-right">
              <div className="card">
                <ResultBanner
                  roundResult={state.roundResult}
                  gameState={state.gameState}
                />
                <MoveDisplay
                  userGesture={state.userGesture}
                  computerMove={state.computerMove}
                  roundResult={state.roundResult}
                  gameState={state.gameState}
                />
              </div>

              <div className="card">
                <p className="card-title">Scoreboard</p>
                <Scoreboard
                  userScore={state.userScore}
                  computerScore={state.computerScore}
                  drawCount={state.drawCount}
                  currentUserStreak={state.currentUserStreak}
                  longestUserStreak={state.longestUserStreak}
                  currentComputerStreak={state.currentComputerStreak}
                  longestComputerStreak={state.longestComputerStreak}
                />
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Footer scrolls below the viewport-locked game area */}
      <Footer />
    </div>
  );
}
