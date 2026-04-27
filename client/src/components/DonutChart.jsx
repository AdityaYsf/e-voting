import { useEffect, useRef } from 'react';
import { Chart, ArcElement, DoughnutController, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, DoughnutController, Tooltip, Legend);

export default function DonutChart({ candidates }) {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: 'doughnut',
      data: {
        labels: candidates.map((c) => c.name),
        datasets: [{
          data:            candidates.map((c) => c.votes),
          backgroundColor: candidates.map((c) => c.bg),
          borderColor:     candidates.map((c) => c.bar),
          borderWidth:     2.5,
          hoverOffset:     10,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        animation: { animateRotate: true, duration: 1000, easing: 'easeOutQuart' },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) =>
                `  ${ctx.parsed.toLocaleString('id-ID')} suara (${candidates[ctx.dataIndex].pct}%)`,
            },
          },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [candidates]);

  return (
    <div>
      <div className="relative h-[180px] mb-4">
        <canvas ref={canvasRef} />
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-2">
        {candidates.map((c) => (
          <div
            key={c.name}
            className="flex items-center gap-2.5 text-[11px] text-slate-600 px-2 py-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-default group"
          >
            <div
              className="w-2.5 h-2.5 rounded-[3px] flex-shrink-0 transition-transform duration-200 group-hover:scale-125"
              style={{ background: c.bar }}
            />
            <span className="flex-1">{c.name}</span>
            <span className="font-bold text-slate-900 font-mono">{c.votes.toLocaleString('id-ID')}</span>
            <span className="text-[10px] text-slate-400 font-mono ml-1">{c.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
