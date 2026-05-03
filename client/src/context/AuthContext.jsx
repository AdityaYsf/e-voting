import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from "../services/apiServices";

const AuthContext = createContext(null);

// ── Helper: baca / tulis session ─────────────────────────────
function readSession() {
  try {
    const raw = localStorage.getItem('epemilihan_session');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function writeSession(data) {
  localStorage.setItem('epemilihan_session', JSON.stringify(data));
}

function clearSession() {
  localStorage.removeItem('epemilihan_session');
}

// ── Provider ──────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true); // true saat cek session awal

  // Cek session yang tersimpan saat app pertama load
  useEffect(() => {
    const session = readSession();
    if (session?.token) {
      // Verifikasi token ke backend sekaligus ambil data terbaru
      authService.getMe()
        .then(res => setUser({ ...session, ...res.data }))
        .catch(() => { clearSession(); setUser(null); })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Login — dipanggil setelah Firebase Auth berhasil di LoginPage
  const login = useCallback((sessionData) => {
    writeSession(sessionData);
    setUser(sessionData);
  }, []);

  // Logout
  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const isAdmin = user?.role === 'admin';
  const isWarga = user?.role === 'warga';
  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin, isWarga, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth harus dipakai di dalam <AuthProvider>');
  return ctx;
}