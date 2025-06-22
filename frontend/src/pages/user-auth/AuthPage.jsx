import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Login from './Login'
import Register from "./Register";
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
    <div className="flex justify-center ml-[-100px]">
      <div className="flex justify-evenly p-6 bg-white rounded-[10px]">
        <div className="">
          <img className="w-103 h-108 rounded-[10px]" src={logo} alt="" />
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
            <Register/>
          )}

          {/* Login Form */}
          {location.pathname.slice(1) == "login" && (
            <Login/>
          )}
        </div>
      </div>
    </div>
  );
}
export default AuthPage;
