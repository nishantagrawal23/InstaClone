import { useGetPostsQuery } from "../services/postApi";
import PostCard from "../components/feed/PostCard";
import type { PostInterface } from "../Types/post";

const FeedPage = () => {
  const { data: posts, isLoading, error } = useGetPostsQuery(undefined);
  
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>  please login first.</h1>;
  }

  return (
    <div className="mx-auto max-w-xl py-8">
      {posts?.map((post:PostInterface) => (
        <PostCard
          key={post.post_id}
          post={post}
        />
      ))}
    </div>
  );
};

export default FeedPage;