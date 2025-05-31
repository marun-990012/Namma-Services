import { Link, useLocation } from "react-router-dom";
import {
  IconLayoutDashboard,
  IconLayoutDashboardFilled,
  IconBriefcase,
  IconBriefcaseFilled,
  IconUser,
  IconUserFilled,
  IconSettings,
  IconSettingsFilled,
} from "@tabler/icons-react";

const menu = [
  {
    name: "Dashboard",
    path: "/",
    icon: IconLayoutDashboard,
    iconFilled: IconLayoutDashboardFilled,
    hoverColor: "group-hover:text-green-500 text-green-500",
  },
  {
    name: "My Jobs",
    path: "/job/posts",
    icon: IconBriefcase,
    iconFilled: IconBriefcaseFilled,
    hoverColor: "group-hover:text-orange-500 text-orange-500",
  },
  {
    name: "Profile",
    path: "/profile",
    icon: IconUser,
    iconFilled: IconUserFilled,
    hoverColor: "group-hover:text-[#009fb0] text-[#009fb0]",
  },
  {
    name: "Settings",
    path: "/settings",
    icon: IconSettings,
    iconFilled: IconSettingsFilled,
    hoverColor: "group-hover:text-purple-500 text-purple-500",
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="min-h-screen w-fit px-3 py-6 bg-gray-100 rounded-[10px] rounded-tl-[1px] shadow-md border border-white flex flex-col items-center">
      {/* Top window controls */}
      <div className="flex justify-center mb-6 p-1 rounded-full">
        <div className="flex gap-1 justify-center items-center">
          <div className="bg-red-500 w-[10px] h-[10px] rounded-full"></div>
          <div className="bg-yellow-400 w-[10px] h-[10px] rounded-full"></div>
          <div className="bg-green-400 w-[10px] h-[10px] rounded-full"></div>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col items-center gap-6 w-full">
        {menu.map(({ name, path, icon: Icon, iconFilled: IconFilled, hoverColor }) => {
          const isActive = location.pathname === path;
          return (
            <div key={name} className="flex flex-col items-center group">
              <Link
                to={path}
                className={`relative flex items-center justify-center w-10 h-10 rounded-xl transition-colors ${
                  isActive
                    ? "bg-white shadow"
                    : "text-gray-500 hover:bg-white hover:shadow"
                }`}
              >
                <span className="relative w-6 h-6">
                  <Icon
                    className={`absolute inset-0 w-6 h-6 transition-opacity duration-200 ${
                      isActive
                        ? "opacity-0"
                        : `opacity-100 group-hover:opacity-0`
                    }`}
                    stroke={2}
                  />
                  <IconFilled
                    className={`absolute inset-0 w-6 h-6 transition-opacity duration-200 ${
                      isActive
                        ? `opacity-100 ${hoverColor}`
                        : `opacity-0 group-hover:opacity-100 ${hoverColor}`
                    }`}
                    stroke={2}
                  />
                </span>

                {/* Tooltip */}
                {/* <span className="absolute left-14 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                  {name}
                </span> */}
              </Link>

              <p
                className={`mt-1 text-[12px] font-medium text-center ${
                  isActive ? hoverColor.split(" ")[1] : "text-gray-700"
                }`}
              >
                {name}
              </p>
            </div>
          );
        })}

        {/* User Avatar */}
        <div className="flex flex-col items-center">
          <p className="text-[25px] text-gray-600">...</p>
          <img
            className="w-12 h-12 rounded-full border-3 border-white"
            src="https://res.cloudinary.com/dxludspye/image/upload/v1747306608/Namma-Services/rpkkgdua0dnhpt2hwstr.jpg"
            alt="User"
          />
        </div>
      </nav>
    </div>
  );
}
