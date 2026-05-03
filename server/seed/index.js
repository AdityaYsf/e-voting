#!/usr/bin/env node
/**
 * seed/index.js — Seed semua koleksi Firestore
 * ─────────────────────────────────────────────
 * Jalankan dari folder server/:
 *
 *   node seed/index.js              → seed semua
 *   node seed/index.js kandidat     → seed kandidat saja
 *   node seed/index.js warga        → seed warga saja
 *   node seed/index.js admin        → seed admin saja
 *   node seed/index.js settings     → seed settings saja
 *   node seed/index.js --reset      → hapus semua data lalu seed ulang
 */

import dotenv         from 'dotenv';
import { getAuth }    from 'firebase-admin/auth';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

dotenv.config({ path: '../.env' });          // path ke .env di folder server/
console.log('Project ID:', process.env.FIREBASE_PROJECT_ID);
console.log('Client Email:', process.env.FIREBASE_CLIENT_EMAIL);
import '../config/firebase.js';              // inisialisasi Firebase Admin

import { SETTINGS, KANDIDAT, ADMINS, WARGA } from '../database/data.js';

const db   = getFirestore();
const auth = getAuth();

// ── Warna terminal ────────────────────────────────────────────
const c = {
  reset:  '\x1b[0m',  bold:   '\x1b[1m',
  red:    '\x1b[31m', green:  '\x1b[32m',
  yellow: '\x1b[33m', cyan:   '\x1b[36m',
  gray:   '\x1b[90m',
};
const ok   = (msg) => console.log(`  ${c.green}✓${c.reset}  ${msg}`);
const warn = (msg) => console.log(`  ${c.yellow}⚠${c.reset}  ${msg}`);
const fail = (msg) => console.log(`  ${c.red}✗${c.reset}  ${msg}`);
const info = (msg) => console.log(`  ${c.gray}${msg}${c.reset}`);
const hr   = ()    => console.log(`${c.gray}${'─'.repeat(52)}${c.reset}`);

// ── Helpers ───────────────────────────────────────────────────

// Tulis dokumen dalam batch (max 500 per batch Firestore)
async function batchWrite(collection, docs) {
  const chunks = [];
  for (let i = 0; i < docs.length; i += 499) {
    chunks.push(docs.slice(i, i + 499));
  }
  for (const chunk of chunks) {
    const batch = db.batch();
    chunk.forEach(({ id, data }) => {
      const ref = id
        ? db.collection(collection).doc(id)
        : db.collection(collection).doc();
      batch.set(ref, data, { merge: true });
    });
    await batch.commit();
  }
}

// Hapus semua dokumen dalam koleksi
async function clearCollection(name) {
  const snap = await db.collection(name).get();
  if (snap.empty) return 0;
  const chunks = [];
  for (let i = 0; i < snap.docs.length; i += 499) {
    chunks.push(snap.docs.slice(i, i + 499));
  }
  for (const chunk of chunks) {
    const batch = db.batch();
    chunk.forEach(d => batch.delete(d.ref));
    await batch.commit();
  }
  return snap.docs.length;
}

// ── Seeder: Settings ──────────────────────────────────────────
async function seedSettings() {
  console.log(`\n${c.bold}📋 Settings${c.reset}`);
  for (const [key, value] of Object.entries(SETTINGS)) {
    await db.collection('settings').doc(key).set(value, { merge: true });
    ok(`settings/${key} → disimpan`);
  }
}

// ── Seeder: Kandidat ──────────────────────────────────────────
async function seedKandidat() {
  console.log(`\n${c.bold}🏛️  Kandidat${c.reset}`);
  const docs = KANDIDAT.map(k => ({
    id:   k.id,
    data: { ...k, createdAt: new Date(), seededAt: new Date() },
  }));
  await batchWrite('kandidat', docs);
  ok(`${docs.length} kandidat disimpan`);
  info(`Kategori: rw(3), rt1(2), rt2(3), rt3(2)`);
}

// ── Seeder: Admin ─────────────────────────────────────────────
async function seedAdmin() {
  console.log(`\n${c.bold}🛡️  Admin / Panitia${c.reset}`);
  let berhasil = 0;
  let lewati   = 0;

  for (const admin of ADMINS) {
    try {
      // Cek apakah email sudah ada
      let userRecord;
      try {
        userRecord = await auth.getUserByEmail(admin.email);
        warn(`${admin.email} — sudah ada, dilewati`);
        lewati++;
        continue;
      } catch {
        // Email belum ada → buat baru
      }

      userRecord = await auth.createUser({
        email:        admin.email,
        password:     admin.password,
        displayName:  admin.nama,
        emailVerified: true,
      });

      // Set custom claim role admin
      await auth.setCustomUserClaims(userRecord.uid, { role: 'admin' });

      // Simpan ke Firestore
      await db.collection('admins').doc(userRecord.uid).set({
        uid:       userRecord.uid,
        nama:      admin.nama,
        email:     admin.email,
        role:      'admin',
        createdAt: new Date(),
        seededAt:  new Date(),
      });

      ok(`${admin.nama} <${admin.email}> → uid: ${userRecord.uid}`);
      berhasil++;
    } catch (err) {
      fail(`${admin.email} — ${err.message}`);
    }
  }

  info(`Selesai: ${berhasil} dibuat, ${lewati} dilewati`);
  if (berhasil > 0) {
    info(`Password default: Admin@2026 — segera ganti setelah login!`);
  }
}

