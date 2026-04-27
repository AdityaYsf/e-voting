import { useState, useEffect, useRef } from 'react';

/**
 * Animates a number from 0 → target using easeOutCubic.
 * Starts once `enabled` becomes true (defaults to true immediately).
 */
export function useCounterAnim(target, duration = 1400, enabled = true) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const start = performance.now();
    const run = (t) => {
      const p = Math.min((t - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(e * target));
      if (p < 1) rafRef.current = requestAnimationFrame(run);
    };
    rafRef.current = requestAnimationFrame(run);
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
  }, [target, duration, enabled]);

  return value.toLocaleString('id-ID');
}
