import React, { useEffect, useRef } from "react";

export default function ChatMessages({ messages, isTyping }) {
  const messagesEndRef = useRef(null);
  const defaultMessage = "Bonjour, je suis votre assistant d'orientation vers un centre médical.";

  // Scroll automatique en bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3">
      {/* Message par défaut si aucun message */}
      {messages.length === 0 && (
        <div className="p-3 rounded-xl max-w-[75%] bg-gray-100 text-gray-900 flex items-center gap-2 shadow-sm">
          <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold">B</div>
          {defaultMessage}
        </div>
      )}

      {/* Messages existants */}
      {messages.map((msg, idx) => {
        const isUser = msg.sender === "user";

        // Classes de style
        const baseClasses = "p-3 rounded-xl max-w-[65%] shadow-sm flex items-start gap-2 break-words transition-all";
        const bgColor = isUser
          ? "bg-green-500 text-white ml-auto flex-row-reverse"
          : "bg-gray-100 text-gray-900 mr-auto";

        return (
          <div key={idx} className={`${baseClasses} ${bgColor}`}>
            {/* Avatar simple */}
            <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold">
              {isUser ? "U" : "B"}
            </div>
            {/* Message */}
            <div>{msg.text}</div>
          </div>
        );
      })}

      {/* Typing indicator */}
      {isTyping && (
        <div className="p-2 rounded-xl max-w-[60%] bg-gray-200 text-gray-700 animate-pulse flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold">B</div>
          Bot est en train d'écrire...
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
