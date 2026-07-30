
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostActions from "./PostActions";
import PostInfo from "./PostInfo";
import type { PostInterface } from "../../Types/post";

type Props = {
  post: PostInterface;
};

const PostCard = ({ post }: Props) => {
  return (
    <div className="mb-8 rounded-lg border border-gray-300 bg-white">
      <PostHeader post={post} />

      <PostImage post={post} />

      <PostActions post={post} />

      <PostInfo post={post} />
    </div>
  );
};

export default PostCard;