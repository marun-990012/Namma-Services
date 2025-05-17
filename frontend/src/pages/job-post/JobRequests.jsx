import { useEffect,useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showJobPostDetail } from "../../redux/slices/jobPostSlice";

function JobRequests({id}){
   const dispatch = useDispatch();
   useEffect(() => {
    dispatch(showJobPostDetail(id));
  }, [dispatch]);

  const jobPost = useSelector((state) => {
    return state.jobs;
  }).data;
  console.log(jobPost);
    return(
        <div className="mt-5 space-y-3">
  {jobPost.jobRequests?.map((_, index) => (
    <div
      key={index}
      className="flex flex-col sm:flex-row sm:items-center bg-gray-200 p-2 rounded gap-4"
    >
      {/* Profile Image */}
      <div className="flex justify-center sm:justify-start">
        <div className="bg-green-300 w-16 h-16 flex justify-center items-center rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover rounded-full"
            src="https://res.cloudinary.com/dxludspye/image/upload/v1747306608/Namma-Services/rpkkgdua0dnhpt2hwstr.jpg"
            alt="Profile"
          />
        </div>
      </div>

      {/* Text Info Block */}
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-center sm:text-left">
        {/* Name */}
        <div className="sm:w-1/4">
          <p className="font-semibold">Arun Rathod</p>
        </div>

        {/* Description */}
        <div className="sm:w-2/4">
          <p className="truncate sm:whitespace-normal">
            Arun Rathod Arun Rathod Arun Rathod Arun Rathod Arun Rathod Arun Rathod
          </p>
        </div>

        {/* Rating */}
        <div className="sm:w-1/4">
          <p className="font-medium">Rating 4.5</p>
        </div>
      </div>

      {/* Button */}
      <div className="text-center sm:text-right mt-2 sm:mt-0">
        <button className="cursor-pointer bg-green-300 text-green-800 hover:bg-green-400 hover:text-black px-5 py-1 rounded">
          View
        </button>
      </div>
    </div>
  ))}
</div>


    )
}
export default JobRequests;