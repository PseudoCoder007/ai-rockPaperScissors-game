import { forwardRef } from 'react';
import '../styles/Webcam.css';

const WebcamView = forwardRef(function WebcamView(
  { modelReady, webcamReady, error },
  ref
) {
  const showOverlay = !webcamReady || !modelReady;

  return (
    <div className="webcam-card">
      <div className="webcam-wrapper">
        <video
          ref={ref}
          className="webcam-video"
          playsInline
          muted
          autoPlay
        />
        {showOverlay && !error && (
          <div className="webcam-overlay">
            <div className="webcam-spinner" />
            <p>
              {!webcamReady && !modelReady
                ? 'Loading camera and AI model…'
                : !webcamReady
                ? 'Starting camera…'
                : 'Loading AI model…'}
            </p>
          </div>
        )}
        {error && (
          <div className="webcam-overlay error">
            <p>⚠️ {error}</p>
          </div>
        )}
      </div>
      <div className="webcam-status-bar">
        <span className={`status-dot ${webcamReady ? 'ready' : 'loading'}`}>
          Camera
        </span>
        <span className={`status-dot ${modelReady ? 'ready' : 'loading'}`}>
          AI Model
        </span>
      </div>
    </div>
  );
});

export default WebcamView;
