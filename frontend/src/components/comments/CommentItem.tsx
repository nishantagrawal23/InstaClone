import { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import type { commentInterface } from "../../Types/comment";
import CommentInput from "./CommentInput";

type Props = {
  comment: commentInterface;
  postId:string
};

const CommentItem = ({ comment ,postId}: Props) => {
  
  const [showReply, setShowReply] = useState(false);

  return (
    <div className="space-y-3">
      {/* Comment */}
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 font-semibold">
          {comment.user_name.charAt(0).toUpperCase()}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="rounded-xl bg-gray-100 px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">
                  {comment.user_username}
                </p>

                <p className="text-sm text-gray-500">
                  {comment.user_name}
                </p>
              </div>

              {comment.isOwner && (
                <FiMoreHorizontal
                  size={18}
                  className="cursor-pointer"
                />
              )}
            </div>

            <p className="mt-2 text-sm">
              {comment.text}
            </p>
          </div>

          {/* Footer */}
          <div className="mt-2 flex items-center gap-4 px-2 text-xs text-gray-500">
            <span>
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>

            <button
              onClick={() => setShowReply((prev) => !prev)}
              className="font-medium hover:text-black"
            >
              Reply
            </button>
          </div>

          {/* Reply Input */}
          {showReply && (
            <div className="mt-3 ml-4">
              <CommentInput
                postId={postId}
                parentCommentId={comment.id}
                replyingTo={comment.user_username}
                onCancel={() => setShowReply(false)}
               
              />
            </div>
          )}
        </div>
      </div>

      {/* Replies */}
      {comment.replies.length > 0 && (
        <div className="ml-12 mt-4 border-l border-gray-200 pl-4">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              postId={postId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;