interface Props {
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
}

const ImageUploader = ({ setImages }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setImages(Array.from(e.target.files));
  };

  return (
    <label className="border-2 border-dashed rounded-lg p-10 flex flex-col items-center cursor-pointer">
      <span className="text-gray-500 mb-2">
        Select Images
      </span>

      <input
        type="file"
        multiple
        hidden
        accept="image/*"
        onChange={handleChange}
      />
    </label>
  );
};

export default ImageUploader;