import { useCallback, useEffect, useRef, useState } from "react";
import { Message } from "@/utils/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const STORAGE_KEY = "@gemini_chat_log";

export function useGeminiAI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

  // Cargar historial desde almacenamiento
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) setMessages(JSON.parse(saved));
      } catch (err) {
        console.warn("No se pudo cargar historial:", err);
      }
    })();
  }, []);

  // Guardar historial en cada cambio
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const addMessage = useCallback((msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  const buildPayload = (prompt: string) => ({
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 500,
    },
  });

  const fetchGeminiReply = useCallback(
    async (prompt: string): Promise<string> => {
      try {
        const res = await fetch(`${API_URL}?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(buildPayload(prompt)),
        });

        const data = await res.json();
        console.log("Gemini response:", JSON.stringify(data, null, 2));

        return (
          data?.candidates?.[0]?.content?.parts?.[0]?.text ??
          "🤖 No se pudo obtener respuesta."
        );
      } catch (error) {
        console.error("Error al consultar Gemini:", error);
        return "❌ Error al conectar con Gemini.";
      }
    },
    [apiKey]
  );

  const sendPrompt = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    };

    const thinkingMsg: Message = {
      id: "thinking",
      role: "bot",
      content: "✍️ Pensando...",
    };

    setInput("");
    setLoading(true);
    setMessages((prev) => [...prev, userMsg, thinkingMsg]);

    const reply = await fetchGeminiReply(trimmed);

    setMessages((prev) =>
      prev
        .filter((msg) => msg.id !== "thinking")
        .concat({
          id: crypto.randomUUID(),
          role: "bot",
          content: reply,
        })
    );

    setLoading(false);
  }, [input, loading, fetchGeminiReply]);

  return {
    messages,
    input,
    setInput,
    sendPrompt,
    loading,
    listRef,
  };
}
