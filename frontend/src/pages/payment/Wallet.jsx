import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchWallet } from "../../redux/slices/WalletSlice";
import AddCoins from "../../components/popups/AddCoins";
function Wallet() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
//   const [showPopup,setShowPopup] = useState(false);
  const showPopup = location.pathname.startsWith('/payment/wallet/add/coins');

  useEffect(() => {
    dispatch(fetchWallet());
  }, [dispatch]);

  const userWallet = useSelector((state) => state.wallet)?.wallet;

  console.log(userWallet)

  const handleAddCoins = () => {
    // setShowPopup(true);
    navigate('/payment/wallet/add/coins',{ state: { from: location.pathname } });
  };
  return (
    
    <div className="w-full h-65 mx-auto p-4 bg-white rounded-2xl shadow-md border border-gray-200 space-y-3">
  <div className="flex items-center justify-between">
    <h2 className="text-xl font-semibold text-gray-800">💼 Wallet</h2>
    <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
      Active
    </span>
  </div>

  <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center text-center">
    <p className="text-gray-600 text-sm mb-1">Your Total Coins</p>
    <h3 className="text-4xl font-bold text-yellow-500">🪙 {userWallet?.coins}</h3>

  </div>

  <div className="text-center">
    {userWallet?.coins >= 1 ? (
      <p className="text-green-600 text-sm mt-1 font-medium">
        You have enough coins to send a job request.
      </p>
    ) : (
      <p className="text-red-500 text-sm mt-1 font-medium">
       Not enough coins to send a job request.
      </p>
    )}
  </div>

  <button
    onClick={handleAddCoins}
    className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-xl transition duration-200 ease-in-out shadow-sm hover:shadow-md"
  >
    Add Coins to Wallet
  </button>

  
  {showPopup && <AddCoins />}
</div>

  );
}
export default Wallet;
