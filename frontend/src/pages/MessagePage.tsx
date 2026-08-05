
import { useState } from "react";
import ConversationList from "../components/message/ConversationList";
import ChatWindow from "../components/message/ChatWindow";
import type { Conversation } from "../Types/conversation";



const MessagePage = () => {
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  return (
    <div className="flex h-screen bg-white">
      {/* Left Sidebar */}
      <div className="w-[360px] border-r border-gray-200">
        <ConversationList
          selectedConversation={selectedConversation}
          onSelectConversation={setSelectedConversation}
        />
      </div>

      {/* Right Chat Area */}
      <div className="flex-1">
        <ChatWindow
          selectedConversation={selectedConversation}
        />
      </div>
    </div>
  );
};

export default MessagePage;