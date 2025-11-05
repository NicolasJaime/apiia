import { useState } from "react";
import { ScrollView, View, TextInput, Pressable, Text } from "react-native";
import { consultarGemini } from "@/hooks/useGeminiChat";
import { ChatBubble } from "@/components/ChatBubble";

export default function Index() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "ai", text: string }[]>([]);

  const enviarPregunta = async () => {
    if (!value.trim()) return;

    setIsLoading(true);
    setMessages(prev => [...prev, { role: "user", text: value }]);

    const respuesta = await consultarGemini(value);
    setMessages(prev => [...prev, { role: "ai", text: respuesta }]);

    setValue("");
    setIsLoading(false);
  };

  return (
    <View className="flex-1 bg-white dark:bg-zinc-900 px-4 pt-10">
      <ScrollView className="flex-1 space-y-2">
        {messages.map((msg, index) => (
          <ChatBubble key={index} role={msg.role} text={msg.text} />
        ))}
      </ScrollView>

      <View className="flex-row items-center gap-2 py-4">
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder="Escribe tu pregunta..."
          placeholderTextColor="#999"
          className="flex-1 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-2 text-base text-black dark:text-white bg-zinc-100 dark:bg-zinc-800"
        />
        <Pressable
          onPress={enviarPregunta}
          disabled={isLoading}
          className={`px-4 py-2 rounded-xl ${
            isLoading ? "bg-zinc-400" : "bg-blue-600"
          }`}
        >
          <Text className="text-white font-semibold">
            {isLoading ? "..." : "Enviar"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
