type Profile = {
  name: string;
  username: string;
  bio: string | null;
};

type Props = {
  profile: Profile;
};

const ProfileBio = ({ profile }: Props) => {
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          {profile.name}
        </h2>

        <p className="text-sm text-gray-500">
          @{profile.username}
        </p>
      </div>

      <p className="max-w-xl whitespace-pre-line text-sm leading-6 text-gray-700">
        {profile.bio}
      </p>
    </div>
  );
};

export default ProfileBio;