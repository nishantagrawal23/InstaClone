const Divider = () => {
  return (
    <div className="my-6 flex items-center">
      <div className="h-px flex-1 bg-gray-300" />
      <span className="mx-4 text-sm text-gray-400">OR</span>
      <div className="h-px flex-1 bg-gray-300" />
    </div>
  );
};

export default Divider;