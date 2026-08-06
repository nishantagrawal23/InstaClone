import { useEffect, useState } from "react";
import { useGetMessagesQuery } from "../../services/messageApi";

import MessageBubble from "./MessageBubble";
import { socket } from "../../socket/socket";

interface Props {
  conversationId: string;
}

const MessageList = ({ conversationId }: Props) => {
  const { data, isLoading } = useGetMessagesQuery(conversationId, {
    skip: !conversationId,
  });

  const [messages, setMessages] = useState<any[]>([]);

  // Load messages from API
  useEffect(() => {
    if (data) {
      setMessages(data);
    }
  }, [data]);

  // Listen for new socket messages
  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (newMessage: any) => {
     

      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket?.off("receive_message", handleReceiveMessage);
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 p-6">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
        />
      ))}
    </div>
  );
};

export default MessageList;