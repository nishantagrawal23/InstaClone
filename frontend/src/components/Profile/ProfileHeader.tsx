import ProfileStats from "./ProfileStats";
import ProfileBio from "./ProfileBio";

type Profile = {
  id: string;
  name: string;
  username: string;
  bio: string;
  avatar: string;
  posts: number;
  followers: number;
  following: number;
  isOwner: boolean;
};

type Props = {
  profile: Profile;
};


const ProfileHeader = ({ profile }: Props) => {
    
  return (
    <div className="mb-8 border-b border-gray-200 pb-8">
      <div className="flex flex-col gap-8 md:flex-row md:items-center">
        {/* Avatar */}
        <div className="flex justify-center md:justify-start">
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt={profile.name}
              className="h-32 w-32 rounded-full object-cover border"
            />
          ) : (
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#E8DDD3] text-4xl font-semibold text-[#6D5D50]">
              {profile.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-5">
          <ProfileBio profile={profile} />

          <ProfileStats
            posts={profile.posts}
            followers={profile.followers}
            following={profile.following}
          />

          <div>
            {profile.isOwner ? (
              <button className="rounded-lg bg-black px-6 py-2 text-sm font-medium text-white transition hover:bg-gray-800">
                Edit Profile
              </button>
            ) : (
              <button className="rounded-lg bg-blue-500 px-6 py-2 text-sm font-medium text-white transition hover:bg-blue-600">
                Follow
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;