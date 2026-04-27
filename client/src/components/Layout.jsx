import Sidebar from "./Sidebar";


export default function Layout({ children }) {
  return (
    <div className="relative grid min-h-screen z-[1]" style={{ gridTemplateColumns: '228px 1fr' }}>
      <Sidebar />
      <div className="flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
}