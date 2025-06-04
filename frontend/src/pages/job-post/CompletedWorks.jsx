import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchJobList } from "../../redux/slices/jobPostSlice";
import { fetchAccount } from "../../redux/slices/profileSlice";
function CompletedWorks() {
    const dispatch = useDispatch();

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
    // console.log(appliedJob)
  return (
    <div>
  <p className="text-lg font-semibold text-gray-800 ml-2">
    All completed works - 
    <span className="bg-green-200 text-green-700 px-4 border border-green-300 rounded-full ml-2">
      {completedJobs?.length}
    </span>
  </p>

  {completedJobs?.length > 0 ? (
    completedJobs.map((job) => (
      <div key={job._id} className="flex justify-center w-full">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white w-full py-2 px-4 rounded-xl border border-gray-200 shadow-md mt-3 gap-3">
          {/* Job Info Section */}
          <div className="flex-1 space-y-1">
            <div className="flex gap-4 text-sm text-gray-400">
              <p>{job.postTime}</p>
              <p>{job.postDate}</p>
            </div>

            <h2 className="text-lg font-semibold text-gray-800">
              {job.title}
            </h2>

            <p className="text-gray-700 text-sm">
              Work Location:{" "}
              <span className="text-gray-500">{job.address}</span>
            </p>

            <p className="text-sm text-gray-700 font-semibold">
              Salary: ₹
              <span className="text-green-600 font-semibold">{job.salary}</span>
            </p>
          </div>

          {/* View Button */}
          <div className="self-start md:self-center">
            <Link to={`/jobs/recent/detail/${job?._id}/${job?.dist?.calculated}`}>
              <button className="bg-emerald-100 hover:bg-emerald-200 text-emerald-600 hover:text-emerald-800 px-5 py-2 rounded-md font-medium shadow-sm transition-all duration-200">
                View
              </button>
            </Link>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="w-full py-10 flex flex-col items-center justify-center bg-white rounded-xl shadow-inner mt-6 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-gray-400 mb-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-lg font-semibold text-gray-600">
        No completed works found
      </p>
      <p className="text-sm text-gray-500 mt-1">
        Completed jobs will appear here once work is finished and marked done.
      </p>
    </div>
  )}
</div>

  );
}
export default CompletedWorks;
