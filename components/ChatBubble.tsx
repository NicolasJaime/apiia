import { View, Text, StyleSheet } from "react-native";
import { Message } from "../utils/types";

export default function ChatBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <View style={[styles.bubble, isUser ? styles.user : styles.bot]}>
      <Text style={styles.text}>{message.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    maxWidth: "80%",
    padding: 10,
    marginVertical: 4,
    borderRadius: 10,
  },
  user: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6", // Verde claro tipo WhatsApp
  },
  bot: {
    alignSelf: "flex-start",
    backgroundColor: "#E6F4FE", // Azul claro
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
});
