import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { BadgeCheck } from "lucide-react";
import * as TablerIcons from "@tabler/icons-react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { fetchAccount } from "../../redux/slices/profileSlice";
import { listCategories } from "../../redux/slices/serviceCategorySlice";
import menu from "../../routes/menu.json";

export default function Sidebar() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAccount());
    dispatch(listCategories());
  }, [dispatch]);

  const userAccount = useSelector((state) => state.profile)?.data;
  const services = useSelector((state) => state.services)?.data;

  const myServiceType = services.find((service) => {
    return service._id == userAccount?.serviceType;
  });
  console.log(myServiceType);

  console.log(userAccount);

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
          const isActive = location.pathname.startsWith(path);
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
        <div className="relative flex flex-col items-center">
          <p className="text-[25px] text-gray-600">...</p>

          <div className="relative group">
            <img
              className="w-12 h-12 rounded-full border-3 border-yellow-100"
              src={userAccount?.profileImage}
              alt="User"
            />

            {/* Tooltip */}
            <div className="absolute top-1/2 left-full ml-3 -translate-y-1/2 px-3 py-2 bg-gray-500 text-black text-sm rounded shadow-lg opacity-0 group-hover:opacity-100 transition duration-200 z-10 whitespace-nowrap pointer-events-none">
              <p className="text-white flex items-center">
                {userAccount?.name}
                <span>
                  <BadgeCheck size={18} color="yellow" className="ml-1" />
                </span>
              </p>
              <p className="text-white capitalize">
                {userAccount?.userType}{" "}
                <span className="text-yellow-300">{myServiceType?.name}</span>
              </p>

              {/* Arrow */}
              <div className="absolute top-1/2 left-0 -ml-1 -translate-y-1/2 w-2 h-2 bg-gray-500 rotate-45 origin-center"></div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
