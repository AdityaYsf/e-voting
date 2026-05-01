import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { IconVote } from '../components/icons/Icons';

// ── Step indicator ──────────────────────────────────────────
function StepDot({ step, current, label }) {
  const done   = current > step;
  const active = current === step;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className={[
        'w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-all duration-300',
        done   ? 'bg-[#0F766E] text-white'           : '',
        active ? 'bg-[#1558B0] text-white ring-4 ring-[#1558B0]/20' : '',
        !done && !active ? 'bg-slate-100 text-slate-400' : '',
      ].join(' ')}>
        {done ? '✓' : step}
      </div>
      <span className={`text-[9.5px] font-semibold tracking-[.03em] ${active ? 'text-[#1558B0]' : done ? 'text-[#0F766E]' : 'text-slate-400'}`}>
        {label}
      </span>
    </div>
  );
}

function StepLine({ done }) {
  return (
    <div className="flex-1 h-[2px] mt-[-14px] rounded-full transition-all duration-500"
      style={{ background: done ? '#0F766E' : '#E2E8F0' }} />
  );
}

// ── Field component ─────────────────────────────────────────
function Field({ label, id, type = 'text', placeholder, value, onChange, hint, required }) {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[11.5px] font-semibold text-slate-600 tracking-[.02em]">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
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

// ── Select component ────────────────────────────────────────
function SelectField({ label, id, value, onChange, options, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[11.5px] font-semibold text-slate-600 tracking-[.02em]">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-full bg-slate-50 border border-slate-200 rounded-[10px] px-3.5 py-2.5 text-[13px] text-slate-800 outline-none transition-all duration-200 focus:border-[#1558B0] focus:bg-white focus:ring-2 focus:ring-[#1558B0]/10 appearance-none cursor-pointer"
      >
        <option value="">— Pilih —</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

// ── Main page ───────────────────────────────────────────────
export default function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep]     = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState('');
  const [success, setSuccess] = useState(false);

  // Form state
  const [form, setForm] = useState({
    nik: '', nama: '', ttl: '', rt: '', noTelp: '',
    email: '', password: '', konfirmasi: '', setuju: false,
  });

  const set = (key) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm(f => ({ ...f, [key]: val }));
    setError('');
  };

  // ── Validation per step ──
  const validateStep1 = () => {
    if (form.nik.replace(/\D/g, '').length !== 16) return 'NIK harus 16 digit angka.';
    if (form.nama.trim().length < 3) return 'Nama lengkap minimal 3 karakter.';
    if (!form.ttl) return 'Tanggal lahir wajib diisi.';
    if (!form.rt) return 'Pilih RT tempat tinggal Anda.';
    return '';
  };

  const validateStep2 = () => {
    if (form.noTelp.replace(/\D/g, '').length < 10) return 'Nomor telepon tidak valid.';
    if (form.email && !form.email.includes('@')) return 'Format email tidak valid.';
    if (form.password.length < 8) return 'Password minimal 8 karakter.';
    if (form.password !== form.konfirmasi) return 'Konfirmasi password tidak cocok.';
    return '';
  };

  const nextStep = () => {
    const err = step === 1 ? validateStep1() : '';
    if (err) { setError(err); return; }
    setStep(s => s + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validateStep2();
    if (err) { setError(err); return; }
    if (!form.setuju) { setError('Anda harus menyetujui syarat & ketentuan.'); return; }

    setLoading(true);
    // Simulate API — ganti dengan logic registrasi Anda
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSuccess(true);
  };

  // ── Success screen ──
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#050F2B] via-[#082759] to-[#0D3A7A] flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute w-[400px] h-[400px] rounded-full bg-[rgba(20,184,166,.15)] blur-[80px] pointer-events-none" />
        <div className="relative bg-white rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,.3)] px-8 py-10 w-full max-w-[380px] text-center animate-fade-slide-up">
          <div className="w-16 h-16 rounded-full bg-[#CCFBF1] flex items-center justify-center text-[28px] mx-auto mb-5">✓</div>
          <h2 className="text-[20px] font-extrabold text-slate-900 mb-2">Pendaftaran Berhasil!</h2>
          <p className="text-[12.5px] text-slate-500 leading-relaxed mb-6">
            Akun Anda sedang diverifikasi oleh panitia. Anda akan mendapat notifikasi ke nomor <strong>{form.noTelp}</strong> dalam 1×24 jam.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full py-3 rounded-[10px] bg-[#1558B0] text-white text-[13px] font-bold shadow-blue hover:bg-[#1046A0] transition-colors"
          >
            Kembali ke Halaman Login →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050F2B] via-[#082759] to-[#0D3A7A] flex items-center justify-center px-4 py-10 relative overflow-hidden">

      {/* Background blobs */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[rgba(30,123,212,.18)] blur-[80px] -top-32 -right-32 pointer-events-none animate-blob-drift" />
      <div className="absolute w-[300px] h-[300px] rounded-full bg-[rgba(20,184,166,.1)] blur-[60px] bottom-0 left-0 pointer-events-none animate-blob-drift-rev" />
      <div
        className="absolute inset-0 opacity-[.04] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '24px 24px' }}
      />

      <div className="relative w-full max-w-[420px] animate-fade-slide-up">

        {/* Logo */}
        <div className="flex flex-col items-center mb-7">
          <div className="flex items-center justify-center w-14 h-14 rounded-[18px] bg-white/[.12] border border-white/[.18] mb-4 shadow-[0_4px_24px_rgba(0,0,0,.2)]">
            <IconVote size={26} stroke="white" />
          </div>
          <h1 className="text-[22px] font-extrabold text-white tracking-[-0.02em]">Daftar Pemilih</h1>
          <p className="text-[11px] text-white/40 mt-1 tracking-[.06em] uppercase">Kelurahan Menteng · Pendaftaran Warga</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,.3)] px-7 py-7">

          {/* Step indicator */}
          <div className="flex items-start gap-0 mb-7">
            <StepDot step={1} current={step} label="Data Diri" />
            <StepLine done={step > 1} />
            <StepDot step={2} current={step} label="Akun & Keamanan" />
            <StepLine done={step > 2} />
            <StepDot step={3} current={step} label="Selesai" />
          </div>

          {/* ── STEP 1: Data Diri ── */}
          {step === 1 && (
            <div className="flex flex-col gap-4 animate-fade-slide-up">
              <Field
                label="NIK (Nomor Induk Kependudukan)"
                id="nik" value={form.nik} onChange={set('nik')}
                placeholder="16 digit sesuai KTP"
                hint="Harus sesuai data kependudukan Kelurahan Menteng"
                required
              />
              <Field
                label="Nama Lengkap"
                id="nama" value={form.nama} onChange={set('nama')}
                placeholder="Sesuai KTP"
                required
              />
              <Field
                label="Tanggal Lahir"
                id="ttl" type="date" value={form.ttl} onChange={set('ttl')}
                required
              />
              <SelectField
                label="Wilayah RT"
                id="rt" value={form.rt} onChange={set('rt')}
                required
                options={[
                  { value: 'rt01', label: 'RT 01' },
                  { value: 'rt02', label: 'RT 02' },
                  { value: 'rt03', label: 'RT 03' },
                ]}
              />
            </div>
          )}

          {/* ── STEP 2: Akun ── */}
          {step === 2 && (
            <div className="flex flex-col gap-4 animate-fade-slide-up">
              <Field
                label="Nomor HP / WhatsApp"
                id="telp" value={form.noTelp} onChange={set('noTelp')}
                placeholder="08xx-xxxx-xxxx"
                hint="Digunakan untuk OTP saat pemilihan"
                required
              />
              <Field
                label="Email (opsional)"
                id="email" type="email" value={form.email} onChange={set('email')}
                placeholder="email@anda.com"
              />
              <Field
                label="Buat Password"
                id="password" type="password" value={form.password} onChange={set('password')}
                placeholder="Minimal 8 karakter"
                hint="Kombinasi huruf, angka, dan simbol lebih aman"
                required
              />
              <Field
                label="Konfirmasi Password"
                id="konfirmasi" type="password" value={form.konfirmasi} onChange={set('konfirmasi')}
                placeholder="Ulangi password"
                required
              />

              {/* Syarat */}
              <label className="flex items-start gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={form.setuju}
                  onChange={set('setuju')}
                  className="mt-0.5 w-4 h-4 accent-[#1558B0] flex-shrink-0 cursor-pointer"
                />
                <span className="text-[11.5px] text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors">
                  Saya menyatakan bahwa data yang diisikan adalah benar dan saya bersedia diverifikasi oleh panitia pemilihan RW 05.
                </span>
              </label>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-[8px] px-3.5 py-2.5 text-[11.5px] text-red-600 font-medium mt-4 animate-fade-slide-up">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Actions */}
          <div className={`flex gap-2.5 mt-6 ${step === 1 ? '' : 'flex-row'}`}>
            {step === 2 && (
              <button
                type="button"
                onClick={() => { setStep(1); setError(''); }}
                className="flex-1 py-3 rounded-[10px] bg-slate-100 hover:bg-slate-200 text-slate-600 text-[13px] font-bold transition-colors"
              >
                ← Kembali
              </button>
            )}

            {step === 1 && (
              <button
                type="button"
                onClick={nextStep}
                className="w-full py-3 rounded-[10px] bg-[#1558B0] hover:bg-[#1046A0] active:scale-[.98] text-white text-[13px] font-bold tracking-[.02em] transition-all duration-200 shadow-blue"
              >
                Lanjut ke Langkah 2 →
              </button>
            )}

            {step === 2 && (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 py-3 rounded-[10px] bg-[#1558B0] hover:bg-[#1046A0] active:scale-[.98] text-white text-[13px] font-bold tracking-[.02em] transition-all duration-200 shadow-blue disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,.3)" strokeWidth="3"/>
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    Mendaftarkan…
                  </>
                ) : 'Daftar Sekarang ✓'}
              </button>
            )}
          </div>

          {/* Login link */}
          <p className="text-center text-[11.5px] text-slate-400 mt-5 pt-5 border-t border-slate-100">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-[#1558B0] font-semibold hover:underline">
              Masuk di sini
            </Link>
          </p>
        </div>

        <p className="text-center text-[10px] text-white/25 mt-5 tracking-[.04em]">
          Sistem ini diawasi oleh KPU Kelurahan · Terenkripsi AES-256
        </p>
      </div>
    </div>
  );
}