import '../styles/Header.css';

export default function Header({ isDark, onToggleTheme }) {
  return (
    <header className="header">
      <div className="header-title">
        <h1>Rock Paper Scissors</h1>
        <span>Powered by Google Teachable Machine</span>
      </div>
      <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
        <span className="theme-icon">{isDark ? '☀️' : '🌙'}</span>
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </button>
    </header>
  );
}