// ── Seeder: Warga ─────────────────────────────────────────────
async function seedWarga() {
  console.log(`\n${c.bold}👥 Warga (dummy)${c.reset}`);
  let berhasil = 0;
  let lewati   = 0;

  for (const warga of WARGA) {
    try {
      // Cek NIK sudah ada
      const nikSnap = await db.collection('warga')
        .where('nik', '==', warga.nik).limit(1).get();
      if (!nikSnap.empty) {
        warn(`NIK ${warga.nik} (${warga.nama}) — sudah ada, dilewati`);
        lewati++;
        continue;
      }

      // Buat Firebase Auth user
      let userRecord;
      try {
        userRecord = await auth.getUserByEmail(warga.email);
      } catch {
        userRecord = await auth.createUser({
          email:        warga.email,
          password:     'Warga@2026',
          displayName:  warga.nama,
          phoneNumber:  warga.noTelp,
          emailVerified: warga.status === 'verified',
        });
      }

      // Set custom claim
      await auth.setCustomUserClaims(userRecord.uid, { role: 'warga' });

      // Data Firestore
      const firestoreData = {
        uid:    userRecord.uid,
        nik:    warga.nik,
        nama:   warga.nama,
        ttl:    warga.ttl,
        rt:     warga.rt,
        noTelp: warga.noTelp,
        email:  warga.email,
        status: warga.status,
        sudahVotingKategori: {},
        createdAt: new Date(),
        seededAt:  new Date(),
      };

      // Tambah field ekstra sesuai status
      if (warga.status === 'verified') {
        firestoreData.verifiedAt = new Date();
        firestoreData.verifiedBy = 'seed-script';
      }
      if (warga.status === 'rejected') {
        firestoreData.rejectedAt   = new Date();
        firestoreData.rejectedBy   = 'seed-script';
        firestoreData.alasanTolak  = warga.alasanTolak || 'Data tidak valid.';
        // Disable akun rejected di Firebase Auth
        await auth.updateUser(userRecord.uid, { disabled: true });
      }

      await db.collection('warga').doc(userRecord.uid).set(firestoreData);

      const badge = warga.status === 'verified' ? '✓' : warga.status === 'pending' ? '⏳' : '✗';
      ok(`${badge} ${warga.nama} [${warga.rt.toUpperCase()}] — ${warga.status}`);
      berhasil++;
    } catch (err) {
      fail(`${warga.nama} — ${err.message}`);
    }
  }

  info(`Selesai: ${berhasil} dibuat, ${lewati} dilewati`);
  info(`Password default warga: Warga@2026`);
}

// ── Reset koleksi ─────────────────────────────────────────────
async function resetAll() {
  console.log(`\n${c.bold}${c.red}🗑️  Reset — menghapus semua data${c.reset}\n`);
  const collections = ['kandidat', 'warga', 'admins', 'settings', 'suara'];

  for (const col of collections) {
    const n = await clearCollection(col);
    info(`Dihapus: ${col} (${n} dokumen)`);
  }

  // Hapus semua Firebase Auth users
  let pageToken;
  let totalDeleted = 0;
  do {
    const list = await auth.listUsers(1000, pageToken);
    if (list.users.length > 0) {
      const uids = list.users.map(u => u.uid);
      await auth.deleteUsers(uids);
      totalDeleted += uids.length;
    }
    pageToken = list.pageToken;
  } while (pageToken);

  info(`Dihapus: Firebase Auth (${totalDeleted} user)`);
  ok('Reset selesai\n');
}

// ── Main ──────────────────────────────────────────────────────
async function main() {
  const args   = process.argv.slice(2);
  const reset  = args.includes('--reset');
  const target = args.find(a => ['kandidat', 'warga', 'admin', 'settings'].includes(a));

  console.log(`\n${c.cyan}${c.bold}════════════════════════════════════════════════════${c.reset}`);
  console.log(`${c.cyan}${c.bold}  🗳️  e-Voting Firestore Seeder${c.reset}`);
  console.log(`${c.cyan}${c.bold}════════════════════════════════════════════════════${c.reset}`);
  console.log(`  ${c.gray}Target : ${target || 'semua'}${c.reset}`);
  console.log(`  ${c.gray}Reset  : ${reset ? 'ya' : 'tidak'}${c.reset}\n`);

  if (reset) {
    await resetAll();
  }

  hr();

  try {
    if (!target || target === 'settings') await seedSettings();
    if (!target || target === 'kandidat') await seedKandidat();
    if (!target || target === 'admin')    await seedAdmin();
    if (!target || target === 'warga')    await seedWarga();

    hr();
    console.log(`\n${c.green}${c.bold}✓ Seed selesai!${c.reset}\n`);
    console.log(`${c.gray}  Koleksi Firestore yang dibuat:${c.reset}`);
    console.log(`${c.gray}  ├── settings  (dpt, pemilihan, keamanan)${c.reset}`);
    console.log(`${c.gray}  ├── kandidat  (10 kandidat, 4 kategori)${c.reset}`);
    console.log(`${c.gray}  ├── admins    (3 akun panitia)${c.reset}`);
    console.log(`${c.gray}  ├── warga     (19 warga dummy)${c.reset}`);
    console.log(`${c.gray}  └── suara     (kosong, siap diisi)${c.reset}\n`);
  } catch (err) {
    hr();
    console.error(`\n${c.red}${c.bold}✗ Seed gagal:${c.reset}`, err.message);
    console.error(err);
    process.exit(1);
  }

  process.exit(0);
}

main();