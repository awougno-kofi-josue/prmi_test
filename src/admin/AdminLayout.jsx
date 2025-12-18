import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-green-300 font-semibold"
      : "hover:text-green-300";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Topbar */}
      <header className="bg-green-800 text-white shadow">
        <div className="flex items-center justify-between h-16 px-6">

          {/* Logo */}
          <h1 className="text-lg font-bold">
            Admin PRMI
          </h1>

          {/* Menu desktop */}
          <nav className="hidden md:flex gap-6 text-sm">
            <NavLink to="/admin" end className={linkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/admin/hospitals" className={linkClass}>
              Hôpitaux
            </NavLink>
            {/* <NavLink to="/admin/lits" className={linkClass}>
              Lits
            </NavLink> */}
            <NavLink to="/admin/stats" className={linkClass}>
              Statistiques
            </NavLink>
          </nav>

          {/* Burger mobile */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>

        {/* Menu mobile */}
        {open && (
          <nav className="md:hidden bg-green-900 px-6 py-4 flex flex-col gap-4 text-sm">
            <NavLink onClick={() => setOpen(false)} to="/admin" end className={linkClass}>
              Dashboard
            </NavLink>
            <NavLink onClick={() => setOpen(false)} to="/admin/hospitals" className={linkClass}>
              Hôpitaux
            </NavLink>
            <NavLink onClick={() => setOpen(false)} to="/admin/lits" className={linkClass}>
              Lits
            </NavLink>
            <NavLink onClick={() => setOpen(false)} to="/admin/stats" className={linkClass}>
              Statistiques
            </NavLink>
          </nav>
        )}
      </header>

      {/* Contenu */}
      <main className="flex-1 p-6 text-gray-800">
        <Outlet />
      </main>

      <button
      onClick={() => {
        localStorage.removeItem("token");
        window.location.href = "/admin/login";
      }}
      className="text-sm text-red-200 hover:text-red-400 mt-8"
    >
      Déconnexion
</button>

    </div>
  );
}
