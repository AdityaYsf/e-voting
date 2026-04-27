import { useEffect, useRef } from 'react';
import { PARTICIPATION } from '../data/electionData';
import TrendChart from './TrendChart';

function PartRow({ item, delay }) {
  const barRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (barRef.current) barRef.current.style.width = item.pct + '%';
    }, 800 + delay);
    return () => clearTimeout(timer);
  }, [item, delay]);

  return (
    <div className="flex items-center gap-2.5 py-2.5 border-b border-slate-100 last:border-b-0 transition-all duration-200 hover:pl-1">
      <div className="text-[12px] font-semibold text-slate-800 w-[38px] flex-shrink-0">
        {item.label}
      </div>
      <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full transition-all duration-[1600ms] ease-[cubic-bezier(.22,1,.36,1)]"
          style={{ width: '0%', background: item.barBg }}
        />
      </div>
      <div
        className="font-mono text-[12px] font-semibold w-[38px] text-right flex-shrink-0"
        style={{ color: item.pctColor }}
      >
        {item.pct}%
      </div>
      <div className="text-[10px] text-slate-400 w-[68px] text-right flex-shrink-0">
        {item.count}
      </div>
    </div>
  );
}

export default function ParticipationPanel() {
  return (
    <div>
      {PARTICIPATION.map((item, i) => (
        <PartRow key={item.label} item={item} delay={i * 100} />
      ))}

      <div className="text-[10px] font-bold tracking-[.06em] uppercase text-slate-500 mt-4 mb-2.5">
        Tren Suara Masuk (per jam)
      </div>

      <TrendChart />
    </div>
  );
}
