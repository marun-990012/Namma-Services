import { fetchWallet } from "../../redux/slices/WalletSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";
function InsufficientCoins() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from

//   console.log(from);
  useEffect(() => {
    dispatch(fetchWallet());
  }, [dispatch]);

  const userWallet = useSelector((state) => state.wallet)?.wallet;

  const handleClose = ()=>{
    navigate(-1);
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-50 backdrop-blur-md">
      <div className="relative flex items-start gap-5 bg-yellow-50 border border-yellow-400 text-yellow-900 p-6 rounded-xl shadow-lg max-w-md mx-auto my-8">
        {/* Close Icon */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-yellow-700 hover:text-yellow-900 transition"
          aria-label="Close alert"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning Icon */}
        <AlertTriangle className="mt-1 w-7 h-7 text-yellow-600 flex-shrink-0" />

        {/* Message Content */}
        <div className="flex-1">
          <p className="font-semibold text-xl mb-1">Insufficient Coins</p>
          <p className="text-yellow-800 font-semibold mb-3">
            Your current wallet coins:{" "}
            <span className="font-extrabold text-yellow-900">0</span>
          </p>
          <p className="text-sm mb-5 leading-relaxed">
            You don't have enough coins to send a job request. Please add coins
            to proceed.
          </p>

          {/* Buttons */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={handleClose}
              className="px-5 py-2 text-sm font-medium text-yellow-800 bg-yellow-100 rounded-md hover:bg-yellow-200 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => navigate('/payment/wallet/add/coins',{ state: { from: from } })}
              className="px-5 py-2 text-sm font-semibold bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-shadow shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              Add Coins
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default InsufficientCoins;
