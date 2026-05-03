import express from "express";
import {
	kirimSuara,
	getHasil,
	getPartisipasi,
	getStatusVoting,
} from "../controllers/suaraController.js";
import { requireVerifiedWarga } from "../middleware/auth.js";

const router = express.Router();

router.get("/hasil", getHasil);
router.get("/partisipasi", getPartisipasi);

router.post("/", requireVerifiedWarga, kirimSuara);
router.post("/status", requireVerifiedWarga, getStatusVoting);

export default router;
