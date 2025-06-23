
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { requestedUsers, approveAndReject, rejectedUsers } from "../../redux/slices/userSlice";
import { CheckCircle, XCircle, UserX2 } from "lucide-react";
import toast from "react-hot-toast";

function RejectedUsers() {
  const dispatch = useDispatch();
  const rejectedUserlist = useSelector((state) => state.users?.users);
  const loading = useSelector((state) => state.users?.loading);

  console.log(rejectedUserlist)

  useEffect(() => {
    dispatch(rejectedUsers());
  }, [dispatch]);


  const handleApprove = async (id) => {
  try {
    const user = await dispatch(approveAndReject({ status: false, id })).unwrap();
    if (user) {
      toast.success('User approved');
    } else {
      toast.error('Approval failed');
    }
  } catch (error) {
    toast.error('Something went wrong during approval');
  }
};


  return (
    <div className="w-full mt-6">
      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading...</p>
      ) : rejectedUserlist?.length === 0 ? (
        <div className="flex flex-col justify-center items-center py-10 text-gray-600">
          <UserX2 className="w-16 h-16 mb-4 text-gray-400" />
          <p className="text-xl font-medium">No requested users found</p>
        </div>
      ) : (
        rejectedUserlist?.map((request) => (
          <div
            key={request._id}
            className="flex justify-between items-center w-full bg-white p-4 rounded-[8px] mb-3 border border-gray-200 shadow-sm hover:shadow-md transition"
          >
            {/* User Info */}
            <div className="flex flex-col w-1/2">
              <p className="text-lg font-semibold text-gray-800">{request.name}</p>
              <p className="text-sm text-gray-500">{request.email}</p>
            </div>

            {/* Action Buttons */}
            <div className="w-[23%] flex justify-between gap-2">
              <button onClick={()=>{handleApprove(request?._id)}} className="flex items-center gap-2 px-5 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-md transition">
                <CheckCircle className="w-4 h-4" />
                Approve
              </button>
              
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default RejectedUsers;
