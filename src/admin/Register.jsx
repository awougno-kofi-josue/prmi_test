import { useState } from "react";

export default function Register({ token, onRegistered }) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [telephone, setTelephone] = useState("");
  const [hospitalId, setHospitalId] = useState(0);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!nom || !prenom || !email || !password) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(
        "https://hospital-bed-management-ec42.onrender.com/api/v1/api/v1/users/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // token admin requis
          },
          body: JSON.stringify({
            nom,
            prenom,
            email,
            role,
            telephone,
            hospital_id: Number(hospitalId),
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error("Erreur API :", data);
        alert(
          "Erreur lors de l'enregistrement : " +
            (data.detail ? JSON.stringify(data.detail) : res.statusText)
        );
        setIsLoading(false);
        return;
      }

      console.log("Utilisateur créé :", data);
      alert("Utilisateur créé avec succès !");
      // reset formulaire
      setNom("");
      setPrenom("");
      setEmail("");
      setTelephone("");
      setHospitalId(0);
      setPassword("");
      if (onRegistered) onRegistered();
    } catch (err) {
      console.error("Erreur réseau :", err);
      alert("Erreur réseau : " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Créer un utilisateur</h2>

      <input
        type="text"
        placeholder="Nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />
      <input
        type="text"
        placeholder="Prénom"
        value={prenom}
        onChange={(e) => setPrenom(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />
      <input
        type="text"
        placeholder="Téléphone"
        value={telephone}
        onChange={(e) => setTelephone(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />
      <input
        type="number"
        placeholder="Hospital ID"
        value={hospitalId}
        onChange={(e) => setHospitalId(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>

      <button
        onClick={handleRegister}
        disabled={isLoading}
        className={`w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? "Enregistrement..." : "Enregistrer"}
      </button>
    </div>
  );
}
