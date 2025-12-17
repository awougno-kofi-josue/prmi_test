import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ChatLayout from "./components/ChatLayout";
// import AdminDashboard from "./components/AdminDashboard"; // Décommenter si le composant est prêt
//import PharmacySearch from "./components/PharmacySearch";

// Page d'accueil simple
function Home() {
  return (
    <div className="p-5 text-center mt-20">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">PRMI - Démo</h1>
      <Link
        to="/chat"
        className="bg-blue-60 text-white px-8 py-3 rounded-xl shadow hover:bg-blue-70 transition-colors"
      >
        Démarrer le ChatBot
      </Link>
    </div>
  );
}

// App principale
export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Navigation améliorée */}
        <nav className="bg-blue-600 text-white shadow-md p-4 flex justify-between items-center">
          <div className="text-lg font-bold">PRMI</div>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-blue-200 transition-colors">
              Accueil
            </Link>
            <Link to="/chat" className="hover:text-blue-200 transition-colors">
              ChatBot
            </Link>
            <Link to="/pharmacies" className="hover:text-blue-200 transition-colors">
              Pharmacies de garde
            </Link>
            {/* <Link to="/admin" className="hover:text-blue-200 transition-colors">
              Admin
            </Link> */}
          </div>
          {/* Pharmacies de garde */}
          
        </nav>

        {/* Routes */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<ChatLayout />} />
            {/* <Route path="/admin" element={<AdminDashboard />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}
