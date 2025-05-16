import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { BadgeCheck, Star } from "lucide-react";
import JobRequests from "./JobRequests";
import JobConsider from "./JobConsider";
function JobPostDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  console.log(id);
  const location = useLocation();

  const [considered, setConsidered] = useState(() =>
    location.pathname.startsWith("/job/post/details/considers")
  );
  const [requested, setRequested] = useState(() =>
    location.pathname.startsWith("/job/post/details/requests")
  );

  useEffect(() => {
    setConsidered(location.pathname.startsWith("/job/post/details/considers"));
    setRequested(location.pathname.startsWith("/job/post/details/requests"));
  }, [location.pathname]);

  return (
    <div className="flex justify-center items-center border-3 border-white p-10 pt-4 rounded-[8px] mb-4">
      <div className="w-[90%]">
        <div>
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="bg-gray-300 hover:bg-[#b4b9c1] px-4 rounded cursor-pointer"
          >
            Back
          </button>
        </div>

       <div className="flex justify-center items-start w-full mt-6">
  <div className="flex flex-col lg:flex-row w-full max-w-6xl justify-between gap-3">
    {/* Left Section */}
    <div className="rounded-xl shadow-md bg-white p-5 w-[70%]  flex flex-col gap-2">
      <p className="text-[17px]">
        Title: <span className="text-gray-400">Electric fan repair</span>
      </p>
      <p className="text-[17px]">
        Description:{" "}
        <span className="text-gray-400">
          We are seeking a skilled and certified Electrician to join our team...
        </span>
      </p>
      <p className="text-[17px] break-words">
        Work location:{" "}
        <span className="text-gray-400">
          Gandhi Bazaar, Basavanagudi, Sunkenahalli, Bangalore - 560004, Karnataka,
          India, Near Bull Temple, Next to Post Office, Landmark: Opposite XYZ...
        </span>
      </p>
      <p className="text-[17px]">
        Salary: <span className="text-gray-400">Rs.2400</span>
      </p>
      <p className="text-[17px]">
        Work Status: <span className="text-gray-400">Started</span>
      </p>

      <div className="mt-5 w-[37%] flex flex-row justify-between">
        <button className="bg-yellow-400 hover:bg-yellow-500 px-4 rounded-[4px] cursor-pointer">
          Edit Post
        </button>
        <button className="bg-red-500 hover:bg-red-600 px-4 py-1 text-white rounded-[4px] cursor-pointer">
          Delete Post
        </button>
      </div>
    </div>

    {/* Right Section */}
    <div className="w-full lg:max-w-[30%] bg-white rounded-xl shadow-md overflow-hidden">
      <div className="relative">
        <img
          className="w-full h-48 object-cover"
          src="https://res.cloudinary.com/dxludspye/image/upload/v1747306608/Namma-Services/rpkkgdua0dnhpt2hwstr.jpg"
          alt="User profile"
        />
        <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-1 py-[2px] rounded">
          Selected for work
        </span>
      </div>

      <div className="p-4 pt-2">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold flex justify-between">
          <p className="text-[12px]">Electrician</p>
          <p className="flex">
            {[...Array(5)].map((_, i) => (
              <Star size={16} key={i} color="#ecd909" />
            ))}
            <span className="ml-2">4.5</span>
          </p>
        </div>
        <p className="mt-[1px] text-[20px] text-black flex items-center">
          Arun Rathod <BadgeCheck size={20} color="#06f" className="ml-2" />
        </p>
        <p className="mt-2 text-gray-500">Phone: 9900126189</p>
        <p className="mt-1 text-gray-500">Email: arunrathod@gmail.com</p>
      </div>
    </div>
  </div>
</div>


        {/* address div */}
        {/* <div className="flex justify-center w-full mt-7">
          <div className="bg-white w-[90%] px-6 shadow-md rounded-[8px] p-4">
            <p>Work address</p>
            <p className="text-gray-500">
              Work address electrical systems in residential, commercial, and
              industrial settings
            </p>
          </div>
        </div> */}

        {/* requested users list */}
        <div className="flex justify-center w-full mt-7">
          <div className="bg-white w-full px-6 shadow-md rounded-[8px] p-4 ">
            <div className="bg-green-200 w-60 flex justify-between p-2 rounded">
              <button
                onClick={() => {
                  navigate(`/job/post/details/requests/${id}`);
                }}
                className={
                  requested
                    ? "cursor-pointer bg-green-400 hover:bg-green-500 text-white py-1  w-27 rounded"
                    : "cursor-pointer text-green-600 py-1  w-27 rounded"
                }
              >
                Requested
              </button>
              <button
                onClick={() => {
                  navigate(`/job/post/details/considers/${id}`);
                }}
                className={
                  considered
                    ? "cursor-pointer bg-green-400 hover:bg-green-500 text-white py-1  w-27 rounded"
                    : "cursor-pointer text-green-600 py-1  w-27 rounded"
                }
              >
                Considered
              </button>
            </div>

            <div>
              {requested && <JobRequests />}

              {considered && <JobConsider />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default JobPostDetail;
