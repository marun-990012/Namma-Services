import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as TablerIcons from "@tabler/icons-react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { fetchAccount } from "../../redux/slices/profileSlice";
import menu from "../../routes/menu.json";

export default function Sidebar() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAccount());
  }, [dispatch]);

  const userAccount = useSelector((state) => state.profile)?.data;

  // Combine tabler and heroicons into one icon map
  const iconMap = {
    ...TablerIcons,
    PencilSquareIcon,
  };

  const filteredLinks = menu.filter(
    (link) =>
      !link.permission || link.permission.includes(userAccount?.userType)
  );

  console.log(filteredLinks);
  return (
    <div className="min-h-screen w-fit px-3 py-6 bg-gray-100 rounded-[10px] rounded-tl-[1px] shadow-md border border-white flex flex-col items-center">
      {/* Top window controls */}
      {/* <PencilSquareIcon className="w-5 h-5 mb-4 text-gray-500" /> */}

      <div className="flex justify-center mb-6 p-1 rounded-full">
        <div className="flex gap-1 justify-center items-center">
          <div className="bg-red-500 w-[12px] h-[12px] rounded-full border-2 border-white"></div>
          <div className="bg-yellow-400 w-[12px] h-[12px] rounded-full border-2 border-white"></div>
          <div className="bg-green-400 w-[12px] h-[12px] rounded-full border-2 border-white"></div>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col items-center gap-6 w-full">
        {filteredLinks.map(({ name, path, icon, iconFilled, hoverColor }) => {
          const isActive = location.pathname === path;
          const Icon = iconMap[icon];
          const IconFilled = iconMap[iconFilled];

          return (
            <div key={name} className="flex flex-col items-center group">
              <Link
                to={path}
                className={`relative flex items-center justify-center w-10 h-10 rounded-xl transition-colors ${
                  isActive
                    ? "bg-white shadow"
                    : `bg-[#f7f7f7] text-gray-500 hover:bg-white hover:shadow`
                }`}
              >
                <span className="relative w-6 h-6">
                  {Icon && (
                    <Icon
                      className={` absolute inset-0 w-6 h-6 transition-opacity duration-200 ${
                        isActive
                          ? "opacity-0"
                          : "opacity-100 text-gray-500 group-hover:opacity-0"
                      }`}
                      stroke={2}
                    />
                  )}
                  {IconFilled && (
                    <IconFilled
                      className={`absolute inset-0 w-6 h-6 transition-opacity duration-200 ${
                        isActive
                          ? `opacity-100 ${hoverColor}`
                          : `opacity-0 group-hover:opacity-100 ${hoverColor}`
                      }`}
                      stroke={2}
                    />
                  )}
                </span>
              </Link>
              <p className="mt-1 text-[12px] font-medium text-center text-gray-700">
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
