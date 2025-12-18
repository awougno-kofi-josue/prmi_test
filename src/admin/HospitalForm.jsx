import { useState } from "react";
import { HospitalsAPI } from "../lib/apiClient";

export default function HospitalForm({ token, onCreated }) {
  const [form, setForm] = useState({
    nom: "",
    adresse: "",
    ville: "",
   
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!form.nom || !form.ville) {
      setError("Le nom et la ville sont obligatoires");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await HospitalsAPI.create(
        {
          ...form,
          latitude: form.latitude ? Number(form.latitude) : 0,
          longitude: form.longitude ? Number(form.longitude) : 0,
        },
        token
      );

      setForm({
        nom: "",
        adresse: "",
        ville: "",
       
      });

      setSuccess(true);
      onCreated();

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de l’enregistrement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h3 className="font-semibold mb-3">Ajouter un hôpital</h3>

      {success && (
        <div className="bg-green-100 text-green-700 p-2 rounded mb-3">
          Hôpital enregistré avec succès
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-3">
          {error}
        </div>
      )}

      <input className="input" name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} />
      <input className="input" name="adresse" placeholder="Adresse" value={form.adresse} onChange={handleChange} />
      <input className="input" name="ville" placeholder="Ville" value={form.ville} onChange={handleChange} />

      <button
        disabled={loading}
        onClick={handleSubmit}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-3 disabled:opacity-50"
      >
        {loading ? "Enregistrement..." : "Enregistrer"}
      </button>
    </div>
  );
}
