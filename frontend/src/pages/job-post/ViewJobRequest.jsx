import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BadgeCheck,
  Star,
  MessageSquareShare,
  SendHorizontal,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  showJobPostDetail,
  replyToServiceProvider,
} from "../../redux/slices/jobPostSlice";
import { fetchServiceProviders } from "../../redux/slices/userSlice";
import { fetchAccount } from "../../redux/slices/profileSlice";
function ViewJobRequest() {
  const { userId, id } = useParams();
  const dispatch = useDispatch();

  const [replyMessage, setReplyMessage] = useState("");

  useEffect(() => {
    dispatch(showJobPostDetail(id));
    dispatch(fetchServiceProviders());
    dispatch(fetchAccount());
  }, [dispatch]);

  const jobPost = useSelector((state) => state.jobs).job;
  const users = useSelector((state) => state.users).data;
  const userAccount = useSelector((state) => state.profile).data;
  console.log(userAccount);

  
  const requestedServiceProvider = users.find((user) => {
    return user._id == userId;
  });

  const requestMessages = jobPost?.jobRequests?.find((message) => {
    return message.serviceProvider == userId;
  });

  console.log(requestMessages?.messages);

  const handleSendReply = async (e) => {
    e.preventDefault();
    const formData = {
      serviceProvider: userId,
      sender: userAccount?._id,
      reply: replyMessage,
    };

    try {
      const res = await dispatch(replyToServiceProvider({ id, formData })).unwrap();
      setReplyMessage("");
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="flex justify-center items-center border-3 border-white p-10 pt-4 rounded-[8px] mb-2">
      <div className="w-[90%]">
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
            <button className="cursor-pointer px-4 py-[2px] bg-[#facc15] hover:bg-[#edc10f] rounded-[6px] outline-none">
              Consider
            </button>
            <button onClick={()=>{}} className="cursor-pointer px-4 py-[2px] bg-[#22c55e] hover:bg-[#1cb856] text-white rounded-[6px] outline-none">
              Select
            </button>
          </div>
        </div>

        <div className="flex justify-center items-start w-full mt-6">
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
                  <span className="hover:underline cursor-pointer">
                    Job done: 40
                  </span>
                  <span className="hover:underline cursor-pointer">
                    Reviews: 120
                  </span>
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
    </div>
  );
}
export default ViewJobRequest;
