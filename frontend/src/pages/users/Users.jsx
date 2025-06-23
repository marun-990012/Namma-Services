import { useLocation, useNavigate } from "react-router-dom";
import ApprovedUsers from "./ApprovedUsers";
import RequestedUsers from "./RequestedUsers";
import RejectedUsers from "./RejectedUser";

function Users() {
  const location = useLocation().pathname;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center border-3 border-white p-10 pt-4 rounded-[8px] mb-2 bg-gray-100">
      <div className="w-full">
        <div className="bg-white w-108 flex justify-between p-2 rounded border shadow-md border-gray-100">
          <button
            onClick={() => navigate("/users/approved")}
            className={
              location === "/users/approved" || location === "/users"
                ? "cursor-pointer bg-yellow-400 hover:bg-yellow-500 transition duration-300 text-white py-1 w-40 rounded"
                : "cursor-pointer text-yellow-500 py-1 w-40 rounded"
            }
          >
            Active Users
          </button>
          <button
            onClick={() => navigate("/users/requested")}
            className={
              location === "/users/requested"
                ? "cursor-pointer bg-yellow-400 hover:bg-yellow-500 transition duration-300 text-white py-1 w-40 rounded"
                : "cursor-pointer text-yellow-500 py-1 w-40 rounded"
            }
          >
            Requested Users
          </button>
          <button
            onClick={() => navigate("/users/rejected")}
            className={
              location === "/users/rejected"
                ? "cursor-pointer bg-yellow-400 hover:bg-yellow-500 transition duration-300 text-white py-1 w-40 rounded"
                : "cursor-pointer text-yellow-500 py-1 w-40 rounded"
            }
          >
            Rejected Users
          </button>
        </div>
      </div>

      {/* Conditionally render based on current path */}
       <div className="w-full">
        {location === "/users/approved" || location === "/users" ? (
        <ApprovedUsers />
      ) : location === "/users/requested" ? (
        <RequestedUsers />
      ) : location === "/users/rejected" ? (
        <RejectedUsers />
      ) : null}
       </div>
    </div>
  );
}

export default Users;
