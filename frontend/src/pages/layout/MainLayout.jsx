import { Outlet,Link } from "react-router-dom";
import { useSelector } from "react-redux";
function MainLayout(){
  const loginDetail = useSelector((state)=>{
    return state.auth;
  });

  console.log(loginDetail);
 const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || loginDetail.isLoggedIn;

  console.log(isLoggedIn);
    return(
        <div className="min-h-screen bg-[#e3e7ef]">
  {/* Top Navigation Bar */}
  {isLoggedIn && (
    <div className="bg-white text-black fixed top-0 left-0 w-full h-10 flex items-center px-4 shadow z-50">
    <Link to="/login" className="mr-4 hover:underline">
      Login
    </Link>
    <Link to="/register" className="hover:underline">
      Register
    </Link>
  </div>
  )}

  {/* Page Content Below the Navbar */}
  <div className="flex pt-12 ">
    {/* Sidebar */}
    {isLoggedIn &&(
      <div className="w-[7%] h-[100vh] bg-white ml-2 rounded-[10px] shadow fixed left-0  z-40 ">
      <div className="p-4 text-gray-800 flex flex-col gap-4">Sidebar
        <Link to="/profile" className="hover:underline">
        profile
      </Link>

      <Link to="/category/new" className="hover:underline">
        create service
      </Link>

       <Link to="/service-category" className="hover:underline">
        services
      </Link>

      <Link to="/job/post/new" className="hover:underline">
        job post
      </Link>
      
      <Link to="/jobs/recent" className="hover:underline">
        job Recent
      </Link>
      
      
      </div>
    </div>
    )}

    {/* Main Content Area */}
    <div className=" px-4 w-full ml-24 ">
      <Outlet />
    </div>
  </div>
</div>

    )
}
export default MainLayout;