import React, { useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import ChatHeader from "./ChatHeader";
import { sendMessage } from "../lib/apiClient";

export default function ChatLayout() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (text) => {
    // Ajouter le message utilisateur
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setIsTyping(true);

    try {
      // Appel unique à l'API
      const res = await sendMessage(text, 0, 0); // latitude / longitude si dispo
      const botText = res.response || "Réponse vide"; // récupère juste la réponse
      setMessages((prev) => [...prev, { sender: "bot", text: botText }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Erreur API, réessaye plus tard" },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto px-3 py-2">
        <ChatMessages messages={messages} isTyping={isTyping} />
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}
