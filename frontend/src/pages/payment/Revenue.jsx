function Revenue() {
  return (
    <div>
      <div className="bg-white p-4 pb-5 pt-3 rounded-2xl shadow-md w-full max-w-md border border-gray-200">
        <p className="text-lg font-semibold text-gray-800">Total Earnings</p>
        <div className="mt-4 flex justify-center">
          <p className="text-center text-gray-600">
            <span className="text-base">Earnings to date</span>
            <br />
            <span className="text-4xl font-bold text-yellow-500">
              ₹{1200}
            </span>
          </p>
        </div>
        <div className="text-center mt-6">
          <button
            // onClick={scrollToDetail}
            className="cursor-pointer bg-yellow-400 hover:bg-yellow-500 transition duration-300 w-full py-2 rounded-xl text-white text-base font-semibold shadow hover:shadow-lg"
          >
            View Earning History
          </button>
        </div>
      </div>
    </div>
  );
}
export default Revenue;
