import { useState, useEffect, useRef } from 'react';
import { INITIAL_LOGS, LIVE_ENTRIES } from '../data/electionData';

/**
 * Returns { logs, latestIsNew } — simulates a live audit log
 * that appends a new entry every 5 seconds.
 */
export function useAuditLog() {
  const [logs, setLogs]           = useState(INITIAL_LOGS);
  const [latestIsNew, setLatestIsNew] = useState(false);
  const idxRef = useRef(0);

  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date();
      const ts  = now.toLocaleTimeString('id-ID', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
      });
      const txt = LIVE_ENTRIES[idxRef.current % LIVE_ENTRIES.length];
      const bad = /gagal|diblokir|habis|tidak sah/i.test(txt);

      setLogs((prev) => {
        const next = [{ time: ts, text: txt, color: bad ? '#DC2626' : '#0F766E' }, ...prev];
        return next.slice(0, 14);
      });
      setLatestIsNew(true);
      setTimeout(() => setLatestIsNew(false), 500);
      idxRef.current += 1;
    }, 5000);

    return () => clearInterval(id);
  }, []);

  return { logs, latestIsNew };
}
