import type { PostInterface } from "../../Types/post";

type Props = {
  post: PostInterface;
};

const PostImage = ({ post }: Props) => {
  const image = post.post_images?.[0];
 
  return (
    <div className="w-full bg-gray-100">
      {image && (
        <img
          src={image.url}
          alt={`${post.user_username}'s post`}
          className="h-full w-full aspect-square object-cover"
        />
      )}
    </div>
  );
};

export default PostImage;