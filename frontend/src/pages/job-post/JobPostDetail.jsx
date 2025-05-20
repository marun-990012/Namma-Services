import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { BadgeCheck, Star,UserRound } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { showJobPostDetail } from "../../redux/slices/jobPostSlice";
import { fetchServiceProviders } from "../../redux/slices/userSlice";
import JobRequests from "./JobRequests";
import JobConsider from "./JobConsider";
function JobPostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(id);
  const location = useLocation();

  const [considered, setConsidered] = useState(() =>
    location.pathname.startsWith("/job/post/details/considers")
  );
  const [requested, setRequested] = useState(() =>
    location.pathname.startsWith("/job/post/details/requests")
  );

  useEffect(() => {
    setConsidered(location.pathname.startsWith("/job/post/details/considers"));
    setRequested(location.pathname.startsWith("/job/post/details/requests"));
  }, [location.pathname]);

  useEffect(() => {
      dispatch(showJobPostDetail(id));
      dispatch(fetchServiceProviders());
    }, [dispatch]);
  
    const jobPost = useSelector((state) =>state.jobs).job;
    const users = useSelector((state) => state.users).data;
    
    const selectedServiceProvider = users.find((user)=>{
      return user._id == jobPost.selectedServiceProvider;
    });

    console.log(selectedServiceProvider)

  return (
    <div className="flex justify-center items-center border-3 border-white p-10 pt-4 rounded-[8px] mb-2">
      <div className="w-[90%]">
        <div>
          <button
            onClick={() => {
              navigate('/job/posts');
            }}
            className="bg-gray-300 hover:bg-[#b4b9c1] px-4 rounded cursor-pointer"
          >
            Back
          </button>
        </div>

       <div className="flex justify-center items-start w-full mt-6">
  <div className="flex flex-col lg:flex-row w-full max-w-6xl justify-between gap-3">
    {/* Left Section */}
    <div className="rounded-xl shadow-md bg-white p-5 w-[70%]  flex flex-col gap-2">
      <p className="text-[17px]">
        Title: <span className="text-gray-400">{jobPost.title}</span>
      </p>
      <p className="text-[17px]">
        Description:{" "}
        <span className="text-gray-400">
          {jobPost.description}
        </span>
      </p>
      <p className="text-[17px] break-words">
        Work location:{" "}
        <span className="text-gray-400">
          {jobPost.address}
        </span>
      </p>
      <p className="text-[17px]">
        Salary: Rs. <span className="text-gray-400">{jobPost.salary}</span>
      </p>
      <p className="text-[17px]">
        Work Status: <span className="text-gray-400">{jobPost.workStatus}</span>
      </p>

      <div className="mt-5 w-[37%] flex flex-row justify-between">
        <button className="bg-yellow-400 hover:bg-yellow-500 px-4 rounded-[4px] cursor-pointer">
          Edit Post
        </button>
        <button className="bg-red-500 hover:bg-red-600 px-4 py-1 text-white rounded-[4px] cursor-pointer">
          Delete Post
        </button>
      </div>
    </div>

    {/* Right Section */}
    {/* jobPost.selectedServiceProvider */}
    {jobPost.selectedServiceProvider ? (
      <div className="w-full lg:max-w-[30%] bg-white rounded-xl shadow-md overflow-hidden">
      <div className="relative">
        <img
          className="w-full h-48 object-cover"
          src={selectedServiceProvider?.profileImage}
          alt="User profile"
        />
        <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-1 py-[2px] rounded">
          Selected for work
        </span>
      </div>

      <div className="p-4 pt-2">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold flex justify-between">
          <p className="text-[12px]">Electrician</p>
          <p className="flex">
            {[...Array(5)].map((_, i) => (
              <Star size={16} key={i} color="#ecd909" />
            ))}
            <span className="ml-2">4.5</span>
          </p>
        </div>
        <p className="mt-[1px] text-[20px] text-black flex items-center">
          {selectedServiceProvider?.name} <BadgeCheck size={20} color="#06f" className="ml-2" />
        </p>
        <p className="mt-2 text-gray-500">Phone: {selectedServiceProvider?.phoneNumber}</p>
        <p className="mt-1 text-gray-500">Email: {selectedServiceProvider?.email}</p>
      </div>
    </div>
    ):(
      <div className="w-full lg:max-w-[30%] bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
  <div className="flex flex-col items-center p-6">
    <div className="w-36 h-36 flex items-center justify-center bg-gray-100 rounded-full mb-4">
      <UserRound size={72} className="text-gray-400" />
    </div>
    <p className="text-gray-500 text-center text-sm">No Candidate Selected</p>
  </div>
</div>

    )}

  </div>
</div>


        {/* requested users list */}
        <div className="flex justify-center w-full mt-7">
          <div className="bg-white w-full px-6 shadow-md rounded-[8px] p-4 ">
            <div className="bg-green-200 w-60 flex justify-between p-2 rounded">
              <button
                onClick={() => {
                  navigate(`/job/post/details/requests/${id}`);
                }}
                className={
                  requested
                    ? "cursor-pointer bg-green-400 hover:bg-green-500 text-white py-1  w-27 rounded"
                    : "cursor-pointer text-green-600 py-1  w-27 rounded"
                }
              >
                Requested
              </button>
              <button
                onClick={() => {
                  navigate(`/job/post/details/considers/${id}`);
                }}
                className={
                  considered
                    ? "cursor-pointer bg-green-400 hover:bg-green-500 text-white py-1  w-27 rounded"
                    : "cursor-pointer text-green-600 py-1  w-27 rounded"
                }
              >
                Considered
              </button>
            </div>

            <div>
              {requested && <JobRequests />}

              {considered && <JobConsider />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default JobPostDetail;
