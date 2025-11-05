import { View, Text } from "react-native";

export function ChatBubble({ role, text }: { role: "user" | "ai", text: string }) {
  const isUser = role === "user";

  return (
    <View
      style={{
        alignSelf: isUser ? "flex-end" : "flex-start",
        backgroundColor: isUser ? "#4F93FF" : "#F0F0F0",
        borderRadius: 16,
        padding: 12,
        marginVertical: 6,
        maxWidth: "80%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2
      }}
    >
      <Text
        style={{
          color: isUser ? "#fff" : "#333",
          fontSize: 16,
          lineHeight: 22
        }}
      >
        {text}
      </Text>
    </View>
  );
}
