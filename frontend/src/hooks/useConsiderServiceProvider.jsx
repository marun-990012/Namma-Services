import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {considerServiceProvider } from "../redux/slices/jobPostSlice";
import toast from "react-hot-toast";

export const useConsiderServiceProvider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const consider = async(formData)=>{
   try {
      const res = await dispatch(considerServiceProvider(formData)).unwrap();
      toast.success("Service provider has been consider for job.");
      
    } catch (error) {
      toast.error(error.message || "Failed to consider the service provider. Please try again.");
    }
}

  return { consider };
};
