import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	getAuth,
} from "firebase/auth";
import { useAuth } from "../context/AuthContext.jsx";
import { authService } from "../services/apiService.js";

/**
 * useLogin
 * Dipakai di LoginPage.jsx
 *
 * Alur:
 * 1. Firebase Auth signIn → dapat idToken
 * 2. Simpan token ke AuthContext (dan localStorage)
 * 3. Ambil profil dari backend /api/auth/me
 */
export function useLogin() {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleLogin = async ({ email, password, role }) => {
		setError("");
		setLoading(true);
		try {
			const fbAuth = getAuth();
			const cred = await signInWithEmailAndPassword(fbAuth, email, password);
			const token = await cred.user.getIdToken();

			// Simpan token dulu agar interceptor bisa attach ke request berikutnya
			login({ token, role, uid: cred.user.uid });

			// Ambil data lengkap dari backend
			const { data } = await authService.getMe();

			// Validasi role cocok
			if (data.role !== role) {
				await signOut(fbAuth);
				login(null);
				setError(
					`Akun ini bukan akun ${role === "admin" ? "panitia" : "warga"}.`,
				);
				return;
			}

			// Update session dengan data lengkap
			login({ token, ...data });
			navigate("/dashboard");
		} catch (err) {
			const msg = firebaseErrorMsg(err.code);
			setError(msg);
		} finally {
			setLoading(false);
		}
	};

	return { handleLogin, loading, error, setError };
}

/**
 * useRegister
 * Dipakai di RegisterPage.jsx
 *
 * Alur:
 * 1. Kirim data ke backend /api/auth/register
 * 2. Backend buat Firebase Auth user + simpan ke Firestore
 * 3. Tampilkan halaman sukses
 */
export function useRegister() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	const handleRegister = async (formData) => {
		setError("");
		setLoading(true);
		try {
			await authService.register(formData);
			setSuccess(true);
		} catch (err) {
			setError(err.response?.data?.error || "Terjadi kesalahan. Coba lagi.");
		} finally {
			setLoading(false);
		}
	};

	return { handleRegister, loading, error, setError, success };
}

/**
 * useLogout
 * Bisa dipakai di mana saja (Sidebar, Topbar, dll)
 */
export function useLogout() {
	const { logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			const fbAuth = getAuth();
			await signOut(fbAuth);
		} catch {
			/* abaikan error signOut */
		}
		logout();
		navigate("/login");
	};

	return { handleLogout };
}

// ── Firebase error → pesan Indonesia ─────────────────────────
function firebaseErrorMsg(code) {
	const map = {
		"auth/invalid-credential": "Email atau password salah.",
		"auth/user-not-found": "Akun tidak ditemukan.",
		"auth/wrong-password": "Password salah.",
		"auth/too-many-requests": "Terlalu banyak percobaan. Coba lagi nanti.",
		"auth/user-disabled": "Akun Anda telah dinonaktifkan.",
		"auth/network-request-failed": "Koneksi internet bermasalah.",
	};
	return map[code] || "Login gagal. Periksa kembali data Anda.";
}
