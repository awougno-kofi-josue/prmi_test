import { BedsAPI } from "../lib/apiClient";

export default function BedStatusButton({ bed, token, onUpdated }) {
  const toggle = async () => {
    const newStatus =
      bed.status === "available" ? "occupied" : "available";

    await BedsAPI.updateStatus(bed.id, newStatus, token);
    onUpdated();
  };

  return (
    <button
      onClick={toggle}
      className={`px-3 py-1 rounded text-white text-sm ${
        bed.status === "available"
          ? "bg-green-600 hover:bg-green-700"
          : "bg-gray-600 hover:bg-gray-700"
      }`}
    >
      {bed.status === "available" ? "Libre" : "Occupé"}
    </button>
  );
}
