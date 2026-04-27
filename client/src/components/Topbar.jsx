import { IconRefresh } from './icons/Icons';

export default function Topbar({ clock }) {
  return (
    <header className="flex items-center justify-between bg-white/92 backdrop-blur-[12px] border-b border-slate-200 px-7 h-[58px] sticky top-0 z-[9] animate-slide-in-down">

      {/* Left */}
      <div className="flex items-center gap-3">
        <span className="text-[13px] font-bold text-slate-900 tracking-[-0.01em]">
          Pantau Pemilihan RW 05 &amp; RT 01–03 — Secara Langsung
        </span>
        <span className="bg-blue-ll text-blue-d text-[10px] font-bold px-2.5 py-[3px] rounded-full border border-blue-500/[.18] tracking-[.02em] whitespace-nowrap">
          Akses Publik
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2.5">
        {/* Refresh indicator */}
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
          <span className="animate-spin-slow text-slate-300">
            <IconRefresh size={13} stroke="currentColor" />
          </span>
          <span className="hidden sm:inline">Update otomatis 30d</span>
        </div>

        {/* Clock */}
        <div className="font-mono text-[12px] text-[#1558B0] bg-blue-ll px-3.5 py-[5px] rounded-full border border-blue-l tracking-[.06em] font-medium">
          {clock}
        </div>
      </div>
    </header>
  );
}
