import { useState } from "react";
import {
  FiHome,
  FiSearch,
  FiCompass,
  FiMessageCircle,
  FiHeart,
  FiPlusSquare,
  FiUser,
  FiMenu,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";
import MoreMenu from "./MoreMenu";

const menuItems = [
  { name: "Home", path: "/", icon: <FiHome size={26} /> },
  // { name: "Search", path: "/search", icon: <FiSearch size={26} /> },
  // { name: "Explore", path: "/explore", icon: <FiCompass size={26} /> },
  { name: "Messages", path: "/messages", icon: <FiMessageCircle size={26} /> },
  { name: "Notifications", path: "/notifications", icon: <FiHeart size={26} /> },
  { name: "Create", path: "/create", icon: <FiPlusSquare size={26} /> },
  { name: "Profile", path: "/profile", icon: <FiUser size={26} /> },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  // Later this will come from Redux
  const isAuthenticated = false;

  return (
    // <aside className="sticky top-0 flex h-screen w-64 flex-col border-r border-gray-200 bg-white px-4 py-8">
     <aside className="sticky top-0 hidden h-screen w-64 flex-col border-r border-gray-200 bg-white px-4 py-8 md:flex">
      <h1 className="mb-12 px-3 text-3xl font-bold italic">
        Instagram
      </h1>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-xl px-3 py-3 text-lg transition
               ${
                 isActive
                   ? "bg-gray-100 font-semibold"
                   : "hover:bg-gray-100"
               }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="relative mt-auto">
        <button
          onClick={() => setOpen(!open)}
          className="flex w-full items-center gap-4 rounded-xl px-3 py-3 text-lg hover:bg-gray-100"
        >
          <FiMenu size={24} />
          More
        </button>

        {open && (
          <MoreMenu
            isAuthenticated={isAuthenticated}
            onClose={() => setOpen(false)}
          />
        )}
      </div>
    </aside>
  );
};

export default Sidebar;