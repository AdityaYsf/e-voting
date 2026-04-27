import { useState, useEffect, useRef } from 'react';
import Sidebar   from '../components/Sidebar';
import Topbar    from '../components/Topbar';
import FooterBar from '../components/FooterBar';
import Card, { CardHeader, BadgeLive } from '../components/Card';
import DonutChart from '../components/DonutChart';
import { HASIL_SUARA, TABS } from '../data/electionData';
import { useCountdown } from '../hooks/useCountdown';
import {
  Chart, LineElement, PointElement, LineController,
  BarElement, BarController, CategoryScale, LinearScale,
  Tooltip, Filler, Legend,
} from 'chart.js';

Chart.register(
  LineElement, PointElement, LineController,
  BarElement, BarController, CategoryScale, LinearScale,
  Tooltip, Filler, Legend
);

// ── Helpers ────────────────────────────────────────────────
function StatPill({ label, value, color, bg }) {
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-lg px-5 py-3.5 shadow-card border-t-[3px] text-center" style={{ borderTopColor: color }}>
      <span className="text-[11px] text-slate-500 font-medium mb-1">{label}</span>
      <span className="font-mono text-[26px] font-bold leading-none" style={{ color }}>{value.toLocaleString('id-ID')}</span>
    </div>
  );
}

function ProgressBar({ pct, color, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const t = setTimeout(() => {
      if (ref.current) ref.current.style.width = pct + '%';
    }, 400 + delay);
    return () => clearTimeout(t);
  }, [pct, delay]);
  return (
    <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
      <div ref={ref} className="h-full rounded-full transition-all duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)]"
        style={{ width: '0%', background: `linear-gradient(90deg,${color},${color}cc)` }} />
    </div>
  );
}

// ── Hourly line chart ───────────────────────────────────────
function HourlyChart({ data }) {
  const ref  = useRef(null);
  const inst = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    if (inst.current) inst.current.destroy();
    inst.current = new Chart(ref.current, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [{
          data: data.data,
          borderColor: '#1558B0', borderWidth: 2.5,
          backgroundColor: 'rgba(21,88,176,.08)', fill: true, tension: .45,
          pointBackgroundColor: '#1558B0', pointBorderColor: '#fff',
          pointBorderWidth: 2, pointRadius: 4, pointHoverRadius: 6,
        }],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        animation: { duration: 1000, easing: 'easeOutQuart' },
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => ` ${c.parsed.y} suara` } } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 9, family: "'DM Mono',monospace" }, color: '#94A3B8' } },
          y: { grid: { color: 'rgba(21,88,176,.04)' }, ticks: { font: { size: 9 }, color: '#94A3B8' } },
        },
      },
    });
    return () => inst.current?.destroy();
  }, [data]);

  return <div className="h-[160px]"><canvas ref={ref} /></div>;
}

// ── Grouped bar chart (candidates comparison) ───────────────
function CandidateBarChart({ regions }) {
  const ref  = useRef(null);
  const inst = useRef(null);

  useEffect(() => {
    if (!ref.current || !regions.length) return;
    if (inst.current) inst.current.destroy();
    const labels   = regions.map(r => r.rt);
    const colors   = ['#1558B0', '#0F766E', '#EA580C'];
    const cNames   = regions[0]?.candidates?.map(c => c.name) ?? [];
    const datasets = cNames.map((name, i) => ({
      label: name,
      data:  regions.map(r => r.candidates[i]?.v ?? 0),
      backgroundColor: colors[i] + 'CC',
      borderColor:     colors[i],
      borderWidth: 1.5,
      borderRadius: 4,
    }));

    inst.current = new Chart(ref.current, {
      type: 'bar',
      data: { labels, datasets },
      options: {
        responsive: true, maintainAspectRatio: false,
        animation: { duration: 900, easing: 'easeOutQuart' },
        plugins: { legend: { position: 'top', labels: { font: { size: 11, family: "'Plus Jakarta Sans',sans-serif" }, boxWidth: 10, boxHeight: 10, padding: 14 } } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#64748B' } },
          y: { grid: { color: 'rgba(0,0,0,.04)' }, ticks: { font: { size: 9 }, color: '#94A3B8' } },
        },
      },
    });
    return () => inst.current?.destroy();
  }, [regions]);

  return <div className="h-[180px]"><canvas ref={ref} /></div>;
}

// ── Rank icon ───────────────────────────────────────────────
function RankIcon({ rank }) {
  if (rank === 1) return <span className="text-[18px]">🥇</span>;
  if (rank === 2) return <span className="text-[18px]">🥈</span>;
  return <span className="text-[18px]">🥉</span>;
}

