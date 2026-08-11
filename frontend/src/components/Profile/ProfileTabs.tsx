import { useState } from "react";
import { FiGrid, FiBookmark, FiUser } from "react-icons/fi";

const tabs = [
  {
    id: "posts",
    label: "Posts",
    icon: FiGrid,
  },
  // {
  //   id: "saved",
  //   label: "Saved",
  //   icon: FiBookmark,
  // },
  // {
  //   id: "tagged",
  //   label: "Tagged",
  //   icon: FiUser,
  // },
];

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="mb-8 border-t border-gray-200">
      <div className="flex justify-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 border-t-2 px-6 py-4 text-sm font-medium transition ${
                isActive
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-black"
              }`}
            >
              <Icon size={18} />
              <span className="hidden sm:block">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileTabs;