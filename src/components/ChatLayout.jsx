import React, { useState, useEffect } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import ChatHeader from "./ChatHeader";
import { sendMessage } from "../lib/apiClient";

export default function ChatLayout() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    loaded: false,
  });

  // 📍 Récupération de la localisation UNE SEULE FOIS
  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn("Géolocalisation non supportée");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          loaded: true,
        });
      },
      (err) => {
        console.warn("Localisation refusée :", err.message);
        setLocation({ latitude: 0, longitude: 0, loaded: true });
      }
    );
  }, []);

  const handleSendMessage = async (text) => {
    // Message utilisateur
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setIsTyping(true);

    try {
      const res = await sendMessage(
        text,
        location.latitude,
        location.longitude
      );

      const botText = res.response || "Réponse vide";
      setMessages((prev) => [...prev, { sender: "bot", text: botText }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Erreur API, réessaye plus tard." },
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
