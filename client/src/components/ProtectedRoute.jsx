import { Navigate, useLocation } from 'react-router-dom';

/**
 * ProtectedRoute
 * Lindungi halaman yang butuh autentikasi.
 *
 * Cara pakai di App.jsx:
 *   <Route path="/dashboard" element={
 *     <ProtectedRoute><DashboardPage /></ProtectedRoute>
 *   } />
 *
 * Untuk halaman admin saja:
 *   <Route path="/admin" element={
 *     <ProtectedRoute requiredRole="admin"><AdminPage /></ProtectedRoute>
 *   } />
 */

// ── Helper: baca session dari localStorage ──────────────────
// Ganti fungsi ini sesuai sistem auth Anda (JWT, context, Zustand, dll)
function getSession() {
  try {
    const raw = localStorage.getItem('epemilihan_session');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function ProtectedRoute({ children, requiredRole }) {
  const location = useLocation();
  const session  = getSession();

  // Belum login → redirect ke /login, simpan halaman asal
  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Login tapi role tidak cocok → redirect ke /dashboard
  if (requiredRole && session.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

/**
 * ── Cara simpan session setelah login berhasil ──────────────
 *
 * Di LoginPage.jsx, setelah API sukses:
 *
 *   localStorage.setItem('epemilihan_session', JSON.stringify({
 *     role:  'warga',          // atau 'admin'
 *     nik:   '317xxxxxxxx',    // untuk warga
 *     nama:  'Budi Santoso',
 *     token: 'jwt-token-dari-server',
 *   }));
 *   navigate('/dashboard');
 *
 * Untuk logout:
 *   localStorage.removeItem('epemilihan_session');
 *   navigate('/login');
 */