import { useState } from "react";
import { BedsAPI } from "../lib/apiClient";

export default function BedForm({ token, onCreated }) {
  const [hospitalId, setHospitalId] = useState("");
  const [serviceId, setServiceId] = useState("");

  const submit = async () => {
    if (!hospitalId || !serviceId) return;

    await BedsAPI.create(
      { hospital_id: hospitalId, service_id: serviceId },
      token
    );

    setHospitalId("");
    setServiceId("");
    onCreated();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-5">
      <h3 className="font-semibold mb-3">Ajouter un lit</h3>

      <input
        className="border p-2 rounded w-full mb-2"
        placeholder="ID Hôpital"
        value={hospitalId}
        onChange={(e) => setHospitalId(e.target.value)}
      />

      <input
        className="border p-2 rounded w-full mb-3"
        placeholder="ID Service"
        value={serviceId}
        onChange={(e) => setServiceId(e.target.value)}
      />

      <button
        onClick={submit}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Enregistrer
      </button>
    </div>
  );
}
