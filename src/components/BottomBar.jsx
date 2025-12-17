import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import { MdLocalPharmacy } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";

export default function BottomBar() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname.startsWith(path)
      ? "text-green-600"
      : "text-gray-500";

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around py-2 md:hidden z-50">
      <Link to="/" className={`flex flex-col items-center ${isActive("/")}`}>
        <AiOutlineHome size={22} />
        <span className="text-xs">Accueil</span>
      </Link>

      <Link to="/chat" className={`flex flex-col items-center ${isActive("/chat")}`}>
        <BsChatDots size={22} />
        <span className="text-xs">Chat</span>
      </Link>

      <Link
        to="/pharmacies"
        className={`flex flex-col items-center ${isActive("/pharmacies")}`}
      >
        <MdLocalPharmacy size={22} />
        <span className="text-xs">Pharmacies</span>
      </Link>

      <Link
        to="/admin"
        className={`flex flex-col items-center ${isActive("/admin")}`}
      >
        <RiAdminLine size={22} />
        <span className="text-xs">Admin</span>
      </Link>
    </div>
  );
}
