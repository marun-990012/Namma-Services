import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectServiceProvider } from "../redux/slices/jobPostSlice";
import toast from "react-hot-toast";

export const useSelectServiceProvider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const select = async (formData) => {
    console.log(formData)
    try {
      const res = await dispatch(
        selectServiceProvider(formData)
      ).unwrap();
      navigate(`/job/post/details/requests/${formData.id}`)
      toast.success("Service provider has been selected successfully.");
      return res;
    } catch (error) {
      toast.error(error.message || "Failed to select the service provider. Please try again.");
      throw error;
    }
  };

  return { select };
};
