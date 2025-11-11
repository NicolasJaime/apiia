import { ActionTrigger } from "@/components/ActionTrigger";
import { QueryInput } from "@/components/QueryInput";
import { ChatBubble } from "@/components/ChatBubble";
import "@/global.css";
import axios from "axios";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  Platform,
} from "react-native";

export default function Index() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

  const handleGeminiRequest = async () => {
    const trimmed = prompt.trim();
    if (!trimmed) return;

    setLoading(true);
    setReply("");

    try {
      const res = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          contents: [{ parts: [{ text: trimmed }] }],
          generationConfig: {
            temperature: 0.5,
            maxOutputTokens: 500,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": API_KEY,
          },
        }
      );

      const result = res.data.candidates?.[0]?.content?.parts?.[0]?.text;
      setReply(result || "🤖 No se pudo obtener respuesta.");
    } catch (err) {
      console.error("Error al consultar Gemini:", err);
      setReply("❌ Error al conectar con Gemini.");
    } finally {
      setPrompt("");
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-neutral-950"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerClassName="p-6 items-center">
        <View className="mb-4">
          <Text className="text-2xl font-semibold text-white text-center">
            Copilot Chat 💬
          </Text>
        </View>

        <View className="w-full max-w-xl space-y-4">
          <QueryInput value={prompt} onChange={setPrompt} />

          <ActionTrigger
            label=">"
            loading={loading}
            onExecute={handleGeminiRequest}
            theme="primary"
          />

          {reply && <ChatBubble content={reply} align="left" />}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
