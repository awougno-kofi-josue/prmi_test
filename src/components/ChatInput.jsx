// ChatLayout.jsx
import React, { useState, useEffect } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function ChatLayout() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [locationSent, setLocationSent] = useState(false);

  // Demande de géolocalisation une seule fois
  useEffect(() => {
    if (!locationSent && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setMessages((prev) => [
            ...prev,
            { sender: "user", text: `Voici ma position : lat=${latitude}, lon=${longitude}` },
          ]);
          setLocationSent(true);
        },
        (err) => console.log("Localisation refusée ou impossible :", err)
      );
    }
  }, [locationSent]);

  // Envoi d’un message
  const handleSendMessage = (text) => {
    setMessages((prev) => [...prev, { sender: "user", text }]);

    // Simulation d’une réponse du bot
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: `Vous avez dit : "${text}"` }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <ChatMessages messages={messages} isTyping={isTyping} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}
