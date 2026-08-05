import { useGetMessagesQuery } from "../../services/messageApi";

import MessageBubble from "./MessageBubble";

interface Props {
  conversationId: string;
}


const MessageList = ({ conversationId }: Props) => {
  const { data: messages, isLoading } =
    useGetMessagesQuery(conversationId, {
      skip: !conversationId,
    });

  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 p-6">
      {messages?.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
        />
      ))}
    </div>
  );
};

export default MessageList;