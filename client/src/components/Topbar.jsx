import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconRefresh } from "./icons/Icons";

export default function Topbar({ clock, onMenuToggle }) {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem("auth"));
		setUser(data);
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("auth");
		setUser(null);
		navigate("/login");
	};

	return (
		<header className="flex items-center justify-between bg-white/92 backdrop-blur-[12px] border-b border-slate-200 px-4 md:px-7 h-[58px] sticky top-0 z-[9]">
			{/* LEFT */}
			<div className="flex items-center gap-3">
				<button onClick={onMenuToggle} className="md:hidden w-8 h-8">
					☰
				</button>
				<span className="text-[13px] font-bold text-slate-900 hidden sm:block">
					Pantau Pemilihan RW 05
				</span>
			</div>

			{/* RIGHT */}
			<div className="flex items-center gap-3">
				{/* Clock */}
				<div className="font-mono text-[12px] text-[#1558B0] bg-blue-ll px-3 py-[5px] rounded-full">
					{clock}
				</div>

				{/* AUTH BUTTON */}
				{user ? (
					<div className="flex items-center gap-2">
						<span className="text-[12px] font-semibold text-slate-700">
							{user.name} ({user.role})
						</span>
						<button
							onClick={handleLogout}
							className="text-[11px] text-red-500 hover:underline"
						>
							Logout
						</button>
					</div>
				) : (
					<button
						onClick={() => navigate("/login")}
						className="text-[12px] bg-[#1558B0] text-white px-3 py-1.5 rounded-md"
					>
						Login
					</button>
				)}
			</div>
		</header>
	);
}
