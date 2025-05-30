import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/slices/authSlice";
function ForgotPassword (){
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const validation = () => {
      if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
        toast.error("Invalid email format");
        return false;
      }
      return true;
    };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if(!validation()) return
    

    try {
      setLoading(true);
      const res = await dispatch(forgotPassword({email})).unwrap();
      toast.success("Password reset link sent! Please check your email.");
      setEmail('');
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to send reset link. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

    return(
       <div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-40 backdrop-blur-md">
            
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Forgot Password
        </h2>
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
       
    )
}
export default ForgotPassword;