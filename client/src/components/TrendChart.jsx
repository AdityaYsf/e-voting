import { useEffect, useRef } from 'react';
import {
  Chart, LineElement, PointElement, LineController,
  CategoryScale, LinearScale, Tooltip, Filler,
} from 'chart.js';
import { TREND_LABELS, TREND_DATA } from '../data/electionData';

Chart.register(LineElement, PointElement, LineController, CategoryScale, LinearScale, Tooltip, Filler);

export default function TrendChart() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const chart = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: TREND_LABELS,
        datasets: [{
          data:                TREND_DATA,
          borderColor:         '#1558B0',
          borderWidth:         2,
          backgroundColor:     'rgba(21,88,176,.08)',
          fill:                true,
          tension:             0.45,
          pointBackgroundColor: '#1558B0',
          pointBorderColor:    '#fff',
          pointBorderWidth:    2,
          pointRadius:         4,
          pointHoverRadius:    6,
        }],
      },
      options: {
        responsive:          true,
        maintainAspectRatio: false,
        animation:           { duration: 1400, easing: 'easeOutQuart' },
        plugins: {
          legend:  { display: false },
          tooltip: { callbacks: { label: (ctx) => ` ${ctx.parsed.y} suara` } },
        },
        scales: {
          x: {
            grid:  { display: false },
            ticks: { font: { size: 9, family: "'DM Mono', monospace" }, color: '#94A3B8' },
          },
          y: {
            grid:  { color: 'rgba(21,88,176,.04)' },
            ticks: { font: { size: 9 }, color: '#94A3B8' },
          },
        },
      },
    });

    return () => chart.destroy();
  }, []);

  return (
    <div className="relative h-[100px]">
      <canvas ref={canvasRef} />
    </div>
  );
}
