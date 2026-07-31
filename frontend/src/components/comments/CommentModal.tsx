import { FiX } from "react-icons/fi";
import { useGetCommentsQuery } from "../../services/commentApi";
import CommentList from "./CommentList";

import CommentInput from "./CommentInput";

type Props = {
  postId: string;
  isOpen: boolean;
  onClose: () => void;
};

const CommentModal = ({ postId, isOpen, onClose }: Props) => {
  
  const {
    data: comments,
    isLoading,
    isError,
  } = useGetCommentsQuery(postId, {
    skip: !isOpen,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="flex h-[80vh] w-full max-w-lg flex-col rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">
            Comments
          </h2>

          <button onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>

        {/* Comments */}
        <div className="flex-1 overflow-y-auto p-4">
          {isLoading && (
            <p className="text-center text-gray-500">
              Loading comments...
            </p>
          )}

          {isError && (
            <p className="text-center text-red-500">
              Failed to load comments.
            </p>
          )}

          {comments && (
            <CommentList comments={comments} postId={postId} />
          )}
        </div>

        {/* Input */}
        <div className="border-t p-4">
          <CommentInput postId={postId} />
        </div>
      </div>
    </div>
  );
};

export default CommentModal;