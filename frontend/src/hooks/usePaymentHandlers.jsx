// hooks/useWalletRecharge.js
import { useDispatch } from "react-redux";
import { createOrder,verifyPayment } from "../redux/slices/paymentSlice";
import { fetchWallet } from "../redux/slices/WalletSlice";
import { useRazorpayPayment } from "./useRazorpayPayment";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { showJobPostDetail } from "../redux/slices/jobPostSlice";

export const usePaymentHandler = (from = "/") => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { triggerPayment } = useRazorpayPayment();

  const payment = async (coin, paymentType, jobId, salary) => {
    if (paymentType === "wallet" && coin <= 0) {
      toast.error("Enter a valid coin amount.");
      return;
    }

    if (paymentType === "salary" && (!salary || salary <= 0)) {
      toast.error("Enter a valid salary amount.");
      return;
    }

    const configs = {
      wallet: {
        amount: coin * 10,
        description: "Wallet Recharge",
        onSuccess: async (response, amount) => {
          await dispatch(verifyPayment({ response, amount, paymentType })).unwrap();
          toast.success("Coins added to wallet.");
          dispatch(fetchWallet());
          navigate(from);
        },
      },
      salary: {
        amount: salary,
        description: "Salary Payment",
        onSuccess: async (response, amount) => {
        const res =  await dispatch(verifyPayment({ response, amount, paymentType, jobId })).unwrap();
        navigate(`/review/write/${res.jobPost.selectedServiceProvider}/${res.jobPost._id}`);
        // console.log(res)
        dispatch(showJobPostDetail(jobId))
          toast.success("Salary paid successfully.");
        },
      },
    };

    const config = configs[paymentType];
    if (!config) {
      toast.error("Invalid payment type.");
      return;
    }

    try {
      const res = await dispatch(createOrder(config.amount)).unwrap();
      await triggerPayment({
        orderData: res,
        amount: config.amount,
        description: config.description,
        onSuccess: (response) => config.onSuccess(response, config.amount),
        onFailure: () => toast.error("Payment verification failed."),
      });
    } catch (error) {
      console.error("Order creation failed:", error); // Optional logging
      toast.error("Order creation failed.");
    }
  };

  return { payment };
};
