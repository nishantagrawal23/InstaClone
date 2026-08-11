import { useState } from "react";
import {
  FiHeart,
  FiMessageCircle,
  // FiSend,
  // FiBookmark,
} from "react-icons/fi";

import type { PostInterface } from "../../Types/post";
import { useToggleLikeMutation } from "../../services/likeApi";
import CommentModal from "../comments/CommentModal";

type Props = {
  post: PostInterface;
};

const PostActions = ({ post }: Props) => {
  const [toggleLike, { isLoading }] =
    useToggleLikeMutation();

  const [isCommentOpen, setIsCommentOpen] =
    useState(false);
 
  const handleLike = async () => {
    try {
      await toggleLike(post.post_id).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex gap-4">
          <FiHeart
            size={25}
            onClick={handleLike}
            className={`cursor-pointer transition hover:scale-110 ${
              isLoading
                ? "pointer-events-none opacity-50"
                : ""
            }`}
          />

          <FiMessageCircle
            size={25}
            onClick={() => setIsCommentOpen(true)}
            className="cursor-pointer transition hover:scale-110"
          />

          {/* <FiSend
            size={25}
            className="cursor-pointer transition hover:scale-110"
          /> */}
        </div>

        {/* <FiBookmark
          size={25}
          className="cursor-pointer transition hover:scale-110"
        /> */}
      </div>
     
      <CommentModal
        postId={post.post_id}
        
        isOpen={isCommentOpen}
        onClose={() => setIsCommentOpen(false)}
      />
    </>
  );
};

export default PostActions;


