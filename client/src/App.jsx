import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoaderOverlay from "./components/LoaderOverlay";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
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

// Halaman yang butuh login dibungkus ProtectedRoute
// Tambahkan requiredRole="admin" untuk halaman khusus panitia
const PROTECTED = [
	{ path: "/dashboard", element: <DashboardPage /> },
	{ path: "/hasil", element: <HasilSuara /> },
	{ path: "/profil", element: <ProfilKandidat /> },
	{ path: "/jadwal", element: <ComingSoon page="Jadwal Pemilihan" /> },
	{ path: "/keamanan", element: <ComingSoon page="Info Keamanan" /> },
];

export default function App() {
	return (
		<>
			<LoaderOverlay />
			<BrowserRouter>
				<Routes>
					{/* Public routes */}
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />

					{/* Default redirect */}
					<Route path="/" element={<Navigate to="/dashboard" replace />} />

					{/* Protected routes */}
					{PROTECTED.map(({ path, element }) => (
						<Route
							key={path}
							path={path}
							element={<ProtectedRoute>{element}</ProtectedRoute>}
						/>
					))}

					{/* 404 fallback */}
					<Route path="*" element={<Navigate to="/dashboard" replace />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}
