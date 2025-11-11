import React from "react";
import {
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

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
  const isPrimary = theme === "primary";

  return (
    <Pressable
      onPress={onExecute}
      disabled={loading}
      style={[
        styles.base,
        isPrimary ? styles.primary : styles.ghost,
        loading ? styles.disabled : null,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={isPrimary ? "#ffffff" : "#4f46e5"}
          size="small"
        />
      ) : (
        <Text style={[styles.text, isPrimary ? styles.textPrimary : styles.textGhost]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 9999,
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: "#4f46e5", // Indigo 600
  },
  ghost: {
    borderWidth: 1,
    borderColor: "#818cf8", // Indigo 400
    backgroundColor: "transparent",
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
    textAlign: "center",
  },
  textPrimary: {
    color: "#ffffff",
  },
  textGhost: {
    color: "#818cf8",
  },
});
