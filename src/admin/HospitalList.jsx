import { useEffect, useState } from "react";
import { HospitalsAPI } from "../lib/apiClient";

export default function HospitalList({ token }) {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    HospitalsAPI.list(token).then(setHospitals);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Hôpitaux</h1>

      <table className="w-full bg-white rounded-lg shadow-sm">
  <thead className="bg-gray-100 text-gray-700 text-sm">
    <tr>
      <th className="p-3 text-left">Nom</th>
      <th className="p-3 text-left">Ville</th>
    </tr>
  </thead>
  <tbody>
    {hospitals.map(h => (
      <tr key={h.id} className="border-t hover:bg-gray-50">
        <td className="p-3">{h.name}</td>
        <td className="p-3">{h.city}</td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
}
