import { useState, useEffect, useRef, useCallback } from 'react';
import { MODEL_URL, PREDICTION_THRESHOLD, GESTURES } from '../utils/constants';

export function useTeachableMachine(videoRef) {
  const [modelReady, setModelReady] = useState(false);
  const [webcamReady, setWebcamReady] = useState(false);
  const [error, setError] = useState(null);
  const modelRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    async function setup() {
      try {
        // tmImage is loaded via CDN script tag in index.html
        const tmImage = window.tmImage;
        if (!tmImage) {
          throw new Error('Teachable Machine library not loaded. Check your internet connection.');
        }

        modelRef.current = await tmImage.load(
          MODEL_URL + 'model.json',
          MODEL_URL + 'metadata.json'
        );
        setModelReady(true);

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: 640, height: 480 },
        });
        streamRef.current = stream;

        const video = videoRef.current;
        if (!video) throw new Error('Video element not found.');

        video.srcObject = stream;
        await new Promise((resolve) => {
          video.onloadedmetadata = resolve;
        });
        await video.play();
        setWebcamReady(true);
      } catch (err) {
        setError(err.message || 'Setup failed. Please refresh and allow camera access.');
      }
    }

    setup();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, [videoRef]);

  const predictGesture = useCallback(async () => {
    if (!modelRef.current || !videoRef.current) return null;

    const predictions = await modelRef.current.predict(videoRef.current);
    const best = predictions.reduce((a, b) =>
      a.probability > b.probability ? a : b
    );

    if (
      best.probability >= PREDICTION_THRESHOLD &&
      best.className !== GESTURES.NO_GESTURE
    ) {
      return best.className;
    }
    return null;
  }, [videoRef]);

  return { modelReady, webcamReady, error, predictGesture };
}
