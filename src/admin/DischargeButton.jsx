import { useState } from "react";
import { AdmissionsAPI } from "../lib/apiClient";

export default function DischargeButton({ admissionId, onDone }) {
  const [loading, setLoading] = useState(false);

  const discharge = async () => {
    try {
      setLoading(true);
      await AdmissionsAPI.discharge(admissionId);
      onDone(); // recharge admissions
    } catch (e) {
      console.error("Erreur discharge :", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={discharge}
      disabled={loading}
      className="bg-red-600 text-white px-3 py-1 rounded disabled:opacity-50"
    >
      {loading ? "..." : "Sortie"}
    </button>
  );
}
