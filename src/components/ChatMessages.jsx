// ChatMessages.jsx
import React, { useEffect, useRef } from "react";

/* -------- helper : parse réponse médicale -------- */
function parseMedicalResponse(text) {
  if (!text.includes("**NIVEAU GRAVITÉ")) return null;

  const extract = (label) => {
    const regex = new RegExp(`\\*\\*${label} :\\*\\*\\s*([\\s\\S]*?)(?=\\*\\*|$)`);
    const match = text.match(regex);
    return match ? match[1].trim() : null;
  };

  return {
    gravite: extract("NIVEAU GRAVITÉ"),
    orientation: extract("ORIENTATION"),
    motif: extract("MOTIF"),
    reservation: extract("RÉSERVATION"),
    conseil: extract("CONSEIL"),
  };
}

/* -------- badge gravité -------- */
function GraviteBadge({ value }) {
  const color =
    value?.toLowerCase().includes("vert")
      ? "bg-green-500"
      : value?.toLowerCase().includes("jaune")
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <span className={`${color} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
      Gravité : {value}
    </span>
  );
}

export default function ChatMessages({ messages, isTyping }) {
  const messagesEndRef = useRef(null);
  const defaultMessage =
    "Bonjour, je suis votre assistant d'orientation vers un centre médical.";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3">
      {messages.length === 0 && (
        <div className="p-3 rounded-xl max-w-[75%] bg-gray-100 text-gray-900 flex items-center gap-2 shadow-sm">
          <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold">
            B
          </div>
          {defaultMessage}
        </div>
      )}

      {messages.map((msg, idx) => {
        const isUser = msg.sender === "user";

        // parse seulement si message bot
        const rawParsed = !isUser ? parseMedicalResponse(msg.text) : null;

        const parsed =
          rawParsed &&
          (rawParsed.gravite ||
            rawParsed.orientation ||
            rawParsed.motif ||
            rawParsed.reservation ||
            rawParsed.conseil)
            ? rawParsed
            : null;

        /* ---------- MESSAGE UTILISATEUR ---------- */
        if (isUser) {
          return (
            <div
              key={idx}
              className="p-3 rounded-xl max-w-[65%] bg-green-500 text-white ml-auto shadow-sm flex gap-2"
            >
              <div className="w-6 h-6 rounded-full bg-white text-green-600 flex items-center justify-center text-sm font-bold">
                U
              </div>
              <div>{msg.text}</div>
            </div>
          );
        }

        /* ---------- MESSAGE BOT STRUCTURÉ ---------- */
        if (parsed) {
          return (
            <div
              key={idx}
              className="p-4 rounded-xl max-w-[80%] bg-gray-100 text-gray-900 mr-auto shadow-md space-y-3"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold">
                  B
                </div>
                <GraviteBadge value={parsed.gravite} />
              </div>

              <div>
                <p className="font-semibold">Orientation</p>
                <p>{parsed.orientation}</p>
              </div>

              <div>
                <p className="font-semibold">Motif</p>
                <p>{parsed.motif}</p>
              </div>

              {parsed.reservation && (
                <a
                  href={parsed.reservation}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Prendre rendez-vous
                </a>
              )}

              {parsed.conseil && (
                <div>
                  <p className="font-semibold">Conseils</p>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {parsed.conseil
                      .split("- ")
                      .filter(Boolean)
                      .map((c, i) => (
                        <li key={i}>{c.trim()}</li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          );
        }

        /* ---------- MESSAGE BOT SIMPLE ---------- */
        return (
          <div
            key={idx}
            className="p-3 rounded-xl max-w-[65%] bg-gray-100 text-gray-900 mr-auto shadow-sm flex gap-2"
          >
            <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold">
              B
            </div>
            <div>{msg.text}</div>
          </div>
        );
      })}

      {isTyping && (
        <div className="p-2 rounded-xl max-w-[60%] bg-gray-200 text-gray-700 animate-pulse flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold">
            B
          </div>
          Bot est en train d'écrire...
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
