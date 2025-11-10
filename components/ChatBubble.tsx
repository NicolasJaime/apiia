import React from "react";
import { View, Text } from "react-native";

interface ChatBubbleProps {
  content: string;
  align?: "left" | "right";
}

export function ChatBubble({ content, align = "left" }: ChatBubbleProps) {
  const isUser = align === "right";

  return (
    <View
      className={`my-2 px-4 py-3 rounded-xl max-w-[90%] ${
        isUser ? "bg-blue-600 self-end" : "bg-neutral-800 self-start"
      }`}
    >
      <Text className="text-white text-sm">{content}</Text>
    </View>
  );
}
