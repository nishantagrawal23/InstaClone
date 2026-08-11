
import type { commentInterface } from "../../Types/comment";
import CommentItem from "./CommentItem";

type Props = {
  comments: commentInterface[];
  postId:string
};

const CommentList = ({ comments ,postId}: Props) => {
   
  if (comments.length === 0) {
    return (
      <p className="py-8 text-center text-gray-500">
        No comments yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment} 
          postId={postId}
        />
      ))}
    </div>
  );
};

export default CommentList;