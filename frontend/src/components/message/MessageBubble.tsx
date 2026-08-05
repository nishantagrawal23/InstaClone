import type { Message } from "../../Types/message";


interface Props {
  message: Message
}

const MessageBubble = ({ message }: Props) => {
  return (
    <div
      className={`flex ${
        message.sender.id
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`max-w-xs rounded-3xl px-4 py-2 ${
          message.sender.name
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