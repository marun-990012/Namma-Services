import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppliedWorks from "../job-post/AppliedWorks";
import CompletedWorks from "../job-post/CompletedWorks";
import { fetchJobList } from "../../redux/slices/jobPostSlice";
import { fetchAccount } from "../../redux/slices/profileSlice";
import { fetchRevenue } from "../../redux/slices/transactionSlice";
import { fetchReviews } from "../../redux/slices/reviewRatingSlice";

function DashBoard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const jobList = useSelector((state) => state.jobs)?.data;
  const userAccount = useSelector((state) => state.profile)?.data;
  const reviews = useSelector((state) => state.review)?.reviews;
  

  const averageRating = reviews.length? reviews.reduce((acc, cv) => acc + cv.rating, 0) / reviews.length: 0;
  
useEffect(()=>{
  dispatch(fetchReviews(userAccount._id));
},[dispatch])

  const completedJobs = jobList.filter(
    (job) =>
      job.workStatus == "completed" &&
      job.selectedServiceProvider == userAccount?._id &&
      job.jobRequests?.some((req) => req.serviceProvider === userAccount?._id)
  );
 
  const totalEarnings = completedJobs.reduce((acc, cv) => {
    return acc + cv.salary;
  }, 0);

  return (
    <div className="bg-gray-100 flex flex-col gap-3 justify-center items-center border-3 border-white p-10 pt-3 rounded-[8px] w-full mb-4">
      
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
            <button onClick={()=>{navigate('/payment', { state: { type: 'Salary', ts: Date.now() } })}} className="cursor-pointer bg-green-400 hover:bg-yellow-500 transition duration-300 text-white py-[2px] px-3 rounded shadow">View transactions </button>
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
                      {averageRating.toFixed(1)}
                    
                    </span>
                  </div>
              <p className="text-gray-500">reviews <span className="font-bold text-green-500">{reviews?.length}</span></p>
             </div>
            <button onClick={()=>{navigate(`/total/reviews/${userAccount?._id}`)}} className="cursor-pointer bg-green-400 hover:bg-yellow-500 transition duration-300 text-white py-[2px] px-4 rounded shadow">All reviews</button>
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
