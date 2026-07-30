import { Link } from "react-router-dom";
import { FiLogIn, FiLogOut, FiSettings, FiUserPlus } from "react-icons/fi";

type Props = {
  isAuthenticated: boolean;
  onClose: () => void;
};

const MoreMenu = ({ isAuthenticated, onClose }: Props) => {
  const handleLogout = () => {
    console.log("Logout");

    onClose();
  };

  return (
    <div className="absolute bottom-14 left-0 w-56 rounded-xl border bg-white p-2 shadow-lg">

      {isAuthenticated ? (
        <>
          <Link
            to="/profile"
            onClick={onClose}
            className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-100"
          >
            <FiSettings />
            Settings
          </Link>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg p-3 hover:bg-gray-100"
          >
            <FiLogOut />
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            to="/login"
            onClick={onClose}
            className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-100"
          >
            <FiLogIn />
            Login
          </Link>

          <Link
            to="/register"
            onClick={onClose}
            className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-100"
          >
            <FiUserPlus />
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
};

export default MoreMenu;