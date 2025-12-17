import { useEffect, useState } from "react";
import AdmissionForm from "./AdmissionForm";
import DischargeButton from "./DischargeButton";

export default function AdmissionPage({ token }) {
  const [admissions, setAdmissions] = useState([]);

  const load = async () => {
    const res = await fetch(
      "https://hospital-bed-management-ec42.onrender.com/api/v1/admissions/",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setAdmissions(await res.json());
  };

  useEffect(load, []);

  return (
    <>
      <AdmissionForm token={token} onCreated={load} />

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Patient</th>
            <th className="p-3">Lit</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {admissions.map(a => (
            <tr key={a.id} className="border-t text-center">
              <td className="p-3">{a.patient_id}</td>
              <td className="p-3">{a.bed_id}</td>
              <td className="p-3">
                {!a.discharge_date && (
                  <DischargeButton
                    admissionId={a.id}
                    token={token}
                    onDone={load}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
