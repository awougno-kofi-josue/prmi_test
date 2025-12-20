import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../lib/apiClient";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // <--- ajouté

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);      // <--- commencer le chargement
    setError("");

    try {
      const res = await login(username, password);
      localStorage.setItem("token", res.access_token);
      console.log("Token stocké dans le localStorage :", res.access_token);
      navigate("/admin");
    } catch (err) {
      setError("Identifiants incorrects");
    } finally {
      setLoading(false);    // <--- fin du chargement
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow w-96">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Connexion Admin
        </h2>

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 rounded mb-3"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}  // optionnel : bloque le bouton pendant la connexion
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? "Connexion..." : "Connecter"}
        </button>
      </div>
    </div>
  );
}
