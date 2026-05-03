import { auth, db } from '../config/firebase.js';

// ── GET semua warga (dengan filter status) ────────────────────
// GET /api/warga?status=pending  [protected: requireAdmin]
export async function getAllWarga(req, res) {
  try {
    const { status, rt } = req.query;
    let query = db.collection('warga');

    if (status) query = query.where('status', '==', status);
    if (rt)     query = query.where('rt', '==', rt);

    const snap = await query.orderBy('createdAt', 'desc').get();
    const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));

    return res.json({ total: data.length, data });
  } catch (err) {
    console.error('[getAllWarga]', err);
    return res.status(500).json({ error: 'Terjadi kesalahan server.' });
  }
}

// ── GET satu warga by UID ─────────────────────────────────────
// GET /api/warga/:uid  [protected: requireAdmin]
export async function getWargaById(req, res) {
  try {
    const snap = await db.collection('warga').doc(req.params.uid).get();
    if (!snap.exists) return res.status(404).json({ error: 'Warga tidak ditemukan.' });
    return res.json({ id: snap.id, ...snap.data() });
  } catch (err) {
    console.error('[getWargaById]', err);
    return res.status(500).json({ error: 'Terjadi kesalahan server.' });
  }
}

// ── VERIFIKASI warga (pending → verified) ─────────────────────
// PATCH /api/warga/:uid/verify  [protected: requireAdmin]
export async function verifyWarga(req, res) {
  try {
    const { uid } = req.params;
    const ref  = db.collection('warga').doc(uid);
    const snap = await ref.get();

    if (!snap.exists) return res.status(404).json({ error: 'Warga tidak ditemukan.' });
    if (snap.data().status === 'verified') {
      return res.status(400).json({ error: 'Warga sudah diverifikasi sebelumnya.' });
    }

    await ref.update({
      status:     'verified',
      verifiedAt: new Date(),
      verifiedBy: req.user.uid,
    });

    return res.json({ message: `Warga ${snap.data().nama} berhasil diverifikasi.` });
  } catch (err) {
    console.error('[verifyWarga]', err);
    return res.status(500).json({ error: 'Terjadi kesalahan server.' });
  }
}

// ── TOLAK / SUSPEND warga ─────────────────────────────────────
// PATCH /api/warga/:uid/reject  [protected: requireAdmin]
export async function rejectWarga(req, res) {
  try {
    const { uid } = req.params;
    const { alasan } = req.body;

    const ref  = db.collection('warga').doc(uid);
    const snap = await ref.get();
    if (!snap.exists) return res.status(404).json({ error: 'Warga tidak ditemukan.' });

    await ref.update({
      status:     'rejected',
      rejectedAt: new Date(),
      rejectedBy: req.user.uid,
      alasanTolak: alasan || 'Data tidak sesuai.',
    });

    // Disable akun di Firebase Auth
    await auth.updateUser(uid, { disabled: true });

    return res.json({ message: 'Pendaftaran warga ditolak.' });
  } catch (err) {
    console.error('[rejectWarga]', err);
    return res.status(500).json({ error: 'Terjadi kesalahan server.' });
  }
}