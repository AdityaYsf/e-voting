import { db } from '../config/firebase.js';

// ── KIRIM SUARA ───────────────────────────────────────────────
// POST /api/suara  [protected: requireVerifiedWarga]
export async function kirimSuara(req, res) {
  try {
    const { kandidatId, kategori } = req.body;
    const wargaUid = req.user.uid;

    if (!kandidatId || !kategori) {
      return res.status(400).json({ error: 'kandidatId dan kategori wajib diisi.' });
    }

    // Cek kandidat ada
    const kandidatRef  = db.collection('kandidat').doc(kandidatId);
    const kandidatSnap = await kandidatRef.get();
    if (!kandidatSnap.exists) {
      return res.status(404).json({ error: 'Kandidat tidak ditemukan.' });
    }
    if (kandidatSnap.data().kategori !== kategori) {
      return res.status(400).json({ error: 'Kategori tidak sesuai dengan kandidat.' });
    }

    // Gunakan Firestore transaction untuk atomic voting
    await db.runTransaction(async (t) => {
      const wargaRef  = db.collection('warga').doc(wargaUid);
      const wargaSnap = await t.get(wargaRef);

      // Cek belum pernah voting di kategori ini
      const sudahVoting = wargaSnap.data()?.sudahVotingKategori || {};
      if (sudahVoting[kategori]) {
        throw new Error(`Anda sudah memberikan suara untuk kategori ${kategori}.`);
      }

      // Catat suara
      const suaraRef = db.collection('suara').doc();
      t.set(suaraRef, {
        wargaUid,
        kandidatId,
        kategori,
        rt:        wargaSnap.data()?.rt,
        timestamp: new Date(),
      });

      // Update votes kandidat
      const kandidatData = kandidatSnap.data();
      t.update(kandidatRef, {
        votes: (kandidatData.votes || 0) + 1,
      });

      // Tandai warga sudah voting di kategori ini
      t.update(wargaRef, {
        [`sudahVotingKategori.${kategori}`]: true,
        lastVotedAt: new Date(),
      });
    });

    // Recalculate pct semua kandidat di kategori ini (async, tidak block response)
    recalculatePct(kategori).catch(console.error);

    return res.status(201).json({ message: 'Suara berhasil dicatat. Terima kasih telah berpartisipasi!' });
  } catch (err) {
    console.error('[kirimSuara]', err);
    if (err.message?.includes('sudah memberikan suara')) {
      return res.status(409).json({ error: err.message });
    }
    return res.status(500).json({ error: 'Terjadi kesalahan server.' });
  }
}

// ── HELPER: Recalculate persentase suara per kategori ─────────
async function recalculatePct(kategori) {
  const snap = await db.collection('kandidat').where('kategori', '==', kategori).get();
  const total = snap.docs.reduce((sum, d) => sum + (d.data().votes || 0), 0);
  if (total === 0) return;

  const batch = db.batch();
  let maxVotes = 0;
  let unggulId = null;

  snap.docs.forEach(d => {
    const votes = d.data().votes || 0;
    const pct   = Math.round((votes / total) * 100);
    batch.update(d.ref, { pct });
    if (votes > maxVotes) { maxVotes = votes; unggulId = d.id; }
  });

  // Tandai kandidat unggul
  snap.docs.forEach(d => {
    batch.update(d.ref, { status: d.id === unggulId ? 'unggul' : 'pesaing' });
  });

  await batch.commit();
}

// ── GET HASIL SUARA per kategori ──────────────────────────────
// GET /api/suara/hasil?kategori=rw  [public]
export async function getHasil(req, res) {
  try {
    const { kategori } = req.query;
    let query = db.collection('kandidat');
    if (kategori) query = query.where('kategori', '==', kategori);

    const snap = await query.orderBy('votes', 'desc').get();
    const kandidat = snap.docs.map(d => {
      const { createdBy, updatedBy, ...safe } = d.data();
      return { id: d.id, ...safe };
    });

    // Hitung total suara masuk
    const totalSuara = kandidat.reduce((s, k) => s + (k.votes || 0), 0);

    return res.json({ kategori: kategori || 'semua', totalSuara, kandidat });
  } catch (err) {
    console.error('[getHasil]', err);
    return res.status(500).json({ error: 'Terjadi kesalahan server.' });
  }
}

// ── GET STATISTIK PARTISIPASI ─────────────────────────────────
// GET /api/suara/partisipasi  [public]
export async function getPartisipasi(req, res) {
  try {
    const [dptSnap, wargaSnap] = await Promise.all([
      db.collection('settings').doc('dpt').get(),
      db.collection('warga').where('status', '==', 'verified').get(),
    ]);

    const dpt          = dptSnap.data()?.total || 0;
    const totalVerified = wargaSnap.size;

    // Hitung yang sudah voting (punya minimal 1 entri di sudahVotingKategori)
    let sudahVoting = 0;
    wargaSnap.docs.forEach(d => {
      const sv = d.data().sudahVotingKategori || {};
      if (Object.keys(sv).length > 0) sudahVoting++;
    });

    const pct = dpt > 0 ? Math.round((sudahVoting / dpt) * 100 * 10) / 10 : 0;

    return res.json({
      dpt,
      totalVerified,
      sudahVoting,
      belumVoting: dpt - sudahVoting,
      pct,
    });
  } catch (err) {
    console.error('[getPartisipasi]', err);
    return res.status(500).json({ error: 'Terjadi kesalahan server.' });
  }
}

// ── CEK STATUS VOTING warga ───────────────────────────────────
// GET /api/suara/status  [protected: requireVerifiedWarga]
export async function getStatusVoting(req, res) {
  try {
    const snap = await db.collection('warga').doc(req.user.uid).get();
    const sudahVotingKategori = snap.data()?.sudahVotingKategori || {};

    return res.json({
      sudahVotingKategori,
      selesai: Object.keys(sudahVotingKategori).length >= 4, // rw + rt1 + rt2 + rt3
    });
  } catch (err) {
    console.error('[getStatusVoting]', err);
    return res.status(500).json({ error: 'Terjadi kesalahan server.' });
  }
}