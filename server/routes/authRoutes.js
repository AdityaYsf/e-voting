import express from 'express';
import { registerWarga, registerAdmin, getMe } from '../controllers/authController.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/register',       registerWarga);
router.post('/register-admin', requireAdmin, registerAdmin);
router.get('/me',              verifyToken,  getMe);

export default router;