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
      <p className="text-lg font-semibold text-gray-800 ml-2 ">
        All recently applied works - <span>{appliedJob?.length}</span>
      </p>
      {appliedJob?.map((job) => {
        return (
          <div className="flex justify-center w-full">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white w-[100%]  py-2 px-4 rounded-xl border border-gray-200 shadow-md mt-3 gap-3">
              {/* Job Info Section */}
              <div className="flex-1 space-y-1">
                {/* Time and Date */}
                <div className="flex gap-4 text-sm text-gray-400">
                  <p>{job.postTime}</p>
                  <p>{job.postDate}</p>
                </div>

                {/* Job Title */}
                <h2 className="text-lg font-semibold text-gray-800">
                  {job.title}
                </h2>

                {/* Location */}
                <p className="text-gray-700 text-sm">
                  Work Location:{" "}
                  <span className="text-gray-500">{job.address}</span>
                </p>

                {/* Salary */}
                <p className="text-sm text-gray-700 font-semibold">
                  Salary: ₹
                  <span className="text-gray-600 font-normal">
                    {job.salary}
                  </span>
                </p>
              </div>

              {/* action Buttons */}
              <div className=" flex gap-4 items-center self-start md:self-center">
                <div>
                  <p className="bg-green-100 text-green-700 font- px-3 rounded-full">
                    {job.selectedServiceProvider === userAccount?._id ? (
                      <span>Selected</span>
                    ) : job.considerations.includes(userAccount?._id) ? (
                      <span>Consider</span>
                    ) : null}
                  </p>
                </div>

                <div>
                  <button onClick={()=>{navigate(`/job/request/message/${job._id}`)}} className="bg-emerald-100 hover:bg-emerald-200 text-emerald-600 hover:text-emerald-800 px-2 py-2 rounded-md font-medium shadow-sm transition-all duration-200">View message</button>
                </div>

                {/* <Link
                  to={`/jobs/recent/detail/${job?._id}/${job?.dist?.calculated}`}
                >
                  <button className="bg-emerald-100 hover:bg-emerald-200 text-emerald-600 hover:text-emerald-800 px-5 py-2 rounded-md font-medium shadow-sm transition-all duration-200">
                    View
                  </button>
                </Link> */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default AppliedWorks;
