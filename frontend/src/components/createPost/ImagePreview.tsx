interface Props {
  images: File[];
  onRemove: (index: number) => void;
}

const ImagePreview = ({ images, onRemove }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative"
        >
          <img
            src={URL.createObjectURL(image)}
            alt=""
            className="rounded-lg h-40 w-full object-cover"
          />

          <button
            onClick={() => onRemove(index)}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImagePreview;