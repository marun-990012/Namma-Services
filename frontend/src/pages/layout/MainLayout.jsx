import { Outlet, Link , useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "./SideBar";
import { logout } from "../../redux/slices/authSlice";
import { fetchAccount } from "../../redux/slices/profileSlice";
import Navbar from "./Navbar";

function MainLayout() {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const loginDetail = useSelector((state) => {
  //   return state.auth;
  // });

  // console.log(loginDetail);
  const isLoggedIn = localStorage.getItem("token")

  // console.log(isLoggedIn);

  // const handleLogout = async() => {
  // await dispatch(logout());
  //   // dispatch(fetchAccount());
  //   navigate("/login");
  // };

  return (
    <div className="min-h-screen bg-[#e3e7ef]">
      {/* Top Navigation Bar */}
      {isLoggedIn && (
        <div className="bg-white shadow rounded-b-sm text-black fixed top-0 left-0 w-full h-10 flex items-center justify-between px-4 shadow z-50">
          <Navbar/>
        </div>
      )}

      {/* Page Content Below the Navbar */}
      <div className="flex pt-11 ">
        {/* Sidebar */}
        {isLoggedIn && (
          <div className=" ml-1 rounded-[10px] shadow fixed left-0  z-40 ">
            
            <Sidebar />
          </div>
        )}

        {/* Main Content Area */}
        <div className=" px-2 w-full ml-23 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default MainLayout;
