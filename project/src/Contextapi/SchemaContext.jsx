import React, { createContext, useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

export const SchemaContext = createContext();
const socket = io("https://dbsmash-backend.onrender.com"); // 🔁 change to ngrok/production if needed

export const SchemaProvider = ({ children }) => {
  const [aireply, setaireply] = useState(null);
  const [loading, setloading] = useState(false);
  const [currentUserMessage, setCurrentUserMessage] = useState(null);
  const lastStoredUserId = useRef(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("chat_history"));

    // ✅ Check validity
    const isValid =
      saved?.user?.id &&
      saved?.ai?.content?.sql &&
      Array.isArray(saved.ai.content.initialNodes);

    // ✅ Check expiry (24h)
    const savedTime = new Date(saved?.timestamp || saved?.ai?.timestamp || 0);
    const now = new Date();
    const expired = now - savedTime > 24 * 60 * 60 * 1000; // 24h in ms

    if (isValid && !expired) {
      setaireply(saved.ai);
      lastStoredUserId.current = saved.user.id;
    } else {
      localStorage.removeItem("chat_history");
    }

    // ✅ Handle AI success
    socket.on("airesponse", (data) => {
      const isValid =
        data?.sql &&
        Array.isArray(data.initialNodes) &&
        Array.isArray(data.initialEdges);

      if (isValid && currentUserMessage) {
        const aiMsg = {
          id: Date.now(),
          type: "ai",
          content: data,
          timestamp: new Date().toISOString(),
        };

        setaireply(aiMsg);

        // ✅ Save user+ai pair if new
        if (lastStoredUserId.current !== currentUserMessage.id) {
          localStorage.setItem(
            "chat_history",
            JSON.stringify({
              user: currentUserMessage,
              ai: aiMsg,
              timestamp: aiMsg.timestamp,
            })
          );
          lastStoredUserId.current = currentUserMessage.id;
        }
      }

      setCurrentUserMessage(null);
      setloading(false);
    });

    // ❌ Handle AI errors
    socket.on("aiError", () => {
      setaireply({
        id: Date.now(),
        type: "ai",
        content: {
          sql: "",
          initialNodes: [],
          initialEdges: [],
          error: "AI failed to respond.",
        },
        timestamp: new Date().toISOString(),
      });
      setCurrentUserMessage(null);
      setloading(false);
    });

    // ❌ Handle limit exceed
    socket.on("limitexceeded", () => {
      setaireply({
        id: Date.now(),
        type: "ai",
        content: {
          sql: "",
          initialNodes: [],
          initialEdges: [],
          error: "AI Limit Exceeded (2 API Calls/Day).",
        },
        timestamp: new Date().toISOString(),
      });
      setCurrentUserMessage(null);
      setloading(false);
    });

    return () => {
      socket.off("airesponse");
      socket.off("aiError");
      socket.off("limitexceeded");
    };
  }, [currentUserMessage]);

  // 🧠 Expose to app
  const genAI = (text) => {
    if (!text?.trim()) return;

    const userMsg = {
      id: Date.now(),
      type: "user",
      content: text,
      timestamp: new Date().toISOString(),
    };

    setCurrentUserMessage(userMsg);
    setaireply(null);
    setloading(true);
    socket.emit("sendPrompt", text);
  };

  return (
    <SchemaContext.Provider value={{ aireply, loading, genAI }}>
      {children}
    </SchemaContext.Provider>
  );
};
