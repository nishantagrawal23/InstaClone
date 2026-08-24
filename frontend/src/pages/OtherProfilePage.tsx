
import { useParams } from "react-router-dom";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfilePostsGrid from "../components/Profile/ProfilePostsGrid";
import ProfileTabs from "../components/Profile/ProfileTabs";
import { useGetUserProfileQuery } from "../services/authApi";
import { useGetUserPostsQuery } from "../services/postApi";


const OtherProfilePage = () => {

const { id } = useParams();

const { data: profile ,isLoading:profileLoading} =
  useGetUserProfileQuery(id!);

const { data: posts = [] } =
  useGetUserPostsQuery(id!);
 
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

export default OtherProfilePage;