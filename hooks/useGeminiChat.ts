import { useEffect, useRef, useState } from "react";
import { Message } from "../utils/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GEMINI_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
const STORAGE_KEY = "@chat_history";

export function useGeminiChat() {
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
  const flatListRef = useRef(null);

  // Cargar historial al iniciar
  useEffect(() => {
    const loadHistory = async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) setChatHistory(JSON.parse(stored));
    };
    loadHistory();
  }, []);

  // Guardar historial en cada cambio
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(chatHistory));
  }, [chatHistory]);

  const appendMessage = (msg: Message) => {
    setChatHistory((prev) => [...prev, msg]);
  };

  const sendMessageToGemini = async (text: string): Promise<string> => {
    const payload = {
      contents: chatHistory.map(({ role, content }) => ({
        role,
        parts: [{ text: content }],
      })),
    };

    payload.contents.push({
      role: "user",
      parts: [{ text }],
    });

    const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    return (
      result?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "🤖 No se pudo obtener respuesta."
    );
  };

  const handleSubmit = async () => {
    const trimmed = userInput.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    };

    appendMessage(userMsg);
    setUserInput("");
    setIsLoading(true);

    // Mensaje temporal de "escribiendo..."
    const typingMsg: Message = {
      id: "typing",
      role: "bot",
      content: "✍️ Escribiendo...",
    };
    appendMessage(typingMsg);

    try {
      const reply = await sendMessageToGemini(trimmed);

      // Reemplazar "escribiendo..." por respuesta real
      setChatHistory((prev) =>
        prev
          .filter((msg) => msg.id !== "typing")
          .concat({
            id: crypto.randomUUID(),
            role: "bot",
            content: reply,
          })
      );
    } catch (err) {
      console.error("Gemini API error:", err);
      setChatHistory((prev) =>
        prev
          .filter((msg) => msg.id !== "typing")
          .concat({
            id: crypto.randomUUID(),
            role: "bot",
            content: "❌ Error al conectar con Gemini.",
          })
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    chatHistory,
    userInput,
    setUserInput,
    handleSubmit,
    isLoading,
    flatListRef,
  };
}
