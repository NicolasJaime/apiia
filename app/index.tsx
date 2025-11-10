import { useRef } from "react";
import { ScrollView, View, TextInput, Pressable, Text } from "react-native";
import { useGeminiChat } from "@/hooks/useGeminiChat";
import ChatBubble from "@/components/ChatBubble";

export default function Index() {
  const {
    chatHistory,
    userInput,
    setUserInput,
    handleSubmit,
    isLoading,
  } = useGeminiChat();

  const scrollRef = useRef<ScrollView>(null);

  return (
    <View className="flex-1 bg-white dark:bg-zinc-900 px-4 pt-10">
      <ScrollView
        ref={scrollRef}
        className="flex-1 space-y-2"
        onContentSizeChange={() =>
          scrollRef.current?.scrollToEnd({ animated: true })
        }
      >
        {chatHistory.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
      </ScrollView>

      <View className="flex-row items-center gap-2 py-4">
        <TextInput
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Escribe tu pregunta..."
          placeholderTextColor="#999"
          editable={!isLoading}
          className="flex-1 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-2 text-base text-black dark:text-white bg-zinc-100 dark:bg-zinc-800"
        />
        <Pressable
          onPress={handleSubmit}
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
