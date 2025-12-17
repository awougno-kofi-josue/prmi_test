import { useState } from "react";

export default function UserForm({ token, onCreated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    if (!username || !password) return;

    try {
      const res = await fetch(
        "https://hospital-bed-management-ec42.onrender.com/api/v1/api/v1/users/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      if (!res.ok) throw new Error("Erreur création utilisateur");

      setUsername("");
      setPassword("");
      onCreated();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h3 className="font-semibold mb-3 text-gray-800">Créer un utilisateur</h3>
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
        onClick={submit}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Créer
      </button>
    </div>
  );
}
