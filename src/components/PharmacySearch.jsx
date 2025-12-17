import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Icône custom pour la pharmacie
const pharmacyIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2965/2965567.png", // exemple
  iconSize: [35, 35],
});

const API_URL = "https://api.exemple.com/pharmacies-de-garde?city="; // Remplacer par ton API

export default function PharmacySearch() {
  const [city, setCity] = useState("");
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}${encodeURIComponent(city)}`);
      if (!res.ok) throw new Error("Erreur lors de la récupération des pharmacies");
      const data = await res.json();
      setPharmacies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Coordonnées par défaut (si aucune pharmacie)
  const defaultPosition = [6.1319, 1.2225]; // Lomé, Togo

  return (
    <div className="max-w-4xl mx-auto p-5 flex flex-col gap-5">
      <h1 className="text-3xl font-bold text-center mb-4">Pharmacies de garde</h1>

      {/* Formulaire */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Entrez la ville ou le quartier"
          className="flex-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Rechercher
        </button>
      </div>

      {/* Affichage */}
      {loading && <p className="text-center text-gray-600">Chargement...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {pharmacies.length > 0 && (
        <>
          {/* Carte interactive */}
          <MapContainer
            center={[pharmacies[0].lat || defaultPosition[0], pharmacies[0].lng || defaultPosition[1]]}
            zoom={13}
            className="h-96 w-full rounded-lg shadow"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {pharmacies.map((pharmacy, idx) => (
              <Marker
                key={idx}
                position={[pharmacy.lat || defaultPosition[0], pharmacy.lng || defaultPosition[1]]}
                icon={pharmacyIcon}
              >
                <Popup>
                  <strong>{pharmacy.name}</strong>
                  <br />
                  {pharmacy.address}
                  <br />
                  Tél: {pharmacy.phone}
                  <br />
                  Horaires: {pharmacy.open_hours}
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Liste des pharmacies */}
          <ul className="space-y-3 mt-4">
            {pharmacies.map((pharmacy, idx) => (
              <li key={idx} className="p-3 border rounded shadow-sm">
                <h2 className="font-bold text-lg">{pharmacy.name}</h2>
                <p>{pharmacy.address}</p>
                <p>Téléphone : {pharmacy.phone}</p>
                <p>Horaires : {pharmacy.open_hours}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
