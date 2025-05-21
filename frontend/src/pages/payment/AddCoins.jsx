import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createOrder,verifyPayment } from "../../redux/slices/WalletSlice";
function AddCoins({ show, onClose }) {

  const [coin, setCoin] = useState(0);
  const amount = coin * 10;

  const dispatch = useDispatch();
  const { orderData } = useSelector((state) => state.wallet);

  const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true); // Already loaded
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

  useEffect(() => {
    if (orderData) {
      openRazorpay(orderData);
    }
  }, [orderData]);

//   const handleBuy = () => {
//     dispatch(createOrder(amount));
//   };

  const openRazorpay = (data) => {
    const options = {
      key: "rzp_test_d8jU7S0YhIAw1x",
      amount: data.amount,
      currency: data.currency || "INR",
      name: "Devknus",
      description: "Wallet Top-Up",
      order_id: data.id,

      handler: async(response) => {
        try {
            const res = await dispatch(verifyPayment({ response, amount })).unwrap();
            toast.success('successfully coins added in wallet ');
            onClose();
        } catch (error) {
            toast.error('error while adding coins in wallet ')
        }

      },

      theme: {
        color: "#5f63b8",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }; 


  const handleBuyCoins = async(e) => {
    e.preventDefault();

     const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    dispatch(createOrder(amount));
  };

  return (
    <div className="inset-0 fixed z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm">
      <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-yellow-100 via-white to-green-100 rounded-2xl shadow-lg border border-gray-200">
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
