import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { listJobPosts } from "../../redux/slices/jobPostSlice";
import { fetchServiceProviders } from "../../redux/slices/userSlice";

function MyJobPosts() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listJobPosts());
    dispatch(fetchServiceProviders());
  }, [dispatch]);

  const listJobs = useSelector((state) => state.jobs.data || []);
  const serviceProvider = useSelector((state) => state.users.data || []);

  const jobs = listJobs.map((job) => {
    const provider = serviceProvider.find(
      (ele) => ele._id === job?.selectedServiceProvider
    );
    return {
      ...job,
      selectedServiceProvider: provider ? provider.name : "Not Assigned",
    };
  });

  const getStatusClass = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "started":
        return "bg-yellow-100 text-yellow-700";
      case "not-assigned":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  return (
    <div className="flex flex-col justify-center items-center border-3 border-white p-6 pt-4 rounded-[8px] mb-2 bg-gray-100">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800">📋My Job Posts</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs uppercase bg-gray-100 text-gray-600">
              <tr>
                <th className="px-6 py-4 text-center">Title</th>
                <th className="px-6 py-4 text-center">Salary</th>
                <th className="px-6 py-4 text-center">Applicants</th>
                <th className="px-6 py-4 text-center">Selected</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((ele) => (
                <tr key={ele._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-center">{ele.title}</td>
                  <td className="px-6 py-4 text-center">₹{ele.salary}</td>
                  <td className="px-6 py-4 text-center">{ele.jobRequests.length}</td>
                  <td className="px-6 py-4 text-center">{ele.selectedServiceProvider}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusClass(ele.workStatus)}`}>
                      {ele.workStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link to={`/job/post/detail/${ele._id}`}>
                      <button className="inline-flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-4 py-2 rounded-md transition duration-200">
                        <Eye className="w-4 h-4" /> Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center px-6 py-6 text-gray-500">
                    No job posts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyJobPosts;
