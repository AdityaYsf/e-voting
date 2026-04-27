import { SECURITY } from '../data/electionData';
import { Icon } from './icons/Icons';

const BADGE = {
  'badge-teal':   { bg: '#CCFBF1', color: '#0F766E' },
  'badge-blue':   { bg: '#DBEAFE', color: '#0D3A7A' },
  'badge-orange': { bg: '#FFEDD5', color: '#EA580C' },
};

export default function SecurityPanel() {
  return (
    <div className="flex flex-col">
      {SECURITY.map((item) => {
        const b = BADGE[item.badge] || BADGE['badge-blue'];
        return (
          <div
            key={item.name}
            className="flex items-center gap-2.5 py-2.5 border-b border-slate-100 last:border-b-0 transition-all duration-200 hover:bg-slate-50 hover:rounded-lg hover:pl-1.5 group"
          >
            <div
              className="flex items-center justify-center w-8 h-8 rounded-[9px] flex-shrink-0 transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-rotate-[8deg] group-hover:scale-110"
              style={{ background: item.bgIco }}
            >
              <Icon name={item.icon} size={14} stroke={item.stroke} />
            </div>

            <div className="flex-1">
              <div className="text-[12px] font-semibold text-slate-800 mb-0.5">{item.name}</div>
              <div className="text-[10px] text-slate-400">{item.desc}</div>
            </div>

            <span
              className="text-[10px] font-bold px-2.5 py-[3px] rounded-full flex-shrink-0 tracking-[.02em]"
              style={{ background: b.bg, color: b.color }}
            >
              {item.badgeLabel}
            </span>
          </div>
        );
      })}
    </div>
  );
}
