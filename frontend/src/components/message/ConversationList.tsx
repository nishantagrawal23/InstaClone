import ConversationItem from "./ConversationItem";
import { useGetConversationsQuery } from "../../services/conversationApi";
import type { Conversation } from "../../Types/conversation";

interface Props {
  selectedConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
}

const ConversationList = ({
  selectedConversation,
  onSelectConversation,
}: Props) => {

  const {
    data: conversations,
    isLoading,
  } = useGetConversationsQuery();

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="border-b p-5">
        <h1 className="text-2xl font-bold">Messages</h1>
      </div>

      {conversations?.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          selected={selectedConversation?.id === conversation.id}
          onClick={() => onSelectConversation(conversation)}
        />
      ))}
    </div>
  );
};

export default ConversationList;