import { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Mail } from 'lucide-react';
import toast from "react-hot-toast";
import { emailVerify } from "../../redux/slices/authSlice";
function EmailVerification() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const regEmail = location.state?.email;
  const [code, setCode] = useState('');
  const [email,setEmail] = useState(regEmail || '');

  const validation = ()=>{
    if(!email.trim() || !/\S+@\S+\.\S+/.test(email)){
        toast.error("Invalid email format or");
        return false;
    }

    if (code.length < 6) {
          toast.error('code must be 6 digit');
          return false;
      }
      return true;
  } 
  const handleSubmit = async(e)=>{
    e.preventDefault();

    if (!validation()) return;
  
    const formData = {
      code,
      email,
    };
  
    try {
      const res = await dispatch(emailVerify(formData)).unwrap(); // Redux thunk
      console.log("verifictation response:", res)
      toast.success("Verifictation successful.You can login with your verified email.", {
        duration: 6000 // in milliseconds (e.g., 4 seconds)
      });
      navigate(`/login`);
    } catch (err) {
      console.log(err);
  
      const errorMessage =
        Array.isArray(err?.error) && err.error[0]?.msg
          ? err.error[0].msg
          : err?.message || 'Verifictation failed';
  
      toast.error(errorMessage);
    }
  }
  return (
    <div className="mr-25">
      <div className="flex justify-center">
        <div className="border border-gray-300 shadow rounded-[12px] w-100 px-3 py-6 bg-white">
             <div className="flex justify-center">
                 <Mail size={70} color="green" className="mt-[-60px] border-b border-gray-300 shodow p-3 bg-[#e3e7ef] rounded-full" />
             </div>
           <div className="text-center">
             <p className="text-[25px]">Please verify your email! </p>
             <p className="mt-3 text-gray-400">We sent verifiaction code to <span className="text-black">{regEmail || email}</span>.</p>
             <p className=" text-gray-400">Please check your inbox and enter the code below</p>
           </div>
          <div className="flex justify-center mt-7">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label htmlFor="" className="mb-1">
                  Verification Email
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}
                  placeholder="Enter Email"
                  className="border border-gray-300 shadow rounded focus:outline-none focus:border-orange-200 px-[8px] py-[4px] w-75"
                />
              </div>


              <div className="flex flex-col mt-3">
                <label htmlFor="" className="mb-1">
                  Verification Code
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e)=>{setCode(e.target.value)}}
                  placeholder="Enter Code"
                  className="border border-gray-300 shadow rounded focus:outline-none focus:border-orange-200 px-[8px] py-[4px] w-40"
                />
              </div>


              <div className="flex flex-col mt-6">
                <input
                  type="submit"
                  value='Verify Email'
                  className=" bg-green-700 hover:bg-green-800 shadow rounded px-[8px] py-2 w-75 text-white cursor-pointer"
                />
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EmailVerification;
