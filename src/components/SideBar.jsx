import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import { MdLocalPharmacy } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname.startsWith(path)
      ? "bg-green-100 text-green-700"
      : "text-gray-600 hover:bg-gray-100";

  return (
    <div className="hidden md:flex flex-col w-40 bg-white border-r h-full p-4 space-y-4">
      <div className="text-xl font-bold mb-8">Plateforme de regulation medicale inteligente</div>
      
      <Link to="/accueil" className={`flex items-center gap-3 p-3 rounded ${isActive("/accueil")}`}>
        <AiOutlineHome size={20} />
        Accueil
      </Link>

      <Link to="chat" className={`flex items-center gap-3 p-3 rounded ${isActive("/chat")}`}>
        <BsChatDots size={20} />
        ChatBot
      </Link>

      <Link to="pharmacies" className={`flex items-center gap-3 p-3 rounded ${isActive("/pharmacies")}`}>
        <MdLocalPharmacy size={20} />
        Pharmacies
      </Link>

      <Link to="/admin" className={`flex items-center gap-3 p-3 rounded ${isActive("/admin")}`}>
        <RiAdminLine size={20} />
        Admin
      </Link>
    </div>
  );
}
