import { useState } from "react";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../redux/slices/authSlice";

function Register() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { data, error } = useSelector((state) => {
    return state.auth;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validation = () => {
    if (name.trim().length < 3) {
      toast.error("Name must be at least 3 characters long");
      return false;
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email format");
      return false;
    }

    if (password.trim().length < 8) {
      toast.error("password length must be 8 characters long");
      return false;
    }

    if (!userType) {
      toast.error("Please select a role");
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validation()) return;

    const formData = {
      name,
      email,
      password,
      userType,
      passcode: code,
    };

    try {
      const res = await dispatch(userRegister(formData)).unwrap(); // Redux thunk
      console.log("Registration response:", res);
      toast.success(
        "Registration successful. Please check your email for the verification code.",
        {
          duration: 6000, // in milliseconds (e.g., 6 seconds)
        }
      );
      navigate(`/email-verification/${res._id}`, { state: { email } });
    } catch (err) {
      const errorMessage =
        Array.isArray(err?.error) && err.error[0]?.msg
          ? err.error[0].msg
          : err?.message || "Registration failed";

      toast.error(errorMessage);
    }
  };

  return (
    <div className="ml-1">
      <div className="mt-3 text-center">
        <p className="text-orange-500">
          Join Namma-Services and start working today
        </p>
      </div>
      <form onSubmit={handleRegister}>
        <div className="flex flex-col gap-4 mt-[17px]">
          <div className="flex flex-col">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Ex : Mr xyz"
              className="border border-gray-300 shadow rounded focus:outline-none focus:border-orange-200 px-[8px] py-[4px]"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            {/* <div className="flex">
                      <span className="text-[12px] text-white">Error</span>
                    </div> */}
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="">
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="Ex : example@gmail.com"
              className="border border-gray-300 shadow rounded focus:outline-none focus:border-orange-200 px-[8px] py-[4px]"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          {/* <div className="flex flex-col">
                    <label htmlFor="password" className="mb-">
                      Password
                    </label>
                    <input
                    id="password"
                      type="text"
                      placeholder="Ex : Password@123"
                      className="border border-gray-300 shadow rounded focus:outline-none focus:border-orange-200 px-[8px] py-[4px]"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div> */}

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

          <div>
            <div className="flex">
              <div>
                <input
                  className="mr-1  cursor-pointer"
                  type="radio"
                  id="service-provider"
                  name="role"
                  checked={userType == "service-provider"}
                  onChange={() => {
                    setUserType("service-provider");
                  }}
                />
                <label htmlFor="service-provider" className="text-gray-600">
                  Service-Provider
                </label>
              </div>

              <div className="ml-2">
                <input
                  className="mr-1  cursor-pointer"
                  type="radio"
                  id="work-provider"
                  name="role"
                  checked={userType == "work-provider"}
                  onChange={() => {
                    setUserType("work-provider");
                  }}
                />
                <label htmlFor="work-provider" className="text-gray-600">
                  work-Provider
                </label>
              </div>

              <div className="ml-2">
                <input
                  className="mr-1  cursor-pointer"
                  type="radio"
                  id="Admin"
                  name="role"
                  checked={userType == "admin"}
                  onChange={() => {
                    setUserType("admin");
                  }}
                />
                <label htmlFor="Admin" className="text-gray-600">
                  Admin
                </label>
                {/* <input type="radio"  className='ml-1'/> */}
              </div>
            </div>

            {userType === "admin" && (
              <div className="mt-1">
                <input
                  type="text"
                  placeholder="Enter provided passcode"
                  className="border border-gray-300 shadow rounded focus:outline-none focus:border-orange-200 px-[8px] py-[4px] w-49"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                  }}
                />
              </div>
            )}

            {/* <div className="flex">
                      <span className="text-[12px] text-red-400">Error</span>
                    </div> */}
          </div>

          <div className="text-center mt- bg-orange-500 text-white p-2 rounded">
            <input type="submit" value="Register" />
          </div>
        </div>
      </form>
    </div>
  );
}
export default Register;
