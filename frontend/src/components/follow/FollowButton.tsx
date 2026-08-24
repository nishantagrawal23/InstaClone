import { useFollowUserMutation, useUnfollowUserMutation } from "../../services/followApi";

interface FollowButtonProps {
  userId: string;
  isFollowing: boolean;
}

const FollowButton = ({
  userId,
  isFollowing,
}: FollowButtonProps) => {
  const [followUser, { isLoading: followLoading }] =
    useFollowUserMutation();

  const [unfollowUser, { isLoading: unfollowLoading }] =
    useUnfollowUserMutation();

  const loading = followLoading || unfollowLoading;

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(userId).unwrap();
      } else {
        await followUser(userId).unwrap();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleFollow}
      disabled={loading}
      className={`rounded-md px-4 py-1 text-sm font-medium transition
        ${
          isFollowing
            ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
    >
      {loading ? "Loading..." : isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;