import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHospital, FaBed, FaUserInjured } from "react-icons/fa";
import { StatsAPI } from "../lib/apiClient";

export default function StatsDashboard() {
  const [stats, setStats] = useState({
    availableBeds: 0,
    admittedPatients: 0,
    hospitals: 0,
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadStats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token manquant");
     
      const data = await StatsAPI.dashboard(token); // peut renvoyer string ou JSON
      // si data est string, on met 0 par défaut
      const parsed = typeof data === "string" ? {
        availableBeds: 0,
        admittedPatients: 0,
        hospitals: 0,
      } : data;

      setStats(parsed);
      setError(null);
    } catch (err) {
      console.error(err);
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
    { label: "Lits disponibles", key: "availableBeds", icon: <FaBed /> },
    { label: "Patients admis", key: "admittedPatients", icon: <FaUserInjured /> },
    { label: "Hôpitaux", key: "hospitals", icon: <FaHospital /> },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((item) => (
        <div
          key={item.key}
          className="bg-white p-6 rounded-xl shadow-md flex flex-col items-start hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center gap-3 mb-2 text-gray-500">
            <div className="text-2xl">{item.icon}</div>
            <span className="font-semibold">{item.label}</span>
          </div>
          <div className="text-3xl font-bold text-gray-800">
            {loading ? "..." : stats[item.key] ?? 0}
          </div>
        </div>
      ))}
      {error && (
        <p className="col-span-full text-red-600 font-medium bg-red-50 p-4 rounded-xl">
          {error}
        </p>
      )}
    </div>
  );
}
