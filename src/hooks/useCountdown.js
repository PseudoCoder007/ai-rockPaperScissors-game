import { useState, useEffect, useRef, useCallback } from 'react';
import { COUNTDOWN_START } from '../utils/constants';

export function useCountdown(onComplete) {
  const [count, setCount] = useState(COUNTDOWN_START);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!isRunning) return;

    timerRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsRunning(false);
          onCompleteRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const startCountdown = useCallback(() => {
    setCount(COUNTDOWN_START);
    setIsRunning(true);
  }, []);

  return { count, isRunning, startCountdown };
}
