import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  showJobPostDetail,
} from "../../redux/slices/jobPostSlice";
import { fetchServiceProviders } from "../../redux/slices/userSlice";
import { listAddress } from "../../redux/slices/profileAddressSlice";
import { useSelectServiceProvider } from "../../hooks/useSelectServiceProvider";

function JobRequests() {
  const { id } = useParams();
  const { select } = useSelectServiceProvider();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedServiceProviderId, setSelectedServiceProviderId] =
    useState(null);

  useEffect(() => {
    if (id) {
      dispatch(showJobPostDetail(id));
    }
    dispatch(fetchServiceProviders());
    dispatch(listAddress());
  }, [dispatch, id]);

  const jobPost = useSelector((state) => state.jobs).job;
  const users = useSelector((state) => state.users).data;
  const addresses = useSelector((state) => state.address).addressList;

  const serviceProviderIds = jobPost?.jobRequests
    ?.filter(
      (req) =>
        !jobPost.considerations?.includes(req.serviceProvider.toString()) &&
        req.serviceProvider.toString() !=
          jobPost.selectedServiceProvider?.toString()
    )
    ?.map((req) => req.serviceProvider.toString());

  const serviceProviders = users.filter((user) =>
    serviceProviderIds?.includes(user._id.toString())
  );

  const requestedUsers = serviceProviders.map((user) => {
    const address = addresses.find((addr) => addr.userId === user._id);
    return {
      ...user,
      address: address || null, // attach address if found, otherwise null
    };
  });

  return (
    <div className="mt-4 space-y-4 max-w-6xl mx-auto px-2">
  {requestedUsers.length > 0 ? (
    <div className="">
      {requestedUsers.map((user, index) => (
        <div
          key={user?._id}
          className="px-4 py-3 rounded-lg border border-gray-300 shadow flex items-center gap-4 mt-2"
        >
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
            <button
              onClick={() => {
                navigate(`/view/job/request/${user?._id}/${id}`);
              }}
              className="bg-green-400 hover:bg-green-500 text-white px-3 py-1 text-sm rounded"
            >
              View Request
            </button>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="w-full py-10 flex flex-col items-center justify-center bg-white rounded-xl shadow-inner text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-gray-400 mb-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-lg font-semibold text-gray-600">Woops... No requests found</p>
      <p className="text-sm text-gray-500 mt-1">Check back later — new requests may appear soon.</p>
    </div>
  )}
</div>

  );
}

export default JobRequests;
