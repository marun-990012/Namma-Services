import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { createOrder, verifyPayment } from "../../redux/slices/paymentSlice";
import { fetchWallet } from "../../redux/slices/WalletSlice";
import { useRazorpayPayment } from "../../hooks/useRazorpayPayment";
import { usePaymentHandler } from "../../hooks/usePaymentHandlers";

function AddCoins() {
  

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const [coin, setCoin] = useState(0);
  const amount = coin * 10;

  // const { triggerPayment } = useRazorpayPayment();
  const {payment} = usePaymentHandler(from);

  const handleBuyCoins = async (e) => {
    e.preventDefault();

    await payment(coin,'wallet');
  };

  return (
    <div className="inset-0 fixed z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm">
      <div className="relative max-w-md mx-auto p-6 bg-gradient-to-br from-yellow-100 via-white to-green-100 rounded-2xl shadow-lg border border-gray-200">
        {/* Close Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-1 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold focus:outline-none"
          aria-label="Close Recharge Form"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Recharge Your Wallet
        </h2>

        <form onSubmit={handleBuyCoins} className="space-y-5">
          <div>
            <label
              htmlFor="coins"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Enter Number of Coins
            </label>
            <input
              type="number"
              id="coins"
              placeholder="e.g., 100"
              className="w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              onChange={(e) => setCoin(Number(e.target.value))}
            />
          </div>

          <div className="bg-yellow-50 border border-yellow-200 px-4 py-3 rounded-lg shadow-inner">
            <p className="text-sm text-gray-700">
              💰 <span className="font-medium">Total Payable Amount:</span> ₹
              <span id="amount">{amount}</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">* 1 Coin = ₹10</p>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-2.5 rounded-lg text-lg font-semibold transition duration-200"
          >
            Buy Coins
          </button>
        </form>

        <p className="text-xs text-gray-400 mt-4 text-center">
          Coins can be used for booking services, promotions & more!
        </p>
      </div>
    </div>
  );
}

export default AddCoins;
