import { useState,useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { MessageSquareShare } from "lucide-react";
import { fetchAccount } from "../../redux/slices/profileSlice";
import { sendJobRequest } from "../../redux/slices/jobPostSlice";
import toast from "react-hot-toast";

function SendJobRequest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(()=>{
    dispatch(fetchAccount());
  },[dispatch])

  const userAccount = useSelector((state)=> {
    return state.profile}
).data;
  console.log(userAccount)


  const handleSendRequest = (e) => {
    e.preventDefault();
    if (!message.trim()){
        toast.error('message required');
        return;
    } 
    setShowPopup(true);
  };

  const handleConfirm = async() => {
     if (!userAccount || !userAccount._id) {
    toast.error("Profile not loaded yet. Please wait and try again.");
    return;
  }
    const formData = {
        serviceProvider:userAccount._id,
        messages:[
          {
            message:message,
            sender:userAccount._id
          }
        ]
    }

    const toastId = toast.loading('Sending request...');
try {
  const res = await dispatch(sendJobRequest({ id, formData })).unwrap();
   console.log('Success response:', res); // <--- add this
  toast.dismiss(toastId);
  toast.success('Job request sent successfully!');
  setShowPopup(false);
} catch (error) {
  toast.dismiss(toastId);
  toast.error(error?.error || 'Failed to send request');
}
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex flex-col justify-center items-center p-3 mb-4">
      <div className="bg-white p-5 w-120 border border-gray-300 rounded shadow">
        <p className="text-xl font-semibold mb-3">Send Job Request</p>
        <div className="border border-gray-300 rounded p-3 mt-3 h-80 w-110 overflow-y-auto">
          <p className={message ? "text-black" : "text-gray-400"}>
            {message || "Your message"}
          </p>
        </div>

        <form
          onSubmit={handleSendRequest}
          className="w-full flex mt-5 items-center"
        >
          <div className="flex items-center border border-gray-300 rounded shadow w-[365px] h-10">
            <span className="px-3 bg-[#4f2bdf] h-full flex items-center rounded-tl rounded-bl">
              <MessageSquareShare color="white" />
            </span>
            <input
              className="w-[280px] border-none outline-none pl-3 pr-2"
              type="text"
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
         <button
  type="submit"
  disabled={!userAccount || !userAccount._id}
  className={`ml-2 text-white flex items-center px-4 py-1 rounded-[6px] 
    ${!userAccount || !userAccount._id ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#4f2bdf] hover:bg-[#3e23b5]'}`}
>
  Send
</button>
        </form>
      </div>

      {/* Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-50 backdrop-blur-md">
          <div className="bg-gradient-to-br from-[#4f2bdf] via-[#6b4fd8] to-[#8e6df0] text-white p-6 rounded-xl shadow-xl max-w-md mx-auto border border-purple-200">
            <div className="mb-5">
              <p className="text-lg font-medium">
                Your Wallet Balance: <span className="font-bold text-green-200">10</span>
              </p>
              <p className="text-lg font-medium">
                Required Coins: <span className="font-bold text-yellow-300">1</span>
              </p>
            </div>

            <p className="text-sm sm:text-base mb-6 leading-relaxed text-white/90">
              Are you sure you want to send a job request? <br />
              <span className="font-semibold text-white">1 coin</span> will be deducted from your wallet.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="cursor-pointer bg-white text-[#4f2bdf] font-medium px-4 py-2 rounded-md hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="cursor-pointer bg-yellow-300 text-[#4f2bdf] font-semibold px-4 py-2 rounded-md hover:bg-yellow-400 transition-all"
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

export default SendJobRequest;
