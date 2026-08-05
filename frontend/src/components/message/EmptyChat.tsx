// src/components/message/EmptyChat.tsx

import { FiMessageCircle } from "react-icons/fi";

const EmptyChat = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="rounded-full border-2 border-gray-700 p-6">
        <FiMessageCircle size={40} />
      </div>

      <h2 className="mt-5 text-2xl font-semibold">
        Your Messages
      </h2>

      <p className="mt-2 text-gray-500">
        Select a conversation to start chatting.
      </p>
    </div>
  );
};

export default EmptyChat;