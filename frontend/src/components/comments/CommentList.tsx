
import type { commentInterface } from "../../Types/comment";
import CommentItem from "./CommentItem";

type Props = {
  comments: commentInterface[];
};

const CommentList = ({ comments }: Props) => {
    console.log(comments)
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
        />
      ))}
    </div>
  );
};

export default CommentList;