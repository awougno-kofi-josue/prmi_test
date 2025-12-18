import { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (!username || !password) return;

    try {
      const formData = new URLSearchParams();
      formData.append("grant_type", "password");
      formData.append("username", username);
      formData.append("password", password);

      const res = await fetch(
        "https://hospital-bed-management-ec42.onrender.com/api/v1/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData,
        }
      );

      const data = await res.json();

      if (data.access_token) {
        onLogin(data.access_token);
      } else {
        alert("Erreur login");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-sm mx-auto mt-20">
      <h3 className="font-semibold mb-4 text-gray-800 text-center">Login Admin</h3>
      <input
        className="border p-2 rounded w-full mb-2"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="border p-2 rounded w-full mb-3"
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={login}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
      >
        Se connecter
      </button>
      {/* S'enregistrer */}
      <div className="mt-4 text-center text-sm text-gray-500">
        Pas encore de compte ? Contactez l'administrateur.
      </div>
    </div>
  );
}
