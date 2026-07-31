import { useState } from "react";
import { useCreateCommentMutation } from "../../services/commentApi";

type Props = {
  postId: string;
  parentCommentId?: string;
  replyingTo?: string;
  onCancel?: () => void;
  
};



const CommentInput = ({ postId, parentCommentId ,replyingTo,onCancel,}: Props) => {
  
  const [text, setText] = useState("");

  const [createComment, { isLoading }] =
    useCreateCommentMutation();

const handleSubmit = async () => {
    if (!text.trim()) return;

    try {
        await createComment({
            postId,
            text,
            parentCommentId,
        }).unwrap();

        setText("");

        onCancel?.();
    } catch (error) {
        console.error(error);
    }
};

  return (
  <>
    {replyingTo && (
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Replying to{" "}
          <span className="font-semibold">
            @{replyingTo}
          </span>
        </p>

        <button
          onClick={onCancel}
          className="text-sm text-red-500"
        >
          Cancel
        </button>
      </div>
    )}

    <div className="flex items-center gap-3">
      <input
        type="text"
        placeholder="Add a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 rounded-full border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
      />

      <button
        onClick={handleSubmit}
        disabled={isLoading || !text.trim()}
        className="font-semibold text-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Posting..." : "Post"}
      </button>
    </div>
  </>
);
};

export default CommentInput;