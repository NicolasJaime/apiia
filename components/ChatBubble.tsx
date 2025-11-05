import { View, Text } from "react-native";

export function ChatBubble({ role, text }: { role: "user" | "ai", text: string }) {
  return (
    <View style={{
      alignSelf: role === "user" ? "flex-end" : "flex-start",
      backgroundColor: role === "user" ? "#DCF8C6" : "#E5E5EA",
      borderRadius: 10,
      padding: 10,
      marginVertical: 4,
      maxWidth: "80%"
    }}>
      <Text>{text}</Text>
    </View>
  );
}