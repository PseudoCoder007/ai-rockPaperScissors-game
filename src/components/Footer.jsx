import FlickeringGrid from './FlickeringGrid';
import '../styles/Footer.css';

const FEATURES = [
  { icon: '🤖', label: 'AI Gesture Recognition' },
  { icon: '⏱️', label: 'Countdown Timer' },
  { icon: '🏆', label: 'Score & Streak Tracking' },
  { icon: '🔊', label: 'Voice Announcements' },
  { icon: '🌙', label: 'Day / Night Mode' },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        {/* Left: Meet the Builder */}
        <div className="footer-col">
          <p className="footer-col-eyebrow">Meet the Builder</p>
          <p className="footer-dev-name">MOHD SAIF</p>
          <p className="footer-dev-tagline">Building the Digital World, Line by Line</p>
          <div className="footer-contact-links">
            <ContactLink
              href="https://github.com/PseudoCoder007"
              icon={<GitHubIcon />}
              label="GitHub"
              sublabel="Source and experiments"
              external
            />
            <ContactLink
              href="mailto:alisaif006123@gmail.com"
              icon={<EmailIcon />}
              label="Email"
              sublabel="alisaif006123@gmail.com"
            />
            <ContactLink
              href="https://wa.me/919336419699"
              icon={<WhatsAppIcon />}
              label="WhatsApp"
              sublabel="+91 93364 19699"
              external
            />
          </div>
        </div>

        {/* Middle: Features */}
        <div className="footer-col">
          <p className="footer-col-eyebrow">What's Inside</p>
          <div className="footer-features-grid">
            {FEATURES.map((f) => (
              <div key={f.label} className="footer-feature-item">
                <span className="footer-feature-icon">{f.icon}</span>
                <span className="footer-feature-label">{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: About the Game */}
        <div className="footer-col">
          <p className="footer-col-eyebrow">About the Game</p>
          <p className="footer-game-name">Rock Paper Scissors AI</p>
          <p className="footer-game-tagline">Show Your Hand. Beat the Machine.</p>
          <p className="footer-game-about">
            An AI-powered game that uses your webcam and Google Teachable Machine to recognize
            Rock, Paper, and Scissors gestures in real time. Built with React&nbsp;+&nbsp;Vite
            — no server needed.
          </p>
        </div>
      </div>

      {/* Flickering canvas strip */}
      <div className="footer-flickering-strip">
        <FlickeringGrid
          squareSize={4}
          gridGap={6}
          flickerChance={0.3}
          color="rgba(255, 255, 255, 0.12)"
          maxOpacity={0.25}
          text="MOHD SAIF"
          fontWeight="900"
          textColor="rgba(147, 197, 253, 0.95)"
        />
      </div>

      {/* Copyright bar */}
      <div className="footer-copyright">
        © 2026 PseudoCoder007&nbsp;|&nbsp;Designed &amp; built by Mohd Saif&nbsp;|&nbsp;Building the Digital World, Line by Line
      </div>
    </footer>
  );
}

function ContactLink({ href, icon, label, sublabel, external }) {
  return (
    <a
      href={href}
      className="footer-contact-link"
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      <span className="footer-contact-icon">{icon}</span>
      <span className="footer-contact-text">
        <span className="footer-contact-label">{label}</span>
        <span className="footer-contact-sublabel">{sublabel}</span>
      </span>
    </a>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C6.423 19.51 5.636 19.14 5.636 19.14c-1.089-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
