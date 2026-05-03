import axios from 'axios';

// Base URL — sesuaikan dengan PORT server Anda
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// ── Request interceptor — attach Firebase ID token ────────────
api.interceptors.request.use(
  (config) => {
    const session = getSession();
    if (session?.token) {
      config.headers.Authorization = `Bearer ${session.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor — handle 401 global ─────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired → hapus session, redirect ke login
      localStorage.removeItem('epemilihan_session');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ── Helper baca session ───────────────────────────────────────
function getSession() {
  try {
    const raw = localStorage.getItem('epemilihan_session');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default api;