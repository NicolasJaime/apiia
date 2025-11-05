import { useState } from "react";
import { ScrollView, View, TextInput, Button } from "react-native";
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
    <View style={{ flex: 1, padding: 16 }}>
      <ScrollView style={{ flex: 1 }}>
        {messages.map((msg, index) => (
          <ChatBubble key={index} role={msg.role} text={msg.text} />
        ))}
      </ScrollView>

      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder="Escribe tu pregunta..."
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 8,
            marginRight: 8
          }}
        />
        <Button title="Enviar" onPress={enviarPregunta} disabled={isLoading} />
      </View>
    </View>
  );
}
