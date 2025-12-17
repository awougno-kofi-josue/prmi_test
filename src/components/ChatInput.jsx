import React, { useState } from "react";
import { FiSend } from "react-icons/fi"; // Icône d’envoi

export default function ChatInput({ onSendMessage }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSendMessage(text);
    setText("");
  };

  return (
    <div className="flex items-center px-4 py-3 bg-white border-t shadow-inner rounded-b-lg">
      <input
        type="text"
        className="flex-1 border border-gray-300 rounded-full px-4 py-2 mr-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Écrivez votre message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full flex items-center justify-center shadow-md transition-colors"
      >
        <FiSend className="text-lg " />
      </button>
    </div>
  );
}
