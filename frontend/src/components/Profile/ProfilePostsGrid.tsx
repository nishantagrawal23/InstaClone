import type { ProfilePostType } from "../../Types/profile";
import EmptyPosts from "./EmptyPosts";
import ProfilePostCard from "./ProfilePostCard";



type Props = {
  posts: ProfilePostType[];
};

const ProfilePostsGrid = ({ posts }: Props) => {
  if (!posts.length) {
    return <EmptyPosts />;
  }

  return (
    <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:gap-2">
      {posts.map((post,index) => (
        <ProfilePostCard
          key={index}
          post={post}
        />
      ))}
    </div>
  );
};

export default ProfilePostsGrid;