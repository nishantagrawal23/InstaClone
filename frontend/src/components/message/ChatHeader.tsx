
import { FiPhone, FiVideo, FiInfo } from "react-icons/fi";
import type { Conversation } from "../../Types/conversation";


interface Props {
  conversation: Conversation;
}

const ChatHeader = ({ conversation }: Props) => {
  return (
    <div className="flex items-center justify-between border-b px-6 py-4">
      <div className="flex items-center gap-3">
       <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-300 font-semibold">
  {conversation.user.name.charAt(0).toUpperCase()}
</div>

        <div>
          <h2 className="font-semibold">
            {conversation.user.username}
          </h2>

          <p className="text-sm text-gray-500">
    {conversation.user.name}
  </p>
        </div>
      </div>

      <div className="flex items-center gap-5 text-xl">
        <FiPhone className="cursor-pointer" />
        <FiVideo className="cursor-pointer" />
        <FiInfo className="cursor-pointer" />
      </div>
    </div>
  );
};

export default ChatHeader;