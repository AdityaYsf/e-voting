import { useEffect, useState } from 'react';

export default function LoaderOverlay() {
  const [visible,  setVisible]  = useState(true);
  const [fading,   setFading]   = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar 0 → 100 over ~1.4 s
    const steps    = 60;
    const interval = 1400 / steps;
    let current    = 0;

    const bar = setInterval(() => {
      current += 1;
      setProgress(Math.min((current / steps) * 100, 100));
      if (current >= steps) clearInterval(bar);
    }, interval);

    const fade = setTimeout(() => setFading(true),  1700);
    const hide = setTimeout(() => setVisible(false), 2300);

    return () => {
      clearInterval(bar);
      clearTimeout(fade);
      clearTimeout(hide);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Keyframes – injected once, no Tailwind dependency */}
      <style>{`
        @keyframes _loaderUp {
          from { opacity:0; transform:translateY(12px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes _loaderGlow {
          0%,100% { filter:drop-shadow(0 0 6px rgba(249,115,22,.5)); }
          50%      { filter:drop-shadow(0 0 16px rgba(249,115,22,.9)); }
        }
        ._loader-up   { animation: _loaderUp  .55s cubic-bezier(.22,1,.36,1) both; }
        ._loader-up2  { animation: _loaderUp  .55s .15s cubic-bezier(.22,1,.36,1) both; }
        ._bolt-glow   { animation: _loaderGlow 2.4s ease-in-out infinite; }
      `}</style>

      <div
        style={{
          position:       'fixed',
          inset:          0,
          zIndex:         9999,
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'center',
          background:     'linear-gradient(160deg,#0A1F44 0%,#0D2E68 60%,#082759 100%)',
          opacity:         fading ? 0 : 1,
          transition:      'opacity .6s ease',
          pointerEvents:   fading ? 'none' : 'auto',
        }}
      >
        {/* Radial glow bg */}
        <div style={{
          position:     'absolute',
          width:        '360px',
          height:       '360px',
          borderRadius: '50%',
          background:   'radial-gradient(circle,rgba(30,123,212,.2) 0%,transparent 70%)',
          pointerEvents:'none',
        }} />

        {/* ── Logo row ── */}
        <div
          className="_loader-up"
          style={{
            display:      'flex',
            alignItems:   'center',
            gap:          '12px',
            marginBottom: '28px',
            position:     'relative',
            zIndex:       1,
          }}
        >
          {/* Lightning bolt */}
          <svg
            className="_bolt-glow"
            width="34" height="34"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M13 2L4.5 13.5H11L10 22L20.5 10H14L13 2Z"
              fill="#F97316"
              stroke="#FB923C"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
          </svg>

          {/* App name */}
          <span style={{
            fontFamily:    "'Plus Jakarta Sans',sans-serif",
            fontSize:      '30px',
            fontWeight:    800,
            color:         '#FFFFFF',
            letterSpacing: '-0.03em',
            lineHeight:    1,
          }}>
            e-Voting
          </span>
        </div>

        {/* ── Progress bar ── */}
        <div
          className="_loader-up2"
          style={{
            width:        '220px',
            height:       '3px',
            background:   'rgba(255,255,255,.1)',
            borderRadius: '99px',
            overflow:     'hidden',
            marginBottom: '18px',
            position:     'relative',
            zIndex:       1,
          }}
        >
          <div style={{
            height:       '100%',
            borderRadius: '99px',
            background:   'linear-gradient(90deg,#22D3EE,#38BDF8)',
            width:        `${progress}%`,
            transition:   'width .04s linear',
            boxShadow:    '0 0 8px rgba(34,211,238,.55)',
          }} />
        </div>

        {/* ── Subtitle ── */}
        <p
          className="_loader-up2"
          style={{
            fontFamily:    "'Plus Jakarta Sans',sans-serif",
            fontSize:      '10.5px',
            fontWeight:    600,
            color:         'rgba(255,255,255,.36)',
            letterSpacing: '.14em',
            textTransform: 'uppercase',
            position:      'relative',
            zIndex:        1,
          }}
        >
          Memuat Sistem Pemilihan…
        </p>
      </div>
    </>
  );
}