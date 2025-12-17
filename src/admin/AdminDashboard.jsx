export default function AdminDashboard({ token }) {
  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold mb-4">
        Dashboard Admin
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          Gestion des lits
        </div>
        <div className="bg-white p-4 rounded shadow">
          Gestion des patients
        </div>
        <div className="bg-white p-4 rounded shadow">
          Statistiques
        </div>
      </div>
    </div>
  );
}
