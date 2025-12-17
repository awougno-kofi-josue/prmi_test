import { useState } from "react";
import { Outlet } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

export default function AdminApp() {
  const [token, setToken] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  if (!token) {
    return showRegister ? (
      <Register onRegistered={() => setShowRegister(false)} />
    ) : (
      <div>
        <Login onLogin={setToken} />
        <div className="text-center mt-4">
          <button
            onClick={() => setShowRegister(true)}
            className="text-green-600 hover:text-green-700"
          >
            Créer un utilisateur
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Panel</h2>
      <Outlet context={{ token }} />
    </div>
  );
}
