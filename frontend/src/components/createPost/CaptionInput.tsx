interface Props {
  caption: string;
  setCaption: React.Dispatch<React.SetStateAction<string>>;
}

const CaptionInput = ({
  caption,
  setCaption,
}: Props) => {
  return (
    <textarea
      rows={4}
      value={caption}
      onChange={(e) => setCaption(e.target.value)}
      placeholder="Write a caption..."
      className="w-full border rounded-lg p-3 outline-none resize-none"
    />
  );
};

export default CaptionInput;