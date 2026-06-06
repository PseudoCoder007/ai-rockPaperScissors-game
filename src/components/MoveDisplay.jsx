import { GAME_STATES, GESTURE_EMOJI, RESULT_TYPES } from '../utils/constants';
import '../styles/MoveDisplay.css';

function getPanelClass(side, roundResult) {
  if (!roundResult) return '';
  if (roundResult === RESULT_TYPES.DRAW) return 'draw-panel';
  if (side === 'user' && roundResult === RESULT_TYPES.USER_WIN) return 'winner';
  if (side === 'computer' && roundResult === RESULT_TYPES.COMPUTER_WIN) return 'winner';
  return 'loser';
}

export default function MoveDisplay({ userGesture, computerMove, roundResult, gameState }) {
  const showMoves = gameState === GAME_STATES.RESULT;

  return (
    <div>
      <p className="card-title">Moves</p>
      <div className="move-display">
        <div className={`move-panel ${showMoves && userGesture ? getPanelClass('user', roundResult) : ''}`}>
          <span className="move-label">You</span>
          {showMoves && userGesture ? (
            <>
              <span className="move-emoji" key={userGesture}>
                {GESTURE_EMOJI[userGesture] || '❓'}
              </span>
              <span className="move-name">{userGesture}</span>
            </>
          ) : (
            <span className="move-placeholder">❓</span>
          )}
        </div>

        <div className="vs-divider">VS</div>

        <div className={`move-panel ${showMoves && computerMove ? getPanelClass('computer', roundResult) : ''}`}>
          <span className="move-label">Skill Issue 9000</span>
          {showMoves && computerMove ? (
            <>
              <span className="move-emoji" key={computerMove}>
                {GESTURE_EMOJI[computerMove] || '❓'}
              </span>
              <span className="move-name">{computerMove}</span>
            </>
          ) : (
            <span className="move-placeholder">🤖</span>
          )}
        </div>
        {showMoves && computerMove && (
          <p className="computer-tagline">If you lose, it&apos;s definitely a skill issue. 😈🔥</p>
        )}
      </div>
    </div>
  );
}
