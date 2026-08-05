import type { Conversation } from "../../Types/conversation";



interface Props {
  conversation: Conversation;
  selected: boolean;
  onClick: () => void;
}

const ConversationItem = ({
  conversation,
  selected,
  onClick,
}: Props) => {
    console.log(conversation)
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-4 px-5 py-4 transition hover:bg-gray-100 ${
        selected ? "bg-gray-100" : ""
      }`}
    >
     <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300 font-semibold">
  {conversation.user.name.charAt(0).toUpperCase()}
</div>

      <div className="flex-1">
  <h3 className="font-semibold">
    {conversation.user.username}
  </h3>

          <p className="text-sm text-gray-500">
    {conversation.lastMessage || "Start chatting"}
  </p>
      </div>
    </button>
  );
};

export default ConversationItem;