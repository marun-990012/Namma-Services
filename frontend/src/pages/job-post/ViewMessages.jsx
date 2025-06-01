import { fetchAccount } from "../../redux/slices/profileSlice";
import { showJobPostDetail,sendMessage } from "../../redux/slices/jobPostSlice";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MessageSquareShare,
  SendHorizontal,
} from "lucide-react";
import toast from "react-hot-toast";
function ViewMessages() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  const validation = ()=>{
    if(!message){
      return false;
    }
    return true;
  }

  useEffect(() => {
    if (id) {
      dispatch(showJobPostDetail(id));
    }
    dispatch(fetchAccount());
  }, [dispatch]);

  const userAccount = useSelector((state) => state.profile)?.data;
  const jobPost = useSelector((state) => state.jobs)?.job;

  const messages = jobPost?.jobRequests?.find((request) => {
    return request.serviceProvider == userAccount?._id;
  })?.messages;

  useEffect(() => {
    // Scroll to bottom when messages update
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  

  const handleSendMessage =(e) => {
    e.preventDefault();
    if(!validation()) return;

    const formData = {
      message :message
    }
      dispatch(sendMessage({id,formData})).unwrap();
      setMessage('');
    
  };
  return (
    <div className="bg-gray-100 flex flex-col gap-4 justify-center items-center border-3 border-white p-5 rounded-[8px] w-full mb-4 max-h-[90vh]">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl justify-between gap-3">
        {/* <div className="w-full lg:max-w-[30%] bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"> */}

        {/* Details */}
        <div className="backdrop-blur-md bg-white border border-gray-200 rounded-2xl p-6 shadow-lg space-y-6 max-w-[35%] mx-auto">
          {/* Title */}
          <div className="">
             <span className="text-xs text-gray-500 font-medium flex justify-end">
              Job Posting
            </span>

            <h2 className="text-xl font-bold text-indigo-700 tracking-wide w-[78%]">
              {jobPost.title}
            </h2>
           
          </div>

          {/* Job Information */}
          <div className="space-y-4">
            {/* Description */}
            <div className="flex flex-col">
              <span className="text-sm text-gray-400">Description</span>
              <p className="text-[15px] text-gray-700 font-medium leading-relaxed">
                {jobPost?.description}
              </p>
            </div>

            {/* Salary */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Salary</span>
              <p className="text-[15px] text-emerald-600 font-semibold">
                ₹ {jobPost?.salary}
              </p>
            </div>

            {/* Location */}
            <div className="flex gap-2 flex-col">
              <span className="text-sm text-gray-400">Location</span>
              <p className="text-[15px] text-gray-700 font-medium ">
                {jobPost?.address}
              </p>
            </div>

            {/* Request Status */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Request Status</span>
              <span
                // className={`text-sm font-semibold px-4 py-1 rounded-full shadow-sm ${
                //   true
                //     ? "bg-green-100 text-green-700"
                //     : "bg-red-100 text-red-700"
                // }`}
              >
                {jobPost?.selectedServiceProvider === userAccount?._id ? (
                  <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full shadow-sm">Selected</span>
                ) : jobPost?.considerations?.includes(userAccount?._id) ? (
                  <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full shadow-sm">Considered</span>
                ) : <span className="bg-red-100 text-red-700 px-4 py-1 rounded-full shadow-sm">not Considered</span>}
              </span>
            </div>
          </div>
        </div>

        {/* </div> */}

        <div className="rounded-xl shadow-md bg-white p-5 w-[70%] flex flex-col justify-between gap-2 h-[70vh]">
          {/* Messages Area */}

          <div className="flex flex-col overflow-y-auto flex-1">
            {messages?.map((msg) => (
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
                  {msg.message?msg.message:false}
                </div>
              </div>
            ))}

             <div ref={messagesEndRef} />
          </div>

          {/* Message Input Area */}
          <form onSubmit={handleSendMessage}>
            <div className="w-full flex items-center border border-gray-300 rounded-full shadow px-3 py-2">
              {/* Message Icon */}
              <span className="bg-[#e0e0e0] p-2 rounded-full flex items-center justify-center">
                <MessageSquareShare size={20} color="#444" />
              </span>
              <input
                type="text"
                placeholder="Type a message"
                className="flex-grow bg-transparent outline-none px-3 text-sm"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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
  );
}
export default ViewMessages;
