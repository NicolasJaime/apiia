import React from "react";
import { TextInput, View } from "react-native";

interface QueryInputProps {
  value: string;
  onChange: (text: string) => void;
}

export function QueryInput({ value, onChange }: QueryInputProps) {
  return (
    <View className="w-full max-w-md mb-5">
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="¿Qué quieres saber hoy?"
        placeholderTextColor="#cccccc"
        multiline
        className="bg-slate-900 text-white px-4 py-3 rounded-xl border border-slate-600 focus:border-pink-500"
      />
    </View>
  );
}
