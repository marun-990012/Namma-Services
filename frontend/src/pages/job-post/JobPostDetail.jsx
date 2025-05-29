import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
import { BadgeCheck, Star, UserRound } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { showJobPostDetail } from "../../redux/slices/jobPostSlice";
import { fetchServiceProviders } from "../../redux/slices/userSlice";
import JobRequests from "./JobRequests";
import JobConsider from "./JobConsider";
import { usePaymentHandler } from "../../hooks/usePaymentHandlers";
import { fetchReviews } from "../../redux/slices/reviewRatingSlice";
function JobPostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [showPopup, setShowPopup] = useState(false);
  const [agree, setAgree] = useState(false);
  const [extraPay, setExtraPay] = useState('');
  console.log(agree);

  const { payment } = usePaymentHandler(from);

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

  

  const jobPost = useSelector((state) => state.jobs).job;
  const users = useSelector((state) => state.users).data;
  const reviews = useSelector((state) => state.review)?.reviews;
 

  const salary = (Number(jobPost.salary) + Number(extraPay));
  const selectedServiceProvider = users.find((user) => {
    return user._id == jobPost.selectedServiceProvider;
  });

   useEffect(() => {
  if (selectedServiceProvider?._id) {
    dispatch(fetchReviews(selectedServiceProvider._id));
  }
}, [dispatch, selectedServiceProvider?._id]);

  // console.log(selectedServiceProvider)
 
  console.log(jobPost);
  const averageRating = reviews?.length? reviews.reduce((acc, cv) => acc + cv.rating, 0) / reviews.length: 0;

  const handleComplet = async () => {
    setShowPopup(true);
  };

  const handleConfirm = async () => {
    await payment(NaN, "salary", jobPost._id, salary,selectedServiceProvider._id);
    // alert("hello");
  };

  const handleCancel = () => {
    setShowPopup(false);
  };
  return (
    <div className="flex justify-center items-center border-3 border-white p-10 pt-4 rounded-[8px] mb-2">
      <div className="w-full">
        <div className="ml-2">
          <button
            onClick={() => {
              navigate("/job/posts");
            }}
            className="bg-gray-300 hover:bg-[#b4b9c1] px-4 rounded cursor-pointer"
          >
            Back
          </button>
        </div>

        <div className="flex justify-center items-start w-full mt-2">
          <div className="flex flex-col lg:flex-row w-full max-w-6xl justify-between gap-3">
            {/* Left Section */}
            <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-4xl mx-auto space-y-4">
              {/* Job Details */}
              <div className="space-y-2">
                <p className="text-lg font-semibold text-gray-800">
                  Title:{" "}
                  <span className="text-base font-normal text-gray-500">
                    {jobPost.title}
                  </span>
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  Description:{" "}
                  <span className="text-base font-normal text-gray-500">
                    {jobPost.description}
                  </span>
                </p>
                <p className="text-lg font-semibold text-gray-800 break-words">
                  Work Location:{" "}
                  <span className="text-base font-normal text-gray-500">
                    {jobPost.address}
                  </span>
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  Salary:{" "}
                  <span className="text-base font-normal text-gray-500">
                    Rs. {jobPost.salary}
                  </span>
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  Work Status:{" "}
                  <span className="text-base font-normal text-gray-500">
                    {jobPost.workStatus}
                  </span>
                </p>
              </div>

              {/* Action Buttons / Completion Section */}
              <div className="pt-4 border-t border-gray-200">
                {!selectedServiceProvider ? (
                  <div className="flex gap-4 flex-wrap">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg font-medium text-base transition-all">
                      Edit Post
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-medium text-base transition-all">
                      Delete Post
                    </button>
                  </div>
                ) : jobPost.workStatus === "completed" ? (
                  <div className="bg-green-50 border border-green-400 p-5 rounded-lg shadow-sm">
                    <h3 className="text-green-700 font-semibold text-lg mb-2 flex items-center gap-2">
                      ✅ Work Completed
                    </h3>
                    <p className="text-gray-700 text-sm">
                      This job has been marked as completed. You can view the
                      payment history or contact the service provider if needed.
                    </p>
                  </div>
                ) : (
                  <div className="bg-white p-5 space-y-3">
                    <p className="text-gray-700 text-base">
                      ✅ If the work has been completed, you can proceed with
                      the payment.
                    </p>
                    <button
                      onClick={handleComplet}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-all"
                    >
                      Mark as Completed
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Section */}
            {/* jobPost.selectedServiceProvider */}
            {jobPost.selectedServiceProvider ? (
              <div className="w-full lg:max-w-[30%] h-90 bg-white rounded-xl shadow-md overflow-hidden">
                <div className="relative">
                  <img
                    className="w-full h-48 object-cover"
                    src={selectedServiceProvider?.profileImage}
                    alt="User profile"
                  />
                  <span className="absolute top-2 left-2 bg-green-50 text-green-700 text-xs font-semibold px-1 py-[2px] rounded">
                    Selected for work
                  </span>
                </div>

                <div className="p-4 pt-2">
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold flex justify-between mt-2">
                    <p className="text-[12px]">Electrician</p>
                      <div className="flex items-center space-x-1">
                    {[0, 1, 2, 3, 4].map((_, idx) => {
                      const isFilled = idx + 1 <= averageRating;
                      const isHalf =
                        !isFilled &&
                        averageRating > idx &&
                        averageRating < idx + 1;

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
                    <span className="text-gray-600 text-xs ml-1">
                      {averageRating.toFixed(1)}
                    </span>
                  </div>
                  </div>
                  <p className="mt-[1px] text-[20px] text-black flex items-center">
                    {selectedServiceProvider?.name}{" "}
                    <BadgeCheck size={20} color="#06f" className="ml-2" />
                  </p>
                  <p className="mt-2 text-gray-500">
                    Phone: {selectedServiceProvider?.phoneNumber}
                  </p>
                  <p className="mt-1 text-gray-500">
                    Email: {selectedServiceProvider?.email}
                  </p>

                  <div className="text-green-700 mt-2 hover:underline">
                    <Link
                      to={`/view/job/request/${selectedServiceProvider?._id}/${id}`}
                    >
                      View details
                    </Link>
                  </div>
                  {/* <button className="text-center text-green-700 px-3 py-1 mt-2 rounded-[6px]">View details</button> */}
                </div>
              </div>
            ) : (
              <div className="w-full lg:max-w-[30%] bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div className="flex flex-col items-center p-6">
                  <div className="w-36 h-36 flex items-center justify-center bg-gray-100 rounded-full mb-4">
                    <UserRound size={72} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-center text-sm">
                    No Candidate Selected
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* requested users list */}
        <div className="flex justify-center w-full mt-4">
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

      {/* Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-[#5e3ae4] via-[#7556e0] to-[#a17cf7] text-white p-6 rounded-2xl shadow-2xl max-w-md mx-auto border border-purple-300 relative transition-transform duration-300 hover:scale-[1.01] mt-4">
            {/* Payment Avatar or Icon */}
            <div className="flex justify-center absolute left-1/2 transform -translate-x-1/2 -top-10">
              <div className="bg-[#7556e0] rounded-full p-1 shadow-lg w-24 h-24 flex items-center justify-center">
                <div className=" flex flex-col bg-yellow-300 w-21 h-21 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                  Pay <span className="text-[13px] text-green-700">Secure</span>
                </div>
              </div>
            </div>

            {/* Salary Display */}
            <div className="pt-16 mb-6 text-center">
              <p className="text-4xl font-bold tracking-tight">₹ {salary}</p>
              <p className="text-[15px] text-white/80 mt-1">
                Total Service Payment
              </p>

              {agree > 0 && (
                <div className="mt-3 inline-block bg-white/10 px-4 py-2 rounded-lg border border-white/20 backdrop-blur-sm">
                  <p className="text-sm text-white/90">
                    Base: ₹{jobPost.salary}
                    <span className="mx-2 text-white/50">+</span>
                    Extra: ₹{extraPay !=0 && (<span>{extraPay}</span>)} {extraPay==0 &&(<span>0</span>)}
                    <span className="mx-2 text-white/50">=</span>
                    <strong className="text-yellow-300">₹{salary}</strong>
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-center">
              <div className="w-[60%]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    id="agree"
                    className="peer hidden"
                    checked={agree}
                   onChange={(e) => {
  const isChecked = e.target.checked;
  setAgree(isChecked);
  if (!isChecked) {
    setExtraPay(0);
  }
}}
                  />
                  <div className="w-5 h-5 flex items-center justify-center border-2 border-yellow-400 rounded bg-white peer-checked:bg-green-300 transition-colors duration-200">
                    <svg
                      className="w-4 h-4 text-green-600 hidden peer-checked:block"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-white">
                    Agree to pay extra if required.
                  </span>
                </label>
                {agree && (
                  <div className="mt-3">
                    <label className="block text-white text-sm mb-1 ml-1">
                      Enter Extra Amount
                    </label>
                    <input
                      type="number"
                      value={extraPay}
                      onChange={(e)=>{setExtraPay(e.target.value)}}
                      placeholder="₹ 0.00"
                      className="w-full px-4 py-2 bg-white text-[#4f2bdf] placeholder:text-gray-400 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-200"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Confirmation Message */}
            <p className="text-base text-center mb-6 leading-relaxed text-white/90">
              You're about to pay for the service. Please confirm to proceed
              with the secure payment.
            </p>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCancel}
                className="bg-white text-[#5e3ae4] font-medium px-5 py-2 rounded-lg shadow hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="bg-yellow-300 text-[#4f2bdf] font-semibold px-5 py-2 rounded-lg shadow hover:bg-yellow-400 transition"
              >
                Confirm & Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default JobPostDetail;
