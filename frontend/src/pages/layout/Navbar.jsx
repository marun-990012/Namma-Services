import { useEffect } from "react";
import {CirclePower,Kanban } from 'lucide-react';
import {Link, useNavigate } from "react-router-dom";
import { IconBellFilled } from "@tabler/icons-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notificationCount = useSelector((state) => state.notifications?.unreadCount);
  const isLoggedIn = localStorage.getItem('token');

useEffect(() => {
  if (!isLoggedIn) {
    navigate("/login");
  }
}, [isLoggedIn, navigate]);

const handleLogout = () => {
  dispatch({ type: 'LOGOUT' }); // triggers rootReducer reset
  localStorage.removeItem("token"); // optional cleanup
  localStorage.removeItem("isLoggedIn");
  navigate("/login");
};


  return (
    <div className="flex items-center justify-between w-full">
    
      <div className="flex items-center gap-6">
        <p className="flex items-center">Namma Services</p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <Link to="/notifications" className="relative text-yellow-700 hover:text-blue-600 transition">
          <IconBellFilled size={24} />
          {/* {notificationCount > 0 && ( */}
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {notificationCount}
            </span>
          {/* )} */}
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center border border-gray-300 text-gray-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-red-100 transition"
        >
        <CirclePower size={18} className="mr-1"/>  Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
