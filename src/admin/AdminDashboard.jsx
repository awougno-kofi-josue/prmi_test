import { useState } from "react";

export default function AdminDashboard() {
  const [simulationCount, setSimulationCount] = useState(0);

  const handleSimulation = () => {
    setSimulationCount(simulationCount + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard Admin</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <button className="bg-blue-500 text-white p-6 rounded-xl shadow-lg transition-transform hover:scale-105 hover:bg-blue-600">
          Gestion des lits
        </button>
        <button className="bg-green-500 text-white p-6 rounded-xl shadow-lg transition-transform hover:scale-105 hover:bg-green-600">
          Gestion des patients
        </button>
        <button className="bg-purple-500 text-white p-6 rounded-xl shadow-lg transition-transform hover:scale-105 hover:bg-purple-600">
          Statistiques
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Simulation rapide</h2>
        <p className="text-gray-700 mb-4">Nombre de patients simulés : {simulationCount}</p>
        <button
          onClick={handleSimulation}
          className="bg-indigo-500 text-white px-6 py-3 rounded-full shadow-md transition-transform hover:scale-105 hover:bg-indigo-600"
        >
          Ajouter un patient
        </button>
      </div>
    </div>
  );
}
