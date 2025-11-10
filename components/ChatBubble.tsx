import React from "react";
import { View, Text } from "react-native";

interface ChatBubbleProps {
  content: string;
  align?: "left" | "right";
}

export function ChatBubble({ content, align = "left" }: ChatBubbleProps) {
  const isUser = align === "right";

  const bubbleStyle = isUser
    ? "bg-indigo-600 self-end"
    : "bg-neutral-800 self-start";

  return (
    <View
      className={`my-2 px-5 py-4 rounded-2xl max-w-[90%] ${bubbleStyle}`}
    >
      <Text className="text-white text-base leading-relaxed tracking-tight">
        {content}
      </Text>
    </View>
  );
}
