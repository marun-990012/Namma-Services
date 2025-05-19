import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { showJobPostDetail,considerServiceProvider,selectServiceProvider } from "../../redux/slices/jobPostSlice";
import { fetchServiceProviders } from "../../redux/slices/userSlice";
import { listAddress } from "../../redux/slices/profileAddressSlice";
function JobConsider(){
  const {id} = useParams();
  const dispatch = useDispatch();

   useEffect(() => {
    if(id){
      dispatch(showJobPostDetail(id));
    }
    dispatch(fetchServiceProviders());
    dispatch(listAddress());
  }, [dispatch, id]);

   const jobPost = useSelector((state) => state.jobs).job;
    const users = useSelector((state) => state.users).data;
    const addresses = useSelector((state) => state.address).addressList;
  
    const serviceProviderIds = jobPost?.considerations;
    // console.log(jobPost)
  
  const serviceProviders = users.filter(user =>
    serviceProviderIds?.includes(user._id.toString())
  );
  // console.log(serviceProviders);
  
  const requestedUsers = serviceProviders.map(user => {
    const address = addresses.find(addr => addr.userId === user._id);
    return {
      ...user,
      address: address || null // attach address if found, otherwise null
    };
  });

    return(
        <div className="mt-4 space-y-4 max-w-6xl mx-auto px-2">
      {requestedUsers.map((user, index) => (
        <div key={user?._id} className=" px-4 py-3 rounded-lg border border-gray-300 shadow flex items-center gap-4">
  <img
    src={user?.profileImage}
    alt="Profile"
    className="w-12 h-12 rounded-full object-cover"
  />
  <div className="flex-1">
    <p className="font-semibold text-gray-800">{user?.name}</p>
    <p className="text-sm text-gray-500">{user?.address?.address}</p>
    <p className="text-sm font-medium text-gray-700">Rating 4.5</p>
  </div>

   <div className="flex gap-1">
  <button  className="bg-green-400 hover:bg-green-500 text-white px-3 py-1 text-sm rounded">
    consider
  </button>
   <button  className="bg-green-400 hover:bg-green-500 text-white px-3 py-1 text-sm rounded">
    Select
  </button>
    <button className="bg-green-400 hover:bg-green-500 text-white px-3 py-1 text-sm rounded">
    View
  </button>
   </div>

</div>
))}


    </div>
)
}
export default JobConsider;