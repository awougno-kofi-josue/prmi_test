export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-green-800 text-white p-5">
        <h2 className="text-xl font-bold mb-8">Admin PRMI</h2>

        <nav className="flex flex-col gap-4 text-sm">
          <a className="hover:text-green-300" href="/admin">Dashboard</a>
          <a className="hover:text-green-300" href="/admin/hospitals">Hôpitaux</a>
          <a className="hover:text-green-300" href="/admin/services">Services</a>
          <a className="hover:text-green-300" href="/admin/lits">Lits</a>
          <a className="hover:text-green-300" href="/admin/stats">Statistiques</a>
        </nav>
      </aside>

      <main className="flex-1 p-6 text-gray-800">
        {children}
      </main>
    </div>
  );
}
