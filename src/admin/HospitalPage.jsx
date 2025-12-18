import { useEffect, useState } from "react";
import { HospitalsAPI } from "../lib/apiClient";
import HospitalForm from "./HospitalForm"; // si tu as un composant form

export default function HospitalPage() {
  const [hospitals, setHospitals] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadHospitals = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token manquant, veuillez vous connecter.");

      console.log("Token utilisé :", token);

      const data = await HospitalsAPI.list(token);
      setHospitals(data);
      setLoading(false);
    } catch (err) {
      console.error("Erreur :", err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHospitals();
  }, []);

  if (error) return <div className="text-red-600">Erreur : {error}</div>;
  if (loading) return <div>Chargement...</div>;

  const token = localStorage.getItem("token"); // pour passer au formulaire

  return (
    <div className="p-6">
      <HospitalForm token={token} onCreated={loadHospitals} />

      <table className="w-full bg-white rounded shadow mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Nom</th>
            <th className="p-3 text-left">Adresse</th>
            <th className="p-3 text-left">Ville</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map(h => (
            <tr key={h.id} className="border-t">
              <td className="p-3">{h.nom}</td>
              
              <td className="p-3">{h.adresse}</td>
              <td className="p-3">{h.ville}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
