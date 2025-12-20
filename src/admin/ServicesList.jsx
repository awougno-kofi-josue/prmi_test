import { useEffect, useState } from "react";
import { ServicesAPI } from "../lib/apiClient";
import AdmissionForm from "./AdmissionForm";

export default function ServicesList() {
  const [services, setServices] = useState([]);

  const loadServices = async () => {
    try {
      const data = await ServicesAPI.list();
      setServices(data);
    } catch (e) {
      console.error("Erreur services :", e.message);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {services.map((s) => (
        <div key={s.id} className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold">{s.nom}</h3>
          <p className="text-sm text-gray-500">
            Lits disponibles : {s.available_beds}/{s.total_beds}
          </p>

          {s.available_beds > 0 && (
            <AdmissionForm serviceId={s.id} onSuccess={loadServices} />
          )}
        </div>
      ))}
    </div>
  );
}
