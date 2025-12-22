import React, { useEffect, useState } from "react";
import { FaHospital, FaBed, FaUserInjured } from "react-icons/fa";
import { StatsAPI, HospitalsAPI } from "../lib/apiClient";

export default function StatsDashboard() {
  const [stats, setStats] = useState(null);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) throw new Error("Non authentifié");

      const data = await StatsAPI.dashboard(token);
      const data1=await HospitalsAPI.list();

      const count=data1.length;
      setCount(count);
      setStats(data);
      
      
    } catch (err) {
      console.error("Erreur stats :", err);
      setError("Impossible de charger les statistiques");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
    const interval = setInterval(loadStats, 15000);
    return () => clearInterval(interval);
  }, []);

  const items = [
    {
      label: "Lits disponibles",
      value: stats?.lits_disponibles ?? 0,
      icon: <FaBed className="text-blue-600" />,
    },
    {
      label: "Patients admis",
      value: stats?.patients_admis ?? 0,
      icon: <FaUserInjured className="text-red-600" />,
    },
    {
      label: "Hôpitaux",
      value: count ?? 0,
      icon: <FaHospital className="text-green-600" />,
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">
        Tableau de bord – Statistiques
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl shadow flex items-center gap-4 hover:shadow-lg transition"
          >
            <div className="text-3xl">{item.icon}</div>

            <div>
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="text-3xl font-bold text-gray-800">
                {loading ? "…" : item.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl font-medium">
          {error}
        </div>
      )}
    </div>
  );
}
