import { useNavigate } from "react-router-dom";
import { useCreatePostMutation } from "../../services/postApi";

interface Props {
  images: File[];
  caption: string;
}

const CreatePostFooter = ({
  images,
  caption,
}: Props) => {

    const[createPost]=useCreatePostMutation()
    const navigate=useNavigate()
  const handlePost = async () => {
    try {
        const formData = new FormData();
    
        formData.append("caption", caption);
    
        images.forEach((image) => {
          formData.append("images", image);
        });
    

         await createPost(formData).unwrap()
        navigate("/")
    } catch (error) {
        console.log(error)
    }
    // createPost(formData)
  };



  return (
    <button
      onClick={handlePost}
      disabled={!images.length}
      className="w-full bg-blue-600 text-white py-3 rounded-lg disabled:bg-gray-300"
    >
      Post
    </button>
  );
};

export default CreatePostFooter;