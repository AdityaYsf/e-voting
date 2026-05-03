import { useState, useEffect, useCallback, useRef } from "react";
import { suaraService } from "../services/apiService.js";

/**
 * useHasilSuara
 * Ambil hasil suara per kategori. Auto-refresh setiap 30 detik.
 *
 * Contoh pakai:
 *   const { hasil, loading } = useHasilSuara('rw');
 */
export function useHasilSuara(kategori = null) {
	const [hasil, setHasil] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const intervalRef = useRef(null);

	const fetchHasil = useCallback(
		async (silent = false) => {
			if (!silent) setLoading(true);
			setError("");
			try {
				const { data } = await suaraService.getHasil(kategori);
				setHasil(data);
			} catch (err) {
				setError(err.response?.data?.error || "Gagal memuat hasil suara.");
			} finally {
				if (!silent) setLoading(false);
			}
		},
		[kategori],
	);

	useEffect(() => {
		fetchHasil();

		// Auto-refresh setiap 30 detik (silent — tidak munculkan loading)
		intervalRef.current = setInterval(() => fetchHasil(true), 30_000);
		return () => clearInterval(intervalRef.current);
	}, [fetchHasil]);

	return { hasil, loading, error, refetch: fetchHasil };
}

/**
 * usePartisipasi
 * Statistik partisipasi warga. Auto-refresh tiap 30 detik.
 *
 * Hasil:
 *   { dpt, totalVerified, sudahVoting, belumVoting, pct }
 */
export function usePartisipasi() {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const intervalRef = useRef(null);

	const fetchData = useCallback(async (silent = false) => {
		if (!silent) setLoading(true);
		try {
			const res = await suaraService.getPartisipasi();
			setData(res.data);
		} catch (err) {
			setError(err.response?.data?.error || "Gagal memuat data partisipasi.");
		} finally {
			if (!silent) setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchData();
		intervalRef.current = setInterval(() => fetchData(true), 30_000);
		return () => clearInterval(intervalRef.current);
	}, [fetchData]);

	return { data, loading, error, refetch: fetchData };
}

/**
 * useVoting
 * Kirim suara dan cek status voting warga.
 *
 * Contoh pakai:
 *   const { kirimSuara, statusVoting, loading, error, success } = useVoting();
 *   await kirimSuara('kandidat-id', 'rw');
 */
export function useVoting() {
	const [statusVoting, setStatusVoting] = useState(null);
	const [loading, setLoading] = useState(false);
	const [loadingStatus, setLoadingStatus] = useState(true);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	// Ambil status voting saat hook pertama dipakai
	useEffect(() => {
		suaraService
			.getStatus()
			.then((res) => setStatusVoting(res.data))
			.catch(() => {}) // warga belum login → abaikan
			.finally(() => setLoadingStatus(false));
	}, []);

	const kirimSuara = async (kandidatId, kategori) => {
		setError("");
		setSuccess("");
		setLoading(true);
		try {
			const { data } = await suaraService.kirim(kandidatId, kategori);
			setSuccess(data.message);

			// Update status lokal tanpa perlu refetch
			setStatusVoting((prev) => ({
				...prev,
				sudahVotingKategori: {
					...(prev?.sudahVotingKategori || {}),
					[kategori]: true,
				},
			}));
			return true;
		} catch (err) {
			setError(err.response?.data?.error || "Gagal mengirim suara.");
			return false;
		} finally {
			setLoading(false);
		}
	};

	// Helper — cek apakah sudah voting di kategori tertentu
	const sudahVotingDi = (kategori) =>
		!!statusVoting?.sudahVotingKategori?.[kategori];

	const selesaiSemua = statusVoting?.selesai || false;

	return {
		kirimSuara,
		statusVoting,
		sudahVotingDi,
		selesaiSemua,
		loading,
		loadingStatus,
		error,
		success,
		setError,
		setSuccess,
	};
}
