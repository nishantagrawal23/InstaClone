type Props = {
  posts: number;
  followers: number;
  following: number;
};

const ProfileStats = ({
  posts,
  followers,
  following,
}: Props) => {
  return (
    <div className="flex items-center gap-8">
      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-900">
          {posts}
        </h3>

        <p className="text-sm text-gray-500">
          Posts
        </p>
      </div>

      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-900">
          {followers}
        </h3>

        <p className="text-sm text-gray-500">
          Followers
        </p>
      </div>

      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-900">
          {following}
        </h3>

        <p className="text-sm text-gray-500">
          Following
        </p>
      </div>
    </div>
  );
};

export default ProfileStats;