import { useNavigate } from "react-router-dom";

interface Props {
  userId: string;
}

const MessageButton = ({ userId }: Props) => {
  const navigate = useNavigate();

  const handleMessage = () => {
    navigate(`/chat/${userId}`);
  };

  return (
    <button
      onClick={handleMessage}
      className="
        px-4
        py-2
        rounded-lg
        bg-[#3F3A36]
        text-white
        text-sm
        font-medium
        hover:bg-[#2f2b28]
        transition
      "
    >
      Message
    </button>
  );
};

export default MessageButton;