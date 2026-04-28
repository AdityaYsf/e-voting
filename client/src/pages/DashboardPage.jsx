import { useState } from 'react';
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
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
	const [activeTab, setActiveTab] = useState("rw");
	const [sidebarOpen, setSidebar] = useState(false);
	const { clock, countdown } = useCountdown();

	const currentElection = ELECTION[activeTab];

	return (
		<div className="relative flex min-h-screen z-[1]">
			{/* Sidebar — static desktop, drawer mobile */}
			<Sidebar isOpen={sidebarOpen} onClose={() => setSidebar(false)} />

			{/* Right panel */}
			<div className="flex flex-col flex-1 min-w-0 min-h-screen">
				<Topbar clock={clock} onMenuToggle={() => setSidebar((v) => !v)} />

				<main className="flex-1 px-4 md:px-7 py-4 md:py-6">
					{/* Info strip */}
					<div
						className="flex items-start gap-2.5 bg-blue-ll border border-blue-l border-l-[3px] border-l-[#1558B0] rounded-md px-4 py-3 mb-5 text-[12px] text-blue-d animate-fade-slide-down"
						style={{ animationDelay: "100ms" }}
					>
						<svg
							className="flex-shrink-0 mt-[1px]"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#1558B0"
							strokeWidth="2.2"
							strokeLinecap="round"
						>
							<circle cx="12" cy="12" r="10" />
							<line x1="12" y1="8" x2="12" y2="12" />
							<line x1="12" y1="16" x2="12.01" y2="16" />
						</svg>
						<span>
							<strong>Informasi untuk Warga:</strong> Halaman ini menampilkan
							hasil penghitungan suara secara langsung dan transparan. Data
							diperbarui otomatis setiap 30 detik. Seluruh suara dienkripsi
							&amp; dicatat di blockchain sehingga tidak dapat dimanipulasi.
						</span>
					</div>

					{/* Hero */}
					<HeroBanner countdown={countdown} />

					{/* Metrics — 2 cols mobile, 4 cols desktop */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-3.5 mb-5">
						{METRICS.map((m, i) => (
							<MetricCard key={m.id} metric={m} delay={i * 60} />
						))}
					</div>

					{/* Election Tabs */}
					<ElectionTabs activeTab={activeTab} onChange={setActiveTab} />

					{/* Candidates + Donut — stacked mobile, side-by-side desktop */}
					<div
						className="flex flex-col md:grid mb-3 md:mb-4 gap-3 md:gap-[14px]"
						style={{ gridTemplateColumns: "1fr 306px" }}
					>
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

						<Card topAccent="#14B8A6">
							<CardHeader
								title="Distribusi Suara"
								badge={<BadgeTeal label="Visualisasi" />}
							/>
							<DonutChart candidates={currentElection.candidates} />
						</Card>
					</div>

					{/* Bottom 3 panels — stacked mobile, 3-col desktop */}
					<div className="flex flex-col md:grid md:grid-cols-3 gap-3 md:gap-3.5 mb-4">
						<Card
							topAccent="#1558B0"
							className="animate-fade-slide-up"
							style={{ animationDelay: "420ms" }}
						>
							<CardHeader
								title="Jaminan Keamanan Sistem"
								badge={<BadgeMint label="5/5 Aktif" />}
							/>
							<SecurityPanel />
						</Card>

						<Card
							className="animate-fade-slide-up"
							style={{ animationDelay: "480ms" }}
						>
							<CardHeader
								title="Aktivitas Sistem"
								badge={<BadgeLive label="● Langsung" />}
							/>
							<AuditLog />
						</Card>

						<Card
							topAccent="#14B8A6"
							className="animate-fade-slide-up"
							style={{ animationDelay: "540ms" }}
						>
							<CardHeader title="Partisipasi per Wilayah" />
							<ParticipationPanel />
						</Card>
					</div>

					<FooterBar />
				</main>
			</div>
		</div>
	);
}