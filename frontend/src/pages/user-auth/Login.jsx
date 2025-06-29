import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";    
import { loginOtp, userLogin } from "../../redux/slices/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpStatus, setOtpStatus] = useState(false);
  const [otp, setOtp] = useState("");

  const otpValidation = () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email format");
      return false;
    }
    return true;
  };

  const loginValidation = () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (password.trim().length < 8) {
      toast.error("Password must be at least 8 characters long");
      return false;
    }
    return true;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault(); // prevent reload
    if (!otpValidation()) return;

    try {
      const res = await dispatch(loginOtp({ email })).unwrap();
      toast.success("OTP sent successfully. Check your email.", {
        duration: 5000,
      });
      setOtpStatus(true);
    } catch (err) {
      const errorMessage =
        Array.isArray(err?.error) && err.error[0]?.msg
          ? err.error[0].msg
          : err?.message || "Failed to send OTP";
      toast.error(errorMessage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginValidation()) return;

    try {
      const res = await dispatch(userLogin({ email, password, otp })).unwrap();
      if (res.message) {
        toast.error(res.message);
      } else {
        toast.success("Login successful", {
          duration: 5000, // in milliseconds (e.g., 5 seconds)
        });
        navigate("/profile");
      }
    } catch (error) {
      const errorMessage = error?.message || "Login failed";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="ml-1">
      <div className="mt-3 text-center">
        <p className="text-orange-500">
          Login to continue using Namma-Services
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5 mt-[17px]">
          <div className="flex flex-col">
            <label htmlFor="" className="mb-1">
              Email
            </label>
            <div className="flex justify-between">
              <input
                type="email"
                placeholder="Ex : example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 shadow rounded focus:outline-none focus:border-orange-200 px-[8px] py-[4px] w-[75%]"
              />
              <button
                type="button"
                className={
                  otpStatus
                    ? "bg-green-500 px-1 rounded text-white outline-none"
                    : "bg-orange-500 px-1 rounded text-white outline-none"
                }
                onClick={handleSendOtp}
              >
                {otpStatus ? "Sent OTP" : "Send OTP"}
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="" className="mb-1">
              Enter OTP
            </label>
            <input
              type="text"
              placeholder="Ex : 1234"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border border-gray-300 shadow rounded focus:outline-none focus:border-orange-200 px-[8px] py-[4px] w-[90px]"
            />
          </div>

          <div className="relative flex flex-col">
            <label htmlFor="" className="mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Ex : Password@123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 shadow rounded focus:outline-none focus:border-orange-200 px-[8px] py-[4px]"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <div className="text-center cursor-pointer mt-4 bg-orange-500 hover:bg-orange-600 transition duration-200 text-white p-2 rounded">
            <input type="submit" value="login" />
          </div>

          <div className="mt-[-4px] ml-2">
            <Link
              to="/forgot/password"
              className="text-blue-700 hover:underline"
            >
              Forgot Password
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
