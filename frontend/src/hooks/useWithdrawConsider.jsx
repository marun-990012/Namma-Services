import { useDispatch } from "react-redux";
import { withdrawConsider } from "../redux/slices/jobPostSlice";
import toast from "react-hot-toast";

export const usewithdrawConsider = () => {
  const dispatch = useDispatch();

  const withdraw = async (formData) => {
    try {
      const res = await dispatch(
        withdrawConsider(formData)
      ).unwrap();
      toast.success(" successfully withdraw consider");
      return res;
    } catch (error) {
      toast.error(error.message || "Failed to withdraw consider. Please try again.");
      throw error;
    }
  };

  return { withdraw };
};
