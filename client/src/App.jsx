// App.jsx — mirip struktur yang Anda tunjukkan
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout        from './components/Layout';   // Sidebar + wrapper
import DashboardPage from './pages/DashboardPage';
import HasilSuara    from './pages/HasilSuara';
import ProfilKandidat from './pages/ProfilKandidat';
import LoaderOverlay from './components/LoaderOverlay';

function ComingSoon({ page }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-400">
      <p className="text-sm font-semibold text-slate-700">Halaman {page}</p>
      <p className="text-xs text-slate-400">Sedang dalam pengembangan...</p>
    </div>
  );
}

const ROUTES = [
  { path: '/',        element: <Navigate to="/dashboard" replace /> },
  { path: '/dashboard', element: <DashboardPage /> },
  { path: '/hasil',     element: <HasilSuara />    },
  { path: '/profil',    element: <ProfilKandidat /> },
  { path: '/jadwal',    element: <ComingSoon page="Jadwal Pemilihan" /> },
  { path: '/keamanan',  element: <ComingSoon page="Info Keamanan" />   },
];

export default function App() {
  return (
    <>
      <LoaderOverlay />          {/* overlay fixed, di atas segalanya */}
      <BrowserRouter>
        <Routes>
          {ROUTES.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}