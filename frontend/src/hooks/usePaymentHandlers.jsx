// hooks/useWalletRecharge.js
import { useDispatch } from "react-redux";
import { createOrder,verifyPayment } from "../redux/slices/paymentSlice";
import { fetchWallet } from "../redux/slices/WalletSlice";
import { useRazorpayPayment } from "./useRazorpayPayment";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const usePaymentHandler = (from = "/") => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { triggerPayment } = useRazorpayPayment();

  const payment = async (coin, paymentType) => {
    if (coin <= 0) {
      toast.error("Enter a valid coin amount.");
      return;
    }

    const configs = {
      wallet: {
        amount: coin * 10,
        description: "Wallet Recharge",
        onSuccess: async (response, amount) => {
          await dispatch(verifyPayment({ response, amount })).unwrap();
          toast.success("Coins added to wallet.");
          dispatch(fetchWallet());
          navigate(from);
        },
      },
      salary: {
        amount: coin,
        description: "Salary Payment",
        onSuccess: async (response, amount) => {
          await dispatch(verifyPayment({ response, amount })).unwrap();
          toast.success("Salary paid successfully.");
          navigate(from);
        },
      },
      // Add more payment types here easily
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
      toast.error("Order creation failed.");
    }
  };

  return { payment };
};