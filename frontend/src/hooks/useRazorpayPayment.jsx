// hooks/useRazorpayPayment.js
import { useCallback } from "react";
import toast from "react-hot-toast";

export const useRazorpayPayment = () => {
  const loadRazorpayScript = useCallback(() => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => {
        toast.error("Failed to load Razorpay. Check your connection.");
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }, []);

  const triggerPayment = useCallback(async ({ 
    orderData, 
    amount, 
    onSuccess, 
    onFailure, 
    description = "Payment for your order", 
    name = "Namma-Services" 
  }) => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded || !orderData) return;

    const options = {
      key: "rzp_test_d8jU7S0YhIAw1x", // Replace with your live key in production
      amount: orderData.amount,
      currency: orderData.currency || "INR",
      name,
      description,
      order_id: orderData.id,
      handler: async (response) => {
        try {
          await onSuccess(response);
        } catch (error) {
          toast.error("Something went wrong after payment.");
          onFailure && onFailure(error);
        }
      },
      theme: {
        color: "#7e00cb",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", (response) => {
      toast.error("Payment failed.");
      if (onFailure) onFailure(response);
    });

    rzp.open();
  }, [loadRazorpayScript]);

  return { triggerPayment };
};
