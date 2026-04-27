import { TABS } from '../data/electionData';

export default function ElectionTabs({ activeTab, onChange }) {
  return (
    <div className="flex gap-1 bg-white rounded-[14px] p-[5px] mb-4 shadow-card animate-fade-slide-up" style={{ animationDelay: '350ms' }}>
      {TABS.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={[
            'flex-1 py-2.5 px-2 rounded-[10px] border-none text-[12.5px] font-semibold cursor-pointer font-sans',
            'transition-all duration-[250ms] ease-[cubic-bezier(.22,1,.36,1)]',
            activeTab === tab.key
              ? 'bg-[#1558B0] text-white shadow-blue -translate-y-px'
              : 'bg-transparent text-slate-500 hover:text-[#1558B0]',
          ].join(' ')}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
