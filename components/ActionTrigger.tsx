import React from "react";
import { Pressable, Text, ActivityIndicator } from "react-native";

interface ActionTriggerProps {
  label?: string;
  loading?: boolean;
  onExecute: () => void;
  theme?: "primary" | "ghost";
}

export function ActionTrigger({
  label = "Enviar",
  loading = false,
  onExecute,
  theme = "primary",
}: ActionTriggerProps) {
  const baseStyle = "w-full py-3 rounded-full mt-4 transition-opacity duration-200";
  const themeStyle =
    theme === "primary"
      ? "bg-indigo-600 text-white active:bg-indigo-700"
      : "border border-indigo-400 text-indigo-300 active:border-indigo-500";

  const disabledStyle = loading ? "opacity-50" : "";

  return (
    <Pressable
      onPress={onExecute}
      disabled={loading}
      className={`${baseStyle} ${themeStyle} ${disabledStyle}`}
    >
      {loading ? (
        <ActivityIndicator color={theme === "primary" ? "white" : "#4f46e5"} />
      ) : (
        <Text className="text-center text-base font-semibold tracking-wide">
          {label}
        </Text>
      )}
    </Pressable>
  );
}
