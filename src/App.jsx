import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

/* Public */
import ChatLayout from "./components/ChatLayout";
// import PharmacySearch from "./components/PharmacySearch"; // placeholder

/* Admin */
import AdminApp from "./admin/AdminApp";
import HospitalPage from "./admin/HospitalPage";
import BedPage from "./admin/BedPage";
import AdmissionPage from "./admin/AdmissionPage";

/* Page d'accueil */
function Home() {
  return (
    <div className="p-6 text-center mt-24">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        PRMI - Démo
      </h1>

      <Link
        to="/chat"
        className="bg-green-600 text-white px-8 py-3 rounded-xl shadow hover:bg-green-700 transition-colors"
      >
        Démarrer le ChatBot
      </Link>
    </div>
  );
}

/* App principale */
export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">

        {/* Navigation */}
        <nav className="bg-gray-700 text-white shadow p-4 flex justify-between items-center">
          {/* Logo + titre */}
          <div className="flex items-center gap-3">
            <div className="bg-green-600 w-8 h-12 rounded-lg" />
            <div>
              <div className="text-lg font-bold">PRMI</div>
              <p className="text-sm text-gray-200">
                Plateforme de régulation médicale intelligente
              </p>
            </div>
          </div>

          {/* Liens */}
          <div className="flex gap-6">
            <Link to="/" className="hover:text-green-300 transition-colors">
              Accueil
            </Link>
            <Link to="/chat" className="hover:text-green-300 transition-colors">
              ChatBot
            </Link>
            <Link to="/pharmacies" className="hover:text-green-300 transition-colors">
              Pharmacies de garde
            </Link>
            <Link to="/admin" className="hover:text-green-300 transition-colors">
              Admin
            </Link>
          </div>
        </nav>

        {/* Routes */}
        <div className="flex-1">
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<ChatLayout />} />
            {/* <Route path="/pharmacies" element={<PharmacySearch />} /> */}

            {/* Admin avec routes enfants */}
            <Route path="/admin/*" element={<AdminApp />}>
              <Route path="hospitals" element={<HospitalPage />} />
              <Route path="lits" element={<BedPage />} />
              <Route path="admissions" element={<AdmissionPage />} />
            </Route>
          </Routes>
        </div>

      </div>
    </Router>
  );
}
