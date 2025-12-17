import { useEffect, useState } from "react";
import { StatsAPI } from "../lib/apiClient";

export default function StatsDashboard({ token }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    StatsAPI.dashboard(token).then(setStats);
  }, []);

  if (!stats) return <p>Chargement...</p>;

  return (
    <div className="grid grid-cols-3 gap-4">
  <div className="bg-white p-5 rounded-xl shadow">
    <p className="text-gray-500 text-sm">Lits disponibles</p>
    <p className="text-3xl font-bold text-green-700">{stats.available_beds}</p>
  </div>

  <div className="bg-white p-5 rounded-xl shadow">
    <p className="text-gray-500 text-sm">Patients admis</p>
    <p className="text-3xl font-bold text-gray-800">{stats.admitted_patients}</p>
  </div>

  <div className="bg-white p-5 rounded-xl shadow">
    <p className="text-gray-500 text-sm">Hôpitaux</p>
    <p className="text-3xl font-bold text-gray-800">{stats.hospitals}</p>
  </div>
</div>
  );
}
