import { useEffect, useRef } from 'react';

const RANK_STYLES = [
  'bg-blue-l text-blue-d',
  'bg-teal-l text-teal',
  'bg-slate-100 text-slate-500',
];

function CandidateRow({ candidate, index, tabKey }) {
  const barRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (barRef.current) barRef.current.style.width = candidate.pct + '%';
    }, 120);
    return () => clearTimeout(timer);
  }, [candidate, tabKey]);

  return (
    <div
      className="relative flex items-center gap-3 px-2 py-3.5 -mx-2 rounded-[10px] border-b border-slate-100 last:border-b-0 cursor-pointer overflow-hidden group transition-all duration-[220ms] ease-[cubic-bezier(.22,1,.36,1)] hover:translate-x-1 animate-fade-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Hover bg sweep */}
      <div className="absolute inset-0 bg-blue-ll rounded-[10px] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)]" />

      {/* Rank */}
      <div
        className={`relative z-[1] flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${RANK_STYLES[Math.min(index, 2)]}`}
      >
        {index + 1}
      </div>

      {/* Avatar */}
      <div
        className="relative z-[1] flex items-center justify-center w-10 h-10 rounded-full text-[13px] font-bold flex-shrink-0 border-2 border-white/80 shadow-[0_2px_8px_rgba(0,0,0,.08)] transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110 group-hover:shadow-[0_4px_14px_rgba(0,0,0,.12)]"
        style={{ background: candidate.bg, color: candidate.tx }}
      >
        {candidate.ini}
      </div>

      {/* Info */}
      <div className="relative z-[1] flex-1 min-w-0">
        <div className="text-[13px] font-semibold text-slate-900 mb-1.5 flex items-center gap-2">
          {candidate.name}
          {index === 0 && (
            <span className="text-[9px] font-bold px-2 py-[2px] bg-[#1558B0] text-white rounded-full animate-badge-pulse">
              Unggul
            </span>
          )}
        </div>
        {/* Bar */}
        <div className="bg-slate-100 rounded-full h-1.5 overflow-hidden bar-shimmer-wrap">
          <div
            ref={barRef}
            className="h-full rounded-full w-0 transition-[width] duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)]"
            style={{ background: `linear-gradient(90deg,${candidate.bar},${candidate.barEnd})` }}
          />
        </div>
      </div>

      {/* Votes */}
      <div className="relative z-[1] text-right flex-shrink-0">
        <div className="font-mono text-[16px] font-bold text-slate-900">
          {candidate.votes.toLocaleString('id-ID')}
        </div>
        <div className="text-[11px] text-slate-400">{candidate.pct}%</div>
      </div>
    </div>
  );
}

export default function CandidateList({ candidates, tabKey }) {
  return (
    <div>
      {candidates.map((c, i) => (
        <CandidateRow key={c.name} candidate={c} index={i} tabKey={tabKey} />
      ))}
    </div>
  );
}
