import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import EmptyChat from "./EmptyChat";
import type { Conversation } from "../../Types/conversation";

interface Props {
  selectedConversation: Conversation | null;
}

const ChatWindow = ({ selectedConversation }: Props) => {
  if (!selectedConversation) {
    return <EmptyChat />;
  }

  return (
    <div className="flex h-full flex-col">
      <ChatHeader conversation={selectedConversation} />

      <div className="flex-1 overflow-y-auto">
        <MessageList
          conversationId={selectedConversation.id}
        />
      </div>

      <MessageInput
        conversation={selectedConversation}
      />
    </div>
  );
};

export default ChatWindow;