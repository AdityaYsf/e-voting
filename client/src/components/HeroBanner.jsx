export default function HeroBanner({ countdown }) {
  return (
    <div className="relative flex items-center justify-between bg-gradient-to-br from-[#082759] via-[#0D3A7A] to-[#1558B0] rounded-xl px-8 py-7 mb-5 overflow-hidden shadow-blue animate-fade-slide-down">

      {/* Animated blobs */}
      <div className="hero-blob absolute rounded-full pointer-events-none blur-[40px] w-[200px] h-[200px] bg-[rgba(30,123,212,.4)] -right-10 -top-10 animate-blob-drift" />
      <div className="hero-blob absolute rounded-full pointer-events-none blur-[40px] w-[140px] h-[140px] bg-[rgba(20,184,166,.2)] right-[140px] -bottom-14 animate-blob-drift-rev" />
      <div className="hero-blob absolute rounded-full pointer-events-none blur-[40px] w-20 h-20 bg-white/[.06] left-[200px] top-2.5 animate-blob-drift" />

      {/* Dots grid */}
      <div className="hero-dots absolute right-[320px] top-0 bottom-0 w-[100px] opacity-[.06]" />

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-teal-400 via-cyan-300 to-transparent" />

      {/* Left content */}
      <div className="relative z-[2]">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 text-[10px] font-bold tracking-[.1em] text-white/50 uppercase mb-2">
          {/* Live dot */}
          <span className="relative w-2 h-2 flex-shrink-0">
            <span className="absolute inset-0 rounded-full bg-[#67E8F9]" />
            <span className="absolute -inset-[5px] rounded-full bg-[rgba(103,232,249,.25)] animate-ring-pulse" />
          </span>
          Pemilihan Aktif Sekarang
        </div>

        <h1 className="text-[22px] font-extrabold text-white tracking-[-0.03em] mb-1.5 leading-tight">
          Pemilihan Ketua RW 05 &amp; RT 01–03
        </h1>

        <p className="text-[12px] text-white/50 flex items-center gap-1.5">
          Sabtu, 25 April 2026
          <span className="text-white/25">·</span>
          Kelurahan Menteng, Jakarta Pusat
        </p>

        {/* Chips */}
        <div className="flex gap-2 mt-3.5">
          {[
            { icon: '🔒', label: 'Terenkripsi AES-256' },
            { icon: '⛓️', label: 'Blockchain Audit' },
            { icon: '👁️', label: '3 Pengawas Aktif' },
          ].map((c) => (
            <span
              key={c.label}
              className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold px-3 py-1.5 rounded-full bg-white/[.10] border border-white/[.15] text-white/85 backdrop-blur-[4px] hover:bg-white/[.18] transition-colors cursor-default"
            >
              {c.icon} {c.label}
            </span>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-3.5 w-[200px]">
          <div className="flex justify-between text-[10px] text-white/45 mb-1.5">
            <span>Partisipasi</span>
            <span>58,9%</span>
          </div>
          <div className="h-[5px] bg-white/[.12] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-teal-300 to-cyan-300 transition-all duration-[1800ms] ease-[cubic-bezier(.22,1,.36,1)]"
              style={{ width: '58.9%', boxShadow: '0 0 8px rgba(103,232,249,.5)' }}
            />
          </div>
        </div>
      </div>

      {/* Right — countdown */}
      <div className="relative z-[2] text-right flex-shrink-0">
        <div className="text-[10px] text-white/40 uppercase tracking-[.1em] mb-1.5">Waktu Tersisa</div>
        <div
          className="font-mono text-[36px] font-medium text-white tracking-[3px] leading-none"
          style={{ textShadow: '0 2px 12px rgba(0,0,0,.2)' }}
        >
          {countdown}
        </div>
        <div className="text-[10px] text-white/32 mt-1.5">Penutupan pukul 17.00 WIB</div>
      </div>
    </div>
  );
}
