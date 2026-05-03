import { db } from '../config/firebase.js';

// ── GET semua kandidat ────────────────────────────────────────
// GET /api/kandidat?kategori=rw  [public]
export async function getAllKandidat(req, res) {
  try {
    const { kategori } = req.query;
    let query = db.collection('kandidat');
    if (kategori) query = query.where('kategori', '==', kategori);

    const snap = await query.orderBy('nomorUrut', 'asc').get();
    const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));

    return res.json({ total: data.length, data });
  } catch (err) {
    console.error('[getAllKandidat]', err);
    return res.status(500).json({ error: 'Terjadi kesalahan server.' });
  }
}

// ── GET satu kandidat ─────────────────────────────────────────
// GET /api/kandidat/:id  [public]
export async function getKandidatById(req, res) {
  try {
    const snap = await db.collection('kandidat').doc(req.params.id).get();
    if (!snap.exists) return res.status(404).json({ error: 'Kandidat tidak ditemukan.' });
    return res.json({ id: snap.id, ...snap.data() });
  } catch (err) {
    console.error('[getKandidatById]', err);
    return res.status(500).json({ error: 'Terjadi kesalahan server.' });
  }
}

// ── TAMBAH kandidat ───────────────────────────────────────────
// POST /api/kandidat  [protected: requireAdmin]
export async function createKandidat(req, res) {
  try {
    const {
      nama, ini, kategori, kategoriLabel, jabatan,
      nomorUrut, usia, pendidikan, pekerjaan, alamat,
      pengalaman, ttl, visi, misi, program,
      bg, tx, bar, barEnd,
    } = req.body;

    // Validasi field wajib
    if (!nama || !kategori || !nomorUrut || !visi) {
      return res.status(400).json({ error: 'Nama, kategori, nomor urut, dan visi wajib diisi.' });
    }

    // Cek nomor urut duplikat dalam kategori yang sama
    const dupSnap = await db.collection('kandidat')
      .where('kategori', '==', kategori)
      .where('nomorUrut', '==', Number(nomorUrut))
      .get();
    if (!dupSnap.empty) {
      return res.status(409).json({ error: `Nomor urut ${nomorUrut} sudah dipakai di kategori ini.` });
    }

    const ref = await db.collection('kandidat').add({
      nama, ini, kategori, kategoriLabel, jabatan,
      nomorUrut: Number(nomorUrut),
      usia: Number(usia) || 0,
      pendidikan, pekerjaan, alamat, pengalaman, ttl,
      visi,
      misi:    Array.isArray(misi)    ? misi    : [],
      program: Array.isArray(program) ? program : [],
      bg, tx, bar, barEnd,
      votes:  0,
      pct:    0,
      status: 'pesaing',
      createdAt: new Date(),
      createdBy: req.user.uid,
    });

    return res.status(201).json({ message: 'Kandidat berhasil ditambahkan.', id: ref.id });
  } catch (err) {
    console.error('[createKandidat]', err);
    return res.status(500).json({ error: 'Terjadi kesalahan server.' });
  }
}

// ── UPDATE kandidat ───────────────────────────────────────────
// PUT /api/kandidat/:id  [protected: requireAdmin]
export async function updateKandidat(req, res) {
  try {
    const ref  = db.collection('kandidat').doc(req.params.id);
    const snap = await ref.get();
    if (!snap.exists) return res.status(404).json({ error: 'Kandidat tidak ditemukan.' });

    // Jangan izinkan update votes/pct langsung — ada endpoint khusus
    const { votes, pct, createdAt, createdBy, ...updates } = req.body;

    await ref.update({ ...updates, updatedAt: new Date(), updatedBy: req.user.uid });
    return res.json({ message: 'Kandidat berhasil diperbarui.' });
  } catch (err) {
    console.error('[updateKandidat]', err);
    return res.status(500).json({ error: 'Terjadi kesalahan server.' });
  }
}

// ── HAPUS kandidat ────────────────────────────────────────────
// DELETE /api/kandidat/:id  [protected: requireAdmin]
export async function deleteKandidat(req, res) {
  try {
    const ref  = db.collection('kandidat').doc(req.params.id);
    const snap = await ref.get();
    if (!snap.exists) return res.status(404).json({ error: 'Kandidat tidak ditemukan.' });

    // Cegah hapus jika sudah ada suara masuk
    if (snap.data().votes > 0) {
      return res.status(400).json({ error: 'Kandidat tidak bisa dihapus karena sudah ada suara masuk.' });
    }

    await ref.delete();
    return res.json({ message: 'Kandidat berhasil dihapus.' });
  } catch (err) {
    console.error('[deleteKandidat]', err);
    return res.status(500).json({ error: 'Terjadi kesalahan server.' });
  }
}