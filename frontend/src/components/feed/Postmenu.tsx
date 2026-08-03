import { FiTrash2 } from "react-icons/fi";
import { useDeletePostMutation } from "../../services/postApi";


type Props = {
  postId: string;
  onClose: () => void;
};

const PostMoreMenu = ({ postId, onClose }: Props) => {
  const [deletePost, { isLoading }] = useDeletePostMutation();

  const handleDelete = async () => {
    try {
      await deletePost(postId).unwrap();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="absolute right-4 top-12 z-50 w-40 rounded-lg border bg-white shadow-lg">
      <button
        onClick={handleDelete}
        disabled={isLoading}
        className="flex w-full items-center gap-2 px-4 py-3 text-red-500 hover:bg-red-50"
      >
        <FiTrash2 />
        {isLoading ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};

export default PostMoreMenu;