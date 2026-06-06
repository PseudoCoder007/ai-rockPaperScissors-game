import { GAME_STATES, RESULT_TYPES, RESULT_MESSAGES } from '../utils/constants';
import '../styles/ResultBanner.css';

function getBannerClass(roundResult) {
  if (!roundResult) return 'no-gesture';
  if (roundResult === RESULT_TYPES.USER_WIN) return 'win';
  if (roundResult === RESULT_TYPES.COMPUTER_WIN) return 'lose';
  return 'draw';
}

function getSubText(roundResult) {
  if (!roundResult) return 'No gesture was detected.';
  if (roundResult === RESULT_TYPES.USER_WIN) return 'Nice one! 🎉';
  if (roundResult === RESULT_TYPES.COMPUTER_WIN) return 'Better luck next time.';
  return 'Same choice!';
}

export default function ResultBanner({ roundResult, gameState }) {
  if (gameState !== GAME_STATES.RESULT) return null;

  return (
    <div className={`result-banner ${getBannerClass(roundResult)}`}>
      <span className="result-text">
        {roundResult ? RESULT_MESSAGES[roundResult] : 'Gesture Not Detected'}
      </span>
      <span className="result-sub">{getSubText(roundResult)}</span>
    </div>
  );
}
