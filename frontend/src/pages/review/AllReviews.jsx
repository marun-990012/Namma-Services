import { Link } from "react-router-dom";
import { Star, ThumbsUp } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchReviews,likeReview } from "../../redux/slices/reviewRatingSlice";
import { fetchWorkProvider, fetchServiceProviders} from "../../redux/slices/userSlice";

function AllReviews({ userId }) {
  const dispatch = useDispatch();
  const {id} = useParams();

  useEffect(() => {
    dispatch(fetchReviews(userId));
    dispatch(fetchWorkProvider());
    dispatch(fetchServiceProviders());
  }, [dispatch]);
  const reviews = useSelector((state) => state.review)?.reviews;
  const workProvidersList = useSelector((state) => state.users)?.workProviders;
  const users = useSelector((state) => state.users)?.data;
   
  const serviceProvider = users.find((user) => {
      return user._id == userId || id ;
    });

  // console.log(userId)
  console.log(reviews)

  const reviewRating = reviews?.map((ele) => {
    const jobProvider = workProvidersList?.find((elel) => {
      return elel._id == ele.jobProvider;
    });

    return { ...ele, workProvider: jobProvider };
  });

  console.log(reviewRating);

  const handleLike = (id)=>{
    dispatch(likeReview(id));
  }
  return (
    <div>

      <div className="text-gray-600 text-[18px] ml-2">
            Review and Rating {">"}{" "}
            <span className="text-black">{serviceProvider?.name}</span>
      </div>
      {reviewRating?.map((review, i) => {
        return (
          <div key={i} className="flex justify-center w-full">
            <div className="flex flex-col items-start md:items-center justify-between bg-white w-full py-2 px-5 rounded-xl border border-gray-200 shadow-sm mt-2.5 gap-4 transition hover:shadow-md">
              <div className="flex justify-between w-full items-center">
                {/* user detail */}
                <div className="flex items-center">
                  <div>
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={review?.workProvider?.profileImage}
                      alt="User"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-[14px] font-medium text-gray-800">
                      {review?.workProvider?.name}
                    </p>
                    <p className="text-[13px] text-gray-400">{review?.reviewDate}</p>
                  </div>
                </div>

                {/* rating */}
                <div className="flex gap-1 items-center">
                  <div className="flex mr-5 items-center">
                    <ThumbsUp size={19} color="#00ff40" onClick={()=>{handleLike(review?._id)}}/>{" "}
                    <span className="ml-2 bg-green-100 text-green-700 px-2 rounded-full">
                      {review?.likes}
                    </span>
                  </div>
                  {[1, 2, 3, 4, 5].map((_, idx) => (
                    <div key={idx}>
                      <Star
                        size={18}
                        color={idx < review.rating ? "#e8c008" : "#d1d5db"} // gray for unfilled
                        fill={idx < review.rating ? "#e8c008" : "none"}
                      />
                    </div>
                  ))}
                  <span className="ml-2 text-sm text-gray-700 font-semibold">
                    {review.rating}.0
                  </span>
                </div>
              </div>

              {/* review */}
              <div className="w-full mt-[-10px]">
                <p className="text-[15px] leading-relaxed text-gray-500 tracking-wide">
                  {review.review?.message}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default AllReviews;
