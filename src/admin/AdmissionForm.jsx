import { useState, useEffect } from "react";
import { AdmissionsAPI, ServicesAPI } from "../lib/apiClient";

export default function AdmissionForm({ serviceId, onSuccess }) {
  const [nomPatient, setNomPatient] = useState("");
  const [motif, setMotif] = useState("");
  const [litsLibres, setLitsLibres] = useState([]);
  const [selectedLit, setSelectedLit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Charge les lits libres du service
  const loadLits = async () => {
    try {
      const services = await ServicesAPI.list();
      const service = services.find((s) => s.id === serviceId);
      if (!service) return;

      // Exemple : générer un tableau de lits libres
      const libres = [];
      for (let i = 1; i <= service.lits_disponibles; i++) {
        libres.push(i); // si ton API a un champ id pour lit, utiliser celui-là
      }
      setLitsLibres(libres);
      setSelectedLit(libres[0] || null);
    } catch (e) {
      console.error("Erreur chargement lits :", e.message);
    }
  };

  useEffect(() => {
    loadLits();
  }, [serviceId]);

  const submit = async () => {
    if (!nomPatient.trim() || !motif.trim() || !selectedLit) return;

    try {
      setLoading(true);
      setError(null);

      await AdmissionsAPI.create({
        nom_patient: nomPatient,
        service_id: serviceId,
        motif_admission: motif,
        patient_id: 0, // si le patient n'existe pas encore, sinon mettre l'ID réel
        lit_id: selectedLit,
      });

      setNomPatient("");
      setMotif("");
      onSuccess(); // recharge services/lits
    } catch (e) {
      setError("Impossible d’admettre (champs manquants ou plus de lits).");
      console.error("Erreur admission :", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2 mt-2 border-t pt-2">
      <input
        value={nomPatient}
        onChange={(e) => setNomPatient(e.target.value)}
        placeholder="Nom du patient"
        className="w-full border rounded-lg px-3 py-2"
      />

      <input
        value={motif}
        onChange={(e) => setMotif(e.target.value)}
        placeholder="Motif d'admission"
        className="w-full border rounded-lg px-3 py-2"
      />

      {litsLibres.length > 0 && (
        <select
          value={selectedLit}
          onChange={(e) => setSelectedLit(Number(e.target.value))}
          className="w-full border rounded-lg px-3 py-2"
        >
          {litsLibres.map((lit) => (
            <option key={lit} value={lit}>
              Lit #{lit}
            </option>
          ))}
        </select>
      )}

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        onClick={submit}
        disabled={loading || litsLibres.length === 0}
        className="w-full bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50"
      >
        {loading ? "Admission..." : "Admettre"}
      </button>
    </div>
  );
}
