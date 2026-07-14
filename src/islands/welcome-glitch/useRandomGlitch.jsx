import { useEffect, useRef, useState } from "react";

const MIN_DELAY = 2000;
const MAX_DELAY = 5000;
const GLITCH_DURATION = 220;

function getRandomDelay() {
  return Math.floor(
    Math.random() * (MAX_DELAY - MIN_DELAY + 1),
  ) + MIN_DELAY;
}

function useRandomGlitch(isReducedMotion) {
  const [isGlitching, setIsGlitching] = useState(false);
  const delayTimeoutRef = useRef(null);
  const durationTimeoutRef = useRef(null);

  useEffect(() => {
    if (isReducedMotion) {
      return undefined;
    }

    const scheduleGlitch = () => {
      delayTimeoutRef.current = window.setTimeout(() => {
        setIsGlitching(true);

        durationTimeoutRef.current = window.setTimeout(() => {
          setIsGlitching(false);
          scheduleGlitch();
        }, GLITCH_DURATION);
      }, getRandomDelay());
    };

    scheduleGlitch();

    return () => {
      window.clearTimeout(delayTimeoutRef.current);
      window.clearTimeout(durationTimeoutRef.current);
    };
  }, [isReducedMotion]);

  return isReducedMotion ? false : isGlitching;
}

export default useRandomGlitch;