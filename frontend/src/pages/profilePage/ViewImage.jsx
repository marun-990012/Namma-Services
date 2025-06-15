import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate,useParams } from "react-router-dom";
import { fetchAccount } from "../../redux/slices/profileSlice";

function ViewImage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        dispatch(fetchAccount());
    },[dispatch]);

    const userAccount = useSelector((state)=>{
        return state.profile;
    })?.data;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center  bg-opacity-50 backdrop-blur-md">
      <div className="relative bg-white p-1 rounded-[8px] border border-gray-300 shadow w-[300px] h-[300px]">
        <img
          className="w-full h-full  rounded-[6px]"
          src={userAccount?.images[id]}
          alt="Uploaded"
        />
        <button
        onClick={()=>{navigate(-1)}}
          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shadow cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
export default ViewImage;
