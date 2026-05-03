import api from "./api.js";

// ─────────────────────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────────────────────

export const authService = {
	// Daftar warga baru
	register: (data) => api.post("/auth/register", data),

	// Ambil profil user yang sedang login
	getMe: () => api.get("/auth/me"),
};

// ─────────────────────────────────────────────────────────────
// KANDIDAT
// ─────────────────────────────────────────────────────────────

export const kandidatService = {
	// Ambil semua kandidat, opsional filter per kategori
	getAll: (kategori) =>
		api.get("/kandidat", { params: kategori ? { kategori } : {} }),

	// Ambil satu kandidat by ID
	getById: (id) => api.get(`/kandidat/${id}`),

	// [Admin] Tambah kandidat baru
	create: (data) => api.post("/kandidat", data),

	// [Admin] Update kandidat
	update: (id, data) => api.put(`/kandidat/${id}`, data),

	// [Admin] Hapus kandidat
	delete: (id) => api.delete(`/kandidat/${id}`),
};

// ─────────────────────────────────────────────────────────────
// SUARA
// ─────────────────────────────────────────────────────────────

export const suaraService = {
	// Kirim suara (warga terverifikasi)
	kirim: (kandidatId, kategori) => api.post("/suara", { kandidatId, kategori }),

	// Hasil suara per kategori (public)
	getHasil: (kategori) =>
		api.get("/suara/hasil", { params: kategori ? { kategori } : {} }),

	// Statistik partisipasi (public)
	getPartisipasi: () => api.get("/suara/partisipasi"),

	// Status voting warga yang login
	getStatus: () => api.get("/suara/status"),
};

// ─────────────────────────────────────────────────────────────
// WARGA (admin only)
// ─────────────────────────────────────────────────────────────

export const wargaService = {
	// Ambil semua warga, opsional filter status/rt
	getAll: (params) => api.get("/warga", { params }),

	// Ambil satu warga by UID
	getById: (uid) => api.get(`/warga/${uid}`),

	// Verifikasi warga
	verify: (uid) => api.patch(`/warga/${uid}/verify`),

	// Tolak warga
	reject: (uid, alasan) => api.patch(`/warga/${uid}/reject`, { alasan }),
};
