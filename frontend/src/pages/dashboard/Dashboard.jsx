import { Star } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppliedWorks from "../job-post/AppliedWorks";
import CompletedWorks from "../job-post/CompletedWorks";
import { fetchJobList } from "../../redux/slices/jobPostSlice";
import { fetchAccount } from "../../redux/slices/profileSlice";
import { fetchRevenue } from "../../redux/slices/transactionSlice";
function DashBoard() {
  const dispatch = useDispatch();
  const detailRef = useRef(null);
  const [workList, setWorkList] = useState("applied");

  const scrollToDetail = () => {
    detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setWorkList("completed");
  };

  useEffect(() => {
    dispatch(fetchJobList());
    dispatch(fetchAccount());
    dispatch(fetchRevenue());
  }, [dispatch]);

 
  
  const revenue = useSelector((state)=> state.transactions?.revenue?.totalRevenue);
  console.log(revenue);
  const jobList = useSelector((state) => state.jobs)?.data;
  const userAccount = useSelector((state) => state.profile)?.data;
  console.log(userAccount.userType)

  const completedJobs = jobList.filter(
    (job) =>
      job.workStatus == "completed" &&
      job.selectedServiceProvider == userAccount?._id &&
      job.jobRequests?.some((req) => req.serviceProvider === userAccount?._id)
  );
  //  console.log(completedJobs)
  const totalEarnings = completedJobs.reduce((acc, cv) => {
    return acc + cv.salary;
  }, 0);

  //  console.log(totalEarnings)
  return (
    <div className="bg-gray-100 flex flex-col gap-3 justify-center items-center border-3 border-white p-10 pt-3 rounded-[8px] w-full mb-4">
      {/* <div className="flex flex-col lg:flex-row  items-center gap-4 w-full"> */}
        {/* Total Earnings Card */}
        {/* <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md border border-gray-200">
          <p className="text-lg font-semibold text-gray-800">Total Earnings</p>
          <div className="mt-4 flex justify-center">
            <p className="text-center text-gray-600">
              <span className="text-base">Earnings to date</span>
              <br />
              <span className="text-4xl font-bold text-yellow-500">
                ₹{totalEarnings}
              </span>
            </p>
          </div>
          <div className="text-center mt-6">
            <button
              onClick={scrollToDetail}
              className="cursor-pointer bg-yellow-400 hover:bg-yellow-500 transition duration-300 w-full py-2 rounded-xl text-white text-base font-semibold shadow hover:shadow-lg"
            >
              View Earning History
            </button>
          </div>
        </div> */}

        {/* Reviews and Ratings Card */}
        {/* <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md border border-gray-200">
          <p className="text-lg font-semibold text-gray-800">
            Reviews & Ratings
          </p>
          <div className="mt-4 flex flex-col gap-4 md:flex-row md:justify-between">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} color="#FACC15" /> // amber-400
              ))}
              <span className="ml-2 text-2xl font-medium text-gray-700">
                4.5
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-base text-gray-500">Total Reviews</span>
              <span className="text-4xl font-bold text-yellow-500">123</span>
            </div>
          </div>
          <div className="text-center mt-6">
            <button className="cursor-pointer bg-yellow-400 hover:bg-yellow-500 transition duration-300 w-full py-2 rounded-xl text-white text-base font-semibold shadow hover:shadow-lg">
              View All Reviews
            </button>
          </div>
        </div> */}
      {/* </div> */}

      <div ref={detailRef} className="w-full scroll-mt-11 mt-4">
        <div className="flex items-center justify-between">
          <div className=" bg-white w-108 flex justify-between p-2 rounded border shadow-md border-gray-100">
          <button
            onClick={() => {
              setWorkList("applied");
            }}
            className={
              workList == "applied"
                ? "cursor-pointer bg-yellow-400 hover:bg-yellow-500 transition duration-300 text-white py-1  w-40 rounded"
                : "cursor-pointer text-yellow-500 py-1  w-40 rounded"
            }
          >
            Applied works
          </button>
          <button
            onClick={() => {
              setWorkList("completed");
            }}
            className={
              workList == "completed"
                ? "cursor-pointer bg-yellow-400 hover:bg-yellow-500 transition duration-300 text-white py-1  w-40 rounded"
                : "cursor-pointer text-yellow-500 py-1  w-40 rounded"
            }
          >
            Completed works
          </button>
          <button
            onClick={() => {
              setWorkList("pending");
            }}
            className={
              workList == "pending"
                ? "cursor-pointer bg-yellow-400 hover:bg-yellow-500 transition duration-300 text-white py-1  w-40 rounded"
                : "cursor-pointer text-yellow-500 py-1  w-40 rounded"
            }
          >
            Pending work
          </button>
        </div>

        <div className="flex h-full gap-3">
          <div className="bg-white shadow-md border-gray-100 rounded h-full py-2 flex px-3 gap-3 flex items-center justify-center">
             <div className="flex flex-col justify-center items-center">
              <p className="text-gray-500 text-[13px]">Total Revenue</p>
              <p className="font-bold text-yellow-500">₹{revenue}</p>
             </div>
            <button className="cursor-pointer bg-green-400 hover:bg-yellow-500 transition duration-300 text-white py-[2px] px-3 rounded shadow">View transactions </button>
          </div>
          
          <div className="bg-white shadow-md border-gray-100 rounded h-full py-2 flex px-3 gap-3 flex items-center justify-center">
             <div className="flex flex-col justify-center items-center">
              <div className="flex items-center space-x-1">
                    {[0, 1, 2, 3, 4].map((_, idx) => {
                      const isFilled = idx + 1 <= 4;
                      const isHalf =
                        !isFilled &&
                        4 > idx &&
                        4 < idx + 1;

                      return (
                        <div key={idx}>
                          <Star
                            size={18}
                            color={isFilled || isHalf ? "#e8c008" : "#d1d5db"}
                            fill={
                              isFilled
                                ? "#e8c008"
                                : isHalf
                                ? "url(#half)"
                                : "none"
                            }
                          />
                        </div>
                      );
                    })}
                    <svg width="0" height="0">
                      <defs>
                        <linearGradient id="half">
                          <stop offset="50%" stopColor="#e8c008" />
                          <stop offset="50%" stopColor="transparent" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="text-gray-600 text-xs ">
                      {/* {averageRating.toFixed(1)} */}
                      {4}
                    </span>
                  </div>
              <p className="text-gray-500">reviews <span className="font-bold text-green-500">120</span></p>
             </div>
            <button className="cursor-pointer bg-green-400 hover:bg-yellow-500 transition duration-300 text-white py-[2px] px-4 rounded shadow">All reviews</button>
          </div>
        </div>

        </div>

        <div className="mt-2">
          {workList == "applied" ? <AppliedWorks /> : <CompletedWorks />}
        </div>
      </div>
    </div>
  );
}
export default DashBoard;
