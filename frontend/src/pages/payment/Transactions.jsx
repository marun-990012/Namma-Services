import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import { Plus, Minus, RotateCcw, Wallet } from "lucide-react";
import { CirclePlus, CircleMinus, RotateCcw, HandCoins } from "lucide-react";
import { fetchTransactionHistory } from "../../redux/slices/transactionSlice";

function Transactions() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactionHistory());
  }, [dispatch]);

  const transactionHistory = useSelector(
    (state) => state.transactions
  )?.histories;

  return (
    <div className='bg-white w-[67%] p-6 bg-white rounded-2xl shadow-md border border-gray-200 space-y-4"'>
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>{" "}
        Transactions
      </h2>

      <div className="mt-1">
        <ul className="space-y-3 max-h-95 overflow-y-auto">
          {transactionHistory.map((tx, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-3">
                {/* Icon */}
                <div
                  className={`p-2 rounded-full ${
                    tx.purpose === "wallet_topup"
                      ? "bg-green-100"
                      : tx.purpose === "debit_wallet"
                      ? "bg-red-100"
                      : tx.purpose === "salary_payment"
                      ? "bg-yellow-100"
                      : tx.purpose === "refund"
                      ? "bg-yellow-100"
                      : "bg-gray-100"
                  }`}
                >
                  {tx.purpose === "wallet_topup" && (
                    <CirclePlus
                      className="text-green-600 w-5 h-5"
                      strokeWidth={2.5}
                    />
                  )}
                  {tx.purpose === "salary_payment" && (
                    <HandCoins
                      className="text-yellow-600 w-5 h-5"
                      strokeWidth={2.5}
                    />
                  )}
                  {tx.purpose === "debit_wallet" && (
                    <CircleMinus
                      className="text-red-600 w-5 h-5"
                      strokeWidth={2.5}
                    />
                  )}
                  {tx.purpose === "refund" && (
                    <RotateCcw
                      className="text-yellow-600 w-5 h-5"
                      strokeWidth={2.5}
                    />
                  )}
                </div>

                {/* Info */}
                <div>
                  <p className="text-sm font-medium capitalize">{tx.purpose}</p>
                  <p className="text-xs text-gray-500">
                    {tx.status || "No status"}
                  </p>
                </div>
              </div>

              {/* Amount & Date */}
              <div className="text-right">
                <p
                  className={`text-sm font-bold ${
                    tx.purpose === "wallet_topup"
                      ? "text-green-600"
                      : tx.purpose === "debit_wallet"
                      ? "text-red-500"
                      : "text-yellow-600"
                  }`}
                >
                  {tx.purpose === "debit_wallet" ? "-" : "+"} {tx.amount} 🪙
                </p>
                <p className="text-xs text-gray-400">{tx.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Transactions;
