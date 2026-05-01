import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { IconVote } from '../components/icons/Icons';

// ── Tiny field component ────────────────────────────────────
function Field({ label, id, type = 'text', placeholder, value, onChange, hint }) {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[11.5px] font-semibold text-slate-600 tracking-[.02em]">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={isPassword && show ? 'text' : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete="off"
          className="w-full bg-slate-50 border border-slate-200 rounded-[10px] px-3.5 py-2.5 text-[13px] text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:border-[#1558B0] focus:bg-white focus:ring-2 focus:ring-[#1558B0]/10"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(s => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors text-[11px] font-semibold"
          >
            {show ? 'Sembunyikan' : 'Tampilkan'}
          </button>
        )}
      </div>
      {hint && <p className="text-[10.5px] text-slate-400">{hint}</p>}
    </div>
  );
}

// ── Tab pill ────────────────────────────────────────────────
function RoleTab({ active, label, icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[8px] text-[12px] font-semibold transition-all duration-200',
        active
          ? 'bg-[#1558B0] text-white shadow-blue'
          : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100',
      ].join(' ')}
    >
      <span>{icon}</span>{label}
    </button>
  );
}

// ── Main page ───────────────────────────────────────────────
export default function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole]         = useState('warga');   // 'warga' | 'admin'
  const [nik, setNik]           = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (role === 'warga' && nik.replace(/\D/g, '').length !== 16) {
      setError('NIK harus 16 digit angka.'); return;
    }
    if (role === 'admin' && !email.includes('@')) {
      setError('Format email tidak valid.'); return;
    }
    if (password.length < 6) {
      setError('Password minimal 6 karakter.'); return;
    }

    setLoading(true);
    // Simulate API call — ganti dengan logic auth Anda
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);

    // Navigate based on role
    navigate(role === 'admin' ? '/dashboard' : '/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050F2B] via-[#082759] to-[#0D3A7A] flex items-center justify-center px-4 py-10 relative overflow-hidden">

      {/* Background blobs */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[rgba(30,123,212,.18)] blur-[80px] -top-32 -right-32 pointer-events-none animate-blob-drift" />
      <div className="absolute w-[300px] h-[300px] rounded-full bg-[rgba(20,184,166,.1)] blur-[60px] bottom-0 left-0 pointer-events-none animate-blob-drift-rev" />

      {/* Dots grid */}
      <div
        className="absolute inset-0 opacity-[.04] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '24px 24px' }}
      />

      {/* Card */}
      <div className="relative w-full max-w-[400px] animate-fade-slide-up">

        {/* Logo */}
        <div className="flex flex-col items-center mb-7">
          <div className="flex items-center justify-center w-14 h-14 rounded-[18px] bg-white/[.12] border border-white/[.18] mb-4 shadow-[0_4px_24px_rgba(0,0,0,.2)]">
            <IconVote size={26} stroke="white" />
          </div>
          <h1 className="text-[22px] font-extrabold text-white tracking-[-0.02em]">e-Pemilihan</h1>
          <p className="text-[11px] text-white/40 mt-1 tracking-[.06em] uppercase">Kelurahan Menteng · Akses Portal</p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,.3)] px-7 py-7">

          {/* Role tabs */}
          <div className="flex gap-1.5 bg-slate-100 rounded-[10px] p-1 mb-6">
            <RoleTab active={role === 'warga'} label="Masuk sebagai Warga"  icon="🪪" onClick={() => { setRole('warga'); setError(''); }} />
            <RoleTab active={role === 'admin'} label="Masuk sebagai Panitia" icon="🛡️" onClick={() => { setRole('admin'); setError(''); }} />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {role === 'warga' ? (
              <Field
                label="Nomor Induk Kependudukan (NIK)"
                id="nik"
                type="text"
                placeholder="Contoh: 3171xxxxxxxxxx"
                value={nik}
                onChange={e => setNik(e.target.value)}
                hint="NIK 16 digit sesuai KTP Anda"
              />
            ) : (
              <Field
                label="Email Panitia"
                id="email"
                type="email"
                placeholder="nama@kelurahan.go.id"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            )}

            <Field
              label="Password"
              id="password"
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-[8px] px-3.5 py-2.5 text-[11.5px] text-red-600 font-medium animate-fade-slide-up">
                <span>⚠️</span> {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full py-3 rounded-[10px] bg-[#1558B0] hover:bg-[#1046A0] active:scale-[.98] text-white text-[13px] font-bold tracking-[.02em] transition-all duration-200 shadow-blue disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,.3)" strokeWidth="3"/>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  Memverifikasi…
                </>
              ) : (
                `Masuk sebagai ${role === 'warga' ? 'Warga' : 'Panitia'} →`
              )}
            </button>
          </form>

          {/* Footer links */}
          <div className="mt-5 pt-5 border-t border-slate-100 flex items-center justify-between text-[11.5px]">
            {role === 'warga' ? (
              <span className="text-slate-500">
                Belum punya akun?{' '}
                <Link to="/register" className="text-[#1558B0] font-semibold hover:underline">
                  Daftar di sini
                </Link>
              </span>
            ) : (
              <span className="text-slate-400 italic">Akun panitia hanya dibuat oleh admin pusat.</span>
            )}
            <button type="button" className="text-slate-400 hover:text-slate-600 transition-colors">
              Lupa password?
            </button>
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-center text-[10px] text-white/25 mt-5 tracking-[.04em]">
          Sistem ini diawasi oleh KPU Kelurahan · Terenkripsi AES-256
        </p>
      </div>
    </div>
  );
}