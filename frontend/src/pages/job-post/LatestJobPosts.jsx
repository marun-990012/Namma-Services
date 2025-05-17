import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import { fetchAddress } from "../../redux/slices/profileAddressSlice";
import { findNearestJobs } from "../../redux/slices/jobPostSlice";


function LatestJobPosts() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchAddress());
    },[dispatch]);

    const userAddress = useSelector((state)=> state.address)?.data?.location?.coordinates;

    // console.log(userAddress);
   useEffect(() => {
    if (userAddress && Array.isArray(userAddress) && userAddress.length >= 2) {
        dispatch(findNearestJobs({ lat:userAddress[1] , lng:userAddress[0] }));
    }
}, [userAddress, dispatch]);

    const nearestJobs = useSelector((state)=>{
        return state.jobs;
    })?.data;

    console.log(nearestJobs);
  return (
    <div className="flex justify-center items-center border-3 border-white shodow-xl rounded-[8px] p-10 mb-4">
      <div className="w-full ">
        <div>
          <p>Latest Job Posts - <span className="border border-gray-400 rounded bg-gray-300 px-3">{nearestJobs.length}</span></p>
        </div>

        {Array.isArray(nearestJobs) && nearestJobs?.map((job)=>{
            return(
            <div key={job._id} className="flex justify-center">
        <div className="flex items-center justify-between bg-white w-[90%] py-2 px-6 rounded-[8px] shadow-md mt-4">
          <div className="">
            <div className="flex gap-4 text-gray-400 text-[14px]">
                <p> {job.postTime}</p>
                <p>{job.postDate}</p>
            </div>
            <div className="">
              <p className="text-[17px] text-gray-800 font-medium">
                {job.title}
              </p> 
            </div>
            <div className="mt-1">
              <p className="text-gray-700">
                Work location:
                <span className="text-gray-500">
                  {" "}
                  {job.address}
                </span>
              </p>
            </div>
            <div className="flex gap-10 mt-1 text-sm ">
                <p className="text-gray-700 font-semibold">
                Salary: Rs. <span className="text-gray-600 font-normal">{job?.salary}</span>
              </p>
              <p className="text-gray-700 font-semibold">
                Distance: <span className="text-gray-600 font-normal">{job?.dist?.calculated} KM</span>
              </p>
              <p className="text-gray-700 font-semibold">
                Applicants:{" "}
                <span className="text-gray-600 font-normal">{job.jobRequests.length}</span>
              </p>
              <p className="text-gray-700 font-semibold">
                Considered: <span className="text-gray-600 font-normal">{job.considerations.length}</span>
              </p>
            </div>
          </div>
          <div>
            <Link to={`/jobs/recent/detail/${job._id}/${job.dist.calculated}`}>
            <button className="bg-green-300 hover:bg-green-400 text-green-600 hover:text-green-800 px-6 py-1 rounded-[6px] font-semibold shadow-sm cursor-pointer">
              View
            </button>
            </Link>
          </div>
        </div>
        </div>
            )
        })}
      </div>
    </div>
  );
}
export default LatestJobPosts;
