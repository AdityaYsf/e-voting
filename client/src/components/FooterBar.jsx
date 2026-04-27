export default function FooterBar() {
  return (
    <div className="flex items-center justify-between bg-white rounded-lg shadow-card px-5 py-3 text-[11px] text-slate-400 mt-1">
      <span>Data diperbarui otomatis tiap 30 detik &nbsp;·&nbsp; Sistem berjalan normal</span>

      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-teal-l text-teal">
          <span className="w-[5px] h-[5px] rounded-full bg-teal inline-block" />
          SSL/TLS Aman
        </span>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-blue-l text-blue-d">
          <span className="w-[5px] h-[5px] rounded-full bg-[#1558B0] inline-block" />
          Server Aktif
        </span>
        <span className="text-[10px] text-slate-400 ml-1">
          © 2026 e-Platform Pemilihan Kelurahan Menteng
        </span>
      </div>
    </div>
  );
}
