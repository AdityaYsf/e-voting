import { useState } from 'react';
import Sidebar   from '../components/Sidebar';
import Topbar    from '../components/Topbar';
import FooterBar from '../components/FooterBar';
import { KANDIDAT_PROFILES, TABS } from '../data/electionData';
import { useCountdown } from '../hooks/useCountdown';

// ── Badge helpers ───────────────────────────────────────────
function StatusBadge({ status }) {
  return status === 'unggul'
    ? <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2.5 py-1 rounded-full bg-[#1558B0] text-white animate-badge-pulse">🏆 Unggul</span>
    : <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-500">Penantang</span>;
}

function KategoriTag({ label }) {
  return (
    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-blue-ll text-blue-d border border-blue-l tracking-[.04em]">
      {label}
    </span>
  );
}

// ── Candidate card (grid view) ──────────────────────────────
function KandidatCard({ kandidat, onSelect, delay }) {
  return (
    <div
      className="bg-white rounded-lg shadow-card hover:shadow-hover hover:-translate-y-1.5 transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] cursor-pointer group overflow-hidden animate-fade-slide-up border-t-[3px]"
      style={{ animationDelay: `${delay}ms`, borderTopColor: kandidat.bar }}
      onClick={() => onSelect(kandidat)}
    >
      {/* Top color band */}
      <div className="h-[72px] relative overflow-hidden" style={{ background: `linear-gradient(135deg,${kandidat.bar}22,${kandidat.barEnd}22)` }}>
        <div className="absolute inset-0 opacity-[.07]" style={{ backgroundImage: 'radial-gradient(circle,#000 1px,transparent 1px)', backgroundSize: '12px 12px' }} />
        {/* Nomor urut */}
        <div className="absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white" style={{ background: kandidat.bar }}>
          {kandidat.nomorUrut}
        </div>
        <div className="absolute top-3 right-3">
          <KategoriTag label={kandidat.kategoriLabel} />
        </div>
      </div>

      {/* Avatar (overlapping) */}
      <div className="px-5 -mt-7 mb-3 relative">
        <div
          className="w-14 h-14 rounded-full border-4 border-white shadow-md flex items-center justify-center text-[18px] font-bold transition-transform duration-300 group-hover:scale-110"
          style={{ background: kandidat.bg, color: kandidat.tx }}
        >
          {kandidat.ini}
        </div>
      </div>

      {/* Info */}
      <div className="px-5 pb-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-[14px] font-bold text-slate-900 leading-tight">{kandidat.name}</h3>
          <StatusBadge status={kandidat.status} />
        </div>
        <p className="text-[11px] text-slate-500 mb-3">{kandidat.jabatan}</p>

        {/* Vote bar */}
        <div className="mb-3">
          <div className="flex justify-between text-[10px] mb-1">
            <span className="text-slate-500">Perolehan suara</span>
            <span className="font-mono font-bold" style={{ color: kandidat.bar }}>{kandidat.pct}%</span>
          </div>
          <div className="bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)]"
              style={{ width: kandidat.pct + '%', background: `linear-gradient(90deg,${kandidat.bar},${kandidat.barEnd})` }}
            />
          </div>
          <div className="text-[10px] text-slate-400 mt-1 font-mono">{kandidat.votes.toLocaleString('id-ID')} suara</div>
        </div>

        {/* Programs preview */}
        <div className="flex flex-wrap gap-1 mb-4">
          {kandidat.program.slice(0, 3).map(p => (
            <span key={p} className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{p}</span>
          ))}
          {kandidat.program.length > 3 && (
            <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-blue-ll text-blue-d">+{kandidat.program.length - 3}</span>
          )}
        </div>

        {/* CTA */}
        <button
          className="w-full py-2 rounded-lg text-[11.5px] font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[.98]"
          style={{ background: `linear-gradient(90deg,${kandidat.bar},${kandidat.barEnd})` }}
        >
          Lihat Profil Lengkap →
        </button>
      </div>
    </div>
  );
}

// ── Detail modal/panel ──────────────────────────────────────
function KandidatDetail({ kandidat, onClose }) {
  if (!kandidat) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-slide-up"
        style={{ animationDelay: '0ms' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/95 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-bold border-2 border-white shadow"
              style={{ background: kandidat.bg, color: kandidat.tx }}
            >
              {kandidat.ini}
            </div>
            <div>
              <div className="text-[14px] font-bold text-slate-900">{kandidat.name}</div>
              <div className="text-[11px] text-slate-400">{kandidat.jabatan}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={kandidat.status} />
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors text-[18px] font-bold leading-none"
            >
              ×
            </button>
          </div>
        </div>

        <div className="px-6 py-5 flex flex-col gap-5">

          {/* Hero stat */}
          <div className="flex items-center gap-4 p-4 rounded-xl" style={{ background: `linear-gradient(135deg,${kandidat.bar}15,${kandidat.barEnd}10)` }}>
            <div className="text-center flex-shrink-0">
              <div className="font-mono text-[34px] font-bold leading-none" style={{ color: kandidat.bar }}>{kandidat.votes.toLocaleString('id-ID')}</div>
              <div className="text-[10px] text-slate-500 mt-1">suara diperoleh</div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between text-[10px] mb-1.5 text-slate-500">
                <span>Persentase perolehan suara</span>
                <span className="font-bold" style={{ color: kandidat.bar }}>{kandidat.pct}%</span>
              </div>
              <div className="bg-white/60 rounded-full h-2.5 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: kandidat.pct + '%', background: `linear-gradient(90deg,${kandidat.bar},${kandidat.barEnd})` }} />
              </div>
              <div className="mt-2 inline-flex items-center gap-1">
                <KategoriTag label={kandidat.kategoriLabel} />
                <span className="text-[10px] text-slate-400">· Nomor urut {kandidat.nomorUrut}</span>
              </div>
            </div>
          </div>

          {/* Bio grid */}
          <div>
            <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-[.08em] mb-3">Data Pribadi</h4>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { label: 'Tempat, Tgl Lahir', value: kandidat.ttl },
                { label: 'Pendidikan',         value: kandidat.pendidikan },
                { label: 'Pekerjaan',           value: kandidat.pekerjaan },
                { label: 'Alamat',              value: kandidat.alamat },
                { label: 'Pengalaman',          value: kandidat.pengalaman },
              ].map(item => (
                <div key={item.label} className="bg-slate-50 rounded-lg px-3.5 py-3">
                  <div className="text-[9.5px] text-slate-400 font-semibold uppercase tracking-wide mb-1">{item.label}</div>
                  <div className="text-[12px] text-slate-800 font-medium leading-snug">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visi */}
          <div>
            <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-[.08em] mb-2">Visi</h4>
            <div className="border-l-[3px] pl-4 py-1 text-[13px] text-slate-700 italic leading-relaxed" style={{ borderColor: kandidat.bar }}>
              "{kandidat.visi}"
            </div>
          </div>

          {/* Misi */}
          <div>
            <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-[.08em] mb-3">Misi</h4>
            <div className="flex flex-col gap-2">
              {kandidat.misi.map((m, i) => (
                <div key={i} className="flex items-start gap-3 bg-slate-50 rounded-lg px-3.5 py-2.5">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mt-0.5"
                    style={{ background: kandidat.bar }}
                  >
                    {i + 1}
                  </div>
                  <span className="text-[12px] text-slate-700 leading-snug">{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Program */}
          <div>
            <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-[.08em] mb-3">Program Unggulan</h4>
            <div className="flex flex-wrap gap-2">
              {kandidat.program.map((p, i) => (
                <span
                  key={p}
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full text-white animate-fade-slide-up"
                  style={{ background: `linear-gradient(90deg,${kandidat.bar},${kandidat.barEnd})`, animationDelay: `${i * 60}ms` }}
                >
                  ✦ {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main page ───────────────────────────────────────────────
export default function ProfilKandidat() {
  const [filterTab, setFilterTab]       = useState('all');
  const [selectedKandidat, setSelected] = useState(null);
  const { clock } = useCountdown();

  const allTab = { key: 'all', label: 'Semua' };
  const filterTabs = [allTab, ...TABS];

  const filtered = filterTab === 'all'
    ? KANDIDAT_PROFILES
    : KANDIDAT_PROFILES.filter(k => k.kategori === filterTab);

  return (
    <div className="relative grid min-h-screen z-[1]" style={{ gridTemplateColumns: '228px 1fr' }}>
      <Sidebar activePage="profil" />

      <div className="flex flex-col min-h-screen">
        <Topbar clock={clock} title="Profil Kandidat — Kenali Calon Pemimpin Anda" />

        <main className="flex-1 px-7 py-6">

          {/* ── Page header ── */}
          <div className="flex items-start justify-between mb-5 animate-fade-slide-down">
            <div>
              <h1 className="text-[22px] font-extrabold text-slate-900 tracking-tight leading-tight">Profil Kandidat</h1>
              <p className="text-[12.5px] text-slate-400 mt-1">
                {KANDIDAT_PROFILES.length} kandidat terdaftar dari 4 posisi · RW 05 &amp; RT 01–03
              </p>
            </div>
            {/* Total count pill */}
            <div className="flex items-center gap-2 bg-blue-ll border border-blue-l rounded-lg px-4 py-2.5">
              <span className="font-mono text-[22px] font-bold text-[#1558B0] leading-none">{KANDIDAT_PROFILES.length}</span>
              <div>
                <div className="text-[11px] font-semibold text-slate-700">Total Kandidat</div>
                <div className="text-[10px] text-slate-400">4 posisi jabatan</div>
              </div>
            </div>
          </div>

          {/* ── Filter tabs ── */}
          <div className="flex gap-1.5 mb-6 animate-fade-slide-up" style={{ animationDelay: '80ms' }}>
            {filterTabs.map(t => (
              <button
                key={t.key}
                onClick={() => setFilterTab(t.key)}
                className={[
                  'px-4 py-2 rounded-lg text-[12px] font-semibold cursor-pointer border transition-all duration-200',
                  filterTab === t.key
                    ? 'bg-[#1558B0] text-white border-[#1558B0] shadow-blue'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-[#1558B0] hover:text-[#1558B0]',
                ].join(' ')}
              >
                {t.label}
                {t.key !== 'all' && (
                  <span className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full ${filterTab === t.key ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {KANDIDAT_PROFILES.filter(k => k.kategori === t.key).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* ── Summary strip ── */}
          <div className="flex gap-3 mb-6 animate-fade-slide-up" style={{ animationDelay: '120ms' }}>
            {[
              { label: 'Calon Ketua RW', count: 3, color: '#1558B0', bg: '#DBEAFE' },
              { label: 'Calon Ketua RT 01', count: 2, color: '#0F766E', bg: '#CCFBF1' },
              { label: 'Calon Ketua RT 02', count: 3, color: '#EA580C', bg: '#FFEDD5' },
              { label: 'Calon Ketua RT 03', count: 2, color: '#7C3AED', bg: '#EDE9FE' },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-2.5 bg-white rounded-lg px-4 py-2.5 shadow-card flex-1">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-[13px] font-bold" style={{ background: s.bg, color: s.color }}>
                  {s.count}
                </div>
                <span className="text-[11.5px] font-semibold text-slate-700 leading-tight">{s.label}</span>
              </div>
            ))}
          </div>

          {/* ── Candidate grid ── */}
          <div className="grid gap-4 mb-5" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))' }}>
            {filtered.map((k, i) => (
              <KandidatCard
                key={k.id}
                kandidat={k}
                onSelect={setSelected}
                delay={i * 55}
              />
            ))}
          </div>

          {/* ── Info note ── */}
          <div className="flex items-start gap-2.5 bg-blue-ll border border-blue-l border-l-[3px] border-l-[#1558B0] rounded-md px-4 py-3 mb-5 text-[12px] text-blue-d animate-fade-slide-up" style={{ animationDelay: '600ms' }}>
            <svg className="flex-shrink-0 mt-[1px]" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1558B0" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span>
              <strong>Catatan:</strong> Profil kandidat di atas berdasarkan dokumen resmi yang diserahkan ke panitia. Data suara diperbarui secara langsung. Klik kartu kandidat untuk melihat visi, misi, dan program kerja lengkap.
            </span>
          </div>

          <FooterBar />
        </main>
      </div>

      {/* ── Detail modal ── */}
      {selectedKandidat && (
        <KandidatDetail
          kandidat={selectedKandidat}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}