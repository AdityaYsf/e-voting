import { auth, db } from '../config/firebase.js';

// ── Verifikasi Firebase ID Token ──────────────────────────────
export async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token tidak ditemukan.' });
  }

  const token = authHeader.split('Bearer ')[1];

  try {
    const decoded = await auth.verifyIdToken(token);
    req.user = decoded; // uid, email, role (custom claim)
    next();
  } catch {
    return res.status(401).json({ error: 'Token tidak valid atau sudah expired.' });
  }
}

// ── Hanya Admin / Panitia ─────────────────────────────────────
export async function requireAdmin(req, res, next) {
  await verifyToken(req, res, async () => {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ error: 'Akses ditolak. Hanya panitia yang diizinkan.' });
    }
    next();
  });
}

// ── Hanya Warga yang sudah diverifikasi ───────────────────────
export async function requireVerifiedWarga(req, res, next) {
  await verifyToken(req, res, async () => {
    if (req.user?.role !== 'warga') {
      return res.status(403).json({ error: 'Akses ditolak. Hanya warga yang diizinkan.' });
    }

    // Cek status verifikasi di Firestore
    const snap = await db.collection('warga').doc(req.user.uid).get();
    if (!snap.exists || snap.data()?.status !== 'verified') {
      return res.status(403).json({ error: 'Akun Anda belum diverifikasi oleh panitia.' });
    }

    req.warga = snap.data();
    next();
  });
}