import { Outlet,Link } from "react-router-dom";

function MainLayout(){
    return(
        <div className="min-h-screen bg-[#e3e7ef]">
  {/* Top Navigation Bar */}
  {/* <div className="bg-white text-black fixed top-0 left-0 w-full h-10 flex items-center px-4 shadow z-50">
    <Link to="/login" className="mr-4 hover:underline">
      Login
    </Link>
    <Link to="/register" className="hover:underline">
      Register
    </Link>
  </div> */}

  {/* Page Content Below the Navbar */}
  <div className="flex pt-12 ">
    {/* Sidebar */}
    {/* <div className="w-[7%] h-[100vh] bg-white ml-2 rounded-[10px] shadow fixed left-0  z-40 ">
      <div className="p-4 text-gray-800">Sidebar</div>
    </div> */}

    {/* Main Content Area */}
    <div className=" p-4 w-full ">
      <Outlet />
    </div>
  </div>
</div>

    )
}
export default MainLayout;