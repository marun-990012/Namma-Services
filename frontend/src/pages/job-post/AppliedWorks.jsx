import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchJobList } from "../../redux/slices/jobPostSlice";
import { fetchAccount } from "../../redux/slices/profileSlice";
function AppliedWorks() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchJobList());
    dispatch(fetchAccount());
  }, [dispatch]);

  const jobList = useSelector((state) => state.jobs)?.data;
  const userAccount = useSelector((state) => state.profile)?.data;
  // console.log(userAccount)

  const appliedJob = jobList.filter(
    (job) =>
      job.workStatus !== "completed" &&
      job.jobRequests?.some((req) => req.serviceProvider === userAccount?._id)
  );
  console.log(appliedJob);
  return (
    <div>
  <p className="text-lg font-semibold text-gray-800 ml-2">
    All recently applied works - 
    <span className="bg-green-200 text-green-700 px-4 border border-green-300 rounded-full ml-2">
      {appliedJob?.length}
    </span>
  </p>

  {appliedJob?.length > 0 ? (
    appliedJob.map((job) => (
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
              Work Location: <span className="text-gray-500">{job.address}</span>
            </p>

            <p className="text-sm text-gray-700 font-semibold">
              Salary: ₹<span className="text-green-600 font-semibold">{job.salary}</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 items-center self-start md:self-center">
            <div>
              <p className="bg-green-100 text-green-700 font-medium px-3 py-1 rounded-full text-sm">
                {job.selectedServiceProvider === userAccount?._id ? (
                  <span>Selected</span>
                ) : job.considerations.includes(userAccount?._id) ? (
                  <span>Under Consideration</span>
                ) : null}
              </p>
            </div>

            <div>
              <button
                onClick={() => {
                  navigate(`/job/request/message/${job._id}`);
                }}
                className="bg-emerald-100 hover:bg-emerald-200 text-emerald-600 hover:text-emerald-800 px-3 py-2 rounded-md font-medium shadow-sm transition-all duration-200 text-sm"
              >
                View response
              </button>
            </div>
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
      <p className="text-lg font-semibold text-gray-600">No applied jobs found</p>
      <p className="text-sm text-gray-500 mt-1">
        Jobs you apply for will be listed here.
      </p>
    </div>
  )}
</div>

  );
}
export default AppliedWorks;
