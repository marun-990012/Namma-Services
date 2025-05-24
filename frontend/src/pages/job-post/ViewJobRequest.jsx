import { useEffect, useState ,useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BadgeCheck,
  Star,
  MessageSquareShare,
  SendHorizontal,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  showJobPostDetail,
  replyToServiceProvider,
  checkIfWorking,
} from "../../redux/slices/jobPostSlice";
import { fetchServiceProviders } from "../../redux/slices/userSlice";
import { fetchAccount } from "../../redux/slices/profileSlice";
import { useSelectServiceProvider } from "../../hooks/useSelectServiceProvider";
import { useConsiderServiceProvider } from "../../hooks/useConsiderServiceProvider";
import { usewithdrawConsider } from "../../hooks/useWithdrawConsider";
function ViewJobRequest() {
  const { userId, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { select } = useSelectServiceProvider();
  const { consider } = useConsiderServiceProvider();
  const { withdraw } = usewithdrawConsider();

  const [replyMessage, setReplyMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
   const messagesEndRef = useRef(null);


  useEffect(() => {
    dispatch(showJobPostDetail(id));
    dispatch(fetchServiceProviders());
    dispatch(fetchAccount());
    dispatch(checkIfWorking(userId));
  }, [dispatch]);

  const jobPost = useSelector((state) => state.jobs);
  const users = useSelector((state) => state.users).data;
  const userAccount = useSelector((state) => state.profile).data;
  console.log(jobPost.isWorking);

  const requestedServiceProvider = users.find((user) => {
    return user._id == userId;
  });

  const requestMessages = jobPost?.job?.jobRequests?.find((message) => {
    return message.serviceProvider == userId;
  });

  console.log(requestMessages?.messages);

  const isConsidered = jobPost?.job?.considerations?.includes(userId);
  // console.log(isConsidered);

  useEffect(() => {
      // Scroll to bottom when messages update
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [requestMessages]);

  const handleSendReply = async (e) => {
    e.preventDefault();
    const formData = {
      serviceProvider: userId,
      sender: userAccount?._id,
      reply: replyMessage,
    };

    try {
      const res = await dispatch(
        replyToServiceProvider({ id, formData })
      ).unwrap();
      setReplyMessage("");
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  const handleConsider = async () => {
    const formData = { id, serviceProviderId: userId };
    consider(formData);
  };

  const handleWithdrawConsider = async () => {
    const formData = { id, serviceProviderId: userId };
    withdraw(formData);
    // alert('hi')
  };

  const handleSelect = (serviceProviderId) => {
    // setSelectedServiceProviderId(serviceProviderId); // store ID
    setShowPopup(true); // show confirmation popup
  };

  const handleConfirm = async () => {
    setShowPopup(false);
    const formData = { id, selectedServiceProviderId: userId };
    select(formData);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex justify-center items-center border-3 border-white p-10 pt-4 rounded-[8px] mb-2">
      <div className="w-full">
        <div className="flex justify-between">
          <div>
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="bg-gray-300 hover:bg-[#b4b9c1] px-4 rounded cursor-pointer"
            >
              Back
            </button>
          </div>

          <div className="flex gap-2">
            {isConsidered ? (
              <button
                onClick={() => handleWithdrawConsider()}
                className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 border border-red-300 rounded-xl transition duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Withdraw Consideration
              </button>
            ) : (
              <div className="relative group inline-block">
                {/* Button */}
                <button
                  disabled={jobPost.isWorking}
                  onClick={() => handleConsider()}
                  className={`flex items-center gap-2 px-5 py-2 font-medium rounded-lg shadow-sm transition duration-200 ease-in-out focus:outline-none focus:ring-2
             ${
              jobPost.isWorking
               ? "bg-gray-300 text-gray-600 cursor-not-allowed focus:ring-gray-300"
               : "bg-yellow-400 hover:bg-yellow-500 text-black focus:ring-yellow-300"
            }`} 
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 17v-6h13M5 17H3v-6h2m0 6V9.5a1.5 1.5 0 011.5-1.5H7"
                    />
                  </svg>
                  Consider
                </button>

                {/* Tooltip */}
                {jobPost.isWorking && (
                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-gray-100 text-xs rounded-md shadow-lg py-1.5 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-gray-700">
                    User is already working on another job
                  </div>
                )}
              </div>
            )}

            <div className="relative group inline-block">
              <button
                disabled={!!jobPost.isWorking}
                onClick={handleSelect}
                className={`flex items-center gap-2 px-5 py-2 font-medium rounded-lg shadow-sm transition duration-200 ease-in-out focus:outline-none focus:ring-2 ${
                  jobPost.isWorking
                    ? "bg-gray-400 text-white cursor-not-allowed focus:ring-gray-300"
                    : "bg-green-500 hover:bg-green-600 text-white focus:ring-green-400"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Select
              </button>

              {jobPost.isWorking && (
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-gray-100 text-xs rounded-md shadow-lg py-1.5 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-gray-700">
                  User is already working on another job
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center items-start w-full mt-3">
          <div className="flex flex-col lg:flex-row w-full max-w-6xl justify-between gap-3">
            <div className="w-full lg:max-w-[30%] bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              {/* Image with status badge */}
              <div className="relative">
                <img
                  className="w-full h-48 object-cover"
                  src={requestedServiceProvider?.profileImage}
                  alt="User profile"
                />
                <span className="absolute bottom-2 right-2 bg-[#ffac00] text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
                  Requested for work
                </span>
              </div>

              {/* Details */}
              <div className="p-4 space-y-2">
                {/* Role & Rating */}
                <div className="flex justify-between items-center text-sm text-indigo-600 font-semibold">
                  <span className="uppercase text-xs tracking-wide">
                    Electrician
                  </span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} color="#facc15" />
                    ))}
                    <span className="text-gray-600 text-xs ml-1">4.5</span>
                  </div>
                </div>

                {/* Name */}
                <p className="text-lg font-medium text-gray-800 flex items-center">
                  {requestedServiceProvider?.name}{" "}
                  <BadgeCheck size={18} color="#2563eb" className="ml-2" />
                </p>

                {/* Contact */}
                <p className="text-sm text-gray-500">
                  Phone: {requestedServiceProvider?.phoneNumber}
                </p>
                <p className="text-sm text-gray-500">
                  Email: {requestedServiceProvider?.email}
                </p>

                {/* Stats */}
                <div className="flex justify-between text-sm pt-2 text-gray-600 font-medium">
                  <Link to={`/total/completed/job/${userId}`}>
                    <span className="hover:underline cursor-pointer">
                      Job done: 40
                    </span>
                  </Link>

                  <Link to={`/total/reviews/${userId}`}>
                    <span className="hover:underline cursor-pointer">
                      Reviews: 120
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="rounded-xl shadow-md bg-white p-5 w-[70%] flex flex-col justify-between gap-2 h-[70vh]">
              {/* Messages Area */}

              <div className="flex flex-col overflow-y-auto flex-1">
                {requestMessages?.messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`flex ${
                      msg.sender === userAccount?._id
                        ? "justify-end"
                        : "justify-start"
                    } px-4 py-2`}
                  >
                    <div
                      className={`p-3 max-w-[80%] rounded-xl shadow-sm text-sm text-gray-800 ${
                        msg.sender === userAccount?._id
                          ? "bg-[#dcf8c6] rounded-br-sm"
                          : "bg-white border border-gray-200 rounded-tl-sm"
                      }`}
                    >
                      {msg.message}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input Area */}
              <form onSubmit={handleSendReply}>
                <div className="w-full flex items-center border border-gray-300 rounded-full shadow px-3 py-2">
                  {/* Message Icon */}
                  <span className="bg-[#e0e0e0] p-2 rounded-full flex items-center justify-center">
                    <MessageSquareShare size={20} color="#444" />
                  </span>
                  <input
                    type="text"
                    placeholder="Type a message"
                    className="flex-grow bg-transparent outline-none px-3 text-sm"
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                  />

                  <button
                    type="submit"
                    className="ml-2 p-2 rounded-full bg-[#25D366] flex items-center justify-center"
                  >
                    <SendHorizontal size={20} color="#ffffff" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* show popup */}
      {showPopup && (
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
      )}
    </div>
  );
}
export default ViewJobRequest;
