import React, { useEffect, useState } from "react";

export default function Dashboard({ token }) {
  const [stats, setStats] = useState({
    totalHospitals: 0,
    totalBeds: 0,
    availableBeds: 0,
    occupiedBeds: 0,
    totalAdmissions: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(
          "https://hospital-bed-management-ec42.onrender.com/api/v1/stats/dashboard",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();

        // On suppose que l'API renvoie un objet avec les stats
        setStats({
          totalHospitals: data.total_hospitals || 0,
          totalBeds: data.total_beds || 0,
          availableBeds: data.available_beds || 0,
          occupiedBeds: data.occupied_beds || 0,
          totalAdmissions: data.total_admissions || 0,
        });
      } catch (err) {
        console.error("Erreur récupération stats:", err);
      }
    }

    fetchStats();
  }, [token]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Dashboard Admin
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Hôpitaux */}
        <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
          <div className="text-gray-500 mb-2">Hôpitaux</div>
          <div className="text-3xl font-bold text-green-600">
            {stats.totalHospitals}
          </div>
        </div>

        {/* Lits disponibles */}
        <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
          <div className="text-gray-500 mb-2">Lits disponibles</div>
          <div className="text-3xl font-bold text-green-600">
            {stats.availableBeds}
          </div>
        </div>

        {/* Lits occupés */}
        <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
          <div className="text-gray-500 mb-2">Lits occupés</div>
          <div className="text-3xl font-bold text-gray-700">
            {stats.occupiedBeds}
          </div>
        </div>

        {/* Total lits */}
        <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
          <div className="text-gray-500 mb-2">Total lits</div>
          <div className="text-3xl font-bold text-gray-700">
            {stats.totalBeds}
          </div>
        </div>

        {/* Admissions */}
        <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center md:col-span-2">
          <div className="text-gray-500 mb-2">Total admissions</div>
          <div className="text-3xl font-bold text-green-600">
            {stats.totalAdmissions}
          </div>
        </div>
      </div>
    </div>
  );
}