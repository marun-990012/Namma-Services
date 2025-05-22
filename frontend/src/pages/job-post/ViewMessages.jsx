import { fetchAccount } from "../../redux/slices/profileSlice";
import { showJobPostDetail } from "../../redux/slices/jobPostSlice";
import { useParams, useNavigate,useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BadgeCheck,
  Star,
  MessageSquareShare,
  SendHorizontal,
} from "lucide-react";
function ViewMessages(){
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
   useEffect(()=>{
        if(id){
        dispatch(showJobPostDetail(id));
        }
        dispatch(fetchAccount());
    },[dispatch]);

    const userAccount = useSelector((state)=>state.profile)?.data;
    const jobPost = useSelector((state) =>  state.jobs)?.job;

    const messages = jobPost?.jobRequests?.find((request)=>{
        return request.serviceProvider == userAccount?._id;
    })?.messages

//    console.log(messages);
const handleSendMessage = ()=>{}
    return(
        <div className="flex flex-col gap-4 justify-center items-center border-3 border-white p-4 rounded-[8px] w-full mb-4">
             <div className="flex flex-col lg:flex-row w-full max-w-6xl justify-between gap-3">
            <div className="w-full lg:max-w-[30%] bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              {/* Image with status badge */}
              {/* <div className="relative">
                <img
                  className="w-full h-48 object-cover"
                  src={requestedServiceProvider?.profileImage}
                  alt="User profile"
                />
                <span className="absolute bottom-2 right-2 bg-[#ffac00] text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
                  Requested for work
                </span>
              </div> */}

              {/* Details */}
              <div className="p-4 space-y-2">
                {/* Role & Rating */}
                <div className="flex justify-between items-center text-sm text-indigo-600 font-semibold">
                  <span className="uppercase text-xs tracking-wide">
                    Electrician
                  </span>
                  
                </div>

                

                {/* Contact
                <p className="text-sm text-gray-500">
                  Phone: {requestedServiceProvider?.phoneNumber}
                </p>
                <p className="text-sm text-gray-500">
                  Email: {requestedServiceProvider?.email}
                </p> */}

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
                      {msg.message}
                    </div>
                  </div>
                ))}
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
    )
}
export default ViewMessages;