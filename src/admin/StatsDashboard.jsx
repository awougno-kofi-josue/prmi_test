import { useEffect, useState } from "react";
import { StatsAPI } from "../lib/apiClient";

export default function StatsDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  async function loadStats() {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token manquant");

      const data = await StatsAPI.dashboard(token);
      setStats(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les statistiques");
    }
  }

  useEffect(() => {
    loadStats();

    const interval = setInterval(loadStats, 15000); // 15s

    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <p className="text-red-600 font-medium bg-red-50 p-4 rounded-xl">
        {error}
      </p>
    );
  }

  if (!stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-xl shadow animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
            <div className="h-8 bg-gray-300 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard
        label="Lits disponibles"
        value={stats.available_beds}
        color="text-green-700"
      />
      <StatCard
        label="Patients admis"
        value={stats.admitted_patients}
        color="text-gray-800"
      />
      <StatCard
        label="Hôpitaux"
        value={stats.hospitals}
        color="text-gray-800"
      />
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow transition hover:scale-[1.02]">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
