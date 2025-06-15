import { useEffect, useState } from "react";
import {useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { CirclePlus, CircleMinus, RotateCcw, HandCoins } from "lucide-react";
import { fetchTransactionHistory } from "../../redux/slices/transactionSlice";

function Transactions() {
 const dispatch = useDispatch();
const location = useLocation();
const { type, ts } = location.state || {};

const [transactionType, setTransactionType] = useState(type || "All");

useEffect(() => {
  dispatch(fetchTransactionHistory());
}, [dispatch]);

useEffect(() => {
  if (type) {
    setTransactionType(type);
    window.scrollTo(0, 0);
    dispatch(fetchTransactionHistory());
  }
}, [ts]);

const transactionHistory = useSelector(
  (state) => state.transactions?.histories || []
);

const filteredTransactions = () => {
  switch (transactionType) {
    case 'Wallet':
      return transactionHistory.filter(
        (ele) => ele.purpose === 'wallet_topup' || ele.purpose === 'debit_wallet'
      );

    case 'Salary':
      return transactionHistory.filter(
        (ele) => ele.purpose === 'salary_payment'
      );

    case 'All':
    default:
      return transactionHistory;
  }
};

  const transactionPurpose = ["All","Salary","Wallet"];
  
  return (
  <div className='bg-white w-[67%] p-6 rounded-2xl shadow-md border border-gray-200 space-y-4'>
    <div className="flex items-center">
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

      <div className="ml-8 border border-gray-300 px-1 rounded shadow">
        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          className="border-none outline-none bg-transparent text-gray-700 px-2 py-1"
        >
          {transactionPurpose.map((ele, index) => (
            <option key={index} className="text-gray-700">
              {ele}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div className="mt-1">
      {filteredTransactions().length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mb-2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 17v-2a4 4 0 014-4h3m4 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-sm font-medium">No transactions found</p>
          <p className="text-xs text-gray-400">Try selecting a different type or come back later.</p>
        </div>
      ) : (
        <ul className="space-y-3 max-h-95 overflow-y-auto">
          {filteredTransactions().map((tx, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-3">
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
                    <CirclePlus className="text-green-600 w-5 h-5" strokeWidth={2.5} />
                  )}
                  {tx.purpose === "salary_payment" && (
                    <HandCoins className="text-yellow-600 w-5 h-5" strokeWidth={2.5} />
                  )}
                  {tx.purpose === "debit_wallet" && (
                    <CircleMinus className="text-red-600 w-5 h-5" strokeWidth={2.5} />
                  )}
                  {tx.purpose === "refund" && (
                    <RotateCcw className="text-yellow-600 w-5 h-5" strokeWidth={2.5} />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium capitalize">{tx.purpose}</p>
                  <p className="text-xs text-gray-500">{tx.status || "No status"}</p>
                </div>
              </div>
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
      )}
    </div>
  </div>
);


}
export default Transactions;
