

import { useState } from "react";
import { FiImage, FiSend, FiSmile } from "react-icons/fi";
import type { Conversation } from "../../Types/conversation";

interface props{
   conversation:Conversation
}

const MessageInput = ({conversation} :props) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

  

    setMessage("");
  };

  return (
    <div className="border-t p-4">
      <div className="flex items-center gap-3 rounded-full border px-4 py-2">
        <FiSmile
          size={22}
          className="cursor-pointer"
        />

        <input
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          placeholder="Message..."
          className="flex-1 outline-none"
        />

        <FiImage
          size={20}
          className="cursor-pointer"
        />

        <button onClick={handleSend}>
          <FiSend
            size={22}
            className="text-blue-500"
          />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;