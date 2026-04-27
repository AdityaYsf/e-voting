import { useState, useEffect } from 'react';

/**
 * Returns { clock, countdown } — both formatted as HH:MM:SS strings.
 * Countdown targets 17:00 WIB of the current day.
 */
export function useCountdown() {
  const [clock, setClock]       = useState('--:--:--');
  const [countdown, setCountdown] = useState('--:--:--');

  useEffect(() => {
    const pad = (n) => String(n).padStart(2, '0');

    const tick = () => {
      const now   = new Date();
      const close = new Date(now);
      close.setHours(17, 0, 0, 0);

      const diff = Math.max(0, close - now);
      const h = Math.floor(diff / 3_600_000);
      const m = Math.floor((diff % 3_600_000) / 60_000);
      const s = Math.floor((diff % 60_000)    / 1_000);

      setClock(`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`);
      setCountdown(`${pad(h)}:${pad(m)}:${pad(s)}`);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return { clock, countdown };
}
