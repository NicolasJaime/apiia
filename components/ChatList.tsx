import { FlatList } from "react-native";
import ChatBubble from "./ChatBubble";
import { Message } from "../utils/types";

export default function ChatList({
  messages,
  flatListRef,
}: {
  messages: Message[];
  flatListRef: any;
}) {
  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatBubble message={item} />}
      contentContainerStyle={{ padding: 10 }}
      onContentSizeChange={() =>
        flatListRef.current?.scrollToEnd({ animated: true })
      }
    />
  );
}
