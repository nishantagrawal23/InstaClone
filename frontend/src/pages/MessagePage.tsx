import { useEffect, useState } from "react";
import ConversationList from "../components/message/ConversationList";
import ChatWindow from "../components/message/ChatWindow";
import type { Conversation } from "../Types/conversation";
import { connectSocket } from "../socket/socket";
import { useParams } from "react-router-dom";

const MessagePage = () => {
   const { userId } = useParams();

  console.log(userId);

  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

useEffect(() => {
  let activeSocket: any;

  const connect = async () => {
    const cookie = await window.cookieStore.get("accessToken");

    if (!cookie?.value) {
     
      return;
    }

    activeSocket = connectSocket(cookie.value);
  };

  connect();

  return () => {
    activeSocket?.disconnect();
  };
}, []);
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