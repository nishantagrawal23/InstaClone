import { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import type { PostInterface } from "../../Types/post";
import PostMoreMenu from "./Postmenu";


type Props = {
  post: PostInterface;
};

const PostHeader = ({ post }: Props) => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="flex items-center justify-between p-4 relative">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E8DDD3] text-[#6D5D50] font-semibold">
          {post.user_name.charAt(0).toUpperCase()}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[#3F3A36]">
            {post.user_username}
          </h3>

          <p className="text-sm text-[#8A817C]">
            {post.user_name}
          </p>
        </div>  
      </div>

      <div className="relative">
        <button onClick={() => setOpenMenu(!openMenu)}>
          <FiMoreHorizontal
            size={20}
            className="cursor-pointer text-[#8A817C] hover:text-[#3F3A36]"
          />
        </button>

        {openMenu && (
          <PostMoreMenu
            postId={post.post_id}
            onClose={() => setOpenMenu(false)}
          />
        )}
      </div>
    </div>
  );
};

export default PostHeader;