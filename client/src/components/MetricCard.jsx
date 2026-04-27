import { useEffect, useRef } from 'react';
import { useCounterAnim } from '../hooks/useCounterAnim';
import { Icon } from './icons/Icons';

export default function MetricCard({ metric, delay = 0 }) {
  const barRef = useRef(null);
  const displayValue = useCounterAnim(metric.value, 1400);

  useEffect(() => {
    if (!metric.hasBar || !barRef.current) return;
    const timer = setTimeout(() => {
      barRef.current.style.width = metric.barWidth + '%';
    }, 700 + delay);
    return () => clearTimeout(timer);
  }, [metric, delay]);

  return (
    <div
      className={[
        'relative bg-white rounded-lg px-5 pt-5 pb-4 overflow-hidden cursor-default',
        'metric-shimmer',
        'shadow-card hover:shadow-hover hover:-translate-y-1',
        'transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)]',
        'animate-fade-slide-up',
        metric.borderClass,
      ].join(' ')}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Bottom color line on hover (pseudo via after) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: metric.color }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between mb-3.5">
        <div
          className="flex items-center justify-center w-[42px] h-[42px] rounded-[12px] flex-shrink-0 transition-transform duration-300 hover:scale-110 hover:-rotate-[5deg]"
          style={{ background: metric.bgIcon }}
        >
          <Icon name={metric.icon} size={18} stroke={metric.iconStroke} />
        </div>

        <span
          className="text-[10px] font-bold px-2.5 py-[3px] rounded-full tracking-[.02em]"
          style={{ background: metric.tagBg, color: metric.tagColor }}
        >
          {metric.tag}
        </span>
      </div>

      <div className="text-[11px] text-slate-500 font-medium mb-1">{metric.label}</div>
      <div
        className="text-[32px] font-extrabold tracking-[-0.05em] leading-none mb-1 animate-count-up"
        style={{ color: metric.color }}
      >
        {displayValue}
      </div>
      <div className="text-[11px] text-slate-400">{metric.sub}</div>

      {/* Progress bar */}
      {metric.hasBar && (
        <div className="bg-slate-100 rounded-full h-1 mt-3.5 overflow-hidden">
          <div
            ref={barRef}
            className="h-full rounded-full transition-all duration-[1600ms] ease-[cubic-bezier(.22,1,.36,1)]"
            style={{ width: '0%', background: metric.barBg }}
          />
        </div>
      )}
    </div>
  );
}
