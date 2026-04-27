import { useState } from 'react';

import Sidebar    from '../components/Sidebar';
import Topbar     from '../components/Topbar';
import HeroBanner        from '../components/HeroBanner';
import MetricCard        from '../components/MetricCard';
import ElectionTabs      from '../components/ElectionTabs';
import CandidateList     from '../components/CandidateList';
import DonutChart        from '../components/DonutChart';
import SecurityPanel     from '../components/SecurityPanel';
import AuditLog          from '../components/AuditLog';
import ParticipationPanel from '../components/ParticipationPanel';
import FooterBar         from '../components/FooterBar';
import Card, { CardHeader, BadgeLive, BadgeMint, BadgeTeal } from '../components/Card';

import { ELECTION, METRICS } from '../data/electionData';
import { useCountdown }      from '../hooks/useCountdown';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('rw');
  const { clock, countdown }      = useCountdown();

  const currentElection = ELECTION[activeTab];

  return (
    <div className="relative grid min-h-screen z-[1]" style={{ gridTemplateColumns: '228px 1fr' }}>

      {/* ── Sidebar ── */}
      <Sidebar activePage="dashboard" />

      {/* ── Right panel ── */}
      <div className="flex flex-col min-h-screen">

        {/* Topbar */}
        <Topbar clock={clock} />

        {/* Main */}
        <main className="flex-1 px-7 py-6">

          {/* ── Info strip ── */}
          <div
            className="flex items-start gap-2.5 bg-blue-ll border border-blue-l border-l-[3px] border-l-[#1558B0] rounded-md px-4 py-3 mb-5 text-[12px] text-blue-d animate-fade-slide-down"
            style={{ animationDelay: '100ms' }}
          >
            <svg className="flex-shrink-0 mt-[1px]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1558B0" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span>
              <strong>Informasi untuk Warga:</strong> Halaman ini menampilkan hasil penghitungan suara secara langsung dan transparan. Data diperbarui otomatis setiap 30 detik. Seluruh suara dienkripsi &amp; dicatat di blockchain sehingga tidak dapat dimanipulasi.
            </span>
          </div>

          {/* ── Hero ── */}
          <HeroBanner countdown={countdown} />

          {/* ── Metrics ── */}
          <div className="grid grid-cols-4 gap-3.5 mb-5">
            {METRICS.map((m, i) => (
              <MetricCard key={m.id} metric={m} delay={i * 60} />
            ))}
          </div>

          {/* ── Election Tabs ── */}
          <ElectionTabs activeTab={activeTab} onChange={setActiveTab} />

          {/* ── Candidates + Donut ── */}
          <div className="grid mb-4" style={{ gridTemplateColumns: '1fr 306px', gap: '14px' }}>

            {/* Candidate Card */}
            <Card topAccent="#1558B0">
              <CardHeader
                title={currentElection.title}
                subtitle="Klik kandidat untuk info lebih lanjut"
                badge={<BadgeLive />}
              />
              <CandidateList
                candidates={currentElection.candidates}
                tabKey={activeTab}
              />
            </Card>

            {/* Donut Card */}
            <Card topAccent="#14B8A6">
              <CardHeader
                title="Distribusi Suara"
                badge={<BadgeTeal label="Visualisasi" />}
              />
              <DonutChart candidates={currentElection.candidates} />
            </Card>
          </div>

          {/* ── Bottom 3-col ── */}
          <div className="grid grid-cols-3 gap-3.5 mb-4">

            {/* Security */}
            <Card topAccent="#1558B0" style={{ animationDelay: '420ms' }} className="animate-fade-slide-up">
              <CardHeader
                title="Jaminan Keamanan Sistem"
                badge={<BadgeMint label="5/5 Aktif" />}
              />
              <SecurityPanel />
            </Card>

            {/* Audit Log */}
            <Card style={{ animationDelay: '480ms' }} className="animate-fade-slide-up">
              <CardHeader
                title="Aktivitas Sistem"
                badge={<BadgeLive label="● Langsung" />}
              />
              <AuditLog />
            </Card>

            {/* Participation */}
            <Card topAccent="#14B8A6" style={{ animationDelay: '540ms' }} className="animate-fade-slide-up">
              <CardHeader title="Partisipasi per Wilayah" />
              <ParticipationPanel />
            </Card>
          </div>

          {/* ── Footer ── */}
          <FooterBar />
        </main>
      </div>
    </div>
  );
}
