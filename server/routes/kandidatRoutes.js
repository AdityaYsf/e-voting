import express from 'express';
import {
  getAllKandidat, getKandidatById,
  createKandidat, updateKandidat, deleteKandidat,
} from '../controllers/kandidatController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public — siapa saja bisa lihat kandidat
router.get('/',    getAllKandidat);
router.get('/:id', getKandidatById);

// Admin only — CRUD
router.post('/',    requireAdmin, createKandidat);
router.put('/:id',  requireAdmin, updateKandidat);
router.delete('/:id', requireAdmin, deleteKandidat);

export default router;