import '../styles/Scoreboard.css';

export default function Scoreboard({
  userScore,
  computerScore,
  drawCount,
  currentUserStreak,
  longestUserStreak,
  currentComputerStreak,
  longestComputerStreak,
}) {
  const userLeads = userScore > computerScore;
  const computerLeads = computerScore > userScore;

  return (
    <div className="scoreboard">
      <div className="scoreboard-grid">
        {/* Header */}
        <div className="score-col-label category"></div>
        <div className="score-col-label">You</div>
        <div className="score-col-label">Computer</div>

        <div className="score-divider" />

        {/* Scores */}
        <div className="score-category">
          <span className="score-category-icon">🏆</span> Score
        </div>
        <div className={`score-value ${userLeads ? 'leading' : ''}`}>{userScore}</div>
        <div className={`score-value ${computerLeads ? 'leading' : ''}`}>{computerScore}</div>

        {/* Draws */}
        <div className="score-category">
          <span className="score-category-icon">🤝</span> Draws
        </div>
        <div className="score-value draws-full-span" style={{ gridColumn: '2 / 4', color: 'var(--color-draw)' }}>
          {drawCount}
        </div>

        <div className="score-divider" />

        {/* Streak section label */}
        <div className="score-section-label">
          🔥 Win Streaks
        </div>

        {/* Current streak */}
        <div className="score-category">
          <span className="score-category-icon">⚡</span> Current
        </div>
        <div className={`score-value streak ${currentUserStreak > 0 ? 'active-streak' : ''}`}>
          {currentUserStreak}
        </div>
        <div className={`score-value streak ${currentComputerStreak > 0 ? 'active-streak' : ''}`}>
          {currentComputerStreak}
        </div>

        {/* Longest streak */}
        <div className="score-category">
          <span className="score-category-icon">🏅</span> Best
        </div>
        <div className="score-value streak">{longestUserStreak}</div>
        <div className="score-value streak">{longestComputerStreak}</div>
      </div>
    </div>
  );
}
