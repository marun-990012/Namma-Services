import { Star } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppliedWorks from "../job-post/AppliedWorks";
import CompletedWorks from "../job-post/CompletedWorks";
import { fetchJobList } from "../../redux/slices/jobPostSlice";
import { fetchAccount } from "../../redux/slices/profileSlice";
function DashBoard() {
    const dispatch = useDispatch();
    const detailRef = useRef(null);
    const [workList,setWorkList] = useState('applied');

  const scrollToDetail = () => {
    detailRef.current?.scrollIntoView({ behavior: 'smooth',block: 'start' });
  };

    useEffect(()=>{
        dispatch(fetchJobList());
        dispatch(fetchAccount());
    },[dispatch]);

    const jobList = useSelector((state)=>state.jobs)?.data;
    const userAccount = useSelector((state)=>state.profile)?.data;
    console.log(userAccount)

   const completedJobs = jobList.filter(job =>
    job.workStatus == "completed" && job.selectedServiceProvider == userAccount?._id  &&
    job.jobRequests?.some(req => req.serviceProvider === userAccount?._id)
   );
   console.log(completedJobs)
   const totalEarnings = completedJobs.reduce((acc,cv)=>{
    return acc+cv.salary
   },0);

   console.log(totalEarnings)
  return (
    <div className="flex flex-col gap-5 justify-center items-center border-3 border-white p-4 rounded-[8px] w-full mb-4">
      
        <div className=" flex justify-center itmes-center gap-4 w-full">
          {/* Total Earnings Card */}
          <div className="bg-white p-6 rounded-2xl shadow-md w-109 ">
            <p className="text-lg font-semibold text-gray-800">
              Total Earnings
            </p>
            <div className="mt-4 flex justify-center">
              <p className="text-center text-gray-600">
                <span className="text-base">Earnings to date</span>
                <br />
                <span className="text-4xl font-bold text-[#10B981]">₹{totalEarnings}</span>
              </p>
            </div>
            <div className="text-center mt-6">
              <button onClick={scrollToDetail} className="cursor-pointer bg-[#5D3FD3] hover:bg-[#4338CA] transition-all duration-300 w-full py-2 rounded-lg text-white text-base font-medium">
                View Earning History
              </button>
            </div>
          </div>

          {/* Reviews and Ratings Card */}
          <div className="bg-white p-6 rounded-2xl shadow-md w-109">
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
              <div>
                <p className="text-gray-600 text-center md:text-right">
                 <div className="flex flex-col items-center">
                  <span className="text-base">Total Reviews</span>
                  <span className="text-4xl font-bold text-[#10B981]">123</span>
                 </div>
                </p>
              </div>
            </div>
            <div className="text-center mt-6">
              <button className="cursor-pointer bg-[#5D3FD3] hover:bg-[#4338CA] transition-all duration-300 w-full py-2 rounded-lg text-white text-base font-medium">
                View All Reviews
              </button>
            </div>
          </div>
        </div>

        <div ref={detailRef} className="w-[90%] mt- scroll-mt-7  p-4">
            <div className=" bg-white w-80 flex justify-between p-2 rounded border border-gray-100">
            <button onClick={()=>{setWorkList('applied')}} className={workList=='applied' ? "cursor-pointer bg-green-400 hover:bg-green-500 text-white py-1  w-40 rounded": "cursor-pointer text-green-600 py-1  w-40 rounded"}>Applied works</button>
            <button onClick={()=>{setWorkList('completed')}} className={workList=='completed' ? "cursor-pointer bg-green-400 hover:bg-green-500 text-white py-1  w-40 rounded": "cursor-pointer text-green-600 py-1  w-40 rounded"}>Completed works</button>
            </div>

          <div className="mt-2">
            {workList=='applied'? (<AppliedWorks/>) : (<CompletedWorks/>)}
          </div>
        </div>
      
    </div>
  );
}
export default DashBoard;
