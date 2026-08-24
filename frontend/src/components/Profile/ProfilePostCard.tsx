import { FiHeart, FiMessageCircle } from "react-icons/fi";
import type { ProfilePostType } from "../../Types/profile";



type Props = {
  post: ProfilePostType;
};

const ProfilePostCard = ({ post }: Props) => {
  return (

    <div className="group relative aspect-square cursor-pointer overflow-hidden bg-gray-100">
      <img
        src={post.post_images[0].url}
        alt="post"
        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
      />

      <div className="absolute inset-0 flex items-center justify-center gap-6 bg-black/40 opacity-0 transition group-hover:opacity-100">
        <div className="flex items-center gap-2 text-white">
          <FiHeart />
          <span>{post.likeCount}</span>
        </div>

        <div className="flex items-center gap-2 text-white">
          <FiMessageCircle />
          <span>{post.commentCount}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePostCard;