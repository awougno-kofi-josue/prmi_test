import { useState, useEffect } from "react";

export default function CreateServiceForm() {
  const [form, setForm] = useState({
    nom_service: "",
    capacite_totale: "",
    specialite: "",
    hospital_id: ""
  });
  const [hospitals, setHospitals] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token"); // si tu utilises un token

  useEffect(() => {
    async function fetchHospitals() {
      try {
        const res = await fetch("https://hospital-bed-management-ec42.onrender.com/api/v1/api/v1/hospitals/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Impossible de récupérer les hôpitaux");

        const data = await res.json();
        setHospitals(data);
      } catch (err) {
        console.error(err);
        setMessage("Erreur lors du chargement des hôpitaux");
      }
    }

    fetchHospitals();
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Création en cours...");

    try {
      const res = await fetch("https://hospital-bed-management-ec42.onrender.com/api/v1/api/v1/services/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nom_service: form.nom_service,
          capacite_totale: parseInt(form.capacite_totale),
          specialite: form.specialite,
          hospital_id: parseInt(form.hospital_id)
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(JSON.stringify(errData));
      }

      const data = await res.json();
      setMessage(`Service créé avec succès ! ID: ${data.id}`);
      setForm({ nom_service: "", capacite_totale: "", specialite: "", hospital_id: "" });
    } catch (err) {
      console.error(err);
      setMessage(`Erreur: ${err.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Créer un Service</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="nom_service"
          value={form.nom_service}
          onChange={handleChange}
          placeholder="Nom du service"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="capacite_totale"
          value={form.capacite_totale}
          onChange={handleChange}
          placeholder="Capacité totale"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="specialite"
          value={form.specialite}
          onChange={handleChange}
          placeholder="Spécialité"
          className="w-full p-2 border rounded"
          required
        />

        <select
          name="hospital_id"
          value={form.hospital_id}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Sélectionnez un hôpital</option>
          {hospitals.map((h) => (
            <option key={h.id} value={h.id}>
              {h.nom}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Créer Service
        </button>
      </form>

      {message && <p className="mt-3 text-center text-gray-700">{message}</p>}
    </div>
  );
}
