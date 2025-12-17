export default function DischargeButton({ admissionId, token, onDone }) {
  const discharge = async () => {
    await fetch(
      `https://hospital-bed-management-ec42.onrender.com/api/v1/admissions/${admissionId}/discharge`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    onDone();
  };

  return (
    <button
      onClick={discharge}
      className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded text-sm"
    >
      Sortie
    </button>
  );
}
