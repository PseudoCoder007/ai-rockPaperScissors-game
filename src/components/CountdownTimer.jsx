import { GAME_STATES } from '../utils/constants';
import '../styles/CountdownTimer.css';

export default function CountdownTimer({ count, isRunning, gameState }) {
  if (gameState === GAME_STATES.IDLE) {
    return (
      <div className="countdown-wrapper">
        <p className="countdown-idle">Press Start Game to begin</p>
      </div>
    );
  }

  if (gameState === GAME_STATES.COUNTDOWN) {
    if (count > 0) {
      return (
        <div className="countdown-wrapper">
          <p className="countdown-label">Get ready…</p>
          <div className="countdown-number" key={count}>
            {count}
          </div>
        </div>
      );
    }
    return (
      <div className="countdown-wrapper">
        <div className="countdown-show-move">
          <span className="hand-icon">✋</span>
          Show Your Move!
        </div>
      </div>
    );
  }

  if (gameState === GAME_STATES.RESULT) {
    return (
      <div className="countdown-wrapper">
        <p className="countdown-idle">Round complete</p>
      </div>
    );
  }

  return null;
}
