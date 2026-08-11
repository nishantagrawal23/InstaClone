import { FiCamera } from "react-icons/fi";

const EmptyPosts = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-black">
        <FiCamera size={34} />
      </div>

      <h2 className="text-2xl font-bold">
        No Posts Yet
      </h2>

      <p className="mt-2 text-gray-500">
        Share your first photo with everyone.
      </p>
    </div>
  );
};

export default EmptyPosts;