import { auth, db } from '../config/firebase.js';

// ── REGISTER WARGA ────────────────────────────────────────────
// POST /api/auth/register
export async function registerWarga(req, res) {
  try {
    const { nik, nama, ttl, rt, noTelp, email, password } = req.body;

    // Validasi field wajib
    if (!nik || !nama || !ttl || !rt || !noTelp || !password) {
      return res.status(400).json({ error: 'Semua field wajib diisi.' });
    }
    if (nik.replace(/\D/g, '').length !== 16) {
      return res.status(400).json({ error: 'NIK harus 16 digit.' });
    }

    // Cek NIK sudah terdaftar
    const nikSnap = await db.collection('warga').where('nik', '==', nik).get();
    if (!nikSnap.empty) {
      return res.status(409).json({ error: 'NIK sudah terdaftar.' });
    }

    // Buat user di Firebase Auth
    // Email wajib untuk Firebase Auth — pakai noTelp sebagai fallback
    const userEmail = email || `${nik}@epemilihan.local`;
    const userRecord = await auth.createUser({
      email:        userEmail,
      password,
      displayName:  nama,
      phoneNumber:  noTelp.startsWith('+') ? noTelp : `+62${noTelp.replace(/^0/, '')}`,
    });

    // Set custom claim role
    await auth.setCustomUserClaims(userRecord.uid, { role: 'warga' });

    // Simpan data warga ke Firestore
    await db.collection('warga').doc(userRecord.uid).set({
      uid:       userRecord.uid,
      nik,
      nama,
      ttl,
      rt,
      noTelp,
      email:     userEmail,
      status:    'pending',      // pending → verified oleh admin
      sudahVoting: false,
      createdAt: new Date(),
    });

    return res.status(201).json({
      message: 'Pendaftaran berhasil. Akun Anda menunggu verifikasi panitia.',
      uid: userRecord.uid,
    });
  } catch (err) {
    console.error('[registerWarga]', err);
    if (err.code === 'auth/email-already-exists') {
      return res.status(409).json({ error: 'Email atau NIK sudah terdaftar.' });
    }
    return res.status(500).json({ error: 'Terjadi kesalahan server.' });
  }
}

// ── REGISTER ADMIN (hanya bisa dipanggil oleh admin lain) ─────
// POST /api/auth/register-admin  [protected: requireAdmin]
export async function registerAdmin(req, res) {
  try {
    const { nama, email, password } = req.body;

    if (!nama || !email || !password) {
      return res.status(400).json({ error: 'Nama, email, dan password wajib diisi.' });
    }

    const userRecord = await auth.createUser({ email, password, displayName: nama });
    await auth.setCustomUserClaims(userRecord.uid, { role: 'admin' });

    await db.collection('admins').doc(userRecord.uid).set({
      uid:       userRecord.uid,
      nama,
      email,
      createdAt: new Date(),
      createdBy: req.user.uid,
    });

    return res.status(201).json({ message: 'Akun panitia berhasil dibuat.', uid: userRecord.uid });
  } catch (err) {
    console.error('[registerAdmin]', err);
    if (err.code === 'auth/email-already-exists') {
      return res.status(409).json({ error: 'Email sudah terdaftar.' });
    }
    return res.status(500).json({ error: 'Terjadi kesalahan server.' });
  }
}

// ── GET PROFILE (warga atau admin) ───────────────────────────
// GET /api/auth/me  [protected: verifyToken]
export async function getMe(req, res) {
  try {
    const { uid, role } = req.user;
    const col  = role === 'admin' ? 'admins' : 'warga';
    const snap = await db.collection(col).doc(uid).get();

    if (!snap.exists) {
      return res.status(404).json({ error: 'Profil tidak ditemukan.' });
    }

    // Jangan kembalikan field sensitif
    const { password, ...data } = snap.data();
    return res.json(data);
  } catch (err) {
    console.error('[getMe]', err);
    return res.status(500).json({ error: 'Terjadi kesalahan server.' });
  }
}