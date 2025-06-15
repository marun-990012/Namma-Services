import toast from "react-hot-toast";
import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate,useParams } from "react-router-dom";
import Star from "./Star";
import { fetchAccount } from "../../redux/slices/profileSlice";
import { createReview } from "../../redux/slices/reviewRatingSlice";

function ReviewCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {serviceProviderId,jobId} = useParams();
  const [rating, setRating] = useState(0);
  const [review,setReview] = useState('');
  const [hovered, setHovered] = useState(0);

  useEffect(()=>{
    dispatch(fetchAccount());
  },[dispatch]);

  const validation = ()=>{
    if(rating==0){
      toast.error('Click the stars to rate us');
      return false;
    }
    return true;
  }

  const userAccount = useSelector((state)=> state.profile)?.data;
  // console.log(userAccount)
  const handleSubmit = async()=>{

    if(!validation()) return

    const formData = {
      rating,
      review:{message:review},
      jobProvider:userAccount?._id,
      serviceProvider:serviceProviderId,
      jobId,
    }
     try {
      const response = await dispatch(createReview(formData)).unwrap();
      navigate(`/job/post/details/requests/${jobId}`);
      toast.success('Thank you for your review!');
     } catch (error) {
      toast.error(error);
     }
  }

  return (
    <div className="inset-0 fixed flex justify-center items-center z-50  bg-opacity-50 backdrop-blur-md">
      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-lg mx-auto">
        <div className="text-center">
          <p className="text-3xl font-semibold text-gray-800">Leave a Review</p>
          <div className="mt-4">
            <p className="text-gray-600">Click the stars to rate us</p>
            <div className="flex justify-center gap-2 mt-2">
              {[1, 2, 3, 4, 5].map((_, index) => {
                const value = index + 1;
                return (
                  <Star
                    key={value}
                    filled={value <= (hovered || rating)}
                    onClick={() => setRating(value)}
                    onMouseEnter={() => setHovered(value)}
                    onMouseLeave={() => setHovered(0)}
                  />
                );
              })}
            </div>
            <p className="text-[18px] text-yellow-400 mt-2">{rating}</p>
          </div>
        </div>

        <div className="mt-1">
          <p className="text-sm font-medium text-gray-700 mb-1">Your Review</p>
          <textarea
            value={review}
            onChange={(e)=>{setReview(e.target.value)}}
            placeholder="Write your thoughts..."
            className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-300 text-gray-700"
          ></textarea>

          <div className="flex gap-2 mt-4">
            <button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600 transition-colors text-white rounded-lg px-5 py-2 font-medium">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
