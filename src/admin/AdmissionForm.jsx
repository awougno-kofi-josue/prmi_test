import { useState } from "react";

export default function AdmissionForm({ token, onCreated }) {
  const [patientId, setPatientId] = useState("");
  const [bedId, setBedId] = useState("");

  const submit = async () => {
    if (!patientId || !bedId) return;

    await fetch(
      "https://hospital-bed-management-ec42.onrender.com/api/v1/admissions/",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patient_id: patientId,
          bed_id: bedId,
        }),
      }
    );

    setPatientId("");
    setBedId("");
    onCreated();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h3 className="font-semibold mb-3">Admettre un patient</h3>

      <input
        className="border p-2 rounded w-full mb-2"
        placeholder="ID Patient"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
      />

      <input
        className="border p-2 rounded w-full mb-3"
        placeholder="ID Lit"
        value={bedId}
        onChange={(e) => setBedId(e.target.value)}
      />

      <button
        onClick={submit}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Admettre
      </button>
    </div>
  );
}
