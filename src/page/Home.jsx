import React from "react";
import { NavLink } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-12 text-gray-800">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">
        Bienvenue sur PRMI
      </h1>
      <p className="text-lg md:text-xl mb-8 text-center max-w-xl">
        Une plateforme médicale intelligente pour analyser vos symptômes et vous orienter vers le centre adéquat.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        
        <NavLink
          to="/chat"
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Démarrer le Chat
        </NavLink>
        <NavLink
          to="/admin"
          className="px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition"
        >
          Espace Admin
        </NavLink>
      </div>

      <div className="mt-12 text-center text-gray-500">
        &copy; 2025 PRMI. Tous droits réservés.
      </div>
    </div>
  );
}
