/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      colors: {
        blue: {
          dk:  '#082759',
          d:   '#0D3A7A',
          DEFAULT: '#1558B0',
          m:   '#1E7BD4',
          l:   '#DBEAFE',
          ll:  '#EFF6FF',
        },
        teal: {
          DEFAULT: '#0F766E',
          m:   '#14B8A6',
          l:   '#CCFBF1',
          ll:  '#F0FDFB',
        },
        mint: '#E8F5F2',
        slate: {
          50:  '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          900: '#0F172A',
        },
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '22px',
      },
      animation: {
        'slide-in-left':   'slideInLeft .55s cubic-bezier(.22,1,.36,1) both',
        'slide-in-down':   'slideInDown .5s cubic-bezier(.22,1,.36,1) both',
        'fade-slide-up':   'fadeSlideUp .5s cubic-bezier(.22,1,.36,1) both',
        'fade-slide-down': 'fadeSlideDown .6s cubic-bezier(.22,1,.36,1) both',
        'ring-pulse':      'ringPulse 2s ease-in-out infinite',
        'blob-drift':      'blobDrift 8s ease-in-out infinite alternate',
        'blob-drift-rev':  'blobDrift 11s ease-in-out infinite alternate-reverse',
        'badge-pulse':     'badgePulse 3s ease-in-out infinite',
        'log-in':          'logIn .45s cubic-bezier(.22,1,.36,1) both',
        'spin-slow':       'spin 4s linear infinite',
      },
      keyframes: {
        slideInLeft:    { from: { opacity:'0', transform:'translateX(-24px)' }, to: { opacity:'1', transform:'translateX(0)' } },
        slideInDown:    { from: { opacity:'0', transform:'translateY(-14px)' }, to: { opacity:'1', transform:'translateY(0)' } },
        fadeSlideUp:    { from: { opacity:'0', transform:'translateY(16px)' },  to: { opacity:'1', transform:'translateY(0)' } },
        fadeSlideDown:  { from: { opacity:'0', transform:'translateY(-12px)' }, to: { opacity:'1', transform:'translateY(0)' } },
        ringPulse:      { '0%,100%': { transform:'scale(.8)', opacity:'1' }, '50%': { transform:'scale(1.8)', opacity:'0' } },
        blobDrift:      { from: { transform:'translate(0,0) scale(1)' }, to: { transform:'translate(12px,8px) scale(1.12)' } },
        badgePulse:     { '0%,100%': { boxShadow:'0 0 0 0 rgba(21,88,176,.3)' }, '50%': { boxShadow:'0 0 0 4px rgba(21,88,176,0)' } },
        logIn:          { from: { opacity:'0', transform:'translateX(-8px)' }, to: { opacity:'1', transform:'translateX(0)' } },
        spin:           { to: { transform:'rotate(360deg)' } },
      },
    },
  },
  plugins: [],
}
