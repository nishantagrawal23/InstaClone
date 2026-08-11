import type { Message } from "../../Types/message";
import { useGetProfileQuery } from "../../services/authApi";

interface Props {
  message: Message;
}

const MessageBubble = ({ message }: Props) => {
  const { data: profile } = useGetProfileQuery(undefined);

  const isMine = message.sender.id === profile?.id;
  
  return (
    <div
      className={`flex ${
        isMine ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-xs rounded-3xl px-4 py-2 ${
          isMine
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        
        {message.message}
       
      </div>
    </div>
  );
};

export default MessageBubble;