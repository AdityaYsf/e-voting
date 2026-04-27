import { useState } from 'react';
import { NAV_MAIN, NAV_INFO } from '../data/electionData';
import { Icon, IconPin, IconVote } from './icons/Icons';
import { NavLink } from 'react-router-dom';

function NavItem({ label, icon, path }) {
  if (!path) {
    // Item yang belum ada halamannya, non-clickable
    return (
      <div className="relative flex items-center gap-2.5 px-3.5 py-2.5 mx-2.5 rounded-[8px] text-[12.5px] font-medium text-white/30 cursor-not-allowed select-none">
        <span className="flex items-center justify-center w-[30px] h-[30px] rounded-[8px] bg-white/[.05]">
          <Icon name={icon} size={14} stroke="currentColor" />
        </span>
        {label}
        <span className="ml-auto text-[8px] bg-white/10 px-1.5 py-0.5 rounded-full">Soon</span>
      </div>
    );
  }

  return (
    <NavLink
      to={path}
      className={({ isActive }) => [
        'relative flex items-center gap-2.5 px-3.5 py-2.5 mx-2.5 rounded-[8px]',
        'text-[12.5px] font-medium overflow-hidden',
        'transition-all duration-[220ms] ease-[cubic-bezier(.22,1,.36,1)]',
        'group',
        isActive
          ? 'bg-white/[.14] text-white font-semibold shadow-[inset_0_0_0_1px_rgba(255,255,255,.08)]'
          : 'text-white/60 hover:text-white hover:bg-white/[.08]',
      ].join(' ')}
    >
      {({ isActive }) => (
        <>
          <span className={[
            'absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-sm bg-teal-m',
            'transition-all duration-[220ms]',
            isActive ? 'h-[60%] scale-y-100' : 'h-[60%] scale-y-0 group-hover:scale-y-100',
          ].join(' ')} />

          <span className={[
            'flex items-center justify-center w-[30px] h-[30px] rounded-[8px] transition-all duration-[220ms]',
            isActive ? 'bg-white/[.16]' : 'bg-white/[.08] group-hover:bg-white/[.16]',
          ].join(' ')}>
            <Icon name={icon} size={14} stroke="currentColor" />
          </span>

          {label}
        </>
      )}
    </NavLink>
  );
}

export default function Sidebar() {

  return (
    <aside className="relative flex flex-col bg-[#082759] sticky top-0 h-screen overflow-y-auto z-20 border-r border-white/[.06] sb-shimmer animate-slide-in-left">

      {/* Brand */}
      <div className="relative px-4.5 pt-5 pb-4 border-b border-white/[.08]">
        <div className="flex items-center gap-3 mb-3.5">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-[14px] bg-white/[.12] border border-white/[.15] flex-shrink-0 overflow-hidden transition-all duration-300 hover:bg-white/[.22] hover:scale-105 hover:-rotate-3 hover:shadow-[0_4px_16px_rgba(0,0,0,.2)] cursor-pointer">
            <span className="absolute inset-0 bg-gradient-to-br from-white/[.18] to-transparent" />
            <IconVote size={22} stroke="white" />
          </div>
          <div>
            <div className="text-[15px] font-extrabold text-white leading-tight tracking-[-0.01em]">e-Pemilihan</div>
            <div className="text-[10px] text-white/40 mt-0.5 tracking-[.06em] uppercase">Portal Warga · Akses Publik</div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/[.08] border border-white/[.1] rounded-[10px] px-3 py-2 text-[11px] text-white/70 hover:bg-white/[.13] transition-colors cursor-default">
          <IconPin size={12} stroke="currentColor" />
          Kelurahan Menteng, Jakarta Pusat
        </div>
      </div>

      {/* Nav Main */}
      <div className="px-4 pt-4 pb-1.5 text-[9px] font-bold tracking-[.14em] text-white/28 uppercase">
        Menu Utama
      </div>
      {NAV_MAIN.map((item, i) => (
        <NavItem
          key={item.label}
          label={item.label}
          icon={item.icon}
          path={item.path}
        />
      ))}

      {/* Nav Info */}
      <div className="px-4 pt-4 pb-1.5 text-[9px] font-bold tracking-[.14em] text-white/28 uppercase">
        Informasi
      </div>
      {NAV_INFO.map((item, i) => (
        <NavItem
          key={item.label}
          label={item.label}
          icon={item.icon}
          path={item.path}
        />
      ))}

      {/* Footer */}
      <div className="mt-auto px-4 py-4 border-t border-white/[.08]">
        {/* Live pill */}
        <div className="flex items-center gap-2.5 bg-teal-500/[.15] border border-teal-400/25 rounded-3xl px-4 py-2.5 text-[11.5px] font-semibold text-white hover:bg-teal-500/[.22] transition-colors cursor-default">
          {/* Pulse ring */}
          <span className="relative w-[10px] h-[10px] flex-shrink-0">
            <span className="absolute inset-0 rounded-full bg-[#5EEAD4]" />
            <span className="absolute -inset-1 rounded-full bg-[rgba(94,234,212,.3)] animate-ring-pulse" />
          </span>
          Pemilihan Sedang Berlangsung
        </div>

        <div className="text-[9.5px] text-white/22 text-center mt-2.5 tracking-[.04em]">
          Akses Publik — Tanpa Login · v2.4.1
        </div>
      </div>
    </aside>
  );
}
