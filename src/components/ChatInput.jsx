import React, { useState } from "react";
import { FiSend } from "react-icons/fi"; // Icône d’envoi

export default function ChatInput({ onSendMessage }) {
  const [text, setText] = useState("");

  // Fonction pour envoyer le message
  const handleSend = () => {
    if (!text.trim()) return; // ne rien envoyer si vide
    onSendMessage(text);       // callback vers le parent
    setText("");               // reset du champ
  };

  return (
    <div className="flex items-center px-4 py-3 bg-white border-t shadow-inner rounded-b-lg">
      {/* Champ de texte */}
      <input
        type="text"
        className="flex-1 border border-gray-300 rounded-full px-4 py-2 mr-3 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
        placeholder="Écrivez votre message..."
        aria-label="Message"
        value={text}
        autoFocus
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />

      {/* Bouton envoyer */}
      <button
        onClick={handleSend}
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full flex items-center justify-center shadow-md transition-transform transform hover:scale-105"
        aria-label="Envoyer message"
      >
        <FiSend className="text-lg" />
      </button>
    </div>
  );
}
