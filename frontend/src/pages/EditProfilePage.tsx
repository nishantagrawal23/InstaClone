
import EditProfileForm from "../components/editProfile/EditProfileForm";
import { useGetProfileQuery } from "../services/authApi";

const EditProfilePage = () => {
  const { data: profile, isLoading } = useGetProfileQuery(undefined);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-semibold">
          Edit Profile
        </h1>

        <EditProfileForm profile={profile} />
      </div>
    </div>
  );
};

export default EditProfilePage;