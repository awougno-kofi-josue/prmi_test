import { useEffect, useState } from "react";
import { HospitalsAPI } from "../lib/apiClient";
import HospitalForm from "./HospitalForm";

export default function HospitalPage({ token }) {
  const [hospitals, setHospitals] = useState([]);

  const load = () => {
    HospitalsAPI.list(token).then(setHospitals);
  };

  useEffect(load, []);

  return (
    <>
      <HospitalForm token={token} onCreated={load} />

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Nom</th>
            <th className="p-3 text-left">Ville</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map(h => (
            <tr key={h.id} className="border-t">
              <td className="p-3">{h.name}</td>
              <td className="p-3">{h.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
