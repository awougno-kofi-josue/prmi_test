import { useEffect, useState } from "react";
import BedForm from "./BedForm";
import BedStatusButton from "./BedStatuBouton";

export default function BedPage({ token }) {
  const [beds, setBeds] = useState([]);

  const load = async () => {
    const res = await fetch(
      "https://hospital-bed-management-ec42.onrender.com/api/v1/api/v1/lits/api/v1/lits/1/status",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setBeds(await res.json());
  };

  useEffect(load, []);

  return (
    <>
      <BedForm token={token} onCreated={load} />

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Statut</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {beds.map(b => (
            <tr key={b.id} className="border-t text-center">
              <td className="p-3">{b.id}</td>
              <td className="p-3">{b.status}</td>
              <td className="p-3">
                <BedStatusButton
                  bed={b}
                  token={token}
                  onUpdated={load}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
