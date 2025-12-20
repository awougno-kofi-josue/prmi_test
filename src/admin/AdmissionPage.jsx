import { useEffect, useState } from "react";
import { ServicesAPI } from "../lib/apiClient";
import AdmissionForm from "./AdmissionForm";

export default function AdmissionPage() {
  const [services, setServices] = useState([]);

  // Charge la liste des services
  const loadServices = async () => {
    try {
      const data = await ServicesAPI.list();
      setServices(data); // data est un tableau de services
    } catch (e) {
      console.error("Erreur services :", e.message);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-xl font-bold">Gestion des admissions</h2>

      <div className="grid md:grid-cols-3 gap-4">
        {services.map((s) => (
          <div key={s.id} className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold">{s.nom_service}</h3>
            <p className="text-sm text-gray-500">
              Lits disponibles : {s.lits_disponibles}/{s.capacite_totale}
            </p>

            {s.lits_disponibles <= 0 && (
            <AdmissionForm serviceId={s.id} onSuccess={loadServices} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
