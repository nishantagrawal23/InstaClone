import { useState } from "react";
import ImageUploader from "./ImageUploader";
import ImagePreview from "./ImagePreview";
import CaptionInput from "./CaptionInput";
import CreatePostFooter from "./CreatePostFooter";

const CreatePostModal = () => {
  const [images, setImages] = useState<File[]>([]);
  const [caption, setCaption] = useState("");

  
  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
      <h2 className="text-xl font-semibold text-center">
        Create New Post
      </h2>

      {images.length === 0 ? (
        <ImageUploader setImages={setImages} />
      ) : (
        <ImagePreview
          images={images}
          onRemove={(index) =>
            setImages(images.filter((_, i) => i !== index))
          }
        />
      )}

      <CaptionInput
        caption={caption}
        setCaption={setCaption}
      />

      <CreatePostFooter
        images={images}
        caption={caption}
      />
    </div>
  );
};

export default CreatePostModal;