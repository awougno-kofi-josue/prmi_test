import React from "react";

export default function ChatHeader() {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md rounded-t-lg">
      <h1 className="text-lg font-semibold text-gray-500"> Orientation Rapide vers la structure adéquat</h1>
      {/* Remplacer <Button> par <button> natif */}
      <button className="bg-green-600 text-white px-3 py-1 rounded-md">
        Connecté
      </button>
    </div>
  );
}
