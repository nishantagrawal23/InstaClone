import {
  FiCompass,
  FiHeart,
  FiHome,
  FiMessageCircle,
  FiPlusSquare,
  FiUser,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    path: "/",
    icon: <FiHome size={24} />,
  },
  {
    path: "/explore",
    icon: <FiCompass size={24} />,
  },
  {
    path: "/create",
    icon: <FiPlusSquare size={24} />,
  },
  {
    path: "/messages",
    icon: <FiMessageCircle size={24} />,
  },
  {
    path: "/profile",
    icon: <FiUser size={24} />,
  },
];

const MobileFooter = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white md:hidden">
      <div className="flex h-16 items-center justify-around">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "text-black" : "text-gray-500"
            }
          >
            {item.icon}
          </NavLink>
        ))}
      </div>
    </footer>
  );
};

export default MobileFooter;