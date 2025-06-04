import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MessageSquareShare } from "lucide-react";
import { fetchAccount } from "../../redux/slices/profileSlice";
import { sendJobRequest } from "../../redux/slices/jobPostSlice";
import { fetchWallet } from "../../redux/slices/WalletSlice";
import toast from "react-hot-toast";

function SendJobRequest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    dispatch(fetchAccount());
    dispatch(fetchWallet());
  }, [dispatch]);

  const userAccount = useSelector((state) => state.profile)?.data;
  const userWallet = useSelector((state) => state.wallet)?.wallet;
  console.log(userAccount);

  const handleSendRequest = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("message required");
      return;
    }
    setShowPopup(true);
  };

  const handleConfirm = async () => {
    if (!userAccount || !userAccount._id) {
      toast.error("Profile not loaded yet. Please wait and try again.");
      return;
    }
    const formData = {
      serviceProvider: userAccount._id,
      messages: [
        {
          message: message,
          sender: userAccount._id,
        },
      ],
    };

    const toastId = toast.loading("Sending request...");
    setShowPopup(false);
    try {
      const res = await dispatch(sendJobRequest({ id, formData })).unwrap();
      console.log("Success response:", res); // <--- add this
      toast.dismiss(toastId);
      toast.success("Job request sent successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.error || "Failed to send request");
    }
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 pt-5 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 shadow-lg w-full mx-auto">
      <div className="ml-2 w-full">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="bg-gray-300 hover:bg-[#b4b9c1] px-4 rounded cursor-pointer"
        >
          Back
        </button>
      </div>
      {/* Request Box */}
      <div className="bg-white w-full p-6 rounded-xl  shadow-md mt-3">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Send Job Request
        </h2>

        {/* Message Preview */}
        <div className="h-60 overflow-y-auto bg-gray-50 border border-gray-300 rounded-lg p-4 text-sm text-gray-700 mb-5">
          {message ? (
            message
          ) : (
            <span className="text-gray-400">
              Your message will appear here...
            </span>
          )}
        </div>

        {/* Input + Button */}
        <form onSubmit={handleSendRequest} className="flex items-center gap-3">
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
            className={`ml-1 px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-200
    ${
      !userAccount || !userAccount._id
        ? "bg-gray-300 cursor-not-allowed"
        : "bg-[#4338CA] hover:bg-[#3730A3] active:bg-[#312E81] shadow-md hover:shadow-lg"
    }`}
          >
            Send Request
          </button>
        </form>
      </div>

      {/* Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-md border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Confirm Job Request
            </h3>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-5">
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Wallet Balance:</span>{" "}
                <span className="text-green-600 font-bold">
                  {userWallet?.coins}
                </span>
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Required Coins:</span>{" "}
                <span className="text-yellow-500 font-bold">1</span>
              </p>
            </div>

            <p className="text-gray-600 text-sm mb-6">
              Are you sure you want to send this job request?{" "}
              <span className="font-semibold text-gray-800">1 coin</span> will
              be deducted from your wallet.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 rounded-lg text-white bg-yellow-400 hover:bg-yellow-500"
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
