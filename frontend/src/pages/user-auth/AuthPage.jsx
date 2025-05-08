import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../images/app-logo.png";
function AuthPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [code, setCode] = useState("");
  const location = useLocation();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      password,
      userType,
      code
    };

    console.log(formData);
  };
  return (
    <div className="flex justify-center mt-">
      <div className="flex justify-evenly p-6 bg-white rounded-[10px]">
        <div className="">
          <img className="w-103 h-110 rounded-[10px]" src={logo} alt="" />
        </div>

        <div className="bg-white w-83 ml-4">
          {/* <p>Register components</p>
             <form>
                <input type="text" />
             </form> */}
          <div className="flex justify-between bg-[#e8e8ea] p-[4px] rounded-[5px]">
            <Link to="/login">
              <button
                className={
                  location.pathname.slice(1) == "login"
                    ? "bg-white w-40 h-[30px] rounded-[5px]"
                    : "bg-[#e8e8ea] w-40 text-[#8b8b8b] h-[30px] cursor-pointer"
                }
              >
                Login
              </button>
            </Link>

            <Link to="/register">
              <button
                className={
                  location.pathname.slice(1) == "register"
                    ? "bg-white w-40 h-[30px] rounded-[5px]"
                    : "bg-[#e8e8ea] w-40 text-[#8b8b8b] h-[30px] cursor-pointer"
                }
              >
                Register
              </button>
            </Link>
          </div>

          {/* Registration form */}
          {location.pathname.slice(1) == "register" && (
            <div className="ml-1">
              <div className="mt-3 text-center">
                <p className="text-orange-500">
                  Join Namma-Services and start working today
                </p>
              </div>
              <form onSubmit={handleRegister}>
                <div className="flex flex-col mt-[17px]">
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
                    <div className="flex">
                      <span className="text-[12px] text-white">Error</span>
                    </div>
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
                    <div className="flex">
                      <span className="text-[12px] text-white">Error</span>
                    </div>
                  </div>

                  <div className="flex flex-col">
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
                    <div className="flex">
                      <span className="text-[12px] text-white">.</span>
                    </div>
                  </div>

                  <div>
                    {/* <label htmlFor="" className="mb-">
                      UserType
                    </label> */}
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
                        <label
                          htmlFor="service-provider"
                          className="text-gray-600"
                        >
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
                        <label
                          htmlFor="work-provider"
                          className="text-gray-600"
                        >
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
                          onChange={(e)=>{setCode(e.target.value)}}
                        />
                      </div>
                    )}

                    <div className="flex">
                      <span className="text-[12px] text-red-400">Error</span>
                    </div>
                  </div>

                  <div  className="text-center mt- bg-orange-500 text-white p-2 rounded">
                    <input  type="submit" value="Register" />
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Login Form */}
          {location.pathname.slice(1) == "login" && (
            <div className="ml-1">
              <div className="mt-3 text-center">
                <p className="text-orange-500">
                  Login to continue using Namma-Services
                </p>
              </div>
              <form>
                <div className="flex flex-col gap- mt-[17px]">
                  <div className="flex flex-col">
                    <label htmlFor="" className="mb-1">
                      Eamil
                    </label>
                    <div className="flex justify-between">
                      <input
                        type="text"
                        placeholder="Ex : example@gmail.com"
                        className="border border-gray-300 shadow rounded focus:outline-none focus:border-orange-200 px-[8px] py-[4px] w-[75%]"
                      />
                      <button className="bg-orange-500 px-1 rounded text-white outline-none">
                        Send OTP
                      </button>
                    </div>
                    <div>
                      <span className="text-[12px] text-white">Error</span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="" className="mb-1">
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      placeholder="Ex : 1234"
                      className="border border-gray-300 shadow rounded focus:outline-none focus:border-orange-200 px-[8px] py-[4px] w-[90px]"
                    />
                    <div>
                      <span className="text-[12px] text-white">Error</span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="" className="mb-1">
                      Password
                    </label>
                    <input
                      type="text"
                      placeholder="Ex : Password@123"
                      className="border border-gray-300 shadow rounded focus:outline-none focus:border-orange-200 px-[8px] py-[4px]"
                    />
                    <div>
                      <span className="text-[12px] text-white">.</span>
                    </div>
                  </div>

                  <div className="text-center mt-3 bg-orange-500 text-white p-2 rounded">
                    <input type="submit" value="login" />
                  </div>

                  <div className="mt-2 ml-2">
                    <Link className="text-blue-700 hover:underline">
                      Forgot Password
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default AuthPage;
