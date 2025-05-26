import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate,useLocation } from "react-router-dom";
import JobRequests from "./JobRequests";
import JobConsider from "./JobConsider";
import { showJobPostDetail } from "../../redux/slices/jobPostSlice";
import InsufficientCoins from "../../components/popups/InsufficientCoins";
import { fetchWallet } from "../../redux/slices/WalletSlice";

function JobDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id,dist } = useParams();
  const [applicant,setApplicant] = useState('requested');

  const segments = location.pathname.split("/");
  const lastSegment = segments[segments.length - 1];
  const showPopup = lastSegment === "warning"; // or "warning"
  

  useEffect(() => {
    if(id){
      dispatch(showJobPostDetail(id));
    }
    dispatch(fetchWallet());
  }, [dispatch]);

  const jobPost = useSelector((state) =>  state.jobs)?.job;
  const userWallet = useSelector((state) => state.wallet)?.wallet;
  // console.log(jobPost);

  const handleSendRequest = () => {
  if (userWallet.coins > 0) {
    navigate(`/jobs/recent/request/${id}`);
  } else {
    navigate(`/jobs/recent/detail/${id}/${dist}/warning`,{ state: { from: location.pathname } });
  }
};

  return (
    <div className="flex flex-col justify-center items-center border-3 border-white rounded-[8px] p-3 mb-4">
      <div className="w-[95%] mb-3">
        <div>
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="cursor-pointer bg-gray-300 hover:bg-gray-400 px-5 rounded-[4px]"
          >
            Back
          </button>
        </div>
      </div>
      <div className="flex justify-center gap-4 w-[95%]">
        <div className="bg-white p-4 w-[80%] rounded-[8px] shadow-md min-h-[20rem] max-h-[26rem] overflow-y-auto">
          <p className="text-[18px] text-gray-800 font-semibold mb-2">
            {jobPost.title}
          </p>

          <div className="mb-2">
            <p className="text-gray-700 text-[16px] font-medium">
              Salary: Rs.{" "}
              <span className="text-gray-500 text-[18px] mt-1">{jobPost.salary}</span>
            </p>
          </div>

          <div className="mb-2">
            <p className="text-gray-700 text-[16px] font-medium">
              Description:
            </p>
            <p className="text-gray-500 text-[15px] mt-1">
             {jobPost.description}
            </p>
          </div>

          <div>
            <p className="text-gray-700 text-[16px] font-medium">
              Work Location:
            </p>
            <p className="text-gray-500 text-[15px] mt-1">
              {jobPost.address}
            </p>
          </div>

          <p className="text-gray-700 text-[16px] font-medium mt-2">
            Distance:{" "}
            <span className="text-gray-500 mt-1 bg-green-100 text-green-800 text-sm px-3 py-1 rounded-md mb-3 mt-3">
              {dist} KM from your location
            </span>
          </p>
          <div className="mt-4">
            <button onClick={()=>{handleSendRequest()}} className="cursor-pointer bg-green-400 hover:bg-green-500 text-white px-2 py-1 border-4 rounded-[5px] border-green-200">
              Send Request
            </button>
          </div>
        </div>

        <div className="bg-white p-4 w-[100%] rounded-[8px]">
          <div className=" flex justify-between bg-[#e1e7fd] p-2 w-60 ">
            <button onClick={()=>{setApplicant('requested')}} className={applicant=='requested' ?"bg-[#7b7ad7] text-white w-27":"text-[#7b7ad7]  w-27"}>Requested</button>
            <button onClick={()=>{setApplicant('considered')}} className={applicant=='considered' ?"bg-[#7b7ad7] text-white w-27":"text-[#7b7ad7]  w-27"}>Considered</button>
          </div>

          <div>
            {applicant=='requested' ? <JobRequests/> : <JobConsider/>}
          </div>
        </div>
      </div>

      {showPopup && (<InsufficientCoins/>)}
    </div>
  );
}
export default JobDetails;
