import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRevenue } from "../../redux/slices/transactionSlice";
function Revenue() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    dispatch(fetchRevenue());
  },[dispatch]);

  const revenue = useSelector((state)=> state.transactions?.revenue?.totalRevenue);
  console.log(revenue);
  return (
    <div>
      <div className="bg-white p-4 pb-5 pt-3 rounded-2xl shadow-md w-full max-w-md border border-gray-200">
        <p className="text-lg font-semibold text-gray-800">Total Earnings</p>
        <div className="mt-4 flex justify-center">
          <p className="text-center text-gray-600">
            <span className="text-base">Earnings to date</span>
            <br />
            <span className="text-4xl font-bold text-yellow-500">
              ₹{revenue}
            </span>
          </p>
        </div>
        <div className="text-center mt-6">
          <button
            onClick={()=>{navigate('/payment', { state: { type: 'Salary', ts: Date.now() } })}}
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
