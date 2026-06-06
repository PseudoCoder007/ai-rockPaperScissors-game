import { GAME_STATES } from '../utils/constants';
import '../styles/Controls.css';

export default function Controls({
  gameState,
  modelReady,
  webcamReady,
  onStartGame,
  onPlayAgain,
  onResetScores,
}) {
  const canStart = modelReady && webcamReady;

  if (gameState === GAME_STATES.IDLE) {
    return (
      <div className="controls">
        {!canStart && (
          <p className="loading-note">
            {!modelReady && !webcamReady
              ? 'Loading camera and AI model…'
              : !webcamReady
              ? 'Starting camera…'
              : 'Loading AI model…'}
          </p>
        )}
        <button
          className="btn btn-primary"
          onClick={onStartGame}
          disabled={!canStart}
        >
          🎮 Start Game
        </button>
      </div>
    );
  }

  if (gameState === GAME_STATES.COUNTDOWN) {
    return (
      <div className="controls">
        <button className="btn btn-primary" disabled>
          ⏳ Round in progress…
        </button>
      </div>
    );
  }

  if (gameState === GAME_STATES.RESULT) {
    return (
      <div className="controls">
        <button className="btn btn-primary" onClick={onPlayAgain}>
          🔄 Play Again
        </button>
        <button className="btn btn-danger" onClick={onResetScores}>
          🗑️ Reset Scores
        </button>
      </div>
    );
  }

  return null;
}
