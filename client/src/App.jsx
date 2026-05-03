import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Firebase init — import sekali di sini agar aktif saat app load
import "./config/firebase.js";

import { AuthProvider } from "./context/AuthContext.jsx";
import LoaderOverlay from "./components/LoaderOverlay";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import HasilSuara from "./pages/HasilSuara";
import ProfilKandidat from "./pages/ProfilKandidat";

function ComingSoon({ page }) {
	return (
		<div className="flex flex-col items-center justify-center h-full gap-3 text-slate-400">
			<p className="text-sm font-semibold text-slate-700">Halaman {page}</p>
			<p className="text-xs text-slate-400">Sedang dalam pengembangan...</p>
		</div>
	);
}

const PROTECTED = [
	{ path: "/dashboard", element: <DashboardPage /> },
	{ path: "/hasil", element: <HasilSuara /> },
	{ path: "/profil", element: <ProfilKandidat /> },
	{ path: "/jadwal", element: <ComingSoon page="Jadwal Pemilihan" /> },
	{ path: "/keamanan", element: <ComingSoon page="Info Keamanan" /> },
];

export default function App() {
	return (
		<AuthProvider>
			<>
				<LoaderOverlay />
				<BrowserRouter>
					<Routes>
						{/* Public routes */}
						<Route path="/" element={<LandingPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/register" element={<RegisterPage />} />

						{/* Protected routes */}
						{PROTECTED.map(({ path, element }) => (
							<Route
								key={path}
								path={path}
								element={<ProtectedRoute>{element}</ProtectedRoute>}
							/>
						))}

						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</BrowserRouter>
			</>
		</AuthProvider>
	);
}
