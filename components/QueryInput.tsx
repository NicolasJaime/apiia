import React from "react";
import { TextInput, View } from "react-native";

interface QueryInputProps {
  value: string;
  onChange: (text: string) => void;
}

export function QueryInput({ value, onChange }: QueryInputProps) {
  return (
    <View className="w-full max-w-xl mb-4">
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Escribe tu consulta aquí..."
        placeholderTextColor="#888"
        multiline
        className="bg-neutral-800 text-white px-5 py-4 rounded-2xl border border-neutral-700 focus:border-indigo-500 text-base leading-relaxed"
      />
    </View>
  );
}
