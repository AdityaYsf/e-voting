export default function Card({ children, className = '', topAccent = '', style = {} }) {
  return (
    <div
      className={[
        'bg-white rounded-lg shadow-card hover:shadow-hover transition-shadow duration-300 p-5',
        topAccent ? `border-t-[3px] border-t-[${topAccent}]` : '',
        className,
      ].join(' ')}
      style={{
        ...(topAccent ? { borderTopColor: topAccent } : {}),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, badge }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <div className="text-[12.5px] font-bold text-slate-900 tracking-[.01em]">{title}</div>
        {subtitle && <div className="text-[11px] text-slate-400 mt-0.5">{subtitle}</div>}
      </div>
      {badge}
    </div>
  );
}

export function BadgeLive({ label = '● Langsung' }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-[3px] rounded-full bg-[#1558B0] text-white tracking-[.02em] animate-badge-pulse whitespace-nowrap">
      {label}
    </span>
  );
}

export function BadgeMint({ label }) {
  return (
    <span className="inline-flex items-center text-[10px] font-bold px-2.5 py-[3px] rounded-full bg-mint text-teal tracking-[.02em] whitespace-nowrap">
      {label}
    </span>
  );
}

export function BadgeTeal({ label }) {
  return (
    <span className="inline-flex items-center text-[10px] font-bold px-2.5 py-[3px] rounded-full bg-teal-l text-teal tracking-[.02em] whitespace-nowrap">
      {label}
    </span>
  );
}
