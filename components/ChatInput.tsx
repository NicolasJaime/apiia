import { View, TextInput, Button, StyleSheet } from "react-native";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  disabled?: boolean;
};

export default function ChatInput({ value, onChangeText, onSend, disabled }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Escribe tu mensaje..."
        value={value}
        onChangeText={onChangeText}
        editable={!disabled}
      />
      <Button title="Enviar" onPress={onSend} disabled={disabled} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    height: 40,
  },
});
