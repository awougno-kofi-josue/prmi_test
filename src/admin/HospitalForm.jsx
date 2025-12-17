import { useState } from "react";
import { HospitalsAPI } from "../lib/apiClient";

export default function HospitalForm({ token, onCreated }) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = async () => {
    if (!name || !city) return;

    await HospitalsAPI.create(
      { name, city },
      token
    );

    setName("");
    setCity("");
    onCreated();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h3 className="font-semibold mb-3">Ajouter un hôpital</h3>

      <input
        className="border p-2 rounded w-full mb-2"
        placeholder="Nom de l'hôpital"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border p-2 rounded w-full mb-3"
        placeholder="Ville"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Enregistrer
      </button>
    </div>
  );
}
