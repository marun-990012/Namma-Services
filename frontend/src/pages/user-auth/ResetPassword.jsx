import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Eye, EyeOff } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../redux/slices/authSlice";

function ResetPassword() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [reEnteredPassword, setReEnteredPassword] = useState("");

  const validations = () => {
    if (password !== reEnteredPassword) {
      setError("Passwords do not match.");
      setSuccess("");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setSuccess("");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validations()) return;
    setError("");

    const formData = {
      token: id,
      newPassword: password,
    };

    try {
      const res = await dispatch(resetPassword(formData)).unwrap();
      console.log(res.message);
      // Show success toast
      toast.success(res.message || "Password changed successfully");
      navigate("/login");

      // Optionally reset form
      setPassword("");
      setReEnteredPassword("");
    } catch (error) {
      // Show error toast
      toast.error(error?.message || error?.error || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-40 backdrop-blur-md">
      <div className="bg-white p-6 w-96 rounded-2xl shadow-lg flex flex-col items-center space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          🔒 Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="relative">
            <label className="text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <div className="relative">
            <label className="text-sm font-medium text-gray-700">
              Re-type New Password
            </label>
            <input
              type={showRePassword ? "text" : "password"}
              value={reEnteredPassword}
              onChange={(e) => setReEnteredPassword(e.target.value)}
              placeholder="Confirm new password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              onClick={() => setShowRePassword(!showRePassword)}
              className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
            >
              {showRePassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
