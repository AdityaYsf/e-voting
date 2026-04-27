import { NavLink } from 'react-router-dom';

// ── Election candidates data ──────────────────────────────────
export const ELECTION = {
  rw: {
    title: 'Perolehan Suara — Ketua RW 05',
    candidates: [
      { name: 'Budi Santoso',  ini: 'BS', bg: '#DBEAFE', tx: '#1D4ED8', bar: '#1558B0', barEnd: '#3B82F6', votes: 312, pct: 44 },
      { name: 'Siti Rahayu',   ini: 'SR', bg: '#CCFBF1', tx: '#0F766E', bar: '#0F766E', barEnd: '#14B8A6', votes: 251, pct: 35 },
      { name: 'Ahmad Fauzi',   ini: 'AF', bg: '#FFEDD5', tx: '#9A3412', bar: '#EA580C', barEnd: '#F97316', votes: 147, pct: 21 },
    ],
  },
  rt1: {
    title: 'Perolehan Suara — Ketua RT 01',
    candidates: [
      { name: 'Dewi Kartika',  ini: 'DK', bg: '#DBEAFE', tx: '#1D4ED8', bar: '#1558B0', barEnd: '#3B82F6', votes: 89,  pct: 56 },
      { name: 'Hendra Wijaya', ini: 'HW', bg: '#CCFBF1', tx: '#0F766E', bar: '#0F766E', barEnd: '#14B8A6', votes: 70,  pct: 44 },
    ],
  },
  rt2: {
    title: 'Perolehan Suara — Ketua RT 02',
    candidates: [
      { name: 'Rini Susanti',  ini: 'RS', bg: '#DBEAFE', tx: '#1D4ED8', bar: '#1558B0', barEnd: '#3B82F6', votes: 110, pct: 49 },
      { name: 'Joko Prasetyo', ini: 'JP', bg: '#CCFBF1', tx: '#0F766E', bar: '#0F766E', barEnd: '#14B8A6', votes: 95,  pct: 42 },
      { name: 'Maya Putri',    ini: 'MP', bg: '#FFEDD5', tx: '#9A3412', bar: '#EA580C', barEnd: '#F97316', votes: 20,  pct: 9  },
    ],
  },
  rt3: {
    title: 'Perolehan Suara — Ketua RT 03',
    candidates: [
      { name: 'Agus Setiawan', ini: 'AS', bg: '#DBEAFE', tx: '#1D4ED8', bar: '#1558B0', barEnd: '#3B82F6', votes: 148, pct: 52 },
      { name: 'Lia Novianti',  ini: 'LN', bg: '#CCFBF1', tx: '#0F766E', bar: '#0F766E', barEnd: '#14B8A6', votes: 137, pct: 48 },
    ],
  },
};

// ── Tabs ─────────────────────────────────────────────────────
export const TABS = [
  { key: 'rw',  label: 'Ketua RW 05' },
  { key: 'rt1', label: 'Ketua RT 01' },
  { key: 'rt2', label: 'Ketua RT 02' },
  { key: 'rt3', label: 'Ketua RT 03' },
];

// ── Metrics ───────────────────────────────────────────────────
export const METRICS = [
  {
    id: 'dpt',
    label: 'Total Warga Terdaftar',
    value: 1247,
    sub: 'Daftar Pemilih Tetap',
    tag: 'DPT',
    color: '#1558B0',
    bgIcon: '#DBEAFE',
    iconStroke: '#1558B0',
    tagBg: '#EFF6FF',
    tagColor: '#0D3A7A',
    borderClass: 'border-t-[3px] border-t-[#1558B0]',
    hasBar: false,
    icon: 'users',
  },
  {
    id: 'voted',
    label: 'Sudah Memberikan Suara',
    value: 734,
    sub: '58,9% dari total DPT',
    tag: '+12/jam',
    color: '#0F766E',
    bgIcon: '#CCFBF1',
    iconStroke: '#0F766E',
    tagBg: '#CCFBF1',
    tagColor: '#0F766E',
    borderClass: 'border-t-[3px] border-t-[#14B8A6]',
    hasBar: true,
    barWidth: 58.9,
    barBg: 'linear-gradient(90deg,#0F766E,#14B8A6)',
    icon: 'check',
  },
  {
    id: 'pending',
    label: 'Belum Memberikan Suara',
    value: 513,
    sub: '41,1% dari total DPT',
    tag: 'Menunggu',
    color: '#EA580C',
    bgIcon: '#FFEDD5',
    iconStroke: '#EA580C',
    tagBg: '#FFEDD5',
    tagColor: '#9A3412',
    borderClass: 'border-t-[3px] border-t-[#EA580C]',
    hasBar: true,
    barWidth: 41.1,
    barBg: 'linear-gradient(90deg,#EA580C,#F97316)',
    icon: 'clock',
  },
  {
    id: 'invalid',
    label: 'Suara Tidak Sah',
    value: 12,
    sub: '1,6% dari suara masuk',
    tag: 'Tidak Sah',
    color: '#DC2626',
    bgIcon: '#FEE2E2',
    iconStroke: '#DC2626',
    tagBg: '#FEE2E2',
    tagColor: '#DC2626',
    borderClass: 'border-t-[3px] border-t-[#DC2626]',
    hasBar: false,
    icon: 'x',
  },
];

// ── Hasil Suara (Ringkasan Lengkap) ──────────────────────────
// ── Hasil Suara ───────────────────────────────────────────────
export const HASIL_SUARA = {
  rw: {
    label: 'Ketua RW 05',
    totalDPT: 1247,
    totalSuara: 734,
    sah: 722,
    tidakSah: 12,
    candidates: [
      {
        name: 'Budi Santoso', ini: 'BS',
        bg: '#DBEAFE', tx: '#1D4ED8', bar: '#1558B0',
        votes: 312, pct: 44,
        wilayah: [
          { rt: 'RT 01', v: 112 },
          { rt: 'RT 02', v: 108 },
          { rt: 'RT 03', v: 92  },
        ],
      },
      {
        name: 'Siti Rahayu', ini: 'SR',
        bg: '#CCFBF1', tx: '#0F766E', bar: '#0F766E',
        votes: 251, pct: 35,
        wilayah: [
          { rt: 'RT 01', v: 58 },
          { rt: 'RT 02', v: 89 },
          { rt: 'RT 03', v: 104 },
        ],
      },
      {
        name: 'Ahmad Fauzi', ini: 'AF',
        bg: '#FFEDD5', tx: '#9A3412', bar: '#EA580C',
        votes: 147, pct: 21,
        wilayah: [
          { rt: 'RT 01', v: 31 },
          { rt: 'RT 02', v: 46 },
          { rt: 'RT 03', v: 70 },
        ],
      },
    ],
    hourly: {
      labels: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00'],
      data:   [45, 112, 198, 310, 510, 734],
    },
  },

  rt1: {
    label: 'Ketua RT 01',
    totalDPT: 300,
    totalSuara: 201,
    sah: 196,
    tidakSah: 5,
    candidates: [
      {
        name: 'Dewi Kartika', ini: 'DK',
        bg: '#DBEAFE', tx: '#1D4ED8', bar: '#1558B0',
        votes: 89, pct: 56,
      },
      {
        name: 'Hendra Wijaya', ini: 'HW',
        bg: '#CCFBF1', tx: '#0F766E', bar: '#0F766E',
        votes: 70, pct: 44,
      },
    ],
    hourly: {
      labels: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00'],
      data:   [10, 28, 52, 95, 155, 201],
    },
  },

  rt2: {
    label: 'Ketua RT 02',
    totalDPT: 450,
    totalSuara: 243,
    sah: 240,
    tidakSah: 3,
    candidates: [
      {
        name: 'Rini Susanti', ini: 'RS',
        bg: '#DBEAFE', tx: '#1D4ED8', bar: '#1558B0',
        votes: 110, pct: 49,
      },
      {
        name: 'Joko Prasetyo', ini: 'JP',
        bg: '#CCFBF1', tx: '#0F766E', bar: '#0F766E',
        votes: 95, pct: 42,
      },
      {
        name: 'Maya Putri', ini: 'MP',
        bg: '#FFEDD5', tx: '#9A3412', bar: '#EA580C',
        votes: 20, pct: 9,
      },
    ],
    hourly: {
      labels: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00'],
      data:   [15, 38, 74, 130, 196, 243],
    },
  },

  rt3: {
    label: 'Ketua RT 03',
    totalDPT: 497,
    totalSuara: 290,
    sah: 286,
    tidakSah: 4,
    candidates: [
      {
        name: 'Agus Setiawan', ini: 'AS',
        bg: '#DBEAFE', tx: '#1D4ED8', bar: '#1558B0',
        votes: 148, pct: 52,
      },
      {
        name: 'Lia Novianti', ini: 'LN',
        bg: '#CCFBF1', tx: '#0F766E', bar: '#0F766E',
        votes: 137, pct: 48,
      },
    ],
    hourly: {
      labels: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00'],
      data:   [20, 46, 72, 124, 220, 290],
    },
  },
};

// ── Participation data ────────────────────────────────────────
export const PARTICIPATION = [
  { label: 'RW 05', pct: 58.9, count: '734/1247', barBg: 'linear-gradient(90deg,#1558B0,#1E7BD4)', pctColor: '#1558B0' },
  { label: 'RT 01', pct: 67,   count: '201/300',  barBg: 'linear-gradient(90deg,#0F766E,#14B8A6)', pctColor: '#0F766E' },
  { label: 'RT 02', pct: 54,   count: '243/450',  barBg: 'linear-gradient(90deg,#0F766E,#14B8A6)', pctColor: '#0F766E' },
  { label: 'RT 03', pct: 57,   count: '290/497',  barBg: 'linear-gradient(90deg,#0F766E,#14B8A6)', pctColor: '#0F766E' },
];

// ── Security layers ───────────────────────────────────────────
export const SECURITY = [
  {
    name: 'Verifikasi NIK + OTP',
    desc: '2 lapis verifikasi via SMS',
    bgIco: '#CCFBF1',
    stroke: '#0F766E',
    badge: 'badge-teal',
    badgeLabel: 'Aktif',
    icon: 'check',
  },
  {
    name: 'Enkripsi AES-256',
    desc: 'Suara dienkripsi sebelum dikirim',
    bgIco: '#CCFBF1',
    stroke: '#0F766E',
    badge: 'badge-teal',
    badgeLabel: 'Aktif',
    icon: 'lock',
  },
  {
    name: 'Catatan Blockchain',
    desc: 'Log tidak bisa dimanipulasi',
    bgIco: '#DBEAFE',
    stroke: '#1558B0',
    badge: 'badge-blue',
    badgeLabel: 'Aktif',
    icon: 'shield',
  },
  {
    name: 'Satu Orang, Satu Suara',
    desc: 'NIK hanya bisa digunakan 1 kali',
    bgIco: '#DBEAFE',
    stroke: '#1558B0',
    badge: 'badge-blue',
    badgeLabel: 'Aktif',
    icon: 'info',
  },
  {
    name: 'Pengawas Independen',
    desc: '3 pengawas memantau langsung',
    bgIco: '#FFEDD5',
    stroke: '#EA580C',
    badge: 'badge-orange',
    badgeLabel: '3 Aktif',
    icon: 'eye',
  },
];

// ── Initial audit logs ────────────────────────────────────────
export const INITIAL_LOGS = [
  { time: '12:47:02', text: 'Warga NIK 317****1234 berhasil memilih RT 01', color: '#0F766E' },
  { time: '12:46:51', text: 'Percobaan duplikat diblokir — NIK 317****5678', color: '#DC2626' },
  { time: '12:46:33', text: 'Warga NIK 317****9012 berhasil memilih RW 05', color: '#0F766E' },
  { time: '12:46:11', text: 'OTP gagal 3x — sesi dikunci sementara', color: '#DC2626' },
  { time: '12:45:58', text: 'Warga NIK 317****3456 berhasil memilih RT 02', color: '#0F766E' },
  { time: '12:45:40', text: 'Pengawas KPU login: rian.p@kelurahan.go.id', color: '#1558B0' },
  { time: '12:45:21', text: 'Warga NIK 317****7890 berhasil memilih RT 03', color: '#0F766E' },
  { time: '12:44:55', text: 'Backup data otomatis berhasil dilakukan', color: '#1558B0' },
  { time: '12:44:30', text: 'Warga NIK 317****2211 berhasil memilih RW 05', color: '#0F766E' },
  { time: '12:44:10', text: 'Health check OK — semua layanan normal', color: '#1558B0' },
];

export const LIVE_ENTRIES = [
  'Warga NIK 317****8844 berhasil memilih RT 03',
  'Warga NIK 317****3310 berhasil memilih RW 05',
  'Percobaan tidak sah diblokir otomatis oleh sistem',
  'Warga NIK 317****7721 berhasil memilih RT 01',
  'Sesi habis — NIK 317****4499 perlu autentikasi ulang',
  'Warga NIK 317****5566 berhasil memilih RT 02',
  'Sistem backup otomatis dijalankan',
  'Warga NIK 317****6677 berhasil memilih RW 05',
];

// ── Nav items ────────────────────────────────────────────────

export const NAV_MAIN = [
  { label: 'Beranda Pemilihan', icon: 'grid',     path: '/dashboard' },
  { label: 'Hasil Suara',       icon: 'activity', path: '/hasil'     },
  { label: 'Profil Kandidat',   icon: 'users',    path: '/profil'    },
  { label: 'Jadwal Pemilihan',  icon: 'clock',    path: null         }, // belum ada
  { label: 'Info Keamanan',     icon: 'shield',   path: null         }, // belum ada
];

export const NAV_INFO = [
  { label: 'Bantuan & FAQ',        icon: 'help' },
  { label: 'Peraturan Pemilihan',  icon: 'file' },
  { label: 'Hubungi Panitia',      icon: 'phone' },
];



// ── Trend chart data ──────────────────────────────────────────
export const TREND_LABELS = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00'];
export const TREND_DATA   = [45, 112, 198, 310, 510, 734];

// ── Kandidat Profiles ─────────────────────────────────────────
export const KANDIDAT_PROFILES = [
  // ── Ketua RW 05 ──────────────────────────────────────────
  {
    id: 'bs', kategori: 'rw', kategoriLabel: 'Ketua RW 05',
    nomorUrut: 1, name: 'Budi Santoso', ini: 'BS', jabatan: 'Ketua RW 05',
    bg: '#DBEAFE', tx: '#1D4ED8', bar: '#1558B0', barEnd: '#3B82F6',
    usia: 48, pendidikan: 'S1 Teknik Sipil — Universitas Indonesia',
    pekerjaan: 'Wiraswasta / Kontraktor', alamat: 'Jl. Melati No. 12, RT 02',
    pengalaman: 'Ketua RT 02 (2020–2023), Anggota BPD Kelurahan',
    ttl: 'Jakarta, 14 Maret 1976',
    visi: 'Mewujudkan RW 05 yang aman, bersih, dan sejahtera melalui gotong royong warga.',
    misi: [
      'Meningkatkan keamanan lingkungan dengan sistem ronda terjadwal',
      'Membangun fasilitas umum yang layak dan merata di setiap RT',
      'Mendorong UMKM warga melalui program pelatihan dan pendampingan',
      'Digitalisasi administrasi kependudukan RW',
    ],
    program: ['Keamanan', 'Lingkungan', 'Digitalisasi', 'Sosial'],
    votes: 312, pct: 44, status: 'unggul',
  },
  {
    id: 'sr', kategori: 'rw', kategoriLabel: 'Ketua RW 05',
    nomorUrut: 2, name: 'Siti Rahayu', ini: 'SR', jabatan: 'Ketua RW 05',
    bg: '#CCFBF1', tx: '#0F766E', bar: '#0F766E', barEnd: '#14B8A6',
    usia: 44, pendidikan: 'S1 Kesehatan Masyarakat — Universitas Diponegoro',
    pekerjaan: 'Bidan Puskesmas Kecamatan', alamat: 'Jl. Dahlia No. 7, RT 01',
    pengalaman: 'Ketua PKK RT 01 (2021–2024), Kader Posyandu aktif sejak 2015',
    ttl: 'Semarang, 22 Juli 1980',
    visi: 'Menjadikan RW 05 sebagai lingkungan sehat, inklusif, dan berdaya untuk semua warga.',
    misi: [
      'Meningkatkan akses layanan kesehatan gratis bagi lansia dan balita',
      'Membentuk Posyandu mandiri di setiap RT',
      'Memperkuat peran perempuan dalam kepemimpinan lingkungan',
      'Menata infrastruktur jalan dan drainase bersama dinas terkait',
    ],
    program: ['Kesehatan', 'Pemberdayaan', 'Infrastruktur', 'Pendidikan'],
    votes: 251, pct: 35, status: 'pesaing',
  },
  {
    id: 'af', kategori: 'rw', kategoriLabel: 'Ketua RW 05',
    nomorUrut: 3, name: 'Ahmad Fauzi', ini: 'AF', jabatan: 'Ketua RW 05',
    bg: '#FFEDD5', tx: '#9A3412', bar: '#EA580C', barEnd: '#F97316',
    usia: 52, pendidikan: 'SMA / Sederajat',
    pekerjaan: 'Pedagang & Tokoh Masyarakat', alamat: 'Jl. Kenanga No. 3, RT 03',
    pengalaman: 'Ketua RW 05 (2017–2020), Penggagas pasar warga RT 03',
    ttl: 'Jakarta, 5 Januari 1972',
    visi: 'Mengembalikan kebersamaan dan nilai gotong royong yang telah menjadi fondasi RW 05.',
    misi: [
      'Menghidupkan kembali tradisi musyawarah warga bulanan',
      'Menjaga stabilitas iuran dan transparansi kas RW',
      'Mendukung pedagang kaki lima warga agar tertib dan berdaya',
      'Memperkuat hubungan antar RT melalui kegiatan bersama',
    ],
    program: ['Kebersamaan', 'Transparansi', 'Ekonomi Lokal', 'Budaya'],
    votes: 147, pct: 21, status: 'pesaing',
  },

  // ── Ketua RT 01 ──────────────────────────────────────────
  {
    id: 'dk', kategori: 'rt1', kategoriLabel: 'Ketua RT 01',
    nomorUrut: 1, name: 'Dewi Kartika', ini: 'DK', jabatan: 'Ketua RT 01',
    bg: '#DBEAFE', tx: '#1D4ED8', bar: '#1558B0', barEnd: '#3B82F6',
    usia: 36, pendidikan: 'S1 Akuntansi — Universitas Trisakti',
    pekerjaan: 'Staf Keuangan Swasta', alamat: 'Jl. Anggrek No. 4, RT 01',
    pengalaman: 'Bendahara RT 01 (2022–2025)',
    ttl: 'Jakarta, 10 November 1988',
    visi: 'Menjadikan RT 01 yang tertib, bersih, dan warganya saling peduli.',
    misi: [
      'Mengelola kas RT secara transparan dan akuntabel',
      'Meningkatkan kebersihan lingkungan dengan jadwal piket warga',
      'Memfasilitasi kegiatan sosial dan keagamaan secara rutin',
      'Mempercepat pengurusan administrasi kependudukan warga',
    ],
    program: ['Keuangan', 'Kebersihan', 'Sosial', 'Administrasi'],
    votes: 89, pct: 56, status: 'unggul',
  },
  {
    id: 'hw', kategori: 'rt1', kategoriLabel: 'Ketua RT 01',
    nomorUrut: 2, name: 'Hendra Wijaya', ini: 'HW', jabatan: 'Ketua RT 01',
    bg: '#CCFBF1', tx: '#0F766E', bar: '#0F766E', barEnd: '#14B8A6',
    usia: 41, pendidikan: 'S1 Hukum — Universitas Pancasila',
    pekerjaan: 'Paralegal / Konsultan Hukum', alamat: 'Jl. Anggrek No. 19, RT 01',
    pengalaman: 'Sekretaris RT 01 (2021–2024), Paralegal LBH Jakarta',
    ttl: 'Bogor, 3 Juni 1983',
    visi: 'Membangun RT 01 yang aman secara hukum dan terlindungi hak-hak warganya.',
    misi: [
      'Memberikan pendampingan hukum gratis bagi warga yang membutuhkan',
      'Memastikan setiap warga memiliki dokumen kependudukan yang lengkap',
      'Menyelesaikan perselisihan warga secara musyawarah dan adil',
      'Mengoptimalkan dana RT untuk infrastruktur yang merata',
    ],
    program: ['Hukum', 'Dokumen', 'Mediasi', 'Infrastruktur'],
    votes: 70, pct: 44, status: 'pesaing',
  },

  // ── Ketua RT 02 ──────────────────────────────────────────
  {
    id: 'rs', kategori: 'rt2', kategoriLabel: 'Ketua RT 02',
    nomorUrut: 1, name: 'Rini Susanti', ini: 'RS', jabatan: 'Ketua RT 02',
    bg: '#DBEAFE', tx: '#1D4ED8', bar: '#1558B0', barEnd: '#3B82F6',
    usia: 39, pendidikan: 'S1 Pendidikan — Universitas Negeri Jakarta',
    pekerjaan: 'Guru SD Negeri', alamat: 'Jl. Bougenville No. 8, RT 02',
    pengalaman: 'Ketua PKK RT 02 (2022–2025)',
    ttl: 'Jakarta, 17 Agustus 1985',
    visi: 'Mewujudkan RT 02 sebagai lingkungan edukatif, harmonis, dan nyaman untuk keluarga.',
    misi: [
      'Mendirikan taman belajar anak di lingkungan RT',
      'Meningkatkan kesadaran warga akan pentingnya pendidikan',
      'Menciptakan suasana lingkungan yang aman dan ramah anak',
      'Mengelola iuran dan program sosial RT secara transparan',
    ],
    program: ['Pendidikan', 'Ramah Anak', 'Lingkungan', 'Komunikasi'],
    votes: 110, pct: 49, status: 'unggul',
  },
  {
    id: 'jp', kategori: 'rt2', kategoriLabel: 'Ketua RT 02',
    nomorUrut: 2, name: 'Joko Prasetyo', ini: 'JP', jabatan: 'Ketua RT 02',
    bg: '#CCFBF1', tx: '#0F766E', bar: '#0F766E', barEnd: '#14B8A6',
    usia: 45, pendidikan: 'D3 Teknik Elektro — Politeknik Negeri Jakarta',
    pekerjaan: 'Teknisi Listrik & Kontraktor', alamat: 'Jl. Bougenville No. 22, RT 02',
    pengalaman: 'Koordinator infrastruktur RT 02 sejak 2020',
    ttl: 'Bekasi, 29 April 1979',
    visi: 'Membangun infrastruktur RT 02 yang handal, modern, dan dapat dinikmati seluruh warga.',
    misi: [
      'Memperbaiki jaringan listrik dan penerangan jalan yang tidak merata',
      'Membangun sistem drainase yang bebas banjir',
      'Mendata aset dan fasilitas RT secara digital',
      'Berkoordinasi aktif dengan dinas untuk perbaikan fasilitas umum',
    ],
    program: ['Listrik', 'Drainase', 'Perawatan', 'Teknologi'],
    votes: 95, pct: 42, status: 'pesaing',
  },
  {
    id: 'mp', kategori: 'rt2', kategoriLabel: 'Ketua RT 02',
    nomorUrut: 3, name: 'Maya Putri', ini: 'MP', jabatan: 'Ketua RT 02',
    bg: '#FFEDD5', tx: '#9A3412', bar: '#EA580C', barEnd: '#F97316',
    usia: 29, pendidikan: 'S1 Komunikasi — Universitas Mercu Buana',
    pekerjaan: 'Content Creator & UMKM Online', alamat: 'Jl. Bougenville No. 31, RT 02',
    pengalaman: 'Ketua Karang Taruna RT 02 (2023–2025)',
    ttl: 'Jakarta, 2 Februari 1995',
    visi: 'Membawa semangat anak muda untuk membangun RT 02 yang modern dan kreatif.',
    misi: [
      'Mengaktifkan karang taruna sebagai motor penggerak kegiatan RT',
      'Mempromosikan UMKM warga melalui media sosial',
      'Membuat konten digital informatif tentang kegiatan RT',
      'Mendorong partisipasi generasi muda dalam kepengurusan RT',
    ],
    program: ['Digital', 'UMKM', 'Kreatif', 'Pemuda'],
    votes: 20, pct: 9, status: 'pesaing',
  },

  // ── Ketua RT 03 ──────────────────────────────────────────
  {
    id: 'as', kategori: 'rt3', kategoriLabel: 'Ketua RT 03',
    nomorUrut: 1, name: 'Agus Setiawan', ini: 'AS', jabatan: 'Ketua RT 03',
    bg: '#DBEAFE', tx: '#1D4ED8', bar: '#1558B0', barEnd: '#3B82F6',
    usia: 50, pendidikan: 'S1 Manajemen — Universitas Gunadarma',
    pekerjaan: 'Manajer Operasional Perusahaan Logistik', alamat: 'Jl. Cempaka No. 5, RT 03',
    pengalaman: 'Ketua RT 03 petahana (2023–2026), Wakil Ketua RW 05',
    ttl: 'Jakarta, 8 Mei 1974',
    visi: 'Melanjutkan dan meningkatkan program yang telah berjalan demi RT 03 yang lebih baik.',
    misi: [
      'Melanjutkan program keamanan lingkungan yang telah terbukti efektif',
      'Meningkatkan kualitas fasilitas posyandu dan balai RT',
      'Memperluas jaringan kerjasama dengan instansi kelurahan',
      'Mempertahankan transparansi pengelolaan keuangan RT',
    ],
    program: ['Keamanan', 'Fasilitas', 'Manajemen', 'Sosial'],
    votes: 148, pct: 52, status: 'unggul',
  },
  {
    id: 'ln', kategori: 'rt3', kategoriLabel: 'Ketua RT 03',
    nomorUrut: 2, name: 'Lia Novianti', ini: 'LN', jabatan: 'Ketua RT 03',
    bg: '#CCFBF1', tx: '#0F766E', bar: '#0F766E', barEnd: '#14B8A6',
    usia: 34, pendidikan: 'S2 Kesehatan Lingkungan — Universitas Indonesia',
    pekerjaan: 'Peneliti Kesehatan Lingkungan', alamat: 'Jl. Cempaka No. 17, RT 03',
    pengalaman: 'Penggerak program Kampung Iklim RT 03 (2024)',
    ttl: 'Depok, 19 November 1990',
    visi: 'Mewujudkan RT 03 sebagai kampung sehat berbasis ilmu pengetahuan dan data.',
    misi: [
      'Menerapkan program RT bebas asap rokok di area publik',
      'Mengelola sampah organik menjadi kompos untuk warga',
      'Melakukan pemetaan kesehatan warga secara berkala',
      'Meningkatkan kualitas air bersih dan sanitasi lingkungan',
    ],
    program: ['Kompos', 'Bebas Rokok', 'Air Bersih', 'Data Warga'],
    votes: 137, pct: 48, status: 'pesaing',
  },
];