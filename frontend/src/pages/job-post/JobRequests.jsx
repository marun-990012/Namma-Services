import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { showJobPostDetail,considerServiceProvider,selectServiceProvider } from "../../redux/slices/jobPostSlice";
import { fetchServiceProviders } from "../../redux/slices/userSlice";
import { listAddress } from "../../redux/slices/profileAddressSlice";
import { useSelectServiceProvider } from "../../hooks/useSelectServiceProvider";

function JobRequests() {
  const {id} = useParams();
  const {select} = useSelectServiceProvider();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedServiceProviderId, setSelectedServiceProviderId] = useState(null);


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

  const serviceProviderIds = jobPost?.jobRequests
  ?.filter(req => !jobPost.considerations?.includes(req.serviceProvider.toString()) && req.serviceProvider.toString() != jobPost.selectedServiceProvider?.toString())
  ?.map(req => req.serviceProvider.toString());


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

// const handleConsider = async(serviceProviderId)=>{
//    try {
//       const res = await dispatch(considerServiceProvider({id,serviceProviderId})).unwrap();
//       toast.success("Service provider has been consider for job.");
//     } catch (error) {
//       toast.error(error.message || "Failed to consider the service provider. Please try again.");
//     }
// }

// const handleSelect = (serviceProviderId) => {
//   setSelectedServiceProviderId(serviceProviderId); // store ID
//   setShowPopup(true); // show confirmation popup
// };

//  const handleConfirm = async() => {
//     setShowPopup(false);
//     const formData = {id,selectedServiceProviderId}
//     select(formData)
//   };
  
//  const handleCancel = () => {
//     setShowPopup(false);
//   };
  return (
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

    <button onClick={()=>{
      navigate(`/view/job/request/${user?._id}/${id}`);
      }} className="bg-green-400 hover:bg-green-500 text-white px-3 py-1 text-sm rounded">
    View Request
  </button>
   </div>

</div>
))}

{/* show popup */}
 {/* {showPopup && (
  <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm">
    <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4 border border-purple-200">
      <h2 className="text-lg font-semibold text-purple-700 mb-3">
        Confirm Selection
      </h2>
      <p className="text-sm sm:text-base mb-6 leading-relaxed text-gray-600">
        Are you sure you want to assign this service provider to the job?
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={handleCancel}
          className="px-4 py-2 text-sm font-medium rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="px-4 py-2 text-sm font-semibold rounded-md bg-yellow-400 text-purple-800 hover:bg-yellow-500 transition"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
)} */}

    </div>
  );
}

export default JobRequests;
