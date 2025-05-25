function Transactions(){
     const transactions = [
  { type: 'top-up', amount: 50, description: 'Added via Razorpay', date: '2025-05-21' },
  { type: 'spend', amount: 20, description: 'Job Application Fee', date: '2025-05-20' },
  { type: 'refund', amount: 10, description: 'Service Cancelled', date: '2025-05-19' },
  { type: 'refund', amount: 10, description: 'Service Cancelled', date: '2025-05-19' },
  { type: 'refund', amount: 10, description: 'Service Cancelled', date: '2025-05-19' },
  { type: 'refund', amount: 10, description: 'Service Cancelled', date: '2025-05-19' },
  { type: 'refund', amount: 10, description: 'Service Cancelled', date: '2025-05-19' },
  { type: 'refund', amount: 10, description: 'Service Cancelled', date: '2025-05-19' },
];
    return(
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
            <ul className="space-y-3 max-h-90 overflow-y-auto">
              {transactions.map((tx, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    {/* Icon */}
                    <div
                      className={`p-2 rounded-full ${
                        tx.type === "top-up"
                          ? "bg-green-100 text-green-600"
                          : tx.type === "spend"
                          ? "bg-red-100 text-red-500"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {tx.type === "top-up" && "➕"}
                      {tx.type === "spend" && "➖"}
                      {tx.type === "refund" && "🔁"}
                    </div>

                    {/* Info */}
                    <div>
                      <p className="text-sm font-medium capitalize">
                        {tx.type}
                      </p>
                      <p className="text-xs text-gray-500">
                        {tx.description || "No description"}
                      </p>
                    </div>
                  </div>

                  {/* Amount & Date */}
                  <div className="text-right">
                    <p
                      className={`text-sm font-bold ${
                        tx.type === "top-up"
                          ? "text-green-600"
                          : tx.type === "spend"
                          ? "text-red-500"
                          : "text-yellow-600"
                      }`}
                    >
                      {tx.type === "spend" ? "-" : "+"} {tx.amount} 🪙
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(tx.date).toLocaleDateString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
    )
}
export default Transactions;