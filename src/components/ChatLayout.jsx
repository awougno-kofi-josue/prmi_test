// ChatLayout.jsx
import React, { useState, useEffect } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function ChatLayout() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [locationSent, setLocationSent] = useState(false);

  // Demande de géolocalisation au chargement
  useEffect(() => {
    if (!locationSent && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMessages((prev) => [
            ...prev,
            { sender: "user", text: `Voici ma position : lat=${latitude}, lon=${longitude}` },
          ]);
          setLocationSent(true);
        },
        (error) => {
          console.log("Localisation refusée ou impossible :", error);
        }
      );
    }
  }, [locationSent]);

  const sendMessage = (text) => {
    setMessages((prev) => [...prev, { sender: "user", text }]);

    // Simulation de réponse du bot
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: `Vous avez dit : "${text}"` }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <ChatMessages messages={messages} isTyping={isTyping} />
      <ChatInput onSend={sendMessage} />
    </div>
  );
}
