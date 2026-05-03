import express from 'express';
import {
  getAllWarga, getWargaById, verifyWarga, rejectWarga,
} from '../controllers/wargaController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Semua route warga hanya bisa diakses admin
router.get('/',           requireAdmin, getAllWarga);
router.get('/:uid',       requireAdmin, getWargaById);
router.patch('/:uid/verify', requireAdmin, verifyWarga);
router.patch('/:uid/reject', requireAdmin, rejectWarga);

export default router;