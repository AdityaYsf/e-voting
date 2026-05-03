import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// ── Animated counter ──────────────────────────────────────────
function useCounter(target, duration = 1800, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return val;
}

// ── Intersection observer hook ────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ── Stat card ─────────────────────────────────────────────────
function StatCard({ value, label, suffix = '', start }) {
  const count = useCounter(value, 1600, start);
  return (
    <div className="text-center">
      <div className="font-mono text-[40px] md:text-[52px] font-black text-white leading-none tracking-[-0.04em]">
        {count.toLocaleString('id-ID')}{suffix}
      </div>
      <div className="text-[11px] font-semibold text-white/40 tracking-[.12em] uppercase mt-2">{label}</div>
    </div>
  );
}

// ── Step card ─────────────────────────────────────────────────
function StepCard({ number, title, desc, icon, delay }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className="relative bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(13,58,122,.08)] border border-slate-100 transition-all duration-700"
      style={{
        opacity:    inView ? 1 : 0,
        transform:  inView ? 'translateY(0)' : 'translateY(28px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Step number */}
      <div className="absolute -top-4 -left-2 w-8 h-8 rounded-full bg-[#1558B0] text-white text-[12px] font-black flex items-center justify-center shadow-[0_4px_12px_rgba(21,88,176,.4)]">
        {number}
      </div>
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-[15px] font-bold text-slate-900 mb-2 leading-tight">{title}</h3>
      <p className="text-[12.5px] text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}

// ── Kandidat mini card ────────────────────────────────────────
function KandidatMiniCard({ kandidat, delay }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className="bg-white rounded-xl p-4 shadow-[0_2px_16px_rgba(13,58,122,.07)] border border-slate-100 flex items-center gap-3.5 hover:shadow-[0_8px_28px_rgba(13,58,122,.14)] hover:-translate-y-1 transition-all duration-300"
      style={{
        opacity:   inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${delay}ms`,
        transitionDuration: '600ms',
      }}
    >
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center text-[14px] font-black flex-shrink-0 border-2 border-white shadow-md"
        style={{ background: kandidat.bg, color: kandidat.tx }}
      >
        {kandidat.ini}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-bold text-slate-900 truncate">{kandidat.nama}</div>
        <div className="text-[10.5px] text-slate-400 truncate">{kandidat.jabatan}</div>
      </div>
      <div
        className="text-[9px] font-bold px-2 py-1 rounded-full flex-shrink-0"
        style={{ background: kandidat.bg, color: kandidat.tx }}
      >
        No. {kandidat.no}
      </div>
    </div>
  );
}

// ── Security feature row ──────────────────────────────────────
function SecurityFeature({ icon, title, desc, delay }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className="flex items-start gap-4 transition-all duration-700"
      style={{
        opacity:   inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : 'translateX(-20px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="w-10 h-10 rounded-xl bg-[#082759] flex items-center justify-center text-xl flex-shrink-0 shadow-[0_4px_12px_rgba(8,39,89,.3)]">
        {icon}
      </div>
      <div>
        <div className="text-[13.5px] font-bold text-slate-900 mb-0.5">{title}</div>
        <div className="text-[12px] text-slate-500 leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}

// ── Main Landing Page ─────────────────────────────────────────
export default function LandingPage() {
  const [statsRef, statsInView] = useInView(0.3);
  const [menuOpen, setMenuOpen] = useState(false);

  const kandidatPreview = [
    { ini: 'BS', nama: 'Budi Santoso',   jabatan: 'Calon Ketua RW 05', no: 1, bg: '#DBEAFE', tx: '#1D4ED8' },
    { ini: 'SR', nama: 'Siti Rahayu',    jabatan: 'Calon Ketua RW 05', no: 2, bg: '#CCFBF1', tx: '#0F766E' },
    { ini: 'AF', nama: 'Ahmad Fauzi',    jabatan: 'Calon Ketua RW 05', no: 3, bg: '#FFEDD5', tx: '#9A3412' },
    { ini: 'DK', nama: 'Dewi Kartika',   jabatan: 'Calon Ketua RT 01', no: 1, bg: '#DBEAFE', tx: '#1D4ED8' },
    { ini: 'HW', nama: 'Hendra Wijaya',  jabatan: 'Calon Ketua RT 01', no: 2, bg: '#CCFBF1', tx: '#0F766E' },
    { ini: 'RS', nama: 'Rini Susanti',   jabatan: 'Calon Ketua RT 02', no: 1, bg: '#DBEAFE', tx: '#1D4ED8' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFF] font-[\'Plus_Jakarta_Sans\',sans-serif] overflow-x-hidden">

      {/* ── Topbar ── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-[12px] border-b border-slate-200/80 shadow-[0_1px_12px_rgba(13,58,122,.06)]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-[60px] flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-[10px] bg-[#1558B0] flex items-center justify-center shadow-[0_2px_8px_rgba(21,88,176,.4)] group-hover:scale-105 transition-transform">
              <span className="text-white text-[14px]">🗳️</span>
            </div>
            <span className="text-[15px] font-extrabold text-slate-900 tracking-[-0.02em]">e-Pemilihan</span>
            <span className="hidden sm:inline text-[9px] font-bold text-white bg-[#1558B0] px-2 py-0.5 rounded-full tracking-[.06em]">RW 05</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-[12.5px] font-semibold text-slate-500">
            <a href="#cara-voting"  className="hover:text-[#1558B0] transition-colors">Cara Voting</a>
            <a href="#kandidat"     className="hover:text-[#1558B0] transition-colors">Kandidat</a>
            <a href="#keamanan"     className="hover:text-[#1558B0] transition-colors">Keamanan</a>
            <Link
              to="/dashboard"
              className="text-slate-500 hover:text-[#1558B0] transition-colors"
            >
              Hasil Suara
            </Link>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-2.5">
            <Link
              to="/login"
              className="text-[12.5px] font-bold text-[#1558B0] hover:text-[#0D3A7A] transition-colors hidden sm:block"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-[#1558B0] hover:bg-[#0D3A7A] text-white text-[12px] font-bold px-4 py-2 rounded-[8px] transition-all duration-200 shadow-[0_2px_8px_rgba(21,88,176,.35)] hover:shadow-[0_4px_16px_rgba(21,88,176,.45)] hover:scale-[1.02] active:scale-[.98]"
            >
              Daftar Sekarang
            </Link>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-[5px] rounded-lg hover:bg-slate-100 transition-colors"
            >
              <span className="w-4 h-[2px] bg-slate-600 rounded-full" />
              <span className="w-4 h-[2px] bg-slate-600 rounded-full" />
              <span className="w-3 h-[2px] bg-slate-600 rounded-full" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 flex flex-col gap-3 text-[13px] font-semibold text-slate-600 animate-fade-slide-down">
            <a href="#cara-voting" onClick={() => setMenuOpen(false)}>Cara Voting</a>
            <a href="#kandidat"    onClick={() => setMenuOpen(false)}>Kandidat</a>
            <a href="#keamanan"    onClick={() => setMenuOpen(false)}>Keamanan</a>
            <Link to="/dashboard"  onClick={() => setMenuOpen(false)}>Hasil Suara</Link>
            <Link to="/login"      onClick={() => setMenuOpen(false)} className="text-[#1558B0]">Login</Link>
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-[#050F2B] via-[#082759] to-[#0D3A7A] overflow-hidden">

        {/* Blobs */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[rgba(30,123,212,.2)] blur-[80px] -top-40 -right-40 pointer-events-none animate-blob-drift" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-[rgba(20,184,166,.12)] blur-[60px] bottom-0 left-10 pointer-events-none animate-blob-drift-rev" />
        <div className="absolute inset-0 opacity-[.035] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-teal-400 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-4 md:px-8 py-20 md:py-28">
          <div className="max-w-3xl">

            {/* Live badge */}
            <div className="inline-flex items-center gap-2 bg-white/[.08] border border-white/[.15] rounded-full px-4 py-1.5 text-[11px] font-bold text-white/70 tracking-[.08em] uppercase mb-6 animate-fade-slide-down">
              <span className="relative w-2 h-2 flex-shrink-0">
                <span className="absolute inset-0 rounded-full bg-[#5EEAD4]" />
                <span className="absolute -inset-1 rounded-full bg-[rgba(94,234,212,.3)] animate-ring-pulse" />
              </span>
              Pemilihan Sedang Berlangsung · 25 April 2026
            </div>

            <h1
              className="text-[36px] md:text-[56px] font-black text-white leading-[1.05] tracking-[-0.04em] mb-5 animate-fade-slide-up"
              style={{ animationDelay: '100ms' }}
            >
              Suara Anda,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-400">
                Masa Depan
              </span>{' '}
              RW 05
            </h1>

            <p
              className="text-[15px] md:text-[17px] text-white/60 leading-relaxed mb-8 max-w-xl animate-fade-slide-up"
              style={{ animationDelay: '200ms' }}
            >
              Platform pemilihan digital pertama untuk warga Kelurahan Menteng. Transparan, aman, dan bisa dilakukan dari mana saja.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-3 animate-fade-slide-up"
              style={{ animationDelay: '300ms' }}
            >
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-[#1558B0] hover:bg-[#1046A0] text-white font-bold px-6 py-3.5 rounded-xl text-[13.5px] shadow-[0_4px_20px_rgba(21,88,176,.5)] hover:shadow-[0_8px_28px_rgba(21,88,176,.6)] transition-all duration-200 hover:scale-[1.02] active:scale-[.98]"
              >
                🗳️ Daftar & Mulai Voting
              </Link>
              <a
                href="#cara-voting"
                className="inline-flex items-center gap-2 bg-white/[.08] hover:bg-white/[.15] border border-white/[.15] text-white font-bold px-6 py-3.5 rounded-xl text-[13.5px] transition-all duration-200"
              >
                Pelajari Cara Voting →
              </a>
            </div>

            {/* Trust chips */}
            <div
              className="flex flex-wrap gap-2 mt-6 animate-fade-slide-up"
              style={{ animationDelay: '400ms' }}
            >
              {['🔒 Enkripsi AES-256', '⛓️ Blockchain Audit', '👁️ 3 Pengawas KPU', '📱 Bisa dari HP'].map(c => (
                <span key={c} className="text-[11px] font-semibold text-white/60 bg-white/[.07] border border-white/[.1] px-3 py-1.5 rounded-full">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section ref={statsRef} className="bg-[#082759] py-14">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            <StatCard value={1247} label="Warga Terdaftar (DPT)" start={statsInView} />
            <StatCard value={10}   label="Kandidat"               start={statsInView} />
            <StatCard value={4}    label="Posisi Dipilih"          start={statsInView} />
            <StatCard value={100}  label="Terenkripsi"  suffix="%" start={statsInView} />
          </div>
        </div>
      </section>

      {/* ── Cara Voting ── */}
      <section id="cara-voting" className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8">

          <div className="text-center mb-14">
            <div className="inline-block text-[10px] font-black tracking-[.16em] text-[#1558B0] uppercase bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full mb-4">
              Panduan Voting
            </div>
            <h2 className="text-[28px] md:text-[36px] font-black text-slate-900 tracking-[-0.03em] leading-tight">
              Cara Memberikan Suara
            </h2>
            <p className="text-[14px] text-slate-500 mt-3 max-w-lg mx-auto leading-relaxed">
              Proses voting digital yang mudah dan aman. Selesai dalam hitungan menit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: 1, icon: '📋', title: 'Daftar Akun',         desc: 'Isi formulir pendaftaran dengan NIK, nama lengkap, dan data diri sesuai KTP.',      delay: 0   },
              { number: 2, icon: '✅', title: 'Tunggu Verifikasi',   desc: 'Panitia akan memverifikasi data Anda dalam 1×24 jam. Notifikasi dikirim via SMS.',  delay: 100 },
              { number: 3, icon: '🔐', title: 'Login & OTP',         desc: 'Login menggunakan NIK dan password, lalu konfirmasi dengan kode OTP ke HP Anda.',   delay: 200 },
              { number: 4, icon: '🗳️', title: 'Pilih Kandidat',      desc: 'Pilih kandidat untuk setiap posisi (RW, RT 01, RT 02, RT 03). Suara langsung tercatat.', delay: 300 },
            ].map(s => <StepCard key={s.number} {...s} />)}
          </div>

          {/* Note */}
          <div className="mt-8 flex items-start gap-3 bg-blue-50 border border-blue-100 border-l-4 border-l-[#1558B0] rounded-xl px-5 py-4 max-w-2xl mx-auto">
            <span className="text-[#1558B0] text-lg flex-shrink-0">ℹ️</span>
            <p className="text-[12.5px] text-[#0D3A7A] leading-relaxed">
              <strong>Penting:</strong> Setiap warga hanya dapat memberikan suara <strong>satu kali</strong> untuk setiap posisi. Pastikan pilihan Anda sudah tepat sebelum konfirmasi.
            </p>
          </div>
        </div>
      </section>

      {/* ── Kandidat preview ── */}
      <section id="kandidat" className="py-20 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-block text-[10px] font-black tracking-[.16em] text-[#0F766E] uppercase bg-teal-50 border border-teal-100 px-4 py-1.5 rounded-full mb-4">
                Kandidat 2026
              </div>
              <h2 className="text-[28px] md:text-[36px] font-black text-slate-900 tracking-[-0.03em] leading-tight">
                Kenali Calon Pemimpin Anda
              </h2>
              <p className="text-[14px] text-slate-500 mt-2">
                10 kandidat untuk 4 posisi — RW 05 dan RT 01, 02, 03
              </p>
            </div>
            <Link
              to="/profil"
              className="inline-flex items-center gap-2 text-[12.5px] font-bold text-[#1558B0] hover:text-[#0D3A7A] transition-colors whitespace-nowrap"
            >
              Lihat semua kandidat →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {kandidatPreview.map((k, i) => (
              <KandidatMiniCard key={k.ini} kandidat={k} delay={i * 80} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/profil"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-[#082759] text-white font-bold px-6 py-3 rounded-xl text-[13px] transition-all duration-200 hover:scale-[1.02] shadow-[0_4px_16px_rgba(0,0,0,.2)]"
            >
              Lihat Profil Lengkap Semua Kandidat →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Keamanan ── */}
      <section id="keamanan" className="py-20 md:py-24 bg-[#F8FAFF]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

            {/* Left */}
            <div>
              <div className="inline-block text-[10px] font-black tracking-[.16em] text-[#1558B0] uppercase bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full mb-5">
                Keamanan Sistem
              </div>
              <h2 className="text-[28px] md:text-[36px] font-black text-slate-900 tracking-[-0.03em] leading-tight mb-4">
                Suara Anda Aman &amp; Tidak Bisa Dimanipulasi
              </h2>
              <p className="text-[14px] text-slate-500 leading-relaxed mb-8">
                Sistem e-Pemilihan dirancang dengan standar keamanan tingkat tinggi, diawasi langsung oleh panitia dan pengawas independen.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-[#1558B0] text-white font-bold px-5 py-3 rounded-xl text-[13px] shadow-[0_4px_16px_rgba(21,88,176,.4)] hover:bg-[#0D3A7A] transition-colors"
              >
                Mulai Daftar Sekarang →
              </Link>
            </div>

            {/* Right */}
            <div className="flex flex-col gap-5">
              {[
                { icon: '🔒', title: 'Enkripsi AES-256',         desc: 'Setiap suara dienkripsi sebelum dikirim ke server sehingga tidak bisa dibaca pihak lain.',          delay: 0   },
                { icon: '⛓️', title: 'Audit Blockchain',          desc: 'Setiap aktivitas dicatat di blockchain yang tidak dapat dimodifikasi atau dihapus.',                delay: 100 },
                { icon: '📱', title: 'Verifikasi NIK + OTP',     desc: 'Dua lapis verifikasi: NIK sesuai data kelurahan + kode OTP ke nomor HP terdaftar.',                  delay: 200 },
                { icon: '👁️', title: '3 Pengawas Independen',    desc: 'Tiga pengawas dari KPU dan kelurahan memantau proses pemilihan secara langsung.',                   delay: 300 },
                { icon: '✋', title: 'Satu Orang Satu Suara',    desc: 'Sistem menolak otomatis percobaan voting ganda menggunakan NIK yang sama.',                          delay: 400 },
              ].map(f => <SecurityFeature key={f.title} {...f} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-16 bg-gradient-to-br from-[#082759] to-[#1558B0] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-teal-400 to-transparent" />

        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-[26px] md:text-[34px] font-black text-white tracking-[-0.03em] mb-4">
            Gunakan Hak Pilih Anda Sekarang
          </h2>
          <p className="text-[14px] text-white/60 mb-8 leading-relaxed">
            Pemilihan ditutup pukul 17.00 WIB pada 25 April 2026.<br />
            Pastikan Anda sudah terdaftar dan terverifikasi sebelum hari H.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/register"
              className="bg-white text-[#1558B0] font-black px-7 py-3.5 rounded-xl text-[13.5px] hover:bg-blue-50 transition-colors shadow-[0_4px_20px_rgba(0,0,0,.2)] hover:scale-[1.02] active:scale-[.98] transition-transform"
            >
              🗳️ Daftar & Vote Sekarang
            </Link>
            <Link
              to="/dashboard"
              className="bg-white/[.1] border border-white/[.2] text-white font-bold px-7 py-3.5 rounded-xl text-[13.5px] hover:bg-white/[.18] transition-colors"
            >
              Pantau Hasil Suara Live
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#050F2B] py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-[8px] bg-[#1558B0] flex items-center justify-center text-[12px]">🗳️</div>
            <span className="text-[14px] font-extrabold text-white tracking-[-0.01em]">e-Pemilihan</span>
            <span className="text-[10px] text-white/30">RW 05 · Kelurahan Menteng</span>
          </div>
          <div className="flex items-center gap-5 text-[11.5px] font-medium text-white/35">
            <a href="#cara-voting" className="hover:text-white/70 transition-colors">Cara Voting</a>
            <a href="#kandidat"    className="hover:text-white/70 transition-colors">Kandidat</a>
            <a href="#keamanan"    className="hover:text-white/70 transition-colors">Keamanan</a>
            <Link to="/dashboard"  className="hover:text-white/70 transition-colors">Hasil Suara</Link>
          </div>
          <div className="text-[10.5px] text-white/25 text-center md:text-right">
            © 2026 e-Pemilihan RW 05 · v2.4.1<br />
            <span className="text-white/15">Sistem diawasi KPU Kelurahan Menteng</span>
          </div>
        </div>
      </footer>
    </div>
  );
}