// ── Main page ───────────────────────────────────────────────
export default function HasilSuara() {
  const [activeTab, setActiveTab] = useState('rw');
  const { clock } = useCountdown();
  const data = HASIL_SUARA[activeTab];

  // Wilayah breakdown for RW tab only
  const wilayahData = activeTab === 'rw'
    ? data.candidates[0].wilayah.map((w, i) => ({
        rt: w.rt,
        candidates: data.candidates.map(c => ({ name: c.name, v: c.wilayah[i]?.v ?? 0 })),
      }))
    : [];

  return (
    <div className="relative grid min-h-screen z-[1]" style={{ gridTemplateColumns: '228px 1fr' }}>
      <Sidebar activePage="hasil" />

      <div className="flex flex-col min-h-screen">
        <Topbar clock={clock} title="Hasil Suara — Data Lengkap & Transparan" />

        <main className="flex-1 px-7 py-6">

          {/* ── Page header ── */}
          <div className="flex items-start justify-between mb-5 animate-fade-slide-down">
            <div>
              <h1 className="text-[22px] font-extrabold text-slate-900 tracking-tight leading-tight">Hasil Suara</h1>
              <p className="text-[12.5px] text-slate-400 mt-1">Data penghitungan suara secara langsung &amp; transparan · Diperbarui otomatis tiap 30 detik</p>
            </div>
            <div className="flex items-center gap-2">
              <BadgeLive label="● Langsung" />
              <span className="text-[10px] text-slate-400 font-mono bg-slate-100 px-2.5 py-1 rounded-full">25 Apr 2026</span>
            </div>
          </div>

          {/* ── Tabs ── */}
          <div className="flex gap-1 bg-white rounded-[14px] p-[5px] mb-5 shadow-card animate-fade-slide-up" style={{ animationDelay: '80ms' }}>
            {TABS.map(t => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={[
                  'flex-1 py-2.5 px-2 rounded-[10px] border-none text-[12.5px] font-semibold cursor-pointer font-sans',
                  'transition-all duration-[250ms] ease-[cubic-bezier(.22,1,.36,1)]',
                  activeTab === t.key
                    ? 'bg-[#1558B0] text-white shadow-blue -translate-y-px'
                    : 'bg-transparent text-slate-500 hover:text-[#1558B0]',
                ].join(' ')}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* ── Stat pills ── */}
          <div className="grid grid-cols-4 gap-3 mb-5 animate-fade-slide-up" style={{ animationDelay: '120ms' }}>
            <StatPill label="Total DPT"           value={data.totalDPT}    color="#1558B0" />
            <StatPill label="Suara Masuk"          value={data.totalSuara}  color="#0F766E" />
            <StatPill label="Suara Sah"            value={data.sah}         color="#14B8A6" />
            <StatPill label="Suara Tidak Sah"      value={data.tidakSah}    color="#DC2626" />
          </div>

          {/* ── Partisipasi big bar ── */}
          <div className="bg-white rounded-lg shadow-card p-5 mb-5 animate-fade-slide-up" style={{ animationDelay: '160ms' }}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-[13px] font-bold text-slate-900">Tingkat Partisipasi</span>
                <span className="text-[11px] text-slate-400 ml-2">{data.label}</span>
              </div>
              <span className="font-mono text-[22px] font-bold text-[#1558B0]">
                {((data.totalSuara / data.totalDPT) * 100).toFixed(1)}%
              </span>
            </div>
            <ProgressBar pct={(data.totalSuara / data.totalDPT) * 100} color="#1558B0" />
            <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-mono">
              <span>0</span>
              <span>{data.totalSuara.toLocaleString('id-ID')} dari {data.totalDPT.toLocaleString('id-ID')} warga</span>
              <span>{data.totalDPT.toLocaleString('id-ID')}</span>
            </div>
          </div>

          {/* ── Candidates ranking + Donut ── */}
          <div className="grid mb-5" style={{ gridTemplateColumns: '1fr 300px', gap: '14px' }}>

            {/* Ranking card */}
            <Card topAccent="#1558B0" className="animate-fade-slide-up" style={{ animationDelay: '200ms' }}>
              <CardHeader
                title={`Peringkat Kandidat — ${data.label}`}
                subtitle="Diurutkan dari perolehan suara terbanyak"
                badge={<BadgeLive />}
              />
              <div className="flex flex-col gap-1">
                {data.candidates.map((c, i) => (
                  <div
                    key={c.name}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-all duration-200 group cursor-default animate-fade-slide-up"
                    style={{ animationDelay: `${240 + i * 80}ms` }}
                  >
                    {/* Rank medal */}
                    <div className="flex-shrink-0 w-8 text-center">
                      <RankIcon rank={i + 1} />
                    </div>

                    {/* Avatar */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-bold flex-shrink-0 border-2 border-white shadow-sm transition-transform duration-200 group-hover:scale-110"
                      style={{ background: c.bg, color: c.tx }}
                    >
                      {c.ini}
                    </div>

                    {/* Name + bar */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[13px] font-semibold text-slate-900">{c.name}</span>
                        {i === 0 && (
                          <span className="text-[9px] font-bold px-2 py-[2px] rounded-full text-white animate-badge-pulse" style={{ background: '#1558B0' }}>
                            Unggul
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2.5">
                        <ProgressBar pct={c.pct} color={c.bar} delay={i * 80} />
                        <span className="text-[11px] font-bold flex-shrink-0 w-8 text-right font-mono" style={{ color: c.bar }}>{c.pct}%</span>
                      </div>
                    </div>

                    {/* Vote count */}
                    <div className="text-right flex-shrink-0 ml-2">
                      <div className="font-mono text-[18px] font-bold text-slate-900 leading-none">{c.votes.toLocaleString('id-ID')}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">suara</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Donut */}
            <div className="flex flex-col gap-3.5">
              <Card topAccent="#14B8A6" className="animate-fade-slide-up" style={{ animationDelay: '220ms' }}>
                <CardHeader title="Distribusi Suara" />
                <DonutChart candidates={data.candidates} />
              </Card>
            </div>
          </div>

          {/* ── Hourly trend + Per-wilayah breakdown ── */}
          <div className="grid grid-cols-2 gap-3.5 mb-5">

            {/* Hourly */}
            <Card topAccent="#1558B0" className="animate-fade-slide-up" style={{ animationDelay: '300ms' }}>
              <CardHeader title="Tren Suara Masuk per Jam" badge={<BadgeLive label="● Live" />} />
              <HourlyChart data={data.hourly} />
              {/* Mini stats below */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[
                  { label: 'Puncak', val: Math.max(...data.hourly.data) + '/jam', color: '#1558B0' },
                  { label: 'Rata-rata', val: Math.round(data.hourly.data.reduce((a,b)=>a+b,0)/data.hourly.data.length) + '/jam', color: '#0F766E' },
                  { label: 'Total Masuk', val: data.totalSuara.toLocaleString('id-ID'), color: '#14B8A6' },
                ].map(s => (
                  <div key={s.label} className="bg-slate-50 rounded-lg px-3 py-2 text-center">
                    <div className="text-[9px] text-slate-400 uppercase tracking-wide mb-1">{s.label}</div>
                    <div className="font-mono text-[13px] font-bold" style={{ color: s.color }}>{s.val}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Wilayah breakdown (RW only) or simple comparison (RT) */}
            <Card topAccent="#0F766E" className="animate-fade-slide-up" style={{ animationDelay: '360ms' }}>
              <CardHeader
                title={activeTab === 'rw' ? 'Perolehan per Sub-Wilayah' : 'Perbandingan Kandidat'}
                subtitle={activeTab === 'rw' ? 'Kandidat RW 05 di setiap RT' : 'Jumlah suara sah kandidat'}
              />
              {activeTab === 'rw' && wilayahData.length > 0 ? (
                <CandidateBarChart regions={wilayahData} />
              ) : (
                /* Simple comparison bars for RT pages */
                <div className="flex flex-col gap-3 pt-1">
                  {data.candidates.map((c, i) => (
                    <div key={c.name} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[11px] font-bold border border-white/50" style={{ background: c.bg, color: c.tx }}>{c.ini}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11.5px] font-semibold text-slate-700 mb-1">{c.name}</div>
                        <ProgressBar pct={c.pct} color={c.bar} delay={i * 100} />
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-mono text-[14px] font-bold" style={{ color: c.bar }}>{c.votes.toLocaleString('id-ID')}</div>
                        <div className="text-[10px] text-slate-400">{c.pct}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* ── Validity breakdown ── */}
          <Card className="mb-5 animate-fade-slide-up" style={{ animationDelay: '400ms' }}>
            <CardHeader title="Rincian Keabsahan Suara" />
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Suara Masuk', val: data.totalSuara, pct: 100, color: '#1558B0', icon: '📥' },
                { label: 'Suara Sah', val: data.sah, pct: +((data.sah / data.totalSuara) * 100).toFixed(1), color: '#0F766E', icon: '✅' },
                { label: 'Tidak Sah', val: data.tidakSah, pct: +((data.tidakSah / data.totalSuara) * 100).toFixed(1), color: '#DC2626', icon: '❌' },
              ].map((item, i) => (
                <div key={item.label} className="flex flex-col gap-2 p-4 rounded-lg" style={{ background: item.color + '0D' }}>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-600">{item.icon} {item.label}</span>
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: item.color }}>{item.pct}%</span>
                  </div>
                  <div className="font-mono text-[28px] font-bold leading-none" style={{ color: item.color }}>{item.val.toLocaleString('id-ID')}</div>
                  <ProgressBar pct={item.pct} color={item.color} delay={i * 120} />
                </div>
              ))}
            </div>
          </Card>

          <FooterBar />
        </main>
      </div>
    </div>
  );
}