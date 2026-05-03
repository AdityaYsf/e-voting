import express    from 'express';
import cors       from 'cors';
import helmet     from 'helmet';
import morgan     from 'morgan';
import rateLimit  from 'express-rate-limit';
import dotenv     from 'dotenv';

import authRoutes     from './routes/authRoutes.js';
import wargaRoutes    from './routes/wargaRoutes.js';
import kandidatRoutes from './routes/kandidatRoutes.js';
import suaraRoutes    from './routes/suaraRoutes.js';

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Security & logging ────────────────────────────────────────
app.use(helmet());
app.use(morgan('dev'));

// ── CORS ──────────────────────────────────────────────────────
app.use(cors({
  origin:      process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods:     ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}));

// ── Body parser ───────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Rate limiting ─────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max:      100,
  message:  { error: 'Terlalu banyak permintaan. Coba lagi beberapa saat.' },
});
app.use('/api', limiter);

// Rate limit ketat khusus endpoint voting
const votingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 jam
  max:      10,
  message:  { error: 'Terlalu banyak percobaan voting.' },
});
app.use('/api/suara', votingLimiter);

// ── Routes ────────────────────────────────────────────────────
app.use('/api/auth',     authRoutes);
app.use('/api/warga',    wargaRoutes);
app.use('/api/kandidat', kandidatRoutes);
app.use('/api/suara',    suaraRoutes);

// ── Health check ──────────────────────────────────────────────
app.get('/health', (_, res) => res.json({
  status: 'ok',
  service: 'e-Pemilihan API',
  timestamp: new Date().toISOString(),
}));

// ── 404 handler ───────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} tidak ditemukan.` });
});

// ── Global error handler ──────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[ERROR]', err);
  res.status(500).json({ error: 'Terjadi kesalahan server yang tidak terduga.' });
});

// ── Start server ──────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🗳️  e-Pemilihan API berjalan di http://localhost:${PORT}`);
  console.log(`📋  Environment: ${process.env.NODE_ENV || 'development'}\n`);
});