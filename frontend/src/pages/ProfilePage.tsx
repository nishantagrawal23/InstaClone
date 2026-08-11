
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfilePostsGrid from "../components/Profile/ProfilePostsGrid";
import ProfileTabs from "../components/Profile/ProfileTabs";
import { useGetProfileQuery } from "../services/authApi";
import { useGetMyPostsQuery } from "../services/postApi";

const ProfilePage = () => {

  const { data: profile, isLoading: profileLoading } =
  useGetProfileQuery(undefined);

const { data: posts = [], isLoading: postsLoading } =
  useGetMyPostsQuery(undefined);
 
  if (profileLoading) {
  return <div>Loading...</div>;
}
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-5xl px-4 py-8">
        
        <ProfileHeader profile={profile} />

        <ProfileTabs/>

        <ProfilePostsGrid posts={posts} />
      </div>
    </div>
  );
};

export default ProfilePage;