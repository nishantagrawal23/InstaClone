import type { PostInterface } from "../../Types/post";

type Props = {
  post: PostInterface;
};

const PostInfo = ({ post }: Props) => {
  return (
    <div className="space-y-2 px-4 pb-4">
      {/* Likes */}
      <p className="text-sm font-semibold">
        {post.likeCount} likes
      </p>

      {/* Caption */}
      {post.post_caption && (
        <p className="text-sm leading-6">
          <span className="mr-2 font-semibold">
            {post.user_username}
          </span>

          {post.post_caption}
        </p>
      )}

      {/* Comments */}
      <button
        type="button"
        className="text-sm text-gray-500 transition hover:text-gray-700"
      >
       {post.commentCount} comments
      </button>

      {/* Date */}
      <p className="text-xs uppercase tracking-wide text-gray-400">
        {new Date(post.post_createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default PostInfo